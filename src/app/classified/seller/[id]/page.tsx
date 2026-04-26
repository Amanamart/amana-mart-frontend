'use client';
import React from 'react';
import { MapPin, Calendar, Star, CheckCircle, Phone, MessageSquare, Share2, Grid, List, Search } from 'lucide-react';

const MOCK_SELLER = {
  id: 'seller-1',
  shopName: 'TechBD Store',
  name: 'Mahmud Rahman',
  logo: 'TB',
  banner: 'linear-gradient(135deg, #FF6B35, #F7931E)',
  isVerified: true,
  memberSince: 'Jan 2024',
  location: 'Gulshan-2, Dhaka',
  rating: 4.8,
  reviews: 234,
  totalAds: 48,
  activeAds: 12,
  description: 'Welcome to TechBD Store. We provide high-quality used and brand new mobile phones, laptops, and accessories. All our products are tested and certified. Visit us at our Gulshan showroom for the best deals!',
};

const SELLER_ADS = [
  { id: '1', title: 'iPhone 15 Pro Max 256GB', price: 155000, location: 'Gulshan, Dhaka', image: '📱', category: 'Mobiles', badge: 'top' },
  { id: '2', title: 'MacBook Pro M3 14"', price: 220000, location: 'Gulshan, Dhaka', image: '💻', category: 'Laptops', badge: 'featured' },
  { id: '3', title: 'Samsung Galaxy S24 Ultra', price: 115000, location: 'Gulshan, Dhaka', image: '📱', category: 'Mobiles', badge: null },
  { id: '4', title: 'Sony A7 IV Camera Kit', price: 280000, location: 'Gulshan, Dhaka', image: '📷', category: 'Cameras', badge: 'urgent' },
];

export default function SellerProfilePage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px 60px' }}>
      {/* Banner */}
      <div style={{ height: 240, background: MOCK_SELLER.banner, borderRadius: '0 0 24px 24px', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 24, bottom: 24, display: 'flex', gap: 12 }}>
          <button style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
            <Share2 size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} /> Share Shop
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32, marginTop: -60 }}>
        {/* Left Column: Seller Info */}
        <aside>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e8e8e8', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%', background: '#fff', margin: '0 auto 20px',
              padding: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', position: 'relative',
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 48 }}>
                {MOCK_SELLER.logo}
              </div>
              {MOCK_SELLER.isVerified && (
                <div style={{ position: 'absolute', bottom: 4, right: 4, background: '#fff', borderRadius: '50%', padding: 2 }}>
                  <CheckCircle size={28} style={{ color: '#2563eb', fill: '#fff' }} />
                </div>
              )}
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#222', marginBottom: 8 }}>{MOCK_SELLER.shopName}</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontWeight: 700 }}>
                <Star size={16} fill="#f59e0b" /> {MOCK_SELLER.rating}
              </div>
              <span style={{ color: '#ccc' }}>|</span>
              <span style={{ color: '#888', fontSize: 13 }}>{MOCK_SELLER.reviews} Reviews</span>
            </div>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 24 }}>{MOCK_SELLER.description}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#555' }}>
                <MapPin size={16} style={{ color: '#FF6B35' }} /> {MOCK_SELLER.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#555' }}>
                <Calendar size={16} style={{ color: '#FF6B35' }} /> Member since {MOCK_SELLER.memberSince}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#555' }}>
                <CheckCircle size={16} style={{ color: '#1aab50' }} /> {MOCK_SELLER.activeAds} Active Ads
              </div>
            </div>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#1aab50', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Phone size={18} /> Show Phone Number
              </button>
              <button style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <MessageSquare size={18} /> Send Message
              </button>
            </div>
          </div>

          <div style={{ marginTop: 24, background: '#fff8f0', borderRadius: 20, padding: 24, border: '1px solid #ffe0c0' }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#e65100', marginBottom: 12 }}>Authorized Dealer</h3>
            <p style={{ fontSize: 13, color: '#bf360c', lineHeight: 1.5 }}>
              This seller is a verified business member of AmanaMart with a physical store and proven track record.
            </p>
          </div>
        </aside>

        {/* Right Column: Listings */}
        <main>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e8e8e8' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#222' }}>Active Listings ({MOCK_SELLER.activeAds})</h2>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ position: 'relative', width: 240 }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input placeholder="Search in this shop..." style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, outline: 'none' }} />
                </div>
                <select style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, color: '#555' }}>
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Ads Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {SELLER_ADS.map((ad) => (
                <div key={ad.id} style={{
                  background: '#fff', borderRadius: 16, border: '1px solid #f0f0f0', overflow: 'hidden',
                  transition: 'all 0.2s', cursor: 'pointer', position: 'relative',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  {ad.badge && (
                    <div style={{
                      position: 'absolute', top: 10, left: 10, background: ad.badge === 'top' ? '#2563eb' : ad.badge === 'urgent' ? '#dc2626' : '#7c3aed',
                      color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: 0.5, zHeight: 2,
                    }}>{ad.badge.toUpperCase()} AD</div>
                  )}
                  <div style={{ height: 140, background: '#f5f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50 }}>
                    {ad.image}
                  </div>
                  <div style={{ padding: 16 }}>
                    <p style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{ad.category}</p>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 8, lineHeight: 1.4, height: 40, overflow: 'hidden' }}>{ad.title}</h3>
                    <p style={{ fontSize: 18, fontWeight: 800, color: '#1aab50' }}>৳{ad.price.toLocaleString()}</p>
                    <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>📍 {ad.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {[1, 2, 3].map(p => (
                <button key={p} style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: p === 1 ? '#FF6B35' : '#fff',
                  color: p === 1 ? '#fff' : '#555',
                  border: p === 1 ? 'none' : '1px solid #e0e0e0',
                  fontWeight: 700, cursor: 'pointer', fontSize: 14,
                }}>{p}</button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
