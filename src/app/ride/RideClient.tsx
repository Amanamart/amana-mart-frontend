'use client';

import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  ArrowRight, 
  Navigation, 
  Clock, 
  Star,
  Shield,
  Search,
  Calendar,
  Key,
  Smartphone,
  ChevronRight,
  Bike
} from 'lucide-react';
import { cn } from '@/lib/utils';

type RideMode = 'ride' | 'rental';

export function RideClient() {
  const [mode, setMode] = useState<RideMode>('ride');

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero / Booking Section */}
      <div className="bg-[#005555] py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {mode === 'ride' ? 'Your Daily Commute,' : 'Explore the Country,'} <br />
              <span className="text-teal-300">{mode === 'ride' ? 'Simplified.' : 'On Your Terms.'}</span>
            </h1>
            
            {/* Mode Switcher */}
            <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-10">
              <button 
                onClick={() => setMode('ride')}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                  mode === 'ride' ? "bg-white text-[#005555] shadow-lg" : "text-white hover:bg-white/10"
                )}
              >
                <Car className="w-4 h-4" /> Ride Sharing
              </button>
              <button 
                onClick={() => setMode('rental')}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                  mode === 'rental' ? "bg-white text-[#005555] shadow-lg" : "text-white hover:bg-white/10"
                )}
              >
                <Key className="w-4 h-4" /> Vehicle Rental
              </button>
            </div>

            {/* Booking Card */}
            <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-10 text-slate-800">
              {mode === 'ride' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pickup Location</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                        <input type="text" placeholder="Where are you?" className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-500 transition-all text-sm font-semibold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                      <div className="relative group">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                        <input type="text" placeholder="Where to go?" className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-semibold" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: Bike, label: 'Bike', price: '৳60' },
                      { icon: Car, label: 'Car', price: '৳250' },
                      { icon: Car, label: 'Premium', price: '৳450' },
                    ].map((v, i) => (
                      <button key={i} className="flex-1 min-w-[120px] p-4 rounded-2xl border-2 border-slate-100 hover:border-teal-500 transition-all text-center group">
                        <v.icon className="w-6 h-6 mx-auto mb-2 text-slate-400 group-hover:text-teal-600" />
                        <p className="text-sm font-bold">{v.label}</p>
                        <p className="text-[12px] text-teal-600 font-bold">{v.price}</p>
                      </button>
                    ))}
                  </div>

                  <button className="w-full h-16 bg-[#005555] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-teal-900/20">
                    Find Ride Now <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pickup Date & Time</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                        <input type="datetime-local" className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-500 transition-all text-sm font-semibold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                      <select className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-500 transition-all text-sm font-semibold">
                        <option>1 Day</option>
                        <option>3 Days</option>
                        <option>1 Week</option>
                        <option>1 Month</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-100">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Insurance Included</p>
                      <p className="text-[12px] text-teal-700">All rentals come with full accidental insurance cover.</p>
                    </div>
                  </div>

                  <button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20">
                    Browse Vehicles <Search className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-400/10 rounded-full translate-y-1/2 translate-x-1/4" />
      </div>

      {/* Featured Vehicles (Only for Rental mode) */}
      {mode === 'rental' && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">Available for Rent</h2>
              <p className="text-slate-500">Premium vehicles for any occasion.</p>
            </div>
            <button className="text-[var(--primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Fleet <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Toyota Noah (Private)', price: '৳4,500 / day', specs: '8 Seats · AC · Driver included', img: '🚙' },
              { name: 'Yamaha FZ-S V3', price: '৳1,200 / day', specs: '150cc · Fuel efficient', img: '🏍️' },
              { name: 'Honda Civic 2023', price: '৳6,000 / day', specs: '5 Seats · Luxury · Self drive', img: '🚗' },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group">
                <div className="h-48 bg-slate-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {v.img}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1">{v.name}</h4>
                  <p className="text-[12px] text-slate-400 mb-4 font-medium uppercase tracking-wider">{v.specs}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-[#005555]">{v.price}</p>
                    <button className="p-3 bg-slate-100 rounded-xl hover:bg-[#005555] hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
             <div className="lg:col-span-1">
               <h3 className="text-2xl font-black mb-4">Why Amana Rides?</h3>
               <div className="w-12 h-1.5 bg-teal-500 rounded-full mb-6" />
               <p className="text-slate-500 text-sm leading-relaxed">
                 We prioritize safety and comfort for every mile you travel with us.
               </p>
             </div>
             
             {[
               { icon: Shield, title: 'Safe Travels', desc: 'SOS button & live track for every ride.' },
               { icon: Star, title: 'Top Rated', desc: '5-star rated professional drivers.' },
               { icon: Clock, title: '24/7 Service', desc: 'Book a ride any time, any day.' },
             ].map((f, i) => (
               <div key={i} className="space-y-4">
                 <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                   <f.icon className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-lg">{f.title}</h4>
                 <p className="text-slate-500 text-sm">{f.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
