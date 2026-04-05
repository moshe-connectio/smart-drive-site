import { MetadataRoute } from 'next';
import { getPublishedVehicles } from '@modules/vehicles/lib/repository';
import { generateVehicleSlug } from '@shared/utils/formatting';
import { dealershipConfig } from '@core/config/site.config';

export const revalidate = 3600; // Regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = dealershipConfig.seo.siteUrl;

  // ─── Static pages ────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/vehicles`,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ─── Dynamic vehicle pages ────────────────────────────────────────────────
  let vehicleRoutes: MetadataRoute.Sitemap = [];
  try {
    const vehicles = await getPublishedVehicles();
    vehicleRoutes = vehicles
      .filter((v) => v.is_published && v.id)
      .map((v) => ({
        url: `${siteUrl}/vehicles/${generateVehicleSlug(v.title, v.year, v.id)}`,
        lastModified: new Date(v.updated_at || v.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch {
    // If DB is unreachable during build, return static routes only
  }

  return [...staticRoutes, ...vehicleRoutes];
}
