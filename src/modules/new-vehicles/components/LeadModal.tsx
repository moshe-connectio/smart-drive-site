'use client';

import { LeadForm, LeadFormModal } from '@modules/leads';

interface LeadModalProps {
  vehicleTitle: string;
  onClose: () => void;
}

/**
 * Lead-form modal used inside VehicleSpecifications.
 *
 * Caller is responsible for:
 * - Mounting only when open (the parent already gates with `isOpen && isMounted`)
 * - Wiring `useModal()` for ESC + body-scroll lock.
 *
 * `LeadFormModal` portals itself onto <body>, so no extra portal is needed here.
 */
export function LeadModal({ vehicleTitle, onClose }: LeadModalProps) {
  return (
    <LeadFormModal
      title="קבלו הצעת מחיר"
      subtitle={vehicleTitle}
      ariaLabel="טופס קבלת הצעת מחיר"
      onClose={onClose}
    >
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
    </LeadFormModal>
  );
}
