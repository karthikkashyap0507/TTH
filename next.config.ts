import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hide the Next.js "N" badge in the bottom-left during development
  devIndicators: false,
};

export default nextConfig;
