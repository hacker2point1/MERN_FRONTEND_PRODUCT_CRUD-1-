import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // proxy backend-hosted static files (images/uploads) during dev
        source: "/uploads/:path*",
        destination: "http://localhost:3007/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
