'use client';

import { useTranslation } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
      <Globe size={16} className="text-white/70" />
      <button
        onClick={() => setLang('en')}
        className={`text-xs font-medium transition-colors ${
          lang === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'
        }`}
      >
        EN
      </button>
      <div className="w-[1px] h-3 bg-white/20" />
      <button
        onClick={() => setLang('bn')}
        className={`text-xs font-medium transition-colors ${
          lang === 'bn' ? 'text-white' : 'text-white/50 hover:text-white/80'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
