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

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ManufacturerWithCounts, TrimLevelFullInfo } from '../types';
import {
  PAGE_SIZE,
  SLIDER_STEP,
  useVehicleSearch,
} from '../hooks/useVehicleSearch';
import {
  formatCategoryLabel,
  getCategorySearchTerms,
} from '../lib/categories';
import { resolveManufacturerLogo } from '../lib/constants';
import { MonthlyPaymentSlider } from './MonthlyPaymentSlider';
import { SearchResults } from './SearchResults';

interface HomeVehicleSearchProps {
  trims: TrimLevelFullInfo[];
  manufacturers: ManufacturerWithCounts[];
}

export function HomeVehicleSearch({ trims, manufacturers }: HomeVehicleSearchProps) {
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
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
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

  const filteredCategories = categories.filter((cat) => {
    const search = categorySearch.toLocaleLowerCase('he');
    return [cat, formatCategoryLabel(cat), ...getCategorySearchTerms(cat)].some(
      (term) => term.toLocaleLowerCase('he').includes(search),
    );
  });

  const categoryLabel =
    selectedCategories.length === 0
      ? 'כל סוגי הרכב'
      : selectedCategories.length === 1
      ? formatCategoryLabel(selectedCategories[0])
      : `${selectedCategories.length} סוגי רכב נבחרו`;

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('he');
    const letterCount = normalizedQuery.match(/\p{L}/gu)?.length ?? 0;
    if (letterCount < 1) return [];

    const matchingManufacturers = manufacturers.filter((manufacturer) =>
      manufacturer.name.toLocaleLowerCase('he').startsWith(normalizedQuery),
    );
    return letterCount === 1
      ? matchingManufacturers.slice(0, 8)
      : matchingManufacturers;
  }, [query, manufacturers]);

  const chooseSuggestion = (manufacturer: ManufacturerWithCounts) => {
    const selectedQuery = manufacturer.name;
    setQuery(selectedQuery);
    setSuggestionsOpen(false);
    handleSearch(selectedQuery);
  };

  return (
    <div className="home-search">
      <form
        className="home-search-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        role="search"
        aria-label="חיפוש רכב חדש"
      >
        <div className="home-search-grid">
          <div className="home-search-field-stack">
            <div className="home-search-query-area">
              <label className="home-search-field home-search-field--query">
                <span className="home-search-label">יצרן</span>
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
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSuggestionsOpen(true);
                    }}
                    onFocus={() => setSuggestionsOpen(true)}
                    placeholder="הקלידו אות או שם יצרן מלא"
                    className="home-search-input"
                    inputMode="search"
                    aria-label="חיפוש לפי יצרן"
                    aria-expanded={suggestionsOpen && suggestions.length > 0}
                    aria-controls="home-search-suggestions"
                  />
                </span>
              </label>

              {suggestionsOpen && suggestions.length > 0 && (
                <div
                  id="home-search-suggestions"
                  className="home-search-suggestions"
                  role="listbox"
                  aria-label="יצרנים תואמים"
                >
                  {suggestions.map((manufacturer) => {
                    const logo = resolveManufacturerLogo(manufacturer);
                    return (
                      <button
                        key={manufacturer.id}
                        type="button"
                        className="home-search-suggestion"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => chooseSuggestion(manufacturer)}
                        role="option"
                      >
                        <span className="home-search-suggestion-media">
                          {logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={logo}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                            />
                          ) : (
                            <span aria-hidden="true">יצרן</span>
                          )}
                        </span>
                        <span className="home-search-suggestion-copy">
                          <strong>יצרן</strong>
                          <span>{manufacturer.name}</span>
                          <small>{manufacturer.models_count} דגמים</small>
                        </span>
                        <span className="home-search-suggestion-arrow" aria-hidden="true">
                          ←
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {categories.length > 0 && (
              <div
                className={`home-search-field home-search-field--category${
                  categoryOpen ? ' is-open' : ''
                }`}
                ref={categoryRef}
              >
                <span className="home-search-label">סוג רכב</span>
                <div className="home-search-multiselect">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen((o) => !o)}
                    className={`home-search-multiselect-trigger${
                      selectedCategories.length > 0 ? ' is-selected' : ''
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={categoryOpen}
                    aria-label="בחירת סוג רכב"
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
                          placeholder="חיפוש לפי סוג רכב..."
                          className="home-search-multiselect-search"
                          aria-label="חיפוש לפי סוג רכב"
                        />
                      </div>
                      <div className="home-search-multiselect-list">
                        {filteredCategories.length === 0 ? (
                          <p className="home-search-multiselect-empty">
                            לא נמצאו סוגי רכב תואמים
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
                              <span>{formatCategoryLabel(cat)}</span>
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
                  ? 'לא נמצאו רכבים שמתאימים לבחירה'
                  : `נמצאו ${results.length} רכבים מתאימים`}
              </span>
            ) : (
              <span className="home-search-hint">
                בחרו את מה שחשוב לכם ולחצו על חיפוש.
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
                ניקוי הבחירה
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
              הצגת תוצאות
            </button>
          </div>
        </div>
      </form>

      {applied &&
        (results.length === 0 ? (
          <div className="home-search-empty">
            <p className="home-search-empty-title">
              לא מצאנו רכבים שמתאימים לבחירה
            </p>
            <p className="home-search-empty-sub">
              נסו לשנות את סוג הרכב או להרחיב את טווח ההחזר החודשי.
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
