# Smart & Drive — סקירת פרויקט

## תיאור

אתר סוכנות רכב מודרני ומוכן לפרודקשן. בנוי עם Next.js 16, TypeScript, Tailwind CSS v4 ו-Supabase.

**אתר חי:** https://smartanddrive.co.il

## ארכיטקטורה

מבנה מודולרי תחת `src/`:

- `app/` — דפים ו-API routes
- `core/` — קונפיגורציה (site.config.ts), Supabase client, קבועים
- `modules/` — מודולי פיצ'רים (vehicles, leads, new-vehicles)
- `shared/` — Layout (Header, Footer, MobileMenu), UI, utilities

## תכונות שהושלמו

### SEO
- Metadata דינמי לכל דף
- JSON-LD: WebSite, LocalBusiness, Car
- Sitemap אוטומטי + robots.txt
- כתובות SEO-friendly בעברית: `/vehicles/שם-רכב-שנה--uuid`

### עיצוב ורספונסיביות
- Mobile-first עם תפריט המבורגר (MobileMenu)
- Header מקצועי: ניווט מרכזי נפרש, CTA אייקון בלבד במובייל
- Hover effects עם underline animation
- מפריד בין אייקוני רשתות לכפתור CTA

### נגישות
- מצב ניגודיות גבוהה עם 80+ CSS variable overrides
- Force overrides עבור `.bg-white`, `.bg-header`
- ווידג'ט נגישות צף
- עומד בתקן WCAG AA

### קטלוג רכבים
- סינון לפי מותג, קטגוריה, חיפוש חופשי
- גלריית תמונות עם Lightbox ותמונות ממוזערות
- כרטיסי רכב עם hover effects
- דרופדאון קטגוריות (z-index תוקן)

### לידים
- LeadModalButton — כפתור שפותח מודאל עם טופס יצירת קשר
- משתלב ב-Header ובדפי רכב

### רכבים חדשים
- יצרנים → דגמים → רמות גימור → מפרטים
- API routes לכל ישות

## מסד נתונים

| טבלה | תיאור |
|------|-------|
| `vehicles` | רכבים (20+ שדות) |
| `vehicle_images` | תמונות עם positions |
| `leads` | טפסי לידים |
| `new_vehicle_*` | יצרנים, דגמים, רמות גימור, מפרטים |

## API Routes

| Route | תיאור |
|-------|-------|
| `POST /api/webhooks/vehicles` | יצירה/עדכון רכב (Zoho CRM) |
| `POST /api/webhooks/vehicles/delete` | מחיקת רכב |
| `POST /api/webhooks/vehicles/mark-sold` | סימון כנמכר |
| `POST /api/webhooks/upload-image` | העלאת תמונה |
| `POST /api/leads` | שליחת טופס ליד |
| `GET /api/vehicles/[id]` | שליפת רכב לפי ID |
| `GET /api/new-vehicles/*` | יצרנים, דגמים, מפרטים |
| `GET /api/cron/cleanup-vehicles` | ניקוי רכבים שנמכרו (daily) |

## דיפלוי

```bash
git push origin main  # auto-deploy ל-Vercel
```

---

**Repo:** https://github.com/moshe-connectio/smart-drive-site
**עדכון אחרון:** אפריל 2026
