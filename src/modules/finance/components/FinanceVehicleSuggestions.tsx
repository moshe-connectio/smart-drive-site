'use client';

/**
 * FinanceVehicleSuggestions
 *
 * Shows vehicles whose listing price is close to the price configured in the
 * finance calculator. Unifies two sources of inventory:
 *   1. Used / immediate inventory (`vehicles` table) → links to /vehicles/[slug]
 *   2. New-vehicle trim levels (`new_vehicles_*`)   → links to
 *      /new-vehicles/[manufacturer]/[model]
 *
 * Renders both with the same compact card used by the new-vehicles search bar
 * (`home-search-result*` classes), so the UX stays consistent across the site.
 */

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { formatPrice, generateVehicleSlug } from '@shared/utils/formatting';
import type { Vehicle } from '@modules/vehicles/lib/repository';
import type { TrimLevelFullInfo } from '@modules/new-vehicles/types';
import { toMonthly } from '@modules/new-vehicles/lib/searchUtils';

interface FinanceVehicleSuggestionsProps {
  /** Used / immediate-inventory vehicles. */
  usedVehicles: Vehicle[];
  /** Trim levels for new vehicles. */
  newTrimLevels: TrimLevelFullInfo[];
  /** Target price coming from the calculator (₪). 0 = not ready. */
  targetPrice: number;
  /** Cards visible on first paint. */
  initialCount?: number;
  /** Extra cards to reveal on each "load more" click. */
  step?: number;
}

type Kind = 'all' | 'used' | 'new';

interface SuggestionItem {
  id: string;
  kind: 'used' | 'new';
  href: string;
  imageUrl: string | null;
  topLabel: string;
  title: string;
  subtitle: string | null;
  price: number;
  monthly: number | null;
  badge: string;
}

const TOLERANCE_PRESETS = [10, 15, 25, 40] as const;
const DEFAULT_TOLERANCE = 15;
const MIN_TARGET_PRICE = 10_000;

function buildUsedItem(vehicle: Vehicle): SuggestionItem | null {
  if (!vehicle.price || vehicle.price <= 0) return null;
  const slug = generateVehicleSlug(vehicle.title, vehicle.year, vehicle.id);

  // Prefer the first gallery image (Supabase-storage mirrors), which is what
  // VehicleCard / VehicleImageGallery use. `main_image_url` may still hold the
  // raw CRM/Zoho URL, which can be blocked by ORB on the client.
  const firstGalleryImage =
    vehicle.images && vehicle.images.length > 0
      ? [...vehicle.images].sort((a, b) => a.position - b.position)[0].image_url
      : null;
  const mainImage =
    typeof vehicle.main_image_url === 'string' &&
    vehicle.main_image_url.trim().length > 0
      ? vehicle.main_image_url
      : null;
  const imageUrl = firstGalleryImage ?? mainImage;

  return {
    id: `used-${vehicle.id}`,
    kind: 'used',
    href: `/vehicles/${slug}`,
    imageUrl,
    topLabel: `${vehicle.brand}${vehicle.year ? ` · ${vehicle.year}` : ''}`,
    title: vehicle.title,
    subtitle: vehicle.trim ?? vehicle.model ?? null,
    price: vehicle.price,
    monthly:
      typeof vehicle.monthly_payment === 'number' && vehicle.monthly_payment > 0
        ? Math.round(vehicle.monthly_payment)
        : null,
    badge: vehicle.condition === 'משומש' ? 'מלאי מיידי' : vehicle.condition,
  };
}

function buildNewItem(trim: TrimLevelFullInfo): SuggestionItem | null {
  if (!trim.price || trim.price <= 0) return null;
  const monthly = toMonthly(trim.monthly_payment);
  return {
    id: `new-${trim.id}`,
    kind: 'new',
    href: `/new-vehicles/${trim.manufacturer_slug}/${trim.model_slug}`,
    imageUrl: trim.model_image,
    topLabel: trim.manufacturer_name,
    title: trim.model_name_he || trim.model_name,
    subtitle: trim.name,
    price: trim.price,
    monthly: monthly != null ? Math.round(monthly) : null,
    badge: 'רכב חדש',
  };
}

export function FinanceVehicleSuggestions({
  usedVehicles,
  newTrimLevels,
  targetPrice,
  initialCount = 8,
  step = 8,
}: FinanceVehicleSuggestionsProps) {
  const [tolerancePct, setTolerancePct] = useState<number>(DEFAULT_TOLERANCE);
  const [kind, setKind] = useState<Kind>('all');
  const [visible, setVisible] = useState<number>(initialCount);

  const allItems = useMemo<SuggestionItem[]>(() => {
    const used = usedVehicles
      .map(buildUsedItem)
      .filter((x): x is SuggestionItem => x !== null);
    const fresh = newTrimLevels
      .map(buildNewItem)
      .filter((x): x is SuggestionItem => x !== null);
    return [...used, ...fresh];
  }, [usedVehicles, newTrimLevels]);

  const isTargetReady = targetPrice >= MIN_TARGET_PRICE;

  const { matches, min, max, totals } = useMemo(() => {
    if (!isTargetReady) {
      return {
        matches: [] as SuggestionItem[],
        min: 0,
        max: 0,
        totals: { all: 0, used: 0, new: 0 },
      };
    }
    const lo = Math.round(targetPrice * (1 - tolerancePct / 100));
    const hi = Math.round(targetPrice * (1 + tolerancePct / 100));
    const inRange = allItems.filter((it) => it.price >= lo && it.price <= hi);

    const used = inRange.filter((i) => i.kind === 'used').length;
    const fresh = inRange.filter((i) => i.kind === 'new').length;

    const filtered = (
      kind === 'all' ? inRange : inRange.filter((i) => i.kind === kind)
    ).sort(
      (a, b) =>
        Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice),
    );

    return {
      matches: filtered,
      min: lo,
      max: hi,
      totals: { all: inRange.length, used, new: fresh },
    };
  }, [allItems, targetPrice, tolerancePct, isTargetReady, kind]);

  const shown = matches.slice(0, visible);
  const remaining = Math.max(0, matches.length - visible);

  return (
    <section className="fc-suggestions" aria-labelledby="fc-suggestions-title">
      <header className="fc-suggestions-header">
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-primary-500)' }}
          >
            רכבים שמתאימים לתקציב שלכם
          </p>
          <h2
            id="fc-suggestions-title"
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {isTargetReady ? (
              <>
                הצעות סביב{' '}
                <span style={{ color: 'var(--color-primary-500)' }}>
                  {formatPrice(targetPrice)}
                </span>
              </>
            ) : (
              'הזינו מחיר רכב במחשבון כדי לקבל הצעות מתאימות'
            )}
          </h2>
          {isTargetReady && (
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              טווח מחירים: {formatPrice(min)} – {formatPrice(max)}
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                {' · '}
                {totals.all} {totals.all === 1 ? 'רכב מתאים' : 'רכבים מתאימים'}
              </span>
            </p>
          )}
        </div>

        {isTargetReady && (
          <div
            className="fc-suggestions-tolerance"
            role="group"
            aria-label="גמישות החיפוש"
          >
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              גמישות
            </span>
            {TOLERANCE_PRESETS.map((pct) => {
              const active = tolerancePct === pct;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => {
                    setTolerancePct(pct);
                    setVisible(initialCount);
                  }}
                  className="fc-chip"
                  data-active={active || undefined}
                  aria-pressed={active}
                >
                  ±{pct}%
                </button>
              );
            })}
          </div>
        )}
      </header>

      {isTargetReady && (
        <div
          className="fc-suggestions-tabs"
          role="tablist"
          aria-label="סוג הרכבים"
        >
          {(
            [
              { id: 'all', label: 'הכל', count: totals.all },
              { id: 'used', label: 'מלאי מיידי', count: totals.used },
              { id: 'new', label: 'רכבים חדשים', count: totals.new },
            ] as const
          ).map((tab) => {
            const active = kind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setKind(tab.id);
                  setVisible(initialCount);
                }}
                className="fc-suggestions-tab"
                data-active={active || undefined}
              >
                <span>{tab.label}</span>
                <span className="fc-suggestions-tab-count">{tab.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {isTargetReady && matches.length === 0 && (
        <div className="fc-suggestions-empty" role="status">
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            לא נמצאו רכבים בטווח המחיר הזה כרגע. נסו להגדיל את הגמישות, לעדכן את
            המחיר במחשבון או להחליף סוג רכב.
          </p>
          <div className="fc-suggestions-empty-links">
            <Link href="/vehicles" className="fc-suggestions-link">
              למלאי מיידי ←
            </Link>
            <Link href="/new-vehicles" className="fc-suggestions-link">
              לרכבים חדשים ←
            </Link>
          </div>
        </div>
      )}

      {isTargetReady && matches.length > 0 && (
        <>
          <ul className="home-search-results" role="list">
            {shown.map((item) => (
              <li key={item.id} className="home-search-result">
                <Link href={item.href} className="home-search-result-link">
                  <div className="home-search-result-media">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="home-search-result-media-fallback"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="32"
                          height="32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        >
                          <path
                            d="M5 17h14M5 17l1.5-5h11L19 17M7 17v2M17 17v2M8 12V8h8v4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="home-search-result-body">
                    <p className="home-search-result-mfr">
                      <span
                        className="fc-suggestions-badge"
                        data-kind={item.kind}
                      >
                        {item.badge}
                      </span>
                      {' · '}
                      {item.topLabel}
                    </p>
                    <h3 className="home-search-result-title">{item.title}</h3>
                    {item.subtitle && (
                      <p className="home-search-result-trim">{item.subtitle}</p>
                    )}
                  </div>

                  <div className="home-search-result-price">
                    <span className="home-search-result-price-label">
                      {item.monthly != null ? 'החזר חודשי' : 'מחיר'}
                    </span>
                    <span className="home-search-result-price-value">
                      {item.monthly != null
                        ? `${formatPrice(item.monthly)} / חודש`
                        : formatPrice(item.price)}
                    </span>
                    {item.monthly != null && (
                      <span className="fc-suggestions-monthly">
                        מחיר {formatPrice(item.price)}
                      </span>
                    )}
                    <span className="home-search-result-cta" aria-hidden="true">
                      צפו במפרט
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {remaining > 0 && (
            <div className="home-search-load-more-wrap">
              <button
                type="button"
                className="home-search-load-more"
                onClick={() =>
                  setVisible((v) => Math.min(v + step, matches.length))
                }
              >
                טען עוד {Math.min(remaining, step)} רכבים
                <span className="home-search-load-more-meta">
                  ({remaining} נוספים תואמים)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default FinanceVehicleSuggestions;
