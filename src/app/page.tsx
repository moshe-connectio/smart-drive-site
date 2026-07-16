import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { dealershipConfig } from '@core/config/site.config';
import { SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';
import { HomeHero } from '@modules/home/components/HomeHero';
import { HomeAdvantages } from '@modules/home/components/HomeAdvantages';
import { HomeContactBlock } from '@modules/home/components/HomeContactBlock';
import { HomeSearchSection } from '@modules/home/components/HomeSearchSection';
import { HomeFinancePartners } from '@modules/home/components/HomeFinancePartners';
import { HomeManufacturersSection } from '@modules/home/components/HomeManufacturersSection';
import { HomeFeaturedSection } from '@modules/home/components/HomeFeaturedSection';
import { HomeSectionPlaceholder } from '@modules/home/components/HomeSectionPlaceholder';

export const revalidate = 3600;

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: dealershipConfig.seo.title,
  description: dealershipConfig.seo.description,
  keywords: dealershipConfig.seo.keywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
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
};

/**
 * Home page is intentionally synchronous — Hero / Advantages / ContactBlock
 * render immediately. Data-heavy sections fetch in parallel and are streamed
 * via React Suspense so the user sees the hero instantly even on cold starts.
 */
export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <HomeHero />

        {SHOW_IMMEDIATE_INVENTORY && (
          <Suspense fallback={<HomeSectionPlaceholder minHeight={480} />}>
            <HomeFeaturedSection />
          </Suspense>
        )}

        <HomeAdvantages />

        <Suspense fallback={<HomeSectionPlaceholder minHeight={520} />}>
          <HomeFinancePartners />
          <HomeSearchSection />
        </Suspense>

        <Suspense fallback={<HomeSectionPlaceholder minHeight={400} />}>
          <HomeManufacturersSection />
        </Suspense>

        <HomeContactBlock />
      </main>

      <Footer />
    </div>
  );
}
