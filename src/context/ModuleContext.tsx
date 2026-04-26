'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type ModuleType = 
  | 'grocery' 
  | 'pharmacy' 
  | 'food' 
  | 'shop' 
  | 'parcel' 
  | 'ride' 
  | 'service' 
  | 'classified';

interface ModuleContextType {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  getModuleConfig: () => ModuleConfig;
}

interface ModuleConfig {
  id: ModuleType;
  label: string;
  icon: string;
  color: string;
  themeColor: string;
  href: string;
  description: string;
}

const MODULES_CONFIG: Record<ModuleType, ModuleConfig> = {
  grocery: {
    id: 'grocery',
    label: 'Grocery',
    icon: '🛒',
    color: '#1aab50',
    themeColor: 'var(--primary)',
    href: '/store/category/grocery',
    description: 'Fresh groceries delivered to your door'
  },
  pharmacy: {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: '💊',
    color: '#ef4444',
    themeColor: '#ef4444',
    href: '/store/category/pharmacy',
    description: 'Medicines and healthcare products'
  },
  food: {
    id: 'food',
    label: 'Food',
    icon: '🍕',
    color: '#f59e0b',
    themeColor: '#f59e0b',
    href: '/store/category/food',
    description: 'Delicious meals from your favorite restaurants'
  },
  shop: {
    id: 'shop',
    label: 'Shop',
    icon: '🛍️',
    color: '#3b82f6',
    themeColor: '#3b82f6',
    href: '/store',
    description: 'Wide range of products from verified sellers'
  },
  parcel: {
    id: 'parcel',
    label: 'Parcel',
    icon: '📦',
    color: '#f97316',
    themeColor: '#f97316',
    href: '/parcel',
    description: 'Instant pickup and drop delivery'
  },
  ride: {
    id: 'ride',
    label: 'Ride + Rental',
    icon: '🚗',
    color: '#005555',
    themeColor: '#005555',
    href: '/ride',
    description: 'Ride sharing and vehicle rental'
  },
  service: {
    id: 'service',
    label: 'Service',
    icon: '🛠️',
    color: '#8b5cf6',
    themeColor: '#8b5cf6',
    href: '/service',
    description: 'Professional home services at your doorstep'
  },
  classified: {
    id: 'classified',
    label: 'Classified',
    icon: '📢',
    color: '#0891b2',
    themeColor: '#0891b2',
    href: '/classified',
    description: 'Buy and sell anything in your neighborhood'
  }
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeModule, setActiveModuleState] = useState<ModuleType>('shop');

  // Sync module with pathname on initial load and navigation
  useEffect(() => {
    if (pathname.startsWith('/classified')) {
      setActiveModuleState('classified');
    } else if (pathname.startsWith('/ride')) {
      setActiveModuleState('ride');
    } else if (pathname.startsWith('/parcel')) {
      setActiveModuleState('parcel');
    } else if (pathname.startsWith('/service')) {
      setActiveModuleState('service');
    } else if (pathname.includes('/category/grocery')) {
      setActiveModuleState('grocery');
    } else if (pathname.includes('/category/pharmacy')) {
      setActiveModuleState('pharmacy');
    } else if (pathname.includes('/category/food')) {
      setActiveModuleState('food');
    } else {
      setActiveModuleState('shop');
    }
  }, [pathname]);

  const setActiveModule = (module: ModuleType) => {
    setActiveModuleState(module);
  };

  const getModuleConfig = () => {
    return MODULES_CONFIG[activeModule];
  };

  return (
    <ModuleContext.Provider value={{ activeModule, setActiveModule, getModuleConfig }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
}
