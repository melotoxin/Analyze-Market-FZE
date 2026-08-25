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
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pt-24 pb-28 relative z-10 transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Breadcrumb & Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] hover:border-sky-400 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sky-500" />
            <span>{isAr ? 'العودة إلى الصفحة الرئيسية' : 'Back to Overview'}</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/971563396961"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isAr ? 'مستشار واتساب المباشر' : 'WhatsApp Senior Advisor'}</span>
            </a>

            <Button
              onClick={() => onOpenConsultation(isAr ? service.titleAr : service.titleEn)}
              variant="primary"
              size="sm"
              className="font-bold text-xs shadow-md shadow-sky-500/25 px-5 py-2"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>{isAr ? 'حجز موعد استشارة' : 'Book Consultation'}</span>
            </Button>
          </div>
        </div>

        {/* 1. Spacious Horizontal Segmented Service Selector Tabs (Eliminates sidebar congestion) */}
        <div className="mb-12 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-2 min-w-max p-1.5 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-white/[0.08] rounded-2xl backdrop-blur-xl">
            {allSlugs.map((item) => {
              const ItemIcon = ICON_MAP[item.slug] || Building2;
              const isSelected = slug === item.slug;

              return (
                <button
                  key={item.slug}
                  onClick={() => {
                    onSelectService(item.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ' + (
                    isSelected
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800'
                  )}
                >
                  <ItemIcon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Spacious Service Header Hero */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#0d1c38] dark:via-[#091328] dark:to-[#060c1c] border border-slate-200 dark:border-sky-500/30 rounded-3xl p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 shadow-inner">
              <Icon className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
              {isAr ? service.tagAr : service.tagEn}
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-sans tracking-tight leading-tight">
              {isAr ? service.titleAr : service.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {isAr ? service.subtitleAr : service.subtitleEn}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              {isAr ? service.leadAr : service.leadEn}
            </p>
          </div>

        </div>

        {/* 3. Spacious Timeline Procedure */}
        <div className="bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 mb-12 shadow-xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 dark:text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
                {isAr ? 'خارطة الإجراءات والجدول الزمني' : 'Standard Operating Procedure & Timeline'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isAr ? 'خطوات تنفيذ رسمية معتمدة ومضمونة' : 'Turnkey execution milestones handled end-to-end by our directors.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.steps.map((st, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b1328] border border-slate-200 dark:border-white/[0.06] hover:border-sky-400 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                    {st.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Deliverables & Required Documents in Spacious 2-Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Deliverables */}
          <div className="bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                {isAr ? 'المخرجات والشهادات الرسمية' : 'Official Deliverables & Seals'}
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Required */}
          <div className="bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 dark:text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                {isAr ? 'المستندات المطلوبة من العميل' : 'Required Client Documents'}
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {service.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 5. Service Specific FAQs */}
        <div className="bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 mb-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 dark:text-sky-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
              {isAr ? 'الأسئلة الشائعة حول هذه الخدمة' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0b1328] border border-slate-200 dark:border-white/[0.06] space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Spacious Bottom Inquiry Form Card */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a142c] to-slate-950 border border-sky-500/40 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Direct Submission Channel
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">
                {isAr ? 'ابدأ إجراءاتك الآن مع فريق المستشارين المعتمد' : `Initiate ${isAr ? service.titleAr : service.titleEn}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                SRTI Park, Block B - Office #B34-B047, Sharjah, UAE | Hotline: +971 56 339 6961
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2 font-mono max-w-md mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-sm font-bold text-white block">{isAr ? 'تم إرسال الطلب بنجاح' : 'Mandate Successfully Dispatched'}</span>
                <span className="text-xs text-slate-300 block">{isAr ? 'سيتصل بك مستشارنا المعتمد خلال 30 دقيقة' : 'A senior director will contact you within 30 minutes.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto font-mono text-xs">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />

                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="font-bold text-xs shadow-lg shadow-sky-500/30 py-3"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  <span>{isAr ? 'إرسال الطلب' : 'Submit Mandate'}</span>
                </Button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
