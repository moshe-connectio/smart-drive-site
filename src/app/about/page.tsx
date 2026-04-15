import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import { ROUTES } from '@core/lib/constants';
import type { Metadata } from 'next';
import Link from 'next/link';

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
  const stats = [
    { value: `${dealershipConfig.company.yearsExperience}+`, label: 'שנות ניסיון' },
    { value: `${dealershipConfig.company.employees}+`, label: 'אנשי צוות מקצועיים' },
    { value: dealershipConfig.company.satisfaction, label: 'שביעות רצון' },
    { value: '150', label: 'נקודות בדיקה לכל רכב' },
  ];

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
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />

          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">אודותינו</p>
              <h1 className="route-hero-title">Smart &amp; Drive</h1>
              <p className="route-hero-subtitle mx-auto">
                הדרך המקצועית לרכב הבא שלכם, בשילוב שקיפות מלאה, שירות אישי וליווי אמיתי לאורך כל הדרך.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <article key={stat.label} className="route-stat-card transition-all duration-300 hover:scale-[1.02]">
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-1"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-gray-500)' }}>{stat.label}</div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="home-section-kicker">הסיפור שלנו</p>
              <h2 className="home-section-title mb-8">מי אנחנו?</h2>
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

        <section className="home-soft-section py-20">
          <Container>
            <div className="text-center mb-14">
              <p className="home-section-kicker">הערכים שלנו</p>
              <h2 className="home-section-title">מה מנחה אותנו</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item) => (
                <article key={item.title} className="home-advantage-card text-center">
                  <div className="home-advantage-icon mx-auto">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>
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

        <section className="py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="text-center mb-14">
              <p className="home-section-kicker">ציר הזמן שלנו</p>
              <h2 className="home-section-title">אבני הדרך שלנו</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((item) => (
                <article key={item.year} className="route-surface-card p-6 h-full">
                  <div
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-bold mb-4"
                    style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}
                  >
                    {item.year}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>
                    {item.event}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="route-callout">
          <div className="route-hero-atmo" />

          <Container>
            <div className="route-callout-inner">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-inverse)' }}>
                מוכנים לרכב הבא שלכם?
              </h2>
              <p className="text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-header-transparent-text-dim)' }}>
                נשמח לפגוש אתכם בסוכנות, לייעץ בוואטסאפ או בטלפון, ולעזור לכם לבחור נכון.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={ROUTES.vehicles} className="home-primary-cta">
                  צפו בכל הרכבים
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/${dealershipConfig.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-outline-cta"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z" />
                  </svg>
                  דברו איתנו בוואטסאפ
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
