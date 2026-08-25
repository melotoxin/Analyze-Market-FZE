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
  CheckCircle2,
  FileText,
  FileSpreadsheet
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

  const services = [
    {
      id: 'golden-visa',
      colSpan: 'md:col-span-7',
      title: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services',
      tag: '10-Year Long-Term Residence',
      tagColor: 'amber',
      desc: isAr 
        ? 'إقامة طويلة الأمد لمدة 10 سنوات للمستثمرين العقاريين (2 مليون درهم+) ورواد الأعمال والمدراء التنفيذيين والنوابغ، مع كفالة كاملة للأسرة دون الحاجة لكفيل محلي.'
        : 'Turnkey 10-year Golden Visa processing for property investors (AED 2M+), enterprise founders, senior executives, and specialized talent with 100% family sponsorship.',
      features: ['100% Sponsor-Free', 'Full Family & Staff Sponsorship', 'VIP Medical & Biometrics'],
      actionLabel: isAr ? 'التحقق من الأهلية' : 'Check Eligibility',
      icon: Award,
      featured: true
    },
    {
      id: 'tax-vat',
      colSpan: 'md:col-span-5',
      title: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services',
      tag: 'FTA Registered Agent',
      tagColor: 'sky',
      desc: isAr
        ? 'تسجيل رقم ضريبي (TRN)، إقرارات ضريبة الشركات بنسبة 9%، استيفاء شروط الوجود الاقتصادي، وإقرارات ضريبة القيمة المضافة الربع سنوية.'
        : 'Federal Tax Authority (FTA) TRN registration, 9% Corporate Tax filing, Qualifying Free Zone Person (QFZP) 0% optimization, and quarterly VAT returns.',
      features: ['Official FTA TRN Number', 'QFZP 0% Tax Optimization', 'Quarterly VAT 201 Submissions'],
      actionLabel: isAr ? 'طلب استشارة ضريبية' : 'Request Tax Filing',
      icon: Receipt,
      featured: false
    },
    {
      id: 'incorporation',
      colSpan: 'md:col-span-4',
      title: isAr ? 'تأسيس الشركات وإصدار التراخيص' : 'Company Incorporation',
      tag: 'Mainland & Free Zone',
      tagColor: 'blue',
      desc: isAr
        ? 'تأسيس الشركات في البر الرئيسي والمناطق الحرة والأوفشور مع الموافقة الأولية وحجز الاسم التجاري وتوثيق عقد التأسيس.'
        : 'Turnkey formation across Mainland DED, 40+ Free Zones, and Offshore SPVs with instant trade name reservation and notarized MOA.',
      features: ['100% Expat Ownership', '2-4 Days Fast Track', 'Tier-1 Bank Prequalified'],
      actionLabel: isAr ? 'بدء التأسيس' : 'Incorporate Entity',
      icon: Building2,
      featured: false
    },
    {
      id: 'pro-renewal',
      colSpan: 'md:col-span-4',
      title: isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'License Renewal (PRO) Services',
      tag: 'Annual Maintenance',
      tagColor: 'sky',
      desc: isAr
        ? 'تجديد الرخص التجارية السنوية، توثيق عقود الإيجار (إيجاري)، بطاقة المنشأة، وتعديل الشركاء وعقود التأسيس.'
        : 'Fast-track trade license renewal, Ejari registration, Establishment Card renewals, and corporate MOA amendments.',
      features: ['Zero Penalty Fast-Track', 'Ejari & Lease Attestation', 'Shareholder Amendments'],
      actionLabel: isAr ? 'طلب التجديد' : 'Renew License',
      icon: RefreshCw,
      featured: false
    },
    {
      id: 'liquidation',
      colSpan: 'md:col-span-4',
      title: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services',
      tag: 'Official Liquidator',
      tagColor: 'rose',
      desc: isAr
        ? 'تعيين مصفٍ قانوني معتمد، إعداد تقرير المصفي (Statement of Affairs)، خطابات براءة الذمة، وإلغاء السجل التجاري رسمياً.'
        : 'Official liquidator appointment, Liquidator Report & No-Liability clearance letters, asset disposal, and formal trade registry cancellation.',
      features: ['Certified Liquidator Report', 'Ministry & Visa Clearance', 'Formal De-Registration'],
      actionLabel: isAr ? 'طلب تصفية رسمية' : 'Start Liquidation',
      icon: XCircle,
      featured: false
    },
    {
      id: 'audit',
      colSpan: 'md:col-span-6',
      title: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services',
      tag: 'Certified Audit Reports',
      tagColor: 'emerald',
      desc: isAr
        ? 'تقارير تدقيق حسابات معتمدة ومقبولة لدى جميع البنوك التجارية وهيئات المناطق الحرة والوزارات الاتحادية بالإمارات.'
        : 'Statutory annual audit reports, balance sheet assurance, and independent financial verification accepted by UAE banks and Free Zone authorities.',
      features: ['Bank-Accepted Audit Reports', 'Free Zone Annual Compliance', 'Independent Verification'],
      actionLabel: isAr ? 'طلب تقرير تدقيق' : 'Request Audit Report',
      icon: FileCheck2,
      featured: false
    },
    {
      id: 'accounting',
      colSpan: 'md:col-span-6',
      title: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting Services',
      tag: 'Cloud Bookkeeping',
      tagColor: 'cyan',
      desc: isAr
        ? 'إعداد القوائم المالية الشهرية (الأرباح والخسائر، الميزانية العمومية)، نظام حماية الأجور (WPS)، وربط البرامج المحاسبية السحابية.'
        : 'Monthly bookkeeping, P&L statements, balance sheet reconciliations, Wages Protection System (WPS) payroll, and cloud accounting software.',
      features: ['Monthly P&L & Balance Sheet', 'WPS Compliant Payroll', 'Tax-Ready Financial Records'],
      actionLabel: isAr ? 'طلب باقة محاسبة' : 'Request Accounting',
      icon: Calculator,
      featured: false
    }
  ];

  return (
    <section id="other-services" className="py-24 sm:py-32 bg-[#050811] border-t border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching live amdxb.com */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'خدمات الشركات المتكاملة' : 'Complete Corporate Lifecycle'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'كافة خدمات الأعمال والاستشارات تحت سقف واحد' : (
              <>
                <span className="font-light text-slate-300">All 7 official services </span>
                <span className="font-bold text-white">bundled under one roof</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isAr 
              ? 'حلول مؤسسية شاملة من أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE) تشمل التأسيس، الإقامة الذهبية، الضرائب، التدقيق، والتصفية.'
              : 'End-to-end corporate and advisory services provided directly by AnalyzeMarkets FZE from Sharjah Innovation District (SRTI Park).'
            }
          </p>
        </div>

        {/* Bento Grid Architecture: All 7 Services from amdxb.com */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {services.map((svc) => {
            const Icon = svc.icon;

            return (
              <div
                key={svc.id}
                className={svc.colSpan + ' bg-[#0b1329] border border-white/[0.08] hover:border-sky-400/60 rounded-3xl p-7 flex flex-col justify-between transition-all group motion-card shadow-xl relative overflow-hidden'}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800">
                      {svc.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-sans group-hover:text-sky-300 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/[0.08] font-mono text-xs text-slate-300">
                    {svc.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    SRTI Accredited Delivery
                  </span>

                  <button
                    onClick={() => onOpenConsultation(svc.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-sky-500/20"
                  >
                    <span>{svc.actionLabel}</span>
                    <ArrowRight className={'w-3.5 h-3.5 ' + (isAr ? 'rotate-180' : '')} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
