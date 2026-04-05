'use client';

import { useState, useEffect } from 'react';

interface CookieConsent {
  essential: true; // always required
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'cookie-consent';

function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveConsent(consent: CookieConsent) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {}
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const consent: CookieConsent = {
      essential: true,
      functional,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    saveConsent(consent);
    setVisible(false);
  };

  if (!mounted) return null;

  // Small trigger button when banner is dismissed
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-9997 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: 'var(--color-gray-200)',
          color: 'var(--color-gray-800)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          border: '1px solid var(--color-gray-300)',
        }}
        aria-label="הגדרות פרטיות"
        title="הגדרות פרטיות"
      >
        <span className="text-xl sm:text-2xl">🍪</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-9997 p-2 sm:p-4 md:p-6" dir="rtl">
      <div
        className="mx-auto max-w-3xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'var(--color-gray-100)',
          border: '1px solid var(--color-gray-200)',
        }}
      >
        {/* Header */}
        <div className="p-3 sm:p-5 pb-2 sm:pb-3">
          <div className="flex items-start gap-2 sm:gap-3">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'var(--color-primary)' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm sm:text-base mb-1" style={{ color: 'var(--color-gray-900)' }}>
                הגנת פרטיות ושימוש בעוגיות 🍪
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-gray-600)' }}>
                אתר זה משתמש בעוגיות (Cookies) ובטכנולוגיות דומות לצורך תפעול האתר, שיפור חוויית הגלישה, ניתוח תעבורה ושיווק.
                בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981 ותקנות הגנת הפרטיות (אבטחת מידע), באפשרותך לבחור אילו עוגיות לאשר.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Categories (expandable) */}
        {showDetails && (
          <div className="px-3 sm:px-5 pb-2 space-y-2 sm:space-y-3">
            <div className="border rounded-xl p-3" style={{ borderColor: 'var(--color-gray-200)', background: 'var(--color-gray-50)' }}>
              {/* Essential */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-gray-900)' }}>עוגיות חיוניות</span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray-500)' }}>
                    נדרשות לתפעול בסיסי של האתר. לא ניתן לבטלן.
                  </p>
                </div>
                <div
                  className="w-11 h-6 rounded-full relative cursor-not-allowed opacity-70"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" />
                </div>
              </div>

              <div className="border-t my-1" style={{ borderColor: 'var(--color-gray-200)' }} />

              {/* Functional */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-gray-900)' }}>עוגיות פונקציונליות</span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray-500)' }}>
                    שמירת העדפות, שפה, ו הגדרות אישיות.
                  </p>
                </div>
                <button
                  onClick={() => setFunctional(!functional)}
                  className="w-11 h-6 rounded-full relative transition-colors duration-200"
                  style={{ background: functional ? 'var(--color-primary)' : 'var(--color-gray-300)' }}
                  role="switch"
                  aria-checked={functional}
                  aria-label="עוגיות פונקציונליות"
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: functional ? '2px' : 'calc(100% - 22px)' }}
                  />
                </button>
              </div>

              <div className="border-t my-1" style={{ borderColor: 'var(--color-gray-200)' }} />

              {/* Analytics */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-gray-900)' }}>עוגיות אנליטיקה</span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray-500)' }}>
                    ניתוח תעבורה, מדידת ביצועים ושיפור האתר.
                  </p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className="w-11 h-6 rounded-full relative transition-colors duration-200"
                  style={{ background: analytics ? 'var(--color-primary)' : 'var(--color-gray-300)' }}
                  role="switch"
                  aria-checked={analytics}
                  aria-label="עוגיות אנליטיקה"
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: analytics ? '2px' : 'calc(100% - 22px)' }}
                  />
                </button>
              </div>

              <div className="border-t my-1" style={{ borderColor: 'var(--color-gray-200)' }} />

              {/* Marketing */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-gray-900)' }}>עוגיות שיווקיות</span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray-500)' }}>
                    פרסום ממוקד, רימרקטינג ומעקב המרות.
                  </p>
                </div>
                <button
                  onClick={() => setMarketing(!marketing)}
                  className="w-11 h-6 rounded-full relative transition-colors duration-200"
                  style={{ background: marketing ? 'var(--color-primary)' : 'var(--color-gray-300)' }}
                  role="switch"
                  aria-checked={marketing}
                  aria-label="עוגיות שיווקיות"
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: marketing ? '2px' : 'calc(100% - 22px)' }}
                  />
                </button>
              </div>
            </div>

            {/* Save Preferences */}
            <button
              onClick={handleSavePreferences}
              className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              שמור העדפות
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-3 sm:p-5 pt-2 sm:pt-3 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-blue)' }}
          >
            אישור כל העוגיות
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:opacity-80"
            style={{
              background: 'var(--color-gray-200)',
              color: 'var(--color-gray-800)',
              border: '1px solid var(--color-gray-300)',
            }}
          >
            דחיית עוגיות לא חיוניות
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:opacity-80 underline underline-offset-2"
            style={{ color: 'var(--color-primary)' }}
          >
            {showDetails ? 'הסתר פרטים' : 'ניהול העדפות'}
          </button>
        </div>

        {/* Legal Footer */}
        <div className="px-3 sm:px-5 pb-3 sm:pb-4 text-center">
          <p className="text-[10px] leading-relaxed" style={{ color: 'var(--color-gray-500)' }}>
            בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981 | תקנות הגנת הפרטיות (אבטחת מידע), התשע&quot;ז-2017
          </p>
        </div>
      </div>
    </div>
  );
}
