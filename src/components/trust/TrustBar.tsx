import React, { useState } from 'react';
import { Building2, ShieldCheck, Landmark, CheckCircle2, Award, ExternalLink, Zap } from 'lucide-react';
import { Language } from '../../data/translations';

interface TrustBarProps {
  lang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const partners = [
    {
      name: 'SRTI Innovation Park',
      sub: 'Sharjah, UAE',
      status: 'Official HQ & Free Zone Hub',
      sla: 'Direct Fast-Track Licensing',
      type: 'Government Innovation Cluster',
      url: 'https://srtip.ae/',
      verified: true
    },
    {
      name: 'Sharjah SEDD',
      sub: 'Economic Development',
      status: 'Accredited Mainland Authority',
      sla: 'Notarized MOA & Commercial Registry',
      type: 'Sharjah Government Entity',
      url: 'https://sedd.ae/',
      verified: true
    },
    {
      name: 'Dubai Economy (DET)',
      sub: 'Government of Dubai',
      status: 'Mainland Commercial Licensing',
      sla: 'Instant Trade Name & Security Approval',
      type: 'Dubai Government Entity',
      url: 'https://www.economy-dubai.ae/',
      verified: true
    },
    {
      name: 'Emirates NBD',
      sub: 'Tier-1 Banking Partner',
      status: 'Corporate Banking Dedicated Channel',
      sla: 'Multi-Currency IBAN Clearance',
      type: 'Central Bank Regulated',
      url: 'https://www.emiratesnbd.com/',
      verified: true
    },
    {
      name: 'Wio Business Bank',
      sub: 'UAE Digital Banking',
      status: 'Instant Digital Corporate Accounts',
      sla: '24-48h IBAN Activation',
      type: 'UAE Digital Tier-1 Partner',
      url: 'https://wio.io/business/',
      verified: true
    },
    {
      name: 'Mashreq Bank',
      sub: 'Neo Corporate Banking',
      status: 'Trade Finance & Global FX Channel',
      sla: 'SWIFT & Regional Merchant Gateway',
      type: 'Central Bank Regulated',
      url: 'https://www.mashreq.com/',
      verified: true
    },
    {
      name: 'FTA UAE',
      sub: 'Federal Tax Authority',
      status: 'Registered Corporate Tax Compliance',
      sla: '9% Corporate Tax & VAT Agent Audits',
      type: 'Federal Authority',
      url: 'https://tax.gov.ae/',
      verified: true
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-slate-100/90 dark:bg-[#060a17]/90 border-y border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Information */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'الجهات الحكومية والشركاء المصرفيون' : 'Government Authorities & Banking Partners'}</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'معتمدون رسمياً لجميع الإجراءات والتراخيص وتفعيل الحسابات البنكية' : 'Officially Accredited for Turnkey UAE Licensing & Corporate Banking'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {isAr ? 'انقر على أي جهة لزيارة بوابتها الرسمية أو مرر المؤشر لمعاينة مسار التكامل' : 'Click anywhere on any card to open the official authority portal, or hover for real-time SLA.'}
          </p>
        </div>

        {/* Clean, Minimalist Cards with Direct External Links & Status Popover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 sm:gap-4">
          {partners.map((p, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/[0.08] hover:border-sky-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer group shadow-md hover:shadow-sky-500/25 hover:-translate-y-1 block text-left no-underline"
              >
                
                {/* Clean Face */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors leading-tight">
                      {p.name}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {p.sub}
                  </p>
                </div>

                {/* Floating Hidden Status Popover */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-slate-950 border border-sky-500/40 rounded-2xl p-3.5 shadow-2xl z-50 animate-scaleUp pointer-events-none text-left font-sans">
                    
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Integrated</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{p.type}</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Status Channel:</span>
                        <span className="text-white font-bold text-[11px] block">{p.status}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Accredited SLA:</span>
                        <span className="text-sky-300 font-medium text-[11px] block">{p.sla}</span>
                      </div>
                    </div>

                    {/* Triangle Arrow indicator */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-slate-950 border-t-8 border-x-transparent border-x-8 border-b-0" />
                  </div>
                )}

              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
