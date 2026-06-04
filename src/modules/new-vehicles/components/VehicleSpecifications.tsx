/**
 * VehicleSpecifications Component
 * תצוגת פרטי הרכב המלאים של רמת גימור
 */

'use client';

import { useState } from 'react';
import type { TrimLevelWithSpecifications } from '../types';
import { useModal } from '@shared/hooks/useModal';
import { LeadModal } from './LeadModal';

interface VehicleSpecificationsProps {
  trimLevel: TrimLevelWithSpecifications;
}

export function VehicleSpecifications({
  trimLevel,
}: VehicleSpecificationsProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const vehicleTitle = `${trimLevel.manufacturer_name} ${trimLevel.model_name_he || trimLevel.model_name} — ${trimLevel.name}`;

  useModal(isLeadModalOpen, () => setIsLeadModalOpen(false));
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
    { label: 'נפח מנוע', value: trimLevel.engine_cc, format: (v: unknown) => `${Number(v).toLocaleString('he-IL')} סמ״ק` },
    { label: 'תיבת הילוכים', value: trimLevel.transmission },
    { label: 'הנעה', value: trimLevel.drivetrain },
    { label: 'דלק', value: trimLevel.fuel_type },
    { label: 'כוח', value: trimLevel.power_hp, format: (v: unknown) => `${v} hp` },
    { label: 'מומנט', value: trimLevel.torque_nm, format: (v: unknown) => `${v} Nm` },
    { label: 'דחיפה 0-100 ק״מ', value: trimLevel.acceleration_0_100, format: (v: unknown) => `${v}s` },
    { label: 'מהירות מקסימלית', value: trimLevel.top_speed, format: (v: unknown) => `${v} km/h` },
    { label: 'צריכת דלק', value: trimLevel.fuel_consumption, format: (v: unknown) => `${v} L/100km` },
    { label: 'קיבולת סוללה', value: trimLevel.battery_kwh, format: (v: unknown) => `${v} קוט״ש` },
    { label: 'טווח חשמלי', value: trimLevel.range_km, format: (v: unknown) => `${Number(v).toLocaleString('he-IL')} ק״מ` },
    { label: 'הספק טעינה', value: trimLevel.charging_kw, format: (v: unknown) => `${v} kW` },
    { label: 'פליטות CO2', value: trimLevel.co2_emissions, format: (v: unknown) => `${v} g/km` },
    { label: 'דרגת זיהום', value: trimLevel.pollution_level },
    { label: 'רמת בטיחות', value: trimLevel.safety_level },
    { label: 'מסך מולטימדיה', value: trimLevel.screen_inch, format: (v: unknown) => `${v}″` },
    { label: 'משקל', value: trimLevel.weight, format: (v: unknown) => `${v} kg` },
    { label: 'מושבים', value: trimLevel.seats, format: (v: unknown) => `${v}` },
    { label: 'דלתות', value: trimLevel.doors, format: (v: unknown) => `${v}` },
    { label: 'תא המטען', value: trimLevel.trunk_volume, format: (v: unknown) => `${v} L` },
    { label: 'אחריות', value: trimLevel.warranty },
  ];

  const filledCoreSpecs = coreSpecs.filter(
    (spec) =>
      spec.value !== null && spec.value !== undefined && spec.value !== ''
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
      {isLeadModalOpen && (
        <LeadModal
          vehicleTitle={vehicleTitle}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}
    </div>
  );
}

export default VehicleSpecifications;
