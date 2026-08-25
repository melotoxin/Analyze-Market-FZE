import React, { useState } from 'react';
import { Building2, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { ServiceSlug } from '../../data/servicesData';

interface FooterProps {
  onOpenConsultation: () => void;
  onNavigateService?: (slug: ServiceSlug) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onNavigateService, lang }) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const [quickPhone, setQuickPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickPhone) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setQuickPhone('');
    }
  };

  const services = [
    { name: isAr ? 'تأسيس الشركات (Mainland & Free Zone)' : 'Company Incorporation Services', slug: 'company-incorporation' as ServiceSlug },
    { name: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services', slug: 'company-liquidation-services' as ServiceSlug },
    { name: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services (10-Year)', slug: 'golden-visa-services' as ServiceSlug },
    { name: isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'License Renewal (PRO) Services', slug: 'license-renewal-pro-services' as ServiceSlug },
    { name: isAr ? 'الإقرارات الضريبية وضريبة الشركات' : 'VAT & Corporate Tax Filing', slug: 'vat-corporate-tax-filing-services' as ServiceSlug },
    { name: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services', slug: 'audit-and-assurance-services' as ServiceSlug },
    { name: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting & Bookkeeping Services', slug: 'accounting-services' as ServiceSlug },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#070b16] border-t border-slate-200 dark:border-[#1e293b] text-slate-500 dark:text-slate-400 text-xs relative z-10 font-sans transition-colors duration-300">
      
      {/* Quick Consultation Banner */}
      <div className="border-b border-slate-200 dark:border-[#1e293b] bg-white/70 dark:bg-[#0c1324]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl text-center lg:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans">
              <span>{t.footerBannerTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t.footerBannerDesc}
            </p>
          </div>

          <form onSubmit={handleQuickCallback} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
            <input
              type="tel"
              required
              value={quickPhone}
              onChange={(e) => setQuickPhone(e.target.value)}
              placeholder={t.footerPhonePlaceholder}
              className="flex-1 bg-white dark:bg-[#111c33] border border-slate-200 dark:border-[#1e293b] rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono transition-colors"
            />
            <Button type="submit" variant="primary" size="sm" className="shrink-0 font-semibold text-xs shadow-sm">
              {sent ? t.footerCallbackReceived : t.footerCallbackBtn}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & About Column */}
        <div className="md:col-span-2 space-y-3">
          <AmDxbLogo size="md" />
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
            {t.aboutDesc}
          </p>

          <div className="pt-2 space-y-2 text-xs font-mono">
            <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>SRTI (Sharjah Research Technology & Innovation) Block B - Office B34-B047</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="tel:+971563396961" dir="ltr" className="text-sky-600 dark:text-sky-400 hover:underline font-bold text-sm">
                +971 56 339 6961
              </a>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase text-slate-900 dark:text-white tracking-wider">
            {t.footerServicesTitle}
          </h4>
          <ul className="space-y-2 text-xs">
            {services.map((s, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigateService && onNavigateService(s.slug)}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links & Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase text-slate-900 dark:text-white tracking-wider">
            {t.footerQuickLinksTitle}
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li><a href="https://amdxb.com/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'الرئيسية' : 'Home'}</a></li>
            <li><a href="https://amdxb.com/about/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'عن الشركة' : 'About Us'}</a></li>
            <li><a href="https://amdxb.com/services/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'كافة الخدمات' : 'Our Services'}</a></li>
            <li><a href="https://amdxb.com/free-zone-companies/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'المناطق الحرة' : 'Free Zone Companies'}</a></li>
            <li><a href="https://amdxb.com/mainland-companies/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'شركات البر الرئيسي' : 'Mainland Companies'}</a></li>
            <li><a href="https://amdxb.com/why-uae/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'لماذا الإمارات؟' : 'Why UAE?'}</a></li>
            <li><a href="https://amdxb.com/contact-us/" target="_blank" rel="noreferrer" className="hover:text-sky-500">{isAr ? 'تواصل معنا' : 'Contact Us'}</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-[#1e293b] bg-slate-200/50 dark:bg-[#050811] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <div>
            Copyright © 2026 AnalyzeMarkets FZE. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Official Portal:</span>
            <a href="https://amdxb.com/" target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline font-bold">
              amdxb.com
            </a>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-500 font-bold">SRTI Park Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
