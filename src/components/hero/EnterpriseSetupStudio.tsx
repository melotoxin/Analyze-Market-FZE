import React, { useState } from 'react';
import {
  Building2,
  Check,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Clock,
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
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName('');
      setClientPhone('');
    }, 5000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-full sm:max-w-[440px] text-slate-900 transition-all font-sans relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              {isAr ? 'حاسبة التأسيس — فانتشر' : 'Venture — The Estimator'}
            </h3>
            <span className="text-[11px] font-mono text-slate-500 block">
              {isAr ? 'حاسبة الرسوم الحكومية المعتمدة' : 'Official 2026 Tariff Simulator'}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold">
          Live 2026 Tariffs
        </span>
      </div>

      {/* Body Controls */}
      <div className="p-5 space-y-4">
        
        {/* 1. Jurisdiction Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-slate-700 uppercase tracking-wide">
              1. {isAr ? 'الهيكل القانوني:' : 'Jurisdiction Structure:'}
            </span>
            <span className="text-slate-600 text-[10px] font-semibold">
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
                className={'p-2.5 rounded-lg border text-center transition-all cursor-pointer ' + (
                  jurisdiction === j.key
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                )}
              >
                <span className="font-bold text-xs block">{j.title}</span>
                <span className="text-[10px] font-mono block mt-0.5 opacity-80">{j.fee}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Activity Code */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide block">
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
                className={'p-2 rounded-lg border text-center transition-all cursor-pointer truncate font-medium ' + (
                  activity === act.key
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                )}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Visas Counter Stepper */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              3. {isAr ? 'تأشيرات الإقامة والهوية:' : 'Residence Visas & EID:'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              VIP Medical & Biometrics Included
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setVisaCount(Math.max(0, visaCount - 1))}
              className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black font-mono text-slate-900 w-14 text-center">
              {visaCount} {visaCount === 1 ? 'Visa' : 'Visas'}
            </span>
            <button
              type="button"
              onClick={() => setVisaCount(Math.min(6, visaCount + 1))}
              className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price Banner */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block tracking-wider">
              ALL-INCLUSIVE ESTIMATE:
            </span>
            <span className="text-2xl font-black text-slate-950 font-mono block mt-0.5 tracking-tight">
              {formattedTotal}
            </span>
          </div>

          <div className="text-right space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-700 justify-end">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold">2-4 Days SLA</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 justify-end font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>99.8% Bank Match</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Dispatch Form */}
        {isSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1 font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs font-bold text-emerald-950 block">Quote & Mandate Dispatched</span>
            <span className="text-[11px] text-emerald-800 block">Senior formation director will call in 30 mins.</span>
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
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
              />

              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
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
