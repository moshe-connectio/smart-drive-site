# Smart & Drive — אתר סוכנות רכב

אתר מודרני לסוכנות רכב בעברית (RTL) עם קטלוג רכבים, סינון מתקדם, טפסי לידים ותמיכה בנגישות.  
בנוי עם **Next.js 16**, **Tailwind CSS v4**, **Supabase** ופרוס על **Vercel**.

## תכונות עיקריות

- קטלוג רכבים דינמי עם סינון לפי מותג, קטגוריה וחיפוש חופשי
- דפי רכב עם כתובות SEO-friendly (עברית + UUID)
- גלריית תמונות עם Lightbox
- טפסי לידים (יצירת קשר) עם מודאל
- עמוד רכבים חדשים (יצרנים, דגמים, מפרטים)
- נגישות: מצב ניגודיות גבוהה עם 80+ משתני CSS
- Mobile-first רספונסיבי + תפריט המבורגר
- SEO מלא: metadata, JSON-LD, sitemap, robots.txt
- ISR (Incremental Static Regeneration) לטעינה מהירה
- RTL מלא עם תמיכה בעברית

## טכנולוגיות

| תחום | טכנולוגיה |
|------|----------|
| Framework | Next.js 16.0.7 (Turbopack, App Router) |
| שפה | TypeScript |
| עיצוב | Tailwind CSS v4 + CSS Variables |
| מסד נתונים | Supabase (PostgreSQL) |
| תמונות | Supabase Storage |
| דיפלוי | Vercel (auto-deploy מ-main) |
| CRM | Zoho CRM (Webhooks) |

## מבנה הפרויקט

```
src/
  app/                    # דפים ו-API Routes
    vehicles/             # קטלוג רכבים + דף רכב בודד
    new-vehicles/         # רכבים חדשים (יצרנים/דגמים)
    about/                # אודות
    api/                  # Webhooks, leads, vehicles, new-vehicles
  core/
    config/               # site.config.ts, theme.config.ts
    lib/                  # supabase.ts, constants.ts
  modules/
    vehicles/             # קומפוננטות, repository, types
    leads/                # טפסי לידים
    new-vehicles/         # רכבים חדשים
  shared/
    components/layout/    # Header, Footer, MobileMenu, Container
    components/ui/        # LeadModalButton, AccessibilityWidget
    utils/                # formatting, search, keywords, theme
public/
  site.webmanifest        # PWA manifest
  logo.png                # לוגו
```

## הפעלה מהירה

```bash
git clone https://github.com/moshe-connectio/smart-drive-site.git
cd car-template-demo
npm install
cp .env.local.example .env.local   # מלא מפתחות Supabase
npm run dev
```

### משתני סביבה (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://smartanddrive.co.il
```

## מסד נתונים (Supabase)

- `vehicles` — טבלת רכבים (id, slug, title, brand, model, year, price, km, images...)
- `vehicle_images` — תמונות רכבים (image_url, position, alt_text)
- `leads` — טפסי לידים
- `new_vehicle_*` — טבלאות רכבים חדשים (manufacturers, models, trim_levels, specifications)

## SEO

- Metadata דינמי לכל דף + JSON-LD (WebSite, LocalBusiness, Car)
- Sitemap אוטומטי (`/sitemap.xml`) עם כל הרכבים
- robots.txt
- כתובות ידידותיות: `/vehicles/שם-רכב-שנה--uuid`

## נגישות

- מצב ניגודיות גבוהה עם 80+ CSS variable overrides
- ווידג'ט נגישות צף
- ניווט מקלדת
- תקן WCAG AA

## דיפלוי

- Auto-deploy מ-branch `main` ל-Vercel
- `git push origin main` — זה הכל
- מדריכים: `DEPLOYMENT_QUICK.md`, `DEPLOYMENT_GUIDE.md`

## תיעוד נוסף

| קובץ | תיאור |
|------|-------|
| `DEPLOYMENT_QUICK.md` | דיפלוי מהיר |
| `DEPLOYMENT_GUIDE.md` | מדריך דיפלוי מלא |
| `DATABASE_SCHEMA.md` | סכמת DB |
| `SUPABASE_SETUP_GUIDE.md` | הגדרת Supabase |
| `SMART_SEARCH_GUIDE.md` | חיפוש חכם |
| `MODULAR_STRUCTURE.md` | ארכיטקטורה מודולרית |

---

**Repo:** https://github.com/moshe-connectio/smart-drive-site  
**Deploy:** Vercel (auto-deploy on push to main)  
**עדכון אחרון:** אפריל 2026
