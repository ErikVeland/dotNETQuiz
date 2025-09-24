import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

// Custom function to determine if we should retry based on error
const shouldRetry = (error: any) => {
  // Retry on network errors or server errors that might be due to cold start
  return !!error && (
    error.message?.includes('Failed to fetch') ||
    error.message?.includes('NetworkError') ||
    error.message?.includes('ECONNREFUSED') ||
    error.message?.includes('timeout') ||
    error.statusCode === 408 ||  // Request timeout
    error.statusCode === 502 ||  // Bad gateway
    error.statusCode === 503 ||  // Service unavailable
    error.statusCode === 504     // Gateway timeout
  );
};

const retryLink = new RetryLink({
  delay: {
    initial: 2000, // Start with 2 second delay
    max: 30000,    // Max 30 seconds between retries
    jitter: true,  // Add randomness to prevent thundering herd
  },
  attempts: {
    max: 30,       // Maximum retry attempts
    retryIf: (error, _operation) => shouldRetry(error),
  },
});

export const createApolloClient = () => {
  // Use the base URL from environment or fallback to the hosted backend URL
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'https://fullstack-academy-backend.onrender.com';
  const graphqlUrl = `${baseUrl}/graphql`;
  
  console.log('Apollo Client Configuration:', {
    baseUrl,
    graphqlUrl,
    env: process.env.NEXT_PUBLIC_API_BASE
  });
  
  return new ApolloClient({
    link: retryLink.concat(new HttpLink({ uri: graphqlUrl })),
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