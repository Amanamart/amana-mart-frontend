'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, Upload, MapPin, Tag, FileText, Image, Phone } from 'lucide-react';

const STEPS = ['Category', 'Details', 'Location', 'Photos', 'Contact', 'Preview'];

const CATEGORIES = [
  { name: 'Mobiles', slug: 'mobiles', icon: '📱' },
  { name: 'Electronics', slug: 'electronics', icon: '💻' },
  { name: 'Vehicles', slug: 'vehicles', icon: '🚗' },
  { name: 'Property', slug: 'property', icon: '🏠' },
  { name: 'Jobs', slug: 'jobs', icon: '💼' },
  { name: 'Home & Living', slug: 'home-living', icon: '🛋️' },
  { name: 'Fashion', slug: 'fashion-beauty', icon: '👗' },
  { name: 'Pets', slug: 'pets', icon: '🐾' },
  { name: 'Services', slug: 'services', icon: '🔧' },
  { name: 'Agriculture', slug: 'agriculture', icon: '🌾' },
  { name: 'Business', slug: 'business', icon: '🏭' },
  { name: 'Others', slug: 'others', icon: '📦' },
];

const SUB_CATEGORIES: Record<string, { name: string; slug: string }[]> = {
  mobiles: [
    { name: 'Mobile Phones', slug: 'mobile-phones' },
    { name: 'Mobile Accessories', slug: 'mobile-accessories' },
    { name: 'Tablets', slug: 'tablets' },
    { name: 'Smart Watches', slug: 'smart-watches' },
  ],
  electronics: [
    { name: 'Laptops & Computers', slug: 'laptops' },
    { name: 'Cameras', slug: 'cameras' },
    { name: 'TVs & Monitors', slug: 'tvs' },
    { name: 'Audio & Speakers', slug: 'audio' },
    { name: 'Gaming', slug: 'gaming' },
  ],
  vehicles: [
    { name: 'Cars', slug: 'cars' },
    { name: 'Motorbikes', slug: 'motorbikes' },
    { name: 'Bicycles', slug: 'bicycles' },
    { name: 'Trucks', slug: 'trucks' },
    { name: 'Auto Parts', slug: 'auto-parts' },
  ],
};

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: i < current ? '#1aab50' : i === current ? '#FF6B35' : '#e0e0e0',
              color: i <= current ? '#fff' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, transition: 'all 0.3s',
            }}>
              {i < current ? <Check size={18} /> : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === current ? '#FF6B35' : '#888', fontWeight: i === current ? 700 : 400, whiteSpace: 'nowrap' }}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current ? '#1aab50' : '#e0e0e0', margin: '0 8px', marginBottom: 20, transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Step1({ data, onChange, onNext }: any) {
  const [selectedCat, setSelectedCat] = useState(data.categorySlug || '');
  const [selectedSub, setSelectedSub] = useState(data.subCategorySlug || '');

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Select Category</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Choose the most relevant category for your ad</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.slug} onClick={() => { setSelectedCat(cat.slug); setSelectedSub(''); onChange({ categorySlug: cat.slug, subCategorySlug: '' }); }} style={{
            padding: '16px 12px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
            border: selectedCat === cat.slug ? '2px solid #FF6B35' : '1px solid #e0e0e0',
            background: selectedCat === cat.slug ? '#fff8f5' : '#fff',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
            <p style={{ fontSize: 13, fontWeight: selectedCat === cat.slug ? 700 : 500, color: selectedCat === cat.slug ? '#FF6B35' : '#333' }}>{cat.name}</p>
          </button>
        ))}
      </div>
      {selectedCat && SUB_CATEGORIES[selectedCat] && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#333' }}>Sub-category</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SUB_CATEGORIES[selectedCat].map(sub => (
              <button key={sub.slug} onClick={() => { setSelectedSub(sub.slug); onChange({ categorySlug: selectedCat, subCategorySlug: sub.slug }); }} style={{
                padding: '8px 20px', borderRadius: 20, cursor: 'pointer', fontSize: 14,
                border: selectedSub === sub.slug ? '2px solid #FF6B35' : '1px solid #e0e0e0',
                background: selectedSub === sub.slug ? '#fff8f5' : '#fff',
                color: selectedSub === sub.slug ? '#FF6B35' : '#555', fontWeight: selectedSub === sub.slug ? 700 : 400,
              }}>{sub.name}</button>
            ))}
          </div>
        </div>
      )}
      <button onClick={onNext} disabled={!selectedCat} style={{
        padding: '14px 40px', background: selectedCat ? '#FF6B35' : '#e0e0e0',
        color: selectedCat ? '#fff' : '#999', border: 'none', borderRadius: 10,
        fontWeight: 700, fontSize: 15, cursor: selectedCat ? 'pointer' : 'not-allowed',
      }}>Continue <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /></button>
    </div>
  );
}

function Step2({ data, onChange, onNext, onBack }: any) {
  const [form, setForm] = useState({ title: data.title || '', description: data.description || '', price: data.price || '', negotiable: data.negotiable || false, condition: data.condition || 'used', adType: data.adType || 'sale' });
  const set = (k: string, v: any) => { setForm(f => ({ ...f, [k]: v })); onChange({ ...form, [k]: v }); };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Ad Details</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Tell buyers about your item</p>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Ad Title *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. iPhone 15 Pro Max 256GB" style={inputStyle} />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{form.title.length}/100 characters</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Ad Type *</label>
          <select value={form.adType} onChange={e => set('adType', e.target.value)} style={inputStyle}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="job">Job Posting</option>
            <option value="service">Service</option>
            <option value="free">Free / Giveaway</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Condition *</label>
          <select value={form.condition} onChange={e => set('condition', e.target.value)} style={inputStyle}>
            <option value="new">New</option>
            <option value="used">Used — Excellent</option>
            <option value="used_good">Used — Good</option>
            <option value="used_fair">Used — Fair</option>
            <option value="reconditioned">Reconditioned</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Price (৳) *</label>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0" style={{ ...inputStyle, flex: 1 }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#555', cursor: 'pointer', flexShrink: 0 }}>
            <input type="checkbox" checked={form.negotiable} onChange={e => set('negotiable', e.target.checked)} style={{ accentColor: '#FF6B35', width: 18, height: 18 }} />
            Negotiable
          </label>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Description *</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe your item in detail — condition, features, reason for selling..." rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
        <p style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{form.description.length}/3000 characters</p>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} disabled={!form.title || !form.description || !form.price} style={{ ...nextBtnStyle, opacity: (!form.title || !form.description || !form.price) ? 0.5 : 1 }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function Step3({ data, onChange, onNext, onBack }: any) {
  const [division, setDivision] = useState(data.division || '');
  const [district, setDistrict] = useState(data.district || '');
  const [area, setArea] = useState(data.area || '');

  const update = (d: string, di: string, a: string) => { setDivision(d); setDistrict(di); setArea(a); onChange({ division: d, district: di, area: a }); };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Location</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Where is the item located?</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Division *</label>
          <select value={division} onChange={e => update(e.target.value, '', '')} style={inputStyle}>
            <option value="">Select Division</option>
            {['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>District *</label>
          <select value={district} onChange={e => update(division, e.target.value, '')} style={inputStyle}>
            <option value="">Select District</option>
            {division === 'Dhaka' && ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Narsingdi'].map(d => <option key={d}>{d}</option>)}
            {division === 'Chattogram' && ['Chattogram', "Cox's Bazar", 'Comilla', 'Feni', 'Noakhali'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Area / Thana</label>
        <input value={area} onChange={e => { setArea(e.target.value); onChange({ division, district, area: e.target.value }); }} placeholder="e.g. Gulshan, Banani, Dhanmondi..." style={inputStyle} />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} disabled={!division || !district} style={{ ...nextBtnStyle, opacity: (!division || !district) ? 0.5 : 1 }}>Continue →</button>
      </div>
    </div>
  );
}

function Step4({ onNext, onBack }: any) {
  const [images, setImages] = useState<string[]>([]);
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Add Photos</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Upload up to 8 photos. First photo is the cover image.</p>
      <div style={{
        border: '2px dashed #e0e0e0', borderRadius: 16, padding: 48, textAlign: 'center',
        background: '#f9f9f9', cursor: 'pointer', marginBottom: 16, transition: 'all 0.2s',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#FF6B35'; (e.currentTarget as HTMLDivElement).style.background = '#fff8f5'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e0e0e0'; (e.currentTarget as HTMLDivElement).style.background = '#f9f9f9'; }}
      >
        <Upload size={40} style={{ color: '#FF6B35', marginBottom: 12 }} />
        <p style={{ fontWeight: 700, fontSize: 16, color: '#333', marginBottom: 8 }}>Drop photos here or click to upload</p>
        <p style={{ color: '#888', fontSize: 13 }}>JPG, PNG, WEBP up to 5MB each</p>
        <button style={{ marginTop: 16, padding: '10px 28px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
          Choose Photos
        </button>
      </div>
      <div style={{ background: '#f0f9f4', borderRadius: 12, padding: 16, fontSize: 13, color: '#166534', marginBottom: 24 }}>
        💡 Ads with photos get 5x more responses. Add at least 3 photos.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} style={nextBtnStyle}>Continue →</button>
      </div>
    </div>
  );
}

function Step5({ data, onChange, onNext, onBack }: any) {
  const [form, setForm] = useState({ phone: data.phone || '', whatsapp: data.whatsapp || '', hidePhone: data.hidePhone || false, preferredContact: data.preferredContact || 'call' });
  const set = (k: string, v: any) => { setForm(f => ({ ...f, [k]: v })); onChange({ ...form, [k]: v }); };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Contact Information</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>How should buyers reach you?</p>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Phone Number *</label>
        <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+880 1XXXXXXXXX" style={inputStyle} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>WhatsApp Number (optional)</label>
        <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+880 1XXXXXXXXX" style={inputStyle} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Preferred Contact Method</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ v: 'call', label: '📞 Phone Call' }, { v: 'whatsapp', label: '💬 WhatsApp' }, { v: 'chat', label: '🗨️ Site Chat' }].map(opt => (
            <button key={opt.v} onClick={() => set('preferredContact', opt.v)} style={{
              flex: 1, padding: '10px', border: form.preferredContact === opt.v ? '2px solid #FF6B35' : '1px solid #e0e0e0',
              borderRadius: 10, background: form.preferredContact === opt.v ? '#fff8f5' : '#fff',
              cursor: 'pointer', fontSize: 14, fontWeight: form.preferredContact === opt.v ? 700 : 400,
              color: form.preferredContact === opt.v ? '#FF6B35' : '#555',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#555', marginBottom: 24 }}>
        <input type="checkbox" checked={form.hidePhone} onChange={e => set('hidePhone', e.target.checked)} style={{ accentColor: '#FF6B35', width: 18, height: 18 }} />
        Hide phone number (buyers can only contact via chat)
      </label>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} disabled={!form.phone} style={{ ...nextBtnStyle, opacity: !form.phone ? 0.5 : 1 }}>Preview Ad →</button>
      </div>
    </div>
  );
}

function Step6({ data, onBack, onSubmit }: any) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Preview Your Ad</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Review before posting</p>
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ height: 200, background: 'linear-gradient(135deg, #f0e8ff, #e8f0ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
          {data.categorySlug === 'mobiles' ? '📱' : data.categorySlug === 'vehicles' ? '🚗' : '📦'}
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 600, marginBottom: 8 }}>{data.categorySlug || 'Category'}</p>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#222', marginBottom: 12 }}>{data.title || 'Your Ad Title'}</h3>
          <p style={{ fontSize: 26, fontWeight: 900, color: '#1aab50', marginBottom: 16 }}>৳{parseInt(data.price || '0').toLocaleString()}</p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 16 }}>{data.description || 'Your description...'}</p>
          <div style={{ display: 'flex', gap: 8, fontSize: 13, color: '#888' }}>
            <span>📍 {[data.area, data.district, data.division].filter(Boolean).join(', ') || 'Location not set'}</span>
            <span>· {data.condition || 'Condition'}</span>
          </div>
        </div>
      </div>
      <div style={{ background: '#f0f9ff', borderRadius: 12, padding: 16, fontSize: 13, color: '#1e40af', marginBottom: 24 }}>
        ℹ️ Your ad will be reviewed by our team and typically approved within 1–4 hours.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Edit</button>
        <button onClick={onSubmit} style={{ ...nextBtnStyle, background: '#1aab50' }}>🎉 Post Ad Now</button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 14, color: '#333', marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' };
const nextBtnStyle: React.CSSProperties = { flex: 1, padding: '14px', background: '#FF6B35', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer' };
const backBtnStyle: React.CSSProperties = { padding: '14px 24px', background: '#fff', color: '#555', border: '1px solid #e0e0e0', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer' };

export default function PostAdPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const update = (data: any) => setFormData(f => ({ ...f, ...data }));
  const next = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));
  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#222', marginBottom: 12 }}>Ad Submitted Successfully!</h1>
        <p style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>Your ad is under review and will be published within 1–4 hours.</p>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>We'll notify you once it's live.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/classified/my-ads" style={{ padding: '14px 32px', background: '#FF6B35', color: '#fff', fontWeight: 700, borderRadius: 12, textDecoration: 'none' }}>View My Ads</Link>
          <Link href="/classified" style={{ padding: '14px 32px', border: '1px solid #e0e0e0', color: '#555', fontWeight: 600, borderRadius: 12, textDecoration: 'none' }}>Browse Classifieds</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#222', marginBottom: 4 }}>Post Your Ad</h1>
        <p style={{ color: '#888', fontSize: 15 }}>Free to post · Usually approved in 1–4 hours</p>
      </div>
      <div style={{ background: '#fff', borderRadius: 20, padding: 40, border: '1px solid #e8e8e8', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        <StepIndicator current={step} />
        {step === 0 && <Step1 data={formData} onChange={update} onNext={next} />}
        {step === 1 && <Step2 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 2 && <Step3 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 3 && <Step4 onNext={next} onBack={back} />}
        {step === 4 && <Step5 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 5 && <Step6 data={formData} onBack={back} onSubmit={submit} />}
      </div>
    </div>
  );
}
