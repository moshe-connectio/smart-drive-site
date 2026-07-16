'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface HomeHeroMotionProps {
  children: ReactNode;
}

/**
 * Scoped, route-safe entrance motion for the home hero copy.
 * The server-rendered hero remains fully visible when JavaScript or motion is disabled.
 */
export function HomeHeroMotion({ children }: HomeHeroMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(
          '.home-hero-title-line, .home-hero-title-highlight, .home-hero-value, .home-hero-ctas, .home-hero-proof',
          { clearProps: 'all' },
        );
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
        },
        (context) => {
          const mobile = Boolean(context.conditions?.mobile);
          const timeline = gsap.timeline({
            defaults: {
              ease: 'power3.out',
              duration: mobile ? 0.65 : 0.9,
            },
          });

          timeline.from(
              '.home-hero-title-line, .home-hero-title-highlight',
              {
                autoAlpha: 0,
                y: mobile ? 20 : 30,
                stagger: mobile ? 0.1 : 0.16,
                clearProps: 'opacity,visibility,transform',
              },
              0,
            )
            .from(
              '.home-hero-value',
              {
                autoAlpha: 0,
                y: mobile ? 12 : 18,
                clearProps: 'opacity,visibility,transform',
              },
              '-=0.55',
            )
            .from(
              '.home-hero-ctas',
              {
                autoAlpha: 0,
                y: mobile ? 10 : 18,
                duration: 0.55,
                clearProps: 'opacity,visibility,transform',
              },
              '-=0.55',
            )
            .from(
              '.home-hero-proof',
              {
                autoAlpha: 0,
                y: 10,
                duration: 0.5,
                clearProps: 'opacity,visibility,transform',
              },
              '-=0.35',
            );

        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="home-hero-layout">
      {children}
    </div>
  );
}
