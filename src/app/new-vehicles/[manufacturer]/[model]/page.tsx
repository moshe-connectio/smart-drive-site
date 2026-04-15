/**
 * Model Page
 * עמוד דגם ספציפי עם בחירת רמת גימור וצפיית פרטים
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getModelBySlug, getTrimLevelWithSpecs } from '@modules/new-vehicles/lib/repository';
import { ModelPageClient } from '@modules/new-vehicles/components/ModelPageClient';
import { Container } from '@shared/components/layout/Container';
import { CarOnlyShape } from '@shared/components/ui/CarOnlyShape';

export const revalidate = 60;
export const dynamicParams = true;

interface ModelPageProps {
  params: Promise<{
    manufacturer: string;
    model: string;
  }>;
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { manufacturer, model } = await params;
  const modelData = await getModelBySlug(manufacturer, model);

  if (!modelData) {
    notFound();
  }

  let firstTrimSpecs = null;
  if (modelData.trim_levels.length > 0) {
    firstTrimSpecs = await getTrimLevelWithSpecs(modelData.trim_levels[0].id);
  }

  const priceRangeLabel =
    modelData.min_price && modelData.max_price
      ? `₪${modelData.min_price.toLocaleString('he-IL')} - ₪${modelData.max_price.toLocaleString('he-IL')}`
      : modelData.min_price
      ? `החל מ-₪${modelData.min_price.toLocaleString('he-IL')}`
      : 'בקרוב יתעדכן';

  const modelYearLabel =
    modelData.year_from && modelData.year_to
      ? `${modelData.year_from} - ${modelData.year_to}`
      : modelData.year_from
      ? `משנת ${modelData.year_from}`
      : 'לא צוין';

  const featureChips = [modelData.body_type, modelData.segment, `שנות ייצור: ${modelYearLabel}`]
    .filter((value): value is string => Boolean(value));

  const firstTrim = modelData.trim_levels[0];
  const drivetrainLabel =
    [firstTrim?.engine_type, firstTrim?.transmission]
      .filter((value): value is string => Boolean(value))
      .join(' • ') || 'משתנה לפי רמת הגימור';

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <section className="route-hero">
        <div className="route-hero-atmo" />
        <div className="route-hero-grid" />

        <Container>
          <div className="route-hero-inner">
            <nav className="route-breadcrumb mb-8 justify-center sm:justify-start">
              <Link href="/new-vehicles" className="route-breadcrumb-link">
                רכבים חדשים
              </Link>
              <span>/</span>
              <Link
                href={`/new-vehicles/${modelData.manufacturer_slug}`}
                className="route-breadcrumb-link"
              >
                {modelData.manufacturer_name}
              </Link>
              <span>/</span>
              <span>{modelData.name_he || modelData.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="text-center lg:text-right">
                <p className="route-hero-kicker">{modelData.manufacturer_name}</p>
                <h1 className="route-hero-title">{modelData.name_he || modelData.name}</h1>
                {modelData.name_he && (
                  <p className="mt-2" style={{ color: 'var(--color-header-transparent-text-dim)' }}>
                    {modelData.name}
                  </p>
                )}

                <p className="route-hero-subtitle">
                  {modelData.description || modelData.body_type || 'מפרט מלא ורמות גימור מעודכנות לדגם זה.'}
                </p>

                <CarOnlyShape
                  className="w-44 sm:w-56 mx-auto lg:mx-0 mt-5 opacity-80"
                  maxWidth={220}
                  strokeColor="var(--color-glass-white-75)"
                />

                <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
                  {featureChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        color: 'var(--color-text-inverse)',
                        background: 'var(--color-glass-white-12)',
                        border: '1px solid var(--color-glass-white-20)',
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-xl mx-auto lg:mx-0">
                  <article className="route-stat-card text-center">
                    <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {modelData.trim_levels.length}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>רמות גימור זמינות</p>
                  </article>

                  {modelData.min_price && (
                    <article className="route-stat-card text-center">
                      <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                        ₪{modelData.min_price.toLocaleString('he-IL')}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-gray-500)' }}>מחיר התחלתי</p>
                    </article>
                  )}
                </div>
              </div>

              <div className="route-surface-card p-3">
                {modelData.image_url ? (
                  <Image
                    src={modelData.image_url}
                    alt={modelData.name}
                    width={700}
                    height={460}
                    className="rounded-xl object-cover w-full"
                  />
                ) : (
                  <div
                    className="aspect-7/4 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--color-gray-100)' }}
                  >
                    <span style={{ color: 'var(--color-silver-500)' }}>אין תמונה זמינה</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-soft-section py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                טווח מחירים
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {priceRangeLabel}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                המחירים משתנים בהתאם לרמת הגימור, חבילות ותוספות.
              </p>
            </article>

            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                יחידת הנעה
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {drivetrainLabel}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                דגש על שילוב ביצועים, נוחות ועלות שימוש לאורך זמן.
              </p>
            </article>

            <article className="route-surface-card p-5">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-silver-500)' }}>
                שנות ייצור
              </p>
              <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
                {modelYearLabel}
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-gray-500)' }}>
                מתאים להשוואה מול דורות קודמים ותצורות נוספות בשוק.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-14" style={{ background: 'var(--color-background)' }}>
        <Container>
          {modelData.trim_levels.length > 0 ? (
            <ModelPageClient
              trimLevels={modelData.trim_levels}
              initialTrimSpecs={firstTrimSpecs}
            />
          ) : (
            <article className="route-surface-card p-8 text-center">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-gray-900)' }}>
                רמות הגימור לדגם זה יתעדכנו בקרוב
              </h2>
              <p className="mt-3" style={{ color: 'var(--color-gray-500)' }}>
                ניתן לחזור לרשימת הדגמים של היצרן ולבחון אפשרויות נוספות.
              </p>
              <Link
                href={`/new-vehicles/${modelData.manufacturer_slug}`}
                className="mt-6 inline-flex items-center justify-center gap-2 home-primary-cta"
              >
                חזרה לדגמי {modelData.manufacturer_name}
              </Link>
            </article>
          )}
        </Container>
      </section>
    </main>
  );
}
