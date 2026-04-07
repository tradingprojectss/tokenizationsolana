import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "alakcell-photos-kr.kcdn.kz" },
    ],
  },
  turbopack: {},
};

export default nextConfig;
