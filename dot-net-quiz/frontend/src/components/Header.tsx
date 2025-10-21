'use client'

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from './MobileMenu';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const [isDotNetOpen, setIsDotNetOpen] = useState(false);
  const [isNextJSOpen, setIsNextJSOpen] = useState(false);
  const [isGraphQLOpen, setIsGraphQLOpen] = useState(false);
  const [isLaravelOpen, setIsLaravelOpen] = useState(false);
  const [isReactOpen, setIsReactOpen] = useState(false);
  const [isTailwindOpen, setIsTailwindOpen] = useState(false);
  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const [isSassOpen, setIsSassOpen] = useState(false);
  const [isVueOpen, setIsVueOpen] = useState(false);
  const [isTypescriptOpen, setIsTypescriptOpen] = useState(false);
  const [isTestingOpen, setIsTestingOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const dotNetRef = useRef<HTMLDivElement>(null);
  const nextJSRef = useRef<HTMLDivElement>(null);
  const graphQLRef = useRef<HTMLDivElement>(null);
  const laravelRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const tailwindRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const sassRef = useRef<HTMLDivElement>(null);
  const vueRef = useRef<HTMLDivElement>(null);
  const typescriptRef = useRef<HTMLDivElement>(null);
  const testingRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dotNetRef.current && !dotNetRef.current.contains(event.target as Node)) {
        setIsDotNetOpen(false);
      }
      if (nextJSRef.current && !nextJSRef.current.contains(event.target as Node)) {
        setIsNextJSOpen(false);
      }
      if (graphQLRef.current && !graphQLRef.current.contains(event.target as Node)) {
        setIsGraphQLOpen(false);
      }
      if (laravelRef.current && !laravelRef.current.contains(event.target as Node)) {
        setIsLaravelOpen(false);
      }
      if (reactRef.current && !reactRef.current.contains(event.target as Node)) {
        setIsReactOpen(false);
      }
      if (tailwindRef.current && !tailwindRef.current.contains(event.target as Node)) {
        setIsTailwindOpen(false);
      }
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        setIsNodeOpen(false);
      }
      if (sassRef.current && !sassRef.current.contains(event.target as Node)) {
        setIsSassOpen(false);
      }
      if (vueRef.current && !vueRef.current.contains(event.target as Node)) {
        setIsVueOpen(false);
      }
      if (typescriptRef.current && !typescriptRef.current.contains(event.target as Node)) {
        setIsTypescriptOpen(false);
      }
      if (testingRef.current && !testingRef.current.contains(event.target as Node)) {
        setIsTestingOpen(false);
      }
      if (databaseRef.current && !databaseRef.current.contains(event.target as Node)) {
        setIsDatabaseOpen(false);
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
    <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700 w-full border-b border-gray-200 dark:border-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Fullstack Academy Home"
            >
              Fullstack Academy
            </Link>
          </div>
          
          {/* Desktop menu - right aligned */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* .NET Dropdown */}
            <div className="relative" ref={dotNetRef}>
              <button
                onClick={() => setIsDotNetOpen(!isDotNetOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isDotNetOpen 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
                aria-haspopup="true"
                aria-expanded={isDotNetOpen}
                aria-label=".NET technologies menu"
              >
                .NET
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDotNetOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDotNetOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/lessons"
                      className={`${isActive('/lessons') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsDotNetOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/interview"
                      className={`${isActive('/interview') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsDotNetOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Next.js Dropdown */}
            <div className="relative" ref={nextJSRef}>
              <button
                onClick={() => setIsNextJSOpen(!isNextJSOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isNextJSOpen 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Next.js
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isNextJSOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isNextJSOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/nextjs/lessons"
                      className={`${isActive('/nextjs/lessons') ? 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsNextJSOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/nextjs/interview"
                      className={`${isActive('/nextjs/interview') ? 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsNextJSOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* GraphQL Dropdown */}
            <div className="relative" ref={graphQLRef}>
              <button
                onClick={() => setIsGraphQLOpen(!isGraphQLOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isGraphQLOpen 
                    ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200' 
                    : 'text-gray-700 hover:bg-pink-100 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'
                }`}
              >
                GraphQL
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isGraphQLOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isGraphQLOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/graphql/lessons"
                      className={`${isActive('/graphql/lessons') ? 'bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsGraphQLOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/graphql/interview"
                      className={`${isActive('/graphql/interview') ? 'bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsGraphQLOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Laravel Dropdown */}
            <div className="relative" ref={laravelRef}>
              <button
                onClick={() => setIsLaravelOpen(!isLaravelOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isLaravelOpen 
                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' 
                    : 'text-gray-700 hover:bg-red-100 dark:text-gray-300 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-200'
                }`}
              >
                Laravel
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLaravelOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLaravelOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/laravel/lessons"
                      className={`${isActive('/laravel/lessons') ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' : 'text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsLaravelOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/laravel/interview"
                      className={`${isActive('/laravel/interview') ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' : 'text-gray-700 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsLaravelOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* React Dropdown */}
            <div className="relative" ref={reactRef}>
              <button
                onClick={() => setIsReactOpen(!isReactOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isReactOpen 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
              >
                React
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isReactOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isReactOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/react/lessons"
                      className={`${isActive('/react/lessons') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsReactOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/react/interview"
                      className={`${isActive('/react/interview') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsReactOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tailwind CSS Dropdown */}
            <div className="relative" ref={tailwindRef}>
              <button
                onClick={() => setIsTailwindOpen(!isTailwindOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isTailwindOpen 
                    ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200' 
                    : 'text-gray-700 hover:bg-teal-100 dark:text-gray-300 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-200'
                }`}
              >
                Tailwind
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTailwindOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isTailwindOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/tailwind/lessons"
                      className={`${isActive('/tailwind/lessons') ? 'bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-200' : 'text-gray-700 hover:bg-teal-50 dark:text-gray-300 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTailwindOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/tailwind/interview"
                      className={`${isActive('/tailwind/interview') ? 'bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-200' : 'text-gray-700 hover:bg-teal-50 dark:text-gray-300 dark:hover:bg-teal-900 hover:text-teal-700 dark:hover:text-teal-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTailwindOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Node.js Dropdown */}
            <div className="relative" ref={nodeRef}>
              <button
                onClick={() => setIsNodeOpen(!isNodeOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isNodeOpen 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                    : 'text-gray-700 hover:bg-green-100 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'
                }`}
              >
                Node.js
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isNodeOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isNodeOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/node/lessons"
                      className={`${isActive('/node/lessons') ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsNodeOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/node/interview"
                      className={`${isActive('/node/interview') ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsNodeOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* SASS Dropdown */}
            <div className="relative" ref={sassRef}>
              <button
                onClick={() => setIsSassOpen(!isSassOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isSassOpen 
                    ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200' 
                    : 'text-gray-700 hover:bg-pink-100 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'
                }`}
              >
                SASS
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isSassOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isSassOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/sass/lessons"
                      className={`${isActive('/sass/lessons') ? 'bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsSassOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/sass/interview"
                      className={`${isActive('/sass/interview') ? 'bg-pink-50 dark:bg-pink-900 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50 dark:text-gray-300 dark:hover:bg-pink-900 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsSassOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Vue.js Dropdown */}
            <div className="relative" ref={vueRef}>
              <button
                onClick={() => setIsVueOpen(!isVueOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isVueOpen 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                    : 'text-gray-700 hover:bg-green-100 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'
                }`}
              >
                Vue.js
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isVueOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isVueOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/vue/lessons"
                      className={`${isActive('/vue/lessons') ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsVueOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/vue/interview"
                      className={`${isActive('/vue/interview') ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsVueOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* TypeScript Dropdown */}
            <div className="relative" ref={typescriptRef}>
              <button
                onClick={() => setIsTypescriptOpen(!isTypescriptOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isTypescriptOpen 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
              >
                TypeScript
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTypescriptOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isTypescriptOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/typescript/lessons"
                      className={`${isActive('/typescript/lessons') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTypescriptOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/typescript/interview"
                      className={`${isActive('/typescript/interview') ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTypescriptOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Testing Dropdown */}
            <div className="relative" ref={testingRef}>
              <button
                onClick={() => setIsTestingOpen(!isTestingOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isTestingOpen 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' 
                    : 'text-gray-700 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-200'
                }`}
              >
                Testing
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTestingOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isTestingOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/testing/lessons"
                      className={`${isActive('/testing/lessons') ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200' : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTestingOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/testing/interview"
                      className={`${isActive('/testing/interview') ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200' : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsTestingOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Database Dropdown */}
            <div className="relative" ref={databaseRef}>
              <button
                onClick={() => setIsDatabaseOpen(!isDatabaseOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isDatabaseOpen 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' 
                    : 'text-gray-700 hover:bg-indigo-100 dark:text-gray-300 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-200'
                }`}
              >
                Database
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDatabaseOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDatabaseOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/database/lessons"
                      className={`${isActive('/database/lessons') ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsDatabaseOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/database/interview"
                      className={`${isActive('/database/interview') ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' : 'text-gray-700 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-200'} block px-4 py-2 text-sm font-medium`}
                      role="menuitem"
                      onClick={() => setIsDatabaseOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Playground Link */}
            <Link 
              href="/playground" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/playground') 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              aria-label="GraphQL Playground"
            >
              Playground
            </Link>
          </div>
          
          <div className="flex items-center">
            <DarkModeToggle />
            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}