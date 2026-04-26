'use client';

import React, { useState } from 'react';
import { ChevronRight, Check, Upload, MapPin, Tag, FileText, Image, Phone, Loader2 } from 'lucide-react';
import { classifiedService } from '@/services/api/classified';
import { mediaService } from '@/services/api/media';
import { useTranslation } from '@/context/LanguageContext';
import Link from 'next/link';

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
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(data.categoryId || '');
  const [selectedSub, setSelectedSub] = useState(data.subCategoryId || '');
  const [subCategories, setSubCategories] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await classifiedService.getCategories();
        setCategories(res);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const handleCatSelect = (cat: any) => {
    setSelectedCat(cat.id);
    setSelectedSub('');
    setSubCategories(cat.children || []);
    onChange({ categoryId: cat.id, categoryName: cat.name, subCategoryId: '', subCategoryName: '' });
  };

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading categories...</div>;

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Select Category</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Choose the most relevant category for your ad</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => handleCatSelect(cat)} style={{
            padding: '16px 12px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
            border: selectedCat === cat.id ? '2px solid #FF6B35' : '1px solid #e0e0e0',
            background: selectedCat === cat.id ? '#fff8f5' : '#fff',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon || '📦'}</div>
            <p style={{ fontSize: 13, fontWeight: selectedCat === cat.id ? 700 : 500, color: selectedCat === cat.id ? '#FF6B35' : '#333' }}>{cat.name}</p>
          </button>
        ))}
      </div>
      {selectedCat && subCategories.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#333' }}>Sub-category</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {subCategories.map(sub => (
              <button key={sub.id} onClick={() => { setSelectedSub(sub.id); onChange({ subCategoryId: sub.id, subCategoryName: sub.name }); }} style={{
                padding: '8px 20px', borderRadius: 20, cursor: 'pointer', fontSize: 14,
                border: selectedSub === sub.id ? '2px solid #FF6B35' : '1px solid #e0e0e0',
                background: selectedSub === sub.id ? '#fff8f5' : '#fff',
                color: selectedSub === sub.id ? '#FF6B35' : '#555', fontWeight: selectedSub === sub.id ? 700 : 400,
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
          <select title="Ad Type" value={form.adType} onChange={e => set('adType', e.target.value)} style={inputStyle}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="job">Job Posting</option>
            <option value="service">Service</option>
            <option value="free">Free / Giveaway</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Condition *</label>
          <select title="Condition" value={form.condition} onChange={e => set('condition', e.target.value)} style={inputStyle}>
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
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [division, setDivision] = useState(data.divisionId || '');
  const [district, setDistrict] = useState(data.districtId || '');
  const [area, setArea] = useState(data.areaId || '');

  const [districts, setDistricts] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchLocs = async () => {
      try {
        const res = await classifiedService.getLocations();
        setLocations(res);
        
        if (data.divisionId) {
          const div = res.find((l: any) => l.id === data.divisionId);
          if (div) {
            setDistricts(div.children || []);
            if (data.districtId) {
              const dis = div.children?.find((l: any) => l.id === data.districtId);
              if (dis) setAreas(dis.children || []);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocs();
  }, []);

  const handleDivChange = (id: string) => {
    const div = locations.find(l => l.id === id);
    setDivision(id);
    setDistrict('');
    setArea('');
    setDistricts(div?.children || []);
    setAreas([]);
    onChange({ divisionId: id, divisionName: div?.name, districtId: '', districtName: '', areaId: '', areaName: '' });
  };

  const handleDisChange = (id: string) => {
    const dis = districts.find(l => l.id === id);
    setDistrict(id);
    setArea('');
    setAreas(dis?.children || []);
    onChange({ districtId: id, districtName: dis?.name, areaId: '', areaName: '' });
  };

  const handleAreaChange = (id: string) => {
    const a = areas.find(l => l.id === id);
    setArea(id);
    onChange({ areaId: id, areaName: a?.name });
  };

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading locations...</div>;

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Location</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Where is the item located?</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Division *</label>
          <select title="Division" value={division} onChange={e => handleDivChange(e.target.value)} style={inputStyle}>
            <option value="">Select Division</option>
            {locations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>District *</label>
          <select title="District" value={district} onChange={e => handleDisChange(e.target.value)} style={inputStyle} disabled={!division}>
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Area / Thana *</label>
        <select title="Area" value={area} onChange={e => handleAreaChange(e.target.value)} style={inputStyle} disabled={!district}>
          <option value="">Select Area</option>
          {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} disabled={!division || !district || !area} style={{ ...nextBtnStyle, opacity: (!division || !district || !area) ? 0.5 : 1 }}>Continue →</button>
      </div>
    </div>
  );
}

function Step4({ data, onChange, onNext, onBack }: any) {
  const [images, setImages] = useState<any[]>(data.images || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= 8) break;
      try {
        const res = await mediaService.upload(files[i], 'classified');
        newImages.push(res);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    setImages(newImages);
    onChange({ images: newImages });
    setUploading(false);
  };

  const removeImage = (id: string) => {
    const newImages = images.filter(img => img.id !== id);
    setImages(newImages);
    onChange({ images: newImages });
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Add Photos</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Upload up to 8 photos. First photo is the cover image.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {images.map((img, i) => (
          <div key={img.id} style={{ position: 'relative', height: 120, borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
            <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${img.path}`} alt="Ad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => removeImage(img.id)} style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            {i === 0 && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#1aab50', color: '#fff', fontSize: 10, textAlign: 'center', padding: '2px 0', fontWeight: 700 }}>COVER</div>}
          </div>
        ))}
        {images.length < 8 && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ height: 120, borderRadius: 12, border: '2px dashed #e0e0e0', background: '#f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 4 }}
          >
            {uploading ? <Loader2 className="animate-spin text-[#FF6B35]" /> : <><Upload size={24} style={{ color: '#FF6B35' }} /><span style={{ fontSize: 12, color: '#888' }}>Upload</span></>}
          </button>
        )}
      </div>

      <input title="Upload Images" type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" style={{ display: 'none' }} />
      
      <div style={{ background: '#f0f9f4', borderRadius: 12, padding: 16, fontSize: 13, color: '#166534', marginBottom: 24 }}>
        💡 Ads with photos get 5x more responses. Add at least 3 photos.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} disabled={uploading} style={nextBtnStyle}>Continue →</button>
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

function Step6({ data, onBack, onSubmit, loading }: any) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: '#222' }}>Preview Your Ad</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Review before posting</p>
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ height: 240, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {data.images?.[0] ? (
            <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${data.images[0].path}`} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ fontSize: 80 }}>{data.categoryName === 'Mobiles' ? '📱' : '📦'}</div>
          )}
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 600, marginBottom: 8 }}>{data.subCategoryName || data.categoryName || 'Category'}</p>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#222', marginBottom: 12 }}>{data.title || 'Your Ad Title'}</h3>
          <p style={{ fontSize: 26, fontWeight: 900, color: '#1aab50', marginBottom: 16 }}>৳{parseInt(data.price || '0').toLocaleString()}</p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 16, whiteSpace: 'pre-wrap' }}>{data.description || 'Your description...'}</p>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#888' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {data.areaName}, {data.districtName}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Tag size={14} /> {data.condition}</span>
          </div>
        </div>
      </div>
      <div style={{ background: '#f0f9ff', borderRadius: 12, padding: 16, fontSize: 13, color: '#1e40af', marginBottom: 24 }}>
        ℹ️ Your ad will be reviewed by our team and typically approved within 1–4 hours.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} disabled={loading} style={backBtnStyle}>← Edit</button>
        <button onClick={onSubmit} disabled={loading} style={{ ...nextBtnStyle, background: '#1aab50', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : '🎉 Post Ad Now'}
        </button>
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState('');

  const update = (data: any) => setFormData(f => ({ ...f, ...data }));
  const next = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        negotiable: formData.negotiable,
        condition: formData.condition,
        adType: formData.adType,
        classifiedCategoryId: formData.subCategoryId || formData.categoryId,
        locationId: formData.areaId,
        division: formData.divisionName,
        district: formData.districtName,
        area: formData.areaName,
        contactPhone: formData.phone,
        whatsappNumber: formData.whatsapp,
        hidePhone: formData.hidePhone,
        preferredContact: formData.preferredContact,
        mediaIds: formData.images?.map((img: any) => img.path) || [],
      };

      await classifiedService.createAd(payload);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Failed to post ad:', err);
      setError(err.response?.data?.message || 'Failed to post ad. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: 12, marginBottom: 20, fontSize: 14 }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 20, padding: 40, border: '1px solid #e8e8e8', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        <StepIndicator current={step} />
        {step === 0 && <Step1 data={formData} onChange={update} onNext={next} />}
        {step === 1 && <Step2 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 2 && <Step3 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 3 && <Step4 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 4 && <Step5 data={formData} onChange={update} onNext={next} onBack={back} />}
        {step === 5 && (
          <Step6 
            data={formData} 
            onBack={back} 
            onSubmit={submit} 
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
