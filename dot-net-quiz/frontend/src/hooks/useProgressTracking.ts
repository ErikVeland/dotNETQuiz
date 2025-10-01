import { useState, useEffect } from 'react';

export interface ProgressData {
  moduleId: string;
  lessonsCompleted: number;
  totalLessons: number;
  quizScore: number;
  timeSpent: number;
  lastAccessed: string;
  completionStatus: 'not-started' | 'in-progress' | 'completed';
  badges: string[];
  certificate?: {
    earned: boolean;
    earnedDate: string;
    shareUrl: string;
  };
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface AchievementData {
  id: string;
  earnedDate: string;
  moduleId?: string;
}

const STORAGE_KEYS = {
  PROGRESS: 'fullstack-academy-progress',
  STREAK: 'fullstack-academy-streak',
  ACHIEVEMENTS: 'fullstack-academy-achievements'
};

export const useProgressTracking = () => {
  const [progress, setProgress] = useState<Record<string, ProgressData>>({});
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: ''
  });
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }

      const savedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (savedStreak) {
        setStreak(JSON.parse(savedStreak));
      }

      const savedAchievements = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  }, []);

  const updateProgress = (moduleId: string, data: Partial<ProgressData>) => {
    const currentTime = new Date().toISOString();
    
    const defaultProgressData = {
      moduleId,
      lessonsCompleted: 0,
      totalLessons: 0,
      quizScore: 0,
      timeSpent: 0,
      completionStatus: 'not-started' as const,
      badges: [],
      certificate: undefined
    };
    
    const updated = {
      ...progress,
      [moduleId]: {
        ...defaultProgressData,
        ...progress[moduleId],
        ...data,
        lastAccessed: currentTime
      }
    };
    
    setProgress(updated);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated));
    
    // Update streak
    updateStreak();
    
    // Check for new achievements
    checkAchievements(updated, moduleId);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    const updatedStreak = { ...streak };
    
    if (streak.lastActiveDate !== today) {
      if (streak.lastActiveDate === yesterday) {
        // Consecutive day
        updatedStreak.currentStreak += 1;
      } else if (streak.lastActiveDate) {
        // Streak broken
        updatedStreak.currentStreak = 1;
      } else {
        // First day
        updatedStreak.currentStreak = 1;
      }
      
      updatedStreak.longestStreak = Math.max(updatedStreak.longestStreak, updatedStreak.currentStreak);
      updatedStreak.lastActiveDate = today;
      
      setStreak(updatedStreak);
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updatedStreak));
    }
  };

  const checkAchievements = (progressData: Record<string, ProgressData>, moduleId: string) => {
    const newAchievements: AchievementData[] = [];
    const currentTime = new Date().toISOString();
    
    // First lesson achievement
    if (!achievements.find(a => a.id === 'first-lesson')) {
      const hasCompletedLesson = Object.values(progressData).some(p => p.lessonsCompleted > 0);
      if (hasCompletedLesson) {
        newAchievements.push({ id: 'first-lesson', earnedDate: currentTime, moduleId });
      }
    }
    
    // Foundation master achievement
    if (!achievements.find(a => a.id === 'foundation-master')) {
      const foundationalModules = ['dotnet', 'laravel', 'react'];
      const foundationCompleted = foundationalModules.every(mod => 
        progressData[mod]?.completionStatus === 'completed'
      );
      if (foundationCompleted) {
        newAchievements.push({ id: 'foundation-master', earnedDate: currentTime, moduleId });
      }
    }
    
    // Speed learner achievement (5 lessons in one day)
    const today = new Date().toDateString();
    const todaysProgress = Object.values(progressData).filter(p => 
      new Date(p.lastAccessed).toDateString() === today
    );
    const lessonsToday = todaysProgress.reduce((sum, p) => sum + p.lessonsCompleted, 0);
    
    if (lessonsToday >= 5 && !achievements.find(a => a.id === 'speed-learner')) {
      newAchievements.push({ id: 'speed-learner', earnedDate: currentTime, moduleId });
    }
    
    // Perfectionist achievement (100% on 10 quizzes)
    if (!achievements.find(a => a.id === 'perfectionist')) {
      const perfectScores = Object.values(progressData).filter(p => p.quizScore === 100);
      if (perfectScores.length >= 10) {
        newAchievements.push({ id: 'perfectionist', earnedDate: currentTime, moduleId });
      }
    }
    
    // Streak warrior achievement (7-day streak)
    if (streak.currentStreak >= 7 && !achievements.find(a => a.id === 'streak-warrior')) {
      newAchievements.push({ id: 'streak-warrior', earnedDate: currentTime, moduleId });
    }
    
    // Full stack achievement
    if (!achievements.find(a => a.id === 'full-stack')) {
      const backendModules = ['dotnet', 'laravel', 'node', 'database'];
      const frontendModules = ['react', 'vue', 'nextjs', 'typescript'];
      
      const backendCompleted = backendModules.some(mod => 
        progressData[mod]?.completionStatus === 'completed'
      );
      const frontendCompleted = frontendModules.some(mod => 
        progressData[mod]?.completionStatus === 'completed'
      );
      
      if (backendCompleted && frontendCompleted) {
        newAchievements.push({ id: 'full-stack', earnedDate: currentTime, moduleId });
      }
    }
    
    if (newAchievements.length > 0) {
      const updatedAchievements = [...achievements, ...newAchievements];
      setAchievements(updatedAchievements);
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updatedAchievements));
    }
  };

  const calculateOverallProgress = () => {
    const allModules = ['dotnet', 'laravel', 'react', 'node', 'vue', 'database', 'nextjs', 'graphql', 'typescript', 'tailwind', 'sass', 'testing'];
    const totalModules = allModules.length;
    const completedModules = allModules.filter(moduleId => 
      progress[moduleId]?.completionStatus === 'completed'
    ).length;
    
    return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  };

  const getCompletedModulesCount = () => {
    return Object.values(progress).filter(p => p.completionStatus === 'completed').length;
  };

  const getTotalTimeSpent = () => {
    return Object.values(progress).reduce((total, p) => total + p.timeSpent, 0);
  };

  const getAverageQuizScore = () => {
    const scores = Object.values(progress).filter(p => p.quizScore > 0).map(p => p.quizScore);
    return scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
  };

  return {
    progress,
    streak,
    achievements,
    updateProgress,
    calculateOverallProgress,
    getCompletedModulesCount,
    getTotalTimeSpent,
    getAverageQuizScore
  };
};