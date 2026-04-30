'use client';

/**
 * MonthlyPaymentRange
 *
 * Dual-thumb range slider for filtering vehicles by estimated monthly
 * payment. Two stacked range inputs are used (no extra deps); the visual
 * track and active band are rendered with a single absolutely-positioned
 * div so the slider stays performant and a11y-friendly.
 */

import { useId } from 'react';
import { formatPrice } from '@shared/utils/formatting';

interface MonthlyPaymentRangeProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
}

export function MonthlyPaymentRange({
  min,
  max,
  step,
  value,
  onChange,
}: MonthlyPaymentRangeProps) {
  const id = useId();
  const [low, high] = value;
  const range = Math.max(1, max - min);

  const lowPct = ((low - min) / range) * 100;
  const highPct = ((high - min) / range) * 100;

  const setLow = (next: number) => {
    const clamped = Math.max(min, Math.min(next, high));
    onChange([clamped, high]);
  };
  const setHigh = (next: number) => {
    const clamped = Math.min(max, Math.max(next, low));
    onChange([low, clamped]);
  };

  return (
    <div className="vf-range">
      <div className="vf-range-header">
        <label
          className="block text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-gray-500)' }}
          htmlFor={`${id}-min`}
        >
          החזר חודשי משוער
        </label>
        <span className="vf-range-readout">
          {formatPrice(low)} – {formatPrice(high)}
          <span className="vf-range-readout-suffix"> / חודש</span>
        </span>
      </div>

      <div className="vf-range-track-wrap">
        {/* Static base track */}
        <div className="vf-range-track" aria-hidden="true" />
        {/* Active band between the two thumbs */}
        <div
          className="vf-range-band"
          style={{ insetInlineStart: `${lowPct}%`, insetInlineEnd: `${100 - highPct}%` }}
          aria-hidden="true"
        />

        <input
          id={`${id}-min`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => setLow(Number(e.target.value))}
          className="vf-range-input"
          aria-label="החזר חודשי מינימלי"
          aria-valuetext={formatPrice(low)}
        />
        <input
          id={`${id}-max`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => setHigh(Number(e.target.value))}
          className="vf-range-input"
          aria-label="החזר חודשי מקסימלי"
          aria-valuetext={formatPrice(high)}
        />
      </div>

      <div className="vf-range-edges">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
