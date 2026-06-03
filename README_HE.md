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
- דף בית: 4 כרטיסיות בשורה בדסקטופ + הצגה הדרגתית עם כפתור "טען עוד"
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
    styles/               # CSS מודולרי (10 קבצים)
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
supabase-setup/
  01_schema.sql, 02_seed_data.sql, 03_leads.sql
  04_fix_security_definer_views.sql   # תיקון אבטחה ל-views
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

# סוד משותף ל-Webhooks של Zoho ול-API של רכבים חדשים (POST/DELETE)
ZOHO_WEBHOOK_SECRET=...
# סוד ל-Cron של Vercel (ניקוי רכבים שנמכרו) – נשלח כ-Authorization: Bearer
CRON_SECRET=...
# אופציונלי – סוד לכותרת ב-webhook של לידים
LEADS_WEBHOOK_SECRET=...
```

> **אבטחה:** כל ה-endpoints המשנים נתונים (Webhooks, רכבים חדשים, Cron) דורשים סוד.
> `/api/leads` מוגבל ל-5 בקשות לדקה לכל IP.

## מסד נתונים

- `vehicles` — רכבים (id, slug, title, brand, model, year, price, km, condition, images)
- `vehicle_images` — תמונות (image_url, position, alt_text)
- `leads` — טפסי לידים
- `new_vehicles_manufacturers` / `new_vehicles_models` / `new_vehicles_trim_levels` / `new_vehicles_specifications` — רכבים חדשים
- Views (עם `security_invoker = true` — RLS של הטבלאות הבסיסיות נאכף): `manufacturers_with_counts`, `models_with_manufacturer`, `trim_levels_full_info`

הגדרה ראשונית: הרץ בסדר את קבצי `supabase-setup/01_schema.sql` → `02_seed_data.sql` → `03_leads.sql`. לתיקון Advisor של פרויקט קיים: `04_fix_security_definer_views.sql`.

## דיפלוי

```bash
git push origin main  # auto-deploy ל-Vercel
```

---

**Repo:** https://github.com/moshe-connectio/smart-drive-site
**אתר:** https://smartanddrive.co.il
**עדכון אחרון:** אפריל 2026
