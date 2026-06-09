import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Rubik } from 'next/font/google';
import './globals.css';
import { dealershipConfig } from '@core/config/site.config';
import AccessibilityWidget from '@shared/components/ui/AccessibilityWidget';
import CookieConsentBanner from '@shared/components/ui/CookieConsentBanner';
import {
  AnalyticsBody,
  AnalyticsHead,
} from '@shared/components/analytics/AnalyticsScripts';
import {
  websiteJsonLd,
  localBusinessJsonLd,
} from '@shared/components/seo/structuredData';
import { safeJsonLd } from '@shared/utils/json-ld';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const rubik = Rubik({
  variable: '--font-hebrew',
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
});

const siteUrl = dealershipConfig.seo.siteUrl;

// ─── Search engine / platform site verification ──────────────────────────────
// Set these in your hosting environment to verify ownership without redeploying.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const facebookDomainVerification =
  process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION;

// Derive Supabase Storage origin (if configured) for <link rel="preconnect">
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseOrigin: string | null = null;
try {
  if (supabaseUrl) supabaseOrigin = new URL(supabaseUrl).origin;
} catch {
  supabaseOrigin = null;
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: dealershipConfig.seo.title,
    template: `%s | ${dealershipConfig.business.name}`,
  },
  description: dealershipConfig.seo.description,
  keywords: dealershipConfig.seo.keywords,
  authors: [{ name: dealershipConfig.seo.author, url: siteUrl }],
  creator: dealershipConfig.seo.author,
  publisher: dealershipConfig.business.name,

  alternates: {
    canonical: siteUrl,
    languages: {
      'he-IL': siteUrl,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: siteUrl,
    siteName: dealershipConfig.business.name,
    title: dealershipConfig.seo.title,
    description: dealershipConfig.seo.description,
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: dealershipConfig.business.name,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: dealershipConfig.seo.twitterHandle,
    creator: dealershipConfig.seo.twitterHandle,
    title: dealershipConfig.seo.title,
    description: dealershipConfig.seo.description,
    images: [dealershipConfig.seo.ogImage],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },

  manifest: '/site.webmanifest',

  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification || facebookDomainVerification
      ? {
          other: {
            ...(bingSiteVerification
              ? { 'msvalidate.01': bingSiteVerification }
              : {}),
            ...(facebookDomainVerification
              ? { 'facebook-domain-verification': facebookDomainVerification }
              : {}),
          },
        }
      : {}),
  },

  category: 'automotive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Preconnect to image origin to shave LCP on listing/detail pages */}
        {supabaseOrigin && (
          <>
            <link
              rel="preconnect"
              href={supabaseOrigin}
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href={supabaseOrigin} />
          </>
        )}

        <AnalyticsHead />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
        {/* Global JSON-LD: WebSite + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(localBusinessJsonLd),
          }}
        />

        {children}

        <AccessibilityWidget />
        <CookieConsentBanner />

        <AnalyticsBody />
      </body>
    </html>
  );
}
