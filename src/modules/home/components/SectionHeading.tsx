import type { ReactNode } from 'react';
import { Reveal } from '@shared/components/motion/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'right';
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps): ReactNode {
  const alignClass = align === 'right' ? 'text-right' : 'text-center';
  return (
    <Reveal className={`${alignClass} mb-14 md:mb-16`} y={26}>
      {eyebrow ? <p className="home-section-kicker">{eyebrow}</p> : null}
      <h2 className="home-section-title">{title}</h2>
      {subtitle ? <p className="home-section-subtitle">{subtitle}</p> : null}
    </Reveal>
  );
}
