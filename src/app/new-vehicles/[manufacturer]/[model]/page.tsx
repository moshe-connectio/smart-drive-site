/**
 * Model Page
 * עמוד דגם ספציפי עם בחירת רמת גימור וצפיית פרטים
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getModelBySlug, getTrimLevelWithSpecs } from '@modules/new-vehicles/lib/repository';
import { ModelPageClient } from '@modules/new-vehicles/components/ModelPageClient';

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

  // Pre-fetch specs for the first trim level if available
  let firstTrimSpecs = null;
  if (modelData.trim_levels.length > 0) {
    firstTrimSpecs = await getTrimLevelWithSpecs(modelData.trim_levels[0].id);
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header Section */}
      <div style={{ background: 'var(--color-primary-800)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/60">
            <Link href="/new-vehicles" className="hover:text-white hover:underline">
              רכבים חדשים
            </Link>
            <span>/</span>
            <Link
              href={`/new-vehicles/${modelData.manufacturer_slug}`}
              className="hover:text-white hover:underline"
            >
              {modelData.manufacturer_name}
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">{modelData.name}</span>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Image */}
            <div className="shrink-0 sm:order-2">
              {modelData.image_url && (
                <Image
                  src={modelData.image_url}
                  alt={modelData.name}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 sm:order-1">
              <div className="mb-4 flex items-center gap-3">
                {modelData.manufacturer_logo && (
                  <Image
                    src={modelData.manufacturer_logo}
                    alt={modelData.manufacturer_name}
                    width={60}
                    height={60}
                    className="h-12 w-12 object-contain"
                  />
                )}
                <div>
                  <p className="text-sm text-white/60">{modelData.manufacturer_name}</p>
                  <h1 className="text-3xl font-bold text-white md:text-4xl">
                    {modelData.name_he || modelData.name}
                  </h1>
                  {modelData.name_he && (
                    <p className="text-sm text-white/50 mt-1">{modelData.name}</p>
                  )}
                </div>
              </div>

              {modelData.body_type && (
                <p className="mb-4 text-lg text-white/70">{modelData.body_type}</p>
              )}

              {modelData.description && (
                <p className="text-white/70 leading-relaxed">{modelData.description}</p>
              )}

              {/* Stats */}
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-gold">{modelData.trim_levels.length}</p>
                  <p className="text-sm text-white/60">רמות גימור</p>
                </div>
                {modelData.min_price && (
                  <div>
                    <p className="text-3xl font-bold text-gold">
                      ₪{modelData.min_price.toLocaleString('he-IL')}
                    </p>
                    <p className="text-sm text-white/60">מחיר מתחיל</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {modelData.trim_levels.length > 0 ? (
          <ModelPageClient
            trimLevels={modelData.trim_levels}
            initialTrimSpecs={firstTrimSpecs}
          />
        ) : (
          <div className="rounded-lg p-8 text-center" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
            <p className="text-lg font-medium" style={{ color: 'var(--color-gray-500)' }}>
              רמות גימור יתווספו בקרוב
            </p>
            <Link
              href={`/new-vehicles/${modelData.manufacturer_slug}`}
              className="mt-4 inline-block text-primary hover:underline"
            >
              חזרה ל{modelData.manufacturer_name}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
