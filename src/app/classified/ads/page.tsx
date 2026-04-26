'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Eye, Heart, Filter, Grid, List, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';

const MOCK_ADS = Array.from({ length: 24 }, (_, i) => ({
  id: `ad-${i + 1}`,
  slug: `ad-listing-${i + 1}`,
  title: ['iPhone 15 Pro Max', 'Toyota Corolla 2022', '3BHK Flat for Rent', 'MacBook Pro M3', 'Samsung Galaxy S24', 'Honda CB300R', 'Dell XPS 15', 'Refrigerator LG', 'Sofa Set 5 Seater', 'Office Space Rent', 'Senior Dev Job', 'Nikon D850 Camera', 'Honda City 2023', 'LED TV 65 inch', 'Yamaha R15 2023', 'Acer Laptop i7', 'AC 1.5 Ton Split', 'Washing Machine', 'Cat Persian Female', 'Road Bicycle Trek', 'Guitar Electric', 'German Shepherd', 'Commercial Plot', 'Huawei Watch GT4'][i],
  price: [145000, 3500000, 65000, 220000, 115000, 245000, 145000, 58000, 35000, 45000, 0, 185000, 3800000, 95000, 210000, 78000, 62000, 48000, 15000, 28000, 22000, 35000, 4200000, 12000][i],
  location: ['Dhaka, Gulshan', 'Dhaka, Dhanmondi', 'Dhaka, Banani', 'Chattogram', 'Dhaka, Mirpur', 'Sylhet', 'Dhaka, Uttara', 'Dhaka, Mohammadpur', 'Rajshahi', 'Dhaka, Motijheel', 'Remote', 'Dhaka, Gulshan', 'Chattogram', 'Dhaka, Badda', 'Sylhet', 'Gazipur', 'Dhaka, Rampura', 'Khulna', 'Dhaka, Dhanmondi', 'Dhaka, Gulshan', 'Chattogram', 'Dhaka, Mirpur', 'Rajshahi', 'Dhaka, Uttara'][i],
  category: ['Mobiles', 'Cars', 'Property', 'Electronics', 'Mobiles', 'Motorbikes', 'Electronics', 'Appliances', 'Furniture', 'Property', 'Jobs', 'Cameras', 'Cars', 'Electronics', 'Motorbikes', 'Electronics', 'Appliances', 'Appliances', 'Pets', 'Sports', 'Music', 'Pets', 'Property', 'Electronics'][i],
  image: ['📱', '🚗', '🏢', '💻', '📱', '🏍️', '💻', '🧊', '🛋️', '🏢', '💼', '📷', '🚗', '📺', '🏍️', '💻', '❄️', '🫧', '🐱', '🚲', '🎸', '🐕', '🌍', '⌚'][i],
  condition: (i % 3 === 0) ? 'new' : 'used',
  isPromoted: i % 5 === 0,
  isFeatured: i % 7 === 0,
  isUrgent: i % 8 === 0,
  sellerVerified: i % 3 !== 0,
  views: Math.floor(Math.random() * 1000) + 50,
  createdAt: new Date(Date.now() - Math.random() * 30 * 86400000),
}));

function timeAgo(date: Date) {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatPrice(p: number) {
  if (p === 0) return 'Negotiable';
  if (p >= 100000) return `৳${(p / 100000).toFixed(1)}L`;
  if (p >= 1000) return `৳${(p / 1000).toFixed(0)}K`;
  return `৳${p.toLocaleString()}`;
}

export default function AdsListingPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState('newest');

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', display: 'flex', gap: 24 }}>
      {/* Sidebar Filters */}
      <aside style={{ width: 260, flexShrink: 0 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e8e8e8', position: 'sticky', top: 140 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SlidersHorizontal size={18} style={{ color: '#FF6B35' }} /> Filters
          </h3>

          {/* Category */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Category</p>
            {['Mobiles', 'Electronics', 'Vehicles', 'Property', 'Jobs', 'Home & Living'].map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, color: '#555' }}>
                <input type="checkbox" style={{ accentColor: '#FF6B35' }} /> {cat}
              </label>
            ))}
          </div>

          {/* Location */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Location</p>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}>
              <option>All Bangladesh</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Sylhet</option>
              <option>Rajshahi</option>
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Price Range (৳)</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Min" style={{ width: '50%', padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }} />
              <input placeholder="Max" style={{ width: '50%', padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }} />
            </div>
          </div>

          {/* Condition */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Condition</p>
            {['New', 'Used', 'Reconditioned'].map(c => (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, color: '#555' }}>
                <input type="checkbox" style={{ accentColor: '#FF6B35' }} /> {c}
              </label>
            ))}
          </div>

          {/* Seller Type */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Seller Type</p>
            {['Individual', 'Business'].map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, color: '#555' }}>
                <input type="radio" name="seller_type" style={{ accentColor: '#FF6B35' }} /> {t}
              </label>
            ))}
          </div>

          <button style={{
            width: '100%', background: '#FF6B35', color: '#fff',
            padding: '12px', borderRadius: 10, border: 'none',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>Apply Filters</button>
          <button style={{
            width: '100%', marginTop: 8, background: 'transparent', color: '#888',
            padding: '10px', borderRadius: 10, border: '1px solid #e0e0e0',
            fontSize: 13, cursor: 'pointer',
          }}>Reset All</button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16, background: '#fff', padding: '12px 16px',
          borderRadius: 10, border: '1px solid #e8e8e8',
        }}>
          <p style={{ fontSize: 14, color: '#555' }}>
            Showing <strong>{MOCK_ADS.length}</strong> ads
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#888' }}>Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="most_viewed">Most Viewed</option>
                <option value="promoted_first">Promoted First</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e0e0',
                  background: view === v ? '#FF6B35' : '#fff', color: view === v ? '#fff' : '#555',
                  cursor: 'pointer',
                }}>
                  {v === 'grid' ? <Grid size={16} /> : <List size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ads Grid/List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr',
          gap: 14,
        }}>
          {MOCK_ADS.map(ad => (
            view === 'grid' ? (
              <div key={ad.id} style={{
                background: '#fff', borderRadius: 12, overflow: 'hidden',
                border: ad.isPromoted ? '1.5px solid #FF6B35' : '1px solid #e8e8e8',
                transition: 'all 0.2s', cursor: 'pointer', position: 'relative',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
              >
                {ad.isPromoted && <div style={{ position: 'absolute', top: 8, left: 8, background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, letterSpacing: 0.5 }}>TOP AD</div>}
                {ad.isUrgent && <div style={{ position: 'absolute', top: 8, left: ad.isPromoted ? 72 : 8, background: '#dc2626', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>URGENT</div>}
                <button onClick={e => { e.preventDefault(); toggleSave(ad.id); }} style={{
                  position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)',
                  border: 'none', borderRadius: '50%', width: 30, height: 30,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>
                  <Heart size={14} style={{ color: savedIds.has(ad.id) ? '#ef4444' : '#999', fill: savedIds.has(ad.id) ? '#ef4444' : 'none' }} />
                </button>
                <Link href={`/classified/ad/${ad.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: 140, background: '#f8f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>
                    {ad.image}
                  </div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{ad.category}</p>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 6, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{ad.title}</h3>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#1aab50', marginBottom: 8 }}>{formatPrice(ad.price)}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} /> {ad.location}</span>
                      <span>{timeAgo(ad.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div key={ad.id} style={{
                background: '#fff', borderRadius: 12,
                border: ad.isPromoted ? '1.5px solid #FF6B35' : '1px solid #e8e8e8',
                display: 'flex', gap: 16, padding: 16, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div style={{ width: 120, height: 90, background: '#f8f4ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>
                  {ad.image}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      {ad.isPromoted && <span style={{ background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, marginRight: 6 }}>TOP AD</span>}
                      <p style={{ fontSize: 11, color: '#888', marginTop: ad.isPromoted ? 6 : 0 }}>{ad.category}</p>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222', marginTop: 4 }}>{ad.title}</h3>
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: '#1aab50', flexShrink: 0 }}>{formatPrice(ad.price)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: 12, color: '#888' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {ad.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={12} /> {ad.views} views</span>
                    <span>{timeAgo(ad.createdAt)}</span>
                    {ad.sellerVerified && <span style={{ color: '#2563eb', fontWeight: 600 }}>✓ Verified Seller</span>}
                  </div>
                </div>
                <button onClick={() => toggleSave(ad.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
                  <Heart size={18} style={{ color: savedIds.has(ad.id) ? '#ef4444' : '#ccc', fill: savedIds.has(ad.id) ? '#ef4444' : 'none' }} />
                </button>
              </div>
            )
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {[1, 2, 3, 4, 5, '...', 12].map((p, i) => (
            <button key={i} style={{
              padding: '8px 16px', borderRadius: 8,
              border: p === 1 ? 'none' : '1px solid #e0e0e0',
              background: p === 1 ? '#FF6B35' : '#fff',
              color: p === 1 ? '#fff' : '#555',
              fontWeight: p === 1 ? 700 : 400,
              cursor: 'pointer', fontSize: 14,
            }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
