'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ModuleIconButtonProps {
  id: string;
  label: string;
  icon: string;
  color: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

export function ModuleIconButton({
  id,
  label,
  icon,
  color,
  href,
  isActive,
  onClick
}: ModuleIconButtonProps) {
  return (
    <div className="relative group flex items-center justify-center">
      {/* Tooltip */}
      <div className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
        {label}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
      </div>

      <Link
        href={href}
        onClick={onClick}
        className={twMerge(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden",
          isActive 
            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
            : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-slate-200"
        )}
      >
        {/* Active Indicator Pulse */}
        {isActive && (
          <motion.div
            layoutId="active-bg"
            className="absolute inset-0 bg-slate-900"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        <span className="relative z-10 text-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>

        {/* Bottom indicator for active */}
        {isActive && (
          <div 
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </Link>
    </div>
  );
}
