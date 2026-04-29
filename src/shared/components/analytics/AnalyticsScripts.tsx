'use client';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from '@shared/hooks/useCookieConsent';

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Renders inside <body>: GTM noscript, GA4, Meta Pixel.
 *
 * All third-party trackers are gated behind the user's cookie consent
 * (analytics → GA4/GTM, marketing → Meta Pixel). Vercel first-party
 * Analytics & Speed Insights are loaded unconditionally because they
 * collect no PII and use no cookies (GDPR-friendly).
 *
 * Until the user has expressed a choice (`consent === null`), no third-
 * party tracker is loaded — this is the GDPR/Israeli Privacy Law default.
 */
export function AnalyticsBody() {
  const consent = useCookieConsent();

  // `undefined` = consent not yet read (SSR / first paint). We still render
  // Vercel's privacy-friendly telemetry so Core Web Vitals keep flowing.
  const allowAnalytics = consent?.analytics === true;
  const allowMarketing = consent?.marketing === true;

  return (
    <>
      {gtmId && allowAnalytics && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}

      {/* Vercel first-party Analytics + Core Web Vitals (no PII, GDPR-friendly) */}
      <Analytics />
      <SpeedInsights />

      {/* Google Analytics 4 standalone — only when GTM is not used */}
      {gaMeasurementId && !gtmId && allowAnalytics && (
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
      {metaPixelId && allowMarketing && (
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
    </>
  );
}

/**
 * Renders inside <head>: GTM init script.
 *
 * Gated on analytics consent. Note: Next.js does not allow client components
 * inside the document <head> in some configurations, but `next/script` works
 * inside any client component rendered from the layout's <head>.
 */
export function AnalyticsHead() {
  const consent = useCookieConsent();
  if (!gtmId || consent?.analytics !== true) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
