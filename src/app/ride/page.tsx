import React from 'react';
import { StorefrontHeader } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { RideClient } from './RideClient';

export default function RidePage() {
  return (
    <>
      <StorefrontHeader />
      <main>
        <RideClient />
      </main>
      <Footer />
    </>
  );
}
