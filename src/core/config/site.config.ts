/**
 * Dealership Configuration
 * Central configuration file for customizing the car dealership template
 * Update these values to customize the template for your dealership
 */

export const dealershipConfig = {
  // Business Information
  business: {
    name: 'Smart & Drive',
    description: 'הדרך הנכונה לקניה חכמה!',
    tagline: 'הדרך הנכונה לקניה חכמה!',
    logo: '/logo.png',
    favicon: '/favicon.ico',
  },

  // Contact Information
  contact: {
    phone: '+972-52-640-6728',
    phoneDisplay: '052-640-6728',
    whatsapp: '+972-52-640-6728',
    email: 'info@smart-drive.co.il',
    address: 'דרך העצמאות 43, יהוד',
    businessHours: {
      weekdays: '09:00 - 18:00',
      friday: '09:00 - 14:00',
      saturday: 'סגור',
      sunday: '09:00 - 18:00',
    },
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/cardealership',
    instagram: 'https://instagram.com/cardealership',
    whatsapp: 'https://wa.me/972526406728',
    linkedin: 'https://linkedin.com/company/cardealership',
    youtube: 'https://youtube.com/@cardealership',
  },

  // Localization
  locale: {
    language: 'he-IL',
    currency: 'ILS',
    currencySymbol: '₪',
    direction: 'rtl', // 'rtl' for Hebrew, 'ltr' for English
  },

  // SEO & Meta
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://smartanddrive.co.il',
    title: 'Smart & Drive - הדרך הנכונה לקניה חכמה!',
    description: 'סוכנות רכב מובילה - מגוון רכבים איכותיים חדשים ומשומשים במחירים תחרותיים',
    keywords: 'רכבים, מכירת רכבים, סוכנות רכב, רכבים משומשים, רכבים חדשים, Smart Drive, קניית רכב',
    author: 'Smart & Drive',
    ogImage: '/og-image.png', // 1200x630px – create this image in public/
    twitterHandle: '@SmartAndDrive',
  },

  // Features & Sections
  features: {
    enableBlog: false,
    enableComparision: true,
    enableTestDrive: true,
    enableFinancing: true,
    enableTrade: true,
    enableSearch: true,
    enableFilters: true,
  },

  // Pagination & Limits
  pagination: {
    vehiclesPerPage: 12,
    featuredVehiclesCount: 6,
    maxSearchResults: 100,
  },

  // Cache & Performance
  cache: {
    homePageRevalidate: 3600, // 1 hour
    vehiclesPageRevalidate: 60, // 1 minute
    vehicleDetailRevalidate: 300, // 5 minutes
  },

  // Theme Colors (for documentation purposes)
  // All colors are defined in src/app/globals.css
  theme: {
    primary: '#2563eb', // Blue gradient
    secondary: '#7c3aed', // Purple gradient
    success: '#10b981', // Green
    warning: '#f59e0b', // Amber
    error: '#ef4444', // Red
  },

  // Company Info for Footer
  company: {
    foundedYear: 2020,
    employees: 50,
    satisfaction: '95%',
    yearsExperience: 4,
  },

  // Analytics
  analytics: {
    googleAnalyticsId: '', // Add your Google Analytics ID
    gtmId: '', // Add your Google Tag Manager ID
    enableAnalytics: false,
  },

  // Email Configuration
  email: {
    from: 'info@smart-drive.co.il',
    replyTo: 'info@smart-drive.co.il',
    bcc: 'info@smart-drive.co.il',
  },

  // Vehicle Database
  database: {
    maxImagesPerVehicle: 10,
    minImagesPerVehicle: 1,
    defaultVehiclesPerFetch: 100,
  },

  // API Configuration
  api: {
    // Shared secret for Zoho webhooks and new-vehicles admin routes.
    // Must match the value read by src/core/lib/webhook-auth.ts.
    webhookSecret: process.env.ZOHO_WEBHOOK_SECRET || '',
    // Bearer secret for Vercel cron endpoints (e.g. cleanup-vehicles).
    cronSecret: process.env.CRON_SECRET || '',
    apiTimeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // Feature Flags
  featureFlags: {
    betaFeatures: false,
    maintenanceMode: false,
    enableNewUI: true,
    enableDarkMode: false,
  },
} as const;

// Type exports for TypeScript support
export type DealershipConfig = typeof dealershipConfig;
