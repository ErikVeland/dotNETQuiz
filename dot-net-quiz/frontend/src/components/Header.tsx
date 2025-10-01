'use client'

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from './MobileMenu';
import DarkModeToggle from './DarkModeToggle';
// import { useProgressTracking } from '../hooks/useProgressTracking';
import { useProgressTracking } from '../hooks/useProgressTracking';
// import { AccessibilityPanel, useAccessibility } from './AccessibilityProvider';

interface NavigationModule {
  id: string;
  title: string;
  lessonsPath: string;
  quizPath: string;
  progress: number;
  tier: number;
  category: 'backend' | 'frontend' | 'quality';
}

export default function Header() {
  const [isBackendOpen, setIsBackendOpen] = useState(false);
  const [isFrontendOpen, setIsFrontendOpen] = useState(false);
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  const backendRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { progress, calculateOverallProgress, getCompletedModulesCount } = useProgressTracking();
  // const { announceToScreenReader } = useAccessibility();

  // Navigation structure with progress tracking
  const navigationModules: NavigationModule[] = [
    // Tier 1: Foundational
    { id: 'dotnet', title: '.NET Core', lessonsPath: '/lessons', quizPath: '/interview', progress: 0, tier: 1, category: 'backend' },
    { id: 'laravel', title: 'Laravel', lessonsPath: '/laravel/lessons', quizPath: '/laravel/interview', progress: 0, tier: 1, category: 'backend' },
    { id: 'react', title: 'React', lessonsPath: '/react/lessons', quizPath: '/react/interview', progress: 0, tier: 1, category: 'frontend' },
    
    // Tier 2: Core
    { id: 'node', title: 'Node.js', lessonsPath: '/node/lessons', quizPath: '/node/interview', progress: 0, tier: 2, category: 'backend' },
    { id: 'vue', title: 'Vue.js', lessonsPath: '/vue/lessons', quizPath: '/vue/interview', progress: 0, tier: 2, category: 'frontend' },
    
    // Tier 3: Specialized
    { id: 'database', title: 'Databases', lessonsPath: '/database/lessons', quizPath: '/database/interview', progress: 0, tier: 3, category: 'backend' },
    { id: 'nextjs', title: 'Next.js', lessonsPath: '/nextjs/lessons', quizPath: '/nextjs/interview', progress: 0, tier: 3, category: 'frontend' },
    { id: 'graphql', title: 'GraphQL', lessonsPath: '/graphql/lessons', quizPath: '/graphql/interview', progress: 0, tier: 3, category: 'frontend' },
    { id: 'typescript', title: 'TypeScript', lessonsPath: '/typescript/lessons', quizPath: '/typescript/interview', progress: 0, tier: 3, category: 'frontend' },
    { id: 'tailwind', title: 'Tailwind CSS', lessonsPath: '/tailwind/lessons', quizPath: '/tailwind/interview', progress: 0, tier: 3, category: 'frontend' },
    { id: 'sass', title: 'SASS', lessonsPath: '/sass/lessons', quizPath: '/sass/interview', progress: 0, tier: 3, category: 'frontend' },
    
    // Tier 4: Quality
    { id: 'testing', title: 'Testing & QA', lessonsPath: '/testing/lessons', quizPath: '/testing/interview', progress: 0, tier: 4, category: 'quality' }
  ];

  const getModulesByCategory = (category: 'backend' | 'frontend' | 'quality') => {
    return navigationModules.filter(module => module.category === category);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backendRef.current && !backendRef.current.contains(event.target as Node)) {
        setIsBackendOpen(false);
      }
      if (frontendRef.current && !frontendRef.current.contains(event.target as Node)) {
        setIsFrontendOpen(false);
      }
      if (qualityRef.current && !qualityRef.current.contains(event.target as Node)) {
        setIsQualityOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow dark:shadow-gray-700 w-full border-b border-gray-200 dark:border-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Fullstack Academy Home"
            >
              Fullstack Academy
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Backend Dropdown */}
            <div className="relative" ref={backendRef}>
              <button
                onClick={() => {
                  setIsBackendOpen(!isBackendOpen);
                  setIsFrontendOpen(false);
                  setIsQualityOpen(false);
                }}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isBackendOpen 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-blue-100/80 dark:text-gray-300 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
                aria-haspopup="true"
                aria-expanded={isBackendOpen}
                aria-label="Backend technologies menu"
              >
                🔧 Backend
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isBackendOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isBackendOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                  <div className="py-2 px-4" role="menu">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      🔧 Backend Development
                    </div>
                    {getModulesByCategory('backend').map(module => (
                      <div key={module.id} className="mb-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{module.title}</div>
                        <div className="flex space-x-2">
                          <Link
                            href={module.lessonsPath}
                            className={`${
                              isActive(module.lessonsPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsBackendOpen(false)}
                          >
                            📚 Lessons
                          </Link>
                          <Link
                            href={module.quizPath}
                            className={`${
                              isActive(module.quizPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsBackendOpen(false)}
                          >
                            🎯 Quiz
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Frontend Dropdown */}
            <div className="relative" ref={frontendRef}>
              <button
                onClick={() => {
                  setIsFrontendOpen(!isFrontendOpen);
                  setIsBackendOpen(false);
                  setIsQualityOpen(false);
                }}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isFrontendOpen 
                    ? 'bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-purple-100/80 dark:text-gray-300 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-200'
                }`}
                aria-haspopup="true"
                aria-expanded={isFrontendOpen}
                aria-label="Frontend technologies menu"
              >
                🎨 Frontend
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isFrontendOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isFrontendOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-xl shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                  <div className="py-2 px-4" role="menu">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      🎨 Frontend Development
                    </div>
                    {getModulesByCategory('frontend').map(module => (
                      <div key={module.id} className="mb-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{module.title}</div>
                        <div className="flex space-x-2">
                          <Link
                            href={module.lessonsPath}
                            className={`${
                              isActive(module.lessonsPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsFrontendOpen(false)}
                          >
                            📚 Lessons
                          </Link>
                          <Link
                            href={module.quizPath}
                            className={`${
                              isActive(module.quizPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsFrontendOpen(false)}
                          >
                            🎯 Quiz
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Quality Dropdown */}
            <div className="relative" ref={qualityRef}>
              <button
                onClick={() => {
                  setIsQualityOpen(!isQualityOpen);
                  setIsBackendOpen(false);
                  setIsFrontendOpen(false);
                }}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isQualityOpen 
                    ? 'bg-orange-100/80 dark:bg-orange-900/50 text-orange-700 dark:text-orange-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-orange-100/80 dark:text-gray-300 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-200'
                }`}
                aria-haspopup="true"
                aria-expanded={isQualityOpen}
                aria-label="Quality and testing menu"
              >
                🛡️ Quality
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isQualityOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isQualityOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-2 px-4" role="menu">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      🛡️ Quality & Testing
                    </div>
                    {getModulesByCategory('quality').map(module => (
                      <div key={module.id} className="mb-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{module.title}</div>
                        <div className="flex space-x-2">
                          <Link
                            href={module.lessonsPath}
                            className={`${
                              isActive(module.lessonsPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsQualityOpen(false)}
                          >
                            📚 Lessons
                          </Link>
                          <Link
                            href={module.quizPath}
                            className={`${
                              isActive(module.quizPath) 
                                ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' 
                                : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'
                            } block px-3 py-2 text-xs font-medium transition-colors duration-150 backdrop-blur-sm rounded flex-1 text-center`}
                            role="menuitem"
                            onClick={() => setIsQualityOpen(false)}
                          >
                            🎯 Quiz
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Playground Link */}
            <Link 
              href="/playground" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                isActive('/playground') 
                  ? 'bg-gray-100/80 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              aria-label="GraphQL Playground"
            >
              🎮 Playground
            </Link>
          </div>
          
          <div className="flex items-center">
            <DarkModeToggle />
            <div className="md:hidden ml-2">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}