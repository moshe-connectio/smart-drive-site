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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Premium Navy */}
        <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
          </div>
          {/* Gold accent line top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-gold)' }} />
          
          {/* Full-width Logo */}
          <div className="relative z-10 w-full flex justify-center sm:py-8 md:py-12">
            <Image
              src="/logo.png"
              alt="Smart & Drive"
              width={1920}
              height={600}
              className="w-full h-auto object-cover drop-shadow-2xl sm:max-w-4xl sm:rounded-xl"
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
                  className="inline-flex items-center gap-2 font-bold py-4 px-12 rounded-xl text-white transition-all duration-300 hover:scale-105 text-lg"
                  style={{ background: 'var(--gradient-gold)', color: '#0a1636', boxShadow: '0 4px 20px rgba(212, 160, 23, 0.4)' }}
                >
                  צפה בכל הרכבים
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/new-vehicles"
                  className="inline-flex items-center gap-2 font-semibold py-4 px-12 rounded-xl transition-all duration-300 hover:scale-105 text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-lg"
                >
                  רכבים חדשים
                </a>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-gold-400)' }}>{vehicles.length}+</div>
                  <div className="text-sm mt-1 text-white/60">רכבים במלאי</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-gold-400)' }}>{dealershipConfig.company.yearsExperience}+</div>
                  <div className="text-sm mt-1 text-white/60">שנות ניסיון</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-gold-400)' }}>{dealershipConfig.company.satisfaction}</div>
                  <div className="text-sm mt-1 text-white/60">שביעות רצון</div>
                </div>
              </div>
            </div>
          </Container>
          {/* Wave separator */}
          <div className="relative z-10">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L48 53.3C96 46.7 192 33.3 288 26.7C384 20 480 20 576 26.7C672 33.3 768 46.7 864 50C960 53.3 1056 46.7 1152 40C1248 33.3 1344 26.7 1392 23.3L1440 20V60H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-14">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>למה אנחנו?</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: 'var(--color-gray-900)' }}>
                הדרך הנכונה לקנייה חכמה
              </h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'var(--gradient-gold)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--color-primary-50)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>אמינות מלאה</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>כל רכב עובר בדיקה מקיפה של 150 נקודות לפני שהוא מוצע למכירה</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--color-primary-50)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>מחירים שקופים</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>ללא עלויות נסתרות. המחיר שמופיע הוא המחיר הסופי - כולל העברת בעלות</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--color-primary-50)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>טרייד אין</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>מחליפים רכב? אנחנו נקנה את הרכב הישן שלכם ונקזז מהמחיר</p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--color-primary-50)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>משלוח עד הבית</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>לא צריך לנסוע. אנחנו נביא את הרכב עד אליכם לנסיעת מבחן</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Vehicles Section */}
        <section style={{ background: 'var(--color-background-secondary)' }}>
          <Container className="py-20">
            <div className="text-center mb-14">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>המלאי שלנו</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: 'var(--color-gray-900)' }}>
                רכבים מומלצים
              </h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'var(--gradient-gold)' }} />
              <p className="text-lg mt-4" style={{ color: 'var(--color-gray-500)' }}>
                בחר מהרכבים המשובחים שלנו
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 rounded-xl" style={{ background: 'var(--color-error-light)', border: '1px solid var(--color-error)', color: 'var(--color-error-dark)' }}>
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

        {/* About / Trust Section */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div>
                <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>קצת עלינו</span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6" style={{ color: 'var(--color-gray-900)' }}>
                  Smart & Drive - הבחירה החכמה
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-gray-600)' }}>
                  אנחנו מאמינים שקניית רכב צריכה להיות חוויה פשוטה, שקופה ובטוחה. עם ניסיון של {dealershipConfig.company.yearsExperience} שנים בתחום הרכב, אנחנו מציעים מגוון רחב של רכבים איכותיים - חדשים ומשומשים - במחירים הוגנים.
                </p>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-gray-600)' }}>
                  הצוות המקצועי שלנו ילווה אתכם לאורך כל התהליך - ממציאת הרכב המושלם, דרך מימון, ועד העברת הבעלות.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-gray-700)' }}>אחריות מלאה</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-gray-700)' }}>מימון נוח</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-gray-700)' }}>בדיקת 150 נקודות</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}>
                      <svg className="w-5 h-5" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-gray-700)' }}>שירות לאחר מכירה</span>
                  </div>
                </div>
              </div>

              {/* Right - Stats Card */}
              <div className="rounded-2xl p-10 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-gold)' }} />
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="text-5xl font-bold" style={{ color: 'var(--color-gold-400)' }}>{vehicles.length}+</div>
                    <div>
                      <div className="text-white font-semibold text-lg">רכבים במלאי</div>
                      <div className="text-white/50 text-sm">חדשים ומשומשים</div>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center gap-5">
                    <div className="text-5xl font-bold" style={{ color: 'var(--color-gold-400)' }}>1,500+</div>
                    <div>
                      <div className="text-white font-semibold text-lg">לקוחות מרוצים</div>
                      <div className="text-white/50 text-sm">וממשיכים לספור</div>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center gap-5">
                    <div className="text-5xl font-bold" style={{ color: 'var(--color-gold-400)' }}>4.9</div>
                    <div>
                      <div className="text-white font-semibold text-lg">דירוג ממוצע</div>
                      <div className="text-white/50 text-sm flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" style={{ color: 'var(--color-gold-400)' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        {vehicles.length > 6 && (
          <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-gold)' }} />
            <Container>
              <div className="text-center py-20 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
                  עוד {vehicles.length - 6} רכבים מחכים לך
                </h2>
                <p className="mb-10 text-white/60 text-lg">גלה את כל המגוון שלנו</p>
                <a
                  href={ROUTES.vehicles}
                  className="inline-flex items-center gap-2 font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:scale-105 text-lg"
                  style={{ background: 'var(--gradient-gold)', color: '#0a1636', boxShadow: '0 4px 20px rgba(212, 160, 23, 0.4)' }}
                >
                  עיין בקטלוג המלא
                </a>
              </div>
            </Container>
          </section>
        )}

        {/* Contact / CTA Bottom */}
        <section className="py-20" style={{ background: 'var(--color-background-secondary)' }}>
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>נשמח לעזור</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: 'var(--color-gray-900)' }}>
                רוצה לשמוע עוד?
              </h2>
              <p className="text-lg mb-10" style={{ color: 'var(--color-gray-500)' }}>
                הצוות שלנו זמין עבורך. צרו קשר ונחזור אליכם תוך דקות
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={dealershipConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold py-4 px-10 rounded-xl text-white transition-all duration-300 hover:scale-105 text-lg"
                  style={{ background: '#25D366' }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${dealershipConfig.contact.phone}`}
                  className="inline-flex items-center gap-3 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 text-lg"
                  style={{ background: 'var(--gradient-primary)', color: 'white' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  התקשר עכשיו
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
