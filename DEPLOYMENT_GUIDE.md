# 🚀 מדריך דפלוי - Vercel

## 📋 דרישות קדם

✅ חשבון GitHub (חינם)
✅ חשבון Vercel (חינם)
✅ Git מותקן
✅ Repository עם הקוד

---

## שלב 1: הכנת הפרויקט

### 1.1 בדיקת ה-package.json

וודא שיש לך:

```json
{
  "name": "car-template-demo",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 1.2 בדיקת קבצי הקונפיגורציה

✅ `next.config.ts` - קיים
✅ `tsconfig.json` - קיים
✅ `postcss.config.mjs` - קיים
✅ `eslint.config.mjs` - קיים

### 1.3 יצירת `.gitignore`

```bash
cat > .gitignore << 'EOF'
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next
.next/
out/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF
```

---

## שלב 2: Git Setup

### 2.1 אתחול Repository (אם עדיין לא)

```bash
cd /Users/gmscrm/Desktop/tamplate-site/car-template-demo

# אתחל git אם צריך
git init

# הוסף את כל הקבצים
git add .

# Commit ראשון
git commit -m "Initial commit: Car Template with Stripe Integration"

# תסתכל ב-Vercel שם לקבל את הפקודות המדויקות
```

### 2.2 Push ל-GitHub

1. היכנס ל-GitHub: https://github.com/new
2. צור repository חדש בשם `car-template-demo`
3. בחזרה בטרמינל:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/car-template-demo.git
git push -u origin main
```

---

## שלב 3: דפלוי ב-Vercel

### 3.1 התחברות ל-Vercel

1. היכנס ל-https://vercel.com
2. לחץ **Sign Up**
3. בחר **Continue with GitHub**
4. אשר התחברות

### 3.2 ייצוא הפרויקט

```bash
cd /Users/gmscrm/Desktop/tamplate-site/car-template-demo

# התקן Vercel CLI
npm i -g vercel

# התחבר
vercel login

# דפלוי ראשוני
vercel
```

בתהליך בחר:
- ✅ Set up and deploy? → **Yes**
- Link to existing project? → **No**
- Project name → `car-template-demo`
- Framework → **Next.js**
- Root directory → `.`

### 3.3 או דפלוי דרך Vercel Dashboard

1. https://vercel.com/dashboard
2. **Add New...** → **Project**
3. **Import Git Repository**
4. בחר את ה-GitHub repo שלך
5. לחץ **Import**

---

## שלב 4: הגדרת משתני סביבה (חשוב!)

### 4.1 ב-Vercel Dashboard

1. Project → **Settings** → **Environment Variables**
2. הוסף את כל המשתנים מ-`.env.local.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# סודות אבטחה (חובה ל-endpoints מוגנים)
ZOHO_WEBHOOK_SECRET=your_shared_secret   # Webhooks + API רכבים חדשים (POST/DELETE)
CRON_SECRET=your_cron_secret             # Vercel Cron (ניקוי רכבים שנמכרו)
LEADS_WEBHOOK_SECRET=your_leads_secret   # אופציונלי – webhook לידים

# Stripe (Live Keys!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**⚠️ חשוב**: בדוק שבחרת **Live Keys** של Stripe, לא Test Keys!

> **אבטחה:** ללא `ZOHO_WEBHOOK_SECRET` כל ה-Webhooks ו-API הרכבים החדשים יחזירו 401/500.
> ללא `CRON_SECRET` ה-Cron `/api/cron/cleanup-vehicles` יחזיר 401. Vercel מזריק את
> כותרת ה-`Authorization: Bearer <CRON_SECRET>` אוטומטית כשהמשתנה מוגדר.

### 4.2 שמירה ודפלוי מחדש

אחרי הוספת המשתנים:
1. Vercel יתחיל דפלוי חדש באופן אוטומטי
2. חכה שיישלם (3-5 דקות)
3. ראה את הקישור בפינה

---

## שלב 5: הגדרת Stripe Webhooks

### 5.1 הוסף את ה-Webhook URL

1. Stripe Dashboard → **Developers** → **Webhooks**
2. **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/payment/webhook`
4. בחר Events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. **Add endpoint**
6. Copy את ה-**Signing secret**

### 5.2 הוסף לVERCEL

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. הוסף משתנה חדש:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```
3. **Add**
4. Vercel יתחיל דפלוי חדש

---

## שלב 6: בדיקת הדפלוי

### 6.1 בדיקות בסיסיות

1. פתח את ה-URL שלך: `https://your-domain.vercel.app`
2. ✅ בדוק שהעמוד נטען בלי שגיאות
3. ✅ ניווט לדפים שונים
4. ✅ בדוק שהעמודים מטעינים

### 6.2 בדיקת Supabase

```bash
# בדוק שהחיבור לDB עובד
curl -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  "https://YOUR_PROJECT.supabase.co/rest/v1/products?limit=1"
```

### 6.3 בדיקת תשלום (Test Mode)

1. עבור ל-Stripe Dashboard → **Test mode**
2. הוסף מוצר לעגלה
3. לחץ "תשלום"
4. השתמש בכרטיס בדיקה: `4242 4242 4242 4242`
5. ✅ וודא שמגיע לדף Success

### 6.4 בדיקות Logs

ב-Vercel Dashboard:
1. Project → **Deployments**
2. בחר את ה-Deployment האחרון
3. **Logs** → ראה את ה-errors אם יש

---

## שלב 7: קישור Domain משלך

### 7.1 אם יש לך Domain בחברה אחרת

1. Vercel Dashboard → **Project Settings** → **Domains**
2. **Add** → הכנס את ה-Domain שלך
3. בעל ה-Domain שלך:
   - קבל את ה-Nameservers מVERCEL
   - עדכן אצל ספק ה-Domain שלך
   - חכה 24-48 שעות

### 7.2 Domain חדש דרך Vercel

1. **Add Domain**
2. בחר **Buy with Vercel**
3. שלם וסיימת!

---

## שלב 8: Monitoring ו-Logs

### בדוק את ה-Logs:

```bash
# דוק שגיאות בקולי API
vercel logs

# או דרך Vercel Dashboard:
# Project → Deployments → בחר Deployment → Logs
```

### הגדר Alerts (אופציונלי):

1. Vercel → **Project Settings** → **Alerts**
2. הגדר התראות ל-errors
3. קבל email בעת בעיה

---

## 🔧 Rollback (בחזרה לגרסה קודמת)

אם משהו שבור:

1. Vercel Dashboard → **Deployments**
2. בחר deployment קודם טוב
3. **Promote to Production**

---

## ⚡ עצות לביצועים

### 1. הפעל Image Optimization
```ts
// next.config.ts
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
}
```

### 2. הפעל Caching
```ts
// next.config.ts
export default {
  headers: async () => {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}
```

### 3. בדוק ביצועים
- https://pagespeed.web.dev
- https://web.dev/measure

---

## 🔒 אבטחה

### Checklist:

- [ ] בדוק שכל Environment Variables מוגדרים
- [ ] וודא שאתה משתמש בLive Keys של Stripe (לא Test)
- [ ] HTTPS מופעל (Vercel תופעל אוטומטית)
- [ ] בדוק רשימת Allowed Origins ב-Supabase
- [ ] בדוק CORS settings

### הגדרות Supabase:

1. Supabase → **Project Settings** → **API**
2. בדוק **CORS** - הוסף את ה-domain שלך

---

## 📊 דוחות וניטור

### בדוק Analytics:

1. Vercel → **Analytics**
2. ראה traffic, Core Web Vitals וביצועים

### בדוק Errors:

1. Vercel → **Deployments** → בחר Deployment
2. **Logs** → חפש errors

---

## 🆘 Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
git push
# Vercel יתחיל דפלוי חדש
```

### Error: "Environment variable not found"
1. בדוק שהמשתנה מוגדר ב-Vercel
2. וודא שהשם נכון (קייס-סנסיטיבי)
3. פעם אחריי דקות עבור ה-redeploy

### Error: "Stripe payment failed"
1. בדוק ש-STRIPE_SECRET_KEY נכון
2. בדוק שאתה משתמש בLive Key (לא Test)
3. בדוק ש-webhook URL נכון

### Error: "Supabase connection failed"
1. בדוק ש-NEXT_PUBLIC_SUPABASE_URL נכון
2. בדוק ש-NEXT_PUBLIC_SUPABASE_ANON_KEY נכון
3. בדוק רשימת CORS ב-Supabase

---

## 🎉 סיכום

✅ **הפרויקט מוכן לדפלוי!**

### תהליך דפלוי:
1. Push קוד ל-GitHub
2. Vercel מתחיל דפלוי אוטומטי
3. בדוק את ה-Logs
4. Site בחיים! 🚀

### Links שימושיים:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Stripe Production](https://stripe.com/docs/guides/go-live)

---

## 💬 צוות תמיכה:

- **Vercel Support**: https://vercel.com/support
- **Next.js Forum**: https://github.com/vercel/next.js/discussions
- **Stripe Support**: https://support.stripe.com

---

**זמן דפלוי משוער**: 15-30 דקות
**רמת קושי**: קלה ⭐
**סיכוי הצלחה**: גבוה מאוד! ✅
