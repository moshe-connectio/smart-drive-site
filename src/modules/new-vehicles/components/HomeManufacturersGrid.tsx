'use client';

import { useState } from 'react';
import Link from 'next/link';
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
          style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
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
      className="home-mfr-tile"
      title={m.name}
      aria-label={`צפה ברכבי ${m.name}`}
    >
      {m.logo_url ? (
        // Manufacturer logos are sourced from arbitrary external domains; using a plain <img>
        // avoids hard-coding every host in next.config remotePatterns. Logos are small assets.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.logo_url}
          alt=""
          aria-hidden="true"
          width={80}
          height={80}
          loading="lazy"
          className="home-mfr-logo"
        />
      ) : (
        <div className="home-mfr-fallback">{m.name.charAt(0)}</div>
      )}

      <span className="home-mfr-name">{m.name}</span>
    </Link>
  );
}
