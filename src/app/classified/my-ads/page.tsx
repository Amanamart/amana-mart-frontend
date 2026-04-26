'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit2, Trash2, Pause, Play, TrendingUp, Heart, MessageSquare, BarChart2, Plus, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const TABS = ['All', 'Active', 'Pending', 'Paused', 'Rejected', 'Sold/Expired'];

const MY_ADS = [
  { id: '1', slug: 'iphone-15-pro', title: 'iPhone 15 Pro Max 256GB', price: 155000, status: 'active', views: 1284, favorites: 87, chats: 23, category: 'Mobiles', image: '📱', promoted: true, createdAt: '2026-04-15' },
  { id: '2', slug: 'car-toyota', title: 'Toyota Corolla 2020 Full Option', price: 3200000, status: 'pending_review', views: 0, favorites: 0, chats: 0, category: 'Cars', image: '🚗', promoted: false, createdAt: '2026-04-25' },
  { id: '3', slug: 'macbook-pro', title: 'MacBook Pro M3 14"', price: 220000, status: 'paused', views: 456, favorites: 34, chats: 8, category: 'Electronics', image: '💻', promoted: false, createdAt: '2026-04-10' },
  { id: '4', slug: 'flat-rent', title: '2BHK Flat for Rent Mirpur', price: 25000, status: 'rejected', views: 0, favorites: 0, chats: 0, category: 'Property', image: '🏢', promoted: false, createdAt: '2026-04-20' },
  { id: '5', slug: 'sony-camera', title: 'Sony A7 IV Camera Kit', price: 280000, status: 'sold', views: 892, favorites: 56, chats: 15, category: 'Cameras', image: '📷', promoted: false, createdAt: '2026-03-28' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  active: { label: 'Active', color: '#166534', bg: '#dcfce7', icon: <CheckCircle size={12} /> },
  pending_review: { label: 'Pending', color: '#92400e', bg: '#fef3c7', icon: <Clock size={12} /> },
  paused: { label: 'Paused', color: '#1e3a8a', bg: '#dbeafe', icon: <Pause size={12} /> },
  rejected: { label: 'Rejected', color: '#991b1b', bg: '#fee2e2', icon: <XCircle size={12} /> },
  sold: { label: 'Sold', color: '#4b5563', bg: '#f3f4f6', icon: <CheckCircle size={12} /> },
};

function formatPrice(p: number) {
  if (p >= 100000) return `৳${(p / 100000).toFixed(1)}L`;
  return `৳${p.toLocaleString()}`;
}

export default function MyAdsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'Total Ads', value: 5, icon: <BarChart2 size={20} />, color: '#FF6B35' },
    { label: 'Total Views', value: '2,632', icon: <Eye size={20} />, color: '#2563eb' },
    { label: 'Saved by Others', value: 177, icon: <Heart size={20} />, color: '#ef4444' },
    { label: 'Chat Messages', value: 46, icon: <MessageSquare size={20} />, color: '#1aab50' },
  ];

  const filtered = activeTab === 'All' ? MY_ADS :
    MY_ADS.filter(a => {
      if (activeTab === 'Active') return a.status === 'active';
      if (activeTab === 'Pending') return a.status === 'pending_review';
      if (activeTab === 'Paused') return a.status === 'paused';
      if (activeTab === 'Rejected') return a.status === 'rejected';
      if (activeTab === 'Sold/Expired') return a.status === 'sold' || a.status === 'expired';
      return true;
    });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#222' }}>My Ads</h1>
          <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>Manage and track all your classified ads</p>
        </div>
        <Link href="/classified/post-ad" style={{
          background: 'linear-gradient(135deg, #FF6B35, #F7931E)', color: '#fff',
          padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Plus size={18} /> Post New Ad
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #e8e8e8', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#222' }}>{s.value}</p>
              <p style={{ fontSize: 12, color: '#888' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#f5f5f5', borderRadius: 12, padding: 4, marginBottom: 20, width: 'fit-content' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '8px 18px', borderRadius: 9, border: 'none', fontSize: 14,
            background: activeTab === tab ? '#fff' : 'transparent',
            color: activeTab === tab ? '#FF6B35' : '#666',
            fontWeight: activeTab === tab ? 700 : 400,
            boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{tab} <span style={{ fontSize: 12, opacity: 0.7 }}>
            ({tab === 'All' ? MY_ADS.length : MY_ADS.filter(a => {
              if (tab === 'Active') return a.status === 'active';
              if (tab === 'Pending') return a.status === 'pending_review';
              if (tab === 'Paused') return a.status === 'paused';
              if (tab === 'Rejected') return a.status === 'rejected';
              if (tab === 'Sold/Expired') return a.status === 'sold' || a.status === 'expired';
              return true;
            }).length})
          </span></button>
        ))}
      </div>

      {/* Ads Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8e8e8', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>📋</p>
            <p style={{ fontWeight: 700, color: '#333', marginBottom: 8 }}>No ads found</p>
            <Link href="/classified/post-ad" style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>Post your first ad →</Link>
          </div>
        ) : filtered.map((ad, i) => {
          const sc = STATUS_CONFIG[ad.status] || STATUS_CONFIG.active;
          return (
            <div key={ad.id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
              borderBottom: i < filtered.length - 1 ? '1px solid #f0f0f0' : 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafafa'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
            >
              {/* Image */}
              <div style={{ width: 60, height: 60, background: '#f5f5ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {ad.image}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#222', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320 }}>{ad.title}</h3>
                  {ad.promoted && <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>PROMOTED</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#888' }}>
                  <span style={{ color: '#1aab50', fontWeight: 700 }}>{formatPrice(ad.price)}</span>
                  <span>{ad.category}</span>
                  <span>Posted {ad.createdAt}</span>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
                {[{ icon: <Eye size={14} />, v: ad.views }, { icon: <Heart size={14} />, v: ad.favorites }, { icon: <MessageSquare size={14} />, v: ad.chats }].map((m, j) => (
                  <div key={j} style={{ textAlign: 'center', fontSize: 13 }}>
                    <div style={{ color: '#888', marginBottom: 2 }}>{m.icon}</div>
                    <span style={{ fontWeight: 700, color: '#333' }}>{m.v}</span>
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: sc.bg, color: sc.color,
                  fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20,
                }}>
                  {sc.icon} {sc.label}
                </span>
                {ad.status === 'rejected' && (
                  <p style={{ fontSize: 11, color: '#dc2626', marginTop: 4, textAlign: 'center' }}>View reason</p>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <Link href={`/classified/ad/${ad.slug}`} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none' }}>
                  <Eye size={16} />
                </Link>
                {['active', 'pending_review', 'paused', 'rejected'].includes(ad.status) && (
                  <Link href={`/classified/edit-ad/${ad.id}`} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none' }}>
                    <Edit2 size={16} />
                  </Link>
                )}
                {ad.status === 'active' && (
                  <button title="Pause" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', cursor: 'pointer' }}>
                    <Pause size={16} />
                  </button>
                )}
                {ad.status === 'paused' && (
                  <button title="Resume" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1aab50', cursor: 'pointer' }}>
                    <Play size={16} />
                  </button>
                )}
                {ad.status === 'active' && (
                  <button title="Boost" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #FF6B35', background: '#fff8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B35', cursor: 'pointer' }}>
                    <TrendingUp size={16} />
                  </button>
                )}
                <button title="Delete" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
