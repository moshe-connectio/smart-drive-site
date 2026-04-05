import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { Container } from './Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
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

export function Header() {
  return (
    <header className="bg-header border-header sticky top-0 z-50 border-b shadow-sm">
      <Container>
        <div className="flex items-center h-14 md:h-[72px]">

          {/* Logo — right side (RTL) */}
          <Link
            href={ROUTES.home}
            className="shrink-0 group transition-opacity hover:opacity-85"
          >
            <Image
              src="/logo.png"
              alt={dealershipConfig.business.name}
              width={160}
              height={50}
              className="h-8 md:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation — centered, spread wide */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-10 lg:gap-14 xl:gap-16 mx-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 font-semibold text-sm lg:text-[15px] transition-colors duration-200 group"
                style={{ color: 'var(--color-gray-700)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 right-0 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-300"
                  style={{ background: 'var(--color-primary)' }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop — social icons + CTA (left side in RTL) */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                  style={{ color: 'var(--color-gray-400)' }}
                  title={social.name}
                  aria-label={social.name}
                >
                  <Icon className="w-[17px] h-[17px]" />
                </a>
              );
            })}

            <div className="w-px h-6 mx-1.5" style={{ background: 'var(--color-border)' }} />

            <LeadModalButton
              formId="general"
              buttonLabel="השאר פרטים"
              variant="primary"
              className="text-sm py-2 px-5"
            />
          </div>

          {/* Mobile — icon-only CTA + hamburger */}
          <div className="flex md:hidden items-center gap-1.5 mr-auto">
            <LeadModalButton
              formId="general"
              buttonLabel=""
              variant="primary"
              className="w-9 h-9 p-0"
            />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
