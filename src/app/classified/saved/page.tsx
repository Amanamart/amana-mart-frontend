'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Eye, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';

const SAVED_ADS = [
  { id: '1', slug: 'iphone-15-pro-max', title: 'iPhone 15 Pro Max 256GB Natural Titanium', price: 155000, location: 'Gulshan, Dhaka', image: '📱', category: 'Mobiles', status: 'active' },
  { id: '2', slug: 'toyota-corolla-2020', title: 'Toyota Corolla 2020 - Full Option', price: 3200000, location: 'Dhanmondi, Dhaka', image: '🚗', category: 'Cars', status: 'active' },
  { id: '3', slug: 'macbook-pro-m3', title: 'MacBook Pro M3 14" 2024', price: 220000, location: 'Nasirabad, Chattogram', image: '💻', category: 'Laptops', status: 'sold' },
];

function formatPrice(p: number) {
  if (p >= 100000) return `৳${(p / 100000).toFixed(1)}L`;
  return `৳${p.toLocaleString()}`;
}

export default function SavedAdsPage() {
  const [ads, setAds] = useState(SAVED_ADS);

  const removeAd = (id: string) => setAds(prev => prev.filter(ad => ad.id !== id));

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#222' }}>Saved Ads</h1>
          <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>You have {ads.length} ads in your favorites</p>
        </div>
        <Link href="/classified/ads" style={{ color: '#FF6B35', fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          Browse more ads <ChevronRight size={18} />
        </Link>
      </div>

      {ads.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 24, padding: '80px 32px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: '#fff5f0', color: '#FF6B35',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          }}>
            <Heart size={40} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#222', marginBottom: 12 }}>Your favorites list is empty</h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
            Found something you like? Click the heart icon on any ad to save it here for later.
          </p>
          <Link href="/classified/ads" style={{
            background: '#FF6B35', color: '#fff', padding: '14px 32px',
            borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 16,
            display: 'inline-block', boxShadow: '0 8px 24px rgba(255,107,53,0.3)',
          }}>
            Start Browsing
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ads.map((ad) => (
            <div key={ad.id} style={{
              background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e8e8e8',
              display: 'flex', gap: 20, position: 'relative', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
            >
              <div style={{ width: 140, height: 110, background: '#f5f5ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, flexShrink: 0 }}>
                {ad.image}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{ad.category}</p>
                    <Link href={`/classified/ad/${ad.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#222', marginBottom: 8, lineHeight: 1.4 }}>{ad.title}</h3>
                    </Link>
                  </div>
                  <button onClick={() => removeAd(ad.id)} title="Remove" style={{
                    width: 36, height: 36, borderRadius: '50%', border: '1px solid #fee2e2',
                    background: '#fff', color: '#ef4444', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#1aab50' }}>{formatPrice(ad.price)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 13 }}>
                    <MapPin size={14} /> {ad.location}
                  </div>
                  {ad.status === 'sold' && (
                    <span style={{ background: '#f3f4f6', color: '#666', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>SOLD / INACTIVE</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <Link href={`/classified/ad/${ad.slug}`} style={{
                    padding: '8px 20px', borderRadius: 8, background: '#FF6B35', color: '#fff',
                    textDecoration: 'none', fontSize: 13, fontWeight: 700,
                  }}>View Details</Link>
                  <button style={{
                    padding: '8px 20px', borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff',
                    color: '#555', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>Contact Seller</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Safety Message */}
      <div style={{ marginTop: 40, background: '#f0f9ff', borderRadius: 16, padding: 24, border: '1px solid #bae6fd', display: 'flex', gap: 16 }}>
        <div style={{ color: '#0284c7' }}><ShoppingBag size={24} /></div>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0c4a6e', marginBottom: 4 }}>Shopping safely on AmanaMart</h3>
          <p style={{ fontSize: 13, color: '#0369a1', lineHeight: 1.5 }}>
            Never pay in advance to unknown sellers. Meet in a safe public place to check the item before paying.
            Always report suspicious ads to our moderation team.
          </p>
        </div>
      </div>
    </div>
  );
}
