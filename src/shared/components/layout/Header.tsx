import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { Container } from './Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';
import { LeadModalButton } from '@shared/components/ui/LeadModalButton';
import MobileMenu from './MobileMenu';

export function Header() {
  const socialLinks = [
    { 
      name: 'Facebook', 
      url: dealershipConfig.social.facebook,
      icon: FaFacebook,
    },
    { 
      name: 'Instagram', 
      url: dealershipConfig.social.instagram,
      icon: FaInstagram,
    },
    { 
      name: 'WhatsApp', 
      url: dealershipConfig.social.whatsapp,
      icon: FaWhatsapp,
    },
    { 
      name: 'YouTube', 
      url: dealershipConfig.social.youtube,
      icon: FaYoutube,
    },
  ];

  return (
    <header className="bg-header border-header sticky top-0 z-50 border-b shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Right */}
          <Link 
            href={ROUTES.home} 
            className="flex items-center shrink-0 group hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              src="/logo.png"
              alt={dealershipConfig.business.name}
              width={160}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link 
              href={ROUTES.vehicles} 
              className="font-medium transition-all duration-200 text-sm lg:text-base relative group"
              style={{ color: 'var(--color-gray-700)' }}
            >
              רכבים
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full" style={{ background: 'var(--color-primary)' }}></span>
            </Link>
            <Link 
              href="/new-vehicles" 
              className="font-medium transition-all duration-200 text-sm lg:text-base relative group"
              style={{ color: 'var(--color-gray-700)' }}
            >
              רכבים חדשים
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full" style={{ background: 'var(--color-primary)' }}></span>
            </Link>
            <Link 
              href={ROUTES.about}
              className="font-medium transition-all duration-200 text-sm lg:text-base relative group"
              style={{ color: 'var(--color-gray-700)' }}
            >
              אודות
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full" style={{ background: 'var(--color-primary)' }}></span>
            </Link>
          </nav>

          {/* Desktop Social + CTA - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link transition-all duration-200 hover:scale-110 p-2 rounded-lg"
                  style={{ color: 'var(--color-gray-500)' }}
                  title={social.name}
                  aria-label={social.name}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              );
            })}

            <LeadModalButton
              formId="general"
              buttonLabel="השאר פרטים"
              variant="primary"
              className="text-sm py-2 px-5"
            />
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LeadModalButton
              formId="general"
              buttonLabel="פרטים"
              variant="primary"
              className="text-xs py-1.5 px-3"
            />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
