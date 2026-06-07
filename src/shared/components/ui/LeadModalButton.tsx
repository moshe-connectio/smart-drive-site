'use client';

import { useState } from 'react';
import { LeadForm, LeadFormModal } from '@modules/leads';
import type { LeadFormId } from '@modules/leads';

interface LeadModalButtonProps {
  formId?: LeadFormId;
  buttonLabel?: string;
  /** 'primary' = blue, 'cta' = orange call-to-action, 'gold' = accent, 'outline' = bordered */
  variant?: 'primary' | 'cta' | 'gold' | 'outline';
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
    variant === 'cta'
      ? { background: 'var(--color-warning)', color: 'var(--color-text-inverse)', boxShadow: 'var(--shadow-gold-cta-base)' }
      : variant === 'gold'
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
        <LeadFormModal
          title="השאר פרטים"
          subtitle="נציג יחזור אליך בהקדם"
          ariaLabel="טופס יצירת קשר"
          onClose={() => setIsOpen(false)}
        >
          <LeadForm
            formId={formId}
            title=""
            showMessage
            showEmail
            submitLabel="שלח ונחזור אליך בהקדם"
            variant="minimal"
            onSuccess={() => setIsOpen(false)}
          />
        </LeadFormModal>
      )}
    </>
  );
}
