import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Menu,
  X,
  Building2,
  Award,
  RefreshCw,
  Receipt,
  FileCheck2,
  Calculator,
  XCircle,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  Search
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';
import { UserSession } from '../auth/AuthModal';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { ServiceSlug } from '../../data/servicesData';

interface NavbarProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onOpenSearch?: () => void;
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
  onOpenSearch,
  user,
  onLogout,
  lang,
  onToggleLang,
  currency = 'AED',
  onSetCurrency,
  onNavigateService,
  onNavigateSection,
  onNavigateHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const servicesList: { name: string; tag: string; slug: ServiceSlug; icon: any; desc: string }[] = [
    { name: isAr ? 'تأسيس الشركات وإصدار التراخيص' : 'Company Incorporation', tag: 'Mainland & Free Zone', slug: 'company-incorporation', icon: Building2, desc: 'Turnkey formation across Mainland DED, 40+ Free Zones, and Offshore SPVs.' },
    { name: isAr ? 'خدمات تصفية وإلغاء الشركات' : 'Company Liquidation Services', tag: 'Official Liquidator', slug: 'company-liquidation-services', icon: XCircle, desc: 'Official liquidator appointment, clearance letters, and formal de-registration.' },
    { name: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services', tag: '10-Year Long-Term', slug: 'golden-visa-services', icon: Award, desc: '10-year Golden Visa processing for investors, founders, and specialized talent.' },
    { name: isAr ? 'خدمات تجديد الرخص (PRO)' : 'License Renewal (PRO) Services', tag: 'Annual Compliance', slug: 'license-renewal-pro-services', icon: RefreshCw, desc: 'Trade license renewals, Ejari attestation, and Establishment Card renewals.' },
    { name: isAr ? 'خدمات ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing Services', tag: 'FTA Agent 9%', slug: 'vat-corporate-tax-filing-services', icon: Receipt, desc: 'FTA TRN registration, 9% Corporate Tax filing, and QFZP 0% optimization.' },
    { name: isAr ? 'خدمات التدقيق والضمان المالي' : 'Audit & Assurance Services', tag: 'Bank & Free Zone Audit', slug: 'audit-and-assurance-services', icon: FileCheck2, desc: 'Statutory annual audit reports and financial assurance accepted by UAE banks.' },
    { name: isAr ? 'خدمات المحاسبة ومسك الدفاتر' : 'Accounting Services', tag: 'WPS & Bookkeeping', slug: 'accounting-services', icon: Calculator, desc: 'Monthly bookkeeping, balance sheet reconciliations, and WPS payroll.' },
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
    <header className="fixed top-0 left-0 right-0 z-50 font-sans" ref={navRef}>
      
      {/* Top Strip */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs font-mono py-1.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-300">
            <span>Sharjah Research Technology & Innovation Park (SRTI Park HQ: Block B - Office B34-B047)</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Official License #B34-B047</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">● Ministry Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Clean White Nav */}
      <div className={'transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-slate-200 ' + (isScrolled ? 'py-3 shadow-sm' : 'py-4')}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex items-center gap-3 shrink-0 whitespace-nowrap text-left cursor-pointer">
            <AmDxbLogo size="sm" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 whitespace-nowrap text-slate-800 text-xs font-semibold">
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-900 font-bold"
              >
                <span>{isAr ? 'خدماتنا' : 'Our Services'}</span>
                <ChevronDown className={'w-3.5 h-3.5 transition-transform ' + (servicesOpen ? 'rotate-180' : '')} />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-scaleUp">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2 text-xs divide-y divide-slate-100">
                    <div className="p-2 space-y-1">
                      {servicesList.map((svc, idx) => {
                        const Icon = svc.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(svc.slug)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 group text-slate-800"
                          >
                            <div className="p-2 rounded-lg bg-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-xs block truncate text-slate-900">{svc.name}</span>
                              <span className="text-[10px] font-mono text-slate-500 block truncate">{svc.tag}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleSectionClick('packages')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'الباقات' : 'Packages'}
            </button>

            <button onClick={() => handleSectionClick('how-we-work')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'منهجية العمل' : 'How We Work'}
            </button>

            <button onClick={() => handleSectionClick('freezones')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'المناطق الحرة' : 'Free Zones'}
            </button>

            <button onClick={() => handleSectionClick('cost-calculator')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'حاسبة التكاليف' : 'Cost Calculator'}
            </button>

            <button onClick={() => handleSectionClick('client-stories')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'قصص النجاح' : 'Client Stories'}
            </button>

            <button onClick={() => handleSectionClick('about')} className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              {isAr ? 'عن الشركة' : 'About'}
            </button>

          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center space-x-2.5 shrink-0 whitespace-nowrap">
            
            {/* Search ⌘K */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="px-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono text-slate-600 rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                title="Search Free Zones and Activities (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden xl:inline text-[11px]">Search...</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] text-slate-500 font-bold">⌘K</kbd>
              </button>
            )}

            {/* Currency */}
            {onSetCurrency && (
              <button
                onClick={() => {
                  const order = ['AED', 'USD', 'EUR', 'GBP'];
                  const nextIdx = (order.indexOf(currency) + 1) % order.length;
                  onSetCurrency(order[nextIdx]);
                }}
                className="px-2.5 py-1.5 border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-slate-800 hover:border-slate-400 transition-all rounded-lg cursor-pointer"
              >
                {currency}
              </button>
            )}

            {/* Language */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 hover:border-slate-400 transition-all rounded-lg cursor-pointer inline-flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>{isAr ? 'EN' : 'العربية'}</span>
            </button>

            {/* CTA */}
            <button
              onClick={() => onOpenConsultation()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? 'احجز استشارة' : 'Schedule Advisory'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Mobile Menu & Search */}
          <div className="lg:hidden flex items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 border border-slate-200 rounded-lg text-slate-700 bg-slate-50"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onOpenConsultation()}
              className="px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg"
            >
              {isAr ? 'استشارة' : 'Inquire'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-200 rounded-lg text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 max-h-[85vh] overflow-y-auto text-slate-900">
          <div className="space-y-1">
            <div className="font-bold text-xs uppercase text-slate-500 px-2 mb-2">Our Services:</div>
            {servicesList.map((svc, idx) => (
              <button
                key={idx}
                onClick={() => handleServiceClick(svc.slug)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <span>{svc.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-bold text-slate-800">
            <button onClick={() => handleSectionClick('packages')} className="w-full text-left py-2 px-2">Packages</button>
            <button onClick={() => handleSectionClick('how-we-work')} className="w-full text-left py-2 px-2">How We Work</button>
            <button onClick={() => handleSectionClick('freezones')} className="w-full text-left py-2 px-2">Free Zones Directory</button>
            <button onClick={() => handleSectionClick('cost-calculator')} className="w-full text-left py-2 px-2">Cost Calculator</button>
            <button onClick={() => handleSectionClick('client-stories')} className="w-full text-left py-2 px-2">Client Stories</button>
            <button onClick={() => handleSectionClick('about')} className="w-full text-left py-2 px-2">About Us</button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full bg-slate-900 text-white font-bold text-xs uppercase py-3 rounded-lg text-center"
            >
              Schedule Advisory Meeting
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
