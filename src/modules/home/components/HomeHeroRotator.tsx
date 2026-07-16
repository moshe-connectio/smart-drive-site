'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@shared/utils/imagePlaceholder';
import { formatPrice } from '@shared/utils/formatting';

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
  intervalMs = 7000,
}: HomeHeroRotatorProps) {
  const models = groups.flat();
  const slideCount = models.length;
  const [visibleCount, setVisibleCount] = useState(4);
  const [slideStep, setSlideStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const syncVisibleCount = () => {
      setVisibleCount(window.matchMedia('(max-width: 767px)').matches ? 1 : 4);
    };
    syncVisibleCount();
    window.addEventListener('resize', syncVisibleCount);
    return () => window.removeEventListener('resize', syncVisibleCount);
  }, []);

  const maxIndex = Math.max(0, slideCount - visibleCount);
  const activeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const viewport = rotatorRef.current?.querySelector('.home-hero-rotator-viewport');
    if (!(viewport instanceof HTMLElement)) return;

    const syncSlideStep = () => {
      const gap = visibleCount === 1 ? 11.2 : 14.4;
      setSlideStep((viewport.clientWidth - gap * (visibleCount - 1)) / visibleCount + gap);
    };
    syncSlideStep();
    const observer = new ResizeObserver(syncSlideStep);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [visibleCount]);

  const moveTo = (direction: 1 | -1) => {
    setIndex((current) => {
      if (maxIndex === 0) return 0;
      return Math.min(maxIndex, Math.max(0, current + direction));
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    suppressClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setPaused(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!start) {
      setPaused(false);
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      suppressClickRef.current = true;
      moveTo(deltaX < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  useEffect(() => {
    if (maxIndex <= 0 || paused) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [maxIndex, paused, intervalMs]);

  return (
    <div
      ref={rotatorRef}
      className="home-hero-rotator"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
        setPaused(false);
      }}
    >
      <div className="home-hero-road" aria-hidden="true">
        <span />
      </div>
      <div className="home-hero-rotator-viewport" aria-live="off">
        <div
          className="home-hero-rotator-track"
          style={{
            '--hero-slide-index': activeIndex,
            '--hero-slide-step': `${slideStep}px`,
          } as CSSProperties}
        >
          {models.map((model, slideIndex) => (
            <article
              key={`${model.manufacturerSlug}-${model.modelSlug}`}
              className="home-hero-drive-card"
              aria-hidden={slideIndex < index || slideIndex >= index + visibleCount}
            >
              <div className="home-hero-drive-scene" aria-label={`${model.manufacturer} ${model.name}`}>
                <Link
                  href={`/new-vehicles/${model.manufacturerSlug}/${model.modelSlug}`}
                  className="home-hero-drive-car"
                  aria-label={`${model.manufacturer} ${model.name} — צפייה בדגם`}
                  onClick={(event) => {
                    if (suppressClickRef.current) {
                      event.preventDefault();
                      suppressClickRef.current = false;
                    }
                  }}
                >
                  <Image
                    src={model.image}
                    alt={`${model.manufacturer} ${model.name}`}
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1024px) 75vw, 620px"
                    style={{ objectFit: 'contain' }}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    priority={slideIndex < visibleCount}
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
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
