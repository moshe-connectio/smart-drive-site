/**
 * VehicleSpecifications Component
 * תצוגת פרטי הרכב המלאים של רמת גימור
 */

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TrimLevelWithSpecifications } from '../types';
import { LeadForm } from '@modules/leads';

interface VehicleSpecificationsProps {
  trimLevel: TrimLevelWithSpecifications;
}

export function VehicleSpecifications({
  trimLevel,
}: VehicleSpecificationsProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const vehicleTitle = `${trimLevel.manufacturer_name} ${trimLevel.model_name} — ${trimLevel.name}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLeadModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLeadModalOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isLeadModalOpen]);
  // Group specifications by category
  const specsByCategory = trimLevel.specifications?.reduce(
    (acc, spec) => {
      const category = spec.category || 'אחרים';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(spec);
      return acc;
    },
    {} as Record<string, typeof trimLevel.specifications>
  ) || {};

  // Core specs that we show separately
  const coreSpecs = [
    { label: 'מחיר', value: trimLevel.price, format: (v: unknown) => `₪${Number(v).toLocaleString('he-IL')}` },
    { label: 'החזר חודשי', value: trimLevel.monthly_payment, format: (v: unknown) => `₪${Number(v).toLocaleString('he-IL')} / חודש` },
    { label: 'מנוע', value: trimLevel.engine_type },
    { label: 'תיבת הילוכים', value: trimLevel.transmission },
    { label: 'דלק', value: trimLevel.fuel_type },
    { label: 'כוח', value: trimLevel.power_hp, format: (v: unknown) => `${v} hp` },
    { label: 'מומנט', value: trimLevel.torque_nm, format: (v: unknown) => `${v} Nm` },
    { label: 'דחיפה 0-100 ק״מ', value: trimLevel.acceleration_0_100, format: (v: unknown) => `${v}s` },
    { label: 'מהירות מקסימלית', value: trimLevel.top_speed, format: (v: unknown) => `${v} km/h` },
    { label: 'צריכת דלק', value: trimLevel.fuel_consumption, format: (v: unknown) => `${v} L/100km` },
    { label: 'פליטות CO2', value: trimLevel.co2_emissions, format: (v: unknown) => `${v} g/km` },
    { label: 'משקל', value: trimLevel.weight, format: (v: unknown) => `${v} kg` },
    { label: 'מושבים', value: trimLevel.seats, format: (v: unknown) => `${v}` },
    { label: 'דלתות', value: trimLevel.doors, format: (v: unknown) => `${v}` },
    { label: 'תא המטען', value: trimLevel.trunk_volume, format: (v: unknown) => `${v} L` },
  ];

  const filledCoreSpecs = coreSpecs.filter(
    (spec) => spec.value !== null && spec.value !== undefined
  );

  // Body dimensions
  const bodyDimensions = trimLevel.body_dimensions;

  return (
    <div className="space-y-8">
      {/* Core Specifications Table */}
      <div className="overflow-hidden rounded-lg" style={{ border: '1px solid var(--color-border)' }}>
        <table className="w-full text-sm" style={{ borderCollapse: 'separate' }}>
          <tbody style={{ background: 'var(--color-card-bg)' }}>
            {filledCoreSpecs.map((spec, index) => (
              <tr key={`${spec.label}-${index}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {spec.label}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--color-silver-300)' }}>
                  {spec.format
                    ? spec.format(spec.value)
                    : spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Body Dimensions */}
      {bodyDimensions && Object.keys(bodyDimensions).length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            ממדי הגוף
          </h3>
          <div className="grid gap-4 rounded-lg p-4 sm:grid-cols-2" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
            {bodyDimensions.length && (
              <div>
                <p className="text-sm" style={{ color: 'var(--color-silver-400)' }}>אורך</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bodyDimensions.length} mm
                </p>
              </div>
            )}
            {bodyDimensions.width && (
              <div>
                <p className="text-sm" style={{ color: 'var(--color-silver-400)' }}>רוחב</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bodyDimensions.width} mm
                </p>
              </div>
            )}
            {bodyDimensions.height && (
              <div>
                <p className="text-sm" style={{ color: 'var(--color-silver-400)' }}>גובה</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bodyDimensions.height} mm
                </p>
              </div>
            )}
            {bodyDimensions.wheelbase && (
              <div>
                <p className="text-sm" style={{ color: 'var(--color-silver-400)' }}>מרחק בין גלגלים</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bodyDimensions.wheelbase} mm
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Specifications by Category */}
      {Object.keys(specsByCategory).length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            תכונות נוספות
          </h3>
          {Object.entries(specsByCategory).map(([category, specs]) => (
            <div key={category}>
              <h4 className="mb-3 font-medium text-gray-900">
                {category}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div
                    key={spec.id}
                    className="flex items-start justify-between rounded-lg p-3"
                    style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {spec.spec_key}
                    </span>
                    <span className="ml-2 text-sm" style={{ color: 'var(--color-silver-400)' }}>
                      {spec.spec_value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div
        className="rounded-lg p-6 text-center"
        style={{
          background: 'var(--color-overlay-primary-15)',
          border: '2px solid var(--color-primary)',
        }}
      >
        <h3 className="text-xl font-bold" style={{ color: 'var(--color-gray-900)' }}>
          מעניין אתכם הרכב הזה?
        </h3>
        <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
          {trimLevel.name} ב-₪{trimLevel.price.toLocaleString('he-IL')}
        </p>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-2.5 text-base font-bold transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              boxShadow: 'var(--shadow-primary-soft)',
            }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            קבלו הצעת מחיר
          </button>
        </div>
      </div>

      {/* Lead Form Modal (portal to body to escape stacking contexts) */}
      {isMounted && isLeadModalOpen && createPortal(
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
            onClick={() => setIsLeadModalOpen(false)}
          />
          <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
            >
              <div className="min-w-0">
                <p className="font-bold text-lg leading-tight">קבלו הצעת מחיר</p>
                <p className="text-sm opacity-90 leading-tight truncate">{vehicleTitle}</p>
              </div>
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full overlay-action-btn shrink-0"
                aria-label="סגור טופס"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  onSuccess={() => setIsLeadModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default VehicleSpecifications;
