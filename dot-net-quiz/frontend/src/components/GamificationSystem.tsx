'use client'

import React, { useState, useEffect } from 'react';
import { useProgressTracking } from '../hooks/useProgressTracking';

interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'learning' | 'social' | 'achievement' | 'mastery';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Record<string, Achievement> = {
  'first-lesson': { 
    id: 'first-lesson',
    title: 'First Steps', 
    icon: '👶', 
    description: 'Complete your first lesson',
    category: 'learning',
    rarity: 'common'
  },
  'foundation-master': { 
    id: 'foundation-master',
    title: 'Foundation Master', 
    icon: '🏗️', 
    description: 'Complete all foundational modules',
    category: 'mastery',
    rarity: 'rare'
  },
  'speed-learner': { 
    id: 'speed-learner',
    title: 'Speed Learner', 
    icon: '⚡', 
    description: 'Complete 5 lessons in one day',
    category: 'achievement',
    rarity: 'rare'
  },
  'perfectionist': { 
    id: 'perfectionist',
    title: 'Perfectionist', 
    icon: '💯', 
    description: 'Score 100% on 10 quizzes',
    category: 'achievement',
    rarity: 'epic'
  },
  'streak-warrior': { 
    id: 'streak-warrior',
    title: 'Streak Warrior', 
    icon: '🔥', 
    description: 'Maintain a 7-day learning streak',
    category: 'achievement',
    rarity: 'epic'
  },
  'full-stack': { 
    id: 'full-stack',
    title: 'Full Stack Developer', 
    icon: '🚀', 
    description: 'Complete both backend and frontend paths',
    category: 'mastery',
    rarity: 'legendary'
  }
};

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

const ProgressRing: React.FC<{ percentage: number; size?: number; strokeWidth?: number }> = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 6 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{ achievement: Achievement; earned: boolean; earnedDate?: string }> = ({ 
  achievement, 
  earned, 
  earnedDate 
}) => {
  return (
    <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
      earned 
        ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white shadow-lg` 
        : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`text-2xl ${earned ? 'grayscale-0' : 'grayscale'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold text-sm ${
            earned ? 'text-white' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {achievement.title}
          </h4>
          <p className={`text-xs ${
            earned ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {achievement.description}
          </p>
          {earned && earnedDate && (
            <p className="text-xs text-white/75 mt-1">
              Earned {new Date(earnedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      {earned && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

const StreakCounter: React.FC<{ streak: number; longestStreak: number }> = ({ streak, longestStreak }) => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-4 rounded-xl shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="text-3xl">🔥</div>
        <div>
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-sm opacity-90">Day Streak</div>
          {longestStreak > streak && (
            <div className="text-xs opacity-75">Best: {longestStreak} days</div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ 
  title: string; 
  value: string | number; 
  icon: string; 
  subtitle?: string;
  gradient: string;
}> = ({ title, value, icon, subtitle, gradient }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white p-4 rounded-xl shadow-lg`}>
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-90">{title}</div>
          {subtitle && (
            <div className="text-xs opacity-75">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const GamificationDashboard: React.FC = () => {
  const { 
    progress, 
    streak, 
    achievements: earnedAchievements, 
    calculateOverallProgress,
    getCompletedModulesCount,
    getTotalTimeSpent,
    getAverageQuizScore
  } = useProgressTracking();

  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const overallProgress = calculateOverallProgress();
  const completedCount = getCompletedModulesCount();
  const totalTime = getTotalTimeSpent();
  const avgScore = getAverageQuizScore();

  const earnedAchievementIds = earnedAchievements.map(a => a.id);
  const earnedCount = earnedAchievementIds.length;
  const totalAchievements = Object.keys(achievements).length;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Your Learning Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress, earn achievements, and celebrate your learning milestones
        </p>
      </div>

      {/* Main Progress Ring */}
      <div className="flex justify-center mb-8">
        <ProgressRing percentage={overallProgress} size={120} strokeWidth={8} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Completed"
          value={completedCount}
          icon="✅"
          subtitle="modules"
          gradient="from-green-400 to-green-600"
        />
        <StatsCard
          title="Time Spent"
          value={formatTime(totalTime)}
          icon="⏱️"
          subtitle="learning"
          gradient="from-blue-400 to-blue-600"
        />
        <StatsCard
          title="Avg Score"
          value={avgScore > 0 ? `${avgScore}%` : '-'}
          icon="🎯"
          subtitle="quiz average"
          gradient="from-purple-400 to-purple-600"
        />
        <StreakCounter streak={streak.currentStreak} longestStreak={streak.longestStreak} />
      </div>

      {/* Achievements Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Achievements
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {earnedCount} of {totalAchievements} unlocked
            </p>
          </div>
          <button
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            {showAllAchievements ? 'Show Earned Only' : 'Show All'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(achievements)
            .filter(achievement => 
              showAllAchievements || earnedAchievementIds.includes(achievement.id)
            )
            .map(achievement => {
              const earned = earnedAchievementIds.includes(achievement.id);
              const earnedData = earnedAchievements.find(a => a.id === achievement.id);
              
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  earned={earned}
                  earnedDate={earnedData?.earnedDate}
                />
              );
            })}
        </div>

        {!showAllAchievements && earnedCount === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start learning to unlock your first achievement!
            </p>
            <button
              onClick={() => setShowAllAchievements(true)}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              View Available Achievements
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { GamificationDashboard as GamificationSystem };
export default GamificationDashboard;