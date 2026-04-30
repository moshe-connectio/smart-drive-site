'use client';

import { useMemo, useState } from 'react';
import { Vehicle } from '@modules/vehicles/lib/repository';
import { VehicleFilters, FilterState } from './VehicleFilters';
import { VehicleGrid } from './VehicleGrid';

interface FilterableVehicleGridProps {
  vehicles: Vehicle[];
  brands: string[];
  categories: string[];
}

const MONTHLY_STEP = 100;

/** Round n outward to the nearest multiple of `step`. */
function roundOut(n: number, step: number, dir: 'floor' | 'ceil'): number {
  if (!Number.isFinite(n) || step <= 0) return 0;
  const fn = dir === 'floor' ? Math.floor : Math.ceil;
  return fn(n / step) * step;
}

export function FilterableVehicleGrid({
  vehicles,
  brands,
  categories,
}: FilterableVehicleGridProps) {
  // Slider bounds are derived only from vehicles that have an explicit
  // dealer-set monthly_payment. Vehicles without one show "יתעדכן בקרוב"
  // on the card and are kept in the listing unless the user actively
  // narrows the slider.
  const [monthlyMin, monthlyMax] = useMemo(() => {
    const values = vehicles
      .map((v) => v.monthly_payment)
      .filter((n): n is number => typeof n === 'number' && n > 0);
    if (values.length === 0) return [0, 5_000];
    const minVal = roundOut(Math.min(...values), MONTHLY_STEP, 'floor');
    const maxVal = roundOut(Math.max(...values), MONTHLY_STEP, 'ceil');
    return [minVal, Math.max(maxVal, minVal + MONTHLY_STEP)];
  }, [vehicles]);

  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    categories: [],
    searchQuery: '',
    monthlyMin,
    monthlyMax,
  });

  const filteredVehicles = useMemo(() => {
    const userNarrowedMonthly =
      filters.monthlyMin > monthlyMin || filters.monthlyMax < monthlyMax;

    return vehicles.filter((vehicle) => {
      if (filters.brand && vehicle.brand !== filters.brand) {
        return false;
      }

      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some((selectedCategory) =>
          vehicle.categories.includes(selectedCategory),
        );
        if (!hasMatchingCategory) {
          return false;
        }
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = [
          vehicle.title,
          vehicle.brand,
          vehicle.model,
          ...vehicle.categories,
          vehicle.year.toString(),
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Monthly payment range — only apply when the user actually narrowed
      // the slider. Vehicles without an explicit monthly_payment are hidden
      // when the user filters by monthly, since their value is unknown.
      if (userNarrowedMonthly) {
        const monthly = vehicle.monthly_payment;
        if (typeof monthly !== 'number' || monthly <= 0) return false;
        if (monthly < filters.monthlyMin || monthly > filters.monthlyMax) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, filters, monthlyMin, monthlyMax]);

  return (
    <>
      <VehicleFilters
        brands={brands}
        categories={categories}
        monthlyMin={monthlyMin}
        monthlyMax={monthlyMax}
        monthlyStep={MONTHLY_STEP}
        onFilterChange={setFilters}
      />

      <div className="mb-5 text-sm font-medium" style={{ color: 'var(--color-gray-500)' }}>
        מציג {filteredVehicles.length} מתוך {vehicles.length} רכבים
      </div>

      <VehicleGrid vehicles={filteredVehicles} />
    </>
  );
}
