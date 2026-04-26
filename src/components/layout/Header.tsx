'use client';

import React, { useState } from 'react';
import { useModule } from '@/context/ModuleContext';
import { useTranslation } from '@/context/LanguageContext';
import { MODULES } from '@/constants/modules';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Heart, 
  Camera, 
  ChevronDown, 
  LayoutGrid,
  X,
  Plus,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Header() {
  const { activeModule } = useModule();
  const { lang, setLang, t } = useTranslation();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const activeModuleConfig = MODULES.find(m => m.id === activeModule) || MODULES[3];

  const handleImageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setIsVisualSearchOpen(true);
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex flex-col w-full bg-white shadow-sm">
        {/* 1. Top Mini Bar */}
        <div className="w-full bg-gray-900 text-white py-2 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-[11px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Support: +880 1234 567890
              </span>
              <span className="hidden md:inline-block opacity-50 font-medium">Bangladesh&apos;s #1 Super App Ecosystem</span>
            </div>
            <div className="flex items-center gap-6">
              {/* Language Switcher */}
              <div className="flex items-center gap-3 border-r border-white/10 pr-6 mr-0">
                <button 
                  onClick={() => setLang('en')}
                  className={cn("transition-all", lang === 'en' ? "text-primary" : "opacity-50 hover:opacity-100")}
                >
                  EN
                </button>
                <span className="opacity-20">|</span>
                <button 
                  onClick={() => setLang('bn')}
                  className={cn("transition-all", lang === 'bn' ? "text-primary" : "opacity-50 hover:opacity-100")}
                >
                  বাংলা
                </button>
              </div>
              <Link href="/account" className="flex items-center gap-2 hover:text-primary transition-colors">
                <User size={14} />
                <span>My Account</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Header */}
        <div className="w-full bg-white py-4 px-4 md:px-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 bg-primary rounded-[14px] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 group-hover:rotate-6 transition-all">
                A
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-none hidden sm:block">AmanaMart</h1>
            </Link>

            {/* Location Selector */}
            <button 
              onClick={() => setIsLocationOpen(true)}
              className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-primary transition-all group shrink-0"
            >
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Deliver to</p>
                <p className="text-xs font-black text-gray-900 leading-none">Select Location</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 ml-2" />
            </button>

            {/* Global Search */}
            <div className="flex-1 relative group">
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const query = (form.elements.namedItem('q') as HTMLInputElement).value;
                if (query) {
                  window.location.href = `/search?q=${encodeURIComponent(query)}&module=${activeModuleConfig.id}`;
                }
              }}>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    name="q"
                    type="text" 
                    placeholder={`Search for items in ${activeModuleConfig.label}...`}
                    className="w-full h-12 pl-12 pr-12 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary outline-none transition-all placeholder:text-gray-300"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const query = e.currentTarget.value;
                        if (query) {
                          window.location.href = `/search?q=${encodeURIComponent(query)}&module=${activeModuleConfig.id}`;
                        }
                      }
                    }}
                  />
                  <label className="absolute right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer" title="Visual Search">
                    <Camera size={20} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageSearch} />
                  </label>
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <Link href="/wishlist" className="hidden md:flex text-gray-400 hover:text-primary transition-colors relative">
                <Heart size={26} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-4 group">
                <div className="relative text-gray-400 group-hover:text-primary transition-colors">
                  <ShoppingCart size={28} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg shadow-primary/20">3</span>
                </div>
                <div className="hidden xl:block text-left leading-none">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Cart Total</p>
                  <p className="text-sm font-black text-gray-900">৳1,240</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Category Bar */}
        <div className="w-full bg-white px-4 md:px-8 py-2.5 border-b border-gray-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
              <Link href="/categories" className="flex items-center gap-2 text-xs font-black text-gray-900 hover:text-primary transition-all shrink-0 uppercase tracking-widest">
                <LayoutGrid size={16} className="text-primary" />
                All Categories
              </Link>
              <div className="w-[1px] h-4 bg-gray-100 shrink-0" />
              <Link href="/stores" className="text-xs font-black text-gray-500 hover:text-primary transition-all shrink-0 uppercase tracking-widest">Stores</Link>
              <Link href="/deals" className="text-xs font-black text-gray-500 hover:text-primary transition-all shrink-0 uppercase tracking-widest">Daily Deals</Link>
              <Link href="/offers" className="text-xs font-black text-gray-500 hover:text-primary transition-all shrink-0 uppercase tracking-widest">Offers</Link>
              <Link href="/pages/help-center" className="text-xs font-black text-gray-500 hover:text-primary transition-all shrink-0 uppercase tracking-widest">Help</Link>
            </div>
            
            <Link href="/classified/post-ad" className="hidden lg:flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <Plus size={16} /> Post Free Ad
            </Link>
          </div>
        </div>
      </header>

      {/* Location Modal */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setIsLocationOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 animate-in zoom-in-95">
             <button onClick={() => setIsLocationOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900">
               <X size={24} />
             </button>
             <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Set Your Location</h3>
             <p className="text-gray-500 font-medium mb-8">Select your city and zone to see available modules and products.</p>
             
             <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select City</label>
                 <select className="w-full h-14 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-primary outline-none transition-all">
                   <option>Dhaka</option>
                   <option>Chittagong</option>
                   <option>Sylhet</option>
                   <option>Rajshahi</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Zone</label>
                 <select className="w-full h-14 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-primary outline-none transition-all">
                   <option>Gulshan 1 & 2</option>
                   <option>Banani</option>
                   <option>Uttara</option>
                   <option>Dhanmondi</option>
                 </select>
               </div>
               <button 
                onClick={() => setIsLocationOpen(false)}
                className="w-full h-16 bg-primary text-white rounded-3xl font-black text-sm shadow-xl shadow-primary/20 mt-4 hover:scale-105 active:scale-95 transition-all"
               >
                 CONFIRM LOCATION
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Visual Search Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl animate-in fade-in" onClick={() => setIsVisualSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95">
             <button onClick={() => setIsVisualSearchOpen(false)} className="absolute top-8 right-8 w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-all z-10">
               <X size={24} />
             </button>
             <div className="p-10 text-center">
               <div className="relative aspect-video bg-gray-50 rounded-[32px] overflow-hidden mb-8 border-4 border-gray-100">
                 {selectedImage && <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />}
                 {isSearching && (
                   <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center">
                     <div className="w-20 h-20 border-8 border-white border-t-transparent rounded-full animate-spin mb-4" />
                     <p className="text-white font-black text-xl uppercase tracking-widest animate-pulse">Analyzing Visual Data...</p>
                   </div>
                 )}
               </div>
               <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">AI Visual Search</h3>
               <p className="text-gray-500 font-medium mb-10">We are finding the best matches for your image across all modules.</p>
               
               <div className="flex gap-4">
                 <button onClick={() => setIsVisualSearchOpen(false)} className="flex-1 h-16 bg-gray-100 text-gray-900 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all">CANCEL</button>
                 {!isSearching && (
                   <button className="flex-1 h-16 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                     VIEW RESULTS <ArrowRight size={18} />
                   </button>
                 )}
               </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
