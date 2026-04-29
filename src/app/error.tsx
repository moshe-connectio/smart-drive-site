'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { logger } from '@core/lib/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error('Unhandled route error:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      <Header />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-lg mx-auto">
            <p
              className="text-6xl font-bold mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              500
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              משהו השתבש
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: 'var(--color-silver-300)' }}
            >
              אירעה שגיאה בעת טעינת העמוד. ניתן לנסות שוב או לחזור לעמוד הבית.
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mb-6" dir="ltr">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-xl transition-all hover:opacity-90"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                }}
              >
                נסה שוב
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-xl transition-all"
                style={{
                  border: '2px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                חזור לעמוד הבית
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
