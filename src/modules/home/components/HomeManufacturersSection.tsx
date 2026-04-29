import { Container } from '@shared/components/layout/Container';
import { getAllManufacturers } from '@modules/new-vehicles/lib/repository';
import { HomeManufacturersGrid } from '@modules/new-vehicles/components/HomeManufacturersGrid';
import { logger } from '@core/lib/logger';
import { SectionHeading } from './SectionHeading';

export async function HomeManufacturersSection() {
  let manufacturers: Awaited<ReturnType<typeof getAllManufacturers>> = [];
  try {
    manufacturers = await getAllManufacturers();
  } catch (err) {
    logger.error('Failed to load manufacturers:', err);
  }

  if (manufacturers.length === 0) return null;

  return (
    <section className="home-mfr-section">
      <Container className="py-20">
        <SectionHeading
          eyebrow="רכבים חדשים"
          title="בחרו יצרן לרכב החדש שלכם"
          subtitle="כל הדגמים, המפרטים ורמות הגימור במקום אחד."
        />
        <HomeManufacturersGrid manufacturers={manufacturers} />
      </Container>
    </section>
  );
}
