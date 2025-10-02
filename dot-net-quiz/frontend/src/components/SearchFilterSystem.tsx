'use client'

import React, { useState, useRef, useEffect } from 'react';

// Enhanced Search and Filter System that integrates with the 4-tier homepage structure
interface SearchFilterSystemProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTier: string | null;
  onTierChange: (tier: string | null) => void;
  selectedDifficulty: string | null;
  onDifficultyChange: (difficulty: string | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  onClearFilters: () => void;
  totalResults: number;
  filteredResults: number;
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
        <svg className="h-5 w-5 text-white/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
        className="block w-full pl-10 pr-12 py-3 glass-search-input rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
          ⌘K
        </span>
      </div>
    </div>
  );
};

const SearchFilterSystem: React.FC<SearchFilterSystemProps> = ({
  searchQuery,
  onSearchChange,
  selectedTier,
  onTierChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  totalResults,
  filteredResults
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const hasActiveFilters = searchQuery || selectedTier || selectedDifficulty || selectedCategory || selectedStatus;

  // Quick filter buttons for common searches
  const quickFilters = [
    { label: 'Foundational', type: 'tier', value: 'foundational', icon: '🏗️' },
    { label: 'Backend', type: 'category', value: 'backend', icon: '🔧' },
    { label: 'Frontend', type: 'category', value: 'frontend', icon: '🎨' },
    { label: 'Not Started', type: 'status', value: 'not-started', icon: '⏳' },
    { label: 'In Progress', type: 'status', value: 'in-progress', icon: '🔄' },
    { label: 'Completed', type: 'status', value: 'completed', icon: '✅' }
  ];

  const handleQuickFilter = (type: string, value: string) => {
    switch (type) {
      case 'tier':
        onTierChange(selectedTier === value ? null : value);
        break;
      case 'category':
        onCategoryChange(selectedCategory === value ? null : value);
        break;
      case 'status':
        onStatusChange(selectedStatus === value ? null : value);
        break;
    }
  };

  const isQuickFilterActive = (type: string, value: string) => {
    switch (type) {
      case 'tier': return selectedTier === value;
      case 'category': return selectedCategory === value;
      case 'status': return selectedStatus === value;
      default: return false;
    }
  };

  return (
    <div className="search-filter-system" role="search" aria-label="Search and filter learning modules">
      {/* Main Search Input */}
      <div className="search-input-container">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search modules, topics, or technologies..."
          onFocus={() => setShowAdvancedFilters(true)}
        />
      </div>

      {/* Quick Filters Section */}
      <div className="filters-section mt-4">
        <div className="quick-filters-header">
          <h3 className="quick-filters-heading text-white font-medium mb-3">Quick filters</h3>
        </div>
        <div className="quick-filters-row flex flex-wrap items-center gap-2">
          <div className="quick-filters-buttons flex flex-wrap gap-2">
            {quickFilters.map(filter => (
              <button
                key={`${filter.type}-${filter.value}`}
                onClick={() => handleQuickFilter(filter.type, filter.value)}
                className={`glass-filter-tag ${
                  isQuickFilterActive(filter.type, filter.value) ? 'active' : ''
                }`}
                aria-pressed={isQuickFilterActive(filter.type, filter.value)}
              >
                <span className="filter-icon">{filter.icon}</span>
                <span className="filter-label">{filter.label}</span>
              </button>
            ))}
          </div>
          
          {/* Advanced Filters Toggle Button - Aligned with Quick Filters */}
          <div className="advanced-filters-toggle-container ml-auto">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`glass-button text-sm ${
                showAdvancedFilters ? 'active' : ''
              }`}
              aria-expanded={showAdvancedFilters}
              aria-controls="advanced-filters"
            >
              <span className="toggle-icon mr-1">
                {showAdvancedFilters ? '▲' : '▼'}
              </span>
              <span className="toggle-label">
                {showAdvancedFilters ? 'Hide Advanced' : 'Show Advanced'}
              </span>
              {hasActiveFilters && (
                <span className="active-filters-indicator ml-2">
                  ({Object.values({
                    tier: selectedTier,
                    difficulty: selectedDifficulty,
                    category: selectedCategory,
                    status: selectedStatus
                  }).filter(Boolean).length})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters (Expandable) */}
      {showAdvancedFilters && (
        <div className="advanced-filters-container glass-morphism rounded-xl p-6 mt-4" id="advanced-filters">
          <div className="advanced-filters-header flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Advanced Filters</h3>
            {hasActiveFilters && (
              <button onClick={onClearFilters} className="glass-button">
                Clear all
              </button>
            )}
          </div>
          
          <div className="filters-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier Filter */}
            <div className="filter-group">
              <label htmlFor="tier-filter" className="block text-sm font-medium text-white mb-2">
                Learning Tier
              </label>
              <select
                id="tier-filter"
                value={selectedTier || ''}
                onChange={(e) => onTierChange(e.target.value || null)}
                className="glass-search-input rounded-lg"
              >
                <option value="">All Tiers</option>
                <option value="foundational">🏗️ Foundational</option>
                <option value="core">🔧 Core Technologies</option>
                <option value="specialized">✨ Specialized Skills</option>
                <option value="quality">🔒 Quality & Testing</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="filter-group">
              <label htmlFor="difficulty-filter" className="block text-sm font-medium text-white mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty-filter"
                value={selectedDifficulty || ''}
                onChange={(e) => onDifficultyChange(e.target.value || null)}
                className="glass-search-input rounded-lg"
              >
                <option value="">All Levels</option>
                <option value="Beginner">🌱 Beginner</option>
                <option value="Intermediate">🌿 Intermediate</option>
                <option value="Advanced">🚀 Advanced</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label htmlFor="category-filter" className="block text-sm font-medium text-white mb-2">
                Technology Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory || ''}
                onChange={(e) => onCategoryChange(e.target.value || null)}
                className="glass-search-input rounded-lg"
              >
                <option value="">All Categories</option>
                <option value="programming">💻 Programming</option>
                <option value="web">🌐 Web Development</option>
                <option value="frontend">🎨 Frontend</option>
                <option value="backend">🔧 Backend</option>
                <option value="database">🗄️ Database</option>
                <option value="devops">⚙️ DevOps</option>
                <option value="testing">🧪 Testing</option>
                <option value="performance">⚡ Performance</option>
                <option value="security">🔒 Security</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="filter-group">
              <label htmlFor="status-filter" className="block text-sm font-medium text-white mb-2">
                Progress Status
              </label>
              <select
                id="status-filter"
                value={selectedStatus || ''}
                onChange={(e) => onStatusChange(e.target.value || null)}
                className="glass-search-input rounded-lg"
              >
                <option value="">All Statuses</option>
                <option value="not-started">⏳ Not Started</option>
                <option value="in-progress">🔄 In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="results-summary mt-6 pt-4 border-t border-white/20">
            <p className="text-white/90">
              Showing <span className="font-semibold">{filteredResults}</span> of{' '}
              <span className="font-semibold">{totalResults}</span> modules
            </p>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      {(hasActiveFilters || searchQuery) && (
        <div className="search-results-summary" role="status" aria-live="polite">
          <div className="results-info">
            {searchQuery && (
              <span className="search-query-info">
                Results for &quot;<strong>{searchQuery}</strong>&quot;
              </span>
            )}
            <span className="results-count">
              Showing {filteredResults} of {totalResults} modules
            </span>
          </div>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className="clear-results-button">
              Clear filters
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .search-filter-system {
          max-width: 1200px;
          margin: 0 auto 2rem;
          padding: 0 2rem;
        }

        .search-input-container {
          margin-bottom: 1.5rem;
        }

        .quick-filters-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .filters-section {
          margin-bottom: 1.5rem;
        }

        .quick-filters-header {
          margin-bottom: 0.75rem;
        }

        .quick-filters-heading {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quick-filters-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .quick-filters-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .quick-filters-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .quick-filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-filter-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .quick-filter-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
          color: #93C5FD;
        }

        .filter-icon {
          font-size: 1rem;
        }

        .advanced-filters-toggle-container {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .advanced-filters-toggle-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          white-space: nowrap;
        }

        .advanced-filters-toggle-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .advanced-filters-toggle-button.active {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
          color: #93C5FD;
        }

        .toggle-icon {
          font-size: 1rem;
          transition: transform 0.2s ease;
        }

        .toggle-label {
          font-weight: 600;
        }

        .active-filters-indicator {
          font-size: 0.625rem;
          opacity: 0.9;
          background: rgba(59, 130, 246, 0.2);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          border: 1px solid rgba(59, 130, 246, 0.3);
          margin-left: 0.25rem;
        }

        .advanced-filters-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .advanced-filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .advanced-filters-header h3 {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .clear-all-button {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #FCA5A5;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-all-button:hover {
          background: rgba(239, 68, 68, 0.3);
          color: white;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .filter-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          color: white;
          padding: 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .filter-select option {
          background: #1f2937;
          color: white;
        }

        .search-results-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 0.5rem;
          color: white;
          margin-bottom: 1.5rem;
        }

        .results-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .search-query-info {
          font-size: 0.875rem;
        }

        .results-count {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .clear-results-button {
          background: transparent;
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #93C5FD;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-results-button:hover {
          background: rgba(59, 130, 246, 0.2);
          color: white;
        }

        @media (max-width: 768px) {
          .search-filter-system {
            padding: 0 1rem;
          }

          .quick-filters-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .quick-filters-buttons {
            justify-content: center;
          }

          .advanced-filters-toggle-container {
            justify-content: center;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .search-results-summary {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .quick-filters-buttons {
            flex-direction: column;
            width: 100%;
          }

          .quick-filter-button {
            justify-content: center;
            width: 100%;
          }

          .advanced-filters-toggle-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchFilterSystem;