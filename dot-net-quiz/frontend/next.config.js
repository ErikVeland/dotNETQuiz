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
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;