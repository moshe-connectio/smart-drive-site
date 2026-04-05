import Image from 'next/image';
import { Container } from './Container';
import { APP_CONFIG, ROUTES, CONTACT_INFO } from '@core/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer mt-0 border-t border-(--color-border)">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt={APP_CONFIG.name}
                width={140}
                height={44}
                className="h-11 w-auto object-contain opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed text-(--color-silver-400)">
              הדרך הנכונה לקניה חכמה! מגוון רכבים איכותיים חדשים ומשומשים עם שירות אמין ומקצועי.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-footer-heading font-semibold text-lg mb-5">קישורים מהירים</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={ROUTES.home} className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-(--color-primary) opacity-50"></span>
                  דף הבית
                </a>
              </li>
              <li>
                <a href={ROUTES.vehicles} className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-(--color-primary) opacity-50"></span>
                  רכבים למכירה
                </a>
              </li>
              <li>
                <a href="/new-vehicles" className="hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-(--color-primary) opacity-50"></span>
                  רכבים חדשים
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-footer-heading font-semibold text-lg mb-5">צור קשר</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-(--color-silver-400)">
                <div className="w-8 h-8 rounded-lg bg-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-(--color-silver-400)">
                <div className="w-8 h-8 rounded-lg bg-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-3 text-(--color-silver-400)">
                <div className="w-8 h-8 rounded-lg bg-gray-300 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-footer mt-10 pt-8 text-sm text-center border-t text-gray-500">
          <p>© {currentYear} {APP_CONFIG.name}. כל הזכויות שמורות.</p>
        </div>
      </Container>
    </footer>
  );
}
