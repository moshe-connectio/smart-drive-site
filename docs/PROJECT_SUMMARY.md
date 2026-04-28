# סיכום פרויקט Smart & Drive

## מה נבנה

אתר סוכנות רכב מלא עם הפיצ'רים הבאים:

### Frontend
- דף בית עם Hero, רכבים מומלצים, סטטיסטיקות
- קטלוג רכבים עם סינון (מותג, קטגוריה, חיפוש)
- דף רכב בודד עם גלריה, מפרט ומידע מלא
- רכבים חדשים (יצרנים → דגמים → מפרטים)
- עמוד אודות
- טפסי לידים דרך מודאל

### SEO
- Metadata דינמי לכל דף
- JSON-LD: WebSite, LocalBusiness, Car
- Sitemap אוטומטי + robots.txt
- כתובות SEO בעברית: `/vehicles/שם-רכב-שנה--uuid`

### עיצוב
- Mobile-first רספונסיבי
- Header מקצועי עם ניווט מרכזי נפרש
- תפריט המבורגר למובייל
- מצב ניגודיות גבוהה (80+ CSS overrides)
- ווידג'ט נגישות (WCAG AA)

### Backend & API
- Webhooks ל-Zoho CRM (create/update/delete/mark-sold)
- העלאת תמונות ל-Supabase Storage
- API routes לרכבים חדשים
- Cron job יומי לניקוי רכבים שנמכרו
- טפסי לידים

### מסד נתונים (Supabase)
- vehicles + vehicle_images
- leads
- new_vehicle_manufacturers/models/trim_levels/specifications

## קונפיגורציה

הכל מרוכז ב-`src/core/config/site.config.ts`:
שם עסק, טלפון, מייל, כתובת, רשתות חברתיות, SEO, שעות פעילות.

## דיפלוי

Auto-deploy מ-branch `main` ל-Vercel:
```bash
git push origin main
```

## משתני סביבה

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://smartanddrive.co.il
```

---

**אתר:** https://smartanddrive.co.il
**Repo:** https://github.com/moshe-connectio/smart-drive-site
**עדכון אחרון:** אפריל 2026
