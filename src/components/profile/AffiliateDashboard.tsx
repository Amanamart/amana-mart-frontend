'use client';

import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Link as LinkIcon, 
  TrendingUp, 
  Copy, 
  Check,
  ChevronRight,
  ExternalLink,
  Wallet,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

export function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const referralCode = "AMANA99";
  const referralLink = `https://amanamart.com.bd?ref=${referralCode}`;

  const stats = [
    { label: 'Total Earnings', value: '৳4,520', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Clicks', value: '1,284', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversions', value: '56', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Payout', value: '৳850', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-4 rounded-2xl border border-[var(--border)] shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                <Icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="text-[12px] text-[var(--muted-foreground)] font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Referral Link Card */}
      <div className="bg-gradient-to-br from-[var(--secondary)] to-[#005555] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-xl font-bold mb-2">Invite Friends & Earn! 🎁</h3>
          <p className="text-white/80 text-sm mb-6">
            Share your referral link with friends and get 2% commission on every order they place for life!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
              <span className="text-sm font-medium truncate">{referralLink}</span>
              <button 
                onClick={handleCopy}
                className="shrink-0 hover:text-white/60 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <button className="bg-white text-[var(--secondary)] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors shadow-lg">
              Share Now
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Commissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h4 className="font-bold">Recent Commissions</h4>
            <button className="text-[12px] text-[var(--primary)] font-bold">View All</button>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">🛍️</div>
                  <div>
                    <p className="text-sm font-bold">Order #AMN-82736</p>
                    <p className="text-[12px] text-[var(--muted-foreground)]">2 hours ago · Grocery</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+৳24.50</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold uppercase">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Methods */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-slate-600" />
              </div>
              <h4 className="font-bold">Withdrawal</h4>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-slate-50">
                <p className="text-[12px] text-[var(--muted-foreground)] mb-1">Available for payout</p>
                <p className="text-2xl font-bold">৳3,670</p>
              </div>
              
              <button className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/20">
                Request Payout
              </button>
              <p className="text-[11px] text-[var(--muted-foreground)] text-center">Minimum withdrawal: ৳500</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <h4 className="font-bold mb-4">Payment Methods</h4>
            <div className="space-y-3">
              {[
                { name: 'bKash', status: 'Primary', color: 'bg-[#D12053]' },
                { name: 'Nagad', status: 'Added', color: 'bg-[#EA1D25]' },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-[10px] text-white font-bold", method.color)}>
                      {method.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{method.name}</p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">017****4567</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">{method.status}</span>
                </div>
              ))}
              <button className="w-full border-2 border-dashed border-[var(--border)] text-[var(--muted-foreground)] font-bold py-3 rounded-xl text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                + Add New Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
