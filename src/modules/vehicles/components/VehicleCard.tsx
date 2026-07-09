'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@modules/vehicles/lib/repository';
import { formatPrice, generateVehicleSlug } from '@shared/utils/formatting';
import VehicleImageGallery from './VehicleImageGallery';
import ImageLightbox from './ImageLightbox';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleContentClick = () => {
    const slug = generateVehicleSlug(vehicle.title, vehicle.year, vehicle.id);
    router.push(`/vehicles/${slug}`);
  };

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };
  return (
    <div 
      className="group card-automotive flex flex-col h-full rounded-2xl overflow-hidden relative"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-card-bg)',
      }}
    >
      {/* Sold Ribbon - RTL adjusted */}
      {!vehicle.is_published && (
        <div
          className="absolute top-4 -left-8 transform -rotate-45 font-bold py-1.5 px-12 shadow-lg text-xs z-10"
          style={{ background: 'var(--gradient-primary)', color: 'var(--color-text-inverse)' }}
        >
          נמכר
        </div>
      )}

      {/* Image Gallery Section - Fixed Height */}
      <div
        className="p-3 flex items-center justify-center overflow-hidden min-h-44 sm:min-h-56 cursor-zoom-in"
        style={{ background: 'var(--color-background-secondary)' }}
        onClick={() => {
          if (vehicle.images && vehicle.images.length > 0) {
            setLightboxOpen(true);
          }
        }}
      >
        <VehicleImageGallery images={vehicle.images} vehicleTitle={vehicle.title} selectedIndex={selectedImageIndex} disableThumbnailClick={false} onImageChange={handleImageChange} />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && vehicle.images && vehicle.images.length > 0 && (
        <ImageLightbox
          images={vehicle.images}
          initialIndex={selectedImageIndex}
          vehicleTitle={vehicle.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Clickable Content Section - flex-1 to grow */}
      <div className="p-5 flex flex-col flex-1 cursor-pointer" onClick={handleContentClick}>
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--color-gray-900)' }}>
          {vehicle.title}
        </h3>

        {/* Spacer - pushes price to bottom */}
        <div className="flex-1"></div>

        {/* Monthly payment — always at bottom */}
        <div className="pt-4 relative" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col leading-tight">
              <span
                className="text-[0.7rem] uppercase tracking-[0.12em] font-semibold"
                style={{ color: 'var(--color-silver-500, var(--color-text-tertiary))' }}
              >
                החזר חודשי החל מ־
              </span>
              {vehicle.monthly_payment && vehicle.monthly_payment > 0 ? (
                <span
                  className="font-bold"
                  style={{
                    color: 'var(--color-gold-500, var(--color-gold, #d4a017))',
                    fontSize: '1.25rem',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {formatPrice(vehicle.monthly_payment)}
                  <span
                    className="font-medium"
                    style={{ fontSize: '0.78rem', color: 'var(--color-text-tertiary)' }}
                  >
                    {' '}
                    / חודש
                  </span>
                </span>
              ) : (
                <span
                  className="font-bold"
                  style={{
                    color: 'var(--color-silver-500, var(--color-text-tertiary))',
                    fontSize: '1.05rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  יתעדכן בקרוב
                </span>
              )}
            </div>
            <span
              className="group-hover:-translate-x-1 transition-transform inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              פרטים
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
