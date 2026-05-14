'use client';

/**
 * FinanceCalculatorSection
 *
 * Client-side wrapper that connects the live monthly-payment value from the
 * finance calculator to a list of matching vehicles below it. Rendered on the
 * /finance page in place of the standalone calculator section.
 */

import { useState } from 'react';
import { Container } from '@shared/components/layout/Container';
import FinanceCalculator from './FinanceCalculator';
import { FinanceVehicleSuggestions } from './FinanceVehicleSuggestions';
import type { Vehicle } from '@modules/vehicles/lib/repository';
import type { TrimLevelFullInfo } from '@modules/new-vehicles/types';

interface FinanceCalculatorSectionProps {
  usedVehicles: Vehicle[];
  newTrimLevels: TrimLevelFullInfo[];
}

export default function FinanceCalculatorSection({
  usedVehicles,
  newTrimLevels,
}: FinanceCalculatorSectionProps) {
  // Mirror FinanceCalculator's default price so suggestions render on first
  // paint without waiting for the calculator's useEffect to propagate up.
  const [price, setPrice] = useState<number>(150_000);

  const hasSuggestions = usedVehicles.length > 0 || newTrimLevels.length > 0;

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <FinanceCalculator onPriceChange={setPrice} />
        </Container>
      </section>

      {hasSuggestions && (
        <section
          className="py-16 sm:py-20"
          style={{ background: 'var(--color-bg-subtle, #f5f6fa)' }}
        >
          <Container>
            <FinanceVehicleSuggestions
              usedVehicles={usedVehicles}
              newTrimLevels={newTrimLevels}
              targetPrice={price}
            />
          </Container>
        </section>
      )}
    </>
  );
}
