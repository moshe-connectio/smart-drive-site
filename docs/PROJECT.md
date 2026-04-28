# Car Dealership Template — Project Overview

## Description

A modern, production-ready car dealership website built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase. Deployed on Vercel with auto-deploy from main branch.

**Live site:** https://smartanddrive.co.il

## Tech Stack

- **Next.js 16.0.7** — App Router, Turbopack, ISR
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — CSS variables, RTL support
- **Supabase** — PostgreSQL + Storage for images
- **Vercel** — Hosting with auto-deploy
- **Zoho CRM** — Vehicle data via webhooks

## Architecture

Modular structure under `src/`:

- `app/` — Pages and API routes (vehicles, new-vehicles, about, leads)
- `core/` — Config (site.config.ts, theme.config.ts), Supabase client, constants
- `modules/` — Feature modules (vehicles, leads, new-vehicles) with components, lib, types
- `shared/` — Layout components (Header, Footer, MobileMenu), UI components, utilities

## Key Features

- **Vehicle catalog** with brand/category/search filters
- **SEO-friendly URLs**: `/vehicles/שם-רכב-שנה--uuid`
- **Image gallery** with lightbox and thumbnail navigation
- **Lead forms** via modal (LeadModalButton)
- **New vehicles** section (manufacturers → models → specs)
- **High-contrast mode** with 80+ CSS variable overrides
- **Mobile-first** responsive design with hamburger menu
- **Full SEO**: dynamic metadata, JSON-LD (WebSite, LocalBusiness, Car), sitemap, robots.txt
- **Accessibility widget** (WCAG AA compliant)

## Database (Supabase)

| Table | Purpose |
|-------|---------|
| `vehicles` | Main vehicle listings (20+ columns) |
| `vehicle_images` | Vehicle photos with positions |
| `leads` | Contact form submissions |
| `new_vehicle_manufacturers` | Car manufacturers |
| `new_vehicle_models` | Car models |
| `new_vehicle_trim_levels` | Trim levels |
| `new_vehicle_specifications` | Technical specs |

## URL Routing

- `/` — Homepage with hero, featured vehicles, stats
- `/vehicles` — Vehicle catalog with filters
- `/vehicles/[slug]` — Vehicle detail page (slug = `title-year--uuid`)
- `/new-vehicles` — New vehicles by manufacturer
- `/new-vehicles/[manufacturer]` — Models for a manufacturer
- `/new-vehicles/[manufacturer]/[model]` — Model details
- `/about` — About page

## Configuration

All business details in `src/core/config/site.config.ts`:
- Business name, contact, social links
- SEO settings (title, description, keywords, OG image)
- Theme colors in `theme.config.ts`

## Deploy

```bash
git push origin main  # auto-deploys to Vercel
```

---

**Repo:** https://github.com/moshe-connectio/smart-drive-site
**Last Updated:** April 2026
