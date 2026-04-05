import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik } from "next/font/google";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}

