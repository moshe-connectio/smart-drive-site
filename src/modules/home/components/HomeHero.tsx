import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Container } from '@shared/components/layout/Container';
import { ROUTES, SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { HomeHeroShowcase } from './HomeHeroShowcase';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';

export function HomeHero() {
  return (
    <section className="home-hero relative overflow-hidden">
      <div className="home-hero-atmo" />
      <div className="home-hero-grid" />
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
              {SHOW_IMMEDIATE_INVENTORY && (
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
              )}
              <Link
                href="/new-vehicles"
                className={
                  SHOW_IMMEDIATE_INVENTORY
                    ? 'home-outline-cta home-outline-cta--icon'
                    : 'home-primary-cta home-primary-cta--icon'
                }
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
          </div>

          <Suspense fallback={<HomeHeroStatsPanel />}>
            <HomeHeroShowcase />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
