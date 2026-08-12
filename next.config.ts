import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  // Optimize image loading — we use a few static images served from /public.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },

  // Faster dev compilation by reducing the watched file set noise.
  // (Next 16 enables turbopack by default for dev.)
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
    ],
  },
};

export default nextConfig;
