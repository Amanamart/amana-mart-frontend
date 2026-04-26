'use client';

import React, { useState } from 'react';
import { MODULES } from '@/constants/modules';
import { useModule } from '@/context/ModuleContext';
import { Search, MapPin, Star, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StoresPage() {
  const { activeModule, setActiveModule } = useModule();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real Mock Data for Stores
  const stores = [
    { id: 1, name: 'Amana Express Store', module: 'grocery', rating: 4.9, reviews: 1250, distance: '1.2km', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=300&h=200&auto=format&fit=crop', tags: ['Fresh', 'Organic'] },
    { id: 2, name: 'Fresh Mart BD', module: 'grocery', rating: 4.8, reviews: 850, distance: '0.8km', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&h=200&auto=format&fit=crop', tags: ['Discount', 'Daily'] },
    { id: 3, name: 'Lazz Pharma', module: 'pharmacy', rating: 4.9, reviews: 3200, distance: '2.5km', image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=300&h=200&auto=format&fit=crop', tags: ['24/7', 'Medicine'] },
    { id: 4, name: 'KFC Gulshan', module: 'food', rating: 4.7, reviews: 5400, distance: '3.1km', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&h=200&auto=format&fit=crop', tags: ['Fast Food', 'Burgers'] },
    { id: 5, name: 'Gadget & Gear', module: 'shop', rating: 4.9, reviews: 1100, distance: '1.5km', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&h=200&auto=format&fit=crop', tags: ['Tech', 'Original'] },
    { id: 6, name: 'Sultan\'s Dine', module: 'food', rating: 4.8, reviews: 8900, distance: '4.2km', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&h=200&auto=format&fit=crop', tags: ['Kacchi', 'Traditional'] },
  ];

  const filteredStores = stores.filter(store => {
    const matchesModule = store.module === activeModule;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Popular Stores</h1>
          <p className="text-gray-500 font-medium">Find the best vendors for your {activeModule} needs.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search stores by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
          <button className="h-14 px-6 bg-gray-900 text-white rounded-2xl flex items-center gap-2 font-black text-sm hover:bg-black transition-all">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Module Selector Pills */}
      <div className="flex items-center gap-3 mb-12 overflow-x-auto no-scrollbar pb-2">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-black transition-all shrink-0 border-2",
              activeModule === mod.id 
                ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" 
                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
            )}
          >
            {mod.label}
          </button>
        ))}
      </div>

      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-48 bg-gray-50">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black text-gray-900">{store.rating}</span>
                  <span className="text-[10px] text-gray-400 font-bold">({store.reviews})</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {store.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary px-2.5 py-1 bg-primary/5 rounded-lg">{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors">{store.name}</h3>
                <div className="flex items-center gap-4 text-gray-400 text-xs font-bold mb-8">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {store.distance}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Open Now
                  </div>
                </div>
                <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="font-black text-sm uppercase tracking-wider">Visit Store</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">No Stores Found</h3>
          <p className="text-gray-400 font-medium">Try searching for something else or change the module.</p>
        </div>
      )}
    </main>
  );
}
