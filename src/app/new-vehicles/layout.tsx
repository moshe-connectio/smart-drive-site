/**
 * New Vehicles Layout
 * layout משותף לכל עמודי רכבים חדשים
 */

import type { ReactNode } from 'react';
import { Header } from '@shared/components/layout/Header';
import { Footer } from '@shared/components/layout/Footer';

interface NewVehiclesLayoutProps {
  children: ReactNode;
}

export default function NewVehiclesLayout({ children }: NewVehiclesLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
