'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import EnhancedLoadingComponent from '../../components/EnhancedLoadingComponent';

export default function Custom502() {
  const [retryCount, setRetryCount] = useState(0);
  const retryCountRef = useRef(0);
  const [shouldRetry, setShouldRetry] = useState(true);

  useEffect(() => {
    // Start the retry process automatically
    const retryTimer = setTimeout(() => {
      if (retryCountRef.current < 30) {
        retryCountRef.current += 1;
        setRetryCount(retryCountRef.current);
        // Try to reload the page to see if the backend is now available
        window.location.reload();
      } else {
        setShouldRetry(false);
      }
    }, 3000); // Start retry after 3 seconds
    
    return () => clearTimeout(retryTimer);
  }, []);

  const handleManualRetry = () => {
    retryCountRef.current = 0;
    setRetryCount(0);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <EnhancedLoadingComponent 
          retryCount={retryCount} 
          maxRetries={30} 
          onRetry={handleManualRetry}
        />
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We're automatically retrying every few seconds while the backend starts up.
            If this takes too long, you can manually retry using the button above.
          </p>
          <Link 
            href="/" 
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}