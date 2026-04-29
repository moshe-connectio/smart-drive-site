'use client';

import { useEffect, useState } from 'react';

export interface CookieConsent {
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent';
export const COOKIE_CONSENT_EVENT = 'cookie-consent-changed';

export function readConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CookieConsent;

    // Backward compatibility: migrate old session-scoped consent.
    const legacy = sessionStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as CookieConsent;
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, legacy);
      sessionStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      return parsed;
    }
  } catch {
    /* swallow malformed JSON / unavailable storage */
  }
  return null;
}

export function writeConsent(consent: CookieConsent): void {
  try {
    const serialized = JSON.stringify(consent);
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
    // Cookie fallback (1y) for environments restricting localStorage.
    document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.dispatchEvent(
      new CustomEvent<CookieConsent>(COOKIE_CONSENT_EVENT, { detail: consent }),
    );
  } catch {
    /* ignore */
  }
}

/**
 * React hook that returns the current cookie consent.
 *
 * - Returns `undefined` until the first client-side read completes (SSR-safe).
 * - Returns `null` when the user hasn't made a choice yet.
 * - Updates reactively when consent is saved (same tab via custom event,
 *   other tabs via the `storage` event).
 */
export function useCookieConsent(): CookieConsent | null | undefined {
  const [consent, setConsent] = useState<CookieConsent | null | undefined>(
    undefined,
  );

  useEffect(() => {
    // Sync with external state (localStorage) — this is the canonical
    // useEffect use case per React docs. The setState here cannot be
    // moved to render because localStorage is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());

    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsent>).detail;
      if (detail) setConsent(detail);
      else setConsent(readConsent());
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_STORAGE_KEY) setConsent(readConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return consent;
}
