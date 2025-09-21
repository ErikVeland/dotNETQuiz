'use client';

import { useState } from 'react';
import Link from 'next/link';

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

  return (
    // Updated container with glass morphism effect
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">GraphQL Playground</h1>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>

        {/* Updated container with glass morphism effect */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Query</h2>
              <textarea
                className="w-full h-80 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Variables (JSON)</h2>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100"
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
                <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/40 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded backdrop-blur-sm">
                  {error}
                </div>
              )}
              <pre className="w-full h-[30rem] p-3 border border-gray-300 dark:border-gray-600 rounded-md overflow-auto bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm font-mono text-sm text-gray-900 dark:text-gray-100">
                {response || 'Execute a query to see results'}
              </pre>
            </div>
          </div>
        </div>

        {/* Updated container with glass morphism effect */}
        <div className="mt-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Example Queries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Get .NET Lessons</h3>
              <pre className="p-3 bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
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
              <pre className="p-3 bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
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
              <pre className="p-3 bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
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
              <pre className="p-3 bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-md overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 backdrop-blur-sm">
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