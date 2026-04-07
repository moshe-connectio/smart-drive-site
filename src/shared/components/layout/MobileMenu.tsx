'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { ROUTES } from '@core/lib/constants';
import { dealershipConfig } from '@core/config/site.config';

const socialLinks = [
  { name: 'Facebook', url: dealershipConfig.social.facebook, icon: FaFacebook },
  { name: 'Instagram', url: dealershipConfig.social.instagram, icon: FaInstagram },
  { name: 'WhatsApp', url: dealershipConfig.social.whatsapp, icon: FaWhatsapp },
  { name: 'YouTube', url: dealershipConfig.social.youtube, icon: FaYoutube },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        style={{ color: 'var(--color-gray-700)' }}
        aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--color-background)' }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <span className="font-bold text-lg" style={{ color: 'var(--color-gray-900)' }}>
            {dealershipConfig.business.name}
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--color-gray-600)' }}
            aria-label="סגור תפריט"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1">
          {[
            { href: ROUTES.home, label: 'דף הבית' },
            { href: ROUTES.vehicles, label: 'רכבים' },
            { href: '/new-vehicles', label: 'רכבים חדשים' },
            { href: ROUTES.about, label: 'אודות' },
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-xl font-medium text-base transition-colors"
                style={{
                  color: isActive ? '#fff' : 'var(--color-gray-700)',
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t" style={{ borderColor: 'var(--color-border)' }} />

        {/* Contact Info */}
        <div className="p-4 space-y-3">
          <a
            href={`tel:${dealershipConfig.contact.phone}`}
            className="flex items-center gap-3 py-2 px-4 rounded-xl text-sm font-medium"
            style={{ color: 'var(--color-gray-700)', background: 'var(--color-background-secondary)' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {dealershipConfig.contact.phone}
          </a>
        </div>

        {/* Social Links */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ color: 'var(--color-gray-600)', background: 'var(--color-background-secondary)' }}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
