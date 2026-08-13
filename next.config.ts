import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: "standalone" is only useful for production deployment.
  // In dev, leaving it on can cause confusion. Keep it for `npm run build`.
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Suppress the "allowedDevOrigins" warning when accessing the dev server
  // through the preview proxy / tunnel.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "*.preview.z.ai",
    "*.z.ai",
  ],

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
