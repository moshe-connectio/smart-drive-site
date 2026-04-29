import { Container } from '@shared/components/layout/Container';
import { getPublishedVehicles } from '@modules/vehicles/lib/repository';
import { HomeFeaturedVehicles } from '@modules/vehicles/components/HomeFeaturedVehicles';
import { logger } from '@core/lib/logger';
import { SectionHeading } from './SectionHeading';

export async function HomeFeaturedSection() {
  let vehicles: Awaited<ReturnType<typeof getPublishedVehicles>> = [];
  let error: string | null = null;
  try {
    const all = await getPublishedVehicles();
    vehicles = all.filter((v) => v.is_published);
  } catch (err) {
    logger.error('Failed to load vehicles:', err);
    error = 'שגיאה בטעינת הרכבים. אנא נסו שוב בעוד מספר דקות.';
  }

  return (
    <section style={{ background: 'var(--color-background)' }}>
      <Container className="py-24">
        <SectionHeading
          eyebrow="המלאי שלנו"
          title="רכבים במלאי מיידי"
          subtitle="רכבים נבחרים שמוכנים לנסיעה הבאה שלכם."
        />

        {error && (
          <div
            className="mb-8 p-4 rounded-xl"
            style={{
              background: 'var(--color-error-light)',
              border: '1px solid var(--color-error)',
              color: 'var(--color-error-dark)',
            }}
          >
            {error}
          </div>
        )}

        {vehicles.length > 0 ? (
          <HomeFeaturedVehicles vehicles={vehicles} />
        ) : (
          !error && (
            <div
              className="text-center py-12"
              style={{ color: 'var(--color-gray-500)' }}
            >
              אין רכבים זמינים כרגע
            </div>
          )
        )}
      </Container>
    </section>
  );
}
