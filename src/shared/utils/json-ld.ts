/**
 * Serialize a value for safe embedding inside a `<script type="application/ld+json">`
 * tag via `dangerouslySetInnerHTML`.
 *
 * `JSON.stringify` alone does NOT escape characters that can break out of a
 * script context (e.g. `</script>`). This escapes `<`, `>`, `&` and the U+2028 /
 * U+2029 line separators so the payload can never terminate the script element
 * or inject markup — closing the XSS vector while keeping valid JSON.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
