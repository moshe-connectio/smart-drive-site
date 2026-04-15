import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { getPublishedVehicles, Vehicle } from '@modules/vehicles/lib/repository';
import { getAllManufacturers } from '@modules/new-vehicles/lib/repository';
import { HomeManufacturersGrid } from '@modules/new-vehicles/components/HomeManufacturersGrid';
import { VehicleGrid } from '@modules/vehicles/components/VehicleGrid';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { LeadForm } from '@modules/leads';

export const revalidate = 3600;

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: dealershipConfig.seo.title,
  description: dealershipConfig.seo.description,
  keywords: dealershipConfig.seo.keywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: dealershipConfig.seo.title,
    description: dealershipConfig.seo.description,
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: dealershipConfig.business.name,
      },
    ],
  },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

interface AdvantageItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-14 md:mb-16">
      <p className="home-section-kicker">{eyebrow}</p>
      <h2 className="home-section-title">{title}</h2>
      {subtitle ? <p className="home-section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default async function HomePage() {
  const [vehiclesResult, manufacturersResult] = await Promise.allSettled([
    getPublishedVehicles(),
    getAllManufacturers(),
  ]);

  let vehicles: Vehicle[] = [];
  let manufacturers: Awaited<ReturnType<typeof getAllManufacturers>> = [];
  let error: string | null = null;

  if (vehiclesResult.status === 'fulfilled') {
    vehicles = vehiclesResult.value.filter((vehicle) => vehicle.is_published);
  } else {
    console.error('Failed to load vehicles:', vehiclesResult.reason);
    error = 'שגיאה בטעינת הרכבים. אנא נסו שוב בעוד מספר דקות.';
  }

  if (manufacturersResult.status === 'fulfilled') {
    manufacturers = manufacturersResult.value;
  } else {
    console.error('Failed to load manufacturers:', manufacturersResult.reason);
  }

  const featuredVehicles = vehicles.slice(0, dealershipConfig.pagination.featuredVehiclesCount);

  const heroStats = [
    { value: `${vehicles.length}+`, label: 'רכבים במלאי' },
    { value: `${dealershipConfig.company.yearsExperience}+`, label: 'שנות ניסיון' },
    { value: dealershipConfig.company.satisfaction, label: 'שביעות רצון' },
  ];

  const advantages: AdvantageItem[] = [
    {
      title: 'אמינות מלאה',
      desc: 'כל רכב עובר בדיקה מקצועית ונמכר עם שקיפות מלאה על מצבו.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'מחירים שקופים',
      desc: 'הצעת מחיר ברורה מראש, ללא עלויות נסתרות וללא אותיות קטנות.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'טרייד אין הוגן',
      desc: 'מבצעים הערכת שווי מקצועית לרכב הקיים כחלק מתהליך הרכישה.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: 'שירות אישי',
      desc: 'ליווי מקצועי אמיתי משלב ההתאמה ועד למסירת המפתחות.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
        </svg>
      ),
    },
  ];

  const contactPoints = [
    'חזרה מהירה בשעות הפעילות',
    'ייעוץ מקצועי ומותאם לתקציב',
    'ליווי אישי עד סגירת העסקה',
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        <section className="home-hero relative overflow-hidden">
          <div className="home-hero-atmo" />
          <div className="home-hero-grid" />

          <Container>
            <div className="home-hero-layout">
              <div className="home-hero-copy">
                <p className="home-hero-kicker">מרכז רכב פרימיום</p>

                <h1 className="home-hero-title">
                  הרכב הבא שלך
                  <span className="home-hero-title-highlight">מתחיל כאן</span>
                </h1>

                <p className="home-hero-subtitle">{dealershipConfig.business.tagline}</p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href={ROUTES.vehicles} className="home-primary-cta">
                    צפה בכל הרכבים
                  </Link>
                  <Link href="/new-vehicles" className="home-outline-cta">
                    רכבים חדשים
                  </Link>
                </div>

                <div className="home-hero-badges">
                  <span className="home-hero-badge">בדיקות מקיפות לכל רכב</span>
                  <span className="home-hero-badge">פתרונות מימון וטרייד אין</span>
                </div>
              </div>

              <aside className="home-hero-panel">
                <p className="home-hero-panel-title">Smart &amp; Drive</p>

                <div className="grid grid-cols-3 gap-3">
                  {heroStats.map((item) => (
                    <div key={item.label} className="home-hero-stat">
                      <p className="home-hero-stat-value">{item.value}</p>
                      <p className="home-hero-stat-label">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="home-hero-panel-divider" />

                <div className="space-y-3">
                  {[
                    'ליווי מקצועי משיחת הייעוץ ועד למסירה',
                    'שקיפות מלאה בתהליך ובמחיר',
                    'זמינות גבוהה לשירות לקוחות',
                  ].map((item) => (
                    <div key={item} className="home-hero-panel-item">
                      <span className="home-hero-panel-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="py-24" style={{ background: 'var(--color-background)' }}>
          <Container>
            <SectionHeading
              eyebrow="למה לבחור בנו"
              title="הדרך המקצועית לרכב הבא שלכם"
              subtitle="שילוב של שקיפות, מקצועיות ושירות ברמה גבוהה לאורך כל התהליך."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {advantages.map((item) => (
                <article
                  key={item.title}
                  className="home-advantage-card"
                >
                  <div className="home-advantage-icon">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-gray-900)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {manufacturers.length > 0 && (
          <section className="home-soft-section">
            <Container className="py-20">
              <SectionHeading
                eyebrow="רכבים חדשים"
                title="בחרו יצרן לרכב החדש שלכם"
                subtitle="כל הדגמים, המפרטים ורמות הגימור במקום אחד."
              />
              <HomeManufacturersGrid manufacturers={manufacturers} />
            </Container>
          </section>
        )}

        <section style={{ background: 'var(--color-background)' }}>
          <Container className="py-24">
            <SectionHeading
              eyebrow="המלאי שלנו"
              title="רכבים מומלצים"
              subtitle="רכבים נבחרים שמוכנים לנסיעה הבאה שלכם."
            />

            {error && (
              <div className="mb-8 p-4 rounded-xl" style={{ background: 'var(--color-error-light)', border: '1px solid var(--color-error)', color: 'var(--color-error-dark)' }}>
                {error}
              </div>
            )}

            {featuredVehicles.length > 0 ? (
              <>
                <VehicleGrid vehicles={featuredVehicles} />
                <div className="text-center mt-10">
                  <Link href={ROUTES.vehicles} className="home-inline-link">
                    לכל המלאי המלא
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12" style={{ color: 'var(--color-gray-500)' }}>
                אין רכבים זמינים כרגע
              </div>
            )}
          </Container>
        </section>

        <section className="home-soft-section py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="home-section-kicker text-right">ייעוץ אישי</p>
                <h2 className="home-section-title text-right">השאירו פרטים ונחזור אליכם במהירות</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-gray-500)', lineHeight: 1.85 }}>
                  מחפשים רכב חדש או משומש? הצוות שלנו יחזור אליכם עם התאמה מדויקת לצרכים, לתקציב ולסגנון הנהיגה שלכם.
                </p>

                <div className="space-y-3 mb-8">
                  {contactPoints.map((item) => (
                    <div key={item} className="home-contact-point">
                      <span className="home-contact-point-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={dealershipConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-contact-action home-contact-action-whatsapp"
                  >
                    וואטסאפ
                  </a>
                  <a
                    href={`tel:${dealershipConfig.contact.phone}`}
                    className="home-contact-action home-contact-action-primary"
                  >
                    {dealershipConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="w-full max-w-md mx-auto lg:mx-0 home-contact-form-shell">
                <LeadForm
                  formId="contact-page"
                  title="השאירו פרטים ונחזור אליכם"
                  subtitle="מענה אישי ומהיר בשעות הפעילות"
                  showEmail
                  showMessage
                  submitLabel="שליחה וקבלת ייעוץ אישי"
                  variant="card"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
