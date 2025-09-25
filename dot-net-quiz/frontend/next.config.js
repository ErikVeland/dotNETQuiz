/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Add any other configuration options here
  reactStrictMode: true,
  swcMinify: true,
  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  },
};

module.exports = nextConfig;
