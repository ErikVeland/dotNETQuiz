import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  // Use the base URL from environment or fallback to localhost:5022
  // Explicitly check for the Render environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'https://fullstack-academy-backend.onrender.com';
  const graphqlUrl = `${baseUrl}/graphql`;
  
  console.log('Apollo Client Configuration:', {
    baseUrl,
    graphqlUrl,
    env: process.env.NEXT_PUBLIC_API_BASE
  });
  
  return new ApolloClient({
    uri: graphqlUrl,
    cache: new InMemoryCache(),
  });
};

// For client components that need a singleton instance
let clientSingleton: ApolloClient<any> | null = null;

export function getApolloClient() {
  if (typeof window === 'undefined') {
    // Server side - always create a new client
    return createApolloClient();
  }
  
  // Client side - create once and reuse
  if (!clientSingleton) {
    clientSingleton = createApolloClient();
  }
  
  return clientSingleton;
}