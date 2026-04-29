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

/** Join a body_type value for display (e.g. "SUV • Sedan"). */
export function formatCategories(
  value: unknown,
  separator: string = ' • '
): string {
  return parseCategories(value).join(separator);
}
