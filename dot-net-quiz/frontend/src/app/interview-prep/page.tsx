'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../../styles/design-system.scss';

// Interview Preparation Hub - Non-Gamified Educational Structure
interface InterviewModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  questionCount: number;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'general';
  technologies: string[];
  href: string;
  prerequisites: string[];
}

interface InterviewTier {
  title: string;
  description: string;
  color: string;
  modules: InterviewModule[];
  tierLevel: number;
  focusArea: string;
  learningObjectives: string[];
}

const interviewTiers: Record<string, InterviewTier> = {
  foundational: {
    title: 'Foundational Interview Prep',
    description: 'Master fundamental programming and web development interview questions',
    color: 'from-blue-500 to-cyan-500',
    tierLevel: 1,
    focusArea: 'Programming basics, web fundamentals, algorithms',
    learningObjectives: [
      'Master basic programming interview questions',
      'Understand fundamental web development concepts',
      'Practice algorithmic thinking and problem solving'
    ],
    modules: [
      {
        id: 'javascript-questions',
        title: 'JavaScript Fundamentals',
        description: 'ES6+, async/await, closures, prototypes, and core JavaScript concepts',
        icon: '📜',
        difficulty: 'Beginner',
        estimatedTime: '45-60 minutes',
        questionCount: 25,
        category: 'frontend',
        technologies: ['JavaScript', 'ES6+', 'Async/Await', 'DOM'],
        href: '/javascript/interview-questions',
        prerequisites: []
      },
      {
        id: 'sass-questions',
        title: 'CSS & SASS',
        description: 'Styling fundamentals, responsive design, and CSS preprocessors',
        icon: '🎨',
        difficulty: 'Beginner',
        estimatedTime: '30-45 minutes',
        questionCount: 18,
        category: 'frontend',
        technologies: ['CSS3', 'SASS', 'Responsive Design', 'Flexbox'],
        href: '/sass/interview-questions',
        prerequisites: []
      }
    ]
  },
  core: {
    title: 'Core Technology Interviews',
    description: 'Deep dive into major frameworks and backend technologies',
    color: 'from-green-500 to-emerald-500',
    tierLevel: 2,
    focusArea: 'Framework mastery, backend development, database design',
    learningObjectives: [
      'Master core framework interview questions',
      'Understand backend architecture patterns',
      'Design efficient database solutions'
    ],
    modules: [
      {
        id: 'react-questions',
        title: 'React Development',
        description: 'Components, hooks, state management, and modern React patterns',
        icon: '⚛️',
        difficulty: 'Intermediate',
        estimatedTime: '60-75 minutes',
        questionCount: 30,
        category: 'frontend',
        technologies: ['React', 'JSX', 'Hooks', 'Context API'],
        href: '/react/interview-questions',
        prerequisites: ['javascript-questions']
      },
      {
        id: 'dotnet-questions',
        title: '.NET Core & C#',
        description: 'C# language features, ASP.NET Core, Entity Framework, and enterprise patterns',
        icon: '⚡',
        difficulty: 'Intermediate',
        estimatedTime: '75-90 minutes',
        questionCount: 35,
        category: 'backend',
        technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'LINQ'],
        href: '/dotnet/interview-questions',
        prerequisites: ['javascript-questions']
      }
    ]
  },
  specialized: {
    title: 'Specialized Interview Topics',
    description: 'Advanced frameworks, modern development practices, and emerging technologies',
    color: 'from-purple-500 to-violet-500',
    tierLevel: 3,
    focusArea: 'Advanced frameworks, TypeScript, modern tooling',
    learningObjectives: [
      'Master advanced framework concepts',
      'Understand modern development tooling',
      'Implement complex architectural patterns'
    ],
    modules: [
      {
        id: 'typescript-questions',
        title: 'TypeScript',
        description: 'Type system, interfaces, generics, and advanced TypeScript patterns',
        icon: '📘',
        difficulty: 'Advanced',
        estimatedTime: '45-60 minutes',
        questionCount: 20,
        category: 'frontend',
        technologies: ['TypeScript', 'Generics', 'Interfaces', 'Type Guards'],
        href: '/typescript/interview-questions',
        prerequisites: ['react-questions']
      }
    ]
  },
  expert: {
    title: 'Expert-Level Challenges',
    description: 'System design, DevOps practices, and senior-level interview preparation',
    color: 'from-orange-500 to-red-500',
    tierLevel: 4,
    focusArea: 'System design, DevOps, architecture, senior-level concepts',
    learningObjectives: [
      'Design scalable system architectures',
      'Master DevOps and deployment strategies',
      'Lead technical discussions and decisions'
    ],
    modules: [
      {
        id: 'system-design-questions',
        title: 'System Design',
        description: 'Scalability, architecture patterns, microservices, and distributed systems',
        icon: '🏗️',
        difficulty: 'Advanced',
        estimatedTime: '120-180 minutes',
        questionCount: 15,
        category: 'general',
        technologies: ['Architecture', 'Scalability', 'Microservices', 'Load Balancing'],
        href: '/system-design/interview-questions',
        prerequisites: []
      }
    ]
  }
};

// Interview Module Card Component
const InterviewModuleCard: React.FC<{ 
  module: InterviewModule; 
  tierColor: string;
  tierKey: string;
}> = ({ module, tierColor, tierKey }) => {
  const prerequisitesMet = module.prerequisites.length === 0;
  const isLocked = module.prerequisites.length > 0 && !prerequisitesMet;
  
  return (
    <div className={`module-card-container ${isLocked ? 'locked' : ''}`}>
      <Link 
        href={isLocked ? '#' : module.href} 
        className={`module-card glass-morphism ${
          isLocked 
            ? 'pointer-events-none opacity-60' 
            : 'hover:transform hover:scale-105 hover:shadow-xl'
        }`}
        aria-disabled={isLocked}
        role="article"
      >
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-5">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm font-medium">Prerequisites Required</p>
            </div>
          </div>
        )}
        
        <div className="module-header">
          <span className="module-icon text-3xl">{module.icon}</span>
          <div className="module-info">
            <h4 className="module-title">{module.title}</h4>
            <div className="flex items-center gap-2 mb-2">
              <span className={`difficulty-badge ${module.difficulty.toLowerCase()}`}>
                {module.difficulty}
              </span>
              <span className="question-count-badge">
                {module.questionCount} questions
              </span>
            </div>
          </div>
        </div>
        
        <p className="module-description">{module.description}</p>
        
        <div className="technologies-tags">
          {module.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
          {module.technologies.length > 3 && (
            <span className="tech-pill tech-pill-more">+{module.technologies.length - 3} more</span>
          )}
        </div>
        
        <div className="module-meta">
          <div className="estimated-time">⏱️ {module.estimatedTime}</div>
        </div>
      </Link>
    </div>
  );
};

// Tier Section Component
const InterviewTierSection: React.FC<{ 
  tier: InterviewTier; 
  tierKey: string;
  isVisible: boolean;
}> = ({ tier, tierKey, isVisible }) => {
  if (!isVisible) return null;
  
  const totalQuestions = tier.modules.reduce((sum, module) => sum + module.questionCount, 0);
  
  return (
    <section className="tier-section" data-tier={tierKey}>
      <div className={`tier-container glass-morphism tier-${tierKey}`}>
        <div className="tier-header">
          <div className="tier-header-content">
            <div className="tier-main-info">
              <h2 className="tier-title">
                <span className="tier-level">Tier {tier.tierLevel}</span>
                {tier.title}
              </h2>
              <p className="tier-description">{tier.description}</p>
              <p className="tier-focus-area">
                <strong>Focus:</strong> {tier.focusArea}
              </p>
            </div>
            
            <div className="tier-stats-summary">
              <div className="tier-stats">
                <div className="stat-item">
                  <span className="stat-number">{tier.modules.length}</span>
                  <span className="stat-label">modules</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{totalQuestions}</span>
                  <span className="stat-label">questions</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="learning-objectives">
            <h3 className="objectives-title">Learning Objectives</h3>
            <ul className="objectives-list">
              {tier.learningObjectives.map((objective, index) => (
                <li key={index} className="objective-item">
                  <span className="objective-icon">✓</span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="modules-grid">
          {tier.modules.map((module: InterviewModule) => (
            <div key={module.id}>
              <InterviewModuleCard
                module={module}
                tierColor={tier.color}
                tierKey={tierKey}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InterviewPrepPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tiers based on selected filters
  const filteredTiers = Object.entries(interviewTiers).reduce((acc, [tierKey, tier]) => {
    let filteredModules = tier.modules;

    if (searchQuery) {
      filteredModules = filteredModules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedTier && selectedTier !== 'all' && selectedTier !== tierKey) {
      filteredModules = [];
    }

    if (selectedDifficulty && selectedDifficulty !== 'all') {
      filteredModules = filteredModules.filter(module =>
        module.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filteredModules = filteredModules.filter(module =>
        module.category === selectedCategory
      );
    }

    if (filteredModules.length > 0) {
      acc[tierKey] = { ...tier, modules: filteredModules };
    }

    return acc;
  }, {} as Record<string, InterviewTier>);

  const totalModules = Object.values(interviewTiers).reduce((sum, tier) => sum + tier.modules.length, 0);
  const totalQuestions = Object.values(interviewTiers).reduce((sum, tier) => 
    sum + tier.modules.reduce((tierSum, module) => tierSum + module.questionCount, 0), 0
  );

  const hasActiveFilters = searchQuery || selectedTier || selectedDifficulty || selectedCategory;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTier(null);
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };

  return (
    <main className="interview-prep-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Interview Preparation Academy
            <span className="hero-subtitle">Master Technical Interviews with Structured Learning</span>
          </h1>
          
          <p className="hero-description">
            Prepare systematically for technical interviews through our tier-based approach. 
            From foundational concepts to expert-level system design, build confidence with 
            comprehensive question banks and detailed explanations.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{totalModules}</span>
              <span className="stat-label">Interview Modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalQuestions}</span>
              <span className="stat-label">Practice Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Difficulty Tiers</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="interview-path-visualization">
            <svg viewBox="0 0 400 300" className="path-svg">
              <defs>
                <linearGradient id="interviewPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="25%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <path
                d="M50,250 Q150,200 200,150 T350,50"
                stroke="url(#interviewPathGradient)"
                strokeWidth="4"
                fill="none"
                className="learning-path"
              />
              <circle cx="50" cy="250" r="8" fill="#3B82F6" className="tier-node" />
              <circle cx="150" cy="175" r="8" fill="#10B981" className="tier-node" />
              <circle cx="250" cy="125" r="8" fill="#8B5CF6" className="tier-node" />
              <circle cx="350" cy="50" r="8" fill="#F59E0B" className="tier-node" />
            </svg>
          </div>
        </div>
      </section>

      {/* Search and Filter System */}
      <section className="search-filter-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search interview topics, technologies, or modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Tier Level</label>
            <select 
              value={selectedTier || 'all'} 
              onChange={(e) => setSelectedTier(e.target.value === 'all' ? null : e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tiers</option>
              <option value="foundational">🏗️ Foundational</option>
              <option value="core">⚙️ Core Technologies</option>
              <option value="specialized">💎 Specialized Skills</option>
              <option value="expert">🏆 Expert Level</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Difficulty</label>
            <select 
              value={selectedDifficulty || 'all'} 
              onChange={(e) => setSelectedDifficulty(e.target.value === 'all' ? null : e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">🌱 Beginner</option>
              <option value="Intermediate">🚀 Intermediate</option>
              <option value="Advanced">🔥 Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select 
              value={selectedCategory || 'all'} 
              onChange={(e) => setSelectedCategory(e.target.value === 'all' ? null : e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="frontend">🎨 Frontend</option>
              <option value="backend">🔧 Backend</option>
              <option value="database">🗄️ Database</option>
              <option value="devops">☁️ DevOps</option>
              <option value="general">📁 General</option>
            </select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="filter-results">
            <span className="results-text">
              Showing {Object.values(filteredTiers).reduce((sum, tier) => sum + tier.modules.length, 0)} of {totalModules} modules
            </span>
            <button onClick={clearFilters} className="clear-filters-button">
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Interview Preparation Tiers */}
      <div id="interview-tiers" className="learning-tiers">
        {hasActiveFilters && Object.keys(filteredTiers).length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">No modules found</h3>
              <p className="no-results-description">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button onClick={clearFilters} className="clear-filters-button">
                Clear all filters
              </button>
            </div>
          </div>
        )}
        
        {Object.entries(filteredTiers).map(([tierKey, tier]) => (
          <InterviewTierSection 
            key={tierKey} 
            tier={tier} 
            tierKey={tierKey}
            isVisible={!hasActiveFilters || tier.modules.length > 0}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link href="/" className="action-card">
            <span className="action-icon">🎓</span>
            <h3>Learning Modules</h3>
            <p>Return to main learning curriculum and lessons</p>
          </Link>
          
          <Link href="/playground" className="action-card">
            <span className="action-icon">🔬</span>
            <h3>GraphQL Playground</h3>
            <p>Practice with interactive GraphQL queries</p>
          </Link>
          
          <Link href="/animated-background-demo" className="action-card">
            <span className="action-icon">🎨</span>
            <h3>Design Showcase</h3>
            <p>Explore our UI components and animations</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default InterviewPrepPage;