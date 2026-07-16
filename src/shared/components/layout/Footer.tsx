import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaArrowLeft,
} from 'react-icons/fa6';
import { dealershipConfig } from '@core/config/site.config';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import { Container } from './Container';
import { APP_CONFIG, ROUTES, CONTACT_INFO, SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';

const navigationLinks = [
  { href: ROUTES.home, label: 'דף הבית' },
  { href: '/new-vehicles', label: 'רכבים חדשים' },
  ...(SHOW_IMMEDIATE_INVENTORY
    ? [{ href: ROUTES.vehicles, label: 'מלאי מיידי' }]
    : []),
  { href: ROUTES.finance, label: 'מימון' },
  { href: ROUTES.tradeIn, label: 'טרייד-אין' },
  { href: ROUTES.about, label: 'אודות' },
];

const servicePoints = [
  'מימון מותאם אישית',
  'טרייד אין הוגן',
  'בדיקות מקיפות לרכב',
  'ליווי עד מסירה',
];

const contactItems = [
  { icon: FaPhone, label: CONTACT_INFO.phoneDisplay, href: `tel:${CONTACT_INFO.phone}` },
  { icon: FaEnvelope, label: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: FaLocationDot, label: CONTACT_INFO.address, href: undefined },
  { icon: FaClock, label: dealershipConfig.contact.businessHours.weekdays, href: undefined },
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
        {/* CTA panel */}
        <div className="footer-cta-panel">
          <div className="footer-cta-copy">
            <span className="footer-cta-eyebrow">מוכנים לעסקה הבאה</span>
            <h3 className="footer-cta-title">רוצים ייעוץ מהיר לפני בחירת רכב?</h3>
          </div>

          <div className="footer-cta-actions">
            <LeadModalButton
              formId="general"
              buttonLabel="צרו קשר"
              variant="cta"
              className="footer-action"
            />
            <a href={`tel:${CONTACT_INFO.phone}`} className="footer-action footer-action-secondary">
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/main-logo.png"
              alt={dealershipConfig.business.name}
              width={1264}
              height={843}
              className="footer-logo"
            />
            <p className="footer-about">
              {APP_CONFIG.description} מגוון רכבים איכותיים, שקיפות מלאה וליווי מקצועי מהשיחה הראשונה ועד המסירה.
            </p>

            <div className="footer-social">
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
                    data-social={item.label.toLowerCase()}
                  >
                    <Icon className="w-[1.12rem] h-[1.12rem]" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="footer-col" aria-label="ניווט בפוטר">
            <h3 className="footer-col-title">ניווט</h3>
            <ul className="footer-list">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    <FaArrowLeft className="footer-link-icon" aria-hidden />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3 className="footer-col-title">שירותים</h3>
            <ul className="footer-list footer-list-muted">
              {servicePoints.map((item) => (
                <li key={item} className="footer-service-item">
                  <span className="footer-service-dot" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">צור קשר</h3>
            <ul className="footer-list footer-contact-list">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="footer-contact-icon" aria-hidden>
                      <Icon />
                    </span>
                    <span>{item.label}</span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="footer-contact-item footer-contact-item--link">
                        {content}
                      </a>
                    ) : (
                      <span className="footer-contact-item">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {currentYear} {APP_CONFIG.name}. כל הזכויות שמורות.</p>
          <div className="footer-bottom-links">
            <Link href={ROUTES.accessibility} className="footer-bottom-link">הצהרת נגישות</Link>
            <span className="footer-bottom-sep" aria-hidden>•</span>
            <Link href={ROUTES.privacy} className="footer-bottom-link">מדיניות פרטיות</Link>
            <span className="footer-bottom-sep" aria-hidden>•</span>
            <a href={`tel:${CONTACT_INFO.phone}`} className="footer-bottom-link">צור קשר</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
