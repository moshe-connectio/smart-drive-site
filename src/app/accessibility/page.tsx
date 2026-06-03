/**
 * Accessibility Statement — /accessibility
 * הצהרת נגישות בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות
 * (התאמות נגישות לשירות), התשע״ג-2013, ולתקן הישראלי ת״י 5568.
 */

import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import type { Metadata } from 'next';

const businessName = dealershipConfig.business.name;
const siteUrl = dealershipConfig.seo.siteUrl;
const coordinator = dealershipConfig.legal.accessibilityCoordinator;

const lastUpdatedDisplay = new Date(dealershipConfig.legal.lastUpdated).toLocaleDateString('he-IL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const metadata: Metadata = {
  title: `הצהרת נגישות | ${businessName}`,
  description: `הצהרת הנגישות של ${businessName} — מחויבות לנגישות האתר והשירות בהתאם לתקן הישראלי ת״י 5568 ולתקנות שוויון זכויות לאנשים עם מוגבלות.`,
  alternates: {
    canonical: `${siteUrl}/accessibility`,
  },
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        <section className="route-hero">
          <div className="route-hero-atmo" />
          <div className="route-hero-grid" />
          <Container>
            <div className="route-hero-inner text-center">
              <p className="route-hero-kicker">נגישות</p>
              <h1 className="route-hero-title">הצהרת נגישות</h1>
              <p className="route-hero-subtitle mx-auto">
                ב־{businessName} אנו רואים בהנגשת האתר והשירות ערך עליון, ופועלים לאפשר לכלל הציבור,
                לרבות אנשים עם מוגבלות, לקבל שירות שוויוני, מכובד ועצמאי.
              </p>
            </div>
          </Container>
        </section>

        <section className="legal-section">
          <Container>
            <div className="legal-doc">
              <div className="legal-meta">
                <span><strong>עודכן לאחרונה:</strong> {lastUpdatedDisplay}</span>
                <span><strong>רמת תאימות:</strong> ת״י 5568 — WCAG 2.0 רמה AA</span>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">1</span>
                  מחויבותנו לנגישות
                </h2>
                <p>
                  {businessName} מחויבת להבטיח שירות נגיש לכלל לקוחותיה, ולהנגיש את אתר האינטרנט שלה
                  בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ״ח-1998, לתקנות שוויון זכויות לאנשים
                  עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013, ולתקן הישראלי ת״י 5568 המבוסס על
                  הנחיות הנגישות הבינלאומיות WCAG 2.0 ברמת AA.
                </p>
                <p>
                  אנו משקיעים מאמצים ומשאבים מתמשכים על מנת לשפר את נגישות האתר, מתוך אמונה שלכל אדם
                  מגיעה הזכות לחיות בשוויון, בכבוד, בנוחות ובעצמאות.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">2</span>
                  אמצעי הנגישות באתר
                </h2>
                <p>האתר כולל מגוון התאמות נגישות, ובהן:</p>
                <ul className="legal-list">
                  <li>התאמת האתר לגלישה באמצעות מקלדת וניווט עקבי בין רכיבי הדף.</li>
                  <li>תמיכה בקוראי מסך נפוצים באמצעות שימוש בתגיות סמנטיות ובתכונות ARIA.</li>
                  <li>אפשרות להגדלת ניגודיות הצבעים לשיפור הקריאוּת.</li>
                  <li>טקסט חלופי (alt) לתמונות בעלות משמעות תוכנית.</li>
                  <li>מבנה כותרות היררכי וברור לאורך כל עמודי האתר.</li>
                  <li>התאמת האתר לכיווניות עברית (RTL) ולתצוגה במכשירים ניידים.</li>
                </ul>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">3</span>
                  הסדרי נגישות בסניף
                </h2>
                <p>
                  אנו פועלים להנגשת השירות גם במרחב הפיזי. לקבלת מידע על הסדרי הנגישות בסניף שכתובתו{' '}
                  {dealershipConfig.contact.address}, או לתיאום התאמה מראש, ניתן לפנות אלינו בטלפון{' '}
                  <a href={`tel:${dealershipConfig.contact.phone}`}>{dealershipConfig.contact.phoneDisplay}</a>.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">4</span>
                  החרגות ומגבלות ידועות
                </h2>
                <p>
                  על אף מאמצינו לאפשר גלישה נגישה בכל עמודי האתר, ייתכן שיימצאו חלקים או רכיבים שטרם
                  הונגשו במלואם, או תכנים של צד שלישי שאינם בשליטתנו המלאה. אנו ממשיכים לפעול לתיקון
                  ולשיפור מתמיד, ונשמח לקבל פנייה בכל מקרה שבו נתקלתם בקושי.
                </p>
              </div>

              <div className="legal-block">
                <h2 className="legal-block-title">
                  <span className="legal-block-num">5</span>
                  פנייה ורכז הנגישות
                </h2>
                <p>
                  אם נתקלתם בבעיה בנושא נגישות, או שיש לכם בקשה, הצעה או הערה, נשמח אם תפנו אל רכז
                  הנגישות שלנו. אנו מתחייבים לטפל בפנייתכם בהקדם ובמקצועיות.
                </p>
                <div className="legal-contact-card">
                  <div className="legal-contact-row">
                    <span><strong>רכז הנגישות:</strong> {coordinator.name}</span>
                  </div>
                  <div className="legal-contact-row">
                    <span>
                      <strong>טלפון:</strong>{' '}
                      <a href={`tel:${coordinator.phone}`}>{coordinator.phoneDisplay}</a>
                    </span>
                    <span>
                      <strong>דוא״ל:</strong>{' '}
                      <a href={`mailto:${coordinator.email}`}>{coordinator.email}</a>
                    </span>
                  </div>
                </div>
              </div>

              <p className="legal-note">
                הצהרת נגישות זו נכתבה כתבנית כללית. מומלץ להתאים את פרטיה למצב בפועל של האתר והסניף,
                ולהיוועץ עם מורשה נגישות מוסמך ובאיש מקצוע משפטי לפני פרסום סופי.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
