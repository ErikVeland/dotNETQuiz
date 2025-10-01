'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProgressTracking } from '../hooks/useProgressTracking';
import { GamificationSystem } from '../components/GamificationSystem';
import { SearchFilterSystem } from '../components/SearchFilterSystem';
import { AccessibilityProvider, useAccessibility } from '../components/AccessibilityProvider';
import '../styles/responsive.scss';

// 4-Tier Learning Structure Data
const learningTiers = {
  foundational: {
    title: 'Foundational',
    description: 'Build your programming foundation with essential concepts',
    color: 'from-blue-500 to-cyan-500',
    modules: [
      {
        id: 'programming-basics',
        title: 'Programming Fundamentals',
        description: 'Variables, data types, control structures, and basic algorithms',
        icon: '💻',
        difficulty: 'Beginner',
        estimatedTime: '2-3 weeks',
        href: '/fundamentals/programming-basics'
      },
      {
        id: 'web-fundamentals',
        title: 'Web Development Basics',
        description: 'HTML5, CSS3, JavaScript fundamentals, and DOM manipulation',
        icon: '🌐',
        difficulty: 'Beginner',
        estimatedTime: '3-4 weeks',
        href: '/fundamentals/web-basics'
      },
      {
        id: 'version-control',
        title: 'Version Control with Git',
        description: 'Git workflows, branching, merging, and collaboration',
        icon: '📝',
        difficulty: 'Beginner',
        estimatedTime: '1-2 weeks',
        href: '/fundamentals/git'
      }
    ]
  },
  core: {
    title: 'Core Technologies',
    description: 'Master the essential technologies for modern development',
    color: 'from-green-500 to-emerald-500',
    modules: [
      {
        id: 'dotnet-core',
        title: '.NET Core',
        description: 'C#, ASP.NET Core, Entity Framework, and enterprise patterns',
        icon: '⚡',
        difficulty: 'Intermediate',
        estimatedTime: '6-8 weeks',
        href: '/lessons'
      },
      {
        id: 'react',
        title: 'React Development',
        description: 'Components, hooks, state management, and modern patterns',
        icon: '⚛️',
        difficulty: 'Intermediate',
        estimatedTime: '4-6 weeks',
        href: '/react/lessons'
      },
      {
        id: 'database',
        title: 'Database Systems',
        description: 'SQL, NoSQL, design patterns, and optimization',
        icon: '🗄️',
        difficulty: 'Intermediate',
        estimatedTime: '4-5 weeks',
        href: '/database/lessons'
      },
      {
        id: 'laravel',
        title: 'Laravel Framework',
        description: 'PHP, Eloquent ORM, and rapid application development',
        icon: '🎨',
        difficulty: 'Intermediate',
        estimatedTime: '5-6 weeks',
        href: '/laravel/lessons'
      }
    ]
  },
  specialized: {
    title: 'Specialized Skills',
    description: 'Advanced technologies and modern development practices',
    color: 'from-purple-500 to-violet-500',
    modules: [
      {
        id: 'nextjs',
        title: 'Next.js',
        description: 'Full-stack React framework with SSR and API routes',
        icon: '⭐',
        difficulty: 'Advanced',
        estimatedTime: '3-4 weeks',
        href: '/nextjs/lessons'
      },
      {
        id: 'graphql',
        title: 'GraphQL',
        description: 'Modern API query language with schemas and resolvers',
        icon: '🔗',
        difficulty: 'Advanced',
        estimatedTime: '3-4 weeks',
        href: '/graphql/lessons'
      },
      {
        id: 'microservices',
        title: 'Microservices Architecture',
        description: 'Distributed systems, containers, and service mesh',
        icon: '🏗️',
        difficulty: 'Advanced',
        estimatedTime: '4-5 weeks',
        href: '/specialized/microservices'
      },
      {
        id: 'devops',
        title: 'DevOps & Cloud',
        description: 'CI/CD, containerization, cloud platforms, and monitoring',
        icon: '☁️',
        difficulty: 'Advanced',
        estimatedTime: '5-6 weeks',
        href: '/specialized/devops'
      }
    ]
  },
  quality: {
    title: 'Quality & Testing',
    description: 'Professional testing, quality assurance, and best practices',
    color: 'from-orange-500 to-red-500',
    modules: [
      {
        id: 'testing-fundamentals',
        title: 'Testing Fundamentals',
        description: 'Unit testing, integration testing, and TDD practices',
        icon: '🧪',
        difficulty: 'Intermediate',
        estimatedTime: '3-4 weeks',
        href: '/quality/testing-fundamentals'
      },
      {
        id: 'e2e-testing',
        title: 'End-to-End Testing',
        description: 'Cypress, Playwright, and automated testing strategies',
        icon: '🎯',
        difficulty: 'Advanced',
        estimatedTime: '2-3 weeks',
        href: '/quality/e2e-testing'
      },
      {
        id: 'performance',
        title: 'Performance Optimization',
        description: 'Profiling, monitoring, and optimization techniques',
        icon: '⚡',
        difficulty: 'Advanced',
        estimatedTime: '3-4 weeks',
        href: '/quality/performance'
      },
      {
        id: 'security',
        title: 'Security Best Practices',
        description: 'Authentication, authorization, and security patterns',
        icon: '🔒',
        difficulty: 'Advanced',
        estimatedTime: '4-5 weeks',
        href: '/quality/security'
      }
    ]
  }
};

const ModuleCard: React.FC<{ module: any; tierColor: string }> = ({ module, tierColor }) => {
  const { progress, updateProgress } = useProgressTracking();
  const moduleProgress = progress[module.id];
  const completionPercentage = moduleProgress ? (moduleProgress.lessonsCompleted / moduleProgress.totalLessons) * 100 : 0;

  return (
    <Link href={module.href} className="module-card glass-morphism">
      <div className="module-header">
        <span className="module-icon">{module.icon}</span>
        <div className="module-info">
          <h4 className="module-title">{module.title}</h4>
          <span className={`difficulty-badge ${module.difficulty.toLowerCase()}`}>
            {module.difficulty}
          </span>
        </div>
      </div>
      
      <p className="module-description">{module.description}</p>
      
      <div className="module-meta">
        <span className="estimated-time">📅 {module.estimatedTime}</span>
        {moduleProgress && (
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="progress-text">{Math.round(completionPercentage)}%</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const TierSection: React.FC<{ tier: any; tierKey: string }> = ({ tier, tierKey }) => {
  return (
    <section className="tier-section" data-tier={tierKey}>
      <div className="tier-header">
        <div className={`tier-gradient bg-gradient-to-r ${tier.color}`}>
          <h2 className="tier-title">{tier.title}</h2>
          <p className="tier-description">{tier.description}</p>
        </div>
      </div>
      
      <div className="modules-grid">
        {tier.modules.map((module: any) => (
          <ModuleCard
            key={module.id}
            module={module}
            tierColor={tier.color}
          />
        ))}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const { calculateOverallProgress, getCompletedModulesCount } = useProgressTracking();

  const overallProgress = calculateOverallProgress();
  const completedModules = getCompletedModulesCount();
  const totalModules = Object.values(learningTiers).reduce((acc, tier) => acc + tier.modules.length, 0);

  // Filter modules based on search and filters
  const filteredTiers = Object.entries(learningTiers).reduce((acc, [tierKey, tier]) => {
    let filteredModules = tier.modules;

    if (searchQuery) {
      filteredModules = filteredModules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTier && selectedTier !== tierKey) {
      filteredModules = [];
    }

    if (selectedDifficulty) {
      filteredModules = filteredModules.filter(module =>
        module.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    if (filteredModules.length > 0) {
      acc[tierKey] = { ...tier, modules: filteredModules };
    }

    return acc;
  }, {} as any);

  return (
    <main id="main-content" className="homepage" role="main">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading" className="hero-title">
            Master Fullstack Development
            <span className="hero-subtitle">with Structured Learning Paths</span>
          </h1>
          
          <p className="hero-description">
            Progress through our 4-tier learning system: from foundational concepts to specialized skills,
            with gamification, progress tracking, and personalized learning paths.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{totalModules}</span>
              <span className="stat-label">Learning Modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completedModules}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.round(overallProgress)}%</span>
              <span className="stat-label">Progress</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="learning-path-visualization">
            <svg viewBox="0 0 400 300" className="path-svg">
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
              <circle cx="50" cy="250" r="8" fill="#3B82F6" className="tier-node" />
              <circle cx="150" cy="175" r="8" fill="#10B981" className="tier-node" />
              <circle cx="250" cy="125" r="8" fill="#8B5CF6" className="tier-node" />
              <circle cx="350" cy="50" r="8" fill="#F59E0B" className="tier-node" />
            </svg>
          </div>
        </div>
      </section>

      {/* Progress & Gamification Dashboard */}
      <GamificationSystem />

      {/* Search and Filter System */}
      <SearchFilterSystem />

      {/* Learning Tiers */}
      <div className="learning-tiers">
        {Object.entries(filteredTiers).map(([tierKey, tier]) => (
          <TierSection key={tierKey} tier={tier} tierKey={tierKey} />
        ))}
      </div>

      {/* Quick Actions */}
      <section className="quick-actions" aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading">Quick Actions</h2>
        <div className="actions-grid">
          <Link href="/playground" className="action-card">
            <span className="action-icon">🛝</span>
            <h3>GraphQL Playground</h3>
            <p>Experiment with GraphQL queries and mutations</p>
          </Link>
          
          <Link href="/animated-background-demo" className="action-card">
            <span className="action-icon">🎨</span>
            <h3>Design Showcase</h3>
            <p>Explore our animated backgrounds and UI components</p>
          </Link>
          
          <Link href="/interview-prep" className="action-card">
            <span className="action-icon">💼</span>
            <h3>Interview Prep</h3>
            <p>Practice with real interview questions</p>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }

        .hero-content {
          color: white;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          display: block;
          font-size: 0.7em;
          opacity: 0.9;
          font-weight: 600;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: #FDE68A;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .learning-path-visualization {
          width: 100%;
          max-width: 400px;
        }

        .path-svg {
          width: 100%;
          height: auto;
        }

        .learning-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawPath 3s ease-in-out forwards;
        }

        .tier-node {
          opacity: 0;
          animation: fadeInNode 0.5s ease-in-out forwards;
        }

        .tier-node:nth-child(3) { animation-delay: 0.5s; }
        .tier-node:nth-child(4) { animation-delay: 1s; }
        .tier-node:nth-child(5) { animation-delay: 1.5s; }
        .tier-node:nth-child(6) { animation-delay: 2s; }

        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeInNode {
          to {
            opacity: 1;
          }
        }

        .learning-tiers {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .tier-section {
          margin-bottom: 4rem;
        }

        .tier-header {
          margin-bottom: 2rem;
        }

        .tier-gradient {
          padding: 2rem;
          border-radius: 1rem;
          color: white;
          text-align: center;
        }

        .tier-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .tier-description {
          font-size: 1.125rem;
          opacity: 0.9;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .module-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          color: white;
          text-decoration: none;
        }

        .module-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .module-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .module-icon {
          font-size: 2rem;
        }

        .module-info {
          flex: 1;
        }

        .module-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .difficulty-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
        }

        .difficulty-badge.beginner {
          background: rgba(34, 197, 94, 0.2);
          color: #86EFAC;
        }

        .difficulty-badge.intermediate {
          background: rgba(251, 191, 36, 0.2);
          color: #FDE68A;
        }

        .difficulty-badge.advanced {
          background: rgba(239, 68, 68, 0.2);
          color: #FCA5A5;
        }

        .module-description {
          line-height: 1.5;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .module-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .estimated-time {
          opacity: 0.8;
        }

        .progress-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-bar {
          width: 60px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #10B981;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .quick-actions {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .quick-actions h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: white;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .action-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .action-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.15);
        }

        .action-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .action-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .action-card p {
          opacity: 0.9;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }

          .hero-stats {
            justify-content: center;
          }

          .modules-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
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