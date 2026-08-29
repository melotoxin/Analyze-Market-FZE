import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Menu,
  X,
  Sparkles,
  Settings,
  User,
  LogOut,
  ChevronDown,
  CheckCircle2,
  LayoutDashboard,
  Building2,
  Award,
  RefreshCw,
  Receipt,
  FileCheck2,
  Calculator,
  XCircle,
  PhoneCall,
  ArrowRight,
  Search,
  Layers,
  Sun,
  Moon,
  ShieldCheck,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import { UserSession } from '../auth/AuthModal';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { ServiceSlug } from '../../data/servicesData';

interface NavbarProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  user: UserSession | null;
  onLogout: () => void;
  lang: Language;
  onToggleLang: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  currency?: string;
  onSetCurrency?: (c: string) => void;
  onNavigateService?: (slug: ServiceSlug) => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenAuth,
  onOpenSettings,
  onOpenAdmin,
  user,
  onLogout,
  lang,
  onToggleLang,
  isDarkMode = true,
  onToggleTheme,
  currency = 'AED',
  onSetCurrency,
  onNavigateService,
  onNavigateSection,
  onNavigateHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [timeDubai, setTimeDubai] = useState('');
  
  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActivePanel(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    // Live Dubai Time
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setTimeDubai(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(interval);
    };
  }, []);

  const servicesList: { name: string; tag: string; slug: ServiceSlug; icon: any; desc: string }[] = [
    { name: isAr ? 'تأسيس الشركات وإصدار التراخيص' : 'Company Incorporation', tag: 'Mainland & Free Zone', slug: 'company-incorporation', icon: Building2, desc: 'Turnkey formation across Mainland DED, 40+ Free Zones, and Offshore SPVs with instant trade name reservation and notarized MOA.' },
    { name: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services', tag: 'Official Liquidator', slug: 'company-liquidation-services', icon: XCircle, desc: 'Official liquidator appointment, Liquidator Report & No-Liability clearance letters, asset disposal, and formal trade registry cancellation.' },
    { name: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services', tag: '10-Year Long-Term', slug: 'golden-visa-services', icon: Award, desc: 'Turnkey 10-year Golden Visa processing for property investors (AED 2M+), enterprise founders, senior executives, and specialized talent.' },
    { name: isAr ? 'خدمات تجديد الرخص (PRO)' : 'License Renewal (PRO) Services', tag: 'Annual Compliance', slug: 'license-renewal-pro-services', icon: RefreshCw, desc: 'Fast-track trade license renewal, Ejari registration, Establishment Card renewals, and corporate MOA amendments.' },
    { name: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services', tag: 'FTA Agent 9%', slug: 'vat-corporate-tax-filing-services', icon: Receipt, desc: 'Federal Tax Authority (FTA) TRN registration, 9% Corporate Tax filing, Qualifying Free Zone Person (QFZP) 0% optimization, and quarterly VAT returns.' },
    { name: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services', tag: 'Bank & Free Zone Audit', slug: 'audit-and-assurance-services', icon: FileCheck2, desc: 'Statutory annual audit reports, balance sheet assurance, and independent financial verification accepted by UAE banks and Free Zone authorities.' },
    { name: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting Services', tag: 'WPS & Cloud Bookkeeping', slug: 'accounting-services', icon: Calculator, desc: 'Monthly bookkeeping, P&L statements, balance sheet reconciliations, Wages Protection System (WPS) payroll, and cloud accounting software.' },
  ];

  const handleServiceClick = (slug: ServiceSlug) => {
    setActivePanel(null);
    setMobileMenuOpen(false);
    if (onNavigateService) {
      onNavigateService(slug);
    }
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActivePanel(null);
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setActivePanel(null);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans" ref={navRef}>
      
      {/* 1. Cyber-Duck Style Top Utility & Accreditation Bar */}
      <div className="hidden md:block bg-[#0e0f12] text-slate-400 border-b border-white/[0.06] text-[11px] font-mono py-1.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sharjah & Dubai GST: <strong className="text-white">{timeDubai || '01:00 PM'} (UTC+4)</strong></span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">SRTI Park HQ: Block B - Office B34-B047</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold">ISO 9001 Process Compliant</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+971563396961" className="text-slate-300 hover:text-amber-400 transition-colors">
              Tel: +971 56 339 6961
            </a>
            <span className="text-slate-600">|</span>
            <a href="mailto:contact@amdxb.com" className="text-slate-300 hover:text-amber-400 transition-colors">
              contact@amdxb.com
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main High-Craft Cyber-Duck Navigation Bar */}
      <div className={'transition-all duration-200 ' + (
        isScrolled
          ? (isDarkMode ? 'bg-[#121316]/98 backdrop-blur-md border-b border-[#2d3139] shadow-xl py-3 text-slate-100' : 'bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-md py-3 text-slate-900')
          : (isDarkMode ? 'bg-[#121316]/90 backdrop-blur-sm py-4 border-b border-white/[0.06] text-slate-100' : 'bg-white/95 backdrop-blur-sm py-4 border-b border-slate-200 text-slate-900')
      )}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Identity Logo */}
          <button onClick={handleHomeClick} className="flex items-center gap-3 shrink-0 whitespace-nowrap group text-left cursor-pointer">
            <AmDxbLogo size="sm" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap">
            
            {/* What We Do (Cyber-Duck Style Mega Menu) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePanel(activePanel === 'what-we-do' ? null : 'what-we-do')}
                className={'inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-none transition-colors cursor-pointer ' + (
                  activePanel === 'what-we-do'
                    ? 'text-amber-400 bg-white/[0.06]'
                    : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <span>{isAr ? 'ما نقدمه' : 'What We Do'}</span>
                <ChevronDown className={'w-3.5 h-3.5 transition-transform duration-200 ' + (activePanel === 'what-we-do' ? 'rotate-180 text-amber-400' : 'text-slate-400')} />
              </button>
            </div>

            {/* How We Work / SOP */}
            <button
              type="button"
              onClick={() => handleSectionClick('how-we-work')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'منهجية العمل' : 'How We Work'}
            </button>

            {/* Packages */}
            <button
              type="button"
              onClick={() => handleSectionClick('packages')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'الباقات' : 'Packages'}
            </button>

            {/* Free Zones Explorer */}
            <button
              type="button"
              onClick={() => handleSectionClick('freezones')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'المناطق الحرة' : 'Free Zones'}
            </button>

            {/* Cost Calculator */}
            <button
              type="button"
              onClick={() => handleSectionClick('cost-calculator')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'حاسبة الرسوم' : 'Tariff Calculator'}
            </button>

            {/* Client Stories */}
            <button
              type="button"
              onClick={() => handleSectionClick('client-stories')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'قصص النجاح' : 'Client Stories'}
            </button>

            {/* About Us */}
            <button
              type="button"
              onClick={() => handleSectionClick('about')}
              className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white px-3.5 py-2 rounded-none hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              {isAr ? 'عن الشركة' : 'About Us'}
            </button>

          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0 whitespace-nowrap">
            
            {/* Currency Switcher */}
            {onSetCurrency && (
              <button
                onClick={() => {
                  const order = ['AED', 'USD', 'EUR', 'GBP'];
                  const nextIdx = (order.indexOf(currency) + 1) % order.length;
                  onSetCurrency(order[nextIdx]);
                }}
                className="px-2.5 py-1.5 border border-slate-700 bg-[#191a1e] text-xs font-mono font-bold text-amber-400 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
                title="Change Currency"
              >
                {currency}
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 border border-slate-700 bg-[#191a1e] text-xs font-bold text-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'EN' : 'العربية'}</span>
            </button>

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2 border border-slate-700 bg-[#191a1e] text-slate-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer shadow-sm"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            )}

            {/* Cyber-Duck Signature High-Contrast "Get in Touch" Button */}
            <button
              onClick={() => onOpenConsultation()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 transition-all shadow-md active:translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{isAr ? 'تواصل معنا' : 'Get in touch'}</span>
              <ArrowRight className="w-3.5 h-3.5 font-bold" />
            </button>

          </div>

          {/* Mobile Header Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenConsultation()}
              className="bg-amber-500 text-slate-950 font-bold text-xs uppercase px-3 py-1.5"
            >
              {isAr ? 'تواصل' : 'Inquire'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-700 bg-[#191a1e] text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Cyber-Duck Full-Width Mega Menu Dropdown */}
      {activePanel === 'what-we-do' && (
        <div className="hidden lg:block bg-[#16171b] border-b border-[#2d3139] shadow-2xl animate-scaleUp">
          <div className="max-w-[1440px] mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            
            {/* Left Sidebar Overview */}
            <div className="col-span-3 border-r border-white/[0.08] pr-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                  01 / CAPABILITIES
                </span>
                <h3 className="text-xl font-black text-white font-sans">
                  {isAr ? 'كافة الخدمات والحلول المؤسسية' : 'What We Do'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  From strategic diagnostic & turnkey company formation to Golden Visas, corporate tax filing, and statutory audit compliance.
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => handleSectionClick('other-services')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-mono cursor-pointer"
                >
                  <span>{isAr ? 'استعراض الدليل الشامل ➔' : 'View All 7 Services Grid ➔'}</span>
                </button>
              </div>
            </div>

            {/* Right 9 Cols: 7 Services Grid */}
            <div className="col-span-9 grid grid-cols-3 gap-4">
              {servicesList.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleServiceClick(svc.slug)}
                    className="p-4 text-left bg-[#1c1e24] hover:bg-[#23262d] border border-white/[0.06] hover:border-amber-400 transition-all group flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-[#121316] text-amber-400 border border-white/[0.08] group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 bg-[#121316]">
                          {svc.tag}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {svc.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-amber-400">
                      <span>Explore Service</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16171b] border-b border-slate-700 px-4 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
              Our 7 Corporate Services:
            </span>
            <div className="space-y-1.5">
              {servicesList.map((svc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleServiceClick(svc.slug)}
                  className="w-full text-left p-2.5 bg-[#1c1e24] text-xs font-bold text-slate-200 hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{svc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-bold text-slate-300">
              <button onClick={() => handleSectionClick('how-we-work')} className="w-full text-left py-2 hover:text-amber-400">
                How We Work (SOP)
              </button>
              <button onClick={() => handleSectionClick('packages')} className="w-full text-left py-2 hover:text-amber-400">
                Turnkey Packages
              </button>
              <button onClick={() => handleSectionClick('freezones')} className="w-full text-left py-2 hover:text-amber-400">
                Free Zones Directory (40+)
              </button>
              <button onClick={() => handleSectionClick('cost-calculator')} className="w-full text-left py-2 hover:text-amber-400">
                Cost & Tax Calculator
              </button>
              <button onClick={() => handleSectionClick('client-stories')} className="w-full text-left py-2 hover:text-amber-400">
                Client Stories
              </button>
              <button onClick={() => handleSectionClick('about')} className="w-full text-left py-2 hover:text-amber-400">
                About AnalyzeMarkets FZE
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full bg-amber-500 text-slate-950 font-black text-xs uppercase py-3 text-center"
            >
              Book Strategy Consultation
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
