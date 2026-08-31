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
  Mail,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import { ServiceSlug, SERVICES_CATALOG } from '../../data/servicesData';
import { openAdvisoryEmail, openAdvisoryWhatsApp } from '../../utils/submitLead';
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

  const service = SERVICES_CATALOG[slug] || SERVICES_CATALOG['company-incorporation'];
  const Icon = ICON_MAP[slug] || Building2;

  const allSlugs: { slug: ServiceSlug; label: string }[] = [
    { slug: 'company-incorporation', label: isAr ? 'تأسيس الشركات' : 'Company Incorporation' },
    { slug: 'company-liquidation-services', label: isAr ? 'تصفية الشركات' : 'Company Liquidation' },
    { slug: 'golden-visa-services', label: isAr ? 'الإقامة الذهبية' : 'Golden Visa Services' },
    { slug: 'license-renewal-pro-services', label: isAr ? 'تجديد الرخص (PRO)' : 'License Renewal (PRO)' },
    { slug: 'vat-corporate-tax-filing-services', label: isAr ? 'ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax' },
    { slug: 'accounting-services', label: isAr ? 'المحاسبة ومسك الدفاتر' : 'Accounting Services' }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 font-sans pt-24 pb-28 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Breadcrumb & Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-900" />
            <span>{isAr ? 'العودة إلى الصفحة الرئيسية' : 'Back to Overview'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                openAdvisoryWhatsApp({
                  name: clientName.trim() || 'Prospective client',
                  phone: clientPhone.trim() || 'To be provided',
                  service: isAr ? service.titleAr : service.titleEn,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'مستشار واتساب المباشر' : 'WhatsApp Advisor'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                openAdvisoryEmail({
                  name: clientName.trim() || 'Prospective client',
                  phone: clientPhone.trim() || 'To be provided',
                  service: isAr ? service.titleAr : service.titleEn,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 hover:bg-sky-100 transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>{isAr ? 'مستشار البريد' : 'Email Advisor'}</span>
            </button>

            <button
              onClick={() => onOpenConsultation(isAr ? service.titleAr : service.titleEn)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer"
            >
              <span>{isAr ? 'حجز موعد استشارة' : 'Book Consultation'}</span>
            </button>
          </div>
        </div>

        {/* 1. Horizontal Segmented Service Selector Tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-2 min-w-max p-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
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
                  className={'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ' + (
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  <ItemIcon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Service Header Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 mb-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200">
              <Icon className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {isAr ? service.tagAr : service.tagEn}
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 font-sans tracking-tight leading-tight">
              {isAr ? service.titleAr : service.titleEn}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isAr ? service.subtitleAr : service.subtitleEn}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-3 border-t border-slate-100">
              {isAr ? service.leadAr : service.leadEn}
            </p>
          </div>
        </div>

        {/* 3. Timeline Procedure */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 mb-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                {isAr ? 'خارطة الإجراءات والجدول الزمني' : 'Standard Operating Procedure & Timeline'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr ? 'خطوات تنفيذ رسمية معتمدة ومضمونة' : 'Turnkey execution milestones handled end-to-end by our directors.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.steps.map((st, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-[#FBFBFA] border border-slate-200 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    {st.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Deliverables & Required Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Deliverables */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">
                {isAr ? 'المخرجات والشهادات الرسمية' : 'Official Deliverables & Seals'}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Required */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">
                {isAr ? 'المستندات المطلوبة من العميل' : 'Required Client Documents'}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {service.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0" />
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 5. Service Specific FAQs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 mb-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
              {isAr ? 'الأسئلة الشائعة حول هذه الخدمة' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#FBFBFA] border border-slate-200 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-sans">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Inquiry Form */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-md">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                Direct Submission Channel
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {isAr ? 'ابدأ إجراءاتك الآن مع فريق المستشارين المعتمد' : `Initiate ${isAr ? service.titleAr : service.titleEn}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                SRTI Park, Block B - Office #B34-B047, Sharjah, UAE | Hotline: +971 56 339 6961
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-950 border border-emerald-700 rounded-xl text-center space-y-2 font-mono max-w-md mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-sm font-bold text-white block">{isAr ? 'تم إرسال الطلب بنجاح' : 'Mandate Successfully Dispatched'}</span>
                <span className="text-xs text-emerald-200 block">{isAr ? 'سيتصل بك مستشارنا المعتمد خلال 30 دقيقة' : 'A senior director will contact you within 30 minutes.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto font-mono text-xs">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white"
                />

                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white"
                />

                <button
                  type="submit"
                  className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال الطلب' : 'Submit Mandate'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
