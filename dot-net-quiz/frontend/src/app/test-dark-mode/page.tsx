'use client'

import { useDarkMode } from '../../components/DarkModeContext'

export default function TestDarkMode() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    // Updated container with glass morphism effect
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Dark Mode Test Page
        </h1>
        
        {/* Updated container with glass morphism effect */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Current Theme Status
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dark mode is currently: <span className="font-medium">{darkMode ? 'ON' : 'OFF' </span>
          </p>
          <button
            onClick={toggleDarkMode}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Toggle Dark Mode
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Updated container with glass morphism effect */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Light Theme Example
            </h3>
            <p className="text-gray-600">
              This content should appear differently in light mode.
            </p>
            <code className="block mt-3 p-2 bg-gray-100/80 text-gray-800 rounded backdrop-blur-sm">
              console.log('Hello World');
            </code>
          </div>
          
          {/* Updated container with glass morphism effect */}
          <div className="bg-gray-800/90 text-white rounded-xl shadow-lg p-6 border border-gray-700 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-white mb-3">
              Dark Theme Example
            </h3>
            <p className="text-gray-300">
              This content should appear differently in dark mode.
            </p>
            <code className="block mt-3 p-2 bg-gray-700/80 text-gray-100 rounded backdrop-blur-sm">
              console.log('Hello World');
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}