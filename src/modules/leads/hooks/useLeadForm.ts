'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CreateLeadInput, LeadFormId, UtmParams } from '@modules/leads/types';

export interface UseLeadFormOptions {
  formId?: LeadFormId;
  vehicleId?: string;
  vehicleTitle?: string;
}

export interface LeadFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface UseLeadFormReturn {
  fields: LeadFormState;
  setField: (key: keyof LeadFormState, value: string) => void;
  submit: () => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

const EMPTY: LeadFormState = { name: '', phone: '', email: '', message: '' };

/** Reads UTM params from the current URL's query string */
function captureUtm(): UtmParams {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get('utm_source')   ?? undefined,
    utm_medium:   p.get('utm_medium')   ?? undefined,
    utm_campaign: p.get('utm_campaign') ?? undefined,
    utm_term:     p.get('utm_term')     ?? undefined,
    utm_content:  p.get('utm_content')  ?? undefined,
  };
}

/**
 * Hook that manages lead form state, UTM capture, and submission.
 *
 * Usage:
 *   const { fields, setField, submit, isSubmitting, isSuccess, error } = useLeadForm({
 *     formId: 'vehicle-inquiry',
 *     vehicleId: vehicle.id,
 *     vehicleTitle: vehicle.title,
 *   });
 */
export function useLeadForm(options: UseLeadFormOptions = {}): UseLeadFormReturn {
  const [fields, setFields] = useState<LeadFormState>(EMPTY);
  const [utm, setUtm] = useState<UtmParams>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Capture UTM once on mount
  useEffect(() => {
    setUtm(captureUtm());
  }, []);

  const setField = useCallback(
    (key: keyof LeadFormState, value: string) =>
      setFields((prev) => ({ ...prev, [key]: value })),
    []
  );

  const submit = useCallback(async () => {
    setError(null);

    if (!fields.name.trim() || fields.name.trim().length < 2) {
      setError('נא להזין שם מלא');
      return;
    }
    if (!fields.phone.trim()) {
      setError('נא להזין מספר טלפון');
      return;
    }

    setIsSubmitting(true);

    const payload: CreateLeadInput = {
      name:          fields.name.trim(),
      phone:         fields.phone.trim(),
      email:         fields.email.trim() || undefined,
      message:       fields.message.trim() || undefined,
      form_id:       options.formId ?? 'general',
      page_url:      typeof window !== 'undefined' ? window.location.href : undefined,
      page_title:    typeof document !== 'undefined' ? document.title : undefined,
      vehicle_id:    options.vehicleId,
      vehicle_title: options.vehicleTitle,
      utm,
      referrer:      typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'שגיאה בשליחה');
      }

      setIsSuccess(true);
      setFields(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשליחה, אנא נסו שוב');
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, utm, options]);

  const reset = useCallback(() => {
    setFields(EMPTY);
    setIsSuccess(false);
    setError(null);
  }, []);

  return { fields, setField, submit, isSubmitting, isSuccess, error, reset };
}
