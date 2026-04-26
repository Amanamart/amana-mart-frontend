'use client';

import React, { useState, useEffect } from 'react';
import { classifiedService } from '@/services/api/classified';
import { useTranslation } from '@/context/LanguageContext';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Award, 
  Shield, 
  Zap, 
  ChevronRight, 
  Heart, 
  Eye, 
  Loader2,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function formatPrice(p: number) {
  if (p >= 100000) return `৳${(p / 100000).toFixed(p % 100000 === 0 ? 0 : 1)}L`;
  if (p >= 1000) return `৳${(p / 100).toFixed(0)}K`;
  return `৳${p.toLocaleString()}`;
}

function AdCard({ ad }: { ad: any }) {
  const [saved, setSaved] = useState(false);
  const { t } = useTranslation();

  const badgeConfig: Record<string, { label: string; className: string }> = {
    top: { label: 'TOP AD', className: 'bg-blue-600' },
    featured: { label: 'FEATURED', className: 'bg-purple-600' },
    urgent: { label: 'URGENT', className: 'bg-red-600' },
  };
  
  const badge = ad.isTopAd ? badgeConfig.top : ad.isFeatured ? badgeConfig.featured : ad.isUrgent ? badgeConfig.urgent : null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 group relative">
      {badge && (
        <div className={cn("absolute top-3 left-3 z-10 text-[10px] font-black text-white px-2 py-1 rounded-lg tracking-wider shadow-lg", badge.className)}>
          {badge.label}
        </div>
      )}
      
      <button
        onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
        className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        title={saved ? "Unsave Ad" : "Save Ad"}
      >
        <Heart size={18} className={cn(saved ? "text-red-500 fill-red-500" : "text-gray-400")} />
      </button>

      <Link href={`/classified/ad/${ad.slug}`} className="block">
        <div className="aspect-video bg-gray-50 flex items-center justify-center overflow-hidden">
          {ad.coverImage ? (
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${ad.coverImage}`} 
              alt={ad.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          ) : (
            <div className="text-6xl grayscale opacity-50">{ad.category?.icon || '📦'}</div>
          )}
        </div>

        <div className="p-5">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{ad.category?.name}</p>
          <h3 className="text-base font-black text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
            {ad.title}
          </h3>
          <p className="text-xl font-black text-green-600 mb-4">
            {formatPrice(ad.price)}
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
              <MapPin size={14} className="text-primary" />
              <span className="truncate max-w-[100px]">{ad.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
              <Eye size={14} />
              <span>{ad.viewCount || 0}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className={cn(
              "text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter",
              ad.condition === 'new' ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
            )}>
              {ad.condition === 'new' ? 'New' : 'Used'}
            </span>
            {ad.seller?.isVerified && (
              <span className="text-[10px] font-black px-2 py-1 bg-blue-50 text-blue-700 rounded-lg uppercase tracking-tighter">
                ✓ Verified
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ClassifiedHomePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [featuredAds, setFeaturedAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, locs, ads] = await Promise.all([
          classifiedService.getCategories(),
          classifiedService.getLocations(),
          classifiedService.getAds({ promoted: 'true', limit: 6 })
        ]);
        if (cats) setCategories(cats);
        if (locs) setLocations(locs);
        if (ads) setFeaturedAds(ads.ads || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
            {t('buy_sell_anything')}
          </h1>
          <p className="text-lg text-white/80 mb-12 font-medium">
            Bangladesh&apos;s most trusted marketplace for verified local ads.
          </p>

          <div className="bg-white p-2 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex items-center px-6 gap-3 border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0">
              <MapPin size={20} className="text-primary" />
              <select className="bg-transparent border-none outline-none text-sm font-black text-gray-900 py-4 cursor-pointer">
                <option>All Bangladesh</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-center px-4">
              <Search size={20} className="text-gray-300 ml-2" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none outline-none px-4 py-4 text-gray-900 font-bold placeholder:text-gray-300"
              />
            </div>
            <Link 
              href={`/classified/ads${searchQuery ? `?search=${searchQuery}` : ''}`}
              className="bg-primary text-white px-10 py-4 rounded-[24px] font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-xl shadow-primary/20"
            >
              {t('search_button')}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <TrendingUp size={22} />, label: 'Active Ads', value: '500K+', color: 'text-primary bg-primary/5' },
            { icon: <Award size={22} />, label: 'Verified Sellers', value: '12K+', color: 'text-purple-600 bg-purple-50' },
            { icon: <Shield size={22} />, label: 'Safe Deals', value: '1M+', color: 'text-green-600 bg-green-50' },
            { icon: <Zap size={22} />, label: 'Post Fast', value: '2 Min', color: 'text-amber-500 bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center gap-5 transition-all hover:shadow-2xl">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.color)}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center">
            <Loader2 className="animate-spin text-primary mb-6" size={48} />
            <p className="text-gray-400 font-black uppercase tracking-widest">Loading Marketplace...</p>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Categories */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">Browse Categories</h2>
                <Link href="/classified/ads" className="text-primary font-black text-sm flex items-center gap-1 group">
                  View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {categories.map(cat => (
                  <Link key={cat.id} href={`/classified/category/${cat.slug}`} className="bg-white p-8 rounded-[32px] border border-gray-50 text-center transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/5 group">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{cat.icon || '📦'}</div>
                    <p className="font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">{cat.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{cat.adCount?.toLocaleString() || 0} ADS</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Ads */}
            {featuredAds.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">Featured Ads</h2>
                  <Link href="/classified/ads?promoted=true" className="text-primary font-black text-sm flex items-center gap-1 group">
                    Explore More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredAds.map(ad => <AdCard key={ad.id} ad={ad} />)}
                </div>
              </section>
            )}

            {/* Safety Tips */}
            <section className="bg-amber-50 rounded-[48px] p-10 md:p-16 border border-amber-100">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-amber-500/20">
                    <Shield size={14} /> Trust & Safety
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-none">Safe Trading in Bangladesh</h2>
                  <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                    At AmanaMart Classified, safety is our top priority. Follow these simple rules for a secure trading experience.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { icon: '🤝', title: 'Meet in Public', desc: 'Always choose a safe, public place for meeting.' },
                      { icon: '🔍', title: 'Verify Item', desc: 'Inspect the item thoroughly before paying.' },
                      { icon: '💰', title: 'No Advance Pay', desc: 'Avoid paying anything before seeing the product.' },
                      { icon: '🚨', title: 'Report Fraud', desc: 'suspicious ads? Report immediately to us.' },
                    ].map((tip, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-3xl grayscale group-hover:grayscale-0">{tip.icon}</span>
                        <div>
                          <h4 className="font-black text-gray-900 mb-1">{tip.title}</h4>
                          <p className="text-xs font-medium text-gray-500 leading-relaxed">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-white rounded-[40px] shadow-2xl flex items-center justify-center text-[120px] shadow-amber-500/5 border border-amber-100">
                  🛡️
                </div>
              </div>
            </section>

            {/* Post Ad CTA */}
            <section className="text-center pb-24">
              <div className="bg-gray-900 rounded-[56px] p-12 md:p-24 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">Ready to Sell <br/>Something?</h2>
                  <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
                    Reach millions of potential buyers in Bangladesh. Your first ad is completely free.
                  </p>
                  <Link 
                    href="/classified/post-ad" 
                    className="bg-primary text-white px-12 py-6 rounded-[32px] font-black text-lg inline-flex items-center gap-3 shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Plus size={24} /> {t('post_ad_free')}
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
