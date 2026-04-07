'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ManufacturerWithCounts } from '../types';

interface HomeManufacturersGridProps {
  manufacturers: ManufacturerWithCounts[];
}

const MOBILE_INITIAL = 12;
const MOBILE_LOAD_MORE = 12;

export function HomeManufacturersGrid({ manufacturers }: HomeManufacturersGridProps) {
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL);

  const hasMore = visibleCount < manufacturers.length;

  return (
    <>
      {/* Desktop: show all, bigger cards */}
      <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-5">
        {manufacturers.map((m) => (
          <ManufacturerItem key={m.id} manufacturer={m} />
        ))}
      </div>

      {/* Mobile: show with load more */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {manufacturers.slice(0, visibleCount).map((m) => (
            <ManufacturerItem key={m.id} manufacturer={m} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + MOBILE_LOAD_MORE, manufacturers.length)
                )
              }
              className="inline-flex items-center gap-2 font-semibold py-2.5 px-8 rounded-xl transition-all active:scale-95"
              style={{ background: 'var(--color-card-bg)', border: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}
            >
              טען עוד יצרנים ({manufacturers.length - visibleCount})
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Link to full page */}
      <div className="text-center mt-8">
        <Link
          href="/new-vehicles"
          className="inline-flex items-center gap-2 font-semibold py-2.5 px-8 rounded-xl transition-all hover:scale-105"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
        >
          לכל היצרנים והדגמים
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}

function ManufacturerItem({ manufacturer: m }: { manufacturer: ManufacturerWithCounts }) {
  return (
    <Link
      href={`/new-vehicles/${m.slug}`}
      className="group relative flex items-center justify-center rounded-xl p-4 md:p-5 aspect-square transition-all hover:shadow-lg"
      style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
      title={m.name}
    >
      {m.logo_url ? (
        <Image
          src={m.logo_url}
          alt={m.name}
          width={80}
          height={80}
          className="h-14 w-14 md:h-20 md:w-20 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full text-xl md:text-2xl font-bold" style={{ background: 'var(--color-gray-200)', color: 'var(--color-silver-500)' }}>
          {m.name.charAt(0)}
        </div>
      )}

      {/* Hover tooltip with name */}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap text-xs font-semibold py-1 px-3 rounded-lg shadow-lg z-10"
        style={{ background: 'var(--color-primary-800)', color: '#fff' }}
      >
        {m.name}
      </span>
    </Link>
  );
}
