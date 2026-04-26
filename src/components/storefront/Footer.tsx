import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ],
  forCustomers: [
    { label: 'Track Order', href: '/track' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Support', href: '/support' },
  ],
  forVendors: [
    { label: 'Sell on Amana Mart', href: '/sell' },
    { label: 'Vendor Dashboard', href: '/vendor' },
    { label: 'Delivery Partner', href: '/delivery' },
    { label: 'Affiliate Program', href: '/affiliate' },
  ],
  categories: [
    { label: 'Grocery', href: '/store/category/grocery' },
    { label: 'Pharmacy', href: '/store/category/pharmacy' },
    { label: 'Electronics', href: '/store/category/electronics' },
    { label: 'Fashion', href: '/store/category/fashion' },
  ],
};

export function StorefrontFooter() {
  return (
    <footer className="bg-[#1a2332] text-white mt-12">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
                AM
              </div>
              <div>
                <p className="text-[15px] font-bold leading-tight">Amana Mart</p>
                <p className="text-[10px] text-white/60 leading-tight">Bangladesh's Smart Marketplace</p>
              </div>
            </div>
            <p className="text-[13px] text-white/60 leading-relaxed mb-4 max-w-xs">
              Amana Mart connects you with thousands of stores across Bangladesh. Shop grocery, pharmacy, electronics, fashion, and more — all in one place.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px] text-white/60">
                <Phone className="w-3.5 h-3.5 text-[var(--primary)]" />
                +880 1700-000000
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/60">
                <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
                info@amanamart.com.bd
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                Gulshan 2, Dhaka 1212, Bangladesh
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-2 mt-5">
              {[
                { icon: <Globe className="w-4 h-4" />, href: '#', label: 'Facebook' },
                { icon: <Globe className="w-4 h-4" />, href: '#', label: 'Twitter' },
                { icon: <Globe className="w-4 h-4" />, href: '#', label: 'Instagram' },
                { icon: <Globe className="w-4 h-4" />, href: '#', label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--primary)] hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Company', links: footerLinks.company },
            { title: 'For Customers', links: footerLinks.forCustomers },
            { title: 'For Vendors', links: footerLinks.forVendors },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-semibold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 hover:text-white hover:text-[var(--primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-white mb-1">Download the Amana Mart App</p>
            <p className="text-[12px] text-white/60">Shop faster on your phone</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-[var(--radius-md)] transition-colors">
              <span className="text-[11px] font-medium text-white">📱 App Store</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-[var(--radius-md)] transition-colors">
              <span className="text-[11px] font-medium text-white">▶ Google Play</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/40">
          <p>© {new Date().getFullYear()} Amana Mart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = StorefrontFooter;
