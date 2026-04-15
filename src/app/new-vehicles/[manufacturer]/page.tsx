/**
 * Manufacturer Page
 * עמוד יצרן ספציפי עם רשת דגמים
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllManufacturers, getManufacturerBySlug } from '@modules/new-vehicles/lib/repository';
import { ModelGrid } from '@modules/new-vehicles/components/ModelGrid';
import { dealershipConfig } from '@core/config/site.config';
import { Container } from '@shared/components/layout/Container';
import { CarOnlyShape } from '@shared/components/ui/CarOnlyShape';

export const revalidate = 60;
export const dynamicParams = true;

interface ManufacturerPageProps {
  params: Promise<{ manufacturer: string }>;
}

export async function generateStaticParams() {
  try {
    const manufacturers = await getAllManufacturers();
    return manufacturers.map((manufacturer) => ({
      manufacturer: manufacturer.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata(
  { params }: ManufacturerPageProps
): Promise<Metadata> {
  const { manufacturer } = await params;

  try {
    const manufacturerData = await getManufacturerBySlug(manufacturer);

    if (!manufacturerData) {
      return {
        title: 'יצרן לא נמצא | רכבים חדשים',
      };
    }

    return {
      title: `${manufacturerData.name} | רכבים חדשים | ${dealershipConfig.business.name}`,
      description:
        manufacturerData.description ||
        `כל דגמי ${manufacturerData.name} החדשים בישראל, כולל רמות גימור ומידע עדכני להשוואה.`,
      openGraph: {
        title: `${manufacturerData.name} - רכבים חדשים`,
        description:
          manufacturerData.description ||
          `כל דגמי ${manufacturerData.name} החדשים בישראל במקום אחד.`,
        images: manufacturerData.logo_url
          ? [
              {
                url: manufacturerData.logo_url,
                width: 200,
                height: 200,
                alt: manufacturerData.name,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `רכבים חדשים | ${dealershipConfig.business.name}`,
    };
  }
}

async function ManufacturerPage({ params }: ManufacturerPageProps) {
  const { manufacturer } = await params;

  let manufacturerData: Awaited<ReturnType<typeof getManufacturerBySlug>> = null;

  try {
    manufacturerData = await getManufacturerBySlug(manufacturer);
  } catch (error) {
    console.error(`Error loading manufacturer ${manufacturer}:`, error);
    notFound();
  }

  if (!manufacturerData) {
    notFound();
  }

  const modelBodyTypes = Array.from(
    new Set(
      manufacturerData.models
        .map((item) => item.body_type)
        .filter((value): value is string => Boolean(value))
    )
  ).slice(0, 4);

  const modelSegments = Array.from(
    new Set(
      manufacturerData.models
        .map((item) => item.segment)
        .filter((value): value is string => Boolean(value))
    )
  );

  const allPrices = manufacturerData.models.flatMap((item) =>
    [item.min_price, item.max_price].filter((value): value is number => value !== null)
  );

  const minCatalogPrice = allPrices.length > 0 ? Math.min(...allPrices) : null;
  const maxCatalogPrice = allPrices.length > 0 ? Math.max(...allPrices) : null;
  const averageTrimLevels =
    manufacturerData.models_count > 0
      ? (manufacturerData.total_trim_levels / manufacturerData.models_count).toFixed(1)
      : null;
  const heroHighlightTags =
    (modelSegments.length > 0 ? modelSegments : modelBodyTypes).slice(0, 3);

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <section className="route-hero">
        <div className="route-hero-atmo" />
        <div className="route-hero-grid" />

        <Container>
          <div className="route-hero-inner">
            <nav className="route-breadcrumb mb-8 justify-center">
              <Link href="/new-vehicles" className="route-breadcrumb-link">
                רכבים חדשים
              </Link>
              <span>/</span>
              <span>{manufacturerData.name}</span>
            </nav>

            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-col items-center gap-4">
                {manufacturerData.logo_url && (
                  <div className="route-surface-card p-4 shrink-0">
                    <Image
                      src={manufacturerData.logo_url}
                      alt={manufacturerData.name}
                      width={140}
                      height={140}
                      className="h-28 w-28 object-contain"
                    />
                  </div>
                )}

                <div>
                  <p className="route-hero-kicker mb-2">יצרן</p>
                  <h1 className="route-hero-title">{manufacturerData.name}</h1>
                </div>
              </div>

              <p className="route-hero-subtitle mx-auto mt-4 max-w-2xl">
                {manufacturerData.description ||
                  `כל דגמי ${manufacturerData.name} החדשים בישראל במקום אחד.`}
              </p>

              <CarOnlyShape
                className="w-44 sm:w-56 mx-auto mt-5 opacity-80"
                maxWidth={220}
                strokeColor="var(--color-glass-white-75)"
              />

              {heroHighlightTags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {heroHighlightTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        color: 'var(--color-text-inverse)',
                        background: 'var(--color-glass-white-12)',
                        border: '1px solid var(--color-glass-white-20)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
                <article className="route-stat-card text-center">
                  <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {manufacturerData.models_count}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>דגמים</p>
                </article>

                <article className="route-stat-card text-center">
                  <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {manufacturerData.total_trim_levels}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>רמות גימור</p>
                </article>

                <article className="route-stat-card text-center">
                  <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {minCatalogPrice !== null ? `₪${minCatalogPrice.toLocaleString('he-IL')}` : 'בקרוב'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>מחיר כניסה</p>
                </article>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14" style={{ background: 'var(--color-background)' }}>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                טווח מחירים משוער
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {minCatalogPrice !== null && maxCatalogPrice !== null
                  ? `₪${minCatalogPrice.toLocaleString('he-IL')} - ₪${maxCatalogPrice.toLocaleString('he-IL')}`
                  : 'בקרוב יתעדכן'}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                מבוסס על כלל הדגמים הפעילים של {manufacturerData.name}.
              </p>
            </article>

            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                עומק קטלוג
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {averageTrimLevels ? `${averageTrimLevels} רמות גימור לדגם` : 'נתון לא זמין'}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                סה״כ {manufacturerData.total_trim_levels} רמות גימור לכלל הדגמים.
              </p>
            </article>

            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                סגמנטים מובילים
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {modelSegments.length > 0 ? `${modelSegments.length} סגמנטים` : 'בקרוב יתעדכן'}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                {modelSegments.length > 0
                  ? modelSegments.slice(0, 3).join(' • ')
                  : 'המאגר מתעדכן באופן שוטף.'}
              </p>
            </article>
          </div>

          <div className="mb-10">
            <p className="home-section-kicker">דגמים זמינים בישראל</p>
            <h2 className="home-section-title">{manufacturerData.models_count} דגמים לבחירה</h2>
            <p className="home-section-subtitle" style={{ marginRight: 0, marginLeft: 0 }}>
              בחרו דגם כדי לצפות ברמות גימור, מפרטים ומידע שימושי.
            </p>
          </div>

          {manufacturerData.models && manufacturerData.models.length > 0 ? (
            <ModelGrid
              models={manufacturerData.models}
              manufacturerSlug={manufacturerData.slug}
            />
          ) : (
            <article className="route-surface-card p-10 text-center">
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-gray-900)' }}>
                אין כרגע דגמים פעילים עבור יצרן זה
              </h3>
              <p className="mt-3" style={{ color: 'var(--color-gray-500)' }}>
                מומלץ לבדוק שוב בהמשך, אנו מעדכנים את המאגר באופן שוטף.
              </p>
            </article>
          )}
        </Container>
      </section>

      {manufacturerData.country && (
        <section className="home-soft-section py-10">
          <Container>
            <article className="route-surface-card p-6 text-center">
              <p style={{ color: 'var(--color-silver-400)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-gray-900)' }}>ארץ המוצא:</span>{' '}
                {manufacturerData.country}
              </p>

              {manufacturerData.website_url && (
                <a
                  href={manufacturerData.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 font-semibold transition-opacity"
                  style={{ color: 'var(--color-primary)' }}
                >
                  מעבר לאתר היצרן הרשמי
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14h14" />
                  </svg>
                </a>
              )}
            </article>
          </Container>
        </section>
      )}
    </main>
  );
}

export default ManufacturerPage;
