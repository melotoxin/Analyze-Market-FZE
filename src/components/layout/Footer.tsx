import React, { useState } from 'react';
import { Building2, Phone, MapPin, Globe, ExternalLink, ArrowRight, ShieldCheck, Mail, MessageCircle } from 'lucide-react';
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
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs relative z-10 font-sans transition-colors duration-200">
      
      {/* Mandate Callback Banner */}
      <div className="border-b border-slate-800 bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
              Direct Advisory Channel
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Speak directly with our senior corporate structuring team
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Headquartered at SRTI Park Sharjah with direct Mainland & Free Zone licensing desks.
            </p>
          </div>

          <form onSubmit={handleQuickCallback} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="tel"
              required
              value={quickPhone}
              onChange={(e) => setQuickPhone(e.target.value)}
              placeholder="Enter your phone or WhatsApp..."
              className="flex-1 bg-slate-900 border border-slate-700 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white font-mono rounded-lg transition-colors"
            />
            <button
              type="submit"
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-lg shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <span>{sent ? 'Dispatched' : 'Request Callback'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Credentials */}
        <div className="md:col-span-5 space-y-4">
          <AmDxbLogo size="md" />
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-normal">
            AnalyzeMarkets FZE is a premier UAE management consultancy and corporate intelligence firm headquartered at the Sharjah Research Technology and Innovation Park (SRTI Park).
          </p>

          <div className="pt-2 space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>SRTI Park, Block B - Office B34-B047, Sharjah, United Arab Emirates</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="tel:+971563396961" dir="ltr" className="text-white hover:underline font-bold">
                +971 56 339 6961
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="mailto:contact@amdxb.com" className="text-white hover:underline font-bold">
                contact@amdxb.com
              </a>
            </div>
          </div>
        </div>

        {/* 7 Services Links */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
            Official Services (7)
          </h4>
          <ul className="space-y-2.5 text-xs">
            {services.map((s, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigateService && onNavigateService(s.slug)}
                  className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>{s.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals & Direct Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
            Direct Portals
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><a href="https://amdxb.com/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center justify-between"><span>amdxb.com</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://srtip.ae/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center justify-between"><span>SRTI Park Authority</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://tax.gov.ae/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center justify-between"><span>Federal Tax Authority</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://sedd.ae/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center justify-between"><span>Sharjah SEDD</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://wa.me/971563396961" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center justify-between text-emerald-400 font-bold"><span>WhatsApp Desk</span><MessageCircle className="w-3 h-3" /></a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            Copyright © 2026 AnalyzeMarkets FZE. Registered under License #B34-B047. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>ISO 9001 Process Compliant</span>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.adrevnview.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-white font-semibold"
            >
              AdRevnView
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
