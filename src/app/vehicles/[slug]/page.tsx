import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  getVehicleBySlug,
  getPublishedVehicles,
} from '@modules/vehicles/lib/repository';
import { generateVehicleSlug } from '@shared/utils/formatting';
import { dealershipConfig } from '@core/config/site.config';
import { ROUTES, SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';
import { safeJsonLd } from '@shared/utils/json-ld';
import VehicleDetailClient from './VehicleDetailClient';

export const revalidate = 300; // ISR – revalidate every 5 minutes

interface VehicleDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Pre-generate paths for published vehicles at build time ─────────────────
export async function generateStaticParams() {
  try {
    const vehicles = await getPublishedVehicles();
    return vehicles
      .filter((v) => v.id)
      .map((v) => ({ slug: generateVehicleSlug(v.title, v.year, v.id) }));
  } catch {
    return [];
  }
}

// ─── Dynamic per-page metadata ────────────────────────────────────────────────
export async function generateMetadata(
  { params }: VehicleDetailPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug).catch(() => null);

  const siteUrl = dealershipConfig.seo.siteUrl;
  const pageUrl = `${siteUrl}/vehicles/${slug}`;

  if (!vehicle) {
    return {
      title: 'רכב לא נמצא',
      description: dealershipConfig.seo.description,
    };
  }

  const title = `${vehicle.title} ${vehicle.year} | ${dealershipConfig.business.name}`;
  const description =
    vehicle.short_description ||
    `${vehicle.brand} ${vehicle.model} ${vehicle.year}${vehicle.km ? ` • ${vehicle.km.toLocaleString('he-IL')} ק"מ` : ''}${vehicle.gear_type ? ` • ${vehicle.gear_type}` : ''} – ${dealershipConfig.seo.description}`;

  const image =
    vehicle.main_image_url ||
    vehicle.images?.[0]?.image_url ||
    `${siteUrl}${dealershipConfig.seo.ogImage}`;

  const keywords = [
    vehicle.brand,
    vehicle.model,
    `${vehicle.brand} ${vehicle.model}`,
    `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    vehicle.gear_type ?? '',
    vehicle.fuel_type ?? '',
    ...(vehicle.categories ?? []),
    'רכב למכירה',
    'סוכנות רכב',
    dealershipConfig.business.name,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'he_IL',
      url: pageUrl,
      siteName: dealershipConfig.business.name,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// ─── Server component (SSR / ISR) ─────────────────────────────────────────────
export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  if (!SHOW_IMMEDIATE_INVENTORY) {
    redirect(ROUTES.home);
  }

  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug).catch(() => null);

  if (!vehicle) {
    notFound();
  }

  // Related vehicles: same category overlap + closest monthly payment, excluding self.
  const allVehicles = await getPublishedVehicles().catch(() => []);
  const myCats = new Set(vehicle.categories ?? []);
  const myMonthly = vehicle.monthly_payment ?? null;
  const myPrice = vehicle.price ?? null;
  const relatedVehicles = allVehicles
    .filter((v) => v.id !== vehicle.id && v.is_published)
    .map((v) => {
      const overlap = (v.categories ?? []).reduce(
        (n, c) => n + (myCats.has(c) ? 1 : 0),
        0,
      );
      const monthlyDiff =
        myMonthly && v.monthly_payment
          ? Math.abs(v.monthly_payment - myMonthly)
          : Number.POSITIVE_INFINITY;
      const priceDiff =
        myPrice && v.price ? Math.abs(v.price - myPrice) : Number.POSITIVE_INFINITY;
      return { v, overlap, monthlyDiff, priceDiff };
    })
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        a.monthlyDiff - b.monthlyDiff ||
        a.priceDiff - b.priceDiff,
    )
    .slice(0, 6)
    .map((s) => s.v);

  const siteUrl = dealershipConfig.seo.siteUrl;
  const pageUrl = `${siteUrl}/vehicles/${slug}`;
  const imageUrl =
    vehicle.main_image_url ||
    vehicle.images?.[0]?.image_url ||
    `${siteUrl}${dealershipConfig.seo.ogImage}`;

  // ─── JSON-LD: Car (Product) ──────────────────────────────────────────────
  // bodyType is the first vehicle category that looks like a body style; remaining
  // categories are emitted as additionalProperty for Google's automotive rich results.
  const bodyTypeCandidates = vehicle.categories ?? [];
  const galleryImages = (vehicle.images ?? [])
    .map((img) => img.image_url)
    .filter(Boolean)
    .slice(0, 8);

  const carJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicle.title,
    description:
      vehicle.short_description ||
      `${vehicle.brand} ${vehicle.model} ${vehicle.year} למכירה`,
    image: galleryImages.length > 0 ? galleryImages : imageUrl,
    url: pageUrl,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year?.toString(),
    productionDate: vehicle.year?.toString(),
    bodyType: bodyTypeCandidates[0] ?? undefined,
    mileageFromOdometer: vehicle.km != null
      ? {
          '@type': 'QuantitativeValue',
          value: vehicle.km,
          unitCode: 'KMT',
        }
      : undefined,
    vehicleTransmission: vehicle.gear_type ?? undefined,
    fuelType: vehicle.fuel_type ?? undefined,
    numberOfPreviousOwners:
      vehicle.hand != null && vehicle.hand > 1 ? vehicle.hand - 1 : undefined,
    vehicleConfiguration: vehicle.trim ?? undefined,
    vehicleCondition: vehicle.condition === 'חדש' || vehicle.condition === '0 ק״מ'
      ? 'https://schema.org/NewCondition'
      : 'https://schema.org/UsedCondition',
    additionalProperty: bodyTypeCandidates.slice(1).map((category) => ({
      '@type': 'PropertyValue',
      name: 'קטגוריה',
      value: category,
    })),
    offers: {
      '@type': 'Offer',
      priceCurrency: dealershipConfig.locale.currency,
      price: vehicle.price,
      availability: vehicle.is_published
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      url: pageUrl,
      seller: {
        '@type': 'AutoDealer',
        name: dealershipConfig.business.name,
        url: siteUrl,
      },
    },
  };

  // ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ראשי',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'רכבים',
        item: `${siteUrl}/vehicles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: vehicle.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(carJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />

      {/* Client component handles all interactivity */}
      <VehicleDetailClient vehicle={vehicle} relatedVehicles={relatedVehicles} />
    </>
  );
}
