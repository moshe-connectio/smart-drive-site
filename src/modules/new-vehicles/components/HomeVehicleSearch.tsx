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

import { useEffect, useRef, useState } from 'react';
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
    selectedCategories,
    toggleCategory,
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

  // Category multi-select dropdown (matches the inventory filter UX).
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoryOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoryOpen]);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const categoryLabel =
    selectedCategories.length === 0
      ? 'כל הקטגוריות'
      : selectedCategories.length === 1
      ? selectedCategories[0]
      : `${selectedCategories.length} קטגוריות נבחרו`;

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
              <div
                className={`home-search-field home-search-field--category${
                  categoryOpen ? ' is-open' : ''
                }`}
                ref={categoryRef}
              >
                <span className="home-search-label">קטגוריה</span>
                <div className="home-search-multiselect">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen((o) => !o)}
                    className={`home-search-multiselect-trigger${
                      selectedCategories.length > 0 ? ' is-selected' : ''
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={categoryOpen}
                    aria-label="סינון לפי קטגוריה"
                  >
                    <span className="home-search-multiselect-value">
                      {categoryLabel}
                    </span>
                    <svg
                      className="home-search-select-icon home-search-multiselect-chevron"
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
                  </button>

                  {categoryOpen && (
                    <div className="home-search-multiselect-panel" role="listbox">
                      <div className="home-search-multiselect-search-wrap">
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          placeholder="חפש קטגוריה..."
                          className="home-search-multiselect-search"
                          aria-label="חיפוש קטגוריה"
                        />
                      </div>
                      <div className="home-search-multiselect-list">
                        {filteredCategories.length === 0 ? (
                          <p className="home-search-multiselect-empty">
                            אין קטגוריות תואמות
                          </p>
                        ) : (
                          filteredCategories.map((cat) => (
                            <label
                              key={cat}
                              className="home-search-multiselect-option"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                              />
                              <span>{cat}</span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
