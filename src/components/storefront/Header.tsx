'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import {
//   Globe as Search, Globe as ShoppingCart, Globe as MapPin, Globe as ChevronDown, Globe as Menu, Globe as X, Globe as Phone, Globe as User, Globe as Heart, Globe as LayoutGrid, Globe as Camera, Globe as Loader2, Globe as ImageIcon
// } from 'lucide-react';
import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Phone,
  User,
  Heart,
  LayoutGrid,
  Camera,
  Loader2,
  ImageIcon
} from 'lucide-react';
import { useModule, ModuleType } from '@/context/ModuleContext';
import { MODULES } from '@/constants/modules';
import { ModuleSwitcher } from '../layout/ModuleSwitcher';
import { searchService } from '@/services/api/search';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const MODULE_CATEGORIES: Record<ModuleType, string[]> = {
  grocery: ['Fruits', 'Vegetables', 'Rice & Grains', 'Oil', 'Meat', 'Fish', 'Dairy', 'Snacks', 'Beverages'],
  pharmacy: ['Fever', 'Pain Relief', 'Diabetes', 'Heart Care', 'Vitamins', 'Baby Care', 'First Aid'],
  food: ['Burger', 'Pizza', 'Biryani', 'Fast Food', 'Chinese', 'Indian', 'Local Food'],
  shop: ['Electronics', 'Fashion', 'Beauty', 'Home', 'Kitchen', 'Books', 'Toys'],
  parcel: ['Send Parcel', 'Track Parcel', 'Pricing', 'Business'],
  ride: ['Book Ride', 'History', 'Rental Cars', 'Rental Bikes', 'Fleet'],
  service: ['Plumbing', 'Electrical', 'Cleaning', 'AC Repair', 'Appliances', 'Beauty'],
  classified: ['Mobiles', 'Electronics', 'Vehicles', 'Property', 'Jobs', 'Home & Living']
};

export function StorefrontHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisualSearching, setIsVisualSearching] = useState(false);
  const [visualResults, setVisualResults] = useState<any>(null);
  const { activeModule } = useModule();
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const config = MODULES.find(m => m.id === activeModule) || MODULES[3];
  const categories = MODULE_CATEGORIES[activeModule];

  const handleVisualSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsVisualSearching(true);
    setVisualResults(null);
    try {
      const data = await searchService.visualSearch(file);
      setVisualResults(data);
    } catch (err) {
      console.error('Visual search failed:', err);
    } finally {
      setIsVisualSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/store/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      {/* Module Switcher Bar */}
      <div className="bg-[#1a2332] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <ModuleSwitcher />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href={config.href} className="flex items-center gap-2 shrink-0">
            <div 
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm",
                activeModule === 'grocery' ? "bg-[#1aab50]" :
                activeModule === 'pharmacy' ? "bg-[#ef4444]" :
                activeModule === 'food' ? "bg-[#f59e0b]" :
                activeModule === 'shop' ? "bg-[#3b82f6]" :
                activeModule === 'parcel' ? "bg-[#f97316]" :
                activeModule === 'ride' ? "bg-[#111827]" :
                activeModule === 'service' ? "bg-[#0891b2]" : "bg-[#FF6B35]"
              )}
            >
              {config.icon && typeof config.icon === 'string' ? config.icon : 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-[16px] font-extrabold text-[var(--foreground)] leading-tight">Amana {config.label}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] leading-tight uppercase tracking-wider font-bold">{activeModule} module</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="search"
                title="Search query"
                placeholder={`Search in ${config.label}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-12 rounded-full border border-[var(--border)] bg-[var(--muted)] text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
              >
                {isVisualSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </button>
              <input type="file" ref={fileInputRef} onChange={handleVisualSearch} accept="image/*" className="hidden" />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors relative">
              <Heart className="w-5 h-5 text-[var(--foreground)]" />
            </Link>
            <Link href="/cart" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-[var(--foreground)]" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">3</span>
            </Link>
            <Link href="/profile" className="hidden sm:flex items-center gap-2 pl-2 pr-3 h-9 rounded-full border border-[var(--border)] hover:border-[var(--primary)] transition-all bg-white">
              <User className="w-4 h-4 text-[var(--foreground)]" />
              <span className="text-[13px] font-bold text-[var(--foreground)]">Account</span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors lg:hidden"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-[var(--border)] bg-white overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 px-4 py-3 text-[13px] font-bold text-[var(--foreground)] flex items-center gap-2 border-b-2 border-transparent hover:text-[var(--primary)]">
              <LayoutGrid className="w-4 h-4" />
              All Categories
            </button>
            <div className="h-4 w-px bg-[var(--border)] mx-1 shrink-0" />
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/store/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 px-4 py-3 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors border-b-2 border-transparent hover:border-[var(--primary)] whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
