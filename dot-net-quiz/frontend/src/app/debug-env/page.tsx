'use client';

import { useEffect, useState } from 'react';

export default function DebugEnvPage() {
  const [envInfo, setEnvInfo] = useState<any>(null);
  const [apiTestResult, setApiTestResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get environment information
    const envData = {
      NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
      windowLocation: typeof window !== 'undefined' ? window.location.origin : 'Server-side',
      graphqlUrl: process.env.NEXT_PUBLIC_API_BASE 
        ? `${process.env.NEXT_PUBLIC_API_BASE}/graphql` 
        : 'https://fullstack-academy-backend.onrender.com/graphql'
    };
    
    setEnvInfo(envData);
    setLoading(false);
    
    // Test API connection
    const testApi = async () => {
      try {
        const url = envData.graphqlUrl;
        setApiTestResult(`Testing connection to: ${url}`);
        
        // Simple fetch test
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                __typename
              }
            `
          })
        });
        
        if (response.ok) {
          setApiTestResult(`Success! Connected to ${url}`);
        } else {
          setApiTestResult(`Failed to connect to ${url}. Status: ${response.status}`);
        }
      } catch (error) {
        setApiTestResult(`Error connecting to API: ${error.message}`);
      }
    };
    
    testApi();
  }, []);

  if (loading) {
    return <div className="p-6">Loading debug information...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Environment Debug Information</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="space-y-3">
          <div>
            <span className="font-medium">NEXT_PUBLIC_API_BASE:</span>
            <code className="ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {envInfo.NEXT_PUBLIC_API_BASE || 'Not set'}
            </code>
          </div>
          <div>
            <span className="font-medium">Window Location:</span>
            <code className="ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {envInfo.windowLocation}
            </code>
          </div>
          <div>
            <span className="font-medium">GraphQL URL:</span>
            <code className="ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {envInfo.graphqlUrl}
            </code>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
          <p>{apiTestResult}</p>
        </div>
      </div>
    </div>
  );
}