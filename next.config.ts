import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  distDir: 'out', 
  basePath: '',
  images: {
    unoptimized: false, // Disable Image Optimization API
  },
};

export default nextConfig;
