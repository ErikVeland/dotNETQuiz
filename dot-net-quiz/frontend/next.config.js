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
  },
  
  // Add custom headers to handle CORS and other issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;