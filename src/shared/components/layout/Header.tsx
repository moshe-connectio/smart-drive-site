import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { Container } from './Container';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';

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
    <header className="bg-header border-header sticky top-0 z-50 border-b">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 px-2 sm:px-4">
          {/* Logo - Right */}
          <Link 
            href={ROUTES.home} 
            className="flex items-center shrink-0 group hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              src="/logo.png"
              alt="Smart & Drive"
              width={160}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation - Center */}
          <nav className="flex items-center gap-6 sm:gap-10 flex-1 justify-center">
            <Link 
              href={ROUTES.vehicles} 
              className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm sm:text-base relative group"
            >
              רכבים
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link 
              href="/new-vehicles" 
              className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm sm:text-base relative group"
            >
              רכבים חדשים
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </nav>

          {/* Social Links - Left */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-all duration-200 hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-gray-300 hidden sm:block"
                  title={social.name}
                  aria-label={social.name}
                >
                  <Icon className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </header>
  );
}
