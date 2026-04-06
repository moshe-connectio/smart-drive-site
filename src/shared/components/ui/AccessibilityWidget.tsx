'use client';

import { useState, useEffect, useCallback } from 'react';

interface AccessibilityState {
  fontSize: number; // 0 = normal, 1 = large, 2 = xl
  highContrast: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  readableFont: boolean;
  lineHeight: boolean;
  textSpacing: boolean;
  disableAnimations: boolean;
  grayscale: boolean;
}

const defaultState: AccessibilityState = {
  fontSize: 0,
  highContrast: false,
  highlightLinks: false,
  bigCursor: false,
  readableFont: false,
  lineHeight: false,
  textSpacing: false,
  disableAnimations: false,
  grayscale: false,
};

const STORAGE_KEY = 'accessibility-settings';

function loadSettings(): AccessibilityState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultState, ...JSON.parse(saved) };
  } catch {}
  return defaultState;
}

function saveSettings(state: AccessibilityState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const saved = loadSettings();
    setSettings(saved);
    setMounted(true);
  }, []);

  // Apply classes to <html> whenever settings change
  const applySettings = useCallback((s: AccessibilityState) => {
    const html = document.documentElement;

    // Font size
    html.classList.remove('a11y-font-lg', 'a11y-font-xl');
    if (s.fontSize === 1) html.classList.add('a11y-font-lg');
    if (s.fontSize === 2) html.classList.add('a11y-font-xl');

    // High contrast
    html.classList.toggle('a11y-high-contrast', s.highContrast);

    // Highlight links
    html.classList.toggle('a11y-highlight-links', s.highlightLinks);

    // Big cursor
    html.classList.toggle('a11y-big-cursor', s.bigCursor);

    // Readable font
    html.classList.toggle('a11y-readable-font', s.readableFont);

    // Line height
    html.classList.toggle('a11y-line-height', s.lineHeight);

    // Text spacing
    html.classList.toggle('a11y-text-spacing', s.textSpacing);

    // Disable animations
    html.classList.toggle('a11y-no-animations', s.disableAnimations);

    // Grayscale
    html.classList.toggle('a11y-grayscale', s.grayscale);
  }, []);

  useEffect(() => {
    if (mounted) {
      applySettings(settings);
      saveSettings(settings);
    }
  }, [settings, mounted, applySettings]);

  const updateSetting = <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSettings(defaultState);
  };

  const isModified = JSON.stringify(settings) !== JSON.stringify(defaultState);

  const buttons: { key: keyof AccessibilityState; label: string; icon: string; isActive: boolean; onClick: () => void }[] = [
    {
      key: 'fontSize',
      label: 'הגדלת טקסט',
      icon: 'א+',
      isActive: settings.fontSize > 0,
      onClick: () => updateSetting('fontSize', ((settings.fontSize + 1) % 3) as 0 | 1 | 2),
    },
    {
      key: 'highContrast',
      label: 'ניגודיות גבוהה',
      icon: '◐',
      isActive: settings.highContrast,
      onClick: () => updateSetting('highContrast', !settings.highContrast),
    },
    {
      key: 'highlightLinks',
      label: 'הדגשת קישורים',
      icon: '🔗',
      isActive: settings.highlightLinks,
      onClick: () => updateSetting('highlightLinks', !settings.highlightLinks),
    },
    {
      key: 'bigCursor',
      label: 'סמן גדול',
      icon: '🖱',
      isActive: settings.bigCursor,
      onClick: () => updateSetting('bigCursor', !settings.bigCursor),
    },
    {
      key: 'readableFont',
      label: 'גופן קריא',
      icon: 'Aa',
      isActive: settings.readableFont,
      onClick: () => updateSetting('readableFont', !settings.readableFont),
    },
    {
      key: 'lineHeight',
      label: 'מרווח שורות',
      icon: '↕',
      isActive: settings.lineHeight,
      onClick: () => updateSetting('lineHeight', !settings.lineHeight),
    },
    {
      key: 'textSpacing',
      label: 'ריווח טקסט',
      icon: '↔',
      isActive: settings.textSpacing,
      onClick: () => updateSetting('textSpacing', !settings.textSpacing),
    },
    {
      key: 'disableAnimations',
      label: 'ביטול אנימציות',
      icon: '⏸',
      isActive: settings.disableAnimations,
      onClick: () => updateSetting('disableAnimations', !settings.disableAnimations),
    },
    {
      key: 'grayscale',
      label: 'גווני אפור',
      icon: '🎨',
      isActive: settings.grayscale,
      onClick: () => updateSetting('grayscale', !settings.grayscale),
    },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[72px] left-4 sm:bottom-[88px] sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(26, 101, 224, 0.4)',
        }}
        aria-label="תפריט נגישות"
        title="נגישות"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="4" r="2" />
          <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.42 2-2.83V12.1a5 5 0 1 0 5.9 5.9h-2.07z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed inset-x-2 bottom-20 sm:inset-x-auto sm:bottom-24 sm:left-6 z-50 w-auto sm:w-80 max-h-[75vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{
              background: 'var(--color-gray-100)',
              border: '1px solid var(--color-gray-200)',
            }}
          >
            {/* Header */}
            <div
              className="sticky top-0 flex items-center justify-between p-4 rounded-t-2xl"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6l-1.41-1.41A2 2 0 0 0 12.17 7H11.8a2 2 0 0 0-1.42.59L9 9H3a1 1 0 0 0 0 2h5.09l-.72 4.18a1.5 1.5 0 0 0 .28 1.16l3.08 4.11a1 1 0 0 0 1.6 0l3.08-4.11a1.5 1.5 0 0 0 .28-1.16L14.91 11H21a1 1 0 0 0 0-2z" />
                </svg>
                <span className="font-bold text-lg">נגישות</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="סגור תפריט נגישות"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Buttons Grid */}
            <div className="p-2 sm:p-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              {buttons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={btn.onClick}
                  className="flex flex-col items-center justify-center gap-1 p-2 sm:p-3 rounded-xl text-center transition-all duration-200"
                  style={{
                    background: btn.isActive ? 'var(--color-primary)' : 'var(--color-gray-200)',
                    color: btn.isActive ? '#fff' : 'var(--color-gray-800)',
                    border: btn.isActive ? '2px solid var(--color-primary-400)' : '2px solid transparent',
                  }}
                  aria-pressed={btn.isActive}
                  title={btn.label}
                >
                  <span className="text-xl leading-none">{btn.icon}</span>
                  <span className="text-[11px] font-medium leading-tight">{btn.label}</span>
                  {btn.key === 'fontSize' && settings.fontSize > 0 && (
                    <span className="text-[9px] opacity-70">
                      {settings.fontSize === 1 ? '+1' : '+2'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            {isModified && (
              <div className="px-3 pb-3">
                <button
                  onClick={resetAll}
                  className="w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
                  style={{
                    background: 'var(--color-gray-200)',
                    color: 'var(--color-gray-800)',
                    border: '1px solid var(--color-gray-300)',
                  }}
                >
                  איפוס הגדרות
                </button>
              </div>
            )}

            {/* Footer */}
            <div
              className="px-3 pb-3 text-center"
              style={{ color: 'var(--color-gray-500)' }}
            >
              <span className="text-[10px]">♿ הצהרת נגישות</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
