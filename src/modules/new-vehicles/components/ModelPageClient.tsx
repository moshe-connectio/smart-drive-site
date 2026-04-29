/**
 * ModelPageClient Component
 * Comparison table → full technical specs that swap on trim selection.
 * All trim specs are prefetched on the server, so switching is instant.
 */

'use client';

import { useMemo, useState, useCallback } from 'react';
import type { TrimLevel, TrimLevelWithSpecifications } from '../types';
import { TrimComparisonTable } from './TrimComparisonTable';
import { VehicleSpecifications } from './VehicleSpecifications';

interface ModelPageClientProps {
  trimLevels: TrimLevel[];
  allTrimSpecs: TrimLevelWithSpecifications[];
  modelName: string;
  manufacturerName: string;
}

export function ModelPageClient({
  trimLevels,
  allTrimSpecs,
  modelName,
  manufacturerName,
}: ModelPageClientProps) {
  const specsById = useMemo(() => {
    const map = new Map<string, TrimLevelWithSpecifications>();
    for (const t of allTrimSpecs) map.set(t.id, t);
    return map;
  }, [allTrimSpecs]);

  const [selectedId, setSelectedId] = useState<string | null>(
    allTrimSpecs[0]?.id ?? trimLevels[0]?.id ?? null
  );

  const handleTrimSelect = useCallback((trim: TrimLevel) => {
    setSelectedId(trim.id);
  }, []);

  const trimDetails = selectedId ? specsById.get(selectedId) ?? null : null;
  const selectedTrim: TrimLevel | null =
    trimLevels.find((t) => t.id === selectedId) ?? trimLevels[0] ?? null;

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
          {trimDetails ? (
            <VehicleSpecifications trimLevel={trimDetails} />
          ) : (
            <div className="trim-specs-empty">בחרו רמת גימור לצפייה במפרט המלא</div>
          )}
        </div>
      </div>
    </div>
  );
}
