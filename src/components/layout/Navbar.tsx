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
  Layers,
  Sun,
  Moon,
  DollarSign,
  MessageCircle
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
        ? (isDarkMode ? 'bg-[#030712]/95 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-2.5 text-slate-100' : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-2.5 text-slate-900')
        : (isDarkMode ? 'bg-[#030712]/85 backdrop-blur-sm py-3.5 border-b border-white/[0.04] text-slate-100' : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-200 text-slate-900')
    )}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <button onClick={handleHomeClick} className="flex items-center gap-3 shrink-0 whitespace-nowrap group text-left cursor-pointer">
          <AmDxbLogo size="sm" />
        </button>

        {/* Central Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap font-sans">
          
          {/* Home */}
          <button
            onClick={handleHomeClick}
            className="text-xs font-bold px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
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
              className={'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ' + (
                servicesOpen
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/15'
                  : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              )}
            >
              <span>{isAr ? 'خدماتنا' : 'Our Services'}</span>
              <ChevronDown className={'w-3.5 h-3.5 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180 text-sky-500' : 'text-slate-400')} />
            </button>

            {/* Dropped Menu Box */}
            {servicesOpen && (
              <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-scaleUp font-sans">
                <div className="bg-white dark:bg-[#090e1f] border border-slate-200 dark:border-sky-500/30 rounded-2xl shadow-2xl p-2 text-xs divide-y divide-slate-100 dark:divide-[#1e293b]/60 backdrop-blur-xl">
                  
                  <div className="pb-1.5 mb-1 px-2 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">{isAr ? 'كافة الخدمات المعتمدة' : 'Official Services (7)'}</span>
                    <button
                      onClick={() => handleSectionClick('other-services')}
                      className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5 cursor-pointer font-sans font-bold"
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
                          className="w-full text-left p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-500/15 transition-all cursor-pointer flex items-center gap-3 group border border-transparent hover:border-sky-300 dark:hover:border-sky-500/30"
                        >
                          <div className="p-2 rounded-lg bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-white/10 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-xs block truncate text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300">{svc.name}</span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block truncate">{svc.tag}</span>
                          </div>
                          <span className="text-[11px] font-mono text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">➔</span>
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
            className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'المناطق الحرة' : 'Free Zones'}
          </button>

          {/* Packages */}
          <button
            type="button"
            onClick={() => handleSectionClick('packages')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'الباقات' : 'Packages'}
          </button>

          {/* About */}
          <button
            type="button"
            onClick={() => handleSectionClick('about')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'عن الشركة' : 'About'}
          </button>

          {/* Contact Us */}
          <button
            type="button"
            onClick={() => handleSectionClick('faq')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
          >
            {isAr ? 'اتصل بنا' : 'Contact Us'}
          </button>

        </nav>

        {/* Right Action Controls - Clean Luxury Enterprise Layout */}
        <div className="hidden sm:flex items-center space-x-2.5 shrink-0 whitespace-nowrap">
          
          {/* Quick Currency Switcher */}
          {onSetCurrency && (
            <button
              onClick={() => {
                const order = ['AED', 'USD', 'EUR', 'GBP'];
                const nextIdx = (order.indexOf(currency) + 1) % order.length;
                onSetCurrency(order[nextIdx]);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-slate-900/90 text-xs font-mono font-bold text-slate-800 dark:text-sky-400 hover:border-sky-400 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              title="Click to cycle currency (AED / USD / EUR / GBP)"
            >
              <span>{currency}</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-slate-900/80 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            title="Switch Language (English / العربية)"
          >
            <Globe className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Quick Theme Toggle (Sun / Moon) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-sky-400 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Moon className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
            </button>
          )}

          {/* User Account / Admin Menu (Clean Avatar Dropdown) */}
          {user ? (
            <div className="relative shrink-0 whitespace-nowrap" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold hover:ring-2 hover:ring-sky-400 transition-all cursor-pointer shadow-sm"
                title={user.name}
              >
                {user.name.charAt(0)}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-2xl py-2 z-50 animate-scaleUp font-sans text-xs">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-white/[0.08]">
                    <span className="font-bold text-slate-900 dark:text-white block truncate">{user.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{user.email}</span>
                  </div>

                  <button
                    onClick={() => { setUserMenuOpen(false); onOpenAdmin(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Admin Sales CRM</span>
                  </button>

                  <button
                    onClick={() => { setUserMenuOpen(false); onOpenSettings(); }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => { setUserMenuOpen(false); onLogout(); }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2 border-t border-slate-100 dark:border-white/[0.08] cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Primary Consultation Call CTA */}
          <Button
            onClick={() => onOpenConsultation()}
            variant="primary"
            size="sm"
            className="font-bold text-xs shadow-md shadow-sky-500/25 py-2 px-4 rounded-xl flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{isAr ? 'حجز استشارة' : 'Book a Call'}</span>
          </Button>

        </div>

        {/* Mobile Header Quick Actions */}
        <div className="lg:hidden flex items-center gap-1.5 whitespace-nowrap">
          
          {/* Mobile Currency Switcher */}
          {onSetCurrency && (
            <button
              onClick={() => {
                const order = ['AED', 'USD', 'EUR', 'GBP'];
                const nextIdx = (order.indexOf(currency) + 1) % order.length;
                onSetCurrency(order[nextIdx]);
              }}
              className="px-2 py-1 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-100 dark:bg-slate-900 text-[11px] font-mono font-bold text-slate-800 dark:text-sky-400 hover:border-sky-400 transition-all cursor-pointer shadow-sm"
              title="Change Currency"
            >
              {currency}
            </button>
          )}

          {/* Mobile Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-100 dark:bg-slate-900 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-sky-400 transition-all cursor-pointer shadow-sm"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-sky-500" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Mobile Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-500" />}
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/[0.1]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#070b16] border-b border-slate-200 dark:border-white/[0.08] px-4 pt-3 pb-6 space-y-4 shadow-2xl font-sans max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Drawer Settings Hub: Currency, Language & Theme */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0c1427] border border-slate-200 dark:border-white/[0.06] space-y-3">
            
            {/* Currency Segmented Picker */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5 font-bold">
                {isAr ? 'العملة المختارة (Live Conversion):' : 'Active Currency (Live Conversion):'}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {['AED', 'USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => onSetCurrency && onSetCurrency(curr)}
                    className={'py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ' + (
                      currency === curr
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]'
                    )}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Language & Theme Controls */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-white/[0.06]">
              {/* Language Switch */}
              <button
                type="button"
                onClick={onToggleLang}
                className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>{isAr ? 'English (EN)' : 'اللغة العربية'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 shadow-sm"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-sky-500" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { setMobileMenuOpen(false); handleHomeClick(); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>

            <div className="px-3 py-1.5 text-xs font-mono font-bold text-sky-500 dark:text-sky-400 uppercase tracking-wider flex items-center justify-between border-t border-slate-200 dark:border-white/[0.06] mt-1 pt-2">
              <span>{isAr ? 'خدماتنا السبع المعتمدة:' : 'Our 7 Corporate Services:'}</span>
              <button
                onClick={() => { setMobileMenuOpen(false); handleSectionClick('other-services'); }}
                className="text-[10px] text-slate-500 dark:text-slate-400 hover:underline"
              >
                {isAr ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            <div className="space-y-1 pl-2">
              {servicesList.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setMobileMenuOpen(false); handleServiceClick(svc.slug); }}
                    className="w-full text-left p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-500/10 text-xs font-semibold cursor-pointer flex items-center justify-between border border-transparent hover:border-sky-300 dark:hover:border-sky-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-slate-900 text-sky-600 dark:text-sky-400 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{svc.name}</span>
                    </div>
                    <span className="text-[11px] text-sky-500 shrink-0">➔</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleSectionClick('freezones'); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs border-t border-slate-200 dark:border-white/[0.06] mt-2 pt-2.5 flex items-center justify-between"
            >
              <span>{isAr ? 'دليل المناطق الحرة (40+)' : 'Explore 40+ Free Zones'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold">Sharjah & Dubai</span>
            </button>

            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleSectionClick('cost-calculator'); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs flex items-center justify-between"
            >
              <span>{isAr ? 'حاسبة التكاليف والضرائب' : 'Cost & Tax Calculator'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">Interactive</span>
            </button>

            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleSectionClick('packages'); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'باقات التأسيس' : 'Turnkey Packages'}
            </button>

            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleSectionClick('about'); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'عن الشركة (SRTI Park HQ)' : 'About AnalyzeMarkets FZE'}
            </button>

            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleSectionClick('faq'); }}
              className="text-left text-slate-800 dark:text-slate-200 hover:text-sky-500 font-bold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs"
            >
              {isAr ? 'الأسئلة الشائعة والاتصال' : 'FAQ & Contact'}
            </button>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
            <Button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              variant="primary"
              className="w-full justify-center text-xs font-bold py-3 rounded-xl shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isAr ? 'احجز استشارة تنفيذية فورية' : 'Book Executive Consultation'}</span>
            </Button>

            <a
              href="https://wa.me/971563396961"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'تواصل عبر واتساب (+971 56 339 6961)' : 'Chat on WhatsApp (+971 56 339 6961)'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
