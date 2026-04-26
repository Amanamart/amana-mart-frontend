'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/store';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4 font-sans">
      <div className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Illustration & Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#005555] to-[#008080] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl">
                AM
              </div>
              <span className="text-xl font-extrabold tracking-tight">Amana Mart</span>
            </Link>
            
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Welcome Back to <br />
              <span className="text-teal-300">Your Smart Hub.</span>
            </h2>
            <p className="text-white/70 text-sm max-w-sm">
              One account for everything. Grocery, Pharmacy, Food, Rides, and more - all at your fingertips.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-300" />
              </div>
              <p className="text-sm font-bold">Secure Global Platform</p>
            </div>
            <p className="text-[12px] text-white/60 leading-relaxed">
              Your data is encrypted and secure. We use world-class security standards to protect your privacy and transactions.
            </p>
          </div>

          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Sign In</h1>
            <p className="text-slate-500 text-sm mb-8">
              New to Amana Mart? <Link href="/register" className="text-[#008080] font-bold hover:underline">Create an account</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#008080] transition-colors" />
                  <input 
                    id="email"
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#008080] focus:ring-4 focus:ring-teal-500/5 transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider" htmlFor="password">Password</label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-[#008080] hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#008080] transition-colors" />
                  <input 
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#008080] focus:ring-4 focus:ring-teal-500/5 transition-all text-sm font-medium"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-[#008080] focus:ring-[#008080]" />
                <label htmlFor="remember" className="text-sm font-medium text-slate-600">Keep me signed in</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest text-slate-400"><span className="bg-white px-4">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Globe, color: 'text-red-500', label: 'Google' },
                { icon: Globe, color: 'text-blue-600', label: 'Facebook' },
                { icon: Globe, color: 'text-slate-800', label: 'Github' }
              ].map((social, i) => (
                <button 
                  key={i} 
                  type="button"
                  title={`Continue with ${social.label}`}
                  className="h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <social.icon className={cn("w-5 h-5", social.color)} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
