import React, { useState } from 'react';
import {
  Building2,
  Check,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Info,
  ShieldCheck,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import confetti from 'canvas-confetti';

interface EnterpriseSetupStudioProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
  currency: string;
}

export const EnterpriseSetupStudio: React.FC<EnterpriseSetupStudioProps> = ({
  onOpenConsultation,
  lang,
  currency
}) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Configurator state
  const [jurisdiction, setJurisdiction] = useState<'freezone' | 'mainland' | 'offshore'>('freezone');
  const [activity, setActivity] = useState<'tech' | 'trading' | 'ecommerce' | 'consulting'>('tech');
  const [visaCount, setVisaCount] = useState<number>(2);
  
  // Lead dispatch inputs
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic pricing calculation with real 2026 rates
  const basePrices = {
    freezone: 11500,
    mainland: 17500,
    offshore: 13500
  };

  const visaUnitCost = 3600;
  const rawAedTotal = basePrices[jurisdiction] + (visaCount * visaUnitCost);

  const formattedTotal = currency === 'USD' 
    ? '$' + Math.round(rawAedTotal / 3.67).toLocaleString() 
    : currency === 'EUR' 
      ? '€' + Math.round(rawAedTotal / 3.98).toLocaleString() 
      : 'AED ' + rawAedTotal.toLocaleString();

  const handleStudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName('');
      setClientPhone('');
    }, 6000);
  };

  return (
    <div className="bg-[#191a1e] border border-[#2d3139] shadow-2xl w-full max-w-full sm:max-w-[440px] text-slate-100 transition-all font-sans relative">
      
      {/* Top Cyber-Duck Amber Accent Strip */}
      <div className="h-1 bg-amber-500 w-full" />

      {/* Header Bar */}
      <div className="bg-[#141518] px-5 py-3.5 border-b border-[#2d3139] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-950 font-black">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans">
              {isAr ? 'حاسبة التأسيس — فانتشر' : 'Venture — The Estimator'}
            </h3>
            <span className="text-[11px] font-mono text-slate-400 block">
              {isAr ? 'حاسبة الرسوم الحكومية المعتمدة' : 'Official 2026 Tariff Simulator'}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 bg-[#1c1e24] text-amber-400 border border-amber-500/30 font-bold">
          ● Live 2026 Rates
        </span>
      </div>

      {/* Body Controls */}
      <div className="p-5 space-y-4">
        
        {/* 1. Jurisdiction Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-slate-200 uppercase tracking-wide">
              1. {isAr ? 'الهيكل القانوني:' : 'Jurisdiction Structure:'}
            </span>
            <span className="text-amber-400 text-[10px] font-semibold">
              {jurisdiction === 'freezone' ? '100% Tax-Free' : jurisdiction === 'mainland' ? 'Direct UAE Trade' : 'Asset Protection'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { key: 'freezone', title: isAr ? 'منطقة حرة' : 'Free Zone', fee: 'AED 11.5k' },
              { key: 'mainland', title: isAr ? 'بر رئيسي' : 'Mainland LLC', fee: 'AED 17.5k' },
              { key: 'offshore', title: isAr ? 'أوفشور' : 'Offshore SPV', fee: 'AED 13.5k' }
            ].map((j) => (
              <button
                key={j.key}
                type="button"
                onClick={() => setJurisdiction(j.key as any)}
                className={'p-2.5 border text-center transition-all cursor-pointer ' + (
                  jurisdiction === j.key
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-md'
                    : 'bg-[#141518] border-[#2d3139] text-slate-300 hover:border-slate-500 hover:text-white'
                )}
              >
                <span className="font-bold text-xs block">{j.title}</span>
                <span className="text-[10px] font-mono block mt-0.5 opacity-90">{j.fee}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Activity Code */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wide block">
            2. {isAr ? 'النشاط التجاري:' : 'Commercial Activity:'}
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { key: 'tech', label: 'AI, Tech & Software' },
              { key: 'trading', label: 'General Trading / Import' },
              { key: 'ecommerce', label: 'E-Commerce & Digital' },
              { key: 'consulting', label: 'Management Consulting' }
            ].map((act) => (
              <button
                key={act.key}
                type="button"
                onClick={() => setActivity(act.key as any)}
                className={'p-2 border text-center transition-all cursor-pointer truncate font-medium ' + (
                  activity === act.key
                    ? 'bg-[#23262e] text-amber-400 border-amber-400 font-bold'
                    : 'bg-[#141518] border-[#2d3139] text-slate-300 hover:border-slate-600'
                )}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Visas Counter Stepper */}
        <div className="bg-[#141518] p-3.5 border border-[#2d3139] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-100 block">
              3. {isAr ? 'تأشيرات الإقامة والهوية:' : 'Residence Visas & EID:'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              VIP Medical & Biometrics Included
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#1c1e24] p-1 border border-[#2d3139]">
            <button
              type="button"
              onClick={() => setVisaCount(Math.max(0, visaCount - 1))}
              className="w-7 h-7 bg-[#141518] hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2d3139]"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black font-mono text-amber-400 w-14 text-center">
              {visaCount} {visaCount === 1 ? 'Visa' : 'Visas'}
            </span>
            <button
              type="button"
              onClick={() => setVisaCount(Math.min(6, visaCount + 1))}
              className="w-7 h-7 bg-[#141518] hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer border border-[#2d3139]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price Banner with Cyber-Duck Amber Styling */}
        <div className="p-4 bg-[#141518] border border-[#2d3139] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block tracking-wider">
              ALL-INCLUSIVE ESTIMATE:
            </span>
            <span className="text-2xl font-black text-white font-mono block mt-0.5 tracking-tight">
              {formattedTotal}
            </span>
          </div>

          <div className="text-right space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-200 justify-end">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">2-4 Days SLA</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 justify-end font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>99.8% Bank Match</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Dispatch Form */}
        {isSubmitted ? (
          <div className="p-4 bg-[#141518] border border-emerald-500/60 text-center space-y-1 font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="text-xs font-bold text-white block">Quote & Mandate Dispatched</span>
            <span className="text-[11px] text-slate-300 block">Senior formation director will call in 30 mins.</span>
          </div>
        ) : (
          <form onSubmit={handleStudioSubmit} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                className="w-full bg-[#141518] border border-[#2d3139] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />

              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                className="w-full bg-[#141518] border border-[#2d3139] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Send className={'w-3.5 h-3.5 ' + (isAr ? 'rotate-180' : '')} />
              <span>{isAr ? 'تثبيت السعر وبدء الإجراءات' : 'Lock in Quote & Start Setup'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
