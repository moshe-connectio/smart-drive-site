import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';

export const metadata: Metadata = {
  title: `404 - הדף לא נמצא | ${dealershipConfig.business.name}`,
  description: 'העמוד שחיפשת אינו זמין. חזרו לעמוד הבית או עיינו במלאי הרכבים שלנו.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <Header />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-lg mx-auto">
            <p className="text-6xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              404
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              הדף לא נמצא
            </h1>
            <p className="text-lg mb-8" style={{ color: 'var(--color-silver-300)' }}>
              ייתכן שהעמוד הוסר, הועבר לכתובת חדשה או שהוזנה כתובת לא תקינה.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-xl transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)', color: 'var(--color-text-inverse)' }}
              >
                חזור לעמוד הבית
              </Link>
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-xl transition-all"
                style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}
              >
                עיינו במלאי הרכבים
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
