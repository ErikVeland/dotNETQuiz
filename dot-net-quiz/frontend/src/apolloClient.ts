import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  // Use the base URL from environment or fallback to localhost:5022
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5022';
  const graphqlUrl = `${baseUrl}/graphql`;
  
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