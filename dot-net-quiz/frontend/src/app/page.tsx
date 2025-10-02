'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { contentRegistry } from '@/lib/contentRegistry';
import type { Module, Tier } from '@/lib/contentRegistry';
import { useProgressTracking } from '../hooks/useProgressTracking';
import { GamificationSystem } from '../components/GamificationSystem';
import GamificationDashboard from '../components/GamificationDashboard';
import SearchFilterSystem from '../components/SearchFilterSystem';
import { AccessibilityProvider, useAccessibility } from '../components/AccessibilityProvider';
import '../styles/responsive.scss';
import '../styles/design-system.scss';
import '../styles/homepage.scss';
import '../styles/liquid-glass.scss';

// Registry-driven learning structure
interface TierData {
  tier: Tier;
  modules: Module[];
}

interface RegistryData {
  tiers: Record<string, TierData>;
  allModules: Module[];
}

// Enhanced ModuleCard component with accessibility, progress tracking, and achievement indicators
const ModuleCard: React.FC<{ 
  module: Module; 
  tierColor: string;
  tierKey: string;
}> = ({ module, tierColor, tierKey }) => {
  const { progress, updateProgress, achievements } = useProgressTracking();
  const moduleProgress = progress[module.slug];
  const completionPercentage = moduleProgress ? 
    (moduleProgress.lessonsCompleted / moduleProgress.totalLessons) * 100 : 0;
  
  // Check for achievements related to this module
  const moduleAchievements = achievements.filter(a => a.moduleId === module.slug || a.tier === tierKey);
  const hasAchievements = moduleAchievements.length > 0;
  
  // Determine module status
  const moduleStatus = moduleProgress?.completionStatus || 'not-started';
  
  // Check prerequisites
  const prerequisitesMet = module.prerequisites.every(prereqId => 
    progress[prereqId]?.completionStatus === 'completed'
  );
  
  const isLocked = module.prerequisites.length > 0 && !prerequisitesMet;
  
  const handleModuleClick = () => {
    if (!isLocked) {
      updateProgress(module.slug, {
        lastAccessed: new Date().toISOString(),
        timeSpent: (moduleProgress?.timeSpent || 0) + 1
      });
    }
  };
  
  return (
    <div className={`module-card-container ${isLocked ? 'locked' : ''}`}>
      <Link 
        href={isLocked ? '#' : module.routes.overview} 
        className={`liquid-glass-module-card tier-${tierKey} ${
          isLocked 
            ? 'pointer-events-none opacity-60' 
            : 'hover:transform hover:scale-105 hover:shadow-xl'
        }`}
        onClick={handleModuleClick}
        aria-disabled={isLocked}
        aria-describedby={`module-${module.slug}-description`}
        role="article"
      >
        {/* Achievement badges overlay */}
        {hasAchievements && !isLocked && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="flex flex-wrap gap-1">
              {moduleAchievements.slice(0, 3).map((achievement, index) => (
                <div 
                  key={achievement.id}
                  className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                  title={achievement.description}
                >
                  <span className="text-xs text-white font-bold">
                    {index === 0 ? '🏆' : index === 1 ? '🎖️' : '⭐'}
                  </span>
                </div>
              ))}
              {moduleAchievements.length > 3 && (
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <span className="text-xs text-white font-bold">+{moduleAchievements.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Lock overlay for prerequisites */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-5">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm font-medium">Prerequisites Required</p>
              <p className="text-xs opacity-80 mt-1">
                Complete: {module.prerequisites.join(', ')}
              </p>
            </div>
          </div>
        )}
        
        <div className="module-header flex items-start gap-4 mb-4">
          <span className="text-4xl" role="img" aria-label={`${module.title} icon`}>
            {module.icon}
          </span>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-white mb-2" id={`module-${module.slug}-title`}>
              {module.title}
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {module.difficulty}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                moduleStatus === 'not-started' ? 'bg-gray-500/20 text-gray-300' :
                moduleStatus === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {moduleStatus === 'not-started' ? '⏳ Not Started' :
                 moduleStatus === 'in-progress' ? '🔄 In Progress' :
                 '✅ Completed'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-white/90 mb-4" id={`module-${module.slug}-description`}>
          {module.description}
        </p>
        
        {/* Technologies used - Pill-shaped tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {module.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="px-2 py-1 bg-white/10 text-white rounded-full text-xs">
              {tech}
            </span>
          ))}
          {module.technologies.length > 3 && (
            <span className="px-2 py-1 bg-white/5 text-white/80 rounded-full text-xs">+{module.technologies.length - 3} more</span>
          )}
        </div>
        
        <div className="module-meta mt-auto">
          <div className="flex items-center justify-between text-sm text-white/80 mb-2">
            <span>📅 {module.estimatedHours}h</span>
            <span>{module.track}</span>
          </div>
          
          {moduleProgress && (
            <div className="liquid-glass-progress-container">
              <div 
                className="liquid-glass-progress-fill"
                style={{ width: `${completionPercentage}%` }}
                role="progressbar"
                aria-valuenow={completionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${Math.round(completionPercentage)}% complete`}
              />
            </div>
          )}
        </div>
        
        {/* Prerequisites indicator */}
        {module.prerequisites.length > 0 && (
          <div className="mt-2 text-xs text-white/70">
            🔗 Requires: {module.prerequisites.length} prerequisite{module.prerequisites.length > 1 ? 's' : ''}
          </div>
        )}
      </Link>
    </div>
  );
};

// Enhanced TierSection component with better accessibility and visual hierarchy
const TierSection: React.FC<{ 
  tierKey: string;
  tier: Tier;
  modules: Module[];
  isVisible: boolean;
}> = ({ tierKey, tier, modules, isVisible }) => {
  const { getTierProgress, progress } = useProgressTracking();
  const tierProgress = getTierProgress(tierKey as 'foundational' | 'core' | 'specialized' | 'quality');
  const completedModules = modules.filter(module => {
    const moduleProgress = progress[module.slug];
    return moduleProgress?.completionStatus === 'completed';
  }).length;
  
  if (!isVisible) return null;
  
  return (
    <section 
      className={`tier-section liquid-glass-tier-${tierKey}`}
      data-tier={tierKey}
      aria-labelledby={`tier-${tierKey}-heading`}
      role="region"
    >
      <div className="liquid-glass p-8 rounded-xl">
        <div className="tier-header mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {tier.level}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white" id={`tier-${tierKey}-heading`}>
                    {tier.title}
                  </h2>
                  <p className="text-white/90">{tier.description}</p>
                </div>
              </div>
              
              <div className="liquid-glass rounded-lg p-4 mb-4">
                <p className="font-medium text-white">
                  <strong>Focus:</strong> {tier.focusArea}
                </p>
              </div>
            </div>
            
            <div className="tier-progress-summary ml-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{tierProgress}%</div>
                <div className="text-white/80">Complete</div>
                <div className="text-white/80 mt-1">
                  {completedModules} of {modules.length} modules
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning objectives */}
          <div className="learning-objectives liquid-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Learning Objectives</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {tier.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                  <span className="text-white/90">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Modules grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label={`${tier.title} modules`}>
          {modules.map((module: Module) => (
            <div key={module.slug} role="listitem">
              <ModuleCard
                module={module}
                tierColor={tier.color}
                tierKey={tierKey}
              />
            </div>
          ))}
        </div>
        
        {/* Tier completion indicator */}
        {tierProgress === 100 && (
          <div className="tier-completion-celebration mt-8 text-center">
            <div className="liquid-glass p-6 rounded-xl">
              <span className="text-4xl mb-4 block">🎆</span>
              <h3 className="text-2xl font-bold text-white mb-2">Tier Complete!</h3>
              <p className="text-white/90 mb-4">
                Congratulations! You've mastered the {tier.title} tier. 
                {tierKey !== 'quality' && 'Ready for the next challenge?'}
              </p>
              {tierKey !== 'quality' && (
                <button className="liquid-glass-button">
                  → Continue to Next Tier
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Enhanced HomePage component with integrated search/filter and progress tracking
const HomePage: React.FC = () => {
  const [registryData, setRegistryData] = useState<RegistryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  const { 
    progress,
    calculateOverallProgress, 
    getCompletedModulesCount,
    getTierProgress,
    achievements,
    streak
  } = useProgressTracking();

  // Load registry data
  useEffect(() => {
    async function loadRegistryData() {
      try {
        setLoading(true);
        const [tiers, modules] = await Promise.all([
          contentRegistry.getTiers(),
          contentRegistry.getModules()
        ]);
        
        // Organize modules by tier
        const tierData: Record<string, TierData> = {};
        
        Object.entries(tiers).forEach(([tierKey, tier]) => {
          const tierModules = modules.filter(module => module.tier === tierKey)
                                   .sort((a, b) => a.order - b.order);
          tierData[tierKey] = {
            tier,
            modules: tierModules
          };
        });
        
        setRegistryData({
          tiers: tierData,
          allModules: modules
        });
      } catch (err) {
        console.error('Failed to load registry data:', err);
        setError('Failed to load learning modules. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    loadRegistryData();
  }, []);

  if (loading) {
    return (
      <div className="liquid-glass-layout">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass-loading mb-8"></div>
          <div className="space-y-4">
            <div className="liquid-glass-skeleton"></div>
            <div className="liquid-glass-skeleton"></div>
            <div className="liquid-glass-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !registryData) {
    return (
      <div className="liquid-glass-layout">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass p-8 rounded-xl text-center">
            <div className="text-6xl mb-4">🙁</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || 'Unable to load learning modules'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="liquid-glass-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();
  const completedModules = getCompletedModulesCount();
  const totalModules = registryData.allModules.length;

  // Get module status helper
  const getModuleStatus = (moduleSlug: string): 'not-started' | 'in-progress' | 'completed' => {
    const moduleProgress = progress[moduleSlug];
    if (!moduleProgress) return 'not-started';
    return moduleProgress.completionStatus;
  };

  // Filter modules based on search and filters
  const filteredTiers = Object.entries(registryData.tiers).reduce((acc, [tierKey, tierData]) => {
    let filteredModules = tierData.modules;

    // Text search filter
    if (searchQuery) {
      filteredModules = filteredModules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Tier filter
    if (selectedTier && selectedTier !== 'all' && selectedTier !== tierKey) {
      filteredModules = [];
    }

    // Difficulty filter
    if (selectedDifficulty && selectedDifficulty !== 'all') {
      filteredModules = filteredModules.filter(module =>
        module.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filteredModules = filteredModules.filter(module =>
        module.category === selectedCategory
      );
    }

    // Status filter
    if (selectedStatus && selectedStatus !== 'all') {
      filteredModules = filteredModules.filter(module => {
        const moduleStatus = getModuleStatus(module.slug);
        return moduleStatus === selectedStatus;
      });
    }

    if (filteredModules.length > 0) {
      acc[tierKey] = { ...tierData, modules: filteredModules };
    }

    return acc;
  }, {} as Record<string, TierData>);

  // Calculate current streak and recent achievements
  const recentAchievements = achievements
    .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
    .slice(0, 3);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTier(null);
    setSelectedDifficulty(null);
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  const hasActiveFilters = searchQuery || selectedTier || selectedDifficulty || selectedCategory || selectedStatus;
  
  // Skip to main content for accessibility
  const skipToMainContent = () => {
    const mainContent = document.getElementById('learning-tiers');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="liquid-glass-layout">
      <div className="max-w-4xl mx-auto">
        <main id="main-content" className="homepage" role="main">
        {/* Hero Section */}
        <section className="hero-section liquid-glass rounded-2xl p-8 mb-12">
          <div className="hero-content">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Master Modern Web Development
              <span className="hero-subtitle block mt-2 text-2xl">Comprehensive Learning Path</span>
            </h1>
            <p className="hero-description text-lg md:text-xl text-white/90 mb-6">
              Comprehensive learning paths across 18 technology modules with interactive lessons, 
              real-world projects, and interview preparation.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number text-white" aria-label={`${totalModules} total modules`}>
                  {totalModules}
                </span>
                <span className="stat-label text-white/80">Modules</span>
              </div>
              <div className="stat-item">
                <span className="stat-number text-white" aria-label={`${completedModules} completed modules`}>
                  {completedModules}
                </span>
                <span className="stat-label text-white/80">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number text-white" aria-label={`${Math.round(overallProgress)}% overall progress`}>
                  {Math.round(overallProgress)}%
                </span>
                <span className="stat-label text-white/80">Progress</span>
              </div>
              <div className="stat-item">
                <span className="stat-number text-white" aria-label={`${streak.currentStreak} day streak`}>
                  {streak.currentStreak}
                </span>
                <span className="stat-label text-white/80">Day Streak</span>
              </div>
            </div>
            
            {/* Recent achievements showcase */}
            {recentAchievements.length > 0 && (
              <div className="recent-achievements mt-6">
                <h2 className="achievements-title text-white font-semibold mb-3">Recent Achievements</h2>
                <div className="achievements-list">
                  {recentAchievements.map(achievement => (
                    <div key={achievement.id} className="achievement-item liquid-glass rounded-lg p-3 mb-2">
                      <span className="achievement-icon mr-2">🏆</span>
                      <span className="achievement-description text-white">{achievement.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="hero-visual">
            <div className="learning-path-visualization">
              <svg viewBox="0 0 400 300" className="path-svg" role="img" aria-label="Learning path visualization">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="25%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,250 Q150,200 200,150 T350,50"
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  fill="none"
                  className="learning-path"
                />
                <circle cx="50" cy="250" r="8" fill="#3B82F6" className="tier-node" aria-label="Foundational tier" />
                <circle cx="150" cy="175" r="8" fill="#10B981" className="tier-node" aria-label="Core technologies tier" />
                <circle cx="250" cy="125" r="8" fill="#8B5CF6" className="tier-node" aria-label="Specialized skills tier" />
                <circle cx="350" cy="50" r="8" fill="#F59E0B" className="tier-node" aria-label="Quality and testing tier" />
              </svg>
            </div>
          </div>
        </section>

        {/* Progress & Gamification Dashboard */}
        <GamificationDashboard />

        {/* Enhanced Search and Filter System */}
        <section className="search-filter-section mb-12" aria-labelledby="search-heading">
          <h2 id="search-heading" className="sr-only">Search and filter learning modules</h2>
          <div className="liquid-glass-search-container rounded-2xl">
            <SearchFilterSystem 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTier={selectedTier}
              onTierChange={setSelectedTier}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onClearFilters={clearFilters}
              totalResults={totalModules}
              filteredResults={Object.values(filteredTiers).reduce((sum, tier) => sum + tier.modules.length, 0)}
            />
          </div>
        </section>

        {/* Learning Tiers */}
        <div 
          id="learning-tiers" 
          className="learning-tiers" 
          tabIndex={-1}
          role="region" 
          aria-label="Learning modules organized by tier"
        >
          {hasActiveFilters && Object.keys(filteredTiers).length === 0 && (
            <div className="no-results" role="status" aria-live="polite">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3 className="no-results-title">No modules found</h3>
                <p className="no-results-description">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button 
                  onClick={clearFilters}
                  className="clear-filters-button"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
          
          {Object.entries(filteredTiers).map(([tierKey, tierData]) => (
            <TierSection 
              key={tierKey} 
              tier={tierData.tier} 
              modules={tierData.modules}
              tierKey={tierKey}
              isVisible={!hasActiveFilters || tierData.modules.length > 0}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <section className="quick-actions mb-12" aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading" className="text-3xl font-bold text-center text-white mb-8">Quick Actions</h2>
          <div className="actions-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            <Link href="/playground" className="liquid-glass liquid-glass-interactive rounded-xl p-6 text-center" role="listitem">
              <span className="action-icon text-4xl block mb-3" role="img" aria-label="Playground icon">🛝</span>
              <h3 className="text-xl font-semibold text-white mb-2">GraphQL Playground</h3>
              <p className="text-white/80">Experiment with GraphQL queries and mutations</p>
            </Link>
            
            <Link href="/animated-background-demo" className="liquid-glass liquid-glass-interactive rounded-xl p-6 text-center" role="listitem">
              <span className="action-icon text-4xl block mb-3" role="img" aria-label="Design icon">🎨</span>
              <h3 className="text-xl font-semibold text-white mb-2">Design Showcase</h3>
              <p className="text-white/80">Explore our animated backgrounds and UI components</p>
            </Link>
            
            <Link href="/interview-prep" className="liquid-glass liquid-glass-interactive rounded-xl p-6 text-center" role="listitem">
              <span className="action-icon text-4xl block mb-3" role="img" aria-label="Interview icon">💼</span>
              <h3 className="text-xl font-semibold text-white mb-2">Interview Prep</h3>
              <p className="text-white/80">Practice with real interview questions</p>
            </Link>
            
            <button 
              onClick={() => {
                const progressData = { progress, achievements, streak };
                const dataStr = JSON.stringify(progressData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `learning-progress-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="liquid-glass liquid-glass-interactive rounded-xl p-6 text-center"
              role="listitem"
            >
              <span className="action-icon text-4xl block mb-3" role="img" aria-label="Export icon">📥</span>
              <h3 className="text-xl font-semibold text-white mb-2">Export Progress</h3>
              <p className="text-white/80">Download your learning progress and achievements</p>
            </button>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
};

const HomePageWithProviders: React.FC = () => {
  return (
    <AccessibilityProvider>
      <HomePage />
    </AccessibilityProvider>
  );
};

export default HomePageWithProviders;