import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';
import { Container } from '@shared/components/layout/Container';

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-background)' }}
    >
      <Header />
      <main className="flex-1 py-16">
        <Container>
          <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="flex flex-col items-center justify-center gap-4 text-center"
          >
            <div
              className="w-12 h-12 rounded-full animate-spin"
              style={{
                border: '3px solid var(--color-silver-100, #e5e7eb)',
                borderTopColor: 'var(--color-primary)',
              }}
            />
            <p
              className="text-lg"
              style={{ color: 'var(--color-silver-300)' }}
            >
              טוען...
            </p>
            <span className="sr-only">טוען את התוכן, אנא המתן</span>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
