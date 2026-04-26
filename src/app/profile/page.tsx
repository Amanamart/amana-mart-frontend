import React from 'react';
import { StorefrontHeader } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { ProfileClient } from './ProfileClient';

export default function ProfilePage() {
  return (
    <>
      <StorefrontHeader />
      <main>
        <ProfileClient />
      </main>
      <Footer />
    </>
  );
}
