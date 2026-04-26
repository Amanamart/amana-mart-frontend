'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Zap, ArrowRight, Clock, Store } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

// ── Module Cards ──────────────────────────────────────────
const modules = [
  { id: 'grocery', label: 'Grocery', icon: '🛒', color: '#1aab50', bg: '#e8f9ee', href: '/store/category/grocery' },
  { id: 'pharmacy', label: 'Pharmacy', icon: '💊', color: '#ef4444', bg: '#fee2e2', href: '/store/category/pharmacy' },
  { id: 'food', label: 'Food', icon: '🍕', color: '#f59e0b', bg: '#fef3c7', href: '/store/category/food' },
  { id: 'electronics', label: 'Electronics', icon: '📱', color: '#3b82f6', bg: '#dbeafe', href: '/store/category/electronics' },
  { id: 'fashion', label: 'Fashion', icon: '👗', color: '#8b5cf6', bg: '#ede9fe', href: '/store/category/fashion' },
  { id: 'home', label: 'Home & Living', icon: '🏠', color: '#0891b2', bg: '#cffafe', href: '/store/category/home' },
  { id: 'parcel', label: 'Parcel', icon: '📦', color: '#f97316', bg: '#ffedd5', href: '/store/category/parcel' },
  { id: 'beauty', label: 'Beauty', icon: '💄', color: '#ec4899', bg: '#fce7f3', href: '/store/category/beauty' },
];

// ── Hero Banners ──────────────────────────────────────────
const banners = [
  {
    id: 1,
    title: 'Eid Mubarak Special',
    subtitle: 'Up to 70% off on all categories',
    cta: 'Shop Now',
    gradient: 'from-emerald-600 via-teal-500 to-green-400',
    badge: '🌙 Eid Sale',
    href: '/store/category/grocery',
  },
  {
    id: 2,
    title: 'Fresh Groceries',
    subtitle: 'Delivered in 30 minutes · Free above ৳500',
    cta: 'Order Now',
    gradient: 'from-green-600 to-emerald-400',
    badge: '🛒 Fresh & Fast',
    href: '/store/category/grocery',
  },
  {
    id: 3,
    title: 'Tech at Your Doorstep',
    subtitle: 'Latest electronics with warranty & free delivery',
    cta: 'Explore Deals',
    gradient: 'from-blue-700 to-indigo-500',
    badge: '📱 Tech Deals',
    href: '/store/category/electronics',
  },
];

// ── Categories ──────────────────────────────────────────
const categories = [
  { label: 'Rice & Grains', icon: '🌾', count: 234 },
  { label: 'Fresh Vegetables', icon: '🥦', count: 189 },
  { label: 'Dairy & Eggs', icon: '🥚', count: 87 },
  { label: 'Fish & Seafood', icon: '🐟', count: 143 },
  { label: 'Meat & Chicken', icon: '🍗', count: 98 },
  { label: 'Fruits', icon: '🍎', count: 156 },
  { label: 'Beverages', icon: '🥤', count: 210 },
  { label: 'Snacks', icon: '🍿', count: 178 },
  { label: 'Medicines', icon: '💊', count: 543 },
  { label: 'Mobile Phones', icon: '📱', count: 89 },
  { label: 'Clothing', icon: '👔', count: 312 },
  { label: 'Home Decor', icon: '🏡', count: 167 },
];

// ── Products ──────────────────────────────────────────
const featuredProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: [
    'Organic Basmati Rice 5kg', 'Fresh Hilsa Fish 1kg', 'Samsung Galaxy A54', 'Vitamin C 1000mg',
    'Cotton Kurti Set', 'Fresh Milk 1L', 'Wireless Earbuds Pro', 'Fresh Vegetables Basket',
    'LED Smart TV 43"', 'Paracetamol 500mg', 'Mango Pickle 500g', 'Running Shoes Pro',
  ][i],
  price: [480, 1200, 32000, 450, 2200, 95, 3500, 350, 28000, 80, 180, 4500][i],
  originalPrice: [600, 1500, 38000, 580, 2800, 110, 4200, 420, 34000, 100, 220, 5500][i],
  rating: [4.8, 4.9, 4.6, 4.7, 4.5, 4.9, 4.4, 4.8, 4.6, 4.9, 4.3, 4.7][i],
  reviews: [234, 89, 312, 567, 143, 891, 78, 234, 156, 1234, 89, 201][i],
  store: ['Amana Grocery', 'Fresh Fish Market', 'BD Electronics', 'City Pharmacy', 'Fashion Hub', 'Dairy Fresh', 'Tech World', 'Green Basket', 'BD Electronics', 'City Pharmacy', 'Amana Grocery', 'Sports Zone'][i],
  badge: ['Organic', 'Fresh Today', 'Bestseller', null, 'New', null, 'Hot', null, null, 'OTC', null, 'New'][i] as string | null,
  emoji: ['🌾', '🐟', '📱', '💊', '👗', '🥛', '🎧', '🥦', '📺', '💊', '🫙', '👟'][i],
}));

const flashSaleProducts = featuredProducts.slice(0, 6).map((p) => ({
  ...p,
  flashPrice: Math.round(p.price * 0.7),
  flashDiscount: 30,
  timeLeft: `${2 + (p.id.charCodeAt(5) % 4)}h ${Math.floor(Math.random() * 60)}m`,
}));

// ── Stores ──────────────────────────────────────────
const topStores = [
  { name: 'Dhaka Fresh Market', category: 'Grocery', rating: 4.9, orders: 3420, deliveryTime: '25-35 min', emoji: '🛒', color: '#1aab50' },
  { name: 'BD Electronics', category: 'Electronics', rating: 4.7, orders: 2180, deliveryTime: '1-2 days', emoji: '📱', color: '#3b82f6' },
  { name: 'City Pharmacy', category: 'Pharmacy', rating: 4.9, orders: 1890, deliveryTime: '20-30 min', emoji: '💊', color: '#ef4444' },
  { name: 'Fashion Hub BD', category: 'Fashion', rating: 4.6, orders: 1560, deliveryTime: '2-3 days', emoji: '👗', color: '#8b5cf6' },
  { name: 'Green Basket', category: 'Grocery', rating: 4.8, orders: 1340, deliveryTime: '30-45 min', emoji: '🥦', color: '#22c55e' },
  { name: 'Tech World BD', category: 'Electronics', rating: 4.5, orders: 980, deliveryTime: '1-2 days', emoji: '💻', color: '#0891b2' },
];

// ── ProductCard ──────────────────────────────────────────
function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden group cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative bg-[var(--muted)] h-40 flex items-center justify-center text-5xl">
        {product.emoji}
        {product.badge && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary)] text-white">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
            -{discount}%
          </span>
        )}
        <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--foreground)] opacity-0 group-hover:opacity-100 hover:bg-[var(--primary)] hover:text-white transition-all">
          <ShoppingCart className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-[12px] text-[var(--muted-foreground)] mb-0.5 truncate">{product.store}</p>
        <h3 className="text-[13px] font-medium text-[var(--foreground)] leading-tight mb-1 truncate-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-medium">{product.rating}</span>
          <span className="text-[11px] text-[var(--muted-foreground)]">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-[var(--foreground)]">{formatCurrency(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-[12px] text-[var(--muted-foreground)] line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Banner Slider ──────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-[var(--radius-xl)] overflow-hidden h-64 md:h-80">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            `absolute inset-0 bg-gradient-to-r ${banner.gradient} flex items-center transition-opacity duration-500`,
            i === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="px-8 md:px-12 py-8 max-w-lg">
            <span className="inline-block text-[12px] font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-3">
              {banner.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{banner.title}</h2>
            <p className="text-[14px] text-white/80 mb-5">{banner.subtitle}</p>
            <Link
              href={banner.href}
              className="inline-flex items-center gap-2 bg-white text-[var(--foreground)] font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              {banner.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
      {/* Controls */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Flash Sale Timer ──────────────────────────────────────
function FlashSaleTimer() {
  const [time, setTime] = useState({ h: 5, m: 32, s: 47 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { h: t.h, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {[String(time.h).padStart(2, '0'), String(time.m).padStart(2, '0'), String(time.s).padStart(2, '0')].map((v, i) => (
        <React.Fragment key={i}>
          <div className="w-10 h-10 bg-[var(--foreground)] text-white rounded-[var(--radius)] flex items-center justify-center text-[14px] font-bold">
            {v}
          </div>
          {i < 2 && <span className="text-[var(--foreground)] font-bold">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────
export function StorefrontHome() {
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <HeroBanner />
          </div>
          {/* Mini Promo Banners */}
          <div className="flex flex-row lg:flex-col gap-3">
            {[
              { gradient: 'from-amber-500 to-orange-400', emoji: '🚚', title: 'Free Delivery', sub: 'Orders over ৳500' },
              { gradient: 'from-purple-600 to-pink-500', emoji: '⚡', title: 'Flash Deals', sub: 'Every day at 12pm' },
              { gradient: 'from-blue-600 to-cyan-400', emoji: '🔒', title: 'Secure Pay', sub: 'bKash, Nagad & more' },
            ].map((p, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${p.gradient} rounded-[var(--radius-lg)] p-4 text-white flex items-center gap-3 flex-1 cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="text-[13px] font-bold">{p.title}</p>
                  <p className="text-[11px] opacity-80">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules / Services */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[var(--foreground)]">Shop by Module</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-[var(--radius-lg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all duration-200 group"
              >
                <div
                  className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: mod.bg }}
                >
                  {mod.icon}
                </div>
                <span className="text-[11px] font-semibold text-[var(--foreground)] text-center leading-tight">{mod.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="text-[18px] font-bold text-[var(--foreground)]">Flash Sale</h2>
              </div>
              <FlashSaleTimer />
            </div>
            <Link href="/store/flash-sale" className="text-[13px] font-medium text-[var(--primary)] hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {flashSaleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[var(--radius-lg)] border border-red-100 overflow-hidden cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="relative bg-red-50 h-32 flex items-center justify-center text-4xl">
                  {product.emoji}
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                    -{product.flashDiscount}%
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-medium text-[var(--foreground)] leading-tight truncate mb-1">{product.name}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[13px] font-bold text-red-500">{formatCurrency(product.flashPrice)}</span>
                    <span className="text-[11px] text-[var(--muted-foreground)] line-through">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 text-[11px] text-amber-500">
                    <Clock className="w-3 h-3" />
                    <span>{product.timeLeft} left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[var(--foreground)]">Popular Categories</h2>
            <Link href="/store/categories" className="text-[13px] font-medium text-[var(--primary)] hover:underline flex items-center gap-1">
              All categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/store/category/${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-3 flex flex-col items-center gap-2 hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)] transition-all duration-200 group"
              >
                <span className="text-3xl transition-transform duration-200 group-hover:scale-110">{cat.icon}</span>
                <p className="text-[11px] font-semibold text-[var(--foreground)] text-center leading-tight">{cat.label}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[var(--foreground)]">Featured Products</h2>
            <Link href="/store/search" className="text-[13px] font-medium text-[var(--primary)] hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredProducts.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="bg-gradient-to-r from-[var(--secondary)] to-[#008080] rounded-[var(--radius-xl)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <p className="text-[12px] font-semibold opacity-75 mb-1">🎁 SPECIAL OFFER</p>
            <h2 className="text-2xl font-bold mb-2">Get 25% Off Your First Order!</h2>
            <p className="text-[14px] opacity-80 mb-4">Use code <strong className="font-mono bg-white/20 px-2 py-0.5 rounded">WELCOME25</strong> at checkout</p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 bg-white text-[var(--secondary)] font-bold px-6 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              Claim Offer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-8xl">🎉</div>
        </section>

        {/* Top Stores */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[var(--foreground)]">Popular Stores</h2>
            <Link href="/store/stores" className="text-[13px] font-medium text-[var(--primary)] hover:underline flex items-center gap-1">
              All stores <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStores.map((store, i) => (
              <div
                key={i}
                className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-4 flex items-center gap-4 cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center text-3xl shrink-0"
                  style={{ backgroundColor: `${store.color}15` }}
                >
                  {store.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[var(--foreground)] truncate">{store.name}</p>
                  <p className="text-[12px] text-[var(--muted-foreground)] mb-2">{store.category}</p>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      <Star className="w-3 h-3 fill-amber-400" /> {store.rating}
                    </span>
                    <span className="text-[var(--muted-foreground)]">
                      <Store className="w-3 h-3 inline mr-0.5" /> {store.orders.toLocaleString()} orders
                    </span>
                    <span className="flex items-center gap-0.5 text-green-600 font-medium">
                      <Clock className="w-3 h-3" /> {store.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Fast Delivery', desc: '30-min grocery delivery' },
            { icon: '🔒', title: 'Secure Payment', desc: 'bKash, Nagad, Card & more' },
            { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free returns' },
            { icon: '📞', title: '24/7 Support', desc: 'Always here to help' },
          ].map((b, i) => (
            <div key={i} className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-4 flex items-center gap-3">
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <p className="text-[13px] font-semibold text-[var(--foreground)]">{b.title}</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">{b.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
