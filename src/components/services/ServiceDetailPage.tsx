import React, { useState } from 'react';
import {
  Building2,
  XCircle,
  Award,
  RefreshCw,
  Receipt,
  FileCheck2,
  Calculator,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Send,
  Phone,
  MessageCircle,
  HelpCircle,
  FileText,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Language, TRANSLATIONS } from '../../data/translations';
import { ServiceSlug, SERVICES_CATALOG } from '../../data/servicesData';
import confetti from 'canvas-confetti';

interface ServiceDetailPageProps {
  slug: ServiceSlug;
  onBack: () => void;
  onSelectService: (slug: ServiceSlug) => void;
  onOpenConsultation: (serviceName?: string) => void;
  lang: Language;
}

const ICON_MAP: Record<ServiceSlug, any> = {
  'company-incorporation': Building2,
  'company-liquidation-services': XCircle,
  'golden-visa-services': Award,
  'license-renewal-pro-services': RefreshCw,
  'vat-corporate-tax-filing-services': Receipt,
  'audit-and-assurance-services': FileCheck2,
  'accounting-services': Calculator
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onBack,
  onSelectService,
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsSubmitted(true);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName('');
      setClientPhone('');
      setClientNotes('');
    }, 6000);
  };

  const service = SERVICES_CATALOG[slug] || SERVICES_CATALOG['company-incorporation'];
  const Icon = ICON_MAP[slug] || Building2;

  const allSlugs: { slug: ServiceSlug; label: string }[] = [
    { slug: 'company-incorporation', label: isAr ? 'تأسيس الشركات' : 'Company Incorporation' },
    { slug: 'company-liquidation-services', label: isAr ? 'تصفية الشركات' : 'Company Liquidation' },
    { slug: 'golden-visa-services', label: isAr ? 'الإقامة الذهبية' : 'Golden Visa Services' },
    { slug: 'license-renewal-pro-services', label: isAr ? 'تجديد الرخص (PRO)' : 'License Renewal (PRO)' },
    { slug: 'vat-corporate-tax-filing-services', label: isAr ? 'ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax' },
    { slug: 'audit-and-assurance-services', label: isAr ? 'التدقيق والضمان المالي' : 'Audit & Assurance' },
    { slug: 'accounting-services', label: isAr ? 'المحاسبة ومسك الدفاتر' : 'Accounting Services' }
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pt-24 pb-20 relative z-10 transition-colors duration-300">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumbs & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button onClick={onBack} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">{isAr ? 'خدماتنا' : 'Our Services'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400 font-bold">{isAr ? service.titleAr : service.titleEn}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/971563396961"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600 text-xs font-mono text-emerald-300 transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'مستشار واتساب' : 'WhatsApp Advisor'}</span>
            </a>

            <Button
              onClick={() => onOpenConsultation(isAr ? service.titleAr : service.titleEn)}
              variant="primary"
              size="sm"
              className="text-xs font-bold py-1.5 px-3 shadow-md shadow-sky-500/25"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>{isAr ? 'حجز موعد استشارة' : 'Book Appointment'}</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Main Layout: Left Sidebar + Main Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 4 Cols: Quick Service Switcher Sidebar & Mandate Dispatch */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Services Switcher Menu */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-3xl p-5 space-y-3 shadow-xl">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider block border-b border-white/[0.08] pb-2">
                {isAr ? 'جميع الخدمات السبع المعتمدة:' : 'All 7 Official Services:'}
              </span>
              <div className="space-y-1.5">
                {allSlugs.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => {
                      onSelectService(item.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={'w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ' + (
                      slug === item.slug
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-bold'
                        : 'bg-[#080e20] text-slate-300 hover:bg-slate-800 hover:text-white border border-white/[0.04]'
                    )}
                  >
                    <span>{item.label}</span>
                    {slug === item.slug && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Fast 1-Click Service Application Form */}
            <div className="bg-[#0b1329] border border-sky-500/30 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Send className="w-4 h-4 text-sky-400" />
                <span>{isAr ? 'طلب الخدمة المباشر' : 'Instant Service Mandate'}</span>
              </div>
              <p className="text-xs text-slate-400">
                {isAr 
                  ? 'أرسل طلبك مباشرة إلى فريق المستشارين بمجمع الشارقة للابتكار والتكنولوجيا.'
                  : 'Submit your mandate directly to our senior directors at SRTI Park Sharjah.'
                }
              </p>

              {isSubmitted ? (
                <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl text-center space-y-1 font-mono">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                  <span className="text-xs font-bold text-white block">{isAr ? 'تم استلام الطلب بنجاح' : 'Inquiry Dispatched'}</span>
                  <span className="text-[11px] text-slate-300 block">{isAr ? 'سيتم التواصل معك خلال 30 دقيقة' : 'We will contact you in 30 minutes.'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 font-mono text-xs">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isAr ? 'الاسم الكامل *' : 'Full Name *'}
                    className="w-full bg-[#080e20] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />

                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                    className="w-full bg-[#080e20] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />

                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder={isAr ? 'استفسار أو تفاصيل إضافية...' : 'Specific questions or timeline...'}
                    className="w-full bg-[#080e20] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs font-bold shadow-md shadow-sky-500/25 py-2"
                  >
                    <span>{isAr ? 'إرسال طلب الخدمة' : 'Submit Service Mandate'}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Office Contacts */}
            <div className="p-4 bg-[#080e20] border border-white/[0.08] rounded-2xl space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'المقر الرئيسي المعتمد' : 'Accredited Head Office'}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                SRTI Park, Block B - Office B34-B047, Sharjah, UAE
              </p>
              <div className="pt-1 flex items-center justify-between border-t border-white/[0.06]">
                <span>{isAr ? 'الخط المباشر:' : 'Call Hotline:'}</span>
                <a href="tel:+971563396961" className="text-white font-bold hover:underline">+971 56 339 6961</a>
              </div>
            </div>

          </div>

          {/* Right 8 Cols: Comprehensive In-Depth Service Breakdown */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Hero Banner */}
            <div className="bg-gradient-to-br from-[#0c1630] via-[#0b1329] to-[#070b16] border border-sky-500/30 rounded-3xl p-8 space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800">
                  {isAr ? service.tagAr : service.tagEn}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-sans tracking-tight">
                  {isAr ? service.titleAr : service.titleEn}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {isAr ? service.subtitleAr : service.subtitleEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr ? service.leadAr : service.leadEn}
              </div>
            </div>

            {/* Step-by-Step Execution Procedure */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-3xl p-7 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-lg font-sans">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>{isAr ? 'خارطة الإجراءات والجدول الزمني' : 'Standard Operating Procedure & Timeline'}</span>
              </div>

              <div className="space-y-4">
                {service.steps.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080e20] border border-white/[0.06] space-y-1 hover:border-sky-500/40 transition-colors">
                    <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                      <span className="text-sky-400 font-mono">{st.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverables & Required Documents (2-Col Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Deliverables */}
              <div className="bg-[#0b1329] border border-[#1e293b] rounded-3xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-white font-bold text-base font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'المخرجات الرسمية للمستندات' : 'Official Deliverables'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {service.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="bg-[#0b1329] border border-[#1e293b] rounded-3xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-white font-bold text-base font-sans">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>{isAr ? 'المستندات المطلوبة من العميل' : 'Required Client Documents'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {service.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Service Specific FAQs */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-3xl p-7 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-lg font-sans">
                <HelpCircle className="w-5 h-5 text-sky-400" />
                <span>{isAr ? 'الأسئلة الشائعة حول هذه الخدمة' : 'Frequently Asked Questions'}</span>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#080e20] border border-white/[0.06] space-y-1.5">
                    <h5 className="text-xs sm:text-sm font-bold text-white font-sans">
                      Q: {faq.q}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
