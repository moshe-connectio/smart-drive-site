'use client';

import { useState } from 'react';
import { LeadForm } from '@modules/leads';
import type { LeadFormId } from '@modules/leads';

interface LeadModalButtonProps {
  formId?: LeadFormId;
  buttonLabel?: string;
  /** 'primary' = filled blue, 'gold' = gold gradient, 'outline' = bordered */
  variant?: 'primary' | 'gold' | 'outline';
  className?: string;
}

export function LeadModalButton({
  formId = 'general',
  buttonLabel = 'השאר פרטים',
  variant = 'primary',
  className = '',
}: LeadModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle =
    variant === 'gold'
      ? { background: 'var(--color-primary)', color: 'var(--color-text-inverse)', boxShadow: 'var(--shadow-primary-cta)' }
      : variant === 'outline'
      ? { border: '2px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent' }
      : { background: 'var(--color-primary)', color: 'var(--color-text-inverse)', boxShadow: 'var(--shadow-primary-soft)' };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 hover:scale-105 hover:opacity-90 ${className}`}
        style={buttonStyle}
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="טופס יצירת קשר"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'var(--color-overlay-black-50)' }}
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
            >
              <div>
                <p className="font-bold text-lg leading-tight">השאר פרטים</p>
                <p className="text-sm opacity-75">נציג יחזור אליך בהקדם</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full overlay-action-btn"
                aria-label="סגור טופס"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div style={{ background: 'var(--color-gray-100)' }}>
              <div className="p-5">
                <LeadForm
                  formId={formId}
                  title=""
                  showMessage
                  showEmail
                  submitLabel="שלח ונחזור אליך בהקדם"
                  variant="minimal"
                  onSuccess={() => setIsOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
