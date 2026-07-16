import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import { FinanceCalculatorSection } from '@modules/finance';
import { getPublishedVehicles } from '@modules/vehicles/lib/repository';
import { getAllTrimLevelsFullInfo } from '@modules/new-vehicles/lib/repository';
import { dealershipConfig } from '@core/config/site.config';
import { logger } from '@core/lib/logger';

export const revalidate = 60;

const siteUrl = dealershipConfig.seo.siteUrl;
const businessName = dealershipConfig.business.name;

export const metadata: Metadata = {
  title: `מימון רכב | ${businessName}`,
  description:
    'מחשבון מימון מקצועי לרכישת רכב — חשבו את ההחזר החודשי לפי מחיר, מקדמה, תקופה וריבית, וקבלו ליווי אישי מצוות המימון של Smart & Drive.',
  keywords: `מימון רכב, מחשבון מימון, החזר חודשי, הלוואה לרכב, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/finance`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/finance`,
    title: `מימון רכב | ${businessName}`,
    description:
      'מחשבון מימון מקצועי, ליווי אישי והצעות מימון מותאמות לרכב הבא שלכם.',
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `מימון רכב — ${businessName}`,
      },
    ],
  },
};

const highlights = [
  {
    title: 'הצעות מימון אטרקטיביות',
    desc: 'אנחנו עובדים מול מספר גופים מממנים ומציגים לכם את התנאים המשתלמים ביותר עבור פרופיל הלקוח שלכם.',
  },
  {
    title: 'ליווי אישי מקצה לקצה',
    desc: 'יועץ צמוד שילווה אתכם משלב הבדיקה הראשונית, דרך אישור המימון ועד החתימה והמסירה.',
  },
  {
    title: 'שקיפות מלאה',
    desc: 'הצגה ברורה של ההחזר החודשי, הריבית, סך הריבית הצפויה ותשלום שיורי — לפני שאתם מתחייבים.',
  },
];

const faq = [
  {
    q: 'איך מחושב ההחזר החודשי?',
    a: 'המחשבון מבוסס על נוסחת אמורטיזציה סטנדרטית עם אפשרות להוספת תשלום שיורי (בלון) בסוף התקופה. הוא מציג הערכה בלבד — תנאי המימון בפועל ייקבעו על ידי הגוף המממן ועל בסיס בדיקת נתונים מלאה.',
  },
  {
    q: 'מה זה תשלום שיורי / בלון?',
    a: 'תשלום בודד ודחוי שמשולם בתום תקופת ההלוואה. הוא מקטין משמעותית את ההחזר החודשי, אך מחייב היערכות לתשלום הסופי — בין אם במזומן, במחזור הלוואה או במכירת הרכב.',
  },
  {
    q: 'כמה מקדמה כדאי לשים?',
    a: 'אין תשובה אחת לכולם. מקדמה גבוהה תקטין את הריבית הכוללת ואת ההחזר החודשי, אך עשויה לפגוע בנזילות. אנחנו ממליצים להתייעץ עם יועץ המימון שלנו על מנת לבחור את האיזון הנכון עבורכם.',
  },
  {
    q: 'תוך כמה זמן מתקבל אישור מימון?',
    a: 'במרבית המקרים, תשובה ראשונית מתקבלת תוך 24-48 שעות עבודה. בדיקה מהירה ראשונית ניתנת לעיתים גם תוך מספר שעות.',
  },
];

export default async function FinancePage() {
  // Suggestions are a progressive enhancement — never fail the page on data errors.
  const [usedSettled, newSettled] = await Promise.allSettled([
    getPublishedVehicles(),
    getAllTrimLevelsFullInfo(),
  ]);

  const usedVehicles =
    usedSettled.status === 'fulfilled' ? usedSettled.value : [];
  const newTrimLevels =
    newSettled.status === 'fulfilled' ? newSettled.value : [];

  if (usedSettled.status === 'rejected') {
    logger.error(
      'FinancePage: failed to load used vehicles for suggestions',
      usedSettled.reason,
    );
  }
  if (newSettled.status === 'rejected') {
    logger.error(
      'FinancePage: failed to load new vehicle trim levels for suggestions',
      newSettled.reason,
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />

          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">מימון רכב</p>
              <h1 className="route-hero-title">המימון שמתאים לכם, בלי הפתעות</h1>
              <p className="route-hero-subtitle mx-auto">
                אצלנו המימון הוא חלק מהשירות, לא מכשול. צוות המימון של {businessName} מלווה
                אתכם בבחירה מושכלת — מהשוואת מסלולים והצגת ההחזר החודשי, ועד אישור
                ההלוואה והחתימה. שקיפות מלאה, תנאים מותאמים אישית ולווי מקצועי בכל שלב.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LeadModalButton
                  formId="financing"
                  buttonLabel="לקבלת ייעוץ מימון אישי"
                  variant="cta"
                  className="rounded-full! text-[0.95rem] px-7 min-h-[3.15rem]"
                />
                <Link href="/new-vehicles" className="home-outline-cta">
                  לעיון ברכבים החדשים
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── Calculator + matching vehicles ────────────── */}
        <FinanceCalculatorSection
          usedVehicles={usedVehicles}
          newTrimLevels={newTrimLevels}
        />

        {/* ─── Why us ───────────────────────────────────────────── */}
        <section
          className="py-16 sm:py-20"
          style={{ background: 'var(--color-bg-subtle, #f5f6fa)' }}
        >
          <Container>
            <div className="text-center mb-12">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-primary-500)' }}
              >
                למה לקוחות בוחרים בנו
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                יתרונות המימון ב-{businessName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl p-6 h-full"
                  style={{
                    background: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 4px 14px rgba(15, 34, 84, 0.06)',
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── FAQ ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--color-primary-500)' }}
                >
                  שאלות נפוצות
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  כל מה שחשוב לדעת על מימון רכב
                </h2>
              </div>

              <div className="space-y-3">
                {faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl px-5 py-4"
                    style={{
                      background: 'var(--color-card-bg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <summary
                      className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span>{item.q}</span>
                      <span
                        className="text-xl transition-transform group-open:rotate-45"
                        style={{ color: 'var(--color-primary-500)' }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
