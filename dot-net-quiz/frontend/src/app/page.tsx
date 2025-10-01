'use client'

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Fullstack Academy
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Master fullstack development with our structured learning paths. Progress from foundational technologies 
            to expert-level skills with step-by-step lessons and realistic interview preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Link href="/lessons" className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">.NET Core</h3>
            <p className="text-blue-100">Master C#, ASP.NET Core, and enterprise-grade backend development.</p>
          </Link>
          
          <Link href="/react/lessons" className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">React</h3>
            <p className="text-green-100">Master components, hooks, and modern React development patterns.</p>
          </Link>
          
          <Link href="/database/lessons" className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">Database</h3>
            <p className="text-purple-100">Database design, SQL, NoSQL, and performance optimization.</p>
          </Link>
          
          <Link href="/laravel/lessons" className="bg-red-600 text-white p-6 rounded-xl hover:bg-red-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">Laravel</h3>
            <p className="text-red-100">Master PHP, Eloquent ORM, and rapid web application development.</p>
          </Link>
          
          <Link href="/graphql/lessons" className="bg-pink-600 text-white p-6 rounded-xl hover:bg-pink-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">GraphQL</h3>
            <p className="text-pink-100">Modern API query language with schemas and resolvers.</p>
          </Link>
          
          <Link href="/nextjs/lessons" className="bg-indigo-600 text-white p-6 rounded-xl hover:bg-indigo-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">Next.js</h3>
            <p className="text-indigo-100">Full-stack React framework with SSR and API routes.</p>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link 
            href="/playground" 
            className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105"
          >
            Try GraphQL Playground
          </Link>
          <Link 
            href="/animated-background-demo" 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105"
          >
            Animated Background Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;