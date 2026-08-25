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
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import { UserSession } from '../auth/AuthModal';
import { AmDxbLogo } from '../ui/AmDxbLogo';

interface NavbarProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  user: UserSession | null;
  onLogout: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenAuth,
  onOpenSettings,
  onOpenAdmin,
  user,
  onLogout,
  lang,
  onToggleLang
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

  const servicesList = [
    { name: isAr ? 'تأسيس الشركات' : 'Company Incorporation', href: '#packages', serviceKey: 'Company Incorporation' },
    { name: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services', href: '#other-services', serviceKey: 'Company Liquidation' },
    { name: isAr ? 'خدمات الإقامة الذهبية' : 'Golden Visa Services', href: '#other-services', serviceKey: 'Golden Visa Services' },
    { name: isAr ? 'خدمات تجديد الرخص (PRO)' : 'License Renewal (PRO) Services', href: '#other-services', serviceKey: 'License Renewal (PRO)' },
    { name: isAr ? 'خدمات ضريبة الشركات وضريبة القيمة المضافة' : 'VAT & Corporate Tax Filing Services', href: '#other-services', serviceKey: 'VAT & Corporate Tax' },
    { name: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services', href: '#other-services', serviceKey: 'Audit & Assurance' },
    { name: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting Services', href: '#other-services', serviceKey: 'Accounting Services' },
  ];

  const handleServiceClick = (item: typeof servicesList[0]) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    const elem = document.querySelector(item.href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
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
        <a href="#" className="flex items-center gap-3 shrink-0 whitespace-nowrap group">
          <AmDxbLogo size="sm" />
        </a>

        {/* Central Navigation Menu matching live amdxb.com */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap font-sans">
          
          {/* Home */}
          <a
            href="#"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </a>

          {/* Our Services Dropdown Menu Box */}
          <div
            className="relative"
            ref={servicesMenuRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ' + (
                servicesOpen
                  ? 'text-sky-400 bg-white/[0.08]'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <span>{isAr ? 'خدماتنا' : 'Our Services'}</span>
              <ChevronDown className={'w-3.5 h-3.5 transition-transform duration-200 ' + (servicesOpen ? 'rotate-180 text-sky-400' : 'text-slate-400')} />
            </button>

            {/* Dropped Menu Box (Matching amdxb.com exact list) */}
            {servicesOpen && (
              <div className="absolute left-0 mt-1 w-72 bg-[#090e1f] border border-[#1e293b] rounded-2xl shadow-2xl py-2 z-50 animate-scaleUp font-sans text-xs divide-y divide-[#1e293b]/60">
                {servicesList.map((svc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServiceClick(svc)}
                    className="w-full text-left px-4 py-2.5 text-slate-200 hover:text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span className="font-medium text-xs leading-snug">{svc.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Free Zones */}
          <a
            href="#freezones"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap"
          >
            {isAr ? 'المناطق الحرة' : 'Free Zones'}
          </a>

          {/* Packages */}
          <a
            href="#packages"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap"
          >
            {isAr ? 'الباقات' : 'Packages'}
          </a>

          {/* About */}
          <a
            href="#about"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap"
          >
            {isAr ? 'عن الشركة' : 'About'}
          </a>

          {/* Contact Us */}
          <a
            href="#faq"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors whitespace-nowrap"
          >
            {isAr ? 'اتصل بنا' : 'Contact Us'}
          </a>

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
        <div className="lg:hidden bg-[#070b16] border-b border-white/[0.08] px-4 pt-3 pb-5 space-y-2.5 mt-2 shadow-2xl font-sans">
          <div className="flex flex-col space-y-1">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-sky-400 font-medium py-2 px-3 rounded-lg hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </a>

            <div className="px-3 py-1 text-xs font-mono font-bold text-sky-400 uppercase">
              {isAr ? 'خدماتنا:' : 'Our Services:'}
            </div>
            {servicesList.map((svc, idx) => (
              <button
                key={idx}
                onClick={() => handleServiceClick(svc)}
                className="text-left text-slate-300 hover:text-sky-300 py-1.5 px-5 text-xs font-medium cursor-pointer"
              >
                {svc.name}
              </button>
            ))}

            <a
              href="#freezones"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-sky-400 font-medium py-2 px-3 rounded-lg hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'المناطق الحرة' : 'Free Zones'}
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-sky-400 font-medium py-2 px-3 rounded-lg hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'عن الشركة' : 'About'}
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-sky-400 font-medium py-2 px-3 rounded-lg hover:bg-white/[0.06] text-sm"
            >
              {isAr ? 'اتصل بنا' : 'Contact Us'}
            </a>
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
