import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  distDir: 'out', 
  basePath: '/training',
  images: {
    unoptimized: true, // Disable Image Optimization API
  },
};

export default nextConfig;
