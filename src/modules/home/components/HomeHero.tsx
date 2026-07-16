import Link from 'next/link';
import { Suspense } from 'react';
import { Container } from '@shared/components/layout/Container';
import { ROUTES } from '@core/lib/constants';
import { HomeHeroShowcase } from './HomeHeroShowcase';
import { HomeHeroStatsPanel } from './HomeHeroStatsPanel';
import { HomeHeroMotion } from './HomeHeroMotion';
import { HomeHeroVideo } from './HomeHeroVideo';

export function HomeHero() {
  return (
    <section className="home-hero relative overflow-hidden">
      <HomeHeroVideo />
      <div className="home-hero-atmo" />
      <div className="home-hero-grid" />
      <div className="home-hero-scanline" aria-hidden />

      <Container>
        <HomeHeroMotion>
          <div className="home-hero-copy">
            <h1 className="home-hero-title">
              <span className="home-hero-title-line">הדרך הנכונה</span>
              <span className="home-hero-title-highlight">
                לקנייה חכמה
              </span>
            </h1>

            <p className="home-hero-value">
              מבחר רחב של רכבים חדשים, מסלולי מימון בהתאמה אישית וטרייד־אין במקום — הכל בתהליך אחד, ברור ומלווה עד למסירה.
            </p>

            <div className="home-hero-ctas">
              <Link
                href="/new-vehicles"
                className="home-primary-cta home-primary-cta--icon"
              >
                <span>לכל הרכבים החדשים</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link
                href={ROUTES.finance}
                className="home-outline-cta home-outline-cta--icon"
              >
                לבדיקת אפשרויות מימון
              </Link>
            </div>

            <div className="home-hero-proof" aria-label="היתרונות שלנו">
              {['מבחר דגמים רחב', 'תנאים בשקיפות מלאה', 'ליווי אישי עד למסירה'].map((item) => (
                <span key={item}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Suspense fallback={<HomeHeroStatsPanel />}>
            <HomeHeroShowcase />
          </Suspense>
        </HomeHeroMotion>
      </Container>
    </section>
  );
}
