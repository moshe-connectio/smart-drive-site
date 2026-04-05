/**
 * VehicleSpecifications Component
 * תצוגת פרטי הרכב המלאים של רמת גימור
 */

'use client';

import type { TrimLevelWithSpecifications } from '../types';

interface VehicleSpecificationsProps {
  trimLevel: TrimLevelWithSpecifications;
}

export function VehicleSpecifications({
  trimLevel,
}: VehicleSpecificationsProps) {
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
      <div className="rounded-lg border-2 border-primary p-6 text-center" style={{ background: 'rgba(26, 101, 224, 0.1)' }}>
        <h3 className="text-xl font-bold text-gray-900">
          מעניין אתכם הרכב הזה?
        </h3>
        <p className="mt-2" style={{ color: 'var(--color-silver-400)' }}>
          {trimLevel.name} ב-₪{trimLevel.price.toLocaleString('he-IL')}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button className="rounded-lg bg-primary px-6 py-2 font-semibold text-white transition-colors hover:bg-primary/90">
            קבל הצעת מחיר
          </button>
          <button className="rounded-lg border border-primary px-6 py-2 font-semibold text-primary transition-colors hover:bg-primary/10" style={{ background: 'transparent' }}>
            השווה דגמים
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleSpecifications;
