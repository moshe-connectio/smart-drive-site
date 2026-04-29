'use client';

import type { CSSProperties } from 'react';
import type { ActiveThumb } from '../hooks/useVehicleSearch';
import { formatMoney } from '../lib/searchUtils';

interface MonthlyPaymentSliderProps {
  domainMin: number;
  domainMax: number;
  step: number;
  minValue: number;
  maxValue: number;
  activeThumb: ActiveThumb;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onActiveThumbChange: (thumb: ActiveThumb) => void;
}

export function MonthlyPaymentSlider({
  domainMin,
  domainMax,
  step,
  minValue,
  maxValue,
  activeThumb,
  onMinChange,
  onMaxChange,
  onActiveThumbChange,
}: MonthlyPaymentSliderProps) {
  const span = domainMax - domainMin || 1;
  const fillStartPct = ((minValue - domainMin) / span) * 100;
  const fillEndPct = ((maxValue - domainMin) / span) * 100;

  return (
    <div className="home-search-field home-search-field--slider">
      <div className="home-search-label-row">
        <span className="home-search-label">החזר חודשי</span>
        <span className="home-search-range-readout">
          {formatMoney(minValue)} – {formatMoney(maxValue)}
        </span>
      </div>

      <div
        className={`home-search-slider${
          activeThumb ? ` is-active-${activeThumb}` : ''
        }`}
        style={
          {
            '--fill-start': `${fillStartPct}%`,
            '--fill-end': `${fillEndPct}%`,
          } as CSSProperties
        }
      >
        <div className="home-search-slider-track" aria-hidden="true" />
        <div className="home-search-slider-fill" aria-hidden="true" />

        <input
          type="range"
          min={domainMin}
          max={domainMax}
          step={step}
          value={minValue}
          onChange={(e) => onMinChange(Number(e.target.value))}
          onPointerDown={() => onActiveThumbChange('min')}
          onPointerUp={() => onActiveThumbChange(null)}
          onBlur={() => onActiveThumbChange(null)}
          aria-label="החזר חודשי מינימלי"
          className="home-search-slider-input home-search-slider-input--min"
        />
        <input
          type="range"
          min={domainMin}
          max={domainMax}
          step={step}
          value={maxValue}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          onPointerDown={() => onActiveThumbChange('max')}
          onPointerUp={() => onActiveThumbChange(null)}
          onBlur={() => onActiveThumbChange(null)}
          aria-label="החזר חודשי מקסימלי"
          className="home-search-slider-input home-search-slider-input--max"
        />
      </div>

      <div className="home-search-slider-bounds">
        <span>{formatMoney(domainMin)}</span>
        <span>{formatMoney(domainMax)}</span>
      </div>
    </div>
  );
}
