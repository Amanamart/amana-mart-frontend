'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Eye, Heart, Filter, Grid, List, ChevronDown, Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { classifiedService } from '@/services/api/classified';

function timeAgo(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 84000) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatPrice(p: number) {
  if (p === 0) return 'Negotiable';
  if (p >= 100000) return `৳${(p / 100000).toFixed(1)}L`;
  if (p >= 1000) return `৳${(p / 1000).toFixed(0)}K`;
  return `৳${p.toLocaleString()}`;
}

import { Suspense } from 'react';

function AdsListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [ads, setAds] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Filters from URL
  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const locationSlug = searchParams.get('location') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const condition = searchParams.get('condition') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchFilters = async () => {
      const [cats, locs] = await Promise.all([
        classifiedService.getCategories(),
        classifiedService.getLocations()
      ]);
      setCategories(cats || []);
      setLocations(locs || []);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const res = await classifiedService.getAds({
          search, categorySlug, locationSlug, minPrice, maxPrice, condition, sort, page, limit: 24
        });
        setAds(res.ads || []);
        setTotal(res.total || 0);
      } catch (err) {
        console.error('Failed to fetch ads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [search, categorySlug, locationSlug, minPrice, maxPrice, condition, sort, page]);

  const updateFilters = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v === null || v === '') params.delete(k);
      else params.set(k, v);
    });
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

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
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e8e8e8', position: 'sticky', top: 100 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SlidersHorizontal size={18} style={{ color: '#FF6B35' }} /> Filters
          </h3>

          {/* Category */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Category</p>
            <select 
              value={categorySlug} 
              onChange={e => updateFilters({ category: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Location</p>
            <select 
              value={locationSlug} 
              onChange={e => updateFilters({ location: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
            >
              <option value="">All Bangladesh</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.slug}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Price Range (৳)</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                placeholder="Min" 
                defaultValue={minPrice}
                onBlur={e => updateFilters({ minPrice: e.target.value })}
                style={{ width: '50%', padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }} 
              />
              <input 
                placeholder="Max" 
                defaultValue={maxPrice}
                onBlur={e => updateFilters({ maxPrice: e.target.value })}
                style={{ width: '50%', padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }} 
              />
            </div>
          </div>

          {/* Condition */}
          <div style={{ marginBottom: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: '#333' }}>Condition</p>
            {['new', 'used', 'reconditioned'].map(c => (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, color: '#555', textTransform: 'capitalize' }}>
                <input 
                  type="checkbox" 
                  checked={condition === c} 
                  onChange={() => updateFilters({ condition: condition === c ? null : c })}
                  style={{ accentColor: '#FF6B35' }} 
                /> {c}
              </label>
            ))}
          </div>

          <button 
            onClick={() => updateFilters({ category: null, location: null, minPrice: null, maxPrice: null, condition: null, search: null })}
            style={{
              width: '100%', marginTop: 8, background: 'transparent', color: '#888',
              padding: '10px', borderRadius: 10, border: '1px solid #e0e0e0',
              fontSize: 13, cursor: 'pointer',
            }}
          >Reset All</button>
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
            Showing <strong>{total}</strong> ads {search && <>for "<strong>{search}</strong>"</>}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#888' }}>Sort:</span>
              <select value={sort} onChange={e => updateFilters({ sort: e.target.value })} style={{ padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}>
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

        {loading ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <Loader2 className="animate-spin mx-auto mb-4 text-[#FF6B35]" size={40} />
            <p style={{ color: '#888' }}>Finding matches...</p>
          </div>
        ) : (
          <>
            {/* Ads Grid/List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr',
              gap: 16,
            }}>
              {ads.map(ad => (
                view === 'grid' ? (
                  <div key={ad.id} style={{
                    background: '#fff', borderRadius: 12, overflow: 'hidden',
                    border: ad.isPromoted ? '1.5px solid #FF6B35' : '1px solid #e8e8e8',
                    transition: 'all 0.2s', cursor: 'pointer', position: 'relative',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                  >
                    {ad.isPromoted && <div style={{ position: 'absolute', top: 8, left: 8, background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, letterSpacing: 0.5, zIndex: 2 }}>TOP AD</div>}
                    <button onClick={e => { e.preventDefault(); toggleSave(ad.id); }} style={{
                      position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)',
                      border: 'none', borderRadius: '50%', width: 30, height: 30,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2
                    }}>
                      <Heart size={14} style={{ color: savedIds.has(ad.id) ? '#ef4444' : '#999', fill: savedIds.has(ad.id) ? '#ef4444' : 'none' }} />
                    </button>
                    <Link href={`/classified/ad/${ad.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ height: 160, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, overflow: 'hidden' }}>
                        {ad.coverImage ? (
                          <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${ad.coverImage}`} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>{ad.category?.icon || '📦'}</span>
                        )}
                      </div>
                      <div style={{ padding: 12 }}>
                        <p style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{ad.category?.name}</p>
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 6, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{ad.title}</h3>
                        <p style={{ fontSize: 16, fontWeight: 800, color: '#1aab50', marginBottom: 8 }}>{formatPrice(ad.price)}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}><MapPin size={11} /> {ad.location}</span>
                          <span>{timeAgo(ad.createdAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div key={ad.id} style={{
                    background: '#fff', borderRadius: 12, overflow: 'hidden',
                    border: ad.isPromoted ? '1.5px solid #FF6B35' : '1px solid #e8e8e8',
                    display: 'flex', gap: 16, padding: 16, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  >
                    <Link href={`/classified/ad/${ad.slug}`} style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 140, height: 100, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0, overflow: 'hidden' }}>
                        {ad.coverImage ? (
                          <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${ad.coverImage}`} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>{ad.category?.icon || '📦'}</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div>
                            {ad.isPromoted && <span style={{ background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, marginRight: 6 }}>TOP AD</span>}
                            <p style={{ fontSize: 11, color: '#888', marginTop: ad.isPromoted ? 6 : 0 }}>{ad.category?.name}</p>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222', marginTop: 4 }}>{ad.title}</h3>
                          </div>
                          <p style={{ fontSize: 18, fontWeight: 800, color: '#1aab50', flexShrink: 0 }}>{formatPrice(ad.price)}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: 12, color: '#888' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {ad.location}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={12} /> {ad.viewCount || 0} views</span>
                          <span>{timeAgo(ad.createdAt)}</span>
                          {ad.seller?.isVerified && <span style={{ color: '#2563eb', fontWeight: 600 }}>✓ Verified Seller</span>}
                        </div>
                      </div>
                    </Link>
                    <button onClick={() => toggleSave(ad.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
                      <Heart size={18} style={{ color: savedIds.has(ad.id) ? '#ef4444' : '#ccc', fill: savedIds.has(ad.id) ? '#ef4444' : 'none' }} />
                    </button>
                  </div>
                )
              ))}
            </div>

            {/* Pagination */}
            {total > 24 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                {Array.from({ length: Math.ceil(total / 24) }, (_, i) => i + 1).map(p => (
                  <button 
                    key={p} 
                    onClick={() => updateFilters({ page: p.toString() })}
                    style={{
                      padding: '8px 16px', borderRadius: 8,
                      border: p === page ? 'none' : '1px solid #e0e0e0',
                      background: p === page ? '#FF6B35' : '#fff',
                      color: p === page ? '#fff' : '#555',
                      fontWeight: p === page ? 700 : 400,
                      cursor: 'pointer', fontSize: 14,
                    }}
                  >{p}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AdsListingPage() {
  return (
    <Suspense fallback={<div>Loading ads...</div>}>
      <AdsListingContent />
    </Suspense>
  );
}
