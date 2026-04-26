'use client';

import React from 'react';
import { useModule } from '@/context/ModuleContext';
import { MODULES } from '@/constants/modules';
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Clock, 
  ShoppingCart,
  Smartphone,
  Download,
  ShieldCheck,
  Truck,
  HelpCircle,
  Car,
  Package,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { dbService } from '@/services/database';

// ── Shared Components ─────────────────────────────────────

const ModuleSelector = () => {
  const { activeModule, setActiveModule } = useModule();
  
  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {MODULES.filter(m => m.id !== 'ride').map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden border-2",
                isActive 
                  ? "bg-white border-primary shadow-xl shadow-primary/10 -translate-y-1" 
                  : "bg-white border-transparent hover:border-gray-100 hover:bg-gray-50/50 hover:shadow-lg"
              )}
            >
              <div 
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                  isActive ? "bg-primary text-white scale-110 rotate-3" : "bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-primary group-hover:rotate-3"
                )}
              >
                <Icon size={28} />
              </div>
              <span className={cn(
                "text-sm font-black tracking-tight transition-colors",
                isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
              )}>
                {mod.label}
              </span>
              {isActive && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
        <button
          onClick={() => setActiveModule('ride')}
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden border-2",
            activeModule === 'ride' 
              ? "bg-white border-primary shadow-xl shadow-primary/10 -translate-y-1" 
              : "bg-gray-900 border-transparent hover:bg-black hover:shadow-xl"
          )}
        >
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
            activeModule === 'ride' ? "bg-primary text-white scale-110" : "bg-white/10 text-primary"
          )}>
            <Car size={28} />
          </div>
          <span className={cn(
            "text-sm font-black tracking-tight",
            activeModule === 'ride' ? "text-gray-900" : "text-white"
          )}>
            Express
          </span>
          <span className="text-[10px] font-bold text-primary-light/50 uppercase mt-1 tracking-widest">App Only</span>
        </button>
      </div>
    </section>
  );
};

function ProductCard({ product }: { product: any }) {
  const { activeModule } = useModule();
  const displayPrice = product?.base_price || 0;
  const displayName = product?.name || 'Loading...';
  const displayUnit = product?.unit || 'Unit';
  const storeName = product?.stores?.name || 'Local Store';

  return (
    <div className="group bg-white border border-gray-100 rounded-[32px] p-4 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col h-full">
      <div className="relative aspect-square bg-gray-50 rounded-[24px] overflow-hidden mb-5">
        {product?.images?.[0] ? (
          <img src={product.images[0]} alt={displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <ShoppingCart size={48} />
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-xl text-gray-400 hover:text-primary hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
          <Star size={18} />
        </button>
        {product?.discount_price && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-lg shadow-lg">
            SALE
          </div>
        )}
      </div>
      
      <div className="flex-1 px-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black rounded-md uppercase tracking-wider">{activeModule}</span>
          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
            <Clock size={12} /> 25-40 min
          </span>
        </div>
        <h3 className="text-base font-black text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{displayName}</h3>
        <p className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-1">
          <Zap size={12} className="text-amber-500" /> {storeName}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50 px-1">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{displayUnit}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">৳{displayPrice}</span>
          </div>
        </div>
        <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
          <ShoppingCart size={22} />
        </button>
      </div>
    </div>
  );
}

// ── Module Views ──────────────────────────────────────────

function ECommerceHome({ moduleId }: { moduleId: any }) {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [catData, prodData] = await Promise.all([
          dbService.getCategories(moduleId),
          dbService.getProducts(moduleId, 8)
        ]);
        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* 1. Category Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Browse Categories</h2>
          <Link href="/categories" className="text-primary text-sm font-bold flex items-center gap-1 group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="group p-6 bg-white border border-gray-100 rounded-3xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <LayoutGrid size={32} />
                </div>
              </div>
              <h3 className="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recommended for You</h2>
          <Link href="/products" className="text-primary text-sm font-bold flex items-center gap-1 group">
            Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

const ParcelHome = () => (
  <div className="space-y-12 animate-fade-in">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-900 rounded-[48px] p-8 md:p-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
      <div className="relative z-10">
        <span className="text-primary font-black text-xs uppercase tracking-widest mb-4 inline-block">Trusted Delivery</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Send Anything <br/>Everywhere.</h2>
        <p className="text-gray-400 text-lg mb-10 max-w-md">Fast, secure and trackable parcel delivery across Bangladesh. Starting from ৳40.</p>
        
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase">Pickup Location</label>
              <div className="bg-white/10 rounded-xl px-4 py-3 text-white text-sm">Gulshan, Dhaka</div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase">Dropoff Location</label>
              <div className="bg-white/10 rounded-xl px-4 py-3 text-white text-sm">Banani, Dhaka</div>
            </div>
          </div>
          <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40">BOOK DELIVERY NOW</button>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="aspect-square bg-primary/10 rounded-full flex items-center justify-center p-20 animate-pulse">
           <Package size={200} className="text-primary opacity-50" />
        </div>
      </div>
    </div>
  </div>
);

const ExpressHome = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <div className="w-24 h-24 bg-gray-900 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-2xl">
      <Car size={48} />
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Ride with Amana Express</h2>
    <p className="text-gray-500 text-lg mb-12 max-w-2xl">For safety and security, ride sharing is exclusively available on our mobile application. Download now for the best experience.</p>
    
    <div className="flex flex-wrap justify-center gap-6">
      <button className="flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all group">
        <Smartphone size={32} />
        <div className="text-left">
          <p className="text-[10px] font-bold opacity-60 uppercase">Get it on</p>
          <p className="text-xl font-black leading-none">Google Play</p>
        </div>
      </button>
      <button className="flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all group">
        <Download size={32} />
        <div className="text-left">
          <p className="text-[10px] font-bold opacity-60 uppercase">Download on the</p>
          <p className="text-xl font-black leading-none">App Store</p>
        </div>
      </button>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
      <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
        <ShieldCheck className="text-green-500 mb-4" size={32} />
        <h4 className="font-bold text-gray-900 mb-2">Verified Drivers</h4>
        <p className="text-xs text-gray-500">Every driver is strictly verified for your safety.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
        <Zap className="text-amber-500 mb-4" size={32} />
        <h4 className="font-bold text-gray-900 mb-2">Instant Pickup</h4>
        <p className="text-xs text-gray-500">Get a ride within minutes at your doorstep.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
        <HelpCircle className="text-blue-500 mb-4" size={32} />
        <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
        <p className="text-xs text-gray-500">Always available to help you during your ride.</p>
      </div>
    </div>
  </div>
);

// ── Root Renderer ──────────────────────────────────────────

export default function HomeViews() {
  const { activeModule } = useModule();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <ModuleSelector />
      
      {['grocery', 'pharmacy', 'food', 'shop'].includes(activeModule) && (
        <ECommerceHome moduleId={activeModule} />
      )}
      {activeModule === 'parcel' && <ParcelHome />}
      {activeModule === 'ride' && <ExpressHome />}
      {['service', 'classified'].includes(activeModule) && (
        <ECommerceHome moduleId={activeModule} />
      )}
    </main>
  );
}
