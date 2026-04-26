'use client';

import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Plus,
  Send,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ParcelClient() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold mb-6 border border-white/10 uppercase tracking-widest">
              <Package className="w-3.5 h-3.5" /> Instant Delivery
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Send Anything <br /> 
              <span className="text-orange-200">Across the City.</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Fast, secure, and reliable parcel delivery. Documents, gifts, or heavy items - we move it all in minutes.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#ea580c] font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-orange-50 transition-all flex items-center gap-2">
                Send Parcel Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all">
                Track Package
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block w-[400px] h-[300px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 shadow-2xl">
            <h3 className="font-bold mb-6 text-xl">Quick Tracking</h3>
            <div className="space-y-4">
              <div className="relative">
                <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input 
                  type="text" 
                  placeholder="Enter tracking number"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
                />
              </div>
              <button className="w-full bg-white text-orange-600 font-bold py-4 rounded-2xl hover:shadow-lg transition-all">
                Track My Parcel
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-orange-500 bg-slate-200" />
                ))}
              </div>
              <p className="text-[12px] font-medium text-white/70">1,200+ riders online in your area</p>
            </div>
          </div>
        </div>
        
        {/* Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Standard Delivery', desc: 'Affordable delivery within 2-3 hours', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Express Flash', desc: 'Instant pickup and delivery in 45 mins', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
            { title: 'Secured Courier', desc: 'For documents and high-value items', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all cursor-pointer group">
              <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", s.bg)}>
                <s.icon className={cn("w-8 h-8", s.color)} />
              </div>
              <h4 className="text-xl font-bold mb-2">{s.title}</h4>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{s.desc}</p>
              <div className="flex items-center text-sm font-bold text-[#ea580c] group-hover:gap-2 transition-all">
                Select Service <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form (Demo) */}
      <div className="max-w-4xl mx-auto px-4 mb-24">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 space-y-8">
              <h3 className="text-2xl font-black">Where's it going?</h3>
              
              <div className="space-y-6 relative">
                {/* Pick up */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-orange-100 border-4 border-white shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                  </div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup Point</label>
                  <div className="flex items-center gap-2 border-b-2 border-slate-100 py-2 focus-within:border-orange-500 transition-colors">
                    <input type="text" placeholder="Search pickup location" className="flex-1 bg-transparent outline-none font-semibold text-sm" />
                    <MapPin className="w-4 h-4 text-slate-300" />
                  </div>
                </div>

                {/* Connection line */}
                <div className="absolute left-3 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-slate-200" />

                {/* Drop off */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center">
                    <Navigation className="w-3 h-3 text-blue-600" />
                  </div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</label>
                  <div className="flex items-center gap-2 border-b-2 border-slate-100 py-2 focus-within:border-blue-500 transition-colors">
                    <input type="text" placeholder="Where are you sending?" className="flex-1 bg-transparent outline-none font-semibold text-sm" />
                    <MapPin className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                 <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                   Calculate Fare <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 flex flex-col justify-center border-l border-slate-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-orange-500" />
                </div>
                <h4 className="font-bold text-lg mb-2">Estimate Your Price</h4>
                <p className="text-slate-400 text-sm mb-8">Select locations to see delivery time and cost.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Weight</p>
                    <p className="font-bold">Up to 2kg</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Distance</p>
                    <p className="font-bold">5.4 km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Why choose Amana Parcel?</h2>
            <div className="w-20 h-1.5 bg-[#ea580c] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Truck, title: 'Reliable Fleet', desc: 'Over 10,000+ verified riders ready' },
              { icon: Navigation, title: 'Real-time Tracking', desc: 'Watch your parcel move on the map' },
              { icon: ShieldCheck, title: 'Insured Items', desc: 'We cover damages up to ৳5,000' },
              { icon: Plus, title: 'Bulk Orders', desc: 'Special rates for business partners' },
            ].map((f, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-[#ea580c]">
                  <f.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
