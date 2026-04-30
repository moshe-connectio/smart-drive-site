'use client';

/**
 * FinanceCalculator
 *
 * Interactive Hebrew/RTL auto-finance simulator. Pure presentation —
 * delegates math to `@modules/finance/lib/calculator`.
 *
 * Usage:
 *   <FinanceCalculator />
 *   <FinanceCalculator vehiclePrice={185000} vehicleTitle="טויוטה קאמרי 2024" />
 */

import { useEffect, useMemo, useState, useId } from 'react';
import { formatPrice } from '@shared/utils/formatting';
import { LeadForm } from '@modules/leads';
import type { LeadFormId } from '@modules/leads';
import { calculateFinance } from '../lib/calculator';

interface FinanceCalculatorProps {
  /** Pre-fill the vehicle price (e.g. on a vehicle detail page) */
  vehiclePrice?: number;
  /** Optional vehicle title shown as context */
  vehicleTitle?: string;
  /** Render without the outer card chrome (for embedding) */
  embedded?: boolean;
  /** Lead form ID submitted with the contact request */
  leadFormId?: LeadFormId;
  /** CTA button label */
  ctaLabel?: string;
}

const DEFAULT_PRICE = 150_000;
const DEFAULT_DOWN_PCT = 20;
const DEFAULT_TERM = 60;
const DEFAULT_RATE = 6.5;

const TERM_PRESETS = [24, 36, 48, 60, 72, 84];

export default function FinanceCalculator({
  vehiclePrice,
  vehicleTitle,
  embedded = false,
  leadFormId = 'financing',
  ctaLabel = 'צרו קשר לליווי אישי',
}: FinanceCalculatorProps) {
  const baseId = useId();
  const [contactOpen, setContactOpen] = useState(false);

  // Lock body scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [contactOpen]);

  const initialPrice = vehiclePrice && vehiclePrice > 0 ? vehiclePrice : DEFAULT_PRICE;
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPayment, setDownPayment] = useState<number>(
    Math.round((initialPrice * DEFAULT_DOWN_PCT) / 100),
  );
  const [termMonths, setTermMonths] = useState<number>(DEFAULT_TERM);
  const [rate, setRate] = useState<number>(DEFAULT_RATE);
  const [balloonPct, setBalloonPct] = useState<number>(0);

  const loanBeforeBalloon = Math.max(0, price - downPayment);
  const balloon = Math.round((loanBeforeBalloon * balloonPct) / 100);

  const result = useMemo(
    () =>
      calculateFinance({
        vehiclePrice: price,
        downPayment,
        termMonths,
        annualRatePercent: rate,
        balloon,
      }),
    [price, downPayment, termMonths, rate, balloon],
  );

  const downPct = price > 0 ? Math.round((downPayment / price) * 100) : 0;

  // Bound editing helpers (keep down payment ≤ price, balloon ≤ loan)
  const handlePriceChange = (next: number) => {
    const clean = Math.max(0, Math.round(next));
    setPrice(clean);
    if (downPayment > clean) setDownPayment(clean);
  };

  const handleDownChange = (next: number) => {
    const clean = Math.max(0, Math.min(price, Math.round(next)));
    setDownPayment(clean);
  };

  const handleDownPctChange = (pct: number) => {
    const clamped = Math.max(0, Math.min(100, pct));
    setDownPayment(Math.round((price * clamped) / 100));
  };

  const Wrapper: React.ElementType = embedded ? 'div' : 'section';

  // Concise summary of the current simulation, sent to the lead form as
  // pre-filled context so the rep already knows what the customer is looking at.
  const monthly = result.isValid ? Math.round(result.monthlyPayment) : 0;
  const leadContextLines = [
    vehicleTitle ? `רכב: ${vehicleTitle}` : null,
    `מחיר: ${formatPrice(price)}`,
    `מקדמה: ${formatPrice(downPayment)} (${downPct}%)`,
    `תקופה: ${termMonths} חודשים`,
    `ריבית: ${rate.toFixed(2)}%`,
    balloon > 0 ? `תשלום שיורי: ${formatPrice(balloon)}` : null,
    result.isValid ? `החזר חודשי מוערך: ${formatPrice(monthly)}` : null,
  ].filter(Boolean) as string[];
  const leadSubtitle = result.isValid
    ? `החזר חודשי מוערך: ${formatPrice(monthly)} ל-${termMonths} חודשים`
    : 'נחזור אליכם בהקדם להתאמת מסלול מימון';

  return (
    <>
    <Wrapper
      className={
        embedded
          ? 'fc-root fc-embedded'
          : 'fc-root rounded-3xl p-6 sm:p-8 lg:p-10'
      }
      style={
        embedded
          ? undefined
          : {
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md, 0 10px 30px rgba(15, 34, 84, 0.08))',
            }
      }
      aria-labelledby={`${baseId}-title`}
    >
      <header className="mb-6">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-primary-500)' }}
        >
          מחשבון מימון
        </p>
        <h2
          id={`${baseId}-title`}
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          חישוב החזר חודשי
        </h2>
        {vehicleTitle && (
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            עבור: <span className="font-semibold">{vehicleTitle}</span>
          </p>
        )}
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          הזינו את פרטי העסקה וצפו בהחזר החודשי המוערך. החישוב הוא הדמיה בלבד ואינו
          מהווה הצעה למימון.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* ── Inputs ──────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">
          {/* Price */}
          <Field
            id={`${baseId}-price`}
            label="מחיר הרכב"
            value={price}
            min={20_000}
            max={1_500_000}
            step={1_000}
            onChange={handlePriceChange}
            suffix="₪"
            sliderHint={formatPrice(price)}
          />

          {/* Down payment */}
          <div>
            <Field
              id={`${baseId}-down`}
              label="מקדמה"
              value={downPayment}
              min={0}
              max={price}
              step={1_000}
              onChange={handleDownChange}
              suffix="₪"
              sliderHint={`${formatPrice(downPayment)} (${downPct}%)`}
            />
            {/* Quick % presets */}
            <div className="mt-2 flex flex-wrap gap-2">
              {[0, 10, 20, 30, 50].map((pct) => {
                const active = downPct === pct;
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleDownPctChange(pct)}
                    className="fc-chip"
                    data-active={active || undefined}
                    aria-pressed={active}
                  >
                    {pct}%
                  </button>
                );
              })}
            </div>
          </div>

          {/* Term */}
          <div>
            <Field
              id={`${baseId}-term`}
              label="תקופת ההלוואה"
              value={termMonths}
              min={6}
              max={96}
              step={6}
              onChange={(v) => setTermMonths(Math.max(6, Math.min(96, Math.round(v))))}
              suffix="חודשים"
              sliderHint={`${termMonths} חודשים (${(termMonths / 12).toFixed(1)} שנים)`}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {TERM_PRESETS.map((t) => {
                const active = termMonths === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTermMonths(t)}
                    className="fc-chip"
                    data-active={active || undefined}
                    aria-pressed={active}
                  >
                    {t} ח׳
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interest rate */}
          <Field
            id={`${baseId}-rate`}
            label="ריבית שנתית"
            value={rate}
            min={0}
            max={15}
            step={0.1}
            onChange={(v) => setRate(Math.max(0, Math.min(15, Number(v.toFixed(2)))))}
            suffix="%"
            sliderHint={`${rate.toFixed(2)}%`}
            decimals={2}
          />

          {/* Balloon */}
          <div>
            <label
              className="flex items-baseline justify-between mb-2 text-sm font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
              htmlFor={`${baseId}-balloon`}
            >
              <span>תשלום שיורי (בלון) בסוף התקופה</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                {balloonPct}% · {formatPrice(balloon)}
              </span>
            </label>
            <input
              id={`${baseId}-balloon`}
              type="range"
              min={0}
              max={50}
              step={5}
              value={balloonPct}
              onChange={(e) => setBalloonPct(Number(e.target.value))}
              className="fc-slider"
              aria-valuemin={0}
              aria-valuemax={50}
              aria-valuenow={balloonPct}
            />
            <p className="mt-1.5 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              סכום שנדחה לסוף ההלוואה. מקטין את ההחזר החודשי אך מצריך תשלום גדול בסוף.
            </p>
          </div>
        </div>

        {/* ── Results ─────────────────────────────────────────── */}
        <aside
          className="lg:col-span-2 fc-result"
          aria-live="polite"
          aria-label="תוצאות החישוב"
        >
          <div className="fc-result-hero">
            <span className="fc-result-label">החזר חודשי מוערך</span>
            <span className="fc-result-value">
              {result.isValid ? formatPrice(Math.round(result.monthlyPayment)) : '—'}
            </span>
            <span className="fc-result-sub">
              למשך {termMonths} חודשים
            </span>
          </div>

          <dl className="fc-result-list">
            <Row label="סכום ההלוואה" value={formatPrice(result.loanAmount)} />
            <Row
              label="סך ריבית"
              value={result.isValid ? formatPrice(Math.round(result.totalInterest)) : '—'}
            />
            <Row
              label="סך כל התשלומים"
              value={result.isValid ? formatPrice(Math.round(result.totalCost)) : '—'}
              emphasis
            />
            {balloon > 0 && (
              <Row
                label="תשלום שיורי בסוף"
                value={formatPrice(balloon)}
                hint="ישולם בתום התקופה"
              />
            )}
          </dl>

          <button
            type="button"
            className="fc-cta"
            onClick={() => setContactOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={contactOpen}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {ctaLabel}
          </button>

          <p className="fc-disclaimer">
            * החישוב הוא הדמיה למטרות מידע בלבד, אינו כולל עמלות / הצמדה / ביטוחים, ואינו
            מהווה הצעה או התחייבות למימון. תנאי המימון בפועל כפופים לאישור הגורם
            המממן ולבדיקת נתונים.
          </p>
        </aside>
      </div>
    </Wrapper>

    {contactOpen && (
      <div
        className="fc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-modal-title`}
      >
        <div
          className="fc-modal-backdrop"
          onClick={() => setContactOpen(false)}
          aria-hidden="true"
        />
        <div className="fc-modal-panel">
          <div className="fc-modal-header">
            <div>
              <p id={`${baseId}-modal-title`} className="fc-modal-title">
                ליווי אישי למימון הרכב
              </p>
              <p className="fc-modal-subtitle">{leadSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="fc-modal-close"
              aria-label="סגור טופס"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="fc-modal-body">
            <ul className="fc-modal-summary" aria-label="פרטי הסימולציה">
              {leadContextLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <LeadForm
              formId={leadFormId}
              vehicleTitle={vehicleTitle}
              title=""
              showEmail
              showMessage
              submitLabel="שלחו ונחזור אליכם"
              variant="minimal"
              onSuccess={() => {
                // Close shortly after success so the user sees the confirmation
                window.setTimeout(() => setContactOpen(false), 1800);
              }}
            />
          </div>
        </div>
      </div>
    )}
    </>
  );
}

/* ─── Internal helpers ───────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  suffix?: string;
  sliderHint?: string;
  decimals?: number;
}

function Field({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
  sliderHint,
  decimals = 0,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between mb-2 text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        <span>{label}</span>
        {sliderHint && (
          <span style={{ color: 'var(--color-text-tertiary)' }}>{sliderHint}</span>
        )}
      </label>
      <div className="fc-input-row">
        <input
          id={id}
          type="number"
          inputMode={decimals > 0 ? 'decimal' : 'numeric'}
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="fc-number"
        />
        {suffix && <span className="fc-suffix">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fc-slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
}

function Row({
  label,
  value,
  hint,
  emphasis = false,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="fc-row" data-emphasis={emphasis || undefined}>
      <dt>
        {label}
        {hint && <span className="fc-row-hint">{hint}</span>}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
