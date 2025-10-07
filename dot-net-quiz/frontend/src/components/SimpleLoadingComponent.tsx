"use client";

import React from 'react';

interface SimpleLoadingComponentProps {
  message?: string;
}

const SimpleLoadingComponent: React.FC<SimpleLoadingComponentProps> = ({ 
  message = "Loading content..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">{message}</div>
      <div className="mb-4">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    </div>
  );
};

export default SimpleLoadingComponent;