'use client';

import React from 'react';
import { useModuleStore } from '@/store/moduleStore';
import { ModuleIconButton } from '../modules/ModuleIconButton';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingModuleDock() {
  const { activeModule, setActiveModule, modules } = useModuleStore();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none hidden md:block">
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-3 rounded-[32px] flex flex-col gap-4 shadow-2xl pointer-events-auto"
      >
        {modules.map((mod) => (
          <ModuleIconButton
            key={mod.id}
            id={mod.id}
            label={mod.label}
            icon={mod.icon}
            color={mod.color}
            href={mod.href}
            isActive={activeModule === mod.id}
            onClick={() => setActiveModule(mod.id as any)}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Mobile Version (Bottom Dock)
export function MobileModuleDock() {
  const { activeModule, setActiveModule, modules } = useModuleStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] md:hidden w-[calc(100%-48px)] max-w-lg">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-2 rounded-[28px] flex items-center justify-between shadow-2xl pointer-events-auto overflow-x-auto no-scrollbar gap-2"
      >
        {modules.map((mod) => (
          <ModuleIconButton
            key={mod.id}
            id={mod.id}
            label={mod.label}
            icon={mod.icon}
            color={mod.color}
            href={mod.href}
            isActive={activeModule === mod.id}
            onClick={() => setActiveModule(mod.id as any)}
          />
        ))}
      </motion.div>
    </div>
  );
}
