/**
 * Centralized logger.
 *
 * Behaviour
 * ─────────
 *   • Server (Node / Edge):
 *       - production → only `error` and `warn` reach the runtime log
 *         (Vercel captures these for debugging incidents).
 *       - dev → everything goes through.
 *   • Browser:
 *       - production → completely silent (no leaking internals to users).
 *       - dev → everything goes through.
 *
 * Usage:
 *   import { logger } from '@core/lib/logger';
 *   logger.error('failed to load vehicles:', err);
 *
 * Always prefer the logger over direct `console.*` calls in `src/`.
 * The `no-console` ESLint rule enforces this.
 */

const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = typeof window !== 'undefined';

type Level = 'error' | 'warn' | 'info' | 'debug';

function emit(level: Level, args: unknown[]): void {
  // Hide everything in the browser console in production.
  if (isBrowser && isProduction) return;

  // On the server in production, drop info/debug to keep logs lean.
  if (!isBrowser && isProduction && (level === 'info' || level === 'debug')) return;

  // eslint-disable-next-line no-console
  console[level](...args);
}

export const logger = {
  error: (...args: unknown[]) => emit('error', args),
  warn: (...args: unknown[]) => emit('warn', args),
  info: (...args: unknown[]) => emit('info', args),
  debug: (...args: unknown[]) => emit('debug', args),
};
