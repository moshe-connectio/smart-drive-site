'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@modules/vehicles/lib/repository';
import { formatPrice, formatKilometers, extractIdFromSlug } from '@shared/utils/formatting';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import VehicleImageGallery from '@modules/vehicles/components/VehicleImageGallery';

interface VehicleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchVehicle = async () => {
      try {
        setLoading(true);
        // Call API endpoint to fetch vehicle (slug contains ID at the end)
        const response = await fetch(`/api/vehicles/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch vehicle: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data) {
          setError('הרכב לא נמצא');
          setVehicle(null);
        } else {
          setVehicle(data);
          setSelectedImageIndex(0);
        }
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('שגיאה בטעינת פרטי הרכב');
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
        <Header />
        <main className="flex-1 py-12">
          <Container>
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4" style={{ color: 'var(--color-silver-300)' }}>טוען פרטי רכב...</p>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
        <Header />
        <main className="flex-1 py-12">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {error || 'הרכב לא נמצא'}
              </h1>
              <Link
                href="/vehicles"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                חזור לרשימת הרכבים
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div style={{ background: 'var(--color-card-bg)', borderBottom: '1px solid var(--color-border)' }}>
          <Container>
            <div className="flex items-center gap-2 py-4 text-sm">
              <Link href="/vehicles" className="text-primary hover:underline">
                רכבים
              </Link>
              <span style={{ color: 'var(--color-silver-500)' }}>/</span>
              <span style={{ color: 'var(--color-silver-300)' }}>{vehicle.title}</span>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <Container>
            {/* Sold Ribbon - Only show if NOT published */}
            {!vehicle.is_published && (
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-500 opacity-10 rounded-lg"></div>
                <div className="relative p-4 border-l-4 border-red-500 bg-red-50 rounded">
                  <p className="text-red-800 font-semibold">🔴 רכב זה כבר נמכר</p>
                  <p className="text-red-700 text-sm mt-1">
                    אנא בדוק רכבים אחרים בחנותנו
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Images */}
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                  <div className="p-4 sm:p-6">
                    <VehicleImageGallery 
                      images={vehicle.images} 
                      vehicleTitle={vehicle.title}
                      selectedIndex={selectedImageIndex}
                      onImageChange={setSelectedImageIndex}
                      imageHeight="h-72 sm:h-96 lg:h-[550px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-1">
                {/* Title & Status */}
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.title}
                  </h1>
                  <p className="text-lg" style={{ color: 'var(--color-silver-300)' }}>
                    {vehicle.brand} {vehicle.model} • {vehicle.year}
                  </p>
                  {vehicle.km !== null && vehicle.km === 0 && (
                    <div className="mt-3 inline-block bg-success text-white text-xs font-semibold px-3 py-1 rounded-full">
                      ✨ חדש מהאפס
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="rounded-lg p-4 sm:p-6 mb-4 sm:mb-6" style={{ background: 'rgba(26, 63, 168, 0.06)', border: '1px solid rgba(26, 63, 168, 0.15)' }}>
                  <p className="text-xs sm:text-sm mb-2" style={{ color: 'var(--color-silver-400)' }}>מחיר</p>
                  <p className="text-3xl sm:text-4xl font-bold text-success">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="rounded-lg p-4 sm:p-6 mb-4 sm:mb-6" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                  <h2 className="font-bold text-gray-900 mb-4">מפרט טכני</h2>
                  
                  <div className="space-y-4">
                    {/* Kilometers */}
                    {vehicle.km !== null && (
                      <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-silver-400)' }}>
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          ק"מ
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatKilometers(vehicle.km)}
                        </span>
                      </div>
                    )}

                    {/* Transmission */}
                    {vehicle.gear_type && (
                      <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-silver-400)' }}>
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          תיבת הילוכים
                        </span>
                        <span className="font-semibold text-gray-900">
                          {vehicle.gear_type}
                        </span>
                      </div>
                    )}

                    {/* Fuel Type */}
                    {vehicle.fuel_type && (
                      <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-silver-400)' }}>
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                          סוג דלק
                        </span>
                        <span className="font-semibold text-gray-900">
                          {vehicle.fuel_type}
                        </span>
                      </div>
                    )}

                    {/* Year */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="flex items-center gap-2" style={{ color: 'var(--color-silver-400)' }}>
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        שנה
                      </span>
                      <span className="font-semibold text-gray-900">
                        {vehicle.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {vehicle.short_description && (
                  <div className="rounded-lg p-4 sm:p-6 mb-4 sm:mb-6" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                    <h2 className="font-bold text-gray-900 mb-3">תיאור</h2>
                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-silver-300)' }}>
                      {vehicle.short_description}
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  {vehicle.is_published ? (
                    <>
                      <button className="w-full bg-primary text-white font-bold py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        צור קשר לשאלות
                      </button>
                      <button className="w-full border-2 border-primary text-primary font-bold py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        שמור לבחירה
                      </button>
                    </>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                      <p className="text-yellow-700 font-semibold text-sm">
                        ⚠️ רכב זה כבר נמכר
                      </p>
                    </div>
                  )}
                </div>

                {/* Back Link */}
                <Link
                  href="/vehicles"
                  className="mt-4 sm:mt-6 text-primary hover:underline text-center block font-medium text-sm sm:text-base"
                >
                  ← חזור לרשימת הרכבים
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
}
