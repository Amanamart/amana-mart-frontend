import React from 'react';
import { StorefrontHeader } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { ParcelClient } from './ParcelClient';

export default function ParcelPage() {
  return (
    <>
      {/* <StorefrontHeader /> */}
      <main>
        <ParcelClient />
      </main>
      <Footer />
    </>
  );
}
