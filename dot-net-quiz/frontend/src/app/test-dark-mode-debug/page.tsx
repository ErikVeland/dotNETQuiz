'use client'

import { useEffect } from 'react'
import { useDarkMode } from '../../components/DarkModeContext'

export default function TestDarkModeDebug() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    console.log('Component mounted, darkMode:', darkMode)
    console.log('HTML classes:', document.documentElement.classList)
    console.log('Body classes:', document.body.classList)
  }, [darkMode])

  const forceDarkMode = () => {
    console.log('Forcing dark mode')
    document.documentElement.classList.add('dark')
    console.log('HTML classes after force:', document.documentElement.classList)
  }

  const forceLightMode = () => {
    console.log('Forcing light mode')
    document.documentElement.classList.remove('dark')
    console.log('HTML classes after force:', document.documentElement.classList)
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Dark Mode Debug Test
        </h1>
        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Debug Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Dark mode is currently: <span className="font-medium">{darkMode ? 'ON' : 'OFF'}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            HTML classes: {Array.from(document.documentElement.classList).join(', ')}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Toggle Dark Mode (Context)
            </button>
            <button
              onClick={forceDarkMode}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Force Dark Mode
            </button>
            <button
              onClick={forceLightMode}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Force Light Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}