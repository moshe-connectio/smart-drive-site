'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Vehicle } from '@modules/vehicles/lib/repository';
import { formatPrice, formatKilometers } from '@shared/utils/formatting';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import VehicleImageGallery from '@modules/vehicles/components/VehicleImageGallery';
import { LeadForm } from '@modules/leads';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
}

export default function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div style={{ background: 'var(--color-card-bg)', borderBottom: '1px solid var(--color-border)' }}>
          <Container>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-2 py-4 text-sm">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    ראשי
                  </Link>
                </li>
                <li aria-hidden="true">
                  <span style={{ color: 'var(--color-silver-500)' }}>/</span>
                </li>
                <li>
                  <Link href="/vehicles" className="text-primary hover:underline">
                    רכבים
                  </Link>
                </li>
                <li aria-hidden="true">
                  <span style={{ color: 'var(--color-silver-500)' }}>/</span>
                </li>
                <li aria-current="page">
                  <span style={{ color: 'var(--color-silver-300)' }}>{vehicle.title}</span>
                </li>
              </ol>
            </nav>
          </Container>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <Container>
            {/* Sold Ribbon - Only show if NOT published */}
            {!vehicle.is_published && (
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-lg" style={{ background: 'var(--color-error)', opacity: 0.1 }}></div>
                <div className="relative p-4 rounded" style={{ borderLeft: '4px solid var(--color-error)', background: 'var(--color-error-light)' }}>
                  <p className="font-semibold" style={{ color: 'var(--color-error-dark)' }}>🔴 רכב זה כבר נמכר</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                    הרכב אינו זמין כרגע. נשמח לעזור לכם למצוא חלופה מתאימה מהמלאי.
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
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.title}
                  </h1>
                  <p className="text-lg" style={{ color: 'var(--color-silver-300)' }}>
                    {vehicle.brand} {vehicle.model} • {vehicle.year}
                  </p>
                  {vehicle.km !== null && vehicle.km === 0 && (
                    <div
                      className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'var(--color-success)', color: 'var(--color-text-inverse)' }}
                    >
                      ✨ 0 ק״מ - חדש
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="rounded-lg p-4 sm:p-6 mb-4 sm:mb-6" style={{ background: 'var(--color-overlay-primary-soft)', border: '1px solid var(--color-overlay-primary-15)' }}>
                  <p className="text-xs sm:text-sm mb-2" style={{ color: 'var(--color-silver-400)' }}>מחיר מבוקש</p>
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
                          ק&quot;מ
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
                    <h2 className="font-bold text-gray-900 mb-3">תיאור הרכב</h2>
                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-silver-300)' }}>
                      {vehicle.short_description}
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  {vehicle.is_published ? (
                    <>
                      <button
                        onClick={() => setIsLeadModalOpen(true)}
                        className="w-full font-bold py-3 px-4 text-base rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        לקבלת פרטים ותיאום שיחה
                      </button>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '972501234567'}?text=${encodeURIComponent(`שלום, אני מתעניין ברכב: ${vehicle.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border-2 font-bold py-3 px-4 text-base rounded-lg transition-all flex items-center justify-center gap-2 hover:opacity-80"
                        style={{ borderColor: 'var(--color-whatsapp)', color: 'var(--color-whatsapp)' }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.541 4.064 1.487 5.779L0 24l6.395-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.001-1.374l-.36-.213-3.718.853.882-3.63-.235-.373A9.77 9.77 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                        </svg>
                        דברו איתנו בוואטסאפ
                      </a>
                    </>
                  ) : (
                    <div className="p-4 rounded" style={{ background: 'var(--color-warning-light)', borderLeft: '4px solid var(--color-warning)' }}>
                      <p className="font-semibold text-sm" style={{ color: 'var(--color-warning-dark)' }}>
                        ⚠️ רכב זה כבר נמכר. נשמח לסייע באיתור חלופה מתאימה.
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

      {/* Lead Form Modal */}
      {isLeadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="טופס יצירת קשר"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'var(--color-overlay-black-50)' }}
            onClick={() => setIsLeadModalOpen(false)}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
            >
              <div>
                <p className="font-bold text-lg leading-tight">השאירו פרטים</p>
                <p className="text-sm opacity-90 leading-tight">{vehicle.title}</p>
              </div>
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full overlay-action-btn"
                aria-label="סגור טופס"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form body */}
            <div style={{ background: 'var(--color-gray-100)' }}>
              <div className="p-5">
                <LeadForm
                  formId="vehicle-inquiry"
                  vehicleId={vehicle.id}
                  vehicleTitle={vehicle.title}
                  title=""
                  showMessage
                  submitLabel="שליחה וקבלת מענה אישי"
                  variant="minimal"
                  onSuccess={() => setIsLeadModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
