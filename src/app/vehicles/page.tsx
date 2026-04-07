import type { Metadata } from 'next';
import { getPublishedVehicles, deleteSoldVehicles, getUniqueBrands, getUniqueCategories, Vehicle } from '@modules/vehicles/lib/repository';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { FilterableVehicleGrid } from '@modules/vehicles/components/FilterableVehicleGrid';
import { dealershipConfig } from '@core/config/site.config';

export const revalidate = 60; // ISR - 1 minute

const siteUrl = dealershipConfig.seo.siteUrl;

export const metadata: Metadata = {
  title: `רכבים למכירה | ${dealershipConfig.business.name}`,
  description: `מבחר רכבים למכירה עם בדיקות מקיפות, שקיפות מלאה וליווי מקצועי בכל שלב הרכישה.`,
  keywords: `רכבים למכירה, ${dealershipConfig.seo.keywords}`,
  alternates: {
    canonical: `${siteUrl}/vehicles`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/vehicles`,
    title: `רכבים למכירה | ${dealershipConfig.business.name}`,
    description: 'מבחר רכבים למכירה עם בדיקות מקיפות, שקיפות מלאה וליווי מקצועי.',
    images: [
      {
        url: dealershipConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `רכבים למכירה - ${dealershipConfig.business.name}`,
      },
    ],
  },
};

export default async function VehiclesPage() {
  let vehicles: Vehicle[] = [];
  let brands: string[] = [];
  let categories: string[] = [];
  let error: string | null = null;

  try {
    // Clean up sold vehicles older than 2 days
    await deleteSoldVehicles();
    
    // Fetch published vehicles
    vehicles = await getPublishedVehicles();
    // Filter only published vehicles (not sold)
    vehicles = vehicles.filter(v => v.is_published);

    // Get unique brands and categories for filters
    brands = await getUniqueBrands();
    categories = await getUniqueCategories();
  } catch (err) {
    console.error('Failed to load vehicles:', err);
    error = 'שגיאה בטעינת הרכבים. אנא נסה שוב מאוחר יותר.';
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 sm:py-14" style={{ background: 'var(--color-primary-800)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--color-gold)' }} />
          <Container>
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
                רכבים למכירה
              </h1>
              <p className="text-base sm:text-lg text-white/90">
                מבחר רכבים בדוקים עם שקיפות מלאה, תנאי רכישה הוגנים וליווי מקצועי
              </p>
            </div>
          </Container>
        </section>

        {/* Stats Bar */}
        <div className="py-6" style={{ background: 'var(--color-background-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <Container>
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-center">
              <div>
                <div className="text-xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {vehicles.length}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-gray-500)' }}>רכבים זמינים</div>
              </div>
              <div className="w-px h-10 sm:h-12" style={{ background: 'var(--color-border)' }}></div>
              <div>
                <div className="text-xl sm:text-3xl font-bold" style={{ color: 'var(--color-success)' }}>150</div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-gray-500)' }}>נקודות בדיקה לרכב</div>
              </div>
              <div className="w-px h-10 sm:h-12" style={{ background: 'var(--color-border)' }}></div>
              <div>
                <div className="text-xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>1:1</div>
                <div className="text-xs sm:text-sm" style={{ color: 'var(--color-gray-500)' }}>ליווי אישי בעסקה</div>
              </div>
            </div>
          </Container>
        </div>

        {/* Vehicles Grid */}
        <Container className="py-12">
          {error && (
            <div className="mb-8 p-4 bg-error/10 border border-error text-error rounded-lg">
              {error}
            </div>
          )}

          <FilterableVehicleGrid 
            vehicles={vehicles}
            brands={brands}
            categories={categories}
          />
        </Container>
      </main>

      <Footer />
    </div>
  );
}
