'use client';

import React from 'react';
import { 
  Wrench, 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles,
  Droplets,
  Zap as Electricity,
  Smartphone,
  Paintbrush
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ServiceClient() {
  const categories = [
    { name: 'Cleaning', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Electrical', icon: Electricity, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Plumbing', icon: Wrench, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { name: 'Painting', icon: Paintbrush, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Gadget Repair', icon: Smartphone, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'AC Repair', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Professional Services, <br />
              <span className="text-purple-200">Just a Tap Away.</span>
            </h1>
            <p className="text-white/80 text-lg mb-10">
              Find verified experts for home repair, cleaning, beauty, and more in Bangladesh.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-3xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-slate-400" />
                <input type="text" placeholder="What service do you need?" className="w-full bg-transparent outline-none text-slate-800 font-semibold" />
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-100 my-auto" />
              <div className="flex items-center gap-3 px-4 py-3 min-w-[150px]">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span className="text-slate-800 font-semibold">Dhaka</span>
              </div>
              <button className="bg-[#8b5cf6] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#7c3aed] transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full translate-y-1/2 translate-x-1/4 blur-3xl" />
      </div>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col items-center gap-4 hover:-translate-y-2 transition-all cursor-pointer group">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", cat.bg)}>
                <cat.icon className={cn("w-7 h-7", cat.color)} />
              </div>
              <span className="text-sm font-black text-slate-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Most Popular Services</h2>
            <p className="text-slate-500">Trusted by thousands of customers every day.</p>
          </div>
          <button className="text-[#8b5cf6] font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See All Services <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Full Home Deep Cleaning', price: '৳1,500', rating: 4.9, img: '🧹', tags: ['Fast', 'Pro'] },
            { name: 'AC Master Servicing', price: '৳800', rating: 4.8, img: '❄️', tags: ['Express'] },
            { name: 'Electrical Socket Repair', price: '৳250', rating: 4.7, img: '🔌', tags: ['Urgent'] },
            { name: 'Water Pump Repair', price: '৳550', rating: 4.9, img: '🚰', tags: ['Pro'] },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="h-40 bg-slate-50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                {s.img}
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-md uppercase">{tag}</span>
                  ))}
                </div>
                <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">{s.name}</h4>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[12px] font-bold">{s.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-slate-800">{s.price}</p>
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[12px] font-bold hover:bg-[#8b5cf6] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-black mb-4">Amana Service Guarantee</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                If you're not satisfied with our service, we'll make it right. All our providers are background checked and verified for your peace of mind.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-bold">
                  <Sparkles className="w-4 h-4 text-purple-400" /> 100% Satisfaction
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-purple-400" /> Verified Pros
                </div>
              </div>
            </div>
            
            <div className="relative z-10 text-8xl md:text-9xl">🛠️</div>
            
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          </div>
        </div>
      </section>
    </div>
  );
}
