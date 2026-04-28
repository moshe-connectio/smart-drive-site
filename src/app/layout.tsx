import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { dealershipConfig } from "@core/config/site.config";
import AccessibilityWidget from "@shared/components/ui/AccessibilityWidget";
import CookieConsentBanner from "@shared/components/ui/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-hebrew",
  subsets: ["hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = dealershipConfig.seo.siteUrl;

// ─── Search engine / platform site verification ──────────────────────────────
// Set these in your hosting environment to verify ownership without redeploying.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const facebookDomainVerification = process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION;

// ─── Analytics / Tag managers (loaded only when configured) ──────────────────
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
  // ─── metadataBase ─────────────────────────────────────────────────────────
  // Required for Next.js to resolve relative image URLs in OG/Twitter fields
  metadataBase: new URL(siteUrl),

  // ─── Core ─────────────────────────────────────────────────────────────────
  title: {
    default: dealershipConfig.seo.title,
    template: `%s | ${dealershipConfig.business.name}`,
  },
  description: dealershipConfig.seo.description,
  keywords: dealershipConfig.seo.keywords,
  authors: [{ name: dealershipConfig.seo.author, url: siteUrl }],
  creator: dealershipConfig.seo.author,
  publisher: dealershipConfig.business.name,

  // ─── Canonical & alternates ───────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
    languages: {
      'he-IL': siteUrl,
    },
  },

  // ─── Robots ───────────────────────────────────────────────────────────────
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

  // ─── OpenGraph ────────────────────────────────────────────────────────────
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

  // ─── Twitter / X Cards ────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: dealershipConfig.seo.twitterHandle,
    creator: dealershipConfig.seo.twitterHandle,
    title: dealershipConfig.seo.title,
    description: dealershipConfig.seo.description,
    images: [dealershipConfig.seo.ogImage],
  },

  // ─── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },

  // ─── Manifest (PWA) ───────────────────────────────────────────────────────
  manifest: '/site.webmanifest',

  // ─── Site verification (Google / Bing / Meta) ─────────────────────────────
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...((bingSiteVerification || facebookDomainVerification)
      ? {
          other: {
            ...(bingSiteVerification ? { 'msvalidate.01': bingSiteVerification } : {}),
            ...(facebookDomainVerification
              ? { 'facebook-domain-verification': facebookDomainVerification }
              : {}),
          },
        }
      : {}),
  },

  // ─── Extra ────────────────────────────────────────────────────────────────
  category: 'automotive',
};

// ─── WebSite + LocalBusiness JSON-LD ────────────────────────────────────────
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: dealershipConfig.business.name,
  url: siteUrl,
  description: dealershipConfig.seo.description,
  inLanguage: 'he-IL',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/vehicles?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: dealershipConfig.business.name,
  description: dealershipConfig.seo.description,
  url: siteUrl,
  logo: `${siteUrl}${dealershipConfig.business.logo}`,
  image: `${siteUrl}${dealershipConfig.seo.ogImage}`,
  telephone: dealershipConfig.contact.phone,
  email: dealershipConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: dealershipConfig.contact.address,
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.0853,
    longitude: 34.7818,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    dealershipConfig.social.facebook,
    dealershipConfig.social.instagram,
    dealershipConfig.social.linkedin,
    dealershipConfig.social.youtube,
  ],
  priceRange: '₪₪₪',
  currenciesAccepted: 'ILS',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: {
    '@type': 'Country',
    name: 'Israel',
  },
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
            <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={supabaseOrigin} />
          </>
        )}

        {/* Google Tag Manager (head snippet) */}
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Global JSON-LD: WebSite + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <AccessibilityWidget />
        <CookieConsentBanner />

        {/* Vercel first-party Analytics + Core Web Vitals (no PII, GDPR-friendly) */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 (loaded standalone only when GTM is not used) */}
        {gaMeasurementId && !gtmId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`}
            </Script>
          </>
        )}

        {/* Meta (Facebook) Pixel */}
        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}

