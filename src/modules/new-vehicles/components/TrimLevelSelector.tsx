/**
 * TrimLevelSelector Component
 * בחירת רמת גימור עם tabs
 */

'use client';

import { useState } from 'react';
import type { TrimLevel } from '../types';

interface TrimLevelSelectorProps {
  trimLevels: TrimLevel[];
  onSelect: (trimLevel: TrimLevel) => void;
  selectedId?: string;
}

export function TrimLevelSelector({
  trimLevels,
  onSelect,
  selectedId,
}: TrimLevelSelectorProps) {
  const [selected, setSelected] = useState<TrimLevel>(
    selectedId
      ? trimLevels.find((t) => t.id === selectedId) || trimLevels[0]
      : trimLevels[0]
  );

  const handleSelect = (trimLevel: TrimLevel) => {
    setSelected(trimLevel);
    onSelect(trimLevel);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex gap-2">
          {trimLevels.map((trim) => (
            <button
              key={trim.id}
              onClick={() => handleSelect(trim)}
              className={`whitespace-nowrap rounded-lg border-2 px-4 py-2 font-medium transition-all ${
                selected.id === trim.id
                  ? 'border-primary bg-primary'
                  : 'border-transparent bg-transparent text-gray-900 hover:border-primary hover:bg-primary/10'
              }`}
              style={
                selected.id === trim.id
                  ? { color: 'var(--color-text-inverse)' }
                  : { border: '2px solid var(--color-border)' }
              }
            >
              <div className="text-base">{trim.name}</div>
              <div
                className="mt-0.5 text-xs"
                style={
                  selected.id === trim.id
                    ? { color: 'var(--color-header-transparent-text-dim)' }
                    : { color: 'var(--color-silver-400)' }
                }
              >
                ₪{trim.price.toLocaleString('he-IL')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Trim Summary */}
      {selected && (
        <div className="space-y-3 rounded-lg p-4" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-medium" style={{ color: 'var(--color-silver-400)' }}>
              רמת גימור נבחרת:
            </h4>
            <p className="text-2xl font-bold text-primary">
              ₪{selected.price.toLocaleString('he-IL')}
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {selected.engine_type && (
              <div>
                <p className="text-xs" style={{ color: 'var(--color-silver-500)' }}>מנוע</p>
                <p className="font-semibold text-gray-900">
                  {selected.engine_type}
                </p>
              </div>
            )}

            {selected.transmission && (
              <div>
                <p className="text-xs" style={{ color: 'var(--color-silver-500)' }}>תיבת הילוכים</p>
                <p className="font-semibold text-gray-900">
                  {selected.transmission}
                </p>
              </div>
            )}

            {selected.power_hp && (
              <div>
                <p className="text-xs" style={{ color: 'var(--color-silver-500)' }}>כוח</p>
                <p className="font-semibold text-gray-900">
                  {selected.power_hp} hp
                </p>
              </div>
            )}

            {selected.acceleration_0_100 && (
              <div>
                <p className="text-xs" style={{ color: 'var(--color-silver-500)' }}>0-100 ק״מ</p>
                <p className="font-semibold text-gray-900">
                  {selected.acceleration_0_100}s
                </p>
              </div>
            )}

            {selected.fuel_consumption && (
              <div>
                <p className="text-xs" style={{ color: 'var(--color-silver-500)' }}>צריכה</p>
                <p className="font-semibold text-gray-900">
                  {selected.fuel_consumption} L/100km
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrimLevelSelector;
