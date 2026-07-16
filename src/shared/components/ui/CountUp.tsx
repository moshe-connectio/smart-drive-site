'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Target value to count up to. */
  value: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Locale used to format the number (grouping separators). */
  locale?: string;
  className?: string;
}

/**
 * Animates a number from 0 to `value` the first time it scrolls into view.
 * Progressive + accessible: respects `prefers-reduced-motion` (shows the final
 * value immediately) and renders the final value if IntersectionObserver is
 * unavailable, so the figure is never stuck at zero.
 */
export function CountUp({
  value,
  duration = 1400,
  locale = 'he-IL',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!el || prefersReduced || typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }

    const runCountUp = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            runCountUp();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString(locale)}
    </span>
  );
}
