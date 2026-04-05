import { MetadataRoute } from 'next';
import { dealershipConfig } from '@core/config/site.config';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = dealershipConfig.seo.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
