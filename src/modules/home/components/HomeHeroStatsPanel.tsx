import { dealershipConfig } from '@core/config/site.config';

/**
 * The original glass "stats" panel that lives in the hero's right column.
 * Extracted into its own component so it can be reused as the Suspense
 * fallback (and graceful fallback) for the async luxury-models showcase,
 * keeping the hero layout stable while the showcase data streams in.
 */
export function HomeHeroStatsPanel() {
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
    <aside className="home-hero-panel">
      <div className="home-hero-panel-head">
        <div>
          <p className="home-hero-panel-eyebrow">SMART &amp; DRIVE · LIVE</p>
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
  );
}
