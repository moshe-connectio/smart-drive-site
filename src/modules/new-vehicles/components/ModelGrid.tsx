/**
 * ModelGrid Component
 * רשת דגמים עם תמונה ושם דגם
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ModelWithManufacturer } from '../types';

interface ModelGridProps {
  models: ModelWithManufacturer[];
  manufacturerSlug: string;
  isLoading?: boolean;
}

export function ModelGrid({ models, manufacturerSlug, isLoading }: ModelGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-lg" style={{ border: '1px solid var(--color-border)' }}
          >
            <div className="aspect-video" style={{ background: 'var(--color-gray-200)' }} />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 rounded" style={{ background: 'var(--color-gray-200)' }} />
              <div className="h-3 w-1/2 rounded" style={{ background: 'var(--color-gray-100)' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
        <p className="text-center" style={{ color: 'var(--color-silver-500)' }}>אין דגמים זמינים</p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <Link
          key={model.id}
          href={`/new-vehicles/${manufacturerSlug}/${model.slug}`}
          className="group card-automotive accent-top-hover overflow-hidden rounded-2xl transition-all"
          style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
        >
          {/* תמונה דגם */}
          <div className="relative aspect-video overflow-hidden" style={{ background: 'var(--color-gray-200)' }}>
            {model.image_url ? (
              <Image
                src={model.image_url}
                alt={model.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full" style={{ background: 'var(--color-gray-200)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--color-silver-500)' }}>
                  אין תמונה
                </span>
              </div>
            )}

            <div
              className="absolute inset-x-0 bottom-0 p-4"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, var(--color-overlay-black-70) 100%)',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-inverse)' }}>
                {model.manufacturer_name}
              </p>
            </div>
          </div>

          {/* מידע דגם */}
          <div className="p-5">
            {/* שם דגם */}
            <h3 className="text-lg font-semibold text-gray-900">
              {model.name_he || model.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {model.body_type && (
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: 'var(--color-primary-50)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary-100)',
                  }}
                >
                  {model.body_type}
                </span>
              )}
              {model.segment && (
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: 'var(--color-gray-100)',
                    color: 'var(--color-gray-700)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {model.segment}
                </span>
              )}
            </div>

            {/* טווח מחיר */}
            <div className="mt-4 flex items-baseline gap-2 text-sm">
              <span className="text-xs" style={{ color: 'var(--color-silver-500)' }}>מחיר:</span>
              <span className="font-semibold text-gray-900">
                {model.min_price && model.max_price ? (
                  <>
                    ₪{model.min_price.toLocaleString('he-IL')} -
                    <br />
                    ₪{model.max_price.toLocaleString('he-IL')}
                  </>
                ) : model.min_price ? (
                  `₪${model.min_price.toLocaleString('he-IL')}`
                ) : (
                  'לא מוגדר'
                )}
              </span>
            </div>

            {/* ספירת רמות גימור */}
            <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span className="text-xs" style={{ color: 'var(--color-silver-500)' }}>
                {model.trim_levels_count} רמות גימור
              </span>
              <span
                className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: 'var(--color-primary-50)',
                  color: 'var(--color-primary)',
                }}
              >
                בחר
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ModelGrid;
