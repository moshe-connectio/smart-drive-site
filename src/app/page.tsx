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
          
          <Container>
            <div className="text-center py-24 sm:py-32 relative z-10">
              {/* Decorative line */}
              <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                <span className="text-gray-900">Smart</span>
                <span className="mx-2" style={{ color: 'var(--color-primary)' }}>&amp;</span>
                <span className="text-gray-900">Drive</span>
              </h1>
              
              <p className="text-xl sm:text-2xl mb-10 font-light" style={{ color: 'var(--color-silver-300)' }}>
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
                  className="inline-flex items-center gap-2 font-semibold py-3.5 px-10 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid var(--color-border-dark)', color: 'var(--color-silver-200)', background: 'rgba(255,255,255,0.03)' }}
                >
                  רכבים חדשים
                </a>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{vehicles.length}+</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-gray-500)' }}>רכבים במלאי</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{dealershipConfig.company.yearsExperience}+</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-gray-500)' }}>שנות ניסיון</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{dealershipConfig.company.satisfaction}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-gray-500)' }}>שביעות רצון</div>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                רכבים מומלצים
              </h2>
              <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: 'var(--gradient-primary)' }} />
              <p className="text-lg" style={{ color: 'var(--color-silver-400)' }}>
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
                <h2 className="text-3xl font-bold mb-3 text-gray-900">
                  עוד {vehicles.length - 6} רכבים מחכים לך
                </h2>
                <p className="mb-8" style={{ color: 'var(--color-silver-400)' }}>גלה את כל המגוון שלנו</p>
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
