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
};

module.exports = nextConfig;