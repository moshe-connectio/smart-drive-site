/**
 * New Vehicles - Main Page
 * עמוד ראשי: hero מוקפד, סרגל חיפוש חכם, ורשת יצרנים.
 */

import { Metadata } from 'next';
import {
  getAllManufacturers,
  getAllTrimLevelsFullInfo,
} from '@modules/new-vehicles/lib/repository';
import { ManufacturerGrid } from '@modules/new-vehicles/components/ManufacturerGrid';
import { HomeVehicleSearch } from '@modules/new-vehicles/components/HomeVehicleSearch';
import { CountUp } from '@shared/components/ui/CountUp';
import { dealershipConfig } from '@core/config/site.config';
import { Container } from '@shared/components/layout/Container';
import { logger } from '@core/lib/logger';

export const revalidate = 60;

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `רכבים חדשים | ${dealershipConfig.business.name}`,
  description:
    'מאגר רכבים חדשים בישראל לפי יצרן, דגם ורמת גימור, עם מידע ברור ועדכני לקבלת החלטה חכמה.',
  keywords: `רכבים חדשים, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/new-vehicles`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/new-vehicles`,
    title: `רכבים חדשים | ${dealershipConfig.business.name}`,
    description: 'מאגר רכבים חדשים בישראל לפי יצרנים, דגמים ורמות גימור.',
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `רכבים חדשים - ${dealershipConfig.business.name}`,
      },
    ],
  },
};

async function NewVehiclesPage() {
  let manufacturers: Awaited<ReturnType<typeof getAllManufacturers>> = [];
  let trims: Awaited<ReturnType<typeof getAllTrimLevelsFullInfo>> = [];
  let hasLoadError = false;

  try {
    [manufacturers, trims] = await Promise.all([
      getAllManufacturers(),
      getAllTrimLevelsFullInfo().catch((err) => {
        logger.error('Failed to load trims for new-vehicles search:', err);
        return [];
      }),
    ]);
  } catch (error) {
    logger.error('Error loading manufacturers:', error);
    hasLoadError = true;
  }

  if (hasLoadError) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">רכבים חדשים</p>
              <h1 className="route-hero-title">שגיאה בטעינת היצרנים</h1>
              <p className="route-hero-subtitle mx-auto">אנא נסו שוב בעוד מספר דקות.</p>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  const totalModels = manufacturers.reduce((sum, m) => sum + (m.models_count || 0), 0);
  const totalTrims = manufacturers.reduce(
    (sum, m) => sum + (m.total_trim_levels || 0),
    0,
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="route-hero nv-hero">
        <div className="route-hero-atmo" />
        <div className="route-hero-grid" />

        <Container>
          <div className="route-hero-inner text-center">
            <p className="route-hero-kicker">רכבים חדשים</p>
            <h1 className="route-hero-title">
              כל היצרנים והדגמים <span className="nv-hero-accent">במקום אחד</span>
            </h1>
            <p className="route-hero-subtitle mx-auto">
              בחרו יצרן כדי לצפות בדגמים, ברמות גימור ובמפרטים טכניים מעודכנים — או חפשו ישירות
              לפי יצרן, דגם והחזר חודשי שמתאים לכם.
            </p>

            <ul className="nv-hero-stats" aria-label="סטטיסטיקות מאגר">
              <li className="nv-hero-stat">
                <span className="nv-hero-stat-value">
                  <CountUp value={manufacturers.length} />
                </span>
                <span className="nv-hero-stat-label">יצרנים</span>
              </li>
              <li className="nv-hero-stat">
                <span className="nv-hero-stat-value">
                  <CountUp value={totalModels} />
                </span>
                <span className="nv-hero-stat-label">דגמים</span>
              </li>
              <li className="nv-hero-stat">
                <span className="nv-hero-stat-value">
                  <CountUp value={totalTrims} />
                </span>
                <span className="nv-hero-stat-label">רמות גימור</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ─── SEARCH ────────────────────────────────────────────── */}
      {trims.length > 0 && (
        <section className="nv-search-section">
          <Container className="py-14 sm:py-16">
            <div className="mb-8 text-center">
              <p className="home-section-kicker">חיפוש חכם</p>
              <h2 className="home-section-title">מצאו את הרכב המתאים לכם</h2>
              <p className="home-section-subtitle">
                חיפוש לפי יצרן, דגם ורמת גימור — עם סינון לפי החזר חודשי מבוקש.
              </p>
            </div>
            <HomeVehicleSearch trims={trims} manufacturers={manufacturers} />
          </Container>
        </section>
      )}

      {/* ─── MANUFACTURERS GRID ───────────────────────────────── */}
      <section className="home-mfr-section py-14 sm:py-16">
        <Container>
          <ManufacturerGrid manufacturers={manufacturers} />
        </Container>
      </section>
    </div>
  );
}

export default NewVehiclesPage;
