/**
 * Shared blur placeholder for <Image placeholder="blur" />.
 *
 * Remote images (Supabase / CRM hosts) can't have a build-time generated
 * blurDataURL, so we ship a tiny inline SVG shimmer. It renders instantly while
 * the optimized AVIF/WebP is fetched, giving a smooth "fade-in" instead of a
 * blank box — the professional loading feel users expect.
 */

// A soft, neutral gradient that matches the card background tone.
const shimmer = `
<svg width="8" height="6" viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e9edf3" />
      <stop offset="50%" stop-color="#dfe4ec" />
      <stop offset="100%" stop-color="#e9edf3" />
    </linearGradient>
  </defs>
  <rect width="8" height="6" fill="url(#g)" />
</svg>`;

const toBase64 = (str: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/** Inline blur placeholder data URL, safe for both server and client render. */
export const BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmer)}`;
