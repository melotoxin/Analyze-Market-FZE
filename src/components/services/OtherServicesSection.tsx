import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Award,
  RefreshCw,
  Receipt,
  FileCheck2,
  Calculator,
  XCircle,
  Building2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../../data/translations';

interface OtherServicesSectionProps {
  onOpenConsultation: (serviceName?: string) => void;
  lang: Language;
}

export const OtherServicesSection: React.FC<OtherServicesSectionProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';

  return (
    <section id="other-services" className="py-24 sm:py-32 bg-[#050811] border-t border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with n8n typography */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'خدمات الشركات المتكاملة' : 'Complete Corporate Lifecycle'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'حلول مؤسسية شاملة تحت سقف واحد' : (
              <>
                <span className="font-light text-slate-300">End-to-end services </span>
                <span className="font-bold text-white">beyond incorporation</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isAr 
              ? 'من تأسيس الشركة حتى الإقامة الذهبية والامتثال الضريبي والمحاسبة المستمرة مع أنالايز ماركتس ش.م.ح.'
              : 'From 10-year Golden Visas and FTA corporate tax filing to ongoing statutory audit and cloud bookkeeping.'
            }
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: 10-Year Golden Visa (Featured 7 Cols) */}
          <div className="md:col-span-7 bg-gradient-to-br from-[#0c1630] via-[#0b1329] to-[#070b16] border border-amber-500/30 hover:border-amber-400/60 rounded-3xl p-8 flex flex-col justify-between transition-all group motion-card relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  10-Year Long-Term Residence
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-sans group-hover:text-amber-300 transition-colors">
                  {isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'UAE 10-Year Golden Visa Services'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                  {isAr 
                    ? 'إقامة طويلة الأمد لمدة 10 سنوات للمستثمرين العقاريين ورواد الأعمال والمدراء التنفيذيين والنوابغ، مع كفالة كاملة للأسرة والعمالة المساعدة دون الحاجة لكفيل محلي.'
                    : 'Turnkey 10-year Golden Visa nomination & VIP VIP medical escort for property investors (AED 2M+), executive founders, software engineers, and specialized talent with full family sponsorship.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Sponsor-Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Family Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VIP Fast-Track</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between relative z-10">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Direct ICP & GDRFA Verification
              </span>

              <button
                onClick={() => onOpenConsultation('Golden Visa Services')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>{isAr ? 'التحقق من الأهلية' : 'Check Eligibility'}</span>
                <ArrowRight className={'w-3.5 h-3.5 ' + (isAr ? 'rotate-180' : '')} />
              </button>
            </div>
          </div>

          {/* Card 2: VAT & 9% Corporate Tax Filing (5 Cols) */}
          <div className="md:col-span-5 bg-[#0b1329] border border-sky-500/30 hover:border-sky-400 rounded-3xl p-7 flex flex-col justify-between transition-all group motion-card shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Receipt className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  FTA Compliant
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans group-hover:text-sky-300 transition-colors">
                  {isAr ? 'ضريبة الشركات والإقرارات الضريبية' : 'VAT & 9% Corporate Tax Filing'}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  End-to-end Federal Tax Authority (FTA) corporate tax registration, quarterly VAT filings, and qualifying Free Zone income (QFZP) tax optimization.
                </p>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-300 pt-2 border-t border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Corporate Tax Registration:</span>
                  <span className="text-emerald-400 font-bold">Guaranteed FTA TRN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">QFZP 0% Tax Structuring:</span>
                  <span className="text-white font-bold">100% Compliant</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => onOpenConsultation('VAT & Corporate Tax Services')}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isAr ? 'طلب الخدمة الضريبية' : 'Request Tax Advisory'}</span>
                <ArrowRight className={'w-3.5 h-3.5 ' + (isAr ? 'rotate-180' : '')} />
              </button>
            </div>
          </div>

          {/* Card 3: License Renewal & PRO (4 Cols) */}
          <div className="md:col-span-4 bg-[#0b1329] border border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all group motion-card shadow-lg">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 w-fit">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans group-hover:text-sky-300 transition-colors">
                {isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'License Renewal & PRO Services'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expedited annual trade license renewals, Ejari registration, government approvals, and corporate shareholder amendments.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/[0.08]">
              <button
                onClick={() => onOpenConsultation('License Renewal (PRO)')}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Request PRO Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Audit & Assurance Services (4 Cols) */}
          <div className="md:col-span-4 bg-[#0b1329] border border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all group motion-card shadow-lg">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 w-fit">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans group-hover:text-emerald-300 transition-colors">
                {isAr ? 'خدمات التدقيق والضمان المالي' : 'Statutory Audit & Assurance'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Certified annual audit reports and financial assurance accepted across all UAE commercial banks, Free Zone authorities, and federal ministries.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/[0.08]">
              <button
                onClick={() => onOpenConsultation('Audit & Assurance Services')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Request Audit Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Accounting & Company Liquidation (4 Cols) */}
          <div className="md:col-span-4 bg-[#0b1329] border border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all group motion-card shadow-lg">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 w-fit">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                {isAr ? 'المحاسبة ومسك الدفاتر المالية' : 'Cloud Accounting & Bookkeeping'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monthly P&L reporting, balance sheet reconciliations, WPS compliant payroll, and complete liquidation/deregistration when required.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/[0.08]">
              <button
                onClick={() => onOpenConsultation('Accounting Services')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Request Accounting Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
