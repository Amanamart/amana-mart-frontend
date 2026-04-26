'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone,
  Download,
  ShieldCheck,
} from 'lucide-react';

const SOCIAL_ICONS = [
  { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { name: 'Linkedin', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0z' },
];

const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/pages/about-us' },
    { label: 'Contact Us', href: '/pages/contact-us' },
    { label: 'Careers', href: '/pages/careers' },
    { label: 'Amana News', href: '/pages/news' },
    { label: 'Sustainability', href: '/pages/sustainability' }
  ],
  customer: [
    { label: 'Help Center', href: '/pages/help-center' },
    { label: 'Track Order', href: '/track' },
    { label: 'Refund Policy', href: '/pages/refund-policy' },
    { label: 'Shipping Policy', href: '/pages/shipping-policy' },
    { label: 'Cancellation', href: '/pages/cancellation-policy' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/pages/privacy-policy' },
    { label: 'Terms of Service', href: '/pages/terms-and-conditions' },
    { label: 'Cookie Policy', href: '/pages/cookie-policy' },
    { label: 'Data Deletion', href: '/pages/data-deletion' },
    { label: 'Security', href: '/pages/security-policy' }
  ],
  modules: [
    { label: 'Grocery Policy', href: '/pages/grocery-policy' },
    { label: 'Pharmacy Policy', href: '/pages/pharmacy-policy' },
    { label: 'Food Safety', href: '/pages/food-safety' },
    { label: 'Courier Rules', href: '/pages/courier-policy' },
    { label: 'Classified Safety', href: '/pages/classified-safety' }
  ],
  partner: [
    { label: 'Become a Seller', href: '/pages/vendor-agreement' },
    { label: 'Delivery Partner', href: '/pages/rider-conduct' },
    { label: 'Affiliate Program', href: '/pages/affiliate-terms' },
    { label: 'Store Guidelines', href: '/pages/store-guidelines' },
    { label: 'Payout Policy', href: '/pages/payout-policy' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-4 md:px-8 border-t-8 border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {/* Brand & Social */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/40 group-hover:scale-105 transition-transform">
                A
              </div>
              <h2 className="text-3xl font-black tracking-tighter">AmanaMart</h2>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Bangladesh&apos;s most trusted multi-module marketplace. Delivering happiness to your doorstep with 100% quality assurance.
            </p>
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((social) => (
                <a key={social.name} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-all group shadow-xl" title={social.name}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
            
            <div className="space-y-4 pt-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary">Get the Super App</p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-2.5 rounded-xl hover:scale-105 transition-all shadow-2xl">
                  <Smartphone size={20} />
                  <div className="text-left leading-none">
                    <p className="text-[8px] font-black uppercase opacity-60">Play Store</p>
                    <p className="text-sm font-black">Android</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-2.5 rounded-xl hover:scale-105 transition-all shadow-2xl">
                  <Download size={20} />
                  <div className="text-left leading-none">
                    <p className="text-[8px] font-black uppercase opacity-60">App Store</p>
                    <p className="text-sm font-black">iOS App</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8 opacity-80">{key}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block font-bold text-xs">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/5 mb-12">
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all">
               <Phone size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase text-gray-500 mb-0.5">Call Us 24/7</p>
               <p className="text-sm font-black tracking-tight">+880 1234 567890</p>
             </div>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all">
               <Mail size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase text-gray-500 mb-0.5">Email Support</p>
               <p className="text-sm font-black tracking-tight">care@amanamart.com</p>
             </div>
           </div>
           <div className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all">
               <MapPin size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase text-gray-500 mb-0.5">Head Office</p>
               <p className="text-sm font-black tracking-tight">Gulshan 2, Dhaka, BD</p>
             </div>
           </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <ShieldCheck size={32} className="text-primary" />
             <div className="leading-tight">
               <p className="text-xs font-black">Trusted Marketplace</p>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Verified by SSLCommerz & DBID</p>
             </div>
          </div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
            © 2026 AmanaMart Professional Ecosystem. Built for a Smarter Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
