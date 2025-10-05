import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to succeed even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  output: 'standalone',
};

export default nextConfig;