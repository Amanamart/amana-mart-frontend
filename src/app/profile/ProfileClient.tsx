'use client';

import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Car, 
  Wrench, 
  Megaphone, 
  Package, 
  DollarSign, 
  Settings, 
  LogOut,
  ChevronRight,
  MapPin,
  Bell,
  Shield,
  CreditCard,
  Gift
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AffiliateDashboard } from '@/components/profile/AffiliateDashboard';
import { useModule } from '@/context/ModuleContext';

type TabType = 'overview' | 'orders' | 'rides' | 'services' | 'parcel' | 'ads' | 'affiliate' | 'wallet' | 'settings';

export function ProfileClient() {
  const { activeModule } = useModule();
  const [activeTab, setActiveTab] = useState<TabType>(
    activeModule === 'classified' ? 'ads' : 
    activeModule === 'ride' ? 'rides' : 
    activeModule === 'service' ? 'services' : 
    activeModule === 'parcel' ? 'parcel' : 'orders'
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Shop Orders', icon: ShoppingBag },
    { id: 'rides', label: 'Rides & Rental', icon: Car },
    { id: 'parcel', label: 'Parcel History', icon: Package },
    { id: 'services', label: 'Service Bookings', icon: Wrench },
    { id: 'ads', label: 'My Ads', icon: Megaphone },
    { id: 'affiliate', label: 'Affiliate Program', icon: DollarSign },
    { id: 'wallet', label: 'Wallet & Loyalty', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Header Profile Section */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white border-2 border-white flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-extrabold text-[var(--foreground)]">Mahmudul Hassan</h1>
              <p className="text-[var(--muted-foreground)] text-sm mb-2">Member since April 2024 · ID: AM-102938</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider">Premium Member</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold uppercase tracking-wider">Gold Affiliate</span>
                <div className="flex items-center gap-1 text-[var(--muted-foreground)] text-[12px] font-medium">
                  <MapPin className="w-3 h-3" /> Uttara, Dhaka
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-[var(--border)] text-center">
                <p className="text-[11px] text-[var(--muted-foreground)] font-bold uppercase">Points</p>
                <p className="text-xl font-extrabold text-[var(--primary)]">2,450</p>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-[var(--border)] text-center">
                <p className="text-[11px] text-[var(--muted-foreground)] font-bold uppercase">Wallet</p>
                <p className="text-xl font-extrabold text-[var(--secondary)]">৳840.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-2 shadow-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                      isActive 
                        ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20" 
                        : "text-[var(--muted-foreground)] hover:bg-slate-50 hover:text-[var(--foreground)]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{tab.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
              <div className="h-px bg-slate-100 my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-5 shadow-sm space-y-4">
              <h4 className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Support</h4>
              <button className="w-full flex items-center justify-between text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                Help Center <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                Safety Center <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                Live Chat <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in">
              {activeTab === 'overview' && <OverviewView />}
              {activeTab === 'affiliate' && <AffiliateDashboard />}
              {activeTab === 'orders' && <OrdersView />}
              {activeTab === 'rides' && <RidesView />}
              {activeTab === 'parcel' && <ParcelView />}
              {activeTab === 'services' && <ServicesView />}
              {activeTab === 'ads' && <AdsView />}
              {activeTab === 'wallet' && <WalletView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-bold">12</h4>
          <p className="text-sm text-[var(--muted-foreground)]">Orders this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <Car className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-bold">8</h4>
          <p className="text-sm text-[var(--muted-foreground)]">Rides taken</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Gift className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-bold">৳1,200</h4>
          <p className="text-sm text-[var(--muted-foreground)]">Saved this month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                {['🍕', '📦', '📢'][i-1]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{['Food ordered from Chillox', 'Parcel delivered to Uttara', 'Ad posted for iPhone 15 Pro'][i-1]}</p>
                <p className="text-[12px] text-[var(--muted-foreground)]">Yesterday at 4:30 PM</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] p-6 min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
        <ShoppingBag className="w-10 h-10 text-[var(--muted-foreground)]" />
      </div>
      <h3 className="text-xl font-bold">No active orders</h3>
      <p className="text-[var(--muted-foreground)] text-sm max-w-xs mt-2">
        You haven't placed any shop, grocery or pharmacy orders recently.
      </p>
    </div>
  );
}

function RidesView() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] p-6 min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
        <Car className="w-10 h-10 text-[var(--muted-foreground)]" />
      </div>
      <h3 className="text-xl font-bold">No ride history</h3>
      <p className="text-[var(--muted-foreground)] text-sm max-w-xs mt-2">
        Start your first journey with Amana Rides or Rent a car today.
      </p>
    </div>
  );
}

function ParcelView() { return <div className="p-8 text-center bg-white rounded-2xl border">Parcel History View</div>; }
function ServicesView() { return <div className="p-8 text-center bg-white rounded-2xl border">Service Bookings View</div>; }
function AdsView() { return <div className="p-8 text-center bg-white rounded-2xl border">My Classified Ads View</div>; }
function WalletView() { return <div className="p-8 text-center bg-white rounded-2xl border">Wallet & Loyalty View</div>; }
