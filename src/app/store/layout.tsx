import React from 'react';
import { StorefrontHeader } from '@/components/storefront/Header';
import { StorefrontFooter } from '@/components/storefront/Footer';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--page-background)]">
      <StorefrontHeader />
      <main className="flex-1">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
