'use client';

import { useRef } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
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
  const draggedThumb = useRef<ActiveThumb>(null);

  const updateFromPointer = (
    event: PointerEvent<HTMLDivElement>,
    thumb: ActiveThumb = draggedThumb.current,
  ) => {
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;

    const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const position = (event.clientX - bounds.left) / bounds.width;
    const normalizedPosition = isRtl ? 1 - position : position;
    const rawValue = domainMin + normalizedPosition * span;
    const nextValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(domainMin, Math.min(nextValue, domainMax));
    const nearestThumb = thumb ?? (
      Math.abs(clampedValue - minValue) <= Math.abs(clampedValue - maxValue)
        ? 'min'
        : 'max'
    );

    if (nearestThumb === 'min') {
      onMinChange(Math.min(clampedValue, maxValue));
    } else {
      onMaxChange(Math.max(clampedValue, minValue));
    }
  };

  const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;

    const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const position = (event.clientX - bounds.left) / bounds.width;
    const normalizedPosition = isRtl ? 1 - position : position;
    const rawValue = domainMin + normalizedPosition * span;
    const nextValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(domainMin, Math.min(nextValue, domainMax));
    draggedThumb.current =
      Math.abs(clampedValue - minValue) <= Math.abs(clampedValue - maxValue)
        ? 'min'
        : 'max';

    onActiveThumbChange(draggedThumb.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  };

  const handleTrackPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (draggedThumb.current) updateFromPointer(event);
  };

  const handleTrackPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggedThumb.current = null;
    onActiveThumbChange(null);
  };

  return (
    <div className="home-search-field home-search-field--slider">
      <div className="home-search-label-row">
        <span className="home-search-label">טווח החזר חודשי</span>
        <span className="home-search-range-readout" dir="ltr">
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
        <div
          className="home-search-slider-track"
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handleTrackPointerUp}
          onPointerCancel={handleTrackPointerUp}
          aria-hidden="true"
        />
        <div
          className="home-search-slider-fill"
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={handleTrackPointerUp}
          onPointerCancel={handleTrackPointerUp}
          aria-hidden="true"
        />

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
          aria-label="החזר חודשי מינימלי בשקלים"
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
          aria-label="החזר חודשי מקסימלי בשקלים"
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
