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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <Link
          key={model.id}
          href={`/new-vehicles/${manufacturerSlug}/${model.slug}`}
          className="group overflow-hidden rounded-lg transition-all hover:shadow-lg"
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
          </div>

          {/* מידע דגם */}
          <div className="p-4">
            {/* שם דגם */}
            <h3 className="text-lg font-semibold text-gray-900">
              {model.name_he || model.name}
            </h3>

            {/* סוג גוף */}
            {model.body_type && (
              <p className="mt-1 text-sm" style={{ color: 'var(--color-silver-400)' }}>
                {model.body_type}
              </p>
            )}

            {/* טווח מחיר */}
            <div className="mt-3 flex items-baseline gap-2 text-sm">
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
            <div className="mt-3 flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span className="text-xs" style={{ color: 'var(--color-silver-500)' }}>
                {model.trim_levels_count} רמות גימור
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
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
