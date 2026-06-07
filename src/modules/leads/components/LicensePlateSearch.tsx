'use client';

/**
 * LicensePlateSearch
 *
 * Section component used on /trade-in: lets visitors enter their Israeli
 * license plate and pulls live data from data.gov.il via /api/vehicle-lookup.
 *
 * On success, displays a clean specs card. The user can then open a lead
 * modal pre-populated with the vehicle title — making the form feel
 * effortless ("רכב שלי" already filled).
 */

import { useState, useCallback, useRef } from 'react';
import { LeadForm, LeadFormModal } from '@modules/leads';

type LookupResult = {
  plate: string;
  category: 'active' | 'inactive' | 'commercial' | 'motorcycle' | 'personal-import';
  categoryLabel: string;
  manufacturer: string;
  model: string;
  trimLevel: string;
  year: string;
  color: string;
  fuelType: string;
  modelType: string;
  chassisNumber: string;
  testValidUntil: string;
  ownershipType: string;
  originality: string;
  transmission: string;
  engineSize: string;
  horsepower: string;
  ownershipHistory: Array<{ date: string; owner: string }>;
};

function formatPlate(plate: string): string {
  // Israeli plate visual format:
  //   8 digits → 000-00-000  (post-2017 / new format)
  //   7 digits → 00-000-00   (legacy format)
  if (plate.length === 8) return `${plate.slice(0, 3)}-${plate.slice(3, 5)}-${plate.slice(5)}`;
  if (plate.length === 7) return `${plate.slice(0, 2)}-${plate.slice(2, 5)}-${plate.slice(5)}`;
  return plate;
}

function buildVehicleTitle(r: LookupResult): string {
  const parts = [r.manufacturer, r.model, r.year && `(${r.year})`].filter(Boolean);
  return parts.join(' ');
}

export function LicensePlateSearch() {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const cleaned = plate.replace(/\D/g, '');
      if (cleaned.length < 7 || cleaned.length > 8) {
        setError('יש להזין מספר רישוי בן 7 או 8 ספרות');
        return;
      }

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch(`/api/vehicle-lookup?plate=${encodeURIComponent(cleaned)}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        const data: LookupResult | { error: string } = await res.json();
        if (!res.ok) {
          setError(('error' in data && data.error) || 'אירעה שגיאה. נסו שוב.');
          return;
        }
        setResult(data as LookupResult);
        // Smoothly scroll the result into view
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } catch {
        setError('אירעה שגיאת רשת. בדקו את החיבור ונסו שוב.');
      } finally {
        setLoading(false);
      }
    },
    [plate],
  );

  return (
    <section className="home-soft-section py-16 sm:py-20" aria-labelledby="plate-search-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="home-section-kicker">בדיקה מהירה</p>
          <h2 id="plate-search-title" className="home-section-title">
            מה השווי של הרכב שלכם?
          </h2>
          <p className="home-section-subtitle">
            הזינו מספר רישוי ונציג מערכות הרישוי הממשלתיות (data.gov.il) — נחזיר מיד את פרטי הרכב,
            ותוכלו לקבל הערכה ראשונית בלחיצת כפתור.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          className="plate-search-form"
          noValidate
          aria-busy={loading}
          aria-describedby="plate-search-hint"
        >
          <div className="plate-search-input-wrap">
            <span className="plate-search-flag" aria-hidden="true">
              IL
            </span>
            <label htmlFor="plate-search-input" className="sr-only">
              מספר רישוי (7 או 8 ספרות)
            </label>
            <input
              id="plate-search-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              maxLength={9}
              value={plate}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 8);
                setPlate(v);
              }}
              placeholder="12345678"
              aria-label="מספר רישוי"
              aria-invalid={Boolean(error)}
              className="plate-search-input"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="plate-search-submit"
            disabled={loading || plate.length < 7}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                מחפש...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                בדיקה
              </>
            )}
          </button>
        </form>

        <p className="plate-search-hint" id="plate-search-hint">
          המידע נשלף ישירות ממאגרי משרד התחבורה. אנחנו לא שומרים את מספר הרישוי שלכם.
        </p>

        {/* Live region for screen readers — announces async state changes */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {loading && 'טוען פרטי רכב...'}
          {result && !loading && `נמצאו פרטים למספר רישוי ${result.plate}: ${buildVehicleTitle(result)}`}
          {error && !loading && `שגיאה: ${error}`}
        </div>

        {/* Error */}
        {error && (
          <div role="alert" className="plate-search-error">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div ref={resultRef} className="plate-result-card">
            {/* Header */}
            <div className="plate-result-header">
              <div>
                <span className="plate-result-tag">{result.categoryLabel}</span>
                <h3 className="plate-result-title">{buildVehicleTitle(result)}</h3>
                {result.trimLevel && (
                  <p className="plate-result-trim">{result.trimLevel}</p>
                )}
              </div>

              <div className="plate-result-plate" aria-label="מספר רישוי">
                <span className="plate-result-plate-flag">IL</span>
                <span className="plate-result-plate-num">{formatPlate(result.plate)}</span>
              </div>
            </div>

            {/* Specs grid */}
            <dl className="plate-result-grid">
              {result.year && <SpecItem label="שנת ייצור" value={result.year} />}
              {result.color && <SpecItem label="צבע" value={result.color} />}
              {result.fuelType && <SpecItem label="סוג דלק" value={result.fuelType} />}
              {result.transmission && <SpecItem label="תיבת הילוכים" value={result.transmission} />}
              {result.engineSize && <SpecItem label="נפח מנוע" value={`${result.engineSize} סמ״ק`} />}
              {result.horsepower && <SpecItem label="כוח סוס" value={`${result.horsepower} כ״ס`} />}
              {result.modelType && <SpecItem label="סוג רכב" value={result.modelType} />}
              {result.ownershipType && <SpecItem label="בעלות נוכחית" value={result.ownershipType} />}
              {result.originality && <SpecItem label="בעלות מקורית" value={result.originality} />}
              {result.testValidUntil && (
                <SpecItem label="טסט בתוקף עד" value={result.testValidUntil} />
              )}
              {result.chassisNumber && (
                <SpecItem label="מספר שלדה" value={result.chassisNumber} mono />
              )}
            </dl>

            {/* Ownership history */}
            {result.ownershipHistory.length > 0 && (
              <div className="plate-result-history">
                <h4 className="plate-result-history-title">היסטוריית בעלות</h4>
                <ul className="plate-result-history-list">
                  {result.ownershipHistory.map((h, i) => (
                    <li key={i}>
                      <span className="plate-result-history-date">{h.date || '—'}</span>
                      <span className="plate-result-history-owner">{h.owner || '—'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="plate-result-cta-row">
              <button
                type="button"
                onClick={() => setShowLeadModal(true)}
                className="plate-result-cta"
              >
                קבלת הערכה לרכב הזה
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setPlate('');
                }}
                className="plate-result-reset"
              >
                בדיקת רכב נוסף
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lead modal — pre-populated with vehicle title */}
      {showLeadModal && result && (
        <LeadFormModal
          title="קבלת הערכה לרכב"
          subtitle={buildVehicleTitle(result)}
          ariaLabel="טופס הערכת רכב"
          onClose={() => setShowLeadModal(false)}
        >
          <LeadForm
            formId="trade-in"
            vehicleTitle={`${buildVehicleTitle(result)} — מס׳ רישוי ${formatPlate(result.plate)}`}
            title=""
            showMessage
            showEmail
            submitLabel="שלחו לי הערכה ראשונית"
            variant="minimal"
            onSuccess={() => setShowLeadModal(false)}
          />
        </LeadFormModal>
      )}
    </section>
  );
}

/* ─── Tiny presentational helper ──────────────────────────────────── */
function SpecItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="plate-spec">
      <dt className="plate-spec-label">{label}</dt>
      <dd className={`plate-spec-value${mono ? ' plate-spec-value--mono' : ''}`}>{value}</dd>
    </div>
  );
}
