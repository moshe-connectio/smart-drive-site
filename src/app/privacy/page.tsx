/**
 * Privacy Policy — /privacy
 * מדיניות פרטיות בהתאם לחוק הגנת הפרטיות, התשמ״א-1981 (לרבות תיקון 13).
 */

import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import type { Metadata } from 'next';

const businessName = dealershipConfig.business.name;
const siteUrl = dealershipConfig.seo.siteUrl;
const contact = dealershipConfig.contact;

const lastUpdatedDisplay = new Date(dealershipConfig.legal.lastUpdated).toLocaleDateString('he-IL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const metadata: Metadata = {
  title: `מדיניות פרטיות | ${businessName}`,
  description: `מדיניות הפרטיות של ${businessName} — כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם בהתאם לחוק הגנת הפרטיות, התשמ״א-1981.`,
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />
          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">פרטיות</p>
              <h1 className="route-hero-title">מדיניות פרטיות</h1>
              <p className="route-hero-subtitle mx-auto">
                הפרטיות שלכם חשובה לנו. מסמך זה מסביר אילו פרטים אנו אוספים, כיצד אנו עושים בהם שימוש,
                וכיצד אנו שומרים עליהם — בהתאם לחוק הגנת הפרטיות, התשמ״א-1981.
              </p>
            </div>
          </Container>
        </section>

        <section className="legal-section">
          <Container>
            <div className="legal-doc">
              <div className="legal-meta">
                <span><strong>עודכן לאחרונה:</strong> {lastUpdatedDisplay}</span>
                <span><strong>בעל המאגר:</strong> {dealershipConfig.legal.legalEntityName}</span>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">1</span>
                  כללי
                </h2>
                <p>
                  {businessName} (להלן: „החברה”, „אנחנו”) מכבדת את פרטיות המשתמשים באתר{' '}
                  {siteUrl.replace(/^https?:\/\//, '')} (להלן: „האתר”). מדיניות זו מפרטת את האופן שבו
                  אנו אוספים, משתמשים, מאחסנים ומגנים על המידע האישי שלכם. השימוש באתר מהווה הסכמה
                  לתנאי מדיניות פרטיות זו.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">2</span>
                  המידע שאנו אוספים
                </h2>
                <p>במסגרת השימוש באתר ובשירותינו, אנו עשויים לאסוף את סוגי המידע הבאים:</p>
                <ul className="legal-list">
                  <li>
                    <strong>מידע שאתם מוסרים מרצונכם</strong> — שם מלא, מספר טלפון, כתובת דוא״ל ופרטים
                    נוספים שתמסרו בעת מילוי טופס יצירת קשר, בקשת מימון, טרייד-אין או פנייה אלינו.
                  </li>
                  <li>
                    <strong>מידע טכני</strong> — כתובת IP, סוג הדפדפן והמכשיר, ונתוני שימוש כלליים
                    הנאספים באופן אוטומטי לצורך תפעול ושיפור האתר.
                  </li>
                  <li>
                    <strong>קובצי Cookie</strong> — כמפורט בסעיף הייעודי שלהלן.
                  </li>
                </ul>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">3</span>
                  מטרות השימוש במידע
                </h2>
                <p>אנו עושים שימוש במידע למטרות הבאות בלבד:</p>
                <ul className="legal-list">
                  <li>יצירת קשר ומתן מענה לפניות, בקשות והצעות מחיר.</li>
                  <li>התאמת רכב, מימון או עסקת טרייד-אין בהתאם לצרכים שמסרתם.</li>
                  <li>תפעול האתר, שיפור חוויית המשתמש והבטחת אבטחת המידע.</li>
                  <li>עמידה בדרישות הדין ובהוראות רשויות מוסמכות.</li>
                  <li>משלוח דיוור שיווקי — רק בכפוף להסכמתכם המפורשת ובהתאם לחוק.</li>
                </ul>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">4</span>
                  מסירת מידע לצד שלישי
                </h2>
                <p>
                  איננו מוכרים או משכירים את המידע האישי שלכם. נמסור מידע לצדדים שלישיים אך ורק במקרים
                  הבאים: לספקי שירות הפועלים מטעמנו (כגון שירותי אחסון, ניהול לידים ומערכות דיוור)
                  ובכפוף להתחייבותם לשמירת סודיות; כאשר הדבר נדרש לפי דין או צו שיפוטי; וכן לצורך הגנה
                  על זכויותינו החוקיות.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">5</span>
                  קובצי Cookie
                </h2>
                <p>
                  האתר עושה שימוש בקובצי Cookie לצורך תפעול תקין, שמירת העדפות וניתוח שימוש. באפשרותכם
                  לחסום או למחוק קבצים אלה דרך הגדרות הדפדפן, אך הדבר עשוי לפגוע בחלק מהשירותים והתכונות
                  באתר.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">6</span>
                  אבטחת מידע
                </h2>
                <p>
                  אנו נוקטים באמצעי אבטחה מקובלים, טכנולוגיים וארגוניים, כדי להגן על המידע מפני גישה,
                  שימוש או חשיפה בלתי מורשים. עם זאת, אין באפשרותנו להבטיח חסינות מוחלטת, ואנו פועלים
                  לצמצום הסיכונים ככל הניתן.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">7</span>
                  זכויותיכם לפי חוק
                </h2>
                <p>
                  בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, עומדת לכם הזכות לעיין במידע שנאסף אודותיכם,
                  לבקש את תיקונו או מחיקתו, ולחזור בכם מהסכמה לקבלת דיוור שיווקי בכל עת. לצורך מימוש
                  זכויות אלה, ניתן לפנות אלינו בפרטים המופיעים מטה.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">8</span>
                  יצירת קשר בנושאי פרטיות
                </h2>
                <p>בכל שאלה או בקשה הנוגעת למדיניות פרטיות זו או למידע האישי שלכם, ניתן לפנות אלינו:</p>
                <div className="legal-contact-card">
                  <div className="legal-contact-row">
                    <span><strong>{dealershipConfig.legal.legalEntityName}</strong></span>
                  </div>
                  <div className="legal-contact-row">
                    <span>
                      <strong>טלפון:</strong>{' '}
                      <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
                    </span>
                    <span>
                      <strong>דוא״ל:</strong>{' '}
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </span>
                    <span><strong>כתובת:</strong> {contact.address}</span>
                  </div>
                </div>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">9</span>
                  שינויים במדיניות
                </h2>
                <p>
                  אנו רשאים לעדכן מדיניות זו מעת לעת. המדיניות המעודכנת תפורסם בעמוד זה, ותאריך העדכון
                  האחרון יופיע בראש המסמך. אנו ממליצים לעיין בעמוד מעת לעת.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
