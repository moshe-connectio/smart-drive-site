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
    <div className="rounded-xl p-6 mb-8" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">סינון רכבים</h2>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:text-blue-700 font-medium"
          >
            נקה סינונים
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-silver-300)' }}>
            חיפוש חופשי
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="חפש רכב..."
            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ background: 'var(--color-gray-300)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-silver-300)' }}>
            יצרן
          </label>
          <select
            id="brand"
            value={filters.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ background: 'var(--color-gray-300)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            <option value="">כל היצרנים</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="relative" ref={categoryDropdownRef}>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-silver-300)' }}>
            קטגוריה
          </label>
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center"
            style={{ background: 'var(--color-gray-300)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            <span>
              {filters.categories.length === 0
                ? 'בחר קטגוריות'
                : `${filters.categories.length} קטגוריות נבחרו`}
            </span>
            <span className="text-gray-500">▼</span>
          </button>

          {categoryOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-10" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
              <div className="p-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <input
                  type="text"
                  placeholder="חפש קטגוריה..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ background: 'var(--color-gray-300)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredCategories.length === 0 ? (
                  <div className="p-3 text-center text-sm" style={{ color: 'var(--color-gray-500)' }}>אין קטגוריות תואמות</div>
                ) : (
                  filteredCategories.map(category => (
                    <label
                      key={category}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                      style={{ color: 'var(--color-silver-300)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-gray-300)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 rounded border-gray-300 text-primary cursor-pointer"
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

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.brand && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(26, 101, 224, 0.15)', color: 'var(--color-primary)' }}>
              יצרן: {filters.brand}
              <button
                onClick={() => handleBrandChange('')}
                className="hover:text-blue-400"
              >
                ✕
              </button>
            </span>
          )}
          {filters.categories.map(category => (
            <span key={category} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(26, 101, 224, 0.15)', color: 'var(--color-primary)' }}>
              קטגוריה: {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="hover:text-blue-400"
              >
                ✕
              </button>
            </span>
          ))}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(26, 101, 224, 0.15)', color: 'var(--color-primary)' }}>
              חיפוש: {filters.searchQuery}
              <button
                onClick={() => handleSearchChange('')}
                className="hover:text-blue-400"
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
