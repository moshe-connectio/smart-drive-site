import type { Metadata } from 'next';
import {
  getPublishedVehicles,
  Vehicle,
} from '@modules/vehicles/lib/repository';
import {
  getAllManufacturers,
  getAllTrimLevelsFullInfo,
} from '@modules/new-vehicles/lib/repository';
import { HomeManufacturersGrid } from '@modules/new-vehicles/components/HomeManufacturersGrid';
import { HomeVehicleSearch } from '@modules/new-vehicles/components/HomeVehicleSearch';
import { HomeFeaturedVehicles } from '@modules/vehicles/components/HomeFeaturedVehicles';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { logger } from '@core/lib/logger';
import { dealershipConfig } from '@core/config/site.config';
import { SectionHeading } from '@modules/home/components/SectionHeading';
import { HomeHero } from '@modules/home/components/HomeHero';
import { HomeAdvantages } from '@modules/home/components/HomeAdvantages';
import { HomeContactBlock } from '@modules/home/components/HomeContactBlock';

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

export default async function HomePage() {
  const [vehiclesResult, manufacturersResult, trimLevelsResult] =
    await Promise.allSettled([
      getPublishedVehicles(),
      getAllManufacturers(),
      getAllTrimLevelsFullInfo(),
    ]);

  let vehicles: Vehicle[] = [];
  let manufacturers: Awaited<ReturnType<typeof getAllManufacturers>> = [];
  let searchTrims: Awaited<ReturnType<typeof getAllTrimLevelsFullInfo>> = [];
  let error: string | null = null;

  if (vehiclesResult.status === 'fulfilled') {
    vehicles = vehiclesResult.value.filter((vehicle) => vehicle.is_published);
  } else {
    logger.error('Failed to load vehicles:', vehiclesResult.reason);
    error = 'שגיאה בטעינת הרכבים. אנא נסו שוב בעוד מספר דקות.';
  }

  if (manufacturersResult.status === 'fulfilled') {
    manufacturers = manufacturersResult.value;
  } else {
    logger.error(
      'Failed to load manufacturers:',
      manufacturersResult.reason,
    );
  }

  if (trimLevelsResult.status === 'fulfilled') {
    searchTrims = trimLevelsResult.value;
  } else {
    logger.error(
      'Failed to load trim levels for search:',
      trimLevelsResult.reason,
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      <Header />

      <main className="flex-1">
        <HomeHero vehicleCount={vehicles.length} />

        <HomeAdvantages />

        {searchTrims.length > 0 && (
          <section className="home-search-section">
            <Container className="py-20">
              <SectionHeading
                eyebrow="חיפוש רכב"
                title="מצאו את הרכב המתאים לכם"
                subtitle="חיפוש חכם לפי יצרן, דגם והחזר חודשי מבוקש."
              />
              <HomeVehicleSearch trims={searchTrims} />
            </Container>
          </section>
        )}

        {manufacturers.length > 0 && (
          <section className="home-mfr-section">
            <Container className="py-20">
              <SectionHeading
                eyebrow="רכבים חדשים"
                title="בחרו יצרן לרכב החדש שלכם"
                subtitle="כל הדגמים, המפרטים ורמות הגימור במקום אחד."
              />
              <HomeManufacturersGrid manufacturers={manufacturers} />
            </Container>
          </section>
        )}

        <section style={{ background: 'var(--color-background)' }}>
          <Container className="py-24">
            <SectionHeading
              eyebrow="המלאי שלנו"
              title="רכבים במלאי מיידי"
              subtitle="רכבים נבחרים שמוכנים לנסיעה הבאה שלכם."
            />

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

            {vehicles.length > 0 ? (
              <HomeFeaturedVehicles vehicles={vehicles} />
            ) : (
              <div
                className="text-center py-12"
                style={{ color: 'var(--color-gray-500)' }}
              >
                אין רכבים זמינים כרגע
              </div>
            )}
          </Container>
        </section>

        <HomeContactBlock />
      </main>

      <Footer />
    </div>
  );
}
