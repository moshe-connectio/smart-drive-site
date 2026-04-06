/**
 * ManufacturerGrid Component
 * רשת יצרנים עם לוגו ושם
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ManufacturerWithCounts } from '../types';

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
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {manufacturers.map((manufacturer) => (
        <Link
          key={manufacturer.id}
          href={`/new-vehicles/${manufacturer.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-lg transition-all hover:shadow-lg"
          style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
        >
          {/* לוגו - תופס רוב הכרטיסיה */}
          <div className="flex aspect-[4/3] items-center justify-center p-6" style={{ background: 'var(--color-gray-100)' }}>
            {manufacturer.logo_url ? (
              <Image
                src={manufacturer.logo_url}
                alt={manufacturer.name}
                width={160}
                height={160}
                className="h-28 w-28 object-contain transition-transform group-hover:scale-110"
                priority
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full text-3xl font-bold" style={{ background: 'var(--color-gray-200)', color: 'var(--color-silver-500)' }}>
                {manufacturer.name.charAt(0)}
              </div>
            )}
          </div>

          {/* שם + מידע - פס תחתון קומפקטי */}
          <div className="px-3 py-2.5 text-center" style={{ borderTop: '1px solid var(--color-card-border)' }}>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {manufacturer.name}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--color-silver-500)' }}>
              {manufacturer.models_count} דגמים
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ManufacturerGrid;
