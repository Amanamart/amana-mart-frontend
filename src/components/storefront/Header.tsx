'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search, ShoppingCart, MapPin, ChevronDown, Menu, X, Phone, User, Heart, LayoutGrid
} from 'lucide-react';
import { useModule, ModuleType } from '@/context/ModuleContext';
import { ModuleSwitcher } from '../layout/ModuleSwitcher';

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
  const { activeModule, getModuleConfig } = useModule();
  
  const config = getModuleConfig();
  const categories = MODULE_CATEGORIES[activeModule];

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      {/* Module Switcher Bar */}
      <div className="bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <ModuleSwitcher />
        </div>
      </div>

      {/* Top Bar (Optional, can be merged or hidden) */}
      <div className="bg-[#f8f9fa] border-b border-[var(--border)] text-[11px] text-[var(--muted-foreground)]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-7">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +880 1700-000000</span>
            <span className="hidden sm:inline">Bangladesh's #1 Super App</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="hover:text-[var(--primary)] transition-colors">Admin Panel</Link>
            <span className="opacity-40">|</span>
            <Link href="/classified/post-ad" className="text-[var(--primary)] font-bold">Post Free Ad</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href={config.href} className="flex items-center gap-2 shrink-0">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{ backgroundColor: config.color }}
            >
              {config.icon}
            </div>
            <div className="hidden sm:block">
              <p className="text-[16px] font-extrabold text-[var(--foreground)] leading-tight">Amana {config.label}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] leading-tight uppercase tracking-wider font-bold">{activeModule} module</p>
            </div>
          </Link>

          {/* Location */}
          <button className="hidden lg:flex items-center gap-1.5 px-3 py-2 border border-[var(--border)] rounded-full text-[13px] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors shrink-0">
            <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
            <span className="max-w-[100px] truncate font-medium">Dhaka, BD</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              id="header-search"
              type="search"
              placeholder={`Search in ${config.label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full border border-[var(--border)] bg-[var(--muted)] text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--primary)]/5 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors relative" aria-label="Wishlist">
              <Heart className="w-5 h-5 text-[var(--foreground)]" />
            </button>
            <Link href="/store/cart" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors relative" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-[var(--foreground)]" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">3</span>
            </Link>
            <Link href="/profile" className="hidden sm:flex items-center gap-2 pl-2 pr-3 h-9 rounded-full border border-[var(--border)] hover:border-[var(--primary)] transition-all bg-white" aria-label="User account">
              <User className="w-4 h-4 text-[var(--foreground)]" />
              <span className="text-[13px] font-bold text-[var(--foreground)]">Account</span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-[var(--border)] bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            <button className="flex-shrink-0 px-4 py-3 text-[13px] font-bold text-[var(--foreground)] flex items-center gap-2 border-b-2 border-transparent hover:text-[var(--primary)]">
              <LayoutGrid className="w-4 h-4" />
              All Categories
            </button>
            <div className="h-4 w-px bg-[var(--border)] mx-1 shrink-0" />
            {categories.map((cat) => (
              <Link
                key={cat}
                href={activeModule === 'classified' ? `/classified/ads?category=${cat.toLowerCase()}` : `/store/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 px-4 py-3 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors border-b-2 border-transparent hover:border-[var(--primary)] whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--border)] shadow-xl absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-4">
             <div className="grid grid-cols-2 gap-2">
               {Object.keys(MODULE_CATEGORIES).map((m) => (
                 <button 
                  key={m}
                  onClick={() => { setMobileOpen(false); /* Set module */ }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[var(--muted)] text-[12px] font-bold"
                 >
                   {m.toUpperCase()}
                 </button>
               ))}
             </div>
             <div className="space-y-1">
                <p className="px-3 text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
             </div>
          </div>
        </div>
      )}
    </header>
  );
}
