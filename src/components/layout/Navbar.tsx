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
  Layers
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
  onNavigateService,
  onNavigateSection,
  onNavigateHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const servicesList: { name: string; tag: string; slug: ServiceSlug; icon: any }[] = [
    { name: isAr ? 'تأسيس الشركات' : 'Company Incorporation', tag: 'Mainland / Free Zone', slug: 'company-incorporation', icon: Building2 },
    { name: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services', tag: 'Official Liquidator', slug: 'company-liquidation-services', icon: XCircle },
    { name: isAr ? 'خدمات الإقامة الذهبية' : 'Golden Visa Services', tag: '10-Year Long-Term', slug: 'golden-visa-services', icon: Award },
    { name: isAr ? 'خدمات تجديد الرخص (PRO)' : 'License Renewal (PRO) Services', tag: 'Annual Compliance', slug: 'license-renewal-pro-services', icon: RefreshCw },
    { name: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services', tag: 'FTA Agent 9%', slug: 'vat-corporate-tax-filing-services', icon: Receipt },
    { name: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services', tag: 'Bank & Free Zone Audit', slug: 'audit-and-assurance-services', icon: FileCheck2 },
    { name: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting Services', tag: 'WPS & Cloud Bookkeeping', slug: 'accounting-services', icon: Calculator },
  ];

  const handleServiceClick = (slug: ServiceSlug) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateService) {
      onNavigateService(slug);
    }
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setServicesOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header className={'fixed top-0 left-0 right-0 z-40 transition-all duration-200 ' + (
      isScrolled
        ? 'bg-[#050811]/95 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-2.5'
        : 'bg-[#050811]/85 backdrop-blur-sm py-3.5 border-b border-white/[0.04]'
    )}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <button onClick={handleHomeClick} className="flex items-center gap-3 shrink-0 whitespace-nowrap group text-left cursor-pointer">
          <AmDxbLogo size="sm" />
        </button>

        {/* Central Navigation Menu matching live amdxb.com */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap font-sans">
          
          {/* Home */}
          <button
            onClick={handleHomeClick}
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </button>

          {/* Our Services Dropdown Menu Box */}
          <div
            className="relative"
            ref={servicesMenuRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ' + (
                servicesOpen
                  ? 'text-sky-400 bg-white/[0.08]'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <span>{isAr ? 'خدماتنا' : 'Our Services'}</span>
              <ChevronDown className={'w-3.5 h-3.5 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180 text-sky-400' : 'text-slate-400')} />
            </button>

            {/* Dropped Menu Box (7 Dedicated Service Pages with Zero Gap) */}
            {servicesOpen && (
              <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-scaleUp font-sans">
                <div className="bg-[#090e1f] border border-sky-500/30 rounded-2xl shadow-2xl p-2 text-xs divide-y divide-[#1e293b]/60 backdrop-blur-xl">
                  
                  {/* Top All Services Anchor */}
                  <div className="pb-1.5 mb-1 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="font-bold text-sky-400 uppercase tracking-wider">{isAr ? 'كافة الخدمات المعتمدة' : 'Official Services (7)'}</span>
                    <button
                      onClick={() => handleSectionClick('other-services')}
                      className="text-sky-400 hover:underline flex items-center gap-0.5 cursor-pointer font-sans"
                    >
                      <span>{isAr ? 'عرض الكل' : 'View All'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-1 pt-1">
                    {servicesList.map((svc, idx) => {
                      const Icon = svc.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleServiceClick(svc.slug)}
                          className="w-full text-left p-2 rounded-xl text-slate-200 hover:text-white hover:bg-sky-500/15 transition-all cursor-pointer flex items-center gap-3 group border border-transparent hover:border-sky-500/30"
                        >
                          <div className="p-2 rounded-lg bg-slate-900 border border-white/10 text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-xs block truncate text-slate-100 group-hover:text-sky-300">{svc.name}</span>
                            <span className="text-[10px] font-mono text-slate-400 block truncate">{svc.tag}</span>
                          </div>
                          <span className="text-[11px] font-mono text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">➔</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Free Zones */}
          <button
            type="button"
            onClick={() => handleSectionClick('freezones')}
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'المناطق الحرة' : 'Free Zones'}
          </button>

          {/* Packages */}
          <button
            type="button"
            onClick={() => handleSectionClick('packages')}
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'الباقات' : 'Packages'}
          </button>

          {/* About */}
          <button
            type="button"
            onClick={() => handleSectionClick('about')}
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'عن الشركة' : 'About'}
          </button>

          {/* Contact Us */}
          <button
            type="button"
            onClick={() => handleSectionClick('faq')}
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'اتصل بنا' : 'Contact Us'}
          </button>

        </nav>

        {/* Right Action Controls */}
        <div className="hidden sm:flex items-center space-x-2 shrink-0 whitespace-nowrap">
          
          {/* Admin CRM Button */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 text-xs font-mono font-bold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/60 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            title="Executive Sales CRM Server"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">Admin CRM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/[0.1] bg-slate-900/80 text-xs font-bold text-slate-200 hover:border-sky-400 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            title="Switch Language (English / العربية)"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl border border-white/[0.1] bg-slate-900/80 text-slate-300 hover:text-white hover:border-sky-400 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Auth State */}
          {user ? (
            <div className="relative shrink-0 whitespace-nowrap" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sky-500/40 bg-sky-950/60 text-xs font-semibold text-white hover:border-sky-400 transition-all cursor-pointer whitespace-nowrap"
              >
                <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[110px] truncate whitespace-nowrap">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#0c1324] border border-white/[0.1] rounded-2xl shadow-2xl py-2 z-50 animate-scaleUp font-sans text-xs">
                  <div className="px-4 py-2 border-b border-white/[0.08]">
                    <span className="font-bold text-white block truncate">{user.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate">{user.email}</span>
                  </div>

                  <button
                    onClick={() => { setUserMenuOpen(false); onOpenAdmin(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/[0.06] text-slate-200 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Admin Sales CRM</span>
                  </button>

                  <button
                    onClick={() => { setUserMenuOpen(false); onLogout(); }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-950/40 text-rose-400 flex items-center gap-2 border-t border-white/[0.08] cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={onOpenAuth}
              variant="secondary"
              size="sm"
              className="text-xs font-semibold whitespace-nowrap shrink-0 py-1.5 px-3"
            >
              <User className="w-3 h-3 mr-1 text-sky-400 shrink-0" />
              <span className="whitespace-nowrap">{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
            </Button>
          )}

          {/* Cyan "BOOK A CALL" / Consultation Button matching amdxb.com */}
          <Button
            onClick={() => onOpenConsultation()}
            variant="primary"
            size="sm"
            className="text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 hover:from-sky-300 hover:to-cyan-300 shadow-lg shadow-sky-400/25 whitespace-nowrap shrink-0 py-2 px-4"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-slate-950 shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'احجز مكالمة' : 'BOOK A CALL'}</span>
          </Button>

        </div>

        {/* Mobile Header Buttons */}
        <div className="lg:hidden flex items-center gap-1.5 whitespace-nowrap">
          <button
            onClick={onOpenAdmin}
            className="px-2 py-1 rounded-lg border border-emerald-500/40 bg-emerald-950/60 text-[10px] font-mono font-bold text-emerald-400 whitespace-nowrap"
          >
            Admin CRM
          </button>

          <Button onClick={() => onOpenConsultation()} size="sm" variant="primary" className="text-xs py-1 px-2.5 whitespace-nowrap font-bold">
            {isAr ? 'مكالمة' : 'BOOK A CALL'}
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-white/[0.08]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b16] border-b border-white/[0.08] px-4 pt-3 pb-5 space-y-2.5 mt-2 shadow-2xl font-sans max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <button
              onClick={handleHomeClick}
              className="text-left text-slate-200 hover:text-sky-400 font-bold py-2 px-3 rounded-lg hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>

            <div className="px-3 py-1.5 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center justify-between border-t border-white/[0.06] mt-1 pt-2">
              <span>{isAr ? 'خدماتنا السبع:' : 'Our 7 Services:'}</span>
              <button
                onClick={() => handleSectionClick('other-services')}
                className="text-[10px] text-slate-400 hover:underline"
              >
                {isAr ? 'نظرة عامة' : 'Overview'}
              </button>
            </div>

            <div className="space-y-1 pl-2">
              {servicesList.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleServiceClick(svc.slug)}
                    className="w-full text-left p-2 rounded-xl text-slate-300 hover:text-white hover:bg-sky-500/10 text-xs font-medium cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{svc.name}</span>
                    </div>
                    <span className="text-[10px] text-sky-400 shrink-0">➔</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleSectionClick('freezones')}
              className="text-left text-slate-200 hover:text-sky-400 font-semibold py-2 px-3 rounded-lg hover:bg-white/[0.06] text-xs border-t border-white/[0.06] mt-2 pt-2"
            >
              {isAr ? 'المناطق الحرة' : 'Free Zones'}
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick('packages')}
              className="text-left text-slate-200 hover:text-sky-400 font-semibold py-2 px-3 rounded-lg hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'الباقات' : 'Packages'}
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick('about')}
              className="text-left text-slate-200 hover:text-sky-400 font-semibold py-2 px-3 rounded-lg hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'عن الشركة' : 'About'}
            </button>

            <button
              type="button"
              onClick={() => handleSectionClick('faq')}
              className="text-left text-slate-200 hover:text-sky-400 font-semibold py-2 px-3 rounded-lg hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'اتصل بنا' : 'Contact Us'}
            </button>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <Button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} variant="primary" className="w-full justify-center text-xs font-bold">
              {isAr ? 'احجز مكالمة استشارية' : 'BOOK A CALL'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
