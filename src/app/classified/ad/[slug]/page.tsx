'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Eye, Phone, MessageSquare, Heart, Share2, Flag, Shield, Star, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { use } from 'react';
import { classifiedService } from '@/services/api/classified';

function formatPrice(p: number) {
  return `৳${p.toLocaleString('en-BD')}`;
}

export default function AdDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [ad, setAd] = useState<any>(null);
  const [similarAds, setSimilarAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true);
      try {
        const data = await classifiedService.getAdBySlug(slug);
        setAd(data);
        
        // Fetch similar ads (same category)
        if (data.classifiedCategoryId) {
          const res = await classifiedService.getAds({ categorySlug: data.category?.slug, limit: 4 });
          setSimilarAds(res.ads?.filter((a: any) => a.id !== data.id) || []);
        }
      } catch (err) {
        console.error('Failed to fetch ad:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <Loader2 className="animate-spin text-[#FF6B35]" size={48} />
        <p style={{ color: '#888' }}>Loading ad details...</p>
      </div>
    );
  }

  if (!ad) {
    return (
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 64 }}>⚠️</div>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Ad Not Found</h1>
        <p style={{ color: '#888' }}>The ad you are looking for might have been removed or expired.</p>
        <Link href="/classified" style={{ color: '#FF6B35', fontWeight: 700, textDecoration: 'none', border: '1.5px solid #FF6B35', padding: '10px 24px', borderRadius: 10 }}>Back to Marketplace</Link>
      </div>
    );
  }

  const images = ad.media?.map((m: any) => m.path) || [];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Link href="/classified" style={{ color: '#FF6B35', textDecoration: 'none' }}>Classifieds</Link>
        <span>›</span>
        {ad.category?.slug && (
          <>
            <Link href={`/classified/category/${ad.category.slug}`} style={{ color: '#FF6B35', textDecoration: 'none' }}>{ad.category.name}</Link>
            <span>›</span>
          </>
        )}
        <span style={{ color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{ad.title}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left Column */}
        <div>
          {/* Image Gallery */}
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e8e8e8', marginBottom: 20 }}>
            <div style={{
              height: 480, background: '#f5f5f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              {images.length > 0 ? (
                <img 
                  src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${images[currentImage]}`} 
                  alt={ad.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              ) : (
                <div style={{ fontSize: 140 }}>{ad.category?.icon || '📦'}</div>
              )}
              
              {ad.isTopAd && (
                <div style={{ position: 'absolute', top: 16, left: 16, background: '#FF6B35', color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 6, letterSpacing: 1, zIndex: 10 }}>TOP AD</div>
              )}

              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage(i => (i - 1 + images.length) % images.length)} style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 44, height: 44,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 10
                  }}>
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={() => setCurrentImage(i => (i + 1) % images.length)} style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 44, height: 44,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 10
                  }}>
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 10, padding: 16, borderTop: '1px solid #f0f0f0', overflowX: 'auto' }}>
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setCurrentImage(i)} style={{
                    width: 72, height: 72, flexShrink: 0, border: currentImage === i ? '2.5px solid #FF6B35' : '1px solid #e0e0e0',
                    borderRadius: 10, background: '#fff', cursor: 'pointer', overflow: 'hidden', padding: 0
                  }}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${img}`} alt={`Thumb ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ad Details */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e8e8e8', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{ad.category?.name}</p>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#222', lineHeight: 1.3, marginBottom: 12 }}>{ad.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <p style={{ fontSize: 32, fontWeight: 900, color: '#1aab50' }}>{formatPrice(ad.price)}</p>
                  {ad.negotiable && <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>Negotiable</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setSaved(!saved)} style={{
                  width: 48, height: 48, borderRadius: '50%', border: '1px solid #e0e0e0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}>
                  <Heart size={22} style={{ color: saved ? '#ef4444' : '#999', fill: saved ? '#ef4444' : 'none' }} />
                </button>
                <button style={{
                  width: 48, height: 48, borderRadius: '50%', border: '1px solid #e0e0e0',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Share2 size={22} style={{ color: '#666' }} />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20, padding: '24px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}>
              {[
                { label: 'Location', value: ad.area || ad.location, icon: <MapPin size={16} /> },
                { label: 'Condition', value: ad.condition || 'Used', icon: <CheckCircle size={16} />, capitalize: true },
                { label: 'Ad Type', value: ad.adType || 'Sale', icon: <Star size={16} />, capitalize: true },
                { label: 'Views', value: `${ad.viewCount || 0}`, icon: <Eye size={16} /> },
                { label: 'Posted', value: new Date(ad.createdAt).toLocaleDateString('en-BD'), icon: <Clock size={16} /> },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#555' }}>
                  <span style={{ color: '#FF6B35', background: '#fff5f0', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                  <div>
                    <p style={{ color: '#999', fontSize: 11, marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontWeight: 700, color: '#333', textTransform: item.capitalize ? 'capitalize' : 'none' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Description</h2>
            <div style={{ fontSize: 15, color: '#444', lineHeight: 1.8, whiteSpace: 'pre-line', background: '#fcfcfc', padding: 24, borderRadius: 12, border: '1px solid #f5f5f5' }}>
              {ad.description}
            </div>
          </div>

          {/* Similar Ads */}
          {similarAds.length > 0 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Similar Ads You May Like</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {similarAds.map(sim => (
                  <Link key={sim.id} href={`/classified/ad/${sim.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e8e8', transition: 'all 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                    >
                      <div style={{ height: 120, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, overflow: 'hidden' }}>
                        {sim.coverImage ? (
                          <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${sim.coverImage}`} alt={sim.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>{sim.category?.icon || '📦'}</span>
                        )}
                      </div>
                      <div style={{ padding: 12 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#222', marginBottom: 6, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{sim.title}</p>
                        <p style={{ fontSize: 15, fontWeight: 900, color: '#1aab50' }}>{formatPrice(sim.price)}</p>
                        <p style={{ fontSize: 11, color: '#999', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} /> {sim.area || sim.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Seller Card + Actions */}
        <div>
          {/* Contact Actions */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e8e8e8', marginBottom: 20, position: 'sticky', top: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {phoneRevealed ? (
              <div style={{ textAlign: 'center', marginBottom: 16, background: '#f0fdf4', padding: 16, borderRadius: 12, border: '1px solid #dcfce7' }}>
                <p style={{ fontSize: 12, color: '#166534', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Verified Phone Number</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#15803d', letterSpacing: 1.5 }}>{ad.contactPhone || '+880 1xxx-xxxxxx'}</p>
              </div>
            ) : (
              <button onClick={() => setPhoneRevealed(true)} style={{
                width: '100%', background: '#1aab50', color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px', fontWeight: 800, fontSize: 16,
                cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 4px 14px rgba(26, 171, 80, 0.3)'
              }}>
                <Phone size={20} /> Show Phone Number
              </button>
            )}

            {ad.whatsappNumber && (
               <a 
                href={`https://wa.me/${ad.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '100%', background: '#25D366', color: '#fff',
                  border: 'none', borderRadius: 12, padding: '16px', fontWeight: 800, fontSize: 16,
                  cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  textDecoration: 'none', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)', boxSizing: 'border-box'
                }}>
                💬 WhatsApp Seller
              </a>
            )}

            <Link href={`/classified/chat/${ad.id}`} style={{
              width: '100%', background: '#fff', color: '#2563eb',
              border: '1.5px solid #2563eb', borderRadius: 12, padding: '15px', fontWeight: 800, fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              textDecoration: 'none', boxSizing: 'border-box'
            }}>
              <MessageSquare size={20} /> Chat with Seller
            </Link>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={() => setSaved(!saved)} style={{
                flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #e0e0e0',
                background: saved ? '#fff1f2' : '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: saved ? '#e11d48' : '#555', transition: 'all 0.2s'
              }}>
                <Heart size={18} style={{ fill: saved ? '#e11d48' : 'none', color: saved ? '#e11d48' : '#555' }} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button style={{
                flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #e0e0e0',
                background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: '#555'
              }}>
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>

          {/* Seller Card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e8e8e8', marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#888', marginBottom: 20, letterSpacing: 1, textTransform: 'uppercase' }}>Seller Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #F7931E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 24, boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                {ad.user?.name?.[0] || 'U'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontWeight: 800, color: '#222', fontSize: 18 }}>{ad.user?.name || 'Amana User'}</p>
                </div>
                {ad.user?.isVerified && (
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle size={10} /> Verified Seller
                  </span>
                )}
                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Member since {new Date(ad.user?.createdAt || Date.now()).getFullYear()}</p>
              </div>
            </div>
            
            <Link href={`/classified/seller/${ad.userId}`} style={{
              display: 'block', textAlign: 'center', padding: '12px',
              border: '2px solid #FF6B35', borderRadius: 12, color: '#FF6B35',
              fontWeight: 800, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF6B35'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B35'; }}
            >View Seller Profile</Link>
          </div>

          {/* Ad Protection Info */}
          <div style={{ background: '#eff6ff', borderRadius: 16, padding: 20, border: '1px solid #dbeafe', marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#1e40af', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} /> Amana Purchase Protection
            </h4>
            <p style={{ fontSize: 12, color: '#1e40af', lineHeight: 1.6 }}>
              Amana Marketplace verifies major sellers to ensure a safer experience. Always report suspicious activity to help keep the community safe.
            </p>
          </div>

          {/* Ad ID & Safety */}
          <div style={{ textAlign: 'center' }}>
             <button onClick={() => setReportOpen(true)} style={{ color: '#dc2626', background: 'none', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto 16px' }}>
              <Flag size={14} /> Report this ad
            </button>
            <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 16, fontSize: 12, color: '#999' }}>
              <p>Ad ID: CLF-{ad.id?.substring(0, 8)}</p>
              <p style={{ marginTop: 4 }}>Posted on {new Date(ad.createdAt).toLocaleDateString('en-BD')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: 440, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20, color: '#222' }}>Report This Ad</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>Please tell us why you are reporting this ad. We'll review it immediately.</p>
            <select value={reportReason} onChange={e => setReportReason(e.target.value)} style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: 12, fontSize: 15, marginBottom: 12, outline: 'none' }}>
              <option value="">Select a reason...</option>
              <option>Fraud / Scam</option>
              <option>Wrong Category</option>
              <option>Offensive Content / Language</option>
              <option>Duplicate Ad</option>
              <option>Fake Price</option>
              <option>Item Already Sold</option>
              <option>Prohibited Item</option>
              <option>Misleading Information</option>
            </select>
            <textarea placeholder="Additional details (optional)" rows={3} style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: 12, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setReportOpen(false)} style={{ flex: 1, padding: '14px', border: '1px solid #e0e0e0', borderRadius: 12, background: '#fff', color: '#666', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Cancel</button>
              <button onClick={() => { alert('Report submitted. Thank you.'); setReportOpen(false); }} style={{ flex: 1, padding: '14px', background: '#dc2626', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 15, boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)' }}>Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
