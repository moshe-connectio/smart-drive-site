/**
 * Trade-In Page — /trade-in
 * עמוד ייעודי לטרייד-אין: הסבר, שלבי התהליך, יתרונות ו־FAQ.
 * משתמש בשפה העיצובית הקיימת (route-hero / about-* / home-* utilities).
 */

import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import { LicensePlateSearch } from '@modules/leads';
import { dealershipConfig } from '@core/config/site.config';
import { ROUTES } from '@core/lib/constants';
import type { Metadata } from 'next';
import Link from 'next/link';

const businessName = dealershipConfig.business.name;
const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `טרייד-אין — קיזוז הרכב הקיים | ${businessName}`,
  description: `שירות טרייד-אין מקצועי ב־${businessName}: הערכה הוגנת לרכב הקיים, קיזוז ישיר במחיר הרכב הבא וטיפול מלא בכל הניירת. תהליך אחד, סוכנות אחת, בלי לחפש קונה פרטי.`,
  keywords: `טרייד אין, החלפת רכב, קיזוז רכב ישן, מכירת רכב לסוכנות, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/trade-in`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/trade-in`,
    title: `טרייד-אין | ${businessName}`,
    description: `הערכה הוגנת לרכב הקיים וקיזוז ישיר במחיר הרכב החדש — כל התהליך אצלנו, בלי לחפש קונה פרטי.`,
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `שירות טרייד-אין ב־${businessName}`,
      },
    ],
  },
};

/* ─── Process steps ─────────────────────────────────────────────── */
const tradeInSteps = [
  {
    step: '1',
    title: 'השארת פרטי הרכב',
    desc: 'ממלאים טופס קצר עם נתוני הרכב הקיים — יצרן, דגם, שנה, ק״מ ומצב כללי. אפשר גם בטלפון או בוואטסאפ.',
  },
  {
    step: '2',
    title: 'הערכה ראשונית',
    desc: 'בתוך זמן קצר אנחנו מחזירים אליכם עם טווח מחיר מציאותי, בהתבסס על השוק, מצב הרכב והביקוש לדגם.',
  },
  {
    step: '3',
    title: 'בדיקה פיזית',
    desc: 'הגעה קצרה לסוכנות לבדיקת מרכב, מכאניקה והיסטוריית טיפולים — וגיבוש הערכה סופית, ברורה ומפורטת.',
  },
  {
    step: '4',
    title: 'קיזוז במחיר הרכב הבא',
    desc: 'הסכום המוסכם מקוזז ישירות במחיר הרכב שאתם רוכשים, ואנחנו מטפלים בכל הניירת — העברת בעלות, ביטול ביטוח, הסרת שעבוד והכל בתוך עסקה אחת.',
  },
];

/* ─── Why trade-in ──────────────────────────────────────────────── */
const benefits = [
  {
    title: 'בלי לחפש קונה פרטי',
    desc: 'אתם לא צריכים לפרסם, לתאם פגישות, לענות לשאלות חוזרות או להתמודד עם מתעניינים שלא מגיעים — אנחנו לוקחים את הרכב מכם בעסקה אחת.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'הערכה הוגנת ושקופה',
    desc: 'המחיר נקבע לפי השוק האמיתי — לא לפי לחץ של מכירה. אתם מקבלים פירוט בכתב של מה שמשפיע על ההערכה, כולל יתרונות וחסרונות הרכב.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'הקלה במס וברישוי',
    desc: 'עסקת טרייד-אין נסגרת תחת קורת גג אחת, אנחנו מטפלים בהעברת הבעלות, באגרות וברישוי — אתם רק חותמים ויוצאים עם הרכב החדש.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'תזרים פשוט יותר',
    desc: 'הסכום של הרכב הישן מתקזז ישירות בעסקה החדשה — בלי להעביר כספים בין חשבונות פרטיים, בלי המתנה למכירה, ובלי תקופת חפיפה בין שני רכבים.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ─── Affecting factors ─────────────────────────────────────────── */
const factors = [
  {
    title: 'ק״מ והיסטוריית שימוש',
    desc: 'רכב עם ק״מ נמוך באופן יחסי לשנת ייצור ולסוג השימוש (פרטי / ליסינג / השכרה) — מקבל הערכה גבוהה יותר.',
  },
  {
    title: 'מצב מכאני וחשמלי',
    desc: 'תקלות פתוחות, טיפולים שוטפים שלא בוצעו, מערכות בטיחות ומיגון — כל אלה נכנסים לחישוב.',
  },
  {
    title: 'מצב חיצוני ופנים הרכב',
    desc: 'שריטות, פגיעות מרכב, חלודה ומצב הריפוד והאלקטרוניקה הפנימית משפיעים ישירות על שווי השוק.',
  },
  {
    title: 'ביקוש לדגם',
    desc: 'דגמים מבוקשים בשוק יד-שנייה (חסכוניים, אמינים, עם אבזור חזק) שומרים על ערך טוב יותר.',
  },
  {
    title: 'בעלות ומספר ידיים',
    desc: 'מספר הבעלים הקודמים וסוג הבעלות (פרטי / חברה / ליסינג) משפיעים על האטרקטיביות בעת המכירה.',
  },
  {
    title: 'דוח מומחה ובדיקות',
    desc: 'דוח בדיקה מסודר ממכון מורשה — לפעמים שווה הפרש משמעותי בהערכה, כי הוא מקצר את אי-הוודאות.',
  },
];

/* ─── FAQ ────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'האם חובה לרכוש מאיתנו רכב כדי לבצע טרייד-אין?',
    a: 'כן. שירות הטרייד-אין מיועד ללקוחות שרוכשים רכב חדש או יד-שנייה מהמלאי שלנו. אם אתם רוצים רק למכור את הרכב הקיים, נשמח להפנות אתכם לערוצים המתאימים.',
  },
  {
    q: 'כמה זמן לוקח התהליך מהפנייה ועד החתימה?',
    a: 'אחרי שהתקבלו פרטי הרכב, ההערכה הראשונית חוזרת אליכם בתוך זמן קצר. הבדיקה הפיזית עורכת בדרך-כלל פחות משעה, וההסכם הסופי נחתם באותו יום שבו אתם בוחרים את הרכב הבא.',
  },
  {
    q: 'מה קורה אם יש על הרכב שעבוד או הלוואה פתוחה?',
    a: 'לא בעיה. אנחנו פוגשים את הסיטואציה הזאת באופן יומיומי — צוות המימון אצלנו דואג לסילוק ההלוואה מול הבנק, לסילוק השעבוד וליצירת תזרים נקי שיעבור לעסקה החדשה.',
  },
  {
    q: 'האם ההערכה הראשונית מחייבת אתכם או אותי?',
    a: 'לא. ההערכה הראשונית היא טווח מחיר מקדמי בלי שום התחייבות משני הצדדים. רק אחרי הבדיקה הפיזית בסוכנות ההערכה הופכת לסופית, ורק אם שניכם מסכימים — חותמים.',
  },
  {
    q: 'איך מתבצעת העברת הבעלות?',
    a: 'אנחנו מטפלים בכל התהליך מול משרד הרישוי: ביטול הרישום על שמכם, הסרת השעבוד אם קיים, והעברת הבעלות לסוכנות. אתם לא צריכים להגיע למשרדי הרישוי או להתעסק עם מסמכים.',
  },
  {
    q: 'האם אני חייב להגיע פיזית לסוכנות?',
    a: 'אפשר להתחיל את התהליך מרחוק (תמונות, פרטים ואפילו וידאו) ולקבל הערכה ראשונית. הבדיקה הפיזית הסופית מתקיימת בסוכנות לפני סגירת העסקה — וזה גם הזמן לבחור את הרכב הבא.',
  },
];

export default function TradeInPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* ─── HERO ───────────────────────────────────────────── */}
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />

          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">טרייד-אין</p>
              <h1 className="route-hero-title">
                החליפו רכב <span className="about-hero-accent">בלי כאב ראש</span>
              </h1>
              <p className="route-hero-subtitle mx-auto">
                ב־{businessName} אנחנו לוקחים את הרכב הקיים שלכם בקיזוז ישיר במחיר הרכב הבא —
                הערכה הוגנת, ניירת אצלנו, ועסקה אחת מסודרת מתחילה ועד סוף.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LeadModalButton
                  formId="trade-in"
                  buttonLabel="קבלת הערכה ראשונית"
                  variant="cta"
                  className="!rounded-full text-[0.95rem] px-7 min-h-[3.15rem]"
                />
                <Link href={ROUTES.vehicles} className="home-outline-cta">
                  לעיון במלאי המיידי
                </Link>
              </div>
            </div>
          </Container>
        </section>
        {/* ─── LICENSE PLATE SEARCH ────────────────────── */}
        <LicensePlateSearch />
        {/* ─── INTRO TEXT ─────────────────────────────────────── */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="home-section-kicker">מה זה בעצם טרייד-אין</p>
              <h2 className="home-section-title mb-6">לוקחים מכם את הרכב הישן, נותנים לכם את החדש</h2>
              <div
                className="space-y-5 text-lg leading-relaxed"
                style={{ color: 'var(--color-gray-600)' }}
              >
                <p>
                  טרייד-אין הוא תהליך שבו הסוכנות מקבלת את הרכב הקיים שלכם כחלק מהתשלום על הרכב החדש.
                  במקום למכור באופן פרטי — לפרסם, לתאם נסיעות מבחן, להתמודד עם מתמקחים ועם תהליך העברת
                  בעלות מסורבל — אתם סוגרים את הכל אצלנו, בעסקה אחת.
                </p>
                <p>
                  השווי של הרכב הישן מקוזז ישירות מהמחיר הסופי, מה שמפחית את התשלום בפועל
                  ולעיתים גם את גובה המימון הנדרש. אנחנו מטפלים בהעברת הבעלות, בסילוק שעבוד אם יש,
                  ובכל המסמכים — אתם רק חותמים ויוצאים עם הרכב הבא.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── PROCESS STEPS ──────────────────────────────────── */}
        <section className="home-soft-section py-16 sm:py-20">
          <Container>
            <div className="text-center mb-14">
              <p className="home-section-kicker">איך זה עובד</p>
              <h2 className="home-section-title">התהליך שלנו, בארבעה שלבים</h2>
              <p className="home-section-subtitle">
                מהפנייה הראשונה ועד שאתם נוסעים הביתה עם הרכב החדש — ארבעה שלבים פשוטים.
              </p>
            </div>

            <ol className="about-process-grid">
              {tradeInSteps.map((s) => (
                <li key={s.step} className="about-process-card">
                  <span className="about-process-step" aria-hidden="true">
                    {s.step}
                  </span>
                  <h3 className="about-process-title">{s.title}</h3>
                  <p className="about-process-desc">{s.desc}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ─── BENEFITS ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="text-center mb-12">
              <p className="home-section-kicker">היתרונות שלכם</p>
              <h2 className="home-section-title">למה לקוחות בוחרים בטרייד-אין</h2>
              <p className="home-section-subtitle">
                ארבעה יתרונות מרכזיים שהופכים את החלפת הרכב לחוויה רגועה יותר ופשוטה יותר.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <article key={b.title} className="home-advantage-card text-center">
                  <div className="home-advantage-icon mx-auto">{b.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
                    {b.desc}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── FACTORS ────────────────────────────────────────── */}
        <section className="home-soft-section py-16 sm:py-20">
          <Container>
            <div className="text-center mb-12">
              <p className="home-section-kicker">מה קובע את ההערכה</p>
              <h2 className="home-section-title">הפרמטרים שמשפיעים על שווי הרכב</h2>
              <p className="home-section-subtitle">
                אנחנו עובדים בשקיפות מלאה — אלה הגורמים העיקריים שמשפיעים על ההערכה הסופית.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {factors.map((f) => (
                <article key={f.title} className="trade-factor-card">
                  <h3 className="trade-factor-title">{f.title}</h3>
                  <p className="trade-factor-desc">{f.desc}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20" style={{ background: 'var(--color-background)' }}>
          <Container>
            <div className="text-center mb-12">
              <p className="home-section-kicker">שאלות נפוצות</p>
              <h2 className="home-section-title">מה ששואלים אותנו הכי הרבה</h2>
            </div>

            <div className="trade-faq-list max-w-3xl mx-auto">
              {faqs.map((item, i) => (
                <details
                  key={i}
                  className="trade-faq-item"
                  // First item open by default for engagement
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="trade-faq-q">
                    <span>{item.q}</span>
                    <svg
                      className="trade-faq-chevron"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="trade-faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── CTA ────────────────────────────────────────────── */}
        <section className="route-callout">
          <div className="route-hero-atmo" />

          <Container>
            <div className="route-callout-inner">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-inverse)' }}
              >
                מוכנים להחליף רכב?
              </h2>
              <p
                className="text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto"
                style={{ color: 'var(--color-header-transparent-text-dim)' }}
              >
                השאירו פרטים ואחד מאנשי הצוות יחזור אליכם עם הערכה ראשונית — בלי התחייבות.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LeadModalButton
                  formId="trade-in"
                  buttonLabel="קבלת הערכה ראשונית"
                  variant="cta"
                  className="!rounded-full text-[0.95rem] px-7 min-h-[3.15rem]"
                />
                <a
                  href={`https://wa.me/${dealershipConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('שלום, אני מתעניין בשירות טרייד-אין')}`}
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
