/**
 * ModelGrid Component
 * Manufacturer page — model cards with consistent internal alignment
 * across the whole grid (equal heights, reserved badge area, pinned footer).
 *
 * Visual rules live in `src/app/styles/new-vehicles.css` (.nv-model-card-*).
 */

'use client';

import Link from 'next/link';
import type { ModelWithManufacturer } from '../types';

interface ModelGridProps {
  models: ModelWithManufacturer[];
  manufacturerSlug: string;
  isLoading?: boolean;
}

function formatPrice(value: number): string {
  return `₪${value.toLocaleString('he-IL')}`;
}

function getPriceLine(model: ModelWithManufacturer): {
  label: string;
  value: string;
  muted?: boolean;
} {
  const { min_price, max_price } = model;
  if (min_price !== null && max_price !== null && min_price !== max_price) {
    return {
      label: 'טווח מחירים',
      value: `${formatPrice(min_price)} – ${formatPrice(max_price)}`,
    };
  }
  if (min_price !== null) {
    return { label: 'מחיר התחלתי', value: formatPrice(min_price) };
  }
  if (max_price !== null) {
    return { label: 'מחיר', value: formatPrice(max_price) };
  }
  return { label: 'מחיר', value: 'יתעדכן בקרוב', muted: true };
}

export function ModelGrid({ models, manufacturerSlug, isLoading }: ModelGridProps) {
  if (isLoading) {
    return (
      <div className="nv-model-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="nv-model-card-skeleton animate-pulse">
            <div className="nv-model-card-skeleton-media" />
            <div className="nv-model-card-skeleton-body">
              <div className="nv-model-card-skeleton-bar nv-model-card-skeleton-bar--wide" />
              <div className="nv-model-card-skeleton-bar nv-model-card-skeleton-bar--narrow" />
              <div className="nv-model-card-skeleton-bar" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div
        className="flex min-h-72 items-center justify-center rounded-2xl border-2 border-dashed"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
      >
        <p className="text-center" style={{ color: 'var(--color-silver-500)' }}>
          אין דגמים זמינים
        </p>
      </div>
    );
  }

  return (
    <div className="nv-model-grid">
      {models.map((model) => {
        const price = getPriceLine(model);
        const displayName = model.name_he || model.name;

        return (
          <Link
            key={model.id}
            href={`/new-vehicles/${manufacturerSlug}/${model.slug}`}
            className="nv-model-card"
            aria-label={`${displayName} — צפייה ברמות גימור ומפרטים`}
          >
            <div className="nv-model-card-media">
              {model.image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={model.image_url}
                  alt={displayName}
                  className="nv-model-card-img"
                  loading="lazy"
                />
              ) : (
                <span className="nv-model-card-img-placeholder">אין תמונה</span>
              )}

              {model.manufacturer_name && (
                <span className="nv-model-card-mfr">{model.manufacturer_name}</span>
              )}
            </div>

            <div className="nv-model-card-body">
              <h3 className="nv-model-card-title">{displayName}</h3>

              <div className="nv-model-card-tags" aria-hidden={!model.body_type && !model.segment}>
                {model.body_type && (
                  <span className="nv-model-card-tag nv-model-card-tag-primary">
                    {model.body_type}
                  </span>
                )}
                {model.segment && (
                  <span className="nv-model-card-tag nv-model-card-tag-neutral">
                    {model.segment}
                  </span>
                )}
              </div>

              <div className="nv-model-card-price">
                <span className="nv-model-card-price-label">{price.label}</span>
                <span
                  className={
                    price.muted
                      ? 'nv-model-card-price-value nv-model-card-price-value--muted'
                      : 'nv-model-card-price-value'
                  }
                >
                  {price.value}
                </span>
              </div>

              <div className="nv-model-card-footer">
                <span className="nv-model-card-meta">
                  {model.trim_levels_count} רמות גימור
                </span>
                <span className="nv-model-card-cta" aria-hidden="true">
                  בחירה
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l6-6m-6 6l6 6" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ModelGrid;
