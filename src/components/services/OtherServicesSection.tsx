import React from 'react';
import {
  Award,
  RefreshCw,
  Receipt,
  FileCheck2,
  Calculator,
  XCircle,
  Building2,
  ArrowRight,
  CheckCircle2
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
      desc: isAr 
        ? 'إقامة طويلة الأمد لمدة 10 سنوات للمستثمرين العقاريين (2 مليون درهم+) ورواد الأعمال والمدراء التنفيذيين والنوابغ، مع كفالة كاملة للأسرة دون الحاجة لكفيل محلي.'
        : 'Turnkey 10-year Golden Visa processing for property investors (AED 2M+), enterprise founders, senior executives, and specialized talent with 100% family sponsorship.',
      features: ['100% Sponsor-Free Independence', 'Full Family & Team Sponsorship', 'VIP Medical & Biometrics'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'tax-vat',
      slug: 'vat-corporate-tax-filing-services',
      colSpan: 'md:col-span-6 lg:col-span-4',
      title: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services',
      tag: 'Corporate Tax & VAT Filing',
      desc: isAr
        ? 'تسجيل رقم ضريبي (TRN)، إقرارات ضريبة الشركات بنسبة 9%، استيفاء شروط الوجود الاقتصادي، وإقرارات ضريبة القيمة المضافة الربع سنوية.'
        : 'Federal Tax Authority (FTA) TRN registration support, 9% Corporate Tax filing, Qualifying Free Zone Person (QFZP) eligibility review, and quarterly VAT returns.',
      features: ['FTA TRN Registration Support', 'QFZP 0% Eligibility Review', 'Quarterly VAT 201 Submissions'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Receipt,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'accounting',
      slug: 'accounting-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'حلول برامج المحاسبة السحابية' : 'Cloud Accounting Software Solutions',
      tag: 'Third-Party Software',
      desc: isAr
        ? 'اختيار وتهيئة وربط برامج المحاسبة السحابية من مزودين خارجيين، بما في ذلك إعداد ملفات نظام حماية الأجور (WPS) والتدريب والدعم المستمر.'
        : 'Selection, setup and integration of third-party cloud accounting software — including WPS payroll file configuration, team training and ongoing support.',
      features: ['Third-Party Software Setup & Migration', 'WPS Payroll File Configuration', 'Team Training & Ongoing Support'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pro-renewal',
      slug: 'license-renewal-pro-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'License Renewal & PRO Services',
      tag: 'Annual Compliance',
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
      tag: 'De-Registration Support',
      desc: isAr
        ? 'إدارة وتنسيق إجراءات إغلاق الشركة: تجهيز الملف، التنسيق مع مصفٍّ مرخّص، متابعة إلغاء التأشيرات وإغلاق الحسابات حتى شطب الرخصة.'
        : 'Coordination and file preparation for company closure: liaison with a licensed liquidator, visa cancellation follow-up, account closure and trade licence de-registration.',
      features: ['Closure File Preparation', 'Licensed Liquidator Coordination', 'Visa Cancellation & Licence De-Registration'],
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: XCircle,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="other-services" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <span>01 / Our Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'كافة خدمات الأعمال والاستشارات' : 'End-to-end corporate lifecycle services'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'خدمات واستشارات الأعمال المعتمدة من أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE) بمجمع الشارقة للبحوث والتكنولوجيا والابتكار.'
              : 'Our ISO-accredited corporate structuring approach covers every stage of your business operations in the UAE.'
            }
          </p>
        </div>

        {/* Photographic Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;

            return (
              <div
                key={svc.id}
                onClick={() => onNavigateService ? onNavigateService(svc.slug) : onOpenConsultation(svc.title)}
                className={svc.colSpan + ' bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer group shadow-sm hover:shadow-md'}
              >
                {/* Visual Photographic Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/95 text-slate-900 shadow-sm">
                      {svc.tag}
                    </span>
                    <div className="p-2 bg-white/90 text-slate-900 rounded-lg shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 font-sans group-hover:text-slate-700 transition-colors flex items-center justify-between">
                      <span>{svc.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 font-mono text-xs text-slate-700">
                    {svc.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
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
