import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "connect-src 'self' http://localhost:8000",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
