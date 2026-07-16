import { Container } from '@shared/components/layout/Container';
import {
  getAllManufacturers,
  getAllTrimLevelsFullInfo,
} from '@modules/new-vehicles/lib/repository';
import { HomeVehicleSearch } from '@modules/new-vehicles/components/HomeVehicleSearch';
import { logger } from '@core/lib/logger';
import { SectionHeading } from './SectionHeading';

export async function HomeSearchSection() {
  let trims: Awaited<ReturnType<typeof getAllTrimLevelsFullInfo>> = [];
  let manufacturers: Awaited<ReturnType<typeof getAllManufacturers>> = [];
  try {
    [manufacturers, trims] = await Promise.all([
      getAllManufacturers(),
      getAllTrimLevelsFullInfo(),
    ]);
  } catch (err) {
    logger.error('Failed to load trim levels for search:', err);
  }

  if (trims.length === 0) return null;

  return (
    <section className="home-search-section">
      <video
        className="home-search-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/luxury-car-driving-poster.png"
        aria-hidden="true"
      >
        <source src="/videos/luxury-car-driving.mp4" type="video/mp4" />
      </video>
      <Container className="py-20">
        <SectionHeading
          eyebrow="בחירת הרכב שלכם"
          title="מצאו את הרכב שמתאים לכם"
          subtitle="סננו לפי יצרן, דגם, סוג רכב או החזר חודשי וקבלו תוצאות רלוונטיות."
        />
        <HomeVehicleSearch trims={trims} manufacturers={manufacturers} />
      </Container>
    </section>
  );
}
