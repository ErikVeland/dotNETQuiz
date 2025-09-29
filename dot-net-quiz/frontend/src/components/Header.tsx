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
  const dotNetRef = useRef<HTMLDivElement>(null);
  const nextJSRef = useRef<HTMLDivElement>(null);
  const graphQLRef = useRef<HTMLDivElement>(null);
  const laravelRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const tailwindRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const sassRef = useRef<HTMLDivElement>(null);
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
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fullstack Academy
            </Link>
          </div>
          
          {/* Desktop menu - right aligned */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* .NET Dropdown */}
            <div className="relative" ref={dotNetRef}>
              <button
                onClick={() => setIsDotNetOpen(!isDotNetOpen)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isDotNetOpen 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-blue-100/80 dark:text-gray-300 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
              >
                .NET
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDotNetOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDotNetOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/lessons"
                      className={`${isActive('/lessons') ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
                      role="menuitem"
                      onClick={() => setIsDotNetOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/interview"
                      className={`${isActive('/interview') ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isNextJSOpen 
                    ? 'bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-purple-100/80 dark:text-gray-300 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-200'
                }`}
              >
                Next.js
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isNextJSOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isNextJSOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/nextjs/lessons"
                      className={`${isActive('/nextjs/lessons') ? 'bg-purple-50/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200' : 'text-gray-700 hover:bg-purple-50/80 dark:text-gray-300 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
                      role="menuitem"
                      onClick={() => setIsNextJSOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/nextjs/interview"
                      className={`${isActive('/nextjs/interview') ? 'bg-purple-50/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200' : 'text-gray-700 hover:bg-purple-50/80 dark:text-gray-300 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isGraphQLOpen 
                    ? 'bg-pink-100/80 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-pink-100/80 dark:text-gray-300 dark:hover:bg-pink-900/50 hover:text-pink-700 dark:hover:text-pink-200'
                }`}
              >
                GraphQL
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isGraphQLOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isGraphQLOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/graphql/lessons"
                      className={`${isActive('/graphql/lessons') ? 'bg-pink-50/80 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50/80 dark:text-gray-300 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
                      role="menuitem"
                      onClick={() => setIsGraphQLOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/graphql/interview"
                      className={`${isActive('/graphql/interview') ? 'bg-pink-50/80 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50/80 dark:text-gray-300 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isLaravelOpen 
                    ? 'bg-red-100/80 dark:bg-red-900/50 text-red-700 dark:text-red-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-red-100/80 dark:text-gray-300 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-200'
                }`}
              >
                Laravel
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLaravelOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLaravelOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/laravel/lessons"
                      className={`${isActive('/laravel/lessons') ? 'bg-red-50/80 dark:bg-red-900/30 text-red-700 dark:text-red-200' : 'text-gray-700 hover:bg-red-50/80 dark:text-gray-300 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
                      role="menuitem"
                      onClick={() => setIsLaravelOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/laravel/interview"
                      className={`${isActive('/laravel/interview') ? 'bg-red-50/80 dark:bg-red-900/30 text-red-700 dark:text-red-200' : 'text-gray-700 hover:bg-red-50/80 dark:text-gray-300 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isReactOpen 
                    ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-blue-100/80 dark:text-gray-300 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-200'
                }`}
              >
                React
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isReactOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isReactOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/react/lessons"
                      className={`${isActive('/react/lessons') ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-blue-50/80 dark:hover:bg-blue-900/30`}
                      role="menuitem"
                      onClick={() => setIsReactOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/react/interview"
                      className={`${isActive('/react/interview') ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200' : 'text-gray-700 hover:bg-blue-50/80 dark:text-gray-300 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-blue-50/80 dark:hover:bg-blue-900/30`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isTailwindOpen 
                    ? 'bg-teal-100/80 dark:bg-teal-900/50 text-teal-700 dark:text-teal-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-teal-100/80 dark:text-gray-300 dark:hover:bg-teal-900/50 hover:text-teal-700 dark:hover:text-teal-200'
                }`}
              >
                Tailwind
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTailwindOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isTailwindOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/tailwind/lessons"
                      className={`${isActive('/tailwind/lessons') ? 'bg-teal-50/80 dark:bg-teal-900/30 text-teal-700 dark:text-teal-200' : 'text-gray-700 hover:bg-teal-50/80 dark:text-gray-300 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-teal-50/80 dark:hover:bg-teal-900/30`}
                      role="menuitem"
                      onClick={() => setIsTailwindOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/tailwind/interview"
                      className={`${isActive('/tailwind/interview') ? 'bg-teal-50/80 dark:bg-teal-900/30 text-teal-700 dark:text-teal-200' : 'text-gray-700 hover:bg-teal-50/80 dark:text-gray-300 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-teal-50/80 dark:hover:bg-teal-900/30`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isNodeOpen 
                    ? 'bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-green-100/80 dark:text-gray-300 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-200'
                }`}
              >
                Node.js
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isNodeOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isNodeOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/node/lessons"
                      className={`${isActive('/node/lessons') ? 'bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50/80 dark:text-gray-300 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-green-50/80 dark:hover:bg-green-900/30`}
                      role="menuitem"
                      onClick={() => setIsNodeOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/node/interview"
                      className={`${isActive('/node/interview') ? 'bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-200' : 'text-gray-700 hover:bg-green-50/80 dark:text-gray-300 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-green-50/80 dark:hover:bg-green-900/30`}
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
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isSassOpen 
                    ? 'bg-pink-100/80 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200 backdrop-blur-sm' 
                    : 'text-gray-700 hover:bg-pink-100/80 dark:text-gray-300 dark:hover:bg-pink-900/50 hover:text-pink-700 dark:hover:text-pink-200'
                }`}
              >
                SASS
                <svg className={`ml-1 h-4 w-4 transition-transform duration-200 ${isSassOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isSassOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-[9999] border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu">
                    <Link
                      href="/sass/lessons"
                      className={`${isActive('/sass/lessons') ? 'bg-pink-50/80 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50/80 dark:text-gray-300 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-pink-50/80 dark:hover:bg-pink-900/30`}
                      role="menuitem"
                      onClick={() => setIsSassOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/sass/interview"
                      className={`${isActive('/sass/interview') ? 'bg-pink-50/80 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200' : 'text-gray-700 hover:bg-pink-50/80 dark:text-gray-300 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-200'} block px-4 py-3 text-sm font-medium transition-colors duration-150 backdrop-blur-sm hover:bg-pink-50/80 dark:hover:bg-pink-900/30`}
                      role="menuitem"
                      onClick={() => setIsSassOpen(false)}
                    >
                      Interview Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
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