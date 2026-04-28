import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next/image is only used for local assets (e.g. /logo.png in Header/Footer).
  // Vehicle and manufacturer photos come from arbitrary external hosts and use plain <img>.
  images: {
    remotePatterns: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
