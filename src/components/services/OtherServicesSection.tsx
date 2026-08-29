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
  Layers
} from 'lucide-react';
import { Language } from '../../data/translations';
import { ServiceSlug } from '../../data/servicesData';

interface OtherServicesSectionProps {
  onOpenConsultation: (serviceName?: string) => void;
  onNavigateService?: (slug: ServiceSlug) => void;
  lang: Language;
}

export const OtherServicesSection: React.FC<OtherServicesSectionProps> = ({
  onOpenConsultation,
  onNavigateService,
  lang
}) => {
  const isAr = lang === 'ar';

  const services: {
    id: string;
    slug: ServiceSlug;
    colSpan: string;
    title: string;
    tag: string;
    tagColor: string;
    desc: string;
    features: string[];
    actionLabel: string;
    icon: any;
    image: string;
  }[] = [
    {
      id: 'incorporation',
      slug: 'company-incorporation',
      colSpan: 'md:col-span-6 lg:col-span-4',
      title: isAr ? 'تأسيس الشركات وإصدار التراخيص' : 'Company Incorporation',
      tag: 'Mainland & Free Zone',
      tagColor: 'amber',
      desc: isAr
        ? 'تأسيس الشركات في البر الرئيسي والمناطق الحرة والأوفشور مع الموافقة الأولية وحجز الاسم التجاري وتوثيق عقد التأسيس.'
        : 'Turnkey formation across Mainland DED, 40+ Free Zones, and Offshore SPVs with instant trade name reservation and notarized MOA.',
      features: ['100% Expat Equity Ownership', '2-4 Days License SLA', 'Tier-1 Banking Fast-Track'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'golden-visa',
      slug: 'golden-visa-services',
      colSpan: 'md:col-span-6 lg:col-span-4',
      title: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services',
      tag: '10-Year Long-Term',
      tagColor: 'amber',
      desc: isAr 
        ? 'إقامة طويلة الأمد لمدة 10 سنوات للمستثمرين العقاريين (2 مليون درهم+) ورواد الأعمال والمدراء التنفيذيين والنوابغ، مع كفالة كاملة للأسرة دون الحاجة لكفيل محلي.'
        : 'Turnkey 10-year Golden Visa processing for property investors (AED 2M+), enterprise founders, senior executives, and specialized talent with 100% family sponsorship.',
      features: ['100% Sponsor-Free Independence', 'Full Family & Team Sponsorship', 'VIP Medical & Biometrics'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'tax-vat',
      slug: 'vat-corporate-tax-filing-services',
      colSpan: 'md:col-span-6 lg:col-span-4',
      title: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services',
      tag: 'FTA Registered Agent',
      tagColor: 'amber',
      desc: isAr
        ? 'تسجيل رقم ضريبي (TRN)، إقرارات ضريبة الشركات بنسبة 9%، استيفاء شروط الوجود الاقتصادي، وإقرارات ضريبة القيمة المضافة الربع سنوية.'
        : 'Federal Tax Authority (FTA) TRN registration, 9% Corporate Tax filing, Qualifying Free Zone Person (QFZP) 0% optimization, and quarterly VAT returns.',
      features: ['Official FTA TRN Number', 'QFZP 0% Tax Optimization', 'Quarterly VAT 201 Submissions'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Receipt,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'audit',
      slug: 'audit-and-assurance-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services',
      tag: 'Certified Audit Reports',
      tagColor: 'amber',
      desc: isAr
        ? 'تقارير تدقيق حسابات معتمدة ومقبولة لدى جميع البنوك التجارية وهيئات المناطق الحرة والوزارات الاتحادية بالإمارات.'
        : 'Statutory annual audit reports, balance sheet assurance, and independent financial verification accepted by UAE commercial banks and Free Zone authorities.',
      features: ['Bank-Accepted Audit Statements', 'Free Zone Annual Compliance', 'Independent Verification & MOA Audit'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: FileCheck2,
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'accounting',
      slug: 'accounting-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting & Bookkeeping Services',
      tag: 'Cloud Bookkeeping & WPS',
      tagColor: 'amber',
      desc: isAr
        ? 'إعداد القوائم المالية الشهرية (الأرباح والخسائر، الميزانية العمومية)، نظام حماية الأجور (WPS)، وربط البرامج المحاسبية السحابية.'
        : 'Monthly bookkeeping, P&L statements, balance sheet reconciliations, Wages Protection System (WPS) payroll, and cloud accounting software.',
      features: ['Monthly P&L & Balance Sheet', 'WPS Compliant Payroll Management', 'Tax-Ready Financial Records'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pro-renewal',
      slug: 'license-renewal-pro-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'License Renewal & PRO Services',
      tag: 'Annual Compliance',
      tagColor: 'amber',
      desc: isAr
        ? 'تجديد الرخص التجارية السنوية، توثيق عقود الإيجار (إيجاري)، بطاقة المنشأة، وتعديل الشركاء وعقود التأسيس.'
        : 'Fast-track trade license renewal, Ejari registration, Establishment Card renewals, and corporate MOA amendments.',
      features: ['Zero Penalty Fast-Track', 'Ejari & Commercial Lease Attestation', 'Shareholder & Activity Amendments'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: RefreshCw,
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'liquidation',
      slug: 'company-liquidation-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services',
      tag: 'Official Liquidator',
      tagColor: 'amber',
      desc: isAr
        ? 'تعيين مصفٍ قانوني معتمد، إعداد تقرير المصفي (Statement of Affairs)، خطابات براءة الذمة، وإلغاء السجل التجاري رسمياً.'
        : 'Official liquidator appointment, Liquidator Report & No-Liability clearance letters, asset disposal, and formal trade registry cancellation.',
      features: ['Certified Liquidator Report', 'Ministry & Visa Clearance', 'Formal De-Registration Gazette'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: XCircle,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="other-services" className="py-24 sm:py-32 bg-[#141518] border-t border-[#2d3139] relative overflow-hidden transition-colors duration-300 font-sans text-white">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Cyber-Duck Editorial Typography */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#191a1e] border border-slate-700 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'كافة الخدمات المعتمدة' : '01 / OUR SERVICES & CAPABILITIES'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'حلول مؤسسية شاملة تحت سقف واحد' : (
              <>
                <span className="font-light text-slate-300">From strategy to delivery, </span>
                <span className="font-bold text-white">all 7 official services</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'خدمات واستشارات الأعمال المعتمدة من أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE) بمجمع الشارقة للبحوث والتكنولوجيا والابتكار.'
              : 'Our pioneering, ISO-accredited corporate structuring approach covers every stage of the business lifecycle in the UAE.'
            }
          </p>
        </div>

        {/* Cyber-Duck Photographic Service Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;

            return (
              <div
                key={svc.id}
                onClick={() => onNavigateService ? onNavigateService(svc.slug) : onOpenConsultation(svc.title)}
                className={svc.colSpan + ' bg-[#191a1e] border border-[#2d3139] hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1'}
              >
                {/* Visual Photographic Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191a1e] via-[#191a1e]/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#121316]/90 text-amber-400 border border-white/[0.1]">
                      {svc.tag}
                    </span>
                    <div className="p-2 bg-[#121316]/90 text-white border border-white/[0.1] group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-400 transition-colors flex items-center justify-between">
                      <span>{svc.title}</span>
                      <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-normal">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-white/[0.08] font-mono text-xs text-slate-300">
                    {svc.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                    <span>{svc.actionLabel}</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
