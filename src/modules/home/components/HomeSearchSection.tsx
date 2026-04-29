import { Container } from '@shared/components/layout/Container';
import { getAllTrimLevelsFullInfo } from '@modules/new-vehicles/lib/repository';
import { HomeVehicleSearch } from '@modules/new-vehicles/components/HomeVehicleSearch';
import { logger } from '@core/lib/logger';
import { SectionHeading } from './SectionHeading';

export async function HomeSearchSection() {
  let trims: Awaited<ReturnType<typeof getAllTrimLevelsFullInfo>> = [];
  try {
    trims = await getAllTrimLevelsFullInfo();
  } catch (err) {
    logger.error('Failed to load trim levels for search:', err);
  }

  if (trims.length === 0) return null;

  return (
    <section className="home-search-section">
      <Container className="py-20">
        <SectionHeading
          eyebrow="חיפוש רכב"
          title="מצאו את הרכב המתאים לכם"
          subtitle="חיפוש חכם לפי יצרן, דגם והחזר חודשי מבוקש."
        />
        <HomeVehicleSearch trims={trims} />
      </Container>
    </section>
  );
}
