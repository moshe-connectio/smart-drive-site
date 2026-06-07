'use client';

import { forwardRef, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface LeadFormModalProps {
  /** Heading shown in the colored header bar */
  title: string;
  /** Optional sub-line under the title (truncated to a single line) */
  subtitle?: ReactNode;
  /** Close handler for both the backdrop and the close button */
  onClose: () => void;
  /** Accessible label for the dialog when no `titleId` is supplied */
  ariaLabel?: string;
  /** id of the title element, wired to `aria-labelledby` */
  titleId?: string;
  /** Body content (typically a <LeadForm /> plus optional summary) */
  children: ReactNode;
}

/**
 * Shared visual shell for every lead-form modal in the site.
 *
 * Guarantees a single, consistent layout: blurred backdrop, bottom-sheet on
 * mobile / centered card on desktop, a primary-colored header (title +
 * single-line truncated subtitle + fixed-size close button) and a scrollable
 * gray body. Callers remain responsible for mount/unmount gating and any
 * ESC / focus-trap / scroll-lock behavior (e.g. via `useModal`). The close
 * button ref is forwarded so callers can manage focus.
 *
 * Rendered through a portal on <body> so it always escapes any transformed or
 * `overflow`-clipped ancestor (otherwise `position: fixed` would be trapped).
 */
export const LeadFormModal = forwardRef<HTMLButtonElement, LeadFormModalProps>(
  function LeadFormModal({ title, subtitle, onClose, ariaLabel, titleId, children }, closeRef) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      // Portals require `document`, which is unavailable during SSR. Flip the
      // flag once mounted on the client so the first paint stays consistent.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={titleId ? undefined : ariaLabel}
        aria-labelledby={titleId}
      >
        <button
          type="button"
          aria-label="סגור טופס"
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'var(--color-overlay-black-50)', border: 0, padding: 0 }}
          onClick={onClose}
        />

        <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
          <div
            className="flex items-start justify-between gap-3 px-5 py-4 shrink-0"
            style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
          >
            <div className="min-w-0">
              <p id={titleId} className="font-bold text-lg leading-tight">
                {title}
              </p>
              {subtitle && (
                <p className="text-sm opacity-90 leading-tight truncate">{subtitle}</p>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full overlay-action-btn shrink-0"
              aria-label="סגור טופס"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto" style={{ background: 'var(--color-gray-100)' }}>
            <div className="p-5">{children}</div>
          </div>
        </div>
      </div>,
      document.body,
    );
  },
);
