import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sun, Moon, Globe, DollarSign, Bell, ShieldCheck, Check } from 'lucide-react';
import { Language } from '../../data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onSetLanguage: (l: Language) => void;
  currency: string;
  onSetCurrency: (c: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
  lang,
  onSetLanguage,
  currency,
  onSetCurrency
}) => {
  const isAr = lang === 'ar';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAr ? 'الإعدادات والتفضيلات' : 'Settings & Preferences'}
      subtitle={isAr ? 'تخصيص المظهر واللغة والعملة' : 'Customize theme, language, and currency'}
      maxWidth="md"
    >
      <div className="space-y-6 font-sans">
        
        {/* 1. Language Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-sky-500" />
            <span>{isAr ? 'اللغة / Language' : 'Display Language'}</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSetLanguage('en')}
              className={'p-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ' + (
                lang === 'en'
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'bg-white dark:bg-[#111c33] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:border-sky-400'
              )}
            >
              <span className="flex items-center gap-2">🇬🇧 English</span>
              {lang === 'en' && <Check className="w-4 h-4 text-sky-500" />}
            </button>

            <button
              onClick={() => onSetLanguage('ar')}
              className={'p-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ' + (
                lang === 'ar'
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'bg-white dark:bg-[#111c33] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:border-sky-400'
              )}
            >
              <span className="flex items-center gap-2">🇦🇪 العربية (RTL)</span>
              {lang === 'ar' && <Check className="w-4 h-4 text-sky-500" />}
            </button>
          </div>
        </div>

        {/* 2. Theme Mode Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-sky-500" />
            <span>{isAr ? 'مظهر المنصة (المظهر الداكن / المشرق)' : 'Color Theme'}</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { if (!isDarkMode) onToggleTheme(); }}
              className={'p-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ' + (
                isDarkMode
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'bg-white dark:bg-[#111c33] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:border-sky-400'
              )}
            >
              <span className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-sky-400" />
                <span>{isAr ? 'الوضع الداكن (Dark)' : 'Dark Navy Theme'}</span>
              </span>
              {isDarkMode && <Check className="w-4 h-4 text-sky-500" />}
            </button>

            <button
              onClick={() => { if (isDarkMode) onToggleTheme(); }}
              className={'p-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ' + (
                !isDarkMode
                  ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'bg-white dark:bg-[#111c33] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:border-sky-400'
              )}
            >
              <span className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'الوضع المشرق (Bright)' : 'Bright Light Mode'}</span>
              </span>
              {!isDarkMode && <Check className="w-4 h-4 text-sky-500" />}
            </button>
          </div>
        </div>

        {/* 3. Currency Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-sky-500" />
            <span>{isAr ? 'العملة المعروضة' : 'Preferred Currency'}</span>
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
            {['AED', 'USD', 'EUR'].map((c) => (
              <button
                key={c}
                onClick={() => onSetCurrency(c)}
                className={'p-2.5 rounded-xl border text-center transition-all cursor-pointer ' + (
                  currency === c
                    ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-[#111c33] border-slate-200 dark:border-[#1e293b] text-slate-700 dark:text-slate-300 hover:border-sky-400'
                )}
              >
                {c === 'AED' ? 'AED (د.إ)' : c === 'USD' ? 'USD ($)' : 'EUR (€)'}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-[#1e293b] flex justify-end">
          <Button onClick={onClose} variant="primary" size="md" className="font-semibold">
            {isAr ? 'حفظ وإغلاق' : 'Save & Close'}
          </Button>
        </div>

      </div>
    </Modal>
  );
};
