'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaLocationDot, FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { ROUTES, SHOW_IMMEDIATE_INVENTORY } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/new-vehicles', label: 'רכבים חדשים' },
  ...(SHOW_IMMEDIATE_INVENTORY
    ? [{ href: ROUTES.vehicles, label: 'מלאי מיידי' }]
    : []),
  { href: ROUTES.finance, label: 'מימון' },
  { href: ROUTES.tradeIn, label: 'טרייד-אין' },
  { href: ROUTES.about, label: 'אודות' },
];

const socialLinks = [
  { name: 'Facebook', url: dealershipConfig.social.facebook, icon: FaFacebook },
  { name: 'Instagram', url: dealershipConfig.social.instagram, icon: FaInstagram },
  { name: 'YouTube', url: dealershipConfig.social.youtube, icon: FaYoutube },
];

const HOME_SCROLL_THRESHOLD = 36;

function isLinkActive(pathname: string, href: string): boolean {
  if (href === ROUTES.home) {
    return pathname === ROUTES.home;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HOME_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const transparentMode = !scrolled;
  const headerStateClass = transparentMode ? 'header-transparent' : 'header-solid';
  const navToneClass = 'header-nav-link-light';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 header-shell transition-all duration-500 ${headerStateClass}`}
    >
      <div className="header-container">
        <div className="header-surface relative flex items-center h-[60px] md:h-[68px] lg:h-[74px] px-3 lg:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center">

          <Link
            href={ROUTES.home}
            className="header-logo-link shrink-0 lg:justify-self-start flex items-center"
            aria-label="חזרה לדף הבית"
          >
            <Image
              src="/main-logo.png"
              alt={dealershipConfig.business.name}
              width={1264}
              height={843}
              quality={100}
              priority
              sizes="(max-width: 767px) 150px, 280px"
              className="header-logo w-auto object-contain"
            />
          </Link>

          <nav aria-label="ניווט ראשי" className="hidden lg:flex items-center justify-center gap-10 lg:justify-self-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-nav-link ${navToneClass} ${isLinkActive(pathname, link.href) ? 'header-nav-link-active' : ''}`}
                aria-current={isLinkActive(pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions hidden lg:flex items-center gap-3 shrink-0 lg:justify-self-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealershipConfig.contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="header-address-link"
              aria-label={`ניווט אל ${dealershipConfig.contact.address}`}
            >
              <FaLocationDot aria-hidden="true" />
              <span>{dealershipConfig.contact.address}</span>
            </a>
            <div className="header-social-group" aria-label="רשתות חברתיות">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon-button header-icon-button-compact"
                    data-social={social.name.toLowerCase()}
                    title={social.name}
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <a
              href={`tel:${dealershipConfig.contact.phone}`}
              className="header-phone-link"
              title={`התקשרו ${dealershipConfig.contact.phoneDisplay}`}
              aria-label={`התקשרו אלינו ${dealershipConfig.contact.phoneDisplay}`}
            >
              <FaPhone aria-hidden="true" />
            </a>
            <a
              href={dealershipConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp-link"
              title="וואטסאפ"
              aria-label="פנייה בוואטסאפ"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <LeadModalButton
              formId="general"
              buttonLabel="צרו קשר"
              variant="cta"
              className="header-contact-cta text-sm py-2.5 px-5"
            />
          </div>

          <div className="flex lg:hidden items-center gap-2 mr-auto">
            <a
              href={`tel:${dealershipConfig.contact.phone}`}
              className="header-phone-link header-phone-link-mobile"
              title={`התקשרו ${dealershipConfig.contact.phoneDisplay}`}
              aria-label={`התקשרו אלינו ${dealershipConfig.contact.phoneDisplay}`}
            >
              <FaPhone aria-hidden="true" />
            </a>
            <a
              href={dealershipConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp-link header-whatsapp-link-mobile"
              title="וואטסאפ"
              aria-label="פנייה בוואטסאפ"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <MobileMenu tone="light" />
          </div>
        </div>
      </div>
    </header>
  );
}
