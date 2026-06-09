import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Container } from '@shared/components/layout/Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { HomeHeroShowcase } from './HomeHeroShowcase';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';

export function HomeHero() {
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
            <Image
              src={dealershipConfig.business.logo}
              alt={dealershipConfig.business.name}
              width={886}
              height={615}
              priority
              className="home-hero-logo"
            />

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

          <Suspense fallback={<HomeHeroStatsPanel />}>
            <HomeHeroShowcase />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
