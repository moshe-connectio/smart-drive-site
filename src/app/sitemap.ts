import { MetadataRoute } from 'next';
import { getPublishedVehicles } from '@modules/vehicles/lib/repository';
import { getAllManufacturers } from '@modules/new-vehicles/lib/repository';
import { createServerSupabaseClient } from '@core/lib/supabase';
import { generateVehicleSlug } from '@shared/utils/formatting';
import { dealershipConfig } from '@core/config/site.config';
import type { ModelWithManufacturer } from '@modules/new-vehicles/types';

export const revalidate = 3600; // Regenerate sitemap every hour

// ─── Stable date for pages that change rarely ────────────────────────────────
// Update manually when the "about" page content changes significantly.
const ABOUT_LAST_MODIFIED = new Date('2025-01-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = dealershipConfig.seo.siteUrl;

  // ─── Inventory + manufacturer data (parallel fetch) ───────────────────────
  const [vehicles, manufacturers] = await Promise.allSettled([
    getPublishedVehicles(),
    getAllManufacturers(),
  ]);

  const publishedVehicles =
    vehicles.status === 'fulfilled'
      ? vehicles.value.filter((v) => v.is_published && v.id)
      : [];

  const activeManufacturers =
    manufacturers.status === 'fulfilled' ? manufacturers.value : [];

  // Derive "freshest" date from most recently updated vehicle
  const latestInventoryDate = publishedVehicles.reduce<Date | null>((latest, v) => {
    const d = new Date(v.updated_at || v.created_at);
    return latest === null || d > latest ? d : latest;
  }, null) ?? new Date();

  // ─── Static pages ────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: latestInventoryDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/vehicles`,
      lastModified: latestInventoryDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/new-vehicles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ─── Dynamic inventory vehicle pages ─────────────────────────────────────
  const vehicleRoutes: MetadataRoute.Sitemap = publishedVehicles.map((v) => ({
    url: `${siteUrl}/vehicles/${generateVehicleSlug(v.title, v.year, v.id)}`,
    lastModified: new Date(v.updated_at || v.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ─── New vehicles: manufacturer pages ────────────────────────────────────
  const manufacturerRoutes: MetadataRoute.Sitemap = activeManufacturers.map((m) => ({
    url: `${siteUrl}/new-vehicles/${m.slug}`,
    lastModified: new Date(m.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // ─── New vehicles: model pages (all models in one query) ─────────────────
  let modelRoutes: MetadataRoute.Sitemap = [];
  try {
    const client = createServerSupabaseClient();
    const { data: modelsData } = await client
      .from('models_with_manufacturer')
      .select('slug, manufacturer_slug, updated_at')
      .eq('is_active', true)
      .order('manufacturer_slug', { ascending: true })
      .order('display_order', { ascending: true });

    if (modelsData) {
      modelRoutes = (modelsData as Pick<ModelWithManufacturer, 'slug' | 'manufacturer_slug' | 'updated_at'>[]).map(
        (m) => ({
          url: `${siteUrl}/new-vehicles/${m.manufacturer_slug}/${m.slug}`,
          lastModified: new Date(m.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.65,
        })
      );
    }
  } catch {
    // Non-fatal: sitemap still works without model pages
  }

  return [...staticRoutes, ...vehicleRoutes, ...manufacturerRoutes, ...modelRoutes];
}
