/**
 * New Vehicles - Main Page
 * עמוד ראשי עם רשת יצרנים
 */

import { Metadata } from 'next';
import { getAllManufacturers } from '@modules/new-vehicles/lib/repository';
import { ManufacturerGrid } from '@modules/new-vehicles/components/ManufacturerGrid';
import { dealershipConfig } from '@core/config/site.config';
import { Container } from '@shared/components/layout/Container';

export const revalidate = 60;

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `רכבים חדשים | ${dealershipConfig.business.name}`,
  description: 'מאגר רכבים חדשים בישראל לפי יצרן, דגם ורמת גימור, עם מידע ברור ועדכני לקבלת החלטה חכמה.',
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
  let hasLoadError = false;

  try {
    manufacturers = await getAllManufacturers();
  } catch (error) {
    console.error('Error loading manufacturers:', error);
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <section className="route-hero">
        <div className="route-hero-atmo" />
        <div className="route-hero-grid" />
        <Container>
          <div className="route-hero-inner text-center">
            <p className="route-hero-kicker">רכבים חדשים</p>
            <h1 className="route-hero-title">כל היצרנים והדגמים במקום אחד</h1>
            <p className="route-hero-subtitle mx-auto">
              בחרו יצרן כדי לצפות בדגמים, ברמות גימור ובמפרטים טכניים מעודכנים.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14" style={{ background: 'var(--color-background)' }}>
        <Container>
          <div className="mb-10">
            <p className="home-section-kicker">יצרנים זמינים</p>
            <h2 className="home-section-title">{manufacturers.length} יצרנים במאגר</h2>
            <p className="home-section-subtitle" style={{ marginRight: 0, marginLeft: 0 }}>
              בחרו יצרן כדי לצפות בדגמים, רמות גימור ומפרטים מלאים.
            </p>
          </div>

          <ManufacturerGrid manufacturers={manufacturers} />
        </Container>
      </section>

      <section className="home-soft-section py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="route-stat-card text-center">
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{manufacturers.length}</p>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: 'var(--color-gray-900)' }}>יצרנים מובילים</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-silver-400)' }}>
                גישה למותגים המובילים בשוק המקומי והבינלאומי.
              </p>
            </article>

            <article className="route-stat-card text-center">
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>+</p>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: 'var(--color-gray-900)' }}>דגמים מעודכנים</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-silver-400)' }}>
                מידע עדכני על דגמים ורמות גימור לפי השוק הישראלי.
              </p>
            </article>

            <article className="route-stat-card text-center">
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>✓</p>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: 'var(--color-gray-900)' }}>בחירה חכמה</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-silver-400)' }}>
                השוואה נוחה בין דגמים, מחירים ומפרטים.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default NewVehiclesPage;
