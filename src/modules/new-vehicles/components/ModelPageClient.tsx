/**
 * ModelPageClient Component
 * חלק אינטראקטיבי של דף הדגם - בחירת רמת גימור וטעינת מפרט
 */

'use client';

import { useState, useCallback } from 'react';
import type { TrimLevel, TrimLevelWithSpecifications } from '../types';
import { TrimLevelSelector } from './TrimLevelSelector';
import { VehicleSpecifications } from './VehicleSpecifications';

interface ModelPageClientProps {
  trimLevels: TrimLevel[];
  initialTrimSpecs: TrimLevelWithSpecifications | null;
}

export function ModelPageClient({ trimLevels, initialTrimSpecs }: ModelPageClientProps) {
  const [trimDetails, setTrimDetails] = useState<TrimLevelWithSpecifications | null>(initialTrimSpecs);
  const [loadingSpecs, setLoadingSpecs] = useState(false);

  const handleTrimSelect = useCallback(async (trim: TrimLevel) => {
    // If we already have this trim's specs loaded, skip
    if (trimDetails?.id === trim.id) return;

    setLoadingSpecs(true);
    try {
      const res = await fetch(`/api/new-vehicles/trim-levels?model_id=${trim.model_id}`);
      const trimLevelsData = await res.json();
      
      // Get full specs for selected trim
      const specsRes = await fetch(`/api/new-vehicles/specifications?trim_id=${trim.id}`);
      const specs = await specsRes.json();

      // Find full trim info from the trim levels data
      const fullTrim = trimLevelsData.find((t: TrimLevelWithSpecifications) => t.id === trim.id);
      
      if (fullTrim) {
        setTrimDetails({
          ...fullTrim,
          specifications: specs || [],
        });
      }
    } catch (err) {
      console.error('Error fetching trim specs:', err);
    } finally {
      setLoadingSpecs(false);
    }
  }, [trimDetails?.id]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Sidebar - Trim Selector */}
      <div className="lg:col-span-1">
        <div
          className="sticky top-24 lg:top-28 rounded-lg p-6"
          style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
        >
          <h2 className="mb-4 text-lg font-bold" style={{ color: 'var(--color-gray-900)' }}>
            בחר רמת גימור
          </h2>
          <TrimLevelSelector
            trimLevels={trimLevels}
            onSelect={handleTrimSelect}
            selectedId={trimDetails?.id}
          />
        </div>
      </div>

      {/* Main - Specifications */}
      <div className="lg:col-span-2">
        {loadingSpecs ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full animate-pulse rounded-lg"
                style={{ background: 'var(--color-gray-200)' }}
              />
            ))}
          </div>
        ) : trimDetails ? (
          <VehicleSpecifications trimLevel={trimDetails} />
        ) : (
          <div
            className="rounded-lg p-8 text-center"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
          >
            <p style={{ color: 'var(--color-gray-500)' }}>בחר רמת גימור לצפייה במפרט המלא</p>
          </div>
        )}
      </div>
    </div>
  );
}
