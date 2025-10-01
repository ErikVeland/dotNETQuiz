'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useProgressTracking } from '../hooks/useProgressTracking';

interface Module {
  id: string;
  title: string;
  description: string;
  lessonsLink: string;
  interviewLink: string;
  color: string;
  gradient: string;
  tier: number;
  estimatedTime: string;
  prerequisites: string[];
  lessonsCount: number;
  questionsCount: number;
  category: 'backend' | 'frontend' | 'quality';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SearchFilters {
  tier: 'all' | '1' | '2' | '3' | '4';
  category: 'all' | 'backend' | 'frontend' | 'quality';
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  status: 'all' | 'not-started' | 'in-progress' | 'completed';
}



const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({ value, onChange, placeholder, onFocus, onBlur }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          ⌘K
        </span>
      </div>
    </div>
  );
};

const FilterTabs: React.FC<{
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}> = ({ filters, onChange }) => {
  const filterOptions = {
    tier: [
      { value: 'all', label: 'All Tiers', count: 0 },
      { value: '1', label: '1. Foundational', count: 0 },
      { value: '2', label: '2. Core', count: 0 },
      { value: '3', label: '3. Specialized', count: 0 },
      { value: '4', label: '4. Quality', count: 0 }
    ],
    category: [
      { value: 'all', label: 'All Categories', count: 0 },
      { value: 'backend', label: '🔧 Backend', count: 0 },
      { value: 'frontend', label: '🎨 Frontend', count: 0 },
      { value: 'quality', label: '🛡️ Quality', count: 0 }
    ],
    difficulty: [
      { value: 'all', label: 'All Levels', count: 0 },
      { value: 'beginner', label: 'Beginner', count: 0 },
      { value: 'intermediate', label: 'Intermediate', count: 0 },
      { value: 'advanced', label: 'Advanced', count: 0 },
      { value: 'expert', label: 'Expert', count: 0 }
    ],
    status: [
      { value: 'all', label: 'All Status', count: 0 },
      { value: 'not-started', label: 'Not Started', count: 0 },
      { value: 'in-progress', label: 'In Progress', count: 0 },
      { value: 'completed', label: 'Completed', count: 0 }
    ]
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.entries(filterOptions).map(([filterKey, options]) => (
        <div key={filterKey} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {filterKey}
          </label>
          <select
            value={filters[filterKey as keyof SearchFilters]}
            onChange={(e) => updateFilter(filterKey as keyof SearchFilters, e.target.value)}
            className="w-full px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

const QuickFilters: React.FC<{
  onQuickFilter: (filter: Partial<SearchFilters>) => void;
  activeFilters: SearchFilters;
}> = ({ onQuickFilter, activeFilters }) => {
  const quickFilterButtons = [
    { 
      label: 'Foundational', 
      icon: '🏗️', 
      filter: { tier: '1' as const },
      active: activeFilters.tier === '1'
    },
    { 
      label: 'Backend', 
      icon: '🔧', 
      filter: { category: 'backend' as const },
      active: activeFilters.category === 'backend'
    },
    { 
      label: 'Frontend', 
      icon: '🎨', 
      filter: { category: 'frontend' as const },
      active: activeFilters.category === 'frontend'
    },
    { 
      label: 'Beginner', 
      icon: '👶', 
      filter: { difficulty: 'beginner' as const },
      active: activeFilters.difficulty === 'beginner'
    },
    { 
      label: 'Completed', 
      icon: '✅', 
      filter: { status: 'completed' as const },
      active: activeFilters.status === 'completed'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
        Quick filters:
      </span>
      {quickFilterButtons.map(button => (
        <button
          key={button.label}
          onClick={() => onQuickFilter(button.filter)}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 flex items-center space-x-1 ${
            button.active
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-300'
          }`}
        >
          <span>{button.icon}</span>
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
};

const SearchResults: React.FC<{
  query: string;
  totalResults: number;
  filteredResults: number;
  onClear: () => void;
}> = ({ query, totalResults, filteredResults, onClear }) => {
  if (!query && totalResults === filteredResults) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="text-sm text-blue-800 dark:text-blue-200">
        {query && (
          <>
            Showing {filteredResults} result{filteredResults !== 1 ? 's' : ''} for &quot;{query}&quot;
            {filteredResults !== totalResults && ` (filtered from ${totalResults})`}
          </>
        )}
        {!query && filteredResults !== totalResults && (
          <>
            Showing {filteredResults} of {totalResults} modules
          </>
        )}
      </div>
      <button
        onClick={onClear}
        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
      >
        Clear filters
      </button>
    </div>
  );
};

export // Standalone Search and Filter Component
const SearchFilterSystem: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    tier: 'all',
    category: 'all',
    difficulty: 'all',
    status: 'all'
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { progress } = useProgressTracking();

  // Mock modules data for demonstration
  const modules: Module[] = [];

  const getModuleStatus = (moduleId: string): 'not-started' | 'in-progress' | 'completed' => {
    const moduleProgress = progress[moduleId];
    if (!moduleProgress) return 'not-started';
    return moduleProgress.completionStatus;
  };

  const filterModules = (modules: Module[], query: string, filters: SearchFilters) => {
    return modules.filter(module => {
      // Text search
      const matchesSearch = !query || 
        module.title.toLowerCase().includes(query.toLowerCase()) ||
        module.description.toLowerCase().includes(query.toLowerCase()) ||
        module.prerequisites.some(prereq => prereq.toLowerCase().includes(query.toLowerCase()));

      // Filter by tier
      const matchesTier = filters.tier === 'all' || module.tier.toString() === filters.tier;

      // Filter by category
      const matchesCategory = filters.category === 'all' || module.category === filters.category;

      // Filter by difficulty
      const matchesDifficulty = filters.difficulty === 'all' || module.difficulty === filters.difficulty;

      // Filter by status
      const moduleStatus = getModuleStatus(module.id);
      const matchesStatus = filters.status === 'all' || moduleStatus === filters.status;

      return matchesSearch && matchesTier && matchesCategory && matchesDifficulty && matchesStatus;
    });
  };

  const filteredModules = filterModules(modules, searchQuery, filters);

  const handleQuickFilter = (quickFilter: Partial<SearchFilters>) => {
    const newFilters = { ...filters };
    
    // Toggle filter if it's already active
    Object.entries(quickFilter).forEach(([key, value]) => {
      const filterKey = key as keyof SearchFilters;
      if (newFilters[filterKey] === value) {
        newFilters[filterKey] = 'all';
      } else {
        newFilters[filterKey] = value as any;
      }
    });
    
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      tier: 'all',
      category: 'all',
      difficulty: 'all',
      status: 'all'
    });
  };

  const hasActiveFilters = searchQuery !== '' || Object.values(filters).some(value => value !== 'all');

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search modules, topics, or technologies..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* Quick Filters */}
        <QuickFilters onQuickFilter={handleQuickFilter} activeFilters={filters} />

        {/* Detailed Filters */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isSearchFocused || hasActiveFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Advanced Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
                >
                  Reset all
                </button>
              )}
            </div>
            <FilterTabs filters={filters} onChange={setFilters} />
          </div>
        </div>

        {/* Search Results */}
        <SearchResults
          query={searchQuery}
          totalResults={modules.length}
          filteredResults={filteredModules.length}
          onClear={clearAllFilters}
        />
      </div>
    </div>
  );
};

export default SearchFilterSystem;