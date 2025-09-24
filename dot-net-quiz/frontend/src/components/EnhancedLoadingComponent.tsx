"use client";

import React, { useState, useEffect } from 'react';

interface EnhancedLoadingComponentProps {
  retryCount: number;
  maxRetries: number;
  error?: any;
  onRetry?: () => void;
}

const EnhancedLoadingComponent: React.FC<EnhancedLoadingComponentProps> = ({ 
  retryCount, 
  maxRetries, 
  error,
  onRetry
}) => {
  // State to track if we're showing the retry button
  const [showRetry, setShowRetry] = useState(false);
  
  // Show retry button after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reset showRetry when retryCount changes
  useEffect(() => {
    setShowRetry(false);
  }, [retryCount]);

  if (retryCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">Loading content...</div>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (retryCount > 0 && retryCount < maxRetries) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
          Backend is starting up, please wait...
        </div>
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          Attempt {retryCount} of {maxRetries}
        </div>
        {showRetry && (
          <button 
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-200"
            onClick={onRetry}
          >
            Try Now
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-4 text-lg font-medium text-red-600 dark:text-red-400">
        The backend took too long to start. Please try again.
      </div>
      <button 
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-200"
        onClick={() => {
          if (onRetry) {
            onRetry();
          } else {
            window.location.reload();
          }
        }}
      >
        Retry Now
      </button>
    </div>
  );
};

export default EnhancedLoadingComponent;