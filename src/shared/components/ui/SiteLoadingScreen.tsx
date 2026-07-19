'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SiteLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hide = () => {
      window.setTimeout(() => {
        setIsExiting(true);
        document.documentElement.classList.add('site-opening');
        window.setTimeout(() => {
          document.documentElement.classList.remove('site-opening');
        }, 1400);
        window.setTimeout(() => setIsVisible(false), 320);
      }, 650);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }

    const safetyTimer = window.setTimeout(() => {
      setIsExiting(true);
      document.documentElement.classList.add('site-opening');
      window.setTimeout(() => {
        document.documentElement.classList.remove('site-opening');
      }, 1400);
      window.setTimeout(() => setIsVisible(false), 320);
    }, 2800);

    return () => {
      window.removeEventListener('load', hide);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`site-loading-screen${isExiting ? ' site-loading-screen--exit' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="site-loading-kicker">SMART &amp; DRIVE / MOBILITY SYSTEM</span>
      <div className="site-loading-mark">
        <span className="site-loading-orbit site-loading-orbit--outer" aria-hidden="true" />
        <span className="site-loading-orbit site-loading-orbit--inner" aria-hidden="true" />
        <Image
          src="/main-logo.png"
          alt="Smart & Drive"
          width={300}
          height={200}
          priority
        />
        <span className="site-loading-line" aria-hidden="true" />
      </div>
      <span className="site-loading-label">החוויה שלך מתחילה עכשיו</span>
    </div>
  );
}