'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Eye, Phone, MessageSquare, Heart, Share2, Flag, Shield, Star, CheckCircle, Clock } from 'lucide-react';
import { use } from 'react';

const MOCK_AD = {
  id: '1', slug: 'iphone-15-pro-max-256gb-dhaka-12345',
  title: 'iPhone 15 Pro Max 256GB - Natural Titanium',
  price: 155000, negotiable: true, condition: 'used',
  adType: 'sale', category: 'Mobile Phones',
  location: 'Gulshan, Dhaka', division: 'Dhaka', district: 'Dhaka', area: 'Gulshan',
  description: `Selling my iPhone 15 Pro Max 256GB in Natural Titanium color. The phone is in excellent condition with no scratches or dents. All accessories included - original box, charger, and earphones. 

Battery health is at 97%. Always used with a screen protector and case. Purchased 8 months ago.

Reason for selling: Upgrading to a newer model.

Serious buyers only. Price is slightly negotiable for genuine buyers.`,
  images: ['📱', '📱', '📱', '📱'],
  fieldValues: [
    { fieldName: 'Brand', fieldValue: 'Apple' },
    { fieldName: 'Model', fieldValue: 'iPhone 15 Pro Max' },
    { fieldName: 'Storage', fieldValue: '256GB' },
    { fieldName: 'RAM', fieldValue: '8GB' },
    { fieldName: 'Color', fieldValue: 'Natural Titanium' },
    { fieldName: 'Battery Health', fieldValue: '97%' },
    { fieldName: 'Warranty', fieldValue: 'No warranty' },
    { fieldName: 'Accessories', fieldValue: 'Box, Charger, Cable' },
  ],
  isPromoted: true, isFeatured: true, isTopAd: true,
  viewCount: 1284, favoriteCount: 87, chatCount: 23, phoneRevealCount: 45,
  createdAt: new Date('2026-04-15'),
  seller: {
    id: 'seller-1',
    shopName: 'TechBD Store',
    name: 'Mahmud Rahman',
    memberSince: new Date('2024-01-10'),
    totalAds: 48, rating: 4.8, reviews: 234,
    isVerified: true, sellerType: 'business',
    location: 'Gulshan, Dhaka',
  }
};

const SIMILAR_ADS = [
  { id: 's1', slug: 'iphone-14-pro', title: 'iPhone 14 Pro 256GB', price: 115000, image: '📱', location: 'Dhaka' },
  { id: 's2', slug: 'samsung-s24', title: 'Samsung Galaxy S24 Ultra', price: 130000, image: '📱', location: 'Chattogram' },
  { id: 's3', slug: 'pixel-8-pro', title: 'Google Pixel 8 Pro', price: 98000, image: '📱', location: 'Dhaka' },
  { id: 's4', slug: 'oneplus-12', title: 'OnePlus 12 512GB', price: 88000, image: '📱', location: 'Sylhet' },
];

function formatPrice(p: number) {
  return `৳${p.toLocaleString('en-BD')}`;
}

export default function AdDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const ad = MOCK_AD;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Link href="/classified" style={{ color: '#FF6B35', textDecoration: 'none' }}>Classifieds</Link>
        <span>›</span>
        <Link href="/classified/category/mobiles" style={{ color: '#FF6B35', textDecoration: 'none' }}>Mobiles</Link>
        <span>›</span>
        <Link href="/classified/category/mobile-phones" style={{ color: '#FF6B35', textDecoration: 'none' }}>Mobile Phones</Link>
        <span>›</span>
        <span style={{ color: '#333' }}>{ad.title}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left Column */}
        <div>
          {/* Image Gallery */}
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e8e8e8', marginBottom: 20 }}>
            <div style={{
              height: 400, background: 'linear-gradient(135deg, #f0e8ff, #e8f0ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 140, position: 'relative',
            }}>
              {ad.images[currentImage]}
              {ad.isTopAd && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#2563eb', color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 6, letterSpacing: 1 }}>TOP AD</div>
              )}
              <button onClick={() => setCurrentImage(i => Math.max(0, i - 1))} style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setCurrentImage(i => Math.min(ad.images.length - 1, i + 1))} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: 12 }}>
              {ad.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} style={{
                  width: 72, height: 72, border: currentImage === i ? '2px solid #FF6B35' : '1px solid #e0e0e0',
                  borderRadius: 8, background: '#f5f5ff', fontSize: 28, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{img}</button>
              ))}
            </div>
          </div>

          {/* Ad Details */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e8e8e8', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 600, marginBottom: 6 }}>{ad.category}</p>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#222', lineHeight: 1.3, marginBottom: 12 }}>{ad.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <p style={{ fontSize: 28, fontWeight: 900, color: '#1aab50' }}>{formatPrice(ad.price)}</p>
                  {ad.negotiable && <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>Negotiable</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setSaved(!saved)} style={{
                  width: 44, height: 44, borderRadius: '50%', border: '1px solid #e0e0e0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Heart size={20} style={{ color: saved ? '#ef4444' : '#999', fill: saved ? '#ef4444' : 'none' }} />
                </button>
                <button style={{
                  width: 44, height: 44, borderRadius: '50%', border: '1px solid #e0e0e0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Share2 size={20} style={{ color: '#666' }} />
                </button>
                <button onClick={() => setReportOpen(true)} style={{
                  width: 44, height: 44, borderRadius: '50%', border: '1px solid #e0e0e0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Flag size={20} style={{ color: '#666' }} />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '16px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
              {[
                { label: 'Location', value: ad.location, icon: <MapPin size={14} /> },
                { label: 'Condition', value: ad.condition === 'used' ? 'Used' : 'New', icon: <CheckCircle size={14} /> },
                { label: 'Ad Type', value: 'For Sale', icon: <Star size={14} /> },
                { label: 'Views', value: `${ad.viewCount}`, icon: <Eye size={14} /> },
                { label: 'Posted', value: ad.createdAt.toLocaleDateString('en-BD'), icon: <Clock size={14} /> },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555', minWidth: 150 }}>
                  <span style={{ color: '#FF6B35' }}>{item.icon}</span>
                  <span style={{ color: '#999' }}>{item.label}:</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Specifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {ad.fieldValues.map(fv => (
                <div key={fv.fieldName} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 12px', background: '#f9f9f9', borderRadius: 8, fontSize: 13,
                }}>
                  <span style={{ color: '#888' }}>{fv.fieldName}</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>{fv.fieldValue}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Description</h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{ad.description}</p>
          </div>

          {/* Safety Tips */}
          <div style={{ background: '#fff8f0', borderRadius: 16, padding: 20, border: '1px solid #ffe0c0', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e65100', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} /> Safety Tips
            </h3>
            <ul style={{ fontSize: 13, color: '#795548', lineHeight: 2, paddingLeft: 20 }}>
              <li>Meet in a safe, public place to complete the transaction</li>
              <li>Inspect the item thoroughly before making payment</li>
              <li>Never pay in advance to unknown sellers</li>
              <li>Report suspicious ads or sellers to our team</li>
            </ul>
          </div>

          {/* Similar Ads */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Similar Ads</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {SIMILAR_ADS.map(sim => (
                <Link key={sim.id} href={`/classified/ad/${sim.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e8e8', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  >
                    <div style={{ height: 100, background: '#f0e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{sim.image}</div>
                    <div style={{ padding: 10 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 4, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{sim.title}</p>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#1aab50' }}>৳{sim.price.toLocaleString()}</p>
                      <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>📍 {sim.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Seller Card + Actions */}
        <div>
          {/* Contact Actions */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e8e8e8', marginBottom: 16, position: 'sticky', top: 130 }}>
            {phoneRevealed ? (
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Phone Number</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#1aab50', letterSpacing: 1 }}>+880 1712-345678</p>
              </div>
            ) : (
              <button onClick={() => setPhoneRevealed(true)} style={{
                width: '100%', background: '#1aab50', color: '#fff',
                border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Phone size={18} /> Show Phone Number
              </button>
            )}
            <button style={{
              width: '100%', background: '#25D366', color: '#fff',
              border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
              cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              💬 WhatsApp Seller
            </button>
            <Link href={`/classified/chat/${ad.id}`} style={{
              width: '100%', background: '#2563eb', color: '#fff',
              border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              textDecoration: 'none',
            }}>
              <MessageSquare size={18} /> Chat with Seller
            </Link>

            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={() => setSaved(!saved)} style={{
                flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e0e0e0',
                background: saved ? '#fef2f2' : '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontSize: 13, color: saved ? '#ef4444' : '#555',
              }}>
                <Heart size={16} style={{ fill: saved ? '#ef4444' : 'none', color: saved ? '#ef4444' : '#555' }} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button style={{
                flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e0e0e0',
                background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontSize: 13, color: '#555',
              }}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* Seller Card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #e8e8e8', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#888', marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Seller Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #F7931E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20 }}>
                {ad.seller.name[0]}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontWeight: 700, color: '#222', fontSize: 16 }}>{ad.seller.shopName}</p>
                  {ad.seller.isVerified && <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>✓ Verified</span>}
                </div>
                <p style={{ fontSize: 12, color: '#888' }}>Member since {ad.seller.memberSince.getFullYear()}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Total Ads', value: ad.seller.totalAds },
                { label: 'Rating', value: `★ ${ad.seller.rating}` },
              ].map(item => (
                <div key={item.label} style={{ background: '#f9f9f9', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#222' }}>{item.value}</p>
                  <p style={{ fontSize: 11, color: '#888' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <Link href={`/classified/seller/${ad.seller.id}`} style={{
              display: 'block', textAlign: 'center', padding: '10px',
              border: '1.5px solid #FF6B35', borderRadius: 10, color: '#FF6B35',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
            }}>View All Ads by Seller</Link>
          </div>

          {/* Ad ID */}
          <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 16, fontSize: 12, color: '#999', textAlign: 'center' }}>
            <p>Ad ID: CLF-{ad.id}-2026</p>
            <p style={{ marginTop: 4 }}>Posted on {ad.createdAt.toLocaleDateString('en-BD')}</p>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: 440, maxWidth: '90vw' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Report This Ad</h3>
            <select value={reportReason} onChange={e => setReportReason(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, marginBottom: 12 }}>
              <option value="">Select a reason...</option>
              <option>Fraud / Scam</option>
              <option>Wrong Category</option>
              <option>Offensive Content</option>
              <option>Duplicate Ad</option>
              <option>Fake Price</option>
              <option>Item Already Sold</option>
              <option>Prohibited Item</option>
              <option>Misleading Information</option>
            </select>
            <textarea placeholder="Additional details (optional)" rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={() => setReportOpen(false)} style={{ flex: 1, padding: '12px', border: '1px solid #e0e0e0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={() => setReportOpen(false)} style={{ flex: 1, padding: '12px', background: '#dc2626', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
