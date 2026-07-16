'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@shared/components/layout/Container';
import { SectionHeading } from './SectionHeading';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AdvantageItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

const advantages: AdvantageItem[] = [
  {
    title: 'ליווי אישי',
    desc: 'עוזרים לכם לבחור נכון, מסבירים כל שלב ונשארים זמינים עד שהרכב אצלכם.',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
        />
      </svg>
    ),
  },
  {
    title: 'טרייד־אין',
    desc: 'בודקים את הרכב הקיים, מסבירים את התהליך ומרכזים את כל העסקה במקום אחד.',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    title: 'מידע שאפשר לסמוך עליו',
    desc: 'מקבלים מאיתנו את הפרטים החשובים על הרכב, כדי לבחור מתוך הבנה ולא מתוך לחץ.',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'עסקה ברורה מההתחלה',
    desc: 'המחיר, התנאים וכל מה שחשוב לדעת מונחים על השולחן לפני שמתקדמים.',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function HomeAdvantages() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.home-advantage-card');
      if (
        cards.length === 0 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        gsap.set(cards, { clearProps: 'all' });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
        },
        (context) => {
          const mobile = Boolean(context.conditions?.mobile);
          gsap.fromTo(
            cards,
            {
              autoAlpha: 0,
              y: mobile ? 18 : 30,
              scale: mobile ? 0.985 : 0.95,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: mobile ? 0.55 : 0.82,
              stagger: mobile ? 0.08 : 0.15,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,transform',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
                once: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="home-advantages-section py-24">
      <Container>
        <SectionHeading
          title="הדרך הבטוחה לרכב הבא שלכם"
          subtitle="בדיקה מקצועית, מחיר ברור וליווי אישי לאורך כל הדרך."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {advantages.map((item) => (
            <article key={item.title} className="home-advantage-card">
              <div className="home-advantage-icon">{item.icon}</div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--color-gray-900)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-gray-500)' }}
              >
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
