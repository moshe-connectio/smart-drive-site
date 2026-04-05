'use client';

import { useLeadForm } from '../hooks/useLeadForm';
import type { LeadFormId } from '../types';

interface LeadFormProps {
  formId?: LeadFormId;
  vehicleId?: string;
  vehicleTitle?: string;
  /** Title shown at the top of the form */
  title?: string;
  /** Sub-text shown below the title */
  subtitle?: string;
  /** Show the message textarea */
  showMessage?: boolean;
  /** Show the email field */
  showEmail?: boolean;
  /** CTA button text */
  submitLabel?: string;
  /** Called after successful submission */
  onSuccess?: () => void;
  /** Visual variant */
  variant?: 'card' | 'inline' | 'minimal';
}

export default function LeadForm({
  formId = 'general',
  vehicleId,
  vehicleTitle,
  title = 'השאירו פרטים ונחזור אליכם',
  subtitle,
  showMessage = false,
  showEmail = false,
  submitLabel = 'שלח פרטים',
  onSuccess,
  variant = 'card',
}: LeadFormProps) {
  const { fields, setField, submit, isSubmitting, isSuccess, error } = useLeadForm({
    formId,
    vehicleId,
    vehicleTitle,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
    if (isSuccess) onSuccess?.();
  }

  if (isSuccess) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 text-center py-8 px-4 ${
          variant === 'card' ? 'rounded-2xl shadow-md bg-white' : ''
        }`}
        style={variant === 'card' ? { border: '1px solid var(--color-gray-200)' } : undefined}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold" style={{ color: 'var(--color-gray-900)' }}>
          תודה! קיבלנו את פרטיך
        </h3>
        <p style={{ color: 'var(--color-gray-600)' }}>
          נציג שלנו יצור איתך קשר בהקדם
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-base outline-none transition-all duration-200 ' +
    'focus:ring-2';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={
        variant === 'card'
          ? 'rounded-2xl shadow-md bg-white p-5 sm:p-6 flex flex-col gap-4'
          : variant === 'inline'
          ? 'flex flex-col gap-4'
          : 'flex flex-col gap-3'
      }
      style={
        variant === 'card'
          ? { border: '1px solid var(--color-gray-200)' }
          : undefined
      }
      aria-label={title}
    >
      {title && (
        <div>
          <h3
            className="text-lg font-bold"
            style={{ color: 'var(--color-gray-900)' }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-gray-500)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${formId}-name`}
          className="text-sm font-medium"
          style={{ color: 'var(--color-gray-700)' }}
        >
          שם מלא <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>*</span>
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="name"
          placeholder="ישראל ישראלי"
          required
          value={fields.name}
          onChange={(e) => setField('name', e.target.value)}
          className={inputClass}
          style={{
            border: '1.5px solid var(--color-gray-300)',
            background: 'var(--color-gray-50)',
            color: 'var(--color-gray-900)',
          }}
          aria-required="true"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${formId}-phone`}
          className="text-sm font-medium"
          style={{ color: 'var(--color-gray-700)' }}
        >
          טלפון <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>*</span>
        </label>
        <input
          id={`${formId}-phone`}
          type="tel"
          autoComplete="tel"
          placeholder="050-000-0000"
          required
          dir="ltr"
          value={fields.phone}
          onChange={(e) => setField('phone', e.target.value)}
          className={inputClass}
          style={{
            border: '1.5px solid var(--color-gray-300)',
            background: 'var(--color-gray-50)',
            color: 'var(--color-gray-900)',
          }}
          aria-required="true"
        />
      </div>

      {/* Email (optional) */}
      {showEmail && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${formId}-email`}
            className="text-sm font-medium"
            style={{ color: 'var(--color-gray-700)' }}
          >
            אימייל
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            dir="ltr"
            value={fields.email}
            onChange={(e) => setField('email', e.target.value)}
            className={inputClass}
            style={{
              border: '1.5px solid var(--color-gray-300)',
              background: 'var(--color-gray-50)',
              color: 'var(--color-gray-900)',
            }}
          />
        </div>
      )}

      {/* Message (optional) */}
      {showMessage && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${formId}-message`}
            className="text-sm font-medium"
            style={{ color: 'var(--color-gray-700)' }}
          >
            הודעה
          </label>
          <textarea
            id={`${formId}-message`}
            rows={3}
            placeholder="כתבו כאן..."
            value={fields.message}
            onChange={(e) => setField('message', e.target.value)}
            className={inputClass + ' resize-none'}
            style={{
              border: '1.5px solid var(--color-gray-300)',
              background: 'var(--color-gray-50)',
              color: 'var(--color-gray-900)',
            }}
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="text-sm font-medium px-3 py-2 rounded-lg"
          style={{
            background: '#fff2f2',
            color: '#c0392b',
            border: '1px solid #f5c6cb',
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
        }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            שולח...
          </span>
        ) : (
          submitLabel
        )}
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--color-gray-400)' }}>
        פרטיך מאובטחים ולא יועברו לצד שלישי
      </p>
    </form>
  );
}
