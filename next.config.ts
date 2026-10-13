import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hide the Next.js "N" badge in the bottom-left during development
  devIndicators: false,
  // Self-contained server in .next/standalone — what the Docker image (Google Cloud Run) runs
  output: "standalone",
  async redirects() {
    return [
      {
        // One address for the site: thescalehouse.in → www.thescalehouse.in
        source: "/:path*",
        has: [{ type: "host", value: "thescalehouse.in" }],
        destination: "https://www.thescalehouse.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
