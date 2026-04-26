import React from 'react';
import { StorefrontHeader } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { ServiceClient } from './ServiceClient';

export default function ServicePage() {
  return (
    <>
      <StorefrontHeader />
      <main>
        <ServiceClient />
      </main>
      <Footer />
    </>
  );
}
