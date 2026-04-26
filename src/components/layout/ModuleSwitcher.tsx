'use client';

import React from 'react';
import Link from 'next/link';
import { useModule, ModuleType } from '@/context/ModuleContext';
import { cn } from '@/lib/utils';
import { 
  ShoppingBag, 
  Car, 
  Utensils, 
  Pizza, 
  Package, 
  Stethoscope, 
  Wrench, 
  Megaphone,
  LayoutGrid
} from 'lucide-react';

const MODULES: { id: ModuleType; label: string; icon: any; color: string }[] = [
  { id: 'grocery', label: 'Grocery', icon: ShoppingBag, color: '#1aab50' },
  { id: 'pharmacy', label: 'Pharmacy', icon: Stethoscope, color: '#ef4444' },
  { id: 'food', label: 'Food', icon: Utensils, color: '#f59e0b' },
  { id: 'shop', label: 'Shop', icon: ShoppingBag, color: '#3b82f6' },
  { id: 'parcel', label: 'Parcel', icon: Package, color: '#f97316' },
  { id: 'ride', label: 'Ride + Rental', icon: Car, color: '#005555' },
  { id: 'service', label: 'Service', icon: Wrench, color: '#8b5cf6' },
  { id: 'classified', label: 'Classified', icon: Megaphone, color: '#0891b2' },
];

export function ModuleSwitcher() {
  const { activeModule, setActiveModule } = useModule();

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2">
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        const isActive = activeModule === mod.id;
        
        return (
          <Link
            key={mod.id}
            href={mod.id === 'shop' ? '/store' : (mod.id === 'grocery' || mod.id === 'pharmacy' || mod.id === 'food' ? `/store/category/${mod.id}` : `/${mod.id}`)}
            onClick={() => setActiveModule(mod.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200",
              isActive 
                ? "bg-white text-[var(--foreground)] shadow-sm border border-[var(--border)]" 
                : "text-white/80 hover:text-white hover:bg-white/10"
            )}
            style={isActive ? { borderLeft: `3px solid ${mod.color}` } : {}}
          >
            <Icon className="w-4 h-4" />
            <span>{mod.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
