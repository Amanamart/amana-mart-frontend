import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, Bell, Heart, User, Search, MapPin, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Classified Marketplace — Buy, Sell, Rent in Bangladesh',
  description: 'Post free ads and find used goods, jobs, property, vehicles, and more on AmanaMart Classifieds — Bangladesh\'s trusted marketplace.',
};

export default function ClassifiedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#f5f5f5' }}>
      {/* Classified Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
      }}>
        {/* Top bar */}
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 64,
        }}>
          {/* Logo */}
          <Link href="/classified" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#fff', fontSize: 16,
            }}>A</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 16, color: '#333', lineHeight: 1 }}>AmanaMart</p>
              <p style={{ fontSize: 10, color: '#FF6B35', fontWeight: 600, lineHeight: 1, letterSpacing: 1 }}>CLASSIFIEDS</p>
            </div>
          </Link>

          {/* Location Selector */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid #ddd', borderRadius: 8,
            padding: '8px 12px', background: '#f9f9f9',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
            fontSize: 13, color: '#555',
          }}>
            <MapPin size={14} style={{ color: '#FF6B35' }} />
            <span>All Bangladesh</span>
            <ChevronDown size={14} />
          </button>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
              window.location.href = `/classified/ads?search=${encodeURIComponent(query)}`;
            }}
            style={{ flex: 1, position: 'relative' }}
          >
            <Search size={18} style={{
              position: 'absolute', left: 14, top: '50%',
              transform: 'translateY(-50%)', color: '#999',
            }} />
            <input
              name="search"
              type="text"
              placeholder="What are you looking for?"
              style={{
                width: '100%', paddingLeft: 44, paddingRight: 16,
                paddingTop: 11, paddingBottom: 11,
                border: '1.5px solid #FF6B35',
                borderRadius: 8, fontSize: 14, outline: 'none',
                background: '#fff',
              }}
            />
            <button type="submit" style={{ display: 'none' }}>Search</button>
          </form>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/classified/saved" style={{ color: '#555', display: 'flex' }}>
              <Heart size={22} />
            </Link>
            <Link href="/classified/chat" style={{ color: '#555', display: 'flex', position: 'relative' }}>
              <MessageSquare size={22} />
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#FF6B35', color: '#fff', fontSize: 10,
                fontWeight: 700, width: 16, height: 16,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>3</span>
            </Link>
            <Link href="/classified/my-ads" style={{ color: '#555', display: 'flex' }}>
              <User size={22} />
            </Link>
            <Link
              href="/classified/post-ad"
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                padding: '10px 20px', borderRadius: 8,
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(255,107,53,0.35)',
              }}
            >
              + Post Ad
            </Link>
          </div>
        </div>

        {/* Category Nav */}
        <div style={{
          background: '#FF6B35',
          overflowX: 'auto',
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '0 16px',
            display: 'flex', gap: 0,
          }}>
            {[
              { label: '📱 Mobiles', href: '/classified/category/mobiles' },
              { label: '💻 Electronics', href: '/classified/category/electronics' },
              { label: '🚗 Vehicles', href: '/classified/vehicles' },
              { label: '🏠 Property', href: '/classified/property' },
              { label: '💼 Jobs', href: '/classified/jobs' },
              { label: '🛋️ Home & Living', href: '/classified/category/home-living' },
              { label: '👗 Fashion', href: '/classified/category/fashion-beauty' },
              { label: '🐾 Pets', href: '/classified/category/pets' },
              { label: '🔧 Services', href: '/classified/category/services' },
              { label: '📦 Others', href: '/classified/category/others' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '10px 14px',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  transition: 'background 0.15s',
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#222',
        color: '#aaa',
        padding: '40px 16px 20px',
        marginTop: 40,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 32 }}>
            <div>
              <h3 style={{ color: '#FF6B35', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>AmanaMart Classifieds</h3>
              <p style={{ fontSize: 13, lineHeight: 1.8 }}>Bangladesh&apos;s trusted platform for buying, selling, and renting. Post free ads in minutes.</p>
            </div>
            {[
              { title: 'Quick Links', links: ['Post Your Ad', 'Browse Ads', 'Membership', 'Boost Ad', 'My Ads', 'Saved Ads'] },
              { title: 'Categories', links: ['Mobiles', 'Electronics', 'Vehicles', 'Property', 'Jobs', 'Services'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Terms of Service', 'Privacy Policy', 'Contact Us', 'Report Fraud'] },
            ].map((section) => (
              <div key={section.title}>
                <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{section.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.links.map((link) => (
                    <li key={link} style={{ marginBottom: 8 }}>
                      <Link href="/classified" style={{ color: '#aaa', textDecoration: 'none', fontSize: 13 }}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: 20, textAlign: 'center', fontSize: 12 }}>
            © 2026 AmanaMart Classifieds. All rights reserved. | Built for Bangladesh.
          </div>
        </div>
      </footer>
    </div>
  );
}
