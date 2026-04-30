import Link from 'next/link';
import { Container } from '@shared/components/layout/Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';

export function HomeHero() {
  const heroStats = [
    {
      value: `${dealershipConfig.company.yearsExperience}+`,
      label: 'שנות ניסיון',
    },
    {
      value: dealershipConfig.company.satisfaction,
      label: 'שביעות רצון',
    },
    {
      value: '24/7',
      label: 'שירות זמין',
    },
  ];

  return (
    <section className="home-hero relative overflow-hidden">
      <div className="home-hero-atmo" />
      <div className="home-hero-grid" />
      <div className="home-hero-orb home-hero-orb--a" aria-hidden />
      <div className="home-hero-orb home-hero-orb--b" aria-hidden />
      <div className="home-hero-scanline" aria-hidden />

      <Container>
        <div className="home-hero-layout">
          <div className="home-hero-copy">
            <span className="home-hero-status">
              <span className="home-hero-status-dot" aria-hidden />
              מלאי מתעדכן בזמן אמת
            </span>

            <h1 className="home-hero-title">
              <span className="home-hero-title-line">הרכב הבא שלך</span>
              <span className="home-hero-title-highlight">
                מתחיל בסמארט דרייב
              </span>
            </h1>

            <p className="home-hero-subtitle">
              {dealershipConfig.business.tagline}
            </p>

            <div className="home-hero-ctas">
              <Link
                href={ROUTES.vehicles}
                className="home-primary-cta home-primary-cta--icon"
              >
                <span>מלאי מיידי</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link
                href="/new-vehicles"
                className="home-outline-cta home-outline-cta--icon"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>רכבי 0 ק״מ</span>
              </Link>
            </div>

            <ul className="home-hero-features">
              <li className="home-hero-feature">
                <span className="home-hero-feature-icon" aria-hidden>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                </span>
                בדיקה דיגיטלית מלאה
              </li>
              <li className="home-hero-feature">
                <span className="home-hero-feature-icon" aria-hidden>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                אישור מימון תוך 24 שעות
              </li>
              <li className="home-hero-feature">
                <span className="home-hero-feature-icon" aria-hidden>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l-2-2 7-7 4 4-7 7H5z" />
                    <path d="M14 7l3 3" />
                  </svg>
                </span>
                טרייד אין מקוון
              </li>
            </ul>
          </div>

          <aside className="home-hero-panel">
            <div className="home-hero-panel-head">
              <div>
                <p className="home-hero-panel-eyebrow">
                  SMART &amp; DRIVE · LIVE
                </p>
                <p className="home-hero-panel-title">סמארט דרייב</p>
              </div>
              <span className="home-hero-panel-pulse" aria-hidden />
            </div>

            <div className="home-hero-stats-grid">
              {heroStats.map((item) => (
                <div key={item.label} className="home-hero-stat">
                  <p className="home-hero-stat-value">{item.value}</p>
                  <p className="home-hero-stat-label">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="home-hero-panel-divider" />

            <div className="home-hero-panel-list">
              {[
                'ליווי מקצועי משיחת הייעוץ ועד למסירה',
                'שקיפות מלאה בתהליך ובמחיר',
                'זמינות גבוהה לשירות לקוחות',
              ].map((item) => (
                <div key={item} className="home-hero-panel-item">
                  <span className="home-hero-panel-check" aria-hidden>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="home-hero-panel-foot">
              <span>זמן תגובה ממוצע</span>
              <strong>&lt; 15 דקות</strong>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
