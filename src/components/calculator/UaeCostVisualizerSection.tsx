import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Coins,
  Clock
} from 'lucide-react';
import { formatMoney } from '../../data/pricing';
import { Language } from '../../data/translations';

interface UaeCostVisualizerSectionProps {
  lang?: Language;
  currency?: string;
  onOpenConsultation: (topic?: string) => void;
}

export const UaeCostVisualizerSection: React.FC<UaeCostVisualizerSectionProps> = ({
  lang = 'en',
  currency = 'AED',
  onOpenConsultation
}) => {
  const isAr = lang === 'ar';

  const [jurisdiction, setJurisdiction] = useState<'freezone' | 'mainland' | 'offshore'>('freezone');
  const [visas, setVisas] = useState(2);
  const [officeType, setOfficeType] = useState<'flexi' | 'smart' | 'dedicated'>('flexi');

  // Base pricing matrix in AED
  const baseCost = {
    freezone: 11500,
    mainland: 17500,
    offshore: 13500
  }[jurisdiction];

  const visaCost = visas * 3600;

  const officeCost = {
    flexi: 0,
    smart: 4500,
    dedicated: 15000
  }[officeType];

  const totalAed = baseCost + visaCost + officeCost;

  // Rates live in data/pricing.ts; this component used to carry its own copy.
  const convertedTotal = formatMoney(totalAed, currency);
  const convertedMonthly = formatMoney(totalAed / 12, currency);

  return (
    <section id="cost-calculator" className="py-20 sm:py-28 bg-white border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Calculator className="w-3.5 h-3.5 text-slate-700" />
            <span>06 / Cost & Tariff Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'احسب تكلفة تأسيس شركتك بدقة وشفافية' : 'Simulate your exact UAE setup investment'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'احصل على تفصيل دقيق لرسوم التراخيص الحكومية وحصص التأشيرات وخيارات المساحات المكتبية دون أي رسوم مخفية.'
              : 'Calculate government licensing tariffs, residency quotas, and workspace requirements with live currency conversion.'
            }
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Controls */}
          <div className="lg:col-span-7 bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* 1. Jurisdiction Choice */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 block">
                1. Select Legal Jurisdiction:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'freezone', label: 'Free Zone (40+ Zones)', sub: '0% Corporate Tax (QFZP)' },
                  { id: 'mainland', label: 'Mainland LLC', sub: 'Direct UAE Local Trade' },
                  { id: 'offshore', label: 'Offshore SPV', sub: 'Asset & IP Holding' }
                ].map((j) => (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => setJurisdiction(j.id as any)}
                    className={'p-4 rounded-xl border text-start transition-all cursor-pointer ' + (
                      jurisdiction === j.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                    )}
                  >
                    <span className="font-bold text-xs sm:text-sm block">{j.label}</span>
                    <span className={'text-[10px] font-mono mt-1 block ' + (jurisdiction === j.id ? 'text-slate-300' : 'text-slate-500')}>
                      {j.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Visa Allocation Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase text-slate-700">
                  2. Executive & Investor Visas:
                </label>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
                  {visas} {visas === 1 ? 'Visa' : 'Visas'}
                </span>
              </div>
              <input
                type="range"
                aria-label="Number of residence visas"
                min={0}
                max={6}
                value={visas}
                onChange={(e) => setVisas(parseInt(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 Visas (Solo Holding)</span>
                <span>2 Visas (Standard Partners)</span>
                <span>4 Visas (Co-Founders)</span>
                <span>6+ Visas (Enterprise Team)</span>
              </div>
            </div>

            {/* 3. Office & Workspace Requirements */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 block">
                3. Workspace Facility:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'flexi', label: 'Flexi-Desk (Included)', sub: 'Zero Lease Overhead' },
                  { id: 'smart', label: 'Smart Executive Office', sub: 'Sharjah / Dubai Innovation' },
                  { id: 'dedicated', label: 'Dedicated Corporate Suite', sub: 'Full Commercial Lease' }
                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOfficeType(o.id as any)}
                    className={'p-4 rounded-xl border text-start transition-all cursor-pointer ' + (
                      officeType === o.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                    )}
                  >
                    <span className="font-bold text-xs block">{o.label}</span>
                    <span className={'text-[10px] font-mono mt-1 block ' + (officeType === o.id ? 'text-slate-300' : 'text-slate-500')}>
                      {o.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Dynamic Output Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                Total Estimated Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-950">
                  {convertedTotal}
                </span>
                <span className="text-xs font-mono text-slate-500">/ 1st Year Turnkey</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                <Coins className="w-3.5 h-3.5" />
                <span>Equivalent to ~{convertedMonthly} / month</span>
              </span>
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-600">
                <span>Government Trade License:</span>
                <span className="font-bold text-slate-900">{formatMoney(baseCost, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Residency Visas ({visas}):</span>
                <span className="font-bold text-slate-900">{formatMoney(visaCost, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Workspace Facility:</span>
                <span className="font-bold text-slate-900">{officeCost === 0 ? 'Included (Free)' : formatMoney(officeCost, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 font-bold pt-2 border-t border-slate-100">
                <span>Corporate Tax (QFZP Exemption):</span>
                <span>0% Eligible</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fixed Pricing Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Includes MOA notarization, immigration file, VIP concierge, and guaranteed bank account approval.
              </p>
            </div>

            <button
              onClick={() => onOpenConsultation(`Custom Setup: ${jurisdiction.toUpperCase()} with ${visas} Visas (${convertedTotal})`)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>Lock In This Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
