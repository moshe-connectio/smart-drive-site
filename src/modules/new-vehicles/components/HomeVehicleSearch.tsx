/**
 * HomeVehicleSearch
 * ──────────────────────────────────────────────────────────────────
 * Homepage new-vehicle search:
 *   • Free-text query (manufacturer / model / trim)
 *   • Category filter (body type)
 *   • Dual-thumb slider for monthly payment (₪)
 *
 * Form state (the user's edits) is decoupled from "applied" state
 * (the filter that actually drives the result list). Results render
 * only after the user presses "חיפוש".
 *
 * Logic + state lives in `useVehicleSearch`. UI primitives are split
 * across `MonthlyPaymentSlider` and `SearchResults`.
 */

'use client';

import type { TrimLevelFullInfo } from '../types';
import {
  PAGE_SIZE,
  SLIDER_STEP,
  useVehicleSearch,
} from '../hooks/useVehicleSearch';
import { MonthlyPaymentSlider } from './MonthlyPaymentSlider';
import { SearchResults } from './SearchResults';

interface HomeVehicleSearchProps {
  trims: TrimLevelFullInfo[];
}

export function HomeVehicleSearch({ trims }: HomeVehicleSearchProps) {
  const {
    domainMin,
    domainMax,
    categories,
    query,
    setQuery,
    category,
    setCategory,
    minMonthly,
    maxMonthly,
    handleMinChange,
    handleMaxChange,
    activeThumb,
    setActiveThumb,
    applied,
    formTouched,
    handleSearch,
    handleReset,
    results,
    visibleResults,
    remaining,
    loadMore,
  } = useVehicleSearch(trims);

  return (
    <div className="home-search">
      <form
        className="home-search-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        role="search"
        aria-label="חיפוש רכבים חדשים"
      >
        <div className="home-search-grid">
          <div className="home-search-field-stack">
            <label className="home-search-field home-search-field--query">
              <span className="home-search-label">חיפוש</span>
              <span className="home-search-input-wrap">
                <svg
                  className="home-search-input-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 20l-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="יצרן, דגם או רמת גימור"
                  className="home-search-input"
                  inputMode="search"
                  aria-label="חיפוש לפי יצרן, דגם או רמת גימור"
                />
              </span>
            </label>

            {categories.length > 0 && (
              <label className="home-search-field home-search-field--category">
                <span className="home-search-label">קטגוריה</span>
                <span className="home-search-select-wrap">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`home-search-select${category ? ' is-selected' : ''}`}
                    aria-label="סינון לפי קטגוריה"
                  >
                    <option value="">כל הקטגוריות</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="home-search-select-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
            )}
          </div>

          <MonthlyPaymentSlider
            domainMin={domainMin}
            domainMax={domainMax}
            step={SLIDER_STEP}
            minValue={minMonthly}
            maxValue={maxMonthly}
            activeThumb={activeThumb}
            onMinChange={handleMinChange}
            onMaxChange={handleMaxChange}
            onActiveThumbChange={setActiveThumb}
          />
        </div>

        <div className="home-search-actions">
          <div className="home-search-actions-info">
            {applied ? (
              <span className="home-search-count">
                {results.length === 0
                  ? 'לא נמצאו רכבים תואמים לחיפוש'
                  : `נמצאו ${results.length} רכבים תואמים`}
              </span>
            ) : (
              <span className="home-search-hint">
                ניתן לחפש לפי טקסט, לפי טווח החזר חודשי, או לשלב — ולחוץ ”חיפוש”.
              </span>
            )}
          </div>

          <div className="home-search-actions-buttons">
            {(applied || formTouched) && (
              <button
                type="button"
                onClick={handleReset}
                className="home-search-reset"
              >
                איפוס
              </button>
            )}
            <button type="submit" className="home-search-submit">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              חיפוש
            </button>
          </div>
        </div>
      </form>

      {applied &&
        (results.length === 0 ? (
          <div className="home-search-empty">
            <p className="home-search-empty-title">
              לא נמצאו תוצאות לחיפוש זה
            </p>
            <p className="home-search-empty-sub">
              נסו להרחיב את טווח ההחזר החודשי או לפנות אלינו לייעוץ אישי.
            </p>
          </div>
        ) : (
          <SearchResults
            visibleResults={visibleResults}
            remaining={remaining}
            pageSize={PAGE_SIZE}
            onLoadMore={loadMore}
          />
        ))}
    </div>
  );
}

export default HomeVehicleSearch;
