import { dealershipConfig } from '@core/config/site.config';

const siteUrl = dealershipConfig.seo.siteUrl;

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: dealershipConfig.business.name,
  url: siteUrl,
  description: dealershipConfig.seo.description,
  inLanguage: 'he-IL',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/vehicles?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: dealershipConfig.business.name,
  description: dealershipConfig.seo.description,
  url: siteUrl,
  logo: `${siteUrl}${dealershipConfig.business.logo}`,
  image: `${siteUrl}${dealershipConfig.seo.ogImage}`,
  telephone: dealershipConfig.contact.phone,
  email: dealershipConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'דרך העצמאות 43',
    addressLocality: 'יהוד',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.033,
    longitude: 34.892,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    dealershipConfig.social.facebook,
    dealershipConfig.social.instagram,
    dealershipConfig.social.linkedin,
    dealershipConfig.social.youtube,
  ],
  priceRange: '₪₪₪',
  currenciesAccepted: 'ILS',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: {
    '@type': 'Country',
    name: 'Israel',
  },
};
