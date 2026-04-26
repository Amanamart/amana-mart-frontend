'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronRight, Star, Heart, Eye, TrendingUp, Shield, Award, Zap } from 'lucide-react';

const CATEGORIES = [
  { name: 'Mobiles', slug: 'mobiles', icon: '📱', count: 2840 },
  { name: 'Electronics', slug: 'electronics', icon: '💻', count: 1920 },
  { name: 'Vehicles', slug: 'vehicles', icon: '🚗', count: 3150 },
  { name: 'Property', slug: 'property', icon: '🏠', count: 2200 },
  { name: 'Jobs', slug: 'jobs', icon: '💼', count: 4500 },
  { name: 'Home & Living', slug: 'home-living', icon: '🛋️', count: 1340 },
  { name: 'Fashion', slug: 'fashion-beauty', icon: '👗', count: 980 },
  { name: 'Pets', slug: 'pets', icon: '🐾', count: 620 },
  { name: 'Services', slug: 'services', icon: '🔧', count: 1860 },
  { name: 'Agriculture', slug: 'agriculture', icon: '🌾', count: 740 },
  { name: 'Business', slug: 'business', icon: '🏭', count: 890 },
  { name: 'Education', slug: 'education', icon: '📚', count: 560 },
  { name: 'Sports', slug: 'sports', icon: '⚽', count: 430 },
  { name: 'Others', slug: 'others', icon: '📦', count: 310 },
];

const LOCATIONS = [
  { name: 'Dhaka', slug: 'dhaka', count: 28540, emoji: '🏙️' },
  { name: 'Chattogram', slug: 'chattogram', count: 12300, emoji: '🌊' },
  { name: 'Sylhet', slug: 'sylhet', count: 5600, emoji: '🍵' },
  { name: 'Rajshahi', slug: 'rajshahi', count: 4200, emoji: '🍎' },
  { name: 'Khulna', slug: 'khulna', count: 3800, emoji: '🦁' },
  { name: 'Barishal', slug: 'barishal', count: 2900, emoji: '🚢' },
  { name: 'Rangpur', slug: 'rangpur', count: 2400, emoji: '🌿' },
  { name: 'Mymensingh', slug: 'mymensingh', count: 2100, emoji: '🎓' },
];

const FEATURED_ADS = [
  { id: '1', slug: 'iphone-15-pro-max-256gb', title: 'iPhone 15 Pro Max 256GB', price: 155000, location: 'Dhaka, Gulshan', condition: 'used', category: 'Mobile Phones', views: 342, image: '📱', badge: 'top', sellerVerified: true },
  { id: '2', slug: 'toyota-corolla-2020', title: 'Toyota Corolla 2020 - Full Option', price: 3200000, location: 'Dhaka, Dhanmondi', condition: 'used', category: 'Cars', views: 891, image: '🚗', badge: 'featured', sellerVerified: true },
  { id: '3', slug: '3-bedroom-flat-gulshan', title: '3 Bed Apartment for Rent - Gulshan', price: 65000, location: 'Dhaka, Gulshan', condition: 'new', category: 'Property', views: 1240, image: '🏢', badge: 'urgent', sellerVerified: false },
  { id: '4', slug: 'macbook-pro-m3', title: 'MacBook Pro M3 14" 2024', price: 220000, location: 'Chattogram, Nasirabad', condition: 'used', category: 'Laptops', views: 456, image: '💻', badge: 'top', sellerVerified: true },
  { id: '5', slug: 'sony-a7iv-camera', title: 'Sony A7 IV Mirrorless Camera Kit', price: 285000, location: 'Dhaka, Banani', condition: 'used', category: 'Cameras', views: 234, image: '📷', badge: null, sellerVerified: false },
  { id: '6', slug: 'suzuki-gixxer-2023', title: 'Suzuki Gixxer SF 2023 - 12000km', price: 185000, location: 'Sylhet', condition: 'used', category: 'Motorbikes', views: 678, image: '🏍️', badge: 'featured', sellerVerified: true },
];

function formatPrice(p: number) {
  if (p >= 100000) return `৳${(p / 100000).toFixed(p % 100000 === 0 ? 0 : 1)}L`;
  if (p >= 1000) return `৳${(p / 1000).toFixed(0)}K`;
  return `৳${p.toLocaleString()}`;
}

function AdCard({ ad }: { ad: typeof FEATURED_ADS[0] }) {
  const [saved, setSaved] = useState(false);
  const badgeConfig: Record<string, { label: string; bg: string; color: string }> = {
    top: { label: 'TOP AD', bg: '#2563eb', color: '#fff' },
    featured: { label: 'FEATURED', bg: '#7c3aed', color: '#fff' },
    urgent: { label: 'URGENT', bg: '#dc2626', color: '#fff' },
  };
  const badge = ad.badge ? badgeConfig[ad.badge] : null;

  return (
    <div style={{
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      border: '1px solid #e8e8e8', transition: 'all 0.2s',
      cursor: 'pointer', position: 'relative',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
    >
      {badge && (
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          background: badge.bg, color: badge.color,
          fontSize: 10, fontWeight: 800, padding: '3px 8px',
          borderRadius: 4, letterSpacing: 0.5,
        }}>{badge.label}</div>
      )}
      <button
        onClick={e => { e.preventDefault(); setSaved(!saved); }}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          background: 'rgba(255,255,255,0.9)', border: 'none',
          borderRadius: '50%', width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(8px)',
        }}
      >
        <Heart size={16} style={{ color: saved ? '#ef4444' : '#999', fill: saved ? '#ef4444' : 'none' }} />
      </button>
      <Link href={`/classified/ad/${ad.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          height: 160, background: 'linear-gradient(135deg, #f8f4ff, #e8f4ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64,
        }}>{ad.image}</div>
        <div style={{ padding: 12 }}>
          <p style={{ fontSize: 12, color: '#FF6B35', fontWeight: 600, marginBottom: 4 }}>{ad.category}</p>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 6, lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {ad.title}
          </h3>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#1aab50', marginBottom: 8 }}>
            {formatPrice(ad.price)}
            <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>
              {ad.category === 'Property' ? '/month' : ''}
            </span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 12 }}>
              <MapPin size={12} />
              <span>{ad.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 12 }}>
              <Eye size={12} />
              <span>{ad.views}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 20,
              background: ad.condition === 'new' ? '#dcfce7' : '#fef3c7',
              color: ad.condition === 'new' ? '#166534' : '#92400e', fontWeight: 600,
            }}>{ad.condition === 'new' ? 'New' : 'Used'}</span>
            {ad.sellerVerified && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 20,
                background: '#dbeafe', color: '#1d4ed8', fontWeight: 600,
              }}>✓ Verified</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ClassifiedHomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFB347 100%)',
        padding: '40px 16px 60px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>
            Buy & Sell Anything in Bangladesh
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>
            Post free ads in 2 minutes · 500,000+ active listings
          </p>
          <div style={{
            display: 'flex', gap: 0, background: '#fff',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', borderRight: '1px solid #e8e8e8', gap: 8, flexShrink: 0 }}>
              <MapPin size={16} style={{ color: '#FF6B35' }} />
              <select style={{ border: 'none', outline: 'none', fontSize: 14, color: '#555', background: 'transparent' }}>
                <option>All Bangladesh</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Sylhet</option>
                <option>Rajshahi</option>
              </select>
            </div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for anything..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: '16px 20px', fontSize: 16 }}
            />
            <Link href={`/classified/ads${searchQuery ? `?search=${searchQuery}` : ''}`} style={{
              background: '#FF6B35', color: '#fff', padding: '0 28px',
              display: 'flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', fontWeight: 700, fontSize: 15,
              whiteSpace: 'nowrap',
            }}>
              <Search size={18} /> Search
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
            {['Mobiles', 'Cars', 'Property', 'Jobs', 'Electronics'].map(tag => (
              <Link key={tag} href={`/classified/ads?search=${tag}`} style={{
                color: 'rgba(255,255,255,0.8)', fontSize: 13, textDecoration: 'none',
                padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.4)',
                transition: 'all 0.2s',
              }}>{tag}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        {/* Stats Bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
          margin: '-24px 0 32px', position: 'relative', zIndex: 10,
        }}>
          {[
            { icon: <TrendingUp size={20} style={{ color: '#FF6B35' }} />, label: 'Active Ads', value: '500K+' },
            { icon: <Award size={20} style={{ color: '#7c3aed' }} />, label: 'Verified Sellers', value: '12K+' },
            { icon: <Shield size={20} style={{ color: '#1aab50' }} />, label: 'Safe Transactions', value: '1M+' },
            { icon: <Zap size={20} style={{ color: '#f59e0b' }} />, label: 'Post in Minutes', value: '2 min' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '20px 24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#222' }}>{stat.value}</p>
                <p style={{ fontSize: 12, color: '#888' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#222' }}>Browse by Category</h2>
            <Link href="/classified/ads" style={{ color: '#FF6B35', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              All Categories <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} href={`/classified/category/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', borderRadius: 12, padding: '16px 8px', textAlign: 'center',
                  border: '1px solid #e8e8e8', transition: 'all 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid #FF6B35'; (e.currentTarget as HTMLDivElement).style.background = '#fff8f5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid #e8e8e8'; (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#333', marginBottom: 4 }}>{cat.name}</p>
                  <p style={{ fontSize: 11, color: '#999' }}>{cat.count.toLocaleString()} ads</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Ads */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#222' }}>⭐ Featured Ads</h2>
            <Link href="/classified/ads?promoted=true" style={{ color: '#FF6B35', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {FEATURED_ADS.map(ad => <AdCard key={ad.id} ad={ad} />)}
          </div>
        </section>

        {/* Location Browse */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#222' }}>📍 Browse by Location</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {LOCATIONS.map(loc => (
              <Link key={loc.slug} href={`/classified/location/${loc.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', borderRadius: 12, padding: '16px 20px',
                  border: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                >
                  <span style={{ fontSize: 28 }}>{loc.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>{loc.name}</p>
                    <p style={{ fontSize: 12, color: '#888' }}>{loc.count.toLocaleString()} ads</p>
                  </div>
                  <ChevronRight size={16} style={{ color: '#ccc', marginLeft: 'auto' }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Membership CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          borderRadius: 20, padding: '40px 48px', marginBottom: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
        }}>
          <div>
            <p style={{ color: '#FF6B35', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>🏆 GROW YOUR BUSINESS</p>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 900, marginBottom: 12, lineHeight: 1.3 }}>
              Become a Verified Seller<br />& Get More Buyers
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px', marginBottom: 24 }}>
              {['Own shop page', 'Verified seller badge', 'Ad analytics', 'Top ad vouchers', 'Priority discovery', 'Dedicated support'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                  <span style={{ color: '#1aab50', fontWeight: 800 }}>✓</span> {b}
                </div>
              ))}
            </div>
            <Link href="/classified/membership" style={{
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              color: '#fff', padding: '12px 28px', borderRadius: 10,
              textDecoration: 'none', fontWeight: 700, fontSize: 15, display: 'inline-block',
            }}>View Membership Plans</Link>
          </div>
          <div style={{ fontSize: 120, flexShrink: 0 }}>🏆</div>
        </section>

        {/* Safety Tips */}
        <section style={{
          background: '#fff4e6', borderRadius: 16, padding: 28, marginBottom: 40,
          border: '1px solid #ffe0b2',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#e65100', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={20} /> Safety Tips for Buyers & Sellers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { icon: '🤝', title: 'Meet in Public', desc: 'Always meet in a safe, public place for transactions' },
              { icon: '🔍', title: 'Check the Item', desc: 'Inspect thoroughly before making any payment' },
              { icon: '💰', title: 'Avoid Advance Pay', desc: 'Do not pay in advance to unknown sellers' },
              { icon: '🚨', title: 'Report Fraud', desc: 'Report suspicious ads or users immediately' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{tip.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#bf360c', fontSize: 14, marginBottom: 4 }}>{tip.title}</p>
                  <p style={{ color: '#795548', fontSize: 12, lineHeight: 1.5 }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Ad CTA */}
        <section style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            background: 'linear-gradient(135deg, #1aab50, #005555)',
            borderRadius: 20, padding: '48px 24px',
          }}>
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Ready to Sell Something?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 28 }}>
              Post your first ad for FREE in just 2 minutes
            </p>
            <Link href="/classified/post-ad" style={{
              background: '#fff', color: '#1aab50',
              fontWeight: 800, fontSize: 18, padding: '16px 48px',
              borderRadius: 12, textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}>
              Post Your Ad Now — It's FREE
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
