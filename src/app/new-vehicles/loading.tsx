import { Container } from '@shared/components/layout/Container';

export default function NewVehiclesLoading() {
  return (
    <section className="py-16">
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
          <p className="text-lg" style={{ color: 'var(--color-silver-300)' }}>
            טוען רכבים חדשים...
          </p>
          <span className="sr-only">טוען רכבים חדשים, אנא המתן</span>
        </div>
      </Container>
    </section>
  );
}
