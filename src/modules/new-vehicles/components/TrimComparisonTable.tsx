/**
 * TrimComparisonTable Component
 * Simple list rows — name + monthly payment only
 * Click a row to swap the technical-specs block alongside
 */

'use client';

import type { TrimLevel } from '../types';

interface TrimComparisonTableProps {
  trimLevels: TrimLevel[];
  selectedId?: string;
  onSelect: (trimLevel: TrimLevel) => void;
}

function fmtMoney(n: number | null | undefined): string | null {
  if (n == null || Number.isNaN(Number(n))) return null;
  return `₪${Number(n).toLocaleString('he-IL')}`;
}

export function TrimComparisonTable({ trimLevels, selectedId, onSelect }: TrimComparisonTableProps) {
  if (trimLevels.length === 0) return null;

  return (
    <ul className="trim-list" role="listbox" aria-label="רמות גימור">
      {trimLevels.map((trim) => {
        const isSelected = selectedId === trim.id;
        const monthly = fmtMoney(trim.monthly_payment);

        return (
          <li key={trim.id}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`trim-row${isSelected ? ' is-selected' : ''}`}
              onClick={() => onSelect(trim)}
            >
              <div className="trim-row-identity">
                <h3 className="trim-row-name">{trim.name}</h3>
              </div>

              <div className="trim-row-monthly">
                {monthly ? (
                  <>
                    <span className="trim-row-monthly-label">החזר חודשי</span>
                    <span className="trim-row-monthly-value">
                      {monthly}<small>/ חודש</small>
                    </span>
                  </>
                ) : (
                  <span className="trim-row-monthly-empty">בבדיקה</span>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TrimComparisonTable;
