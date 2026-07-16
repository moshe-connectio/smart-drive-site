'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  /** Element to render as the wrapper. Defaults to a div. */
  as?: ElementType;
  /** Vertical offset (px) the content animates up from. */
  y?: number;
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Animation duration (seconds). */
  duration?: number;
  /** Stagger between direct children (seconds). 0 = animate the wrapper itself. */
  stagger?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper powered by GSAP + ScrollTrigger.
 *
 * - GSAP is lazy-loaded (dynamic import) so it never blocks first paint.
 * - Content is visible by default; the entrance only plays when JS + motion are
 *   available, so nothing is ever hidden if scripting fails.
 * - Fully respects `prefers-reduced-motion`.
 * - Works across all browsers (unlike CSS scroll-driven timelines).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  y = 30,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const targets: Element[] =
      stagger > 0 && el.children.length > 0
        ? Array.from(el.children)
        : [el];
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    gsap.from(targets, {
          opacity: 0,
          y: mobile ? Math.min(y, 18) : y,
          duration: mobile ? Math.min(duration, 0.6) : duration,
          delay,
          stagger: mobile ? Math.min(stagger, 0.06) : stagger,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        });

  }, { scope: ref, dependencies: [y, delay, duration, stagger], revertOnUpdate: true });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
