# Smart & Drive — אתר סוכנות רכב

פלטפורמה מודרנית לסוכנויות רכב בנויה עם **Next.js 16**, **Tailwind CSS v4** ו-**Supabase**.

🌍 **[English Version →](./README.md)**

---

## תכונות עיקריות

- קטלוג רכבים דינמי עם סינון לפי מותג, קטגוריה וחיפוש חופשי
- דפי רכב עם כתובות SEO בעברית (`/vehicles/שם-רכב-שנה--uuid`)
- גלריית תמונות עם Lightbox
- מודאל טופס יצירת קשר (לידים)
- עמוד רכבים חדשים — יצרנים, דגמים, מפרטים
- נגישות: מצב ניגודיות גבוהה (80+ משתני CSS)
- Mobile-first רספונסיבי + תפריט המבורגר
- SEO: metadata, JSON-LD, sitemap, robots.txt
- ISR לטעינה מהירה
- RTL מלא

## Stack טכנולוגי

| תחום | טכנולוגיה |
|------|----------|
| Framework | Next.js 16.0.7 (Turbopack, App Router) |
| שפה | TypeScript |
| עיצוב | Tailwind CSS v4 + CSS Variables |
| מסד נתונים | Supabase (PostgreSQL + Storage) |
| דיפלוי | Vercel (auto-deploy מ-main) |
| CRM | Zoho CRM (Webhooks) |

## מבנה הפרויקט

```
src/
  app/                    # דפים ו-API Routes
    vehicles/             # קטלוג + דף רכב בודד [slug]
    new-vehicles/         # רכבים חדשים (יצרנים/דגמים)
    about/                # אודות
    api/                  # webhooks, leads, vehicles, new-vehicles
  core/
    config/               # site.config.ts, theme.config.ts
    lib/                  # supabase.ts, constants.ts
  modules/
    vehicles/             # רכבים: קומפוננטות, repository, types
    leads/                # טפסי לידים
    new-vehicles/         # רכבים חדשים
  shared/
    components/layout/    # Header, Footer, MobileMenu, Container
    components/ui/        # LeadModalButton, AccessibilityWidget
    utils/                # formatting, search, keywords, theme
```

## התחלה מהירה

```bash
git clone https://github.com/moshe-connectio/smart-drive-site.git
cd car-template-demo
npm install
# הגדר .env.local עם מפתחות Supabase
npm run dev
```

## משתני סביבה

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://smartanddrive.co.il
```

## מסד נתונים

- `vehicles` — רכבים (id, slug, title, brand, model, year, price, km, condition, images)
- `vehicle_images` — תמונות (image_url, position, alt_text)
- `leads` — טפסי לידים
- `new_vehicle_manufacturers/models/trim_levels/specifications` — רכבים חדשים

## דיפלוי

```bash
git push origin main  # auto-deploy ל-Vercel
```

---

**Repo:** https://github.com/moshe-connectio/smart-drive-site
**אתר:** https://smartanddrive.co.il
**עדכון אחרון:** אפריל 2026
