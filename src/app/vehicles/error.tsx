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

export default function VehiclesError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error('Error in vehicles route:', error);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              לא הצלחנו לטעון את המלאי
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: 'var(--color-silver-300)' }}
            >
              אירעה שגיאה בעת שליפת הרכבים. אנא נסה שוב.
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
