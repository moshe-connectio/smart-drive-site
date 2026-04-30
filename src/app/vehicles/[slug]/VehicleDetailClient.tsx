'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Vehicle } from '@modules/vehicles/lib/repository';
import { formatPrice, formatKilometers, generateVehicleSlug } from '@shared/utils/formatting';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import VehicleImageGallery from '@modules/vehicles/components/VehicleImageGallery';
import { LeadForm } from '@modules/leads';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  relatedVehicles?: Vehicle[];
}

const RELATED_INITIAL = 3;
const RELATED_STEP = 3;

function pickRelatedCover(v: Vehicle): string | null {
  // Prefer the first joined vehicle_image (matches main gallery), then fall back
  // to main_image_url (which may be a stale/local path).
  const sorted = [...(v.images ?? [])]
    .filter((img) => !!img?.image_url)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  return sorted[0]?.image_url ?? v.main_image_url ?? null;
}

export default function VehicleDetailClient({ vehicle, relatedVehicles = [] }: VehicleDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [relatedVisible, setRelatedVisible] = useState(RELATED_INITIAL);
  const openModalBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // ─── Modal a11y: lock scroll, close on Escape, return focus to opener ────
  useEffect(() => {
    if (!isLeadModalOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const opener = openModalBtnRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog
    const t = window.setTimeout(() => modalCloseBtnRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsLeadModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      // Return focus to the trigger
      (previouslyFocused ?? opener)?.focus?.();
    };
  }, [isLeadModalOpen]);

  const hasMonthly = !!(vehicle.monthly_payment && vehicle.monthly_payment > 0);
  const isNew = vehicle.km !== null && vehicle.km === 0;
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '972501234567'}?text=${encodeURIComponent(
    `שלום, אני מתעניין ברכב: ${vehicle.title}`,
  )}`;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />

      <main className="flex-1">
        {/* ───── Hero band (premium dark, extends behind header) ───── */}
        <section className="vd-hero">
          <div className="vd-hero-glow" aria-hidden="true" />
          <Container>
            <nav aria-label="ניווט פירורי לחם" className="vd-hero-crumb">
              <ol>
                <li><Link href="/">ראשי</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/vehicles">מלאי מיידי</Link></li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="vd-hero-crumb-current">{vehicle.title}</li>
              </ol>
            </nav>

            <div className="vd-hero-grid">
              <div className="vd-hero-text">
                <span className="vd-hero-eyebrow">
                  <span className="vd-hero-eyebrow-dot" aria-hidden="true" />
                  {vehicle.is_published ? 'זמין במלאי מיידי' : 'נמכר'}
                </span>
                <h1 className="vd-hero-title">{vehicle.title}</h1>
                <p className="vd-hero-sub">
                  {vehicle.brand} {vehicle.model} · שנת {vehicle.year}
                </p>

                <ul className="vd-hero-chips" aria-label="נתוני רכב עיקריים">
                  {vehicle.km !== null && (
                    <li className="vd-hero-chip">
                      <span className="vd-hero-chip-label">ק״מ</span>
                      <span className="vd-hero-chip-value">{formatKilometers(vehicle.km)}</span>
                    </li>
                  )}
                  {vehicle.gear_type && (
                    <li className="vd-hero-chip">
                      <span className="vd-hero-chip-label">תיבה</span>
                      <span className="vd-hero-chip-value">{vehicle.gear_type}</span>
                    </li>
                  )}
                  {vehicle.fuel_type && (
                    <li className="vd-hero-chip">
                      <span className="vd-hero-chip-label">דלק</span>
                      <span className="vd-hero-chip-value">{vehicle.fuel_type}</span>
                    </li>
                  )}
                  <li className="vd-hero-chip">
                    <span className="vd-hero-chip-label">שנה</span>
                    <span className="vd-hero-chip-value">{vehicle.year}</span>
                  </li>
                </ul>
              </div>

              {isNew && (
                <span className="vd-hero-badge" aria-label="0 קילומטר">
                  <span className="vd-hero-badge-num">0</span>
                  <span className="vd-hero-badge-label">ק״מ · רכב חדש</span>
                </span>
              )}
            </div>
          </Container>
        </section>

        {/* ───── Main content ───── */}
        <section className="vd-main">
          <Container>
            {!vehicle.is_published && (
              <div className="vd-sold" role="status">
                <span className="vd-sold-dot" aria-hidden="true" />
                <div>
                  <p className="vd-sold-title">רכב זה כבר נמכר</p>
                  <p className="vd-sold-sub">נשמח לסייע באיתור חלופה מתאימה מהמלאי המעודכן.</p>
                </div>
              </div>
            )}

            <div className="vd-grid">
              {/* Gallery */}
              <div className="vd-gallery">
                <VehicleImageGallery
                  images={vehicle.images}
                  vehicleTitle={vehicle.title}
                  selectedIndex={selectedImageIndex}
                  onImageChange={setSelectedImageIndex}
                  imageHeight="h-60 sm:h-80 md:h-96 lg:flex-1 lg:h-auto lg:min-h-[420px]"
                  thumbSize="lg"
                />
              </div>

              {/* Sidebar */}
              <aside className="vd-side" aria-label="פרטי תמחור ויצירת קשר">
                {/* Pricing — minimal: monthly hero + cash price */}
                <div className="vd-pricing-card">
                  {hasMonthly ? (
                    <>
                      <span className="vd-pricing-eyebrow">החזר חודשי משוער</span>
                      <span className="vd-pricing-monthly-value">
                        {formatPrice(vehicle.monthly_payment as number)}
                        <small>/ חודש</small>
                      </span>
                      <div className="vd-pricing-cash-row">
                        <span className="vd-pricing-cash-label">מחיר מלא</span>
                        <span className="vd-pricing-cash-value">{formatPrice(vehicle.price)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="vd-pricing-eyebrow">מחיר מבוקש</span>
                      <span className="vd-pricing-monthly-value">
                        {formatPrice(vehicle.price)}
                      </span>
                    </>
                  )}
                </div>

                {/* Specs panel */}
                <div className="vd-specs-card">
                  <h2 className="vd-specs-title">מפרט עיקרי</h2>
                  <dl className="vd-specs-list">
                    {vehicle.km !== null && (
                      <SpecRow
                        label="ק״מ"
                        value={formatKilometers(vehicle.km)}
                        path="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    )}
                    {vehicle.gear_type && (
                      <SpecRow
                        label="תיבת הילוכים"
                        value={vehicle.gear_type}
                        path="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    )}
                    {vehicle.fuel_type && (
                      <SpecRow
                        label="סוג דלק"
                        value={vehicle.fuel_type}
                        path="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                    )}
                    <SpecRow
                      label="שנת ייצור"
                      value={String(vehicle.year)}
                      path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </dl>
                </div>

                {/* CTAs */}
                {vehicle.is_published ? (
                  <div className="vd-cta-stack">
                    <button
                      type="button"
                      ref={openModalBtnRef}
                      onClick={() => setIsLeadModalOpen(true)}
                      className="vd-cta-primary"
                    >
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="vd-cta-primary-text">
                        <span className="vd-cta-primary-full">קבלת פרטים ותיאום נסיעת מבחן</span>
                        <span className="vd-cta-primary-short">קבלת פרטים ותיאום</span>
                      </span>
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vd-cta-whatsapp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.541 4.064 1.487 5.779L0 24l6.395-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.001-1.374l-.36-.213-3.718.853.882-3.63-.235-.373A9.77 9.77 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                      </svg>
                      שיחה מהירה בוואטסאפ
                    </a>
                    <p className="vd-cta-note">
                      צוות סמארט דרייב חוזר אליכם בתוך זמן קצר עם כל הפרטים והתאמת מימון.
                    </p>
                  </div>
                ) : (
                  <div className="vd-sold-cta">
                    נשמח לעזור לכם למצוא רכב חלופי תואם מהמלאי המעודכן.
                  </div>
                )}
              </aside>
            </div>

            {/* Related vehicles — same category / similar monthly payment */}
            {relatedVehicles.length > 0 && (
              <section className="vd-related" aria-label="רכבים נוספים מהמלאי">
                <header className="vd-related-header">
                  <span className="vd-related-eyebrow">עוד מהמלאי</span>
                  <h2 className="vd-related-title">רכבים דומים שיכולים לעניין אתכם</h2>
                </header>
                <ul className="home-search-results" role="list">
                  {relatedVehicles.slice(0, relatedVisible).map((rv) => {
                    const href = `/vehicles/${generateVehicleSlug(rv.title, rv.year, rv.id)}`;
                    const cover = pickRelatedCover(rv);
                    const hasRvMonthly = !!(rv.monthly_payment && rv.monthly_payment > 0);
                    return (
                      <li key={rv.id} className="home-search-result">
                        <Link href={href} className="home-search-result-link">
                          <div className="home-search-result-media">
                            {cover && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={cover}
                                alt={rv.title}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.style.visibility = 'hidden';
                                }}
                              />
                            )}
                            {!cover && (
                              <div
                                className="home-search-result-media-fallback"
                                aria-hidden="true"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  width="32"
                                  height="32"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                >
                                  <path
                                    d="M5 17h14M5 17l1.5-5h11L19 17M7 17v2M17 17v2M8 12V8h8v4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div className="home-search-result-body">
                            <p className="home-search-result-mfr">{rv.brand}</p>
                            <h3 className="home-search-result-title">{rv.model}</h3>
                            <p className="home-search-result-trim">
                              {rv.year}
                              {rv.km !== null ? ` · ${formatKilometers(rv.km)} ק״מ` : ''}
                            </p>
                          </div>

                          <div className="home-search-result-price">
                            {hasRvMonthly ? (
                              <>
                                <span className="home-search-result-price-label">
                                  החזר חודשי
                                </span>
                                <span className="home-search-result-price-value">
                                  {formatPrice(rv.monthly_payment!)}
                                  <small>/ חודש</small>
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="home-search-result-price-label">
                                  מחיר
                                </span>
                                <span className="home-search-result-price-value">
                                  {formatPrice(rv.price)}
                                </span>
                              </>
                            )}
                            <span
                              className="home-search-result-cta"
                              aria-hidden="true"
                            >
                              לפרטי הרכב
                              <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {relatedVisible < relatedVehicles.length && (
                  <div className="vd-related-more">
                    <button
                      type="button"
                      className="vd-related-more-btn"
                      onClick={() =>
                        setRelatedVisible((n) =>
                          Math.min(n + RELATED_STEP, relatedVehicles.length),
                        )
                      }
                    >
                      טען עוד רכבים
                      <span className="vd-related-more-count">
                        ({relatedVehicles.length - relatedVisible} נוספים)
                      </span>
                    </button>
                  </div>
                )}
              </section>
            )}

            <div className="vd-back">
              <Link href="/vehicles" className="vd-back-link">
                <span aria-hidden="true">←</span>
                חזרה לרשימת המלאי
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />

      {/* Lead Form Modal */}
      {isLeadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vd-lead-modal-title"
        >
          <button
            type="button"
            aria-label="סגור טופס"
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'var(--color-overlay-black-50)', border: 0, padding: 0 }}
            onClick={() => setIsLeadModalOpen(false)}
          />

          <div className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
            >
              <div className="min-w-0">
                <p id="vd-lead-modal-title" className="font-bold text-lg leading-tight">השאירו פרטים</p>
                <p className="text-sm opacity-90 leading-tight truncate">{vehicle.title}</p>
              </div>
              <button
                ref={modalCloseBtnRef}
                onClick={() => setIsLeadModalOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full overlay-action-btn shrink-0"
                aria-label="סגור טופס"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto" style={{ background: 'var(--color-gray-100)' }}>
              <div className="p-5">
                <LeadForm
                  formId="vehicle-inquiry"
                  vehicleId={vehicle.id}
                  vehicleTitle={vehicle.title}
                  title=""
                  showEmail
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

function SpecRow({ label, value, path }: { label: string; value: string; path: string }) {
  return (
    <div className="vd-spec-row">
      <dt className="vd-spec-label">
        <span className="vd-spec-icon" aria-hidden="true">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
          </svg>
        </span>
        {label}
      </dt>
      <dd className="vd-spec-value">{value}</dd>
    </div>
  );
}
