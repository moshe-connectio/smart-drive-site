/**
 * Category (body_type) helpers.
 *
 * `body_type` may be stored in several historical formats:
 *   • a JSON-encoded array string  →  '["SUV","Sedan"]'
 *   • a real array                 →  ["SUV","Sedan"]
 *   • a delimited string           →  "SUV, Sedan"  /  "SUV;Sedan"  /  "SUV|Sedan"
 *   • a single label               →  "SUV"
 *   • null / empty                 →  no categories
 *
 * `parseCategories` returns a clean, deduped, trimmed list.
 * `formatCategories` returns a human-readable string for UI display.
 */

export function parseCategories(value: unknown): string[] {
  if (value == null) return [];
  const seen = new Set<string>();
  const push = (s: string) => {
    const t = s.trim();
    if (t) seen.add(t);
  };

  if (Array.isArray(value)) {
    for (const item of value) if (typeof item === 'string') push(item);
    return Array.from(seen);
  }

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) return [];
    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (const item of parsed) if (typeof item === 'string') push(item);
          return Array.from(seen);
        }
      } catch {
        /* fall through to delimiter split */
      }
    }
    for (const part of raw.split(/[,;|]/)) push(part);
    return Array.from(seen);
  }

  return [];
}

export const BODY_TYPE_LABELS: Record<string, string> = {
  Sedan: 'סדאן / Sedan',
  SUV: 'SUV / רכב פנאי',
  Coupe: 'קופה / Coupe',
  Hatchback: 'האצ׳בק / Hatchback',
  'Station Wagon': 'סטיישן / Station Wagon',
  Crossover: 'קרוסאובר / Crossover',
  Minivan: 'מיני־ואן / Minivan',
  MPV: 'מיניוואן / MPV',
  Pickup: 'טנדר / Pickup',
  Convertible: 'קבריולה / Convertible',
  Roadster: 'רודסטר / Roadster',
  Van: 'ואן / Van',
};

const BODY_TYPE_ALIASES: Record<string, string[]> = {
  Sedan: ['sedan', 'סדאן'],
  SUV: ['suv', 'רכב פנאי', 'ג׳יפון', "ג'יפון"],
  Coupe: ['coupe', 'קופה'],
  Hatchback: ['hatchback', 'האצ׳בק', "האצ'בק"],
  'Station Wagon': ['station wagon', 'סטיישן'],
  Crossover: ['crossover', 'קרוסאובר'],
  Minivan: ['minivan', 'מיני ואן', 'מיני־ואן'],
  MPV: ['mpv', 'מיניוואן'],
  Pickup: ['pickup', 'טנדר'],
  Convertible: ['convertible', 'קבריולה'],
  Roadster: ['roadster', 'רודסטר'],
  Van: ['van', 'ואן'],
};

export function formatCategoryLabel(category: string): string {
  return BODY_TYPE_LABELS[category] ?? category;
}

export function getCategorySearchTerms(category: string): string[] {
  return BODY_TYPE_ALIASES[category] ?? [category];
}

/** Join a body_type value for display (e.g. "SUV • Sedan"). */
export function formatCategories(
  value: unknown,
  separator: string = ' • '
): string {
  return parseCategories(value).join(separator);
}
