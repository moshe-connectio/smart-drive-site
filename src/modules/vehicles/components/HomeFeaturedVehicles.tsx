'use client';

import { useState } from 'react';
import { VehicleCard } from './VehicleCard';
import type { Vehicle } from '@modules/vehicles/lib/repository';

interface HomeFeaturedVehiclesProps {
  vehicles: Vehicle[];
  /** Cards visible on first paint (desktop = 1 row). */
  initialCount?: number;
  /** How many extra cards to reveal on each "load more" click. */
  step?: number;
}

export function HomeFeaturedVehicles({
  vehicles,
  initialCount = 8,
  step = 8,
}: HomeFeaturedVehiclesProps) {
  const [visible, setVisible] = useState(initialCount);

  const shown = vehicles.slice(0, visible);
  const remaining = Math.max(0, vehicles.length - visible);
  const hasMore = remaining > 0;

  return (
    <>
      <div className="home-featured-grid">
        {shown.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + step, vehicles.length))}
            className="home-load-more-btn"
            aria-label={`טען עוד רכבים (${remaining} נוספים)`}
          >
            טען עוד
            <span className="home-load-more-count">({remaining})</span>
            <svg
              className="home-load-more-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
