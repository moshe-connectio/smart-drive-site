'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@shared/utils/imagePlaceholder';
import { formatPrice } from '@shared/utils/formatting';

export type ShowcaseModel = {
  modelSlug: string;
  manufacturerSlug: string;
  name: string;
  manufacturer: string;
  image: string;
  minMonthly: number | null;
};

interface HomeHeroRotatorProps {
  /** Groups of (up to) three luxury models, rotated one group per slide. */
  groups: ShowcaseModel[][];
  /** Auto-advance interval in milliseconds. */
  intervalMs?: number;
}

function ModelCard({
  model,
  variant,
  eager,
}: {
  model: ShowcaseModel;
  variant: 'feature' | 'small';
  eager: boolean;
}) {
  return (
    <Link
      href={`/new-vehicles/${model.manufacturerSlug}/${model.modelSlug}`}
      className={`home-hero-showcase-card home-hero-showcase-${variant}`}
      aria-label={`${model.manufacturer} ${model.name} — צפייה בדגם`}
    >
      <Image
        src={model.image}
        alt={`${model.manufacturer} ${model.name}`}
        fill
        sizes={
          variant === 'feature'
            ? '(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 480px'
            : '(max-width: 640px) 44vw, (max-width: 1024px) 22vw, 240px'
        }
        style={{ objectFit: 'cover' }}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        priority={eager}
      />
      <div className="home-hero-showcase-overlay">
        <span className="home-hero-showcase-mfr">{model.manufacturer}</span>
        <span className="home-hero-showcase-name">{model.name}</span>
        {model.minMonthly != null && model.minMonthly > 0 && (
          <span className="home-hero-showcase-price">
            החל מ־{formatPrice(model.minMonthly)} / חודש
          </span>
        )}
      </div>
    </Link>
  );
}

export function HomeHeroRotator({
  groups,
  intervalMs = 5000,
}: HomeHeroRotatorProps) {
  const slideCount = groups.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slideCount <= 1 || paused) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slideCount, paused, intervalMs]);

  const goTo = (i: number) => setIndex(i);

  return (
    <div
      className="home-hero-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="home-hero-rotator-stage" aria-live="polite">
        {/* Model-group slides (shown first) */}
        {groups.map((group, gi) => {
          const slideIndex = gi;
          const [feature, ...rest] = group;
          return (
            <div
              key={`group-${gi}`}
              className="home-hero-rotator-slide"
              data-active={index === slideIndex}
              aria-hidden={index !== slideIndex}
            >
              <aside
                className="home-hero-showcase"
                aria-label="דגמי יוקרה נבחרים"
              >
                <p className="home-hero-showcase-eyebrow">דגמי יוקרה נבחרים</p>
                <ModelCard
                  model={feature}
                  variant="feature"
                  eager={slideIndex === 0}
                />
                {rest.length > 0 && (
                  <div className="home-hero-showcase-row">
                    {rest.map((model) => (
                      <ModelCard
                        key={model.modelSlug}
                        model={model}
                        variant="small"
                        eager={false}
                      />
                    ))}
                  </div>
                )}
              </aside>
            </div>
          );
        })}
      </div>

      {slideCount > 1 && (
        <div className="home-hero-rotator-dots" role="tablist" aria-label="החלפת תצוגה">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`קבוצת דגמים ${i + 1}`}
              className="home-hero-rotator-dot"
              data-active={index === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
