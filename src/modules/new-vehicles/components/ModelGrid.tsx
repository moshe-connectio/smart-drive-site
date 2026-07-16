/**
 * ModelGrid Component
 * ----------------------------------------------------------------------------
 * Renders model cards on the manufacturer page using the same visual language
 * as the home-page featured-vehicles grid. We deliberately reuse the
 * `.home-featured-grid` + `.card-automotive` selectors so the polished hover,
 * spacing, colored spec icons and CTA pill come "for free" — keeping both
 * grids visually identical and any future tweak applied in one place.
 *
 * Adaptations for new-vehicle data:
 *   • km / gear / fuel  →  body_type / segment / trim_levels_count
 *   • single price      →  price range or starting price
 *   • "פרטים" CTA       →  "בחירה" (model picker)
 */

'use client';

import Link from 'next/link';
import type { ModelWithManufacturer } from '../types';
import { formatCategories, parseCategories } from '../lib/categories';
import { formatPrice } from '@shared/utils/formatting';
import { Reveal } from '@shared/components/motion/Reveal';

interface ModelGridProps {
  models: ModelWithManufacturer[];
  manufacturerSlug: string;
  isLoading?: boolean;
}

function getPriceLine(model: ModelWithManufacturer): {
  label: string;
  value: string;
  muted?: boolean;
} {
  // Show "החזר חודשי החל מ-" with the lowest available monthly_payment across trims.
  const { min_monthly_payment } = model;
  if (min_monthly_payment != null && min_monthly_payment > 0) {
    return {
      label: 'החזר חודשי החל מ־',
      value: `${formatPrice(min_monthly_payment)} / חודש`,
    };
  }
  return { label: 'החזר חודשי', value: 'יתעדכן בקרוב', muted: true };
}

export function ModelGrid({ models, manufacturerSlug, isLoading }: ModelGridProps) {
  if (isLoading) {
    return (
      <div className="home-featured-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="card-automotive flex flex-col h-full rounded-2xl overflow-hidden animate-pulse"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <div className="min-h-44 sm:min-h-56" style={{ background: 'var(--color-background-secondary)' }} />
            <div className="p-5 flex flex-col gap-3">
              <div className="h-5 w-3/4 rounded" style={{ background: 'var(--color-gray-200)' }} />
              <div className="h-3 w-1/2 rounded" style={{ background: 'var(--color-gray-100)' }} />
              <div className="h-3 w-2/3 rounded mt-3" style={{ background: 'var(--color-gray-100)' }} />
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
    <Reveal as="div" className="home-featured-grid" stagger={0.07} y={30}>
      {models.map((model) => {
        const price = getPriceLine(model);
        const displayName = model.name_he || model.name;

        return (
          <Link
            key={model.id}
            href={`/new-vehicles/${manufacturerSlug}/${model.slug}`}
            className="group card-automotive flex flex-col h-full rounded-2xl overflow-hidden relative"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
            }}
            aria-label={`${displayName} — צפייה ברמות גימור ומפרטים`}
          >
            {/* Image area */}
            <div
              className="p-3 flex items-center justify-center overflow-hidden min-h-44 sm:min-h-56 relative"
              style={{ background: 'var(--color-background-secondary)' }}
            >
              {model.image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={model.image_url}
                  alt={displayName}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-sm font-medium" style={{ color: 'var(--color-silver-500)' }}>
                  אין תמונה
                </span>
              )}

              {model.manufacturer_name && (
                <span
                  className="absolute bottom-2 inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] font-semibold"
                  style={{
                    insetInlineStart: '0.625rem',
                    background: 'rgba(15, 23, 42, 0.78)',
                    color: 'var(--color-text-inverse)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}
                >
                  {model.manufacturer_name}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title */}
              <h3
                className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                style={{ color: 'var(--color-gray-900)' }}
              >
                {displayName}
              </h3>

              {/* Eyebrow row — production years (manufacturer already shown as a badge on the image) */}
              {model.year_from && (
                <p className="text-sm mb-3" style={{ color: 'var(--color-gray-500)' }}>
                  {model.year_to && model.year_to !== model.year_from
                    ? `${model.year_from}–${model.year_to}`
                    : `${model.year_from}+`}
                </p>
              )}

              {/* Specs grid — colored icons matching the home grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                {model.body_type && parseCategories(model.body_type).length > 0 && (
                  <div className="vc-spec vc-spec-body flex items-center gap-2" style={{ color: 'var(--color-gray-500)' }}>
                    <svg className="w-4 h-4 vc-spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-5a2 2 0 012-1h10a2 2 0 012 1l2 5M5 13h14M5 13v4a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-4M7 16h.01M17 16h.01" />
                    </svg>
                    <span>{formatCategories(model.body_type, ' / ')}</span>
                  </div>
                )}

                {model.segment && (
                  <div className="vc-spec vc-spec-segment flex items-center gap-2" style={{ color: 'var(--color-gray-500)' }}>
                    <svg className="w-4 h-4 vc-spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>{model.segment}</span>
                  </div>
                )}

                {model.trim_levels_count > 0 && (
                  <div className="vc-spec vc-spec-trims flex items-center gap-2" style={{ color: 'var(--color-gray-500)' }}>
                    <svg className="w-4 h-4 vc-spec-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4" />
                    </svg>
                    <span>{model.trim_levels_count} רמות גימור</span>
                  </div>
                )}
              </div>

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* Price + CTA */}
              <div className="pt-4 relative" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col leading-tight">
                    <span className="text-[0.7rem] uppercase tracking-[0.12em] font-semibold" style={{ color: 'var(--color-silver-500)' }}>
                      {price.label}
                    </span>
                    <span
                      className="font-bold"
                      style={{
                        color: price.muted ? 'var(--color-silver-500)' : 'var(--color-gold-500, var(--color-gold, #d4a017))',
                        fontSize: '1.05rem',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {price.value}
                    </span>
                  </div>
                  <span
                    className="group-hover:-translate-x-1 transition-transform inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    בחירה
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </Reveal>
  );
}

export default ModelGrid;
