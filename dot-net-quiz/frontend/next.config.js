/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Handle ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Handle TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure standalone mode works correctly
  serverExternalPackages: [],
  
  // Add rewrites for API proxying
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://fullstack-academy-backend.onrender.com/graphql'
      },
      {
        source: '/api/:path*',
        destination: 'https://fullstack-academy-backend.onrender.com/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;