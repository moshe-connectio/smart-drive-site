import Image from 'next/image';
import { getPublishedVehicles, Vehicle } from '@modules/vehicles/lib/repository';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { VehicleGrid } from '@modules/vehicles/components/VehicleGrid';
import { APP_CONFIG, ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';

export const revalidate = 3600; // ISR - 1 hour for home page

export default async function HomePage() {
  let vehicles: Vehicle[] = [];
  let error: string | null = null;

  try {
    vehicles = await getPublishedVehicles();
    // Filter only published vehicles (not sold) for home page
    vehicles = vehicles.filter(v => v.is_published);
  } catch (err) {
    console.error('Failed to load vehicles:', err);
    error = 'שגיאה בטעינת הרכבים. אנא נסה שוב מאוחר יותר.';
  }

  // Get featured vehicles (first 6)
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Premium Dark */}
        <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
          {/* Subtle blue glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(26,101,224,0.5) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(26,101,224,0.4) 0%, transparent 70%)' }} />
          
          {/* Full-width Logo */}
          <div className="relative z-10 w-full">
            <Image
              src="/logo.png"
              alt="Smart & Drive"
              width={1920}
              height={600}
              className="w-full h-auto object-cover drop-shadow-2xl"
              priority
            />
          </div>

          <Container>
            <div className="text-center py-10 sm:py-16 relative z-10">
              
              <p className="text-xl sm:text-2xl mb-10 font-light text-white/80">
                {dealershipConfig.business.tagline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={ROUTES.vehicles}
                  className="inline-flex items-center gap-2 font-semibold py-3.5 px-10 rounded-xl text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-blue)' }}
                >
                  צפה בכל הרכבים
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/new-vehicles"
                  className="inline-flex items-center gap-2 font-semibold py-3.5 px-10 rounded-xl transition-all duration-300 hover:scale-105 text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5"
                >
                  רכבים חדשים
                </a>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div>
                  <div className="text-3xl font-bold text-white">{vehicles.length}+</div>
                  <div className="text-sm mt-1 text-white/50">רכבים במלאי</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{dealershipConfig.company.yearsExperience}+</div>
                  <div className="text-sm mt-1 text-white/50">שנות ניסיון</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{dealershipConfig.company.satisfaction}</div>
                  <div className="text-sm mt-1 text-white/50">שביעות רצון</div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="w-16 h-0.5 mx-auto mt-16" style={{ background: 'var(--gradient-silver)' }} />
            </div>
          </Container>
        </section>

        {/* Featured Vehicles Section */}
        <section style={{ background: 'var(--color-background-secondary)' }}>
          <Container className="py-20">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white mb-3">
                רכבים מומלצים
              </h2>
              <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: 'var(--gradient-primary)' }} />
              <p className="text-lg text-white/60">
                בחר מהרכבים המשובחים שלנו
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-error/10 border border-error text-error rounded-lg">
                {error}
              </div>
            )}

            {featuredVehicles.length > 0 ? (
              <VehicleGrid vehicles={featuredVehicles} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg" style={{ color: 'var(--color-gray-500)' }}>אין רכבים זמינים כרגע</p>
              </div>
            )}
          </Container>
        </section>

        {/* CTA Section */}
        {vehicles.length > 6 && (
          <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(26,101,224,0.5) 0%, transparent 70%)' }} />
            <Container>
              <div className="text-center py-20 relative z-10">
                <h2 className="text-3xl font-bold mb-3 text-white">
                  עוד {vehicles.length - 6} רכבים מחכים לך
                </h2>
                <p className="mb-8 text-white/60">גלה את כל המגוון שלנו</p>
                <a
                  href={ROUTES.vehicles}
                  className="inline-flex items-center gap-2 font-semibold py-3.5 px-10 rounded-xl text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-blue)' }}
                >
                  עיין בקטלוג המלא
                </a>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
