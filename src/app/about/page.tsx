import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import { ROUTES } from '@core/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `אודות | ${dealershipConfig.business.name}`,
  description: `${dealershipConfig.business.name} - סוכנות רכב מקצועית לרכבים חדשים ומשומשים. ליווי אישי, שקיפות מלאה ושירות אמין בכל שלב, מהתאמה ועד מסירה.`,
  keywords: `אודות ${dealershipConfig.business.name}, סוכנות רכב, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${dealershipConfig.seo.siteUrl}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${dealershipConfig.seo.siteUrl}/about`,
    title: `אודות | ${dealershipConfig.business.name}`,
    description: `${dealershipConfig.business.name} - סוכנות רכב מקצועית עם ליווי אישי, שקיפות מלאה ושירות איכותי ברכישת רכב חדש או משומש.`,
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `אודות ${dealershipConfig.business.name}`,
      },
    ],
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'אמינות מלאה',
      desc: 'כל רכב נבדק ב-150 נקודות ומלווה בדוח מצב ברור לפני המסירה.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'מחירים הוגנים',
      desc: 'הצעת מחיר ברורה מראש, ללא הפתעות וללא עלויות נסתרות.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'צוות מקצועי',
      desc: 'ליווי מקצועי המבוסס על ניסיון מעשי בשוק הרכב הישראלי.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'שירות לאחר המכירה',
      desc: 'אנחנו זמינים גם אחרי המסירה לכל שאלה, התאמה וליווי נוסף.',
    },
  ];

  const milestones = [
    { year: '2020', event: 'הקמת Smart & Drive', desc: 'יצאנו לדרך עם מטרה ברורה: להפוך את רכישת הרכב בישראל לפשוטה, שקופה ומקצועית.' },
    { year: '2021', event: 'הרחבת המלאי', desc: 'הרחבנו את היצע הרכבים לעשרות דגמים מובילים, עם התאמה לקהלים ותקציבים שונים.' },
    { year: '2022', event: 'השקת מחלקת רכבים חדשים', desc: 'פתחנו פעילות רכבים חדשים מהיבואן, עם מידע מלא ומחירים ברורים.' },
    { year: '2024', event: '95% שביעות רצון', desc: 'הגענו לציון שביעות רצון גבוה בזכות שירות אישי וליווי מקצועי לאורך כל התהליך.' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'var(--color-primary-800)' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--color-gold)' }} />

          <Container>
            <div className="text-center py-12 sm:py-16 md:py-24 relative z-10">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border"
                style={{ color: 'var(--color-gold-400)', borderColor: 'var(--color-gold-400)', background: 'rgba(212,160,23,0.08)' }}
              >
                אודותינו
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smart &amp; Drive
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                הדרך המקצועית לרכב הבא שלכם - שקיפות, שירות וליווי אישי מאז 2020.
              </p>
            </div>
          </Container>

          <div className="relative z-10">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L48 53.3C96 46.7 192 33.3 288 26.7C384 20 480 20 576 26.7C672 33.3 768 46.7 864 50C960 53.3 1056 46.7 1152 40C1248 33.3 1344 26.7 1392 23.3L1440 20V60H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Container>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: `${dealershipConfig.company.yearsExperience}+`, label: 'שנות ניסיון' },
                { value: `${dealershipConfig.company.employees}+`, label: 'אנשי צוות מקצועיים' },
                { value: dealershipConfig.company.satisfaction, label: 'שביעות רצון' },
                { value: '150', label: 'נקודות בדיקה לכל רכב' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl sm:text-5xl font-bold mb-1"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-gray-500)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>
                הסיפור שלנו
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6" style={{ color: 'var(--color-gray-900)' }}>
                מי אנחנו?
              </h2>
              <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: 'var(--color-gold)' }} />
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--color-gray-600)' }}>
                <p>
                  Smart & Drive נוסדה בשנת 2020 מתוך אמונה פשוטה: קניית רכב צריכה להיות חוויה ברורה, נעימה ובטוחה.
                  אנחנו כאן כדי לשנות את הדרך שבה ישראלים בוחרים ורוכשים רכב.
                </p>
                <p>
                  אנחנו מציעים מגוון רחב של רכבים משומשים איכותיים לצד רכבים חדשים מהיבואן.
                  כל רכב במלאי עובר בדיקה מקיפה של 150 נקודות על ידי אנשי מקצוע מוסמכים, כדי שתוכלו לקבל החלטה בביטחון.
                </p>
                <p>
                  הצוות שלנו מורכב מאנשי מקצוע עם ניסיון רב שנים בענף הרכב, שמתחייבים לליווי אישי,
                  ייעוץ אמין ושירות בגובה העיניים - ללא לחץ וללא הפתעות.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="py-20" style={{ background: 'var(--color-background-secondary)' }}>
          <Container>
            <div className="text-center mb-14">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>
                הערכים שלנו
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: 'var(--color-gray-900)' }}>
                מה מנחה אותנו
              </h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'var(--color-gold)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-7 text-center group transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-card-bg)',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--color-card-border)',
                  }}
                >
                  <div
                    className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <Container>
            <div className="text-center mb-14">
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--color-gold)' }}>
                ציר הזמן שלנו
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2" style={{ color: 'var(--color-gray-900)' }}>
                אבני הדרך שלנו
              </h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'var(--color-gold)' }} />
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Desktop center line */}
              <div
                className="absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 hidden md:block"
                style={{ background: 'var(--color-border)' }}
              />

              {/* Mobile side line */}
              <div
                className="absolute right-6 top-2 bottom-2 w-0.5 md:hidden"
                style={{ background: 'var(--color-border)' }}
              />

              <div className="space-y-8 md:space-y-10">
                {milestones.map((m, i) => {
                  const isLeftOnDesktop = i % 2 === 0;

                  return (
                    <div key={m.year} className="relative pr-16 md:pr-0">
                      <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
                        <div className={isLeftOnDesktop ? 'md:col-start-1' : 'md:col-start-2'}>
                          <div
                            className="rounded-2xl p-5 md:p-6 text-right"
                            style={{
                              background: 'var(--color-card-bg)',
                              boxShadow: 'var(--shadow-card)',
                              border: '1px solid var(--color-card-border)',
                            }}
                          >
                            <h3 className="font-bold text-base md:text-lg mb-1" style={{ color: 'var(--color-gray-900)' }}>
                              {m.event}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
                              {m.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Year bubble */}
                      <div className="absolute top-4 right-0 md:top-1/2 md:right-1/2 md:translate-x-1/2 md:-translate-y-1/2 z-10">
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-xs md:text-sm text-white shadow-lg"
                          style={{ background: 'var(--color-primary)' }}
                        >
                          {m.year}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Contact CTA */}
        <section
          className="py-12 sm:py-20 relative overflow-hidden"
          style={{ background: 'var(--color-primary-800)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--color-gold)' }} />
          <Container>
            <div className="text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                מוכנים לרכב הבא שלכם?
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
                נשמח לפגוש אתכם בסוכנות, לייעץ בוואטסאפ או בטלפון, ולעזור לכם לבחור נכון.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={ROUTES.vehicles}
                  className="inline-flex items-center gap-2 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl text-white transition-all duration-300 hover:scale-105 text-base"
                  style={{ background: 'var(--color-gold)', color: '#0a1636', boxShadow: '0 4px 20px rgba(212,160,23,0.4)' }}
                >
                  צפו בכל הרכבים
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${dealershipConfig.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-xl transition-all duration-300 hover:scale-105 text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z" />
                  </svg>
                  דברו איתנו בוואטסאפ
                </a>
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto text-sm">
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dealershipConfig.contact.phone}
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {dealershipConfig.contact.address}
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  א׳-ה׳ {dealershipConfig.contact.businessHours.weekdays}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
