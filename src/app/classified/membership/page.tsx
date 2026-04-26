'use client';
import React from 'react';
import Link from 'next/link';
import { Check, Zap, Star, Shield, Award, BarChart2, MessageSquare, Plus, TrendingUp, Store } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    slug: 'free',
    features: ['5 Active Ads', '4 Photos per Ad', 'Standard Discovery', 'Valid for 30 Days'],
    btnText: 'Current Plan',
    color: '#666',
    bg: '#f5f5f5',
  },
  {
    name: 'Member',
    price: 299,
    slug: 'member',
    features: ['20 Active Ads', '8 Photos per Ad', '2 Boost Credits included', 'Own Shop Page', 'Better Discovery', 'Chat Support'],
    btnText: 'Go Pro',
    color: '#2563eb',
    bg: '#eff6ff',
    popular: true,
  },
  {
    name: 'Verified Seller',
    price: 599,
    slug: 'verified-seller',
    features: ['50 Active Ads', '12 Photos per Ad', '5 Boost Credits included', 'Verified Badge', 'Ad Analytics', 'Top Ad Vouchers (2)', 'Priority in Search', 'Dedicated Support'],
    btnText: 'Get Verified',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    name: 'Authorized Dealer',
    price: 1499,
    slug: 'authorized-dealer',
    features: ['200 Active Ads', '20 Photos per Ad', '15 Boost Credits included', 'All Verified Features', 'Bulk Ad Upload', 'Top Ad Vouchers (5)', 'Homepage Exposure', 'API Access'],
    btnText: 'Start Business',
    color: '#FF6B35',
    bg: '#fff5f0',
  },
];

const PROMOTIONS = [
  { name: 'Top Ad', icon: <Star size={24} />, desc: 'Keep your ad at the top of the category results.', price: 'Starts at ৳99' },
  { name: 'Urgent Ad', icon: <Zap size={24} />, desc: 'Add an "Urgent" tag to attract fast buyers.', price: 'Starts at ৳49' },
  { name: 'Spotlight', icon: <Award size={24} />, desc: 'Get featured on the homepage for maximum exposure.', price: 'Starts at ৳499' },
  { name: 'Bump Up', icon: <Plus size={24} />, desc: 'Refresh your ad to the top of the list instantly.', price: 'Starts at ৳29' },
];

export default function MembershipPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#222', marginBottom: 12 }}>Grow Your Business on AmanaMart</h1>
        <p style={{ color: '#888', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Choose a membership plan to sell more items, build trust with a verified badge, and get advanced analytics.</p>
      </div>

      {/* Plans Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 64 }}>
        {PLANS.map((plan) => (
          <div key={plan.slug} style={{
            background: '#fff', borderRadius: 20, padding: 32,
            border: plan.popular ? `2px solid ${plan.color}` : '1px solid #e8e8e8',
            position: 'relative', display: 'flex', flexDirection: 'column',
            boxShadow: plan.popular ? '0 12px 32px rgba(37,99,235,0.1)' : 'none',
          }}>
            {plan.popular && (
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: plan.color, color: '#fff', fontSize: 12, fontWeight: 800,
                padding: '4px 16px', borderRadius: 20, letterSpacing: 0.5,
              }}>MOST POPULAR</div>
            )}
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#222', marginBottom: 8 }}>{plan.name}</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#222' }}>৳{plan.price}</span>
              <span style={{ fontSize: 14, color: '#888' }}>/ month</span>
            </div>
            <div style={{ flex: 1, marginBottom: 32 }}>
              {plan.features.map((feat) => (
                <div key={feat} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <Check size={16} style={{ color: plan.color, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: '#555', lineHeight: 1.4 }}>{feat}</span>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%', padding: '12px', borderRadius: 10,
              background: plan.price === 0 ? 'transparent' : plan.color,
              color: plan.price === 0 ? plan.color : '#fff',
              border: plan.price === 0 ? `1.5px solid ${plan.color}` : 'none',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              {plan.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Promotion Packages */}
      <div style={{ background: '#fff', borderRadius: 24, padding: 48, border: '1px solid #e8e8e8', marginBottom: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#222', marginBottom: 4 }}>Boost Your Ads</h2>
            <p style={{ color: '#888', fontSize: 14 }}>Get up to 10x more responses by promoting your listings</p>
          </div>
          <Link href="/classified/post-ad" style={{ color: '#FF6B35', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Learn more about promotions →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {PROMOTIONS.map((promo) => (
            <div key={promo.name} style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#fff5f0', color: '#FF6B35',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
              }}>{promo.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#222', marginBottom: 8 }}>{promo.name}</h3>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>{promo.desc}</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1aab50' }}>{promo.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ / Trust */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#222', marginBottom: 20 }}>Why become a Member?</h2>
          {[
            { title: 'Increase Sales', icon: <TrendingUp size={20} />, desc: 'Members get more visibility and can post more ads, leading to faster sales.' },
            { title: 'Build Trust', icon: <Shield size={20} />, desc: 'The verified seller badge shows buyers that you are a reliable and trusted seller.' },
            { title: 'Professional Presence', icon: <Store size={20} />, desc: 'Get your own dedicated shop page with your brand logo and all your listings in one place.' },
            { title: 'Insightful Analytics', icon: <BarChart2 size={20} />, desc: 'Track how many people are viewing your ads and revealing your phone number.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ color: '#FF6B35', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#222', marginBottom: 4 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fb', borderRadius: 24, padding: 40, border: '1px solid #e8e8e8' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#222', marginBottom: 24 }}>Need Help?</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 2 }}>Contact our Sales Team</h3>
              <p style={{ fontSize: 13, color: '#666' }}>Available 9 AM – 9 PM, 7 days a week</p>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e0e0e0', marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: '#555', fontStyle: 'italic' }}>"AmanaMart membership helped us grow our mobile shop business by 40% in just 3 months. Highly recommended!"</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#222', marginTop: 12 }}>— Hassan Mobiles, Dhaka</p>
          </div>
          <button style={{
            width: '100%', padding: '14px', borderRadius: 10,
            background: '#222', color: '#fff', border: 'none',
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>Request a Callback</button>
        </div>
      </div>
    </div>
  );
}
