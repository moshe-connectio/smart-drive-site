/**
 * ModelPageClient Component
 * Comparison table → full technical specs that swap on trim selection
 */

'use client';

import { useState, useCallback } from 'react';
import type { TrimLevel, TrimLevelWithSpecifications } from '../types';
import { TrimComparisonTable } from './TrimComparisonTable';
import { VehicleSpecifications } from './VehicleSpecifications';

interface ModelPageClientProps {
  trimLevels: TrimLevel[];
  initialTrimSpecs: TrimLevelWithSpecifications | null;
  modelName: string;
  manufacturerName: string;
}

export function ModelPageClient({
  trimLevels,
  initialTrimSpecs,
  modelName,
  manufacturerName,
}: ModelPageClientProps) {
  const [trimDetails, setTrimDetails] = useState<TrimLevelWithSpecifications | null>(initialTrimSpecs);
  const [loadingSpecs, setLoadingSpecs] = useState(false);

  const handleTrimSelect = useCallback(
    async (trim: TrimLevel) => {
      if (trimDetails?.id === trim.id) return;

      setLoadingSpecs(true);
      try {
        const res = await fetch(`/api/new-vehicles/trim-levels?model_id=${trim.model_id}`);
        const trimLevelsData = await res.json();

        const specsRes = await fetch(`/api/new-vehicles/specifications?trim_id=${trim.id}`);
        const specs = await specsRes.json();

        const fullTrim = trimLevelsData.find((t: TrimLevelWithSpecifications) => t.id === trim.id);
        if (fullTrim) {
          setTrimDetails({ ...fullTrim, specifications: specs || [] });
        }
      } catch (err) {
        console.error('Error fetching trim specs:', err);
      } finally {
        setLoadingSpecs(false);
      }
    },
    [trimDetails?.id]
  );

  const selectedTrim: TrimLevel | null = trimDetails ?? trimLevels[0] ?? null;

  return (
    <div className="trim-section">
      <header className="trim-section-head">
        <p className="trim-section-eyebrow">{manufacturerName} · {modelName}</p>
        <h2 className="trim-section-title">
          השוואת רמות הגימור
        </h2>
        <p className="trim-section-subtitle">
          לחצו על רמת גימור ברשימה כדי לעדכן את המפרט הטכני המלא לצידה.
        </p>
      </header>

      <div className="trim-split">
        <div className="trim-split-header">
          <div className="trim-split-header-list">
            <span className="trim-split-col">רמת גימור</span>
            <span className="trim-split-col trim-split-col-end">החזר חודשי</span>
          </div>
          <div className="trim-split-header-specs">
            <span className="trim-split-col">מפרט טכני מלא</span>
          </div>
        </div>

        <div className="trim-split-list">
          <TrimComparisonTable
            trimLevels={trimLevels}
            selectedId={selectedTrim?.id}
            onSelect={handleTrimSelect}
          />
        </div>

        <div className="trim-split-specs trim-specs-block">
        {loadingSpecs ? (
          <div className="trim-specs-loading">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="trim-specs-skeleton" />
            ))}
          </div>
        ) : trimDetails ? (
          <VehicleSpecifications trimLevel={trimDetails} />
        ) : (
          <div className="trim-specs-empty">בחרו רמת גימור לצפייה במפרט המלא</div>
        )}
        </div>
      </div>
    </div>
  );
}
