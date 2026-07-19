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
      <div className="site-loading-mark">
        <Image
          src="/main-logo.png"
          alt="Smart & Drive"
          width={300}
          height={200}
          priority
        />
        <span className="site-loading-line" aria-hidden="true" />
      </div>
      <span className="site-loading-label">טוענים את חוויית Smart &amp; Drive</span>
    </div>
  );
}