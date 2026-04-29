import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * NOTE on CSP: this site embeds inline scripts (JSON-LD, GTM, GA4, Meta Pixel)
 * and inline styles (CSS variables on elements), so a strict CSP without
 * 'unsafe-inline' would break the page. Rather than ship a CSP that has to
 * weaken itself with 'unsafe-inline' (which provides little real protection),
 * we ship the high-signal headers below and leave CSP to a future hardening
 * pass that uses nonces + Next.js middleware.
 */
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // next/image is only used for local assets (e.g. /logo.png in Header/Footer).
  // Vehicle and manufacturer photos come from arbitrary external hosts and use plain <img>.
  images: {
    remotePatterns: [],
  },
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
