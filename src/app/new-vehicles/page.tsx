/**
 * New Vehicles - Main Page
 * עמוד ראשי עם רשת יצרנים
 */

import { Metadata } from 'next';
import { getAllManufacturers } from '@modules/new-vehicles/lib/repository';

// ISR - revalidate every 60 seconds so new manufacturers appear
export const revalidate = 60;
import { ManufacturerGrid } from '@modules/new-vehicles/components/ManufacturerGrid';

import { dealershipConfig } from '@core/config/site.config';

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `רכבים חדשים | ${dealershipConfig.business.name}`,
  description: `מאגר רכבים חדשים בישראל לפי יצרן, דגם ורמת גימור, עם מידע ברור ועדכני לקבלת החלטה חכמה.`,
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
  try {
    const manufacturers = await getAllManufacturers();

    return (
      <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
        {/* Header Section */}
        <div className="py-12" style={{ background: 'var(--color-primary-800)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                רכבים חדשים
              </h1>
              <p className="mt-4 text-lg text-white/70">
                כל היצרנים והדגמים החדשים בישראל במקום אחד
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {manufacturers.length} יצרנים זמינים במאגר
            </h2>
            <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
              בחרו יצרן כדי לצפות בדגמים, רמות גימור ומפרטים מלאים
            </p>
          </div>

          {/* Manufacturers Grid */}
          <ManufacturerGrid manufacturers={manufacturers} />
        </div>

        {/* Info Section */}
        <div className="py-12" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-secondary-bg)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(26, 101, 224, 0.15)' }}>
                  <span className="text-xl font-bold text-primary">
                    {manufacturers.length}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  יצרנים מובילים
                </h3>
                <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
                  גישה למותגים המובילים בשוק המקומי והבינלאומי
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(26, 101, 224, 0.15)' }}>
                  <span className="text-xl font-bold text-primary">+</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  דגמים מעודכנים
                </h3>
                <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
                  מידע מתעדכן על דגמים ורמות גימור לפי השוק הישראלי
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'rgba(26, 101, 224, 0.15)' }}>
                  <span className="text-xl font-bold text-primary">✓</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  בחירה חכמה
                </h3>
                <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
                  השוואה נוחה בין דגמים, מחירים ומפרטים
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading manufacturers:', error);
    
    return (
      <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">שגיאה בטעינת היצרנים</h1>
          <p className="mt-4" style={{ color: 'var(--color-silver-400)' }}>
            אנא נסו שוב מאוחר יותר.
          </p>
        </div>
      </main>
    );
  }
}

export default NewVehiclesPage;
