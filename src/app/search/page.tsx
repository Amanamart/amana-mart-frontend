'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SearchResponse } from '@/types/search';
import { Package, Store, Tag, Star, Clock, Filter } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from 'react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const module = searchParams.get('module') || '';
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/search?q=${query}&module=${module}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query, module]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={18} className="text-primary" />
                <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm">Filters</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-xs text-gray-400 uppercase mb-4 tracking-wider">Module</h3>
                  <div className="space-y-2">
                    {['all', 'grocery', 'pharmacy', 'food', 'ecommerce', 'classified'].map((m) => (
                      <button 
                        key={m}
                        className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                          (module || 'all') === m ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
                  Search results for <span className="text-primary">&quot;{query}&quot;</span>
                </h1>
                <p className="text-gray-500 font-medium">
                  Found {data?.total || 0} results in {data?.processingTimeMs || 0}ms
                  {data?.mode === 'fallback_postgres' && (
                    <span className="ml-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                      Fallback Mode
                    </span>
                  )}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4" />
                    <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-full mb-4" />
                    <div className="h-6 bg-gray-100 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : data?.results.length === 0 ? (
              <div className="bg-white rounded-[48px] p-20 text-center shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={48} className="text-gray-200" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto font-medium">We couldn&apos;t find anything matching your search. Try checking for typos or using broader keywords.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 h-14 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  BACK TO HOME
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.results.map((item: any) => (
                  <Link 
                    key={item.id} 
                    href={item.type === 'product' ? `/product/${item.slug}` : `/classified/${item.slug}`}
                    className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div className="aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        {item.type === 'product' ? <Package size={12} className="text-primary" /> : <Tag size={12} className="text-amber-500" />}
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.module}</span>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 font-medium line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black text-gray-900">৳{item.price}</p>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black">{item.rating || 4.5}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Searching...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

function Search({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}
