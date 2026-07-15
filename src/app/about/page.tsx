/**
 * About Page — /about
 * עמוד אודות מקצועי לסוכנות הרכב.
 * ללא נתונים מספריים על החברה (שנות פעילות / כמות לקוחות וכד׳).
 * המלל מותאם לעולם הרכב, מקצועי, נקי וברור.
 */

import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import type { Metadata } from 'next';
import Link from 'next/link';

const businessName = dealershipConfig.business.name;
const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `אודות | ${businessName}`,
  description: `${businessName} — סוכנות רכב מקצועית לרכבים חדשים ומשומשים. ליווי אישי, שקיפות מלאה ושירות אמין בכל שלב, מהתאמת הרכב ועד המסירה.`,
  keywords: `אודות ${businessName}, סוכנות רכב, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
    title: `אודות | ${businessName}`,
    description: `${businessName} — ליווי אישי, שקיפות מלאה ושירות מקצועי ברכישת רכב חדש או משומש.`,
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `אודות ${businessName}`,
      },
    ],
  },
};

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'אמון ושקיפות',
    desc: 'כל רכב מגיע עם היסטוריה מלאה, דוח בדיקה כתוב והצגה ברורה של מצב המכאניקה, החשמל והמרכב — לפני שאתם מחליטים.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'מחיר ברור מראש',
    desc: 'אנחנו לא מאמינים בהפתעות. הצעת המחיר שתקבלו כוללת את כל הרכיבים — אגרות, העברת בעלות והכנה למסירה — כתובים שחור על גבי לבן.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'צוות מהשטח',
    desc: 'אנשי הצוות שלנו הגיעו מתוך עולם הרכב — מוסכים, יבואנים וסוכנויות. הם מכירים את הדגמים, את שוק היד-השנייה ואת תנאי המימון בישראל.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'ליווי גם אחרי המסירה',
    desc: 'הקשר לא נגמר ביציאה מהסוכנות. אנחנו ממשיכים להיות זמינים לשאלות, לתקלות ולחידושים — כדי שהבעלות על הרכב שלכם תהיה רגועה.',
  },
];

const services = [
  {
    title: 'רכבים חדשים',
    desc: 'הזמנה ישירה מהיבואן הרשמי, עם כל רמות הגימור, האבזור והצבעים הזמינים — והשוואה ברורה בין דגמים ויצרנים.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM5 17H3.5a.5.5 0 01-.5-.5V13l1.7-4.7A2 2 0 016.6 7h10.8a2 2 0 011.9 1.3L21 13v3.5a.5.5 0 01-.5.5H19M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'מלאי מיידי',
    desc: 'רכבי יד-שנייה אחרי בדיקה מקיפה, כולל היסטוריית טיפולים, צילומי איכות, ומפרט מלא — כך שלא תופתעו ביום המסירה.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'מימון והלוואות',
    desc: 'מסלולי מימון מותאמים אישית — עם הסבר ברור של ההחזר החודשי, הריבית והבלון. ללא לחץ, עם זמן לחשוב ולהשוות.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 10h18M7 15h2m4 0h4M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: 'טרייד-אין',
    desc: 'הערכה מקצועית והוגנת לרכב הקיים שלכם, וקיזוז ישיר במחיר הרכב הבא — בתהליך אחד מסודר וללא טרחה מצדכם.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 4v6h6M20 20v-6h-6M5.07 9A9 9 0 0119.93 13M18.93 15A9 9 0 014.07 11" />
      </svg>
    ),
  },
];

const process = [
  {
    step: '1',
    title: 'הבנת הצורך',
    desc: 'שיחה קצרה כדי להבין מה חשוב לכם — שימוש יומיומי, גודל משפחה, תקציב חודשי ודרישות טכניות.',
  },
  {
    step: '2',
    title: 'התאמת רכב',
    desc: 'אנחנו מציגים מספר אפשרויות מתאימות, עם הסבר על היתרונות, החסרונות ועלויות החזקה צפויות.',
  },
  {
    step: '3',
    title: 'נסיעת מבחן ובדיקה',
    desc: 'נסיעת מבחן מסודרת, מענה לכל שאלה, ובדיקה טכנית או הצגת דוח בדיקה — לפי סוג הרכב.',
  },
  {
    step: '4',
    title: 'מימון, חתימה ומסירה',
    desc: 'מסלול מימון מותאם, ליווי בכל המסמכים, והכנה מלאה של הרכב למסירה — נקי, מתודלק ומוכן לדרך.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />

          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">אודות</p>
              <h1 className="route-hero-title">
                סוכנות רכב <span className="about-hero-accent">שאפשר לסמוך עליה</span>
              </h1>
              <p className="route-hero-subtitle mx-auto">
                ב־{businessName} אנחנו מאמינים שרכישת רכב אמורה להיות תהליך ברור, נעים ובלי לחצים.
                אנחנו פה כדי להציע ייעוץ אמיתי, להציג את כל האפשרויות, וללוות אתכם עד שתצאו עם הרכב הנכון לכם.
              </p>
            </div>
          </Container>
        </section>

        {/* ─── STORY ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="home-section-kicker">הגישה שלנו</p>
              <h2 className="home-section-title mb-6">קרוב יותר לרכב, רחוק מהלחץ</h2>
              <div
                className="space-y-5 text-lg leading-relaxed"
                style={{ color: 'var(--color-gray-600)' }}
              >
                <p>
                  שוק הרכב הישראלי מלא במידע, אבל לא תמיד פשוט להבין מתוכו מה באמת חשוב.
                  המטרה שלנו היא לעשות סדר: להציג את הדגמים שמתאימים לכם, להסביר את המפרט בשפה נורמלית,
                  ולעזור לכם להחליט לפי השיקולים שמנחים אתכם — לא לפי לחץ של מכירה.
                </p>
                <p>
                  בין אם מדובר ברכב חדש מהיבואן, ברכב משומש מהמלאי המיידי שלנו, או בעסקת טרייד-אין —
                  אנחנו מטפלים בכל ההיבטים תחת קורת גג אחת: התאמת הרכב, מימון, ביטוח, העברת בעלות
                  והכנה למסירה. כל זה כדי שתוכלו להתרכז במה שבאמת חשוב — בנהיגה.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── SERVICES ─────────────────────────────────────────── */}
        <section className="home-soft-section py-16 sm:py-20">
          <Container>
            <div className="text-center mb-12">
              <p className="home-section-kicker">השירותים שלנו</p>
              <h2 className="home-section-title">הכל במקום אחד</h2>
              <p className="home-section-subtitle">
                ארבעה תחומים מרכזיים שמכסים את כל מה שצריך כדי לעבור לרכב הבא, בלי לרדוף אחרי גורמים שונים.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc) => (
                <article key={svc.title} className="about-service-card">
                  <span className="about-service-icon" aria-hidden="true">
                    {svc.icon}
                  </span>
                  <h3 className="about-service-title">{svc.title}</h3>
                  <p className="about-service-desc">{svc.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── VALUES ───────────────────────────────────────────── */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="text-center mb-12">
              <p className="home-section-kicker">הערכים שלנו</p>
              <h2 className="home-section-title">מה מנחה אותנו בעבודה</h2>
              <p className="home-section-subtitle">
                ארבעה עקרונות פשוטים שמלווים כל אינטראקציה — מהפנייה הראשונה ועד שנים אחרי המסירה.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* ─── PROCESS ──────────────────────────────────────────── */}
        <section className="home-soft-section py-16 sm:py-20">
          <Container>
            <div className="text-center mb-14">
              <p className="home-section-kicker">איך זה עובד</p>
              <h2 className="home-section-title">התהליך שלנו, בארבעה שלבים</h2>
              <p className="home-section-subtitle">
                ככה נראית הדרך מהפנייה הראשונה ועד שאתם נוסעים הביתה עם הרכב החדש.
              </p>
            </div>

            <ol className="about-process-grid">
              {process.map((p) => (
                <li key={p.step} className="about-process-card">
                  <span className="about-process-step" aria-hidden="true">
                    {p.step}
                  </span>
                  <h3 className="about-process-title">{p.title}</h3>
                  <p className="about-process-desc">{p.desc}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="route-callout">
          <div className="route-hero-atmo" />

          <Container>
            <div className="route-callout-inner">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-inverse)' }}
              >
                מוכנים לרכב הבא שלכם?
              </h2>
              <p
                className="text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto"
                style={{ color: 'var(--color-header-transparent-text-dim)' }}
              >
                ספרו לנו מה אתם מחפשים, ואנחנו נתאים את האפשרויות הנכונות עבורכם — בלי התחייבות ובלי לחץ.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/new-vehicles" className="home-primary-cta">
                  צפו בכל הרכבים
                  <svg
                    className="w-5 h-5 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/${dealershipConfig.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-outline-cta"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
