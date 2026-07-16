'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BLUR_DATA_URL } from '@shared/utils/imagePlaceholder';
import { formatPrice } from '@shared/utils/formatting';

gsap.registerPlugin(useGSAP);

export type ShowcaseModel = {
  modelSlug: string;
  manufacturerSlug: string;
  name: string;
  trimName: string;
  manufacturer: string;
  image: string;
  minMonthly: number | null;
  price: number | null;
  engineType: string | null;
  powerHp: number | null;
  acceleration: number | null;
  rangeKm: number | null;
  drivetrain: string | null;
  bodyType: string | null;
  priceTier: 'accessible' | 'value' | 'premium';
};

interface HomeHeroRotatorProps {
  /** Groups are flattened into a single cinematic vehicle sequence. */
  groups: ShowcaseModel[][];
  /** Auto-advance interval in milliseconds. */
  intervalMs?: number;
}

export function HomeHeroRotator({
  groups,
  intervalMs = 4500,
}: HomeHeroRotatorProps) {
  const models = groups.flat();
  const slideCount = models.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rotatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const activeSlide = rotatorRef.current?.querySelector(
        '.home-hero-rotator-slide[data-active="true"]',
      );
      if (!activeSlide) return;

      const car = activeSlide.querySelector<HTMLElement>('.home-hero-drive-car');
      const details = activeSlide.querySelector<HTMLElement>('.home-hero-drive-details');
      if (
        !car || !details ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        gsap.set([car, details], { clearProps: 'all' });
        return;
      }

      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const image = car.querySelector('img');
      const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } });

      timeline.fromTo(
          car,
          {
            autoAlpha: 0,
            xPercent: mobile ? -115 : -145,
            y: mobile ? 8 : 14,
            rotate: mobile ? -0.4 : -1,
          },
          {
            autoAlpha: 1,
            xPercent: 0,
            y: 0,
            rotate: 0,
            duration: mobile ? 0.82 : 1.12,
            ease: 'power4.out',
            clearProps: 'opacity,visibility,transform',
          },
          0,
        )
        .fromTo(
          image,
          { scale: mobile ? 0.96 : 0.93 },
          {
            scale: 1,
            duration: mobile ? 0.65 : 0.9,
            ease: 'back.out(1.25)',
            clearProps: 'transform',
          },
          '<0.12',
        )
        .fromTo(
          details,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.45',
        );
    },
    { scope: rotatorRef, dependencies: [index], revertOnUpdate: true },
  );

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

  return (
    <div
      ref={rotatorRef}
      className="home-hero-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="home-hero-road" aria-hidden="true">
        <span />
      </div>
      <div className="home-hero-rotator-stage" aria-live="off">
        {models.map((model, slideIndex) => {
          return (
            <div
              key={`${model.manufacturerSlug}-${model.modelSlug}`}
              className="home-hero-rotator-slide"
              data-active={index === slideIndex}
              aria-hidden={index !== slideIndex}
            >
              <aside className="home-hero-drive-scene" aria-label={`${model.manufacturer} ${model.name}`}>
                <Link
                  href={`/new-vehicles/${model.manufacturerSlug}/${model.modelSlug}`}
                  className="home-hero-drive-car"
                  aria-label={`${model.manufacturer} ${model.name} — צפייה בדגם`}
                >
                  <Image
                    src={model.image}
                    alt={`${model.manufacturer} ${model.name}`}
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1024px) 75vw, 620px"
                    style={{ objectFit: 'contain' }}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    priority={slideIndex === 0}
                  />
                </Link>
                <div className="home-hero-drive-details">
                  <div>
                    <span>{model.manufacturer}</span>
                    <strong>{model.name}</strong>
                  </div>
                  <div className="home-hero-drive-pricing" aria-label={`מחירי גרסת ${model.trimName}`}>
                    {model.price != null && model.price > 0 && (
                      <span>
                        <small>מחיר הרכב</small>
                        <strong>{formatPrice(model.price)}</strong>
                      </span>
                    )}
                    {model.minMonthly != null && model.minMonthly > 0 && (
                      <span>
                        <small>החזר חודשי משוער</small>
                        <strong>{formatPrice(model.minMonthly)}</strong>
                      </span>
                    )}
                  </div>
                </div>
                <div className="home-hero-drive-specs" aria-label="נתוני הדגם">
                  {[
                    model.powerHp != null ? { label: 'הספק', value: `${model.powerHp} כ״ס` } : null,
                    model.acceleration != null ? { label: '0–100', value: `${model.acceleration} שנ׳` } : null,
                    model.rangeKm != null ? { label: 'טווח', value: `${model.rangeKm.toLocaleString('he-IL')} ק״מ` } : null,
                    model.engineType ? { label: 'מנוע', value: model.engineType } : null,
                    model.drivetrain ? { label: 'הנעה', value: model.drivetrain } : null,
                  ].filter((item): item is { label: string; value: string } => item !== null).slice(0, 3).map((item) => (
                    <span key={item.label}>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          );
        })}
      </div>

    </div>
  );
}
