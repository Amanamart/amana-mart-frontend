'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <div className="w-full max-w-[500px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="w-16 h-16 rounded-3xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-[var(--primary)]/20 mb-4">
            AM
          </Link>
          <h1 className="text-2xl font-black text-slate-800">Create Account</h1>
          <p className="text-slate-500 text-sm">Join the Amana Mart ecosystem today</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 px-4">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                step >= i ? "bg-[var(--primary)]" : "bg-slate-200"
              )} 
            />
          ))}
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Mahmudul Hassan"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/5 transition-all text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                      type="email" 
                      placeholder="hassan@example.com"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/5 transition-all text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                      type="tel" 
                      placeholder="+880 17XX XXXXXX"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/5 transition-all text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200 mt-8"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/5 transition-all text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/5 transition-all text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    By clicking "Create Account", you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. We'll send you an OTP to verify your phone.
                  </p>
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-14 px-6 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Create Account'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-8 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Registration Successful!</h3>
                <p className="text-slate-500 text-sm mb-8 px-4">
                  Welcome to Amana Mart. Your account is ready. Redirecting you to the dashboard...
                </p>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full animate-progress-fast" />
                </div>
                <Link href="/store" className="inline-block mt-8 text-sm font-bold text-[var(--primary)] hover:underline">
                  Click here if not redirected
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-[var(--primary)] font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
