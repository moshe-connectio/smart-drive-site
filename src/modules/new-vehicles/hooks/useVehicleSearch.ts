'use client';

import { useMemo, useState } from 'react';
import type { TrimLevelFullInfo } from '../types';
import { parseCategories } from '../lib/categories';
import { clampStep, toMonthly } from '../lib/searchUtils';

export const PAGE_SIZE = 3;
export const SLIDER_STEP = 100;

interface AppliedFilters {
  query: string;
  categories: string[];
  min: number;
  max: number;
  /** True when the slider was narrower than the domain at submit time. */
  priceFilterActive: boolean;
}

export type ActiveThumb = 'min' | 'max' | null;

export function useVehicleSearch(trims: TrimLevelFullInfo[]) {
  // ── Domain (min/max monthly payment) ───────────────────────────────
  const { domainMin, domainMax } = useMemo(() => {
    const values: number[] = [];
    for (const t of trims) {
      const v = toMonthly(t.monthly_payment);
      if (v !== null) values.push(v);
    }
    if (values.length === 0) return { domainMin: 0, domainMax: 10_000 };
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const min = Math.floor(rawMin / SLIDER_STEP) * SLIDER_STEP;
    const max = Math.ceil(rawMax / SLIDER_STEP) * SLIDER_STEP;
    return {
      domainMin: min,
      domainMax: max === min ? min + SLIDER_STEP : max,
    };
  }, [trims]);

  // ── Form state ─────────────────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minMonthly, setMinMonthly] = useState(domainMin);
  const [maxMonthly, setMaxMonthly] = useState(domainMax);
  const [activeThumb, setActiveThumb] = useState<ActiveThumb>(null);

  // ── Available categories from the data ─────────────────────────────
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const t of trims) {
      for (const c of parseCategories(t.model_body_type)) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'he'));
  }, [trims]);

  // ── Applied state ──────────────────────────────────────────────────
  const [applied, setApplied] = useState<AppliedFilters | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Once the user has run an initial search, the form filters apply live so
  // changing any field updates the results without re-clicking "search".
  const [liveActive, setLiveActive] = useState(false);

  // Sync slider bounds when the underlying domain changes (data refresh).
  // Uses the "reset state during render" pattern to avoid `setState` inside
  // `useEffect` (which causes cascading renders per React 19 guidance).
  const [prevDomain, setPrevDomain] = useState({
    min: domainMin,
    max: domainMax,
  });
  if (prevDomain.min !== domainMin || prevDomain.max !== domainMax) {
    setPrevDomain({ min: domainMin, max: domainMax });
    setMinMonthly(domainMin);
    setMaxMonthly(domainMax);
  }

  // Stable key for the selected-categories array so the render-time live-sync
  // can compare it cheaply (the array reference changes on every toggle).
  const categoriesKey = selectedCategories.join('\u0001');

  const formTouched =
    query.trim().length > 0 ||
    selectedCategories.length > 0 ||
    minMonthly !== domainMin ||
    maxMonthly !== domainMax;

  /** Build the applied-filters snapshot from the current form state. */
  const buildApplied = (): AppliedFilters => {
    const lo = Math.min(minMonthly, maxMonthly);
    const hi = Math.max(minMonthly, maxMonthly);
    return {
      query: query.trim(),
      categories: selectedCategories,
      min: lo,
      max: hi,
      priceFilterActive: lo !== domainMin || hi !== domainMax,
    };
  };

  // Live re-apply: after the first search, any change to the form fields
  // recomputes the results immediately (same render-time sync pattern).
  const [prevForm, setPrevForm] = useState({
    query,
    categoriesKey,
    minMonthly,
    maxMonthly,
  });
  if (
    liveActive &&
    (prevForm.query !== query ||
      prevForm.categoriesKey !== categoriesKey ||
      prevForm.minMonthly !== minMonthly ||
      prevForm.maxMonthly !== maxMonthly)
  ) {
    setPrevForm({ query, categoriesKey, minMonthly, maxMonthly });
    setApplied(buildApplied());
    setVisibleCount(PAGE_SIZE);
  }

  const handleSearch = () => {
    // Auto-correct an inverted range if it ever happens.
    const lo = Math.min(minMonthly, maxMonthly);
    const hi = Math.max(minMonthly, maxMonthly);
    setMinMonthly(lo);
    setMaxMonthly(hi);

    setApplied({
      query: query.trim(),
      categories: selectedCategories,
      min: lo,
      max: hi,
      priceFilterActive: lo !== domainMin || hi !== domainMax,
    });
    setVisibleCount(PAGE_SIZE);
    setLiveActive(true);
    setPrevForm({ query, categoriesKey, minMonthly: lo, maxMonthly: hi });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCategories([]);
    setMinMonthly(domainMin);
    setMaxMonthly(domainMax);
    setApplied(null);
    setVisibleCount(PAGE_SIZE);
    setLiveActive(false);
    setPrevForm({
      query: '',
      categoriesKey: '',
      minMonthly: domainMin,
      maxMonthly: domainMax,
    });
  };

  const handleMinChange = (raw: number) => {
    const next = clampStep(raw, SLIDER_STEP, domainMin, domainMax);
    setMinMonthly(Math.min(next, maxMonthly));
  };

  const handleMaxChange = (raw: number) => {
    const next = clampStep(raw, SLIDER_STEP, domainMin, domainMax);
    setMaxMonthly(Math.max(next, minMonthly));
  };

  // ── Filter + sort ─────────────────────────────────────────────────
  const results = useMemo(() => {
    if (!applied) return [];
    const q = applied.query.toLowerCase();
    const { min, max, priceFilterActive, categories: cats } = applied;

    const filtered = trims.filter((t) => {
      if (q) {
        const haystack = [t.manufacturer_name, t.model_name, t.model_name_he, t.name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (cats.length > 0) {
        const trimCats = parseCategories(t.model_body_type);
        if (!cats.some((c) => trimCats.includes(c))) return false;
      }

      const monthly = toMonthly(t.monthly_payment);

      if (priceFilterActive) {
        if (monthly == null) return false;
        return monthly >= min && monthly <= max;
      }
      return true;
    });

    return filtered.slice().sort((a, b) => {
      const av = toMonthly(a.monthly_payment);
      const bv = toMonthly(b.monthly_payment);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return av - bv;
    });
  }, [trims, applied]);

  const visibleResults = results.slice(0, visibleCount);
  const remaining = Math.max(0, results.length - visibleCount);

  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  return {
    // domain
    domainMin,
    domainMax,
    // categories
    categories,
    // form state
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
    // applied state
    applied,
    formTouched,
    handleSearch,
    handleReset,
    // results
    results,
    visibleResults,
    remaining,
    loadMore,
  };
}
