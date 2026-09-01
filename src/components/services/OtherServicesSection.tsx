import React from 'react';
import {
  Award,
  RefreshCw,
  Receipt,
  Calculator,
  XCircle,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { servicePath } from '../../utils/router';
import { Language } from '../../data/translations';
import { ServiceSlug } from '../../data/servicesData';

interface OtherServicesSectionProps {
  onNavigateService?: (slug: ServiceSlug) => void;
  lang: Language;
}

export const OtherServicesSection: React.FC<OtherServicesSectionProps> = ({
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
    actionLabel: string;
    icon: typeof Building2;
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
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Building2,
      image: '/img/1486406146926-c627a9-w800.webp'
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
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Award,
      image: '/img/1512453979798-5ea266-w800.webp'
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
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Receipt,
      image: '/img/1554224155-8d04cb21c-w800.webp'
    },
    {
      id: 'accounting',
      slug: 'accounting-services',
      colSpan: 'md:col-span-6 lg:col-span-6',
      title: isAr ? 'حلول برامج المحاسبة السحابية' : 'Cloud Accounting Software Solutions',
      tag: 'Third-Party Software',
      desc: isAr
        ? 'استشارات حول اختيار وتهيئة برامج المحاسبة السحابية من مزودين خارجيين — إعداد النظام ونقل البيانات وتدريب الفريق.'
        : 'Advisory on selecting and configuring third-party cloud accounting platforms — software setup, data migration, and team onboarding support.',
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: Calculator,
      image: '/img/1460925895917-afdab8-w800.webp'
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
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: RefreshCw,
      image: '/img/1497215728101-856f4e-w800.webp'
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
      actionLabel: isAr ? 'تفاصيل الخدمة' : 'View Service Roadmap',
      icon: XCircle,
      image: '/img/1589829545856-d10d55-w800.webp'
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
              // A real link, not a clickable div: keyboard users can reach it, it
              // opens in a new tab on ctrl/cmd-click, and crawlers follow it to the
              // service page. The main services grid was previously invisible to both.
              <a
                key={svc.id}
                href={servicePath(svc.slug)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || !onNavigateService) return;
                  e.preventDefault();
                  onNavigateService(svc.slug);
                }}
                className={svc.colSpan + ' bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer group shadow-sm hover:shadow-md no-underline focus:outline-none focus:ring-2 focus:ring-sky-500'}
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

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>{svc.actionLabel}</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
