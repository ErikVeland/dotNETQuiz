"use client";

import { useEffect, useState } from "react";

export default function TestApiPage() {
  const [result, setResult] = useState<any>(null);
  
  useEffect(() => {
    const testApi = async () => {
      try {
        // Test the health endpoint
        const healthResponse = await fetch('/api/health');
        const healthData = await healthResponse.json();
        
        // Test the GraphQL endpoint
        const graphqlResponse = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                graphQLLessons {
                  id
                  topic
                  title
                }
              }
            `
          })
        });
        
        const graphqlData = await graphqlResponse.json();
        
        setResult({
          health: {
            status: healthResponse.status,
            data: healthData
          },
          graphql: {
            status: graphqlResponse.status,
            data: graphqlData
          }
        });
      } catch (error) {
        setResult({
          error: error.message
        });
      }
    };
    
    testApi();
  }, []);
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Test</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        {result ? (
          <div className="space-y-4">
            {result.error ? (
              <div>
                <p className="text-red-600 dark:text-red-400">Error: {result.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Health Check:</h3>
                  <p>Status: {result.health.status}</p>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
                    {JSON.stringify(result.health.data, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-semibold">GraphQL Query:</h3>
                  <p>Status: {result.graphql.status}</p>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
                    {JSON.stringify(result.graphql.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Testing API...</p>
        )}
      </div>
    </div>
  );
}