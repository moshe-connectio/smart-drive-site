import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getVehicleBySlug,
  getPublishedVehicles,
} from '@modules/vehicles/lib/repository';
import { dealershipConfig } from '@core/config/site.config';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import Link from 'next/link';
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
      .filter((v) => v.slug)
      .map((v) => ({ slug: v.slug }));
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
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug).catch(() => null);

  if (!vehicle) {
    notFound();
  }

  const siteUrl = dealershipConfig.seo.siteUrl;
  const pageUrl = `${siteUrl}/vehicles/${slug}`;
  const imageUrl =
    vehicle.main_image_url ||
    vehicle.images?.[0]?.image_url ||
    `${siteUrl}${dealershipConfig.seo.ogImage}`;

  // ─── JSON-LD: Car (Product) ──────────────────────────────────────────────
  const carJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicle.title,
    description:
      vehicle.short_description ||
      `${vehicle.brand} ${vehicle.model} ${vehicle.year} למכירה`,
    image: imageUrl,
    url: pageUrl,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year?.toString(),
    mileageFromOdometer: vehicle.km != null
      ? {
          '@type': 'QuantitativeValue',
          value: vehicle.km,
          unitCode: 'KMT',
        }
      : undefined,
    vehicleTransmission: vehicle.gear_type ?? undefined,
    fuelType: vehicle.fuel_type ?? undefined,
    vehicleCondition: vehicle.condition === 'חדש' || vehicle.condition === '0 ק״מ'
      ? 'https://schema.org/NewCondition'
      : 'https://schema.org/UsedCondition',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Client component handles all interactivity */}
      <VehicleDetailClient vehicle={vehicle} />
    </>
  );
}

// 404 page when vehicle is not found
export function generateNotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="flex-1 py-12">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">הרכב לא נמצא</h1>
            <Link
              href="/vehicles"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
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

