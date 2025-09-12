import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL || 'http://localhost:5022/graphql',
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