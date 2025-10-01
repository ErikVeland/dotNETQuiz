'use client';

import { useState } from 'react';
import Link from 'next/link';
import EnhancedLoadingComponent from '../../components/EnhancedLoadingComponent';

export default function GraphQLPlayground() {
  const [query, setQuery] = useState(`# Welcome to the dotNetQuiz GraphQL Playground
# Try running some queries!

query {
  dotNetLessons {
    id
    topic
    title
  }
}`);
  const [variables, setVariables] = useState('{}');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const executeQuery = async () => {
    setLoading(true);
    setError('');
    try {
      // Use the environment variable or default to the hosted backend
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'https://fullstack-academy-backend.onrender.com';
      const graphqlUrl = `${baseUrl}/graphql`;
      
      const res = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: variables ? JSON.parse(variables) : undefined,
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle manual retry
  const handleManualRetry = () => {
    setRetryCount(0);
    setError('');
    setLoading(true);
    
    // Reset the fetch process
    const fetchGraphQL = async () => {
      try {
        // Use the environment variable or default to the hosted backend
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'https://fullstack-academy-backend.onrender.com';
        const graphqlUrl = `${baseUrl}/graphql`;
        
        const res = await fetch(graphqlUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `# Welcome to the dotNetQuiz GraphQL Playground
# Try running some queries!

query {
  dotNetLessons {
    id
    topic
    title
  }
}`,
            variables: {},
          }),
        });

        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };
    
    fetchGraphQL();
  };

  // Show loading state
  if (loading) {
    if (retryCount > 0) {
      return (
        // Changed from opaque background to glass morphism effect
        <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/30 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <EnhancedLoadingComponent 
              retryCount={retryCount} 
              maxRetries={30} 
              onRetry={handleManualRetry}
            />
          </div>
        </div>
      );
    }
    
    // Show initial loading state with glass morphism effect
    return (
      // Changed from opaque background to glass morphism effect
      <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-2/3 bg-white/30 dark:bg-gray-700/30 rounded"></div>
            <div className="h-64 w-full bg-white/30 dark:bg-gray-700/30 rounded"></div>
            <div className="h-10 w-1/3 bg-white/30 dark:bg-gray-700/30 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error only after loading
  if (error) {
    return (
      // Changed from opaque background to glass morphism effect
      <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50 dark:border-gray-700/50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
              <p className="mb-4 text-gray-800 dark:text-gray-200">{error}</p>
              <button
                onClick={handleManualRetry}
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Updated container with standardized background gradient
    <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">GraphQL Playground</h1>
          <Link href="/" className="inline-block mb-4 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 font-semibold py-1 px-2 rounded shadow hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors duration-150 flex items-center gap-1 text-xs">
            <span className="text-base">←</span> Back to Home
          </Link>
        </div>

        {/* Updated container with glass morphism effect */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-white/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Query</h2>
              <textarea
                className="w-full h-80 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm text-gray-900 dark:text-gray-100"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Variables (JSON)</h2>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm text-gray-900 dark:text-gray-100"
                value={variables}
                onChange={(e) => setVariables(e.target.value)}
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                onClick={executeQuery}
                disabled={loading}
              >
                {loading ? 'Executing...' : 'Execute Query'}
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Response</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-100/30 dark:bg-red-900/30 border border-red-400/50 dark:border-red-700/50 text-red-700 dark:text-red-300 rounded backdrop-blur-sm">
                  {error}
                </div>
              )}
              <pre className="w-full h-[30rem] p-3 border border-gray-300 dark:border-gray-600 rounded-md overflow-auto bg-gray-50/30 dark:bg-gray-700/30 backdrop-blur-sm font-mono text-sm text-gray-900 dark:text-gray-100">
                {response || 'Execute a query to see results'}
              </pre>
            </div>
          </div>
        </div>

        {/* Updated container with glass morphism effect */}
        <div className="mt-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-white/50 dark:border-gray-700/50">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Example Queries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Get .NET Lessons</h3>
              <pre className="p-3 bg-gray-50/30 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600/50 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                {`query {
  dotNetLessons {
    id
    topic
    title
    description
  }
}`}
              </pre>
              <button
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={() =>
                  setQuery(`query {
  dotNetLessons {
    id
    topic
    title
    description
  }
}`)
                }
              >
                Use this query
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Get Interview Questions</h3>
              <pre className="p-3 bg-gray-50/30 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600/50 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                {`query {
  dotNetInterviewQuestions {
    id
    topic
    type
    question
    choices
  }
}`}
              </pre>
              <button
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={() =>
                  setQuery(`query {
  dotNetInterviewQuestions {
    id
    topic
    type
    question
    choices
  }
}`)
                }
              >
                Use this query
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Submit Answer</h3>
              <pre className="p-3 bg-gray-50/30 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600/50 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                {`mutation {
  submitAnswer(questionId: 1, answerIndex: 0) {
    isCorrect
    explanation
  }
}`}
              </pre>
              <button
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={() =>
                  setQuery(`mutation {
  submitAnswer(questionId: 1, answerIndex: 0) {
    isCorrect
    explanation
  }
}`)
                }
              >
                Use this query
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Filter & Sort</h3>
              <pre className="p-3 bg-gray-50/30 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600/50 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                {`query {
  dotNetLessons(
    topic: "OOP"
    sortBy: "id"
    sortOrder: "asc"
    limit: 5
    offset: 0
  ) {
    id
    title
  }
}`}
              </pre>
              <button
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={() =>
                  setQuery(`query {
  dotNetLessons(
    topic: "OOP"
    sortBy: "id"
    sortOrder: "asc"
    limit: 5
    offset: 0
  ) {
    id
    title
  }
}`)
                }
              >
                Use this query
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}