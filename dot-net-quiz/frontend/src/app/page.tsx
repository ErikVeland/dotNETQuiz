'use client'

import Link from "next/link";

export default function Home() {
  // Define modules organized by category
  const backendModules = [
    {
      id: 'dotnet',
      title: '.NET',
      description: 'Master C#, ASP.NET Core, Entity Framework, and more.',
      lessonsLink: '/lessons',
      interviewLink: '/interview',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'laravel',
      title: 'Laravel',
      description: 'Master PHP, Eloquent ORM, Blade templates, and more.',
      lessonsLink: '/laravel/lessons',
      interviewLink: '/laravel/interview',
      color: 'red',
      gradient: 'from-red-500 to-red-700'
    },
    {
      id: 'node',
      title: 'Node.js',
      description: 'Master server-side JavaScript, Express.js, and APIs.',
      lessonsLink: '/node/lessons',
      interviewLink: '/node/interview',
      color: 'green',
      gradient: 'from-green-500 to-green-700'
    },
    {
      id: 'database',
      title: 'Databases & Data Modelling',
      description: 'Database design and implementation with SQL and ORMs.',
      lessonsLink: '/database/lessons',
      interviewLink: '/database/interview',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-700'
    }
  ];

  const frontendModules = [
    {
      id: 'nextjs',
      title: 'Next.js',
      description: 'Learn modern React, routing, SSR, API routes, and more.',
      lessonsLink: '/nextjs/lessons',
      interviewLink: '/nextjs/interview',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-700'
    },
    {
      id: 'react',
      title: 'React',
      description: 'Master components, hooks, state management, and more.',
      lessonsLink: '/react/lessons',
      interviewLink: '/react/interview',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'vue',
      title: 'Vue.js',
      description: 'Progressive JavaScript framework for building user interfaces.',
      lessonsLink: '/vue/lessons',
      interviewLink: '/vue/interview',
      color: 'green',
      gradient: 'from-green-500 to-green-700'
    },
    {
      id: 'graphql',
      title: 'GraphQL',
      description: 'Understand queries, mutations, schemas, resolvers, and more.',
      lessonsLink: '/graphql/lessons',
      interviewLink: '/graphql/interview',
      color: 'pink',
      gradient: 'from-pink-500 to-red-700'
    },
    {
      id: 'tailwind',
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development.',
      lessonsLink: '/tailwind/lessons',
      interviewLink: '/tailwind/interview',
      color: 'teal',
      gradient: 'from-teal-500 to-teal-700'
    },
    {
      id: 'sass',
      title: 'SASS',
      description: 'CSS preprocessor with variables, nesting, and mixins.',
      lessonsLink: '/sass/lessons',
      interviewLink: '/sass/interview',
      color: 'pink',
      gradient: 'from-pink-500 to-pink-700'
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
      lessonsLink: '/typescript/lessons',
      interviewLink: '/typescript/interview',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'testing',
      title: 'Testing & QA',
      description: 'Software testing and quality assurance practices.',
      lessonsLink: '/testing/lessons',
      interviewLink: '/testing/interview',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-700'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      {/* Main container with single background */}
      <div className="w-full max-w-6xl flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Fullstack Academy
          </h1>
          <p className="mb-6 text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Master fullstack development with step-by-step lessons and prepare for interviews with realistic quizzes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link 
            href="/playground" 
            className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-full shadow hover:bg-gray-700 dark:hover:bg-gray-600 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Try GraphQL Playground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Try GraphQL Playground
          </Link>
          <Link 
            href="/animated-background-demo" 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full shadow hover:from-purple-600 hover:to-indigo-700 text-center font-semibold flex items-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Animated Background Demo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            Animated Background Demo
          </Link>
        </div>

        {/* Backend Modules Section */}
        <div className="w-full mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg mr-3">1</span>
            Backend Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {backendModules.map((module) => (
              <div 
                key={module.id} 
                className="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{module.title}</h3>
                <p className="mb-5 text-gray-600 dark:text-gray-300 flex-grow">
                  {module.description}
                </p>
                <div className="flex gap-3">
                  <Link 
                    href={module.lessonsLink} 
                    className={`flex-1 bg-gradient-to-r ${module.gradient} text-white px-4 py-2 rounded-lg shadow hover:opacity-90 text-center font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    aria-label={`Learn ${module.title} with step by step lessons`}
                  >
                    Lessons
                  </Link>
                  <Link 
                    href={module.interviewLink} 
                    className={`flex-1 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 text-center font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    aria-label={`Take ${module.title} interview quiz`}
                  >
                    Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frontend Modules Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-lg mr-3">2</span>
            Frontend Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendModules.map((module) => (
              <div 
                key={module.id} 
                className="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{module.title}</h3>
                <p className="mb-5 text-gray-600 dark:text-gray-300 flex-grow">
                  {module.description}
                </p>
                <div className="flex gap-3">
                  <Link 
                    href={module.lessonsLink} 
                    className={`flex-1 bg-gradient-to-r ${module.gradient} text-white px-4 py-2 rounded-lg shadow hover:opacity-90 text-center font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    aria-label={`Learn ${module.title} with step by step lessons`}
                  >
                    Lessons
                  </Link>
                  <Link 
                    href={module.interviewLink} 
                    className={`flex-1 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 text-center font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                    aria-label={`Take ${module.title} interview quiz`}
                  >
                    Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}