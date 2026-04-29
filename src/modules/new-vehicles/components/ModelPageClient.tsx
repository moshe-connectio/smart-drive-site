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

type MonthlySort = 'asc' | 'desc';

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

  const [monthlySort, setMonthlySort] = useState<MonthlySort>('asc');

  const sortedTrimLevels = useMemo(() => {
    const dir = monthlySort === 'asc' ? 1 : -1;
    return [...trimLevels].sort((a, b) => {
      const av = a.monthly_payment;
      const bv = b.monthly_payment;
      const aMissing = av == null || Number.isNaN(Number(av));
      const bMissing = bv == null || Number.isNaN(Number(bv));
      // Trims without monthly payment always go to the end.
      if (aMissing && bMissing) return 0;
      if (aMissing) return 1;
      if (bMissing) return -1;
      return (Number(av) - Number(bv)) * dir;
    });
  }, [trimLevels, monthlySort]);

  const [selectedId, setSelectedId] = useState<string | null>(
    allTrimSpecs[0]?.id ?? trimLevels[0]?.id ?? null
  );

  const handleTrimSelect = useCallback((trim: TrimLevel) => {
    setSelectedId(trim.id);
  }, []);

  const toggleMonthlySort = useCallback(() => {
    setMonthlySort((s) => (s === 'asc' ? 'desc' : 'asc'));
  }, []);

  const trimDetails = selectedId ? specsById.get(selectedId) ?? null : null;
  const selectedTrim: TrimLevel | null =
    sortedTrimLevels.find((t) => t.id === selectedId) ?? sortedTrimLevels[0] ?? null;

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
            <button
              type="button"
              className={`trim-split-col trim-split-col-end trim-sort-btn is-${monthlySort}`}
              onClick={toggleMonthlySort}
              aria-label={
                monthlySort === 'asc'
                  ? 'מיון לפי החזר חודשי — מהנמוך לגבוה. לחיצה תהפוך לסדר יורד.'
                  : 'מיון לפי החזר חודשי — מהגבוה לנמוך. לחיצה תהפוך לסדר עולה.'
              }
            >
              <span>החזר חודשי</span>
              <span className="trim-sort-icon" aria-hidden="true">
                <svg viewBox="0 0 12 14" width="10" height="12">
                  <path
                    d="M6 1.5 L10 5.5 H2 Z"
                    className="trim-sort-arrow trim-sort-arrow-up"
                  />
                  <path
                    d="M6 12.5 L2 8.5 H10 Z"
                    className="trim-sort-arrow trim-sort-arrow-down"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="trim-split-header-specs">
            <span className="trim-split-col">מפרט טכני מלא</span>
          </div>
        </div>

        <div className="trim-split-list">
          <TrimComparisonTable
            trimLevels={sortedTrimLevels}
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
