'use client';

import { useState, useEffect, useRef } from 'react';

interface VehicleFiltersProps {
  brands: string[];
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  brand: string;
  categories: string[];
  searchQuery: string;
}

export function VehicleFilters({ brands, categories, onFilterChange }: VehicleFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    categories: [],
    searchQuery: '',
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({ ...prev, brand }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSearchChange = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const handleReset = () => {
    setFilters({ brand: '', categories: [], searchQuery: '' });
    setCategorySearch('');
  };

  const hasActiveFilters = filters.brand || filters.categories.length > 0 || filters.searchQuery;

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div
      className="rounded-2xl mb-8"
      style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
    >
      {/* Filter Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-background-secondary)' }}
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--color-gray-700)' }}>סינון רכבים</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
            style={{ color: 'var(--color-primary)', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}
          >
            נקה הכל
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-gray-500)' }}>
              חיפוש
            </label>
            <div className="relative">
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--color-gray-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="חפש לפי שם, דגם, שנה..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl text-sm transition-all outline-none"
                style={{
                  background: 'var(--color-background)',
                  border: '1.5px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label htmlFor="brand" className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-gray-500)' }}>
              יצרן
            </label>
            <div className="relative">
              <select
                id="brand"
                value={filters.brand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm appearance-none outline-none transition-all cursor-pointer"
                style={{
                  background: 'var(--color-background)',
                  border: filters.brand ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                  color: filters.brand ? 'var(--color-gray-900)' : 'var(--color-gray-500)',
                }}
              >
                <option value="">כל היצרנים</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--color-gray-400)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className={`relative${categoryOpen ? ' z-50' : ''}`} ref={categoryDropdownRef}>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-gray-500)' }}>
              קטגוריה
            </label>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full px-4 py-2.5 rounded-xl text-sm flex justify-between items-center transition-all outline-none cursor-pointer"
              style={{
                background: 'var(--color-background)',
                border: filters.categories.length > 0 ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                color: filters.categories.length > 0 ? 'var(--color-gray-900)' : 'var(--color-gray-500)',
              }}
            >
              <span>
                {filters.categories.length === 0
                  ? 'כל הקטגוריות'
                  : filters.categories.length === 1
                  ? filters.categories[0]
                  : `${filters.categories.length} קטגוריות נבחרו`}
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-200 shrink-0"
                style={{
                  color: 'var(--color-gray-400)',
                  transform: categoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {categoryOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-1 rounded-xl z-50 overflow-hidden"
                style={{ background: 'var(--color-card-bg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
              >
                <div className="p-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <input
                    type="text"
                    placeholder="חפש קטגוריה..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{
                      background: 'var(--color-background-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-52 overflow-y-auto py-1">
                  {filteredCategories.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-center" style={{ color: 'var(--color-gray-400)' }}>אין קטגוריות תואמות</div>
                  ) : (
                    filteredCategories.map(category => (
                      <label
                        key={category}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                        style={{ color: 'var(--color-gray-700)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-background-secondary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="px-6 pb-5 flex flex-wrap gap-2">
          {filters.brand && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-100)' }}
            >
              יצרן: {filters.brand}
              <button
                onClick={() => handleBrandChange('')}
                className="hover:opacity-70 transition-opacity leading-none"
                aria-label="הסר סינון יצרן"
              >
                ✕
              </button>
            </span>
          )}
          {filters.categories.map(category => (
            <span
              key={category}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-100)' }}
            >
              {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="hover:opacity-70 transition-opacity leading-none"
                aria-label="הסר קטגוריה"
              >
                ✕
              </button>
            </span>
          ))}
          {filters.searchQuery && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-100)' }}
            >
              חיפוש: {filters.searchQuery}
              <button
                onClick={() => handleSearchChange('')}
                className="hover:opacity-70 transition-opacity leading-none"
                aria-label="נקה חיפוש"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
