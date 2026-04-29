'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { VehicleImage } from '@modules/vehicles/lib/repository';
import { useModal } from '@shared/hooks/useModal';

interface ImageLightboxProps {
  images: VehicleImage[];
  initialIndex: number;
  vehicleTitle: string;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, vehicleTitle, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const sortedImages = [...images].sort((a, b) => a.position - b.position);
  const currentImage = sortedImages[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length);
  }, [sortedImages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  }, [sortedImages.length]);

  // ESC dismiss + body scroll lock
  useModal(true, onClose);

  // Arrow-key navigation (RTL: left = next, right = prev)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goNext();
      if (e.key === 'ArrowRight') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Only trigger if horizontal swipe is dominant and > 50px
    if (absDx > 50 && absDx > absDy * 1.5) {
      if (dx > 0) goPrev(); // RTL: swipe right = prev
      else goNext(); // RTL: swipe left = next
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [goNext, goPrev]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--color-overlay-black-92)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
        style={{ background: 'var(--color-glass-white-10)', color: 'var(--color-text-inverse)' }}
        aria-label="סגור"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 right-4 text-sm font-medium" style={{ color: 'var(--color-glass-white-65)' }}>
        {currentIndex + 1} / {sortedImages.length}
      </div>

      {/* Main image area */}
      <div
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center px-4 py-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev button */}
        {sortedImages.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'var(--color-glass-white-10)', color: 'var(--color-text-inverse)' }}
            aria-label="תמונה קודמת"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full max-h-[70vh]">
          {/* Vehicle photos originate from arbitrary CRM/storage hosts. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.image_url}
            alt={currentImage.alt_text || vehicleTitle}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Next button */}
        {sortedImages.length > 1 && (
          <button
            onClick={goNext}
            className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'var(--color-glass-white-10)', color: 'var(--color-text-inverse)' }}
            aria-label="תמונה הבאה"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div
          className="w-full max-w-3xl px-4 pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 overflow-x-auto justify-center py-2">
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 transition-all duration-200 border-2 ${
                  currentIndex === index
                    ? 'border-primary ring-2 ring-primary/50 opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={currentIndex === index ? undefined : { borderColor: 'var(--color-glass-white-20)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.image_url}
                  alt={image.alt_text || `תמונה ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
