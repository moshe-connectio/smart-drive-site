/**
 * Lightweight section placeholder used as a Suspense fallback while a
 * streamed home-page section is loading. Keeps the layout height stable
 * (no CLS) without showing a spinner — the data sections appear inline as
 * they become ready.
 */
export function HomeSectionPlaceholder({
  minHeight = 320,
}: {
  minHeight?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        minHeight,
        background: 'var(--color-background)',
      }}
    />
  );
}
