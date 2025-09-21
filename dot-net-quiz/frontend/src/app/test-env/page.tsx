"use client";

export default function TestEnvPage() {
  // This will only work on the client side
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5022';
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Environment Variable Test</h1>
      <p>API Base URL: {apiUrl}</p>
      <p>Full GraphQL URL: {`${apiUrl}/graphql`}</p>
    </div>
  );
}