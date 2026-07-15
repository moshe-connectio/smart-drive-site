import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  deleteSoldVehicles,
  getPublishedVehicles,
  getUniqueBrands,
  getUniqueCategories,
  Vehicle,
} from '@modules/vehicles/lib/repository';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { FilterableVehicleGrid } from '@modules/vehicles/components/FilterableVehicleGrid';
import { dealershipConfig } from '@core/config/site.config';
import { ROUTES, SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';
import { generateVehicleSlug } from '@shared/utils/formatting';
import { safeJsonLd } from '@shared/utils/json-ld';
import { logger } from '@core/lib/logger';

export const revalidate = 60;

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `רכבים למכירה | ${dealershipConfig.business.name}`,
  description: 'מבחר רכבים למכירה עם בדיקות מקיפות, שקיפות מלאה וליווי מקצועי בכל שלב הרכישה.',
  keywords: `רכבים למכירה, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/vehicles`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/vehicles`,
    title: `רכבים למכירה | ${dealershipConfig.business.name}`,
    description: 'מבחר רכבים למכירה עם בדיקות מקיפות, שקיפות מלאה וליווי מקצועי.',
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `רכבים למכירה - ${dealershipConfig.business.name}`,
      },
    ],
  },
};

export default async function VehiclesPage() {
  if (!SHOW_IMMEDIATE_INVENTORY) {
    redirect(ROUTES.home);
  }

  let vehicles: Vehicle[] = [];
  let brands: string[] = [];
  let categories: string[] = [];
  let error: string | null = null;

  try {
    await deleteSoldVehicles();

    const [vehiclesResult, brandsResult, categoriesResult] = await Promise.allSettled([
      getPublishedVehicles(),
      getUniqueBrands(),
      getUniqueCategories(),
    ]);

    if (vehiclesResult.status === 'fulfilled') {
      vehicles = vehiclesResult.value.filter((vehicle) => vehicle.is_published);
    } else {
      logger.error('Failed to load vehicles:', vehiclesResult.reason);
      error = 'שגיאה בטעינת הרכבים. אנא נסו שוב בעוד מספר דקות.';
    }

    if (brandsResult.status === 'fulfilled') {
      brands = brandsResult.value;
    } else {
      logger.error('Failed to load brands:', brandsResult.reason);
    }

    if (categoriesResult.status === 'fulfilled') {
      categories = categoriesResult.value;
    } else {
      logger.error('Failed to load categories:', categoriesResult.reason);
    }
  } catch (err) {
    logger.error('Failed to load vehicles page data:', err);
    error = 'שגיאה בטעינת הרכבים. אנא נסו שוב בעוד מספר דקות.';
  }

  // ─── JSON-LD: ItemList of vehicles for rich results ─────────────────────────
  const itemListJsonLd = vehicles.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `רכבים למכירה - ${dealershipConfig.business.name}`,
        numberOfItems: vehicles.length,
        itemListElement: vehicles.slice(0, 50).map((v, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${siteUrl}/vehicles/${generateVehicleSlug(v.title, v.year, v.id)}`,
          name: v.title,
        })),
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }}
        />
      )}
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        <section className="route-hero -mt-20 md:-mt-24 pt-20 md:pt-24">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />

          <Container>
            <div className="route-hero-inner" style={{ paddingTop: '4.6rem' }}>
              <p className="route-hero-kicker">המלאי שלנו</p>
              <h1 className="route-hero-title">רכבים למכירה</h1>
              <p className="route-hero-subtitle">
                מבחר רכבים בדוקים עם שקיפות מלאה, תנאי רכישה הוגנים וליווי מקצועי עד המסירה.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12" style={{ background: 'var(--color-background)' }}>
          <Container>
            {error && (
              <div
                className="mb-8 p-4 rounded-xl"
                style={{
                  background: 'var(--color-error-light)',
                  border: '1px solid var(--color-error)',
                  color: 'var(--color-error-dark)',
                }}
              >
                {error}
              </div>
            )}

            <FilterableVehicleGrid vehicles={vehicles} brands={brands} categories={categories} />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
