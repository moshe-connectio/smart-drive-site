'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Container } from '@shared/components/layout/Container';

const partners = [
  {
    name: 'בנק הפועלים',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bank%20Hapoalim%20logo.svg',
  },
  {
    name: 'הבינלאומי',
    logo: '/finance/first-international-bank.svg',
  },
  {
    name: 'דיסקונט',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Discount%20Bank%2C%20Ltd%20logo.svg',
  },
  {
    name: 'בנק לאומי',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/BankLeumiLogoReupload.png',
  },
  {
    name: 'מימון ישיר',
    logo: '/finance/mimun-yeshir.svg',
  },
  {
    name: 'מזרחי־טפחות',
    logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/%D7%9C%D7%95%D7%92%D7%95_%D7%A9%D7%9C_%D7%91%D7%A0%D7%A7_%D7%9E%D7%96%D7%A8%D7%97%D7%99-%D7%98%D7%A4%D7%97%D7%95%D7%AA.svg',
  },
];

export function HomeFinancePartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, offset: 0 });
  const positionRef = useRef(0);
  const draggingRef = useRef(false);
  const lastFrameRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const speed = 34;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (timestamp: number) => {
      const previousTimestamp = lastFrameRef.current ?? timestamp;
      const elapsed = Math.min(timestamp - previousTimestamp, 40) / 1000;
      lastFrameRef.current = timestamp;

      if (!reduceMotion && !draggingRef.current) {
        const cycleWidth = (trackRef.current?.scrollWidth ?? 1) / 2;
        positionRef.current -= speed * elapsed;
        if (positionRef.current <= -cycleWidth) positionRef.current += cycleWidth;
        setPosition(positionRef.current);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragStartRef.current = { x: event.clientX, offset: positionRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const nextPosition = dragStartRef.current.offset + event.clientX - dragStartRef.current.x;
    positionRef.current = nextPosition;
    setPosition(nextPosition);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    draggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section className="home-finance-partners" aria-labelledby="home-finance-partners-title">
      <Container>
        <div className="home-finance-partners-heading">
          <p className="home-finance-partners-kicker">שותפים למימון הרכב</p>
          <h2 id="home-finance-partners-title">תנאי מימון מגופים מובילים</h2>
        </div>

        <div
          className={`home-finance-partners-marquee${isDragging ? ' is-dragging' : ''}`}
          aria-label="גופי המימון שלנו"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="home-finance-partners-track"
            style={{ transform: `translate3d(${position}px, 0, 0)` }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div className="home-finance-partner" key={`${partner.name}-${index}`} aria-hidden={index >= partners.length}>
                <span className="home-finance-partner-logo-wrap">
                  {partner.logo ? (
                    <img src={partner.logo} alt="" className="home-finance-partner-logo" loading="lazy" />
                  ) : (
                    <strong className="home-finance-partner-wordmark">{partner.name}</strong>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
