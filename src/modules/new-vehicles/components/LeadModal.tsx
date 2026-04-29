'use client';

import { createPortal } from 'react-dom';
import { LeadForm } from '@modules/leads';

interface LeadModalProps {
  vehicleTitle: string;
  onClose: () => void;
}

/**
 * Portal-rendered lead-form modal used inside VehicleSpecifications.
 *
 * Caller is responsible for:
 * - Mounting only when open (the parent already gates with `isOpen && isMounted`)
 * - Wiring `useModal()` for ESC + body-scroll lock.
 */
export function LeadModal({ vehicleTitle, onClose }: LeadModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label="טופס קבלת הצעת מחיר"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'var(--color-overlay-black-50)' }}
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
          }}
        >
          <div className="min-w-0">
            <p className="font-bold text-lg leading-tight">קבלו הצעת מחיר</p>
            <p className="text-sm opacity-90 leading-tight truncate">
              {vehicleTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full overlay-action-btn shrink-0"
            aria-label="סגור טופס"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div style={{ background: 'var(--color-gray-100)' }}>
          <div className="p-5">
            <LeadForm
              formId="vehicle-inquiry"
              vehicleTitle={vehicleTitle}
              title=""
              showMessage
              showEmail
              submitLabel="שלח ונחזור אליך בהקדם"
              variant="minimal"
              onSuccess={onClose}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
