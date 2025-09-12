'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 w-full max-w-6xl flex flex-col items-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Fullstack Academy
        </h1>
        <p className="mb-6 md:mb-8 text-center text-base md:text-lg text-gray-700 dark:text-gray-300">
          Master .NET, Next.js, GraphQL, and Laravel with step-by-step lessons and prepare for interviews with realistic quizzes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6 md:mb-8">
          <Link href="/playground" className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-full shadow hover:bg-gray-700 dark:hover:bg-gray-600 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Try GraphQL Playground
          </Link>
          <Link href="/animated-background-demo" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full shadow hover:from-purple-600 hover:to-indigo-700 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            Animated Background Demo
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {/* .NET Section */}
          <div className="flex flex-col items-center bg-blue-50/80 dark:bg-blue-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-blue-100 dark:border-blue-900/50 transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">.NET</h2>
            <p className="mb-4 text-center text-xs md:text-sm text-blue-900 dark:text-blue-200">
              Master C#, ASP.NET Core, Entity Framework, and more.
            </p>
            <Link href="/lessons" className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700 text-center font-semibold w-full mb-2 text-sm transition-colors duration-200">
              Step by Step Lessons
            </Link>
            <Link href="/interview" className="bg-green-600 dark:bg-green-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 text-center font-semibold w-full text-sm transition-colors duration-200">
              .NET Interview Quiz
            </Link>
          </div>
          {/* Next.js Section */}
          <div className="flex flex-col items-center bg-purple-50/80 dark:bg-purple-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-purple-100 dark:border-purple-900/50 transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-purple-700 dark:text-purple-300">Next.js</h2>
            <p className="mb-4 text-center text-xs md:text-sm text-purple-900 dark:text-purple-200">
              Learn modern React, routing, SSR, API routes, and more.
            </p>
            <Link href="/nextjs/lessons" className="bg-purple-500 dark:bg-purple-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-purple-600 dark:hover:bg-purple-700 text-center font-semibold w-full mb-2 text-sm transition-colors duration-200">
              Step by Step Lessons
            </Link>
            <Link href="/nextjs/interview" className="bg-indigo-600 dark:bg-indigo-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-indigo-700 dark:hover:bg-indigo-800 text-center font-semibold w-full text-sm transition-colors duration-200">
              Next.js Interview Quiz
            </Link>
          </div>
          {/* GraphQL Section */}
          <div className="flex flex-col items-center bg-pink-50/80 dark:bg-pink-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-pink-100 dark:border-pink-900/50 transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-pink-700 dark:text-pink-300">GraphQL</h2>
            <p className="mb-4 text-center text-xs md:text-sm text-pink-900 dark:text-pink-200">
              Understand queries, mutations, schemas, resolvers, and more.
            </p>
            <Link href="/graphql/lessons" className="bg-pink-500 dark:bg-pink-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-pink-600 dark:hover:bg-pink-700 text-center font-semibold w-full mb-2 text-sm transition-colors duration-200">
              Step by Step Lessons
            </Link>
            <Link href="/graphql/interview" className="bg-red-600 dark:bg-red-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-red-700 dark:hover:bg-red-800 text-center font-semibold w-full text-sm transition-colors duration-200">
              GraphQL Interview Quiz
            </Link>
          </div>
          {/* Laravel Section */}
          <div className="flex flex-col items-center bg-red-50/80 dark:bg-red-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-red-100 dark:border-red-900/50 transition-all duration-300 hover:shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-red-700 dark:text-red-300">Laravel</h2>
            <p className="mb-4 text-center text-xs md:text-sm text-red-900 dark:text-red-200">
              Master PHP, Eloquent ORM, Blade templates, and more.
            </p>
            <Link href="/laravel/lessons" className="bg-red-500 dark:bg-red-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-red-600 dark:hover:bg-red-700 text-center font-semibold w-full mb-2 text-sm transition-colors duration-200">
              Step by Step Lessons
            </Link>
            <Link href="/laravel/interview" className="bg-red-700 dark:bg-red-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-red-800 dark:hover:bg-red-900 text-center font-semibold w-full text-sm transition-colors duration-200">
              Laravel Interview Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}