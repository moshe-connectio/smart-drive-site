/**
 * ManufacturerGrid Component
 * רשת יצרנים עם לוגו ושם
 */

'use client';

import Link from 'next/link';
import { Reveal } from '@shared/components/motion/Reveal';
import type { ManufacturerWithCounts } from '../types';
import { resolveManufacturerLogo } from '../lib/constants';

interface ManufacturerGridProps {
  manufacturers: ManufacturerWithCounts[];
  isLoading?: boolean;
}

export function ManufacturerGrid({ manufacturers, isLoading }: ManufacturerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg"
            style={{ background: 'var(--color-gray-200)' }}
          />
        ))}
      </div>
    );
  }

  if (manufacturers.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
        <p className="text-center" style={{ color: 'var(--color-silver-500)' }}>אין יצרנים זמינים כעת</p>
      </div>
    );
  }

  return (
    <Reveal as="div" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" stagger={0.045} y={24}>
      {manufacturers.map((manufacturer) => {
        const logo = resolveManufacturerLogo(manufacturer);
        return (
        <Link
          key={manufacturer.id}
          href={`/new-vehicles/${manufacturer.slug}`}
          className="nv-mfr-card group"
          aria-label={`${manufacturer.name} — ${manufacturer.models_count} דגמים`}
        >
          {/* פס דקורטיבי עליון */}
          <span className="nv-mfr-card-accent" aria-hidden="true" />

          {/* לוגו - תופס רוב הכרטיסיה */}
          <div className="nv-mfr-card-logo">
            {logo ? (
              // Logos come from arbitrary external manufacturer domains; <img> avoids per-host config.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={manufacturer.name}
                width={160}
                height={160}
                className="nv-mfr-card-logo-img"
                loading="lazy"
              />
            ) : (
              <div className="nv-mfr-card-logo-fallback">
                {manufacturer.name.charAt(0)}
              </div>
            )}
          </div>

          {/* שם + מידע - פס תחתון קומפקטי */}
          <div className="nv-mfr-card-foot">
            <p className="nv-mfr-card-name">{manufacturer.name}</p>
            <p className="nv-mfr-card-meta">
              <span className="nv-mfr-card-meta-num">{manufacturer.models_count}</span>{' '}
              דגמים
            </p>
          </div>
        </Link>
        );
      })}
    </Reveal>
  );
}

export default ManufacturerGrid;
