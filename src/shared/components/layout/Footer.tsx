import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { dealershipConfig } from '@core/config/site.config';
import { CarOnlyShape } from '@shared/components/ui/CarOnlyShape';
import { Container } from './Container';
import { APP_CONFIG, ROUTES, CONTACT_INFO } from '@core/lib/constants';

const navigationLinks = [
  { href: ROUTES.home, label: 'דף הבית' },
  { href: ROUTES.vehicles, label: 'רכבים למכירה' },
  { href: '/new-vehicles', label: 'רכבים חדשים' },
  { href: ROUTES.about, label: 'אודות' },
];

const servicePoints = [
  'מימון מותאם אישית',
  'טרייד אין הוגן',
  'בדיקות מקיפות לרכב',
  'ליווי עד מסירה',
];

const socialLinks = [
  { label: 'Facebook', href: dealershipConfig.social.facebook, icon: FaFacebook },
  { label: 'Instagram', href: dealershipConfig.social.instagram, icon: FaInstagram },
  { label: 'WhatsApp', href: dealershipConfig.social.whatsapp, icon: FaWhatsapp },
  { label: 'YouTube', href: dealershipConfig.social.youtube, icon: FaYoutube },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell relative overflow-hidden">
      <div className="footer-glow" />

      <Container className="relative py-16 md:py-20">
        <div className="footer-cta-panel rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-footer-text)' }}>
              מוכנים לעסקה הבאה
            </p>
            <h3 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-footer-text-strong)' }}>
              רוצים ייעוץ מהיר לפני בחירת רכב?
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={dealershipConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-action footer-action-primary"
            >
              דברו איתנו בוואטסאפ
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="footer-action footer-action-secondary"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mt-12">
          <div className="md:col-span-4">
            <CarOnlyShape
              className="w-[170px] mb-5 opacity-90"
              maxWidth={170}
              strokeColor="var(--color-footer-text-strong)"
            />
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--color-footer-text)', lineHeight: 1.85 }}>
              {APP_CONFIG.description} מגוון רכבים איכותיים, שקיפות מלאה וליווי מקצועי מהשיחה הראשונה ועד המסירה.
            </p>

            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="footer-social-link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: 'var(--color-footer-text-strong)' }}
            >
              ניווט
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: 'var(--color-footer-text-strong)' }}
            >
              שירותים
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--color-footer-text)' }}>
              {servicePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: 'var(--color-footer-text-strong)' }}
            >
              צור קשר
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--color-footer-text)' }}>
              <li>{CONTACT_INFO.phone}</li>
              <li>{CONTACT_INFO.email}</li>
              <li>{CONTACT_INFO.address}</li>
              <li>{dealershipConfig.contact.businessHours.weekdays}</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--color-footer-border)', color: 'var(--color-footer-text)' }}
        >
          <p>© {currentYear} {APP_CONFIG.name}. כל הזכויות שמורות.</p>
          <p style={{ color: 'var(--color-footer-text)' }}>אתר מותאם לפרודקשיין: ביצועים, נגישות ו-SEO</p>
        </div>
      </Container>
    </footer>
  );
}
