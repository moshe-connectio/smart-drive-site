'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import { CarOnlyShape } from '@shared/components/ui/CarOnlyShape';
import { Container } from './Container';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: ROUTES.vehicles, label: 'רכבים' },
  { href: '/new-vehicles', label: 'רכבים חדשים' },
  { href: ROUTES.about, label: 'אודות' },
];

const socialLinks = [
  { name: 'Facebook', url: dealershipConfig.social.facebook, icon: FaFacebook },
  { name: 'Instagram', url: dealershipConfig.social.instagram, icon: FaInstagram },
  { name: 'WhatsApp', url: dealershipConfig.social.whatsapp, icon: FaWhatsapp },
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
  const navToneClass = transparentMode ? 'header-nav-link-light' : 'header-nav-link-dark';
  const iconToneClass = transparentMode ? 'header-icon-light' : 'header-icon-dark';
  const dividerColor = transparentMode ? 'var(--color-header-transparent-border)' : 'var(--color-border)';
  const logoStrokeColor = transparentMode ? 'var(--color-header-transparent-text)' : 'var(--color-primary)';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 header-shell transition-all duration-500 ${headerStateClass}`}
    >
      <Container className="pt-3">
        <div className="header-surface flex items-center h-16 md:h-[74px] px-3 md:px-5">

          <Link
            href={ROUTES.home}
            className="shrink-0 transition-opacity hover:opacity-90"
            aria-label="חזרה לדף הבית"
          >
            <CarOnlyShape
              className="w-[138px] md:w-[170px]"
              maxWidth={170}
              strokeColor={logoStrokeColor}
            />
          </Link>

          <nav className="hidden md:flex items-center justify-center flex-1 gap-8 lg:gap-10 mx-6">
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

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`header-icon-button ${iconToneClass}`}
                  title={social.name}
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

            <div className="w-px h-5 mx-1.5" style={{ background: dividerColor }} />

            <LeadModalButton
              formId="general"
              buttonLabel="השאר פרטים"
              variant="primary"
              className="text-sm py-2 px-5"
            />
          </div>

          <div className="flex md:hidden items-center gap-2 mr-auto">
            <LeadModalButton
              formId="general"
              buttonLabel=""
              variant="primary"
              className="w-10 h-10 p-0"
            />
            <MobileMenu tone={transparentMode ? 'light' : 'dark'} />
          </div>
        </div>
      </Container>
    </header>
  );
}
