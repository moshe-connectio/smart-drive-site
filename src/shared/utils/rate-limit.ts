/**
 * Lightweight in-memory rate limiter.
 *
 * Tracks request timestamps per key (typically a client IP) inside a fixed
 * sliding window. This is a best-effort guard against spam/abuse on public
 * endpoints (e.g. lead submissions).
 *
 * NOTE: State lives in the module scope, so it is per-server-instance only.
 * On serverless platforms (Vercel) each instance keeps its own counters, which
 * still raises the bar for abuse but is not a globally consistent limiter.
 * For strict guarantees, back this with a shared store (e.g. Upstash Redis).
 */

type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();
let lastPruneAt = 0;

export interface RateLimitResult {
  /** Whether the request is allowed (within the limit). */
  allowed: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** Seconds until the window resets (useful for Retry-After). */
  retryAfter: number;
}

/**
 * Apply a sliding-window rate limit for the given key.
 *
 * @param key       Unique identifier for the client (e.g. IP address).
 * @param limit     Max requests allowed within the window.
 * @param windowMs  Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  // Keep attacker-controlled keys from growing this best-effort store forever.
  if (now - lastPruneAt > windowMs) {
    for (const [storedKey, hit] of store) {
      if (now >= hit.resetAt) store.delete(storedKey);
    }
    lastPruneAt = now;
  }

  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    retryAfter: 0,
  };
}

/**
 * Best-effort extraction of the client IP from a request, honoring the common
 * proxy headers set by Vercel / standard reverse proxies.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // The first entry is the original client.
    return forwarded.split(',')[0]!.trim();
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
