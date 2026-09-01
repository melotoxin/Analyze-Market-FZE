import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Search
} from 'lucide-react';
import { Language } from '../../data/translations';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { NavBlinkText } from '../ui/NavBlinkText';
import { ServiceSlug, getServiceNav } from '../../data/servicesData';
import { SERVICE_ICONS } from '../../data/serviceIcons';
import { servicePath } from '../../utils/router';

interface NavbarProps {
  onOpenConsultation: (serviceName?: string) => void;
  onOpenSearch: () => void;
  lang: Language;
  onToggleLang: () => void;
  currency: string;
  onCycleCurrency: () => void;
  onNavigateService: (slug: ServiceSlug) => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenSearch,
  lang,
  onToggleLang,
  currency,
  onCycleCurrency,
  onNavigateService,
  onNavigateSection,
  onNavigateHome,
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

  // Derived from the catalog: menu labels used to be duplicated here and in the
  // footer, and had already drifted out of sync with each other.
  const servicesList = getServiceNav(lang);



  const handleServiceClick = (slug: ServiceSlug) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigateService(slug);
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
    }
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigateHome();
  };

  const handleSectionClick = (sectionId: string) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const navLinkClass =
    'shrink-0 px-2 xl:px-3 py-2 rounded-lg cursor-pointer nav-link-glow text-slate-800 font-semibold';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans" ref={navRef}>
      
      {/* Top Strip */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs font-mono py-1.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-300 min-w-0">
            <span className="truncate">
              <span className="lg:hidden">SRTI Park, Sharjah · Office B34-047</span>
              <span className="hidden lg:inline xl:hidden">SRTI Park HQ · Block B, Office B34-047</span>
              <span className="hidden xl:inline">Sharjah Research Technology & Innovation Park (SRTI Park HQ: Block B - Office B34-047)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <span className="hidden lg:inline">Licensed by SRTI Park, Sharjah</span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold whitespace-nowrap">
              <span className="xl:hidden">● Compliant</span>
              <span className="hidden xl:inline">● Ministry Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Clean White Nav */}
      <div className={'transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-slate-200 ' + (isScrolled ? 'py-3 shadow-sm' : 'py-4')}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a
            href="/"
            onClick={handleHomeClick}
            aria-label="AM DXB home"
            className="flex items-center gap-3 shrink-0 whitespace-nowrap text-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg"
          >
            <AmDxbLogo size="sm" />
          </a>

          {/* Desktop Nav Links — full labels at xl+, short labels at lg to avoid crowding */}
          <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 xl:gap-1 2xl:gap-1.5 whitespace-nowrap text-slate-800 text-[11px] xl:text-xs font-semibold">
            
            {/* Services Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                className={'inline-flex items-center gap-1 px-2 xl:px-3 py-2 rounded-lg cursor-pointer text-slate-900 font-bold nav-link-glow'}
              >
                <span className="xl:hidden">
                  <NavBlinkText active={servicesOpen}>{isAr ? 'خدماتنا' : 'Services'}</NavBlinkText>
                </span>
                <span className="hidden xl:inline">
                  <NavBlinkText active={servicesOpen}>{isAr ? 'خدماتنا' : 'Our Services'}</NavBlinkText>
                </span>
                <ChevronDown className={'w-3.5 h-3.5 shrink-0 transition-transform ' + (servicesOpen ? 'rotate-180' : '')} />
              </button>

              {servicesOpen && (
                <div className="absolute start-0 top-full pt-2 w-80 z-50 animate-scaleUp">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2 text-xs divide-y divide-slate-100">
                    <div className="p-2 space-y-1">
                      {servicesList.map((svc, idx) => {
                        const Icon = SERVICE_ICONS[svc.slug];
                        return (
                          <a
                            key={idx}
                            href={servicePath(svc.slug)}
                            onClick={(e) => {
                              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                              e.preventDefault();
                              handleServiceClick(svc.slug);
                            }}
                            className="w-full text-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 group text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          >
                            <div className="p-2 rounded-lg bg-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-xs block truncate text-slate-900">{svc.label}</span>
                              <span className="text-[10px] font-mono text-slate-500 block truncate">{svc.tag}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleSectionClick('packages')} className={navLinkClass}>
              <NavBlinkText>{isAr ? 'الباقات' : 'Packages'}</NavBlinkText>
            </button>

            <button onClick={() => handleSectionClick('how-we-work')} className={navLinkClass}>
              <span className="xl:hidden">
                <NavBlinkText>{isAr ? 'المنهجية' : 'Process'}</NavBlinkText>
              </span>
              <span className="hidden xl:inline">
                <NavBlinkText>{isAr ? 'منهجية العمل' : 'How We Work'}</NavBlinkText>
              </span>
            </button>

            <button onClick={() => handleSectionClick('freezones')} className={navLinkClass}>
              <span className="xl:hidden">
                <NavBlinkText>{isAr ? 'الحرة' : 'Zones'}</NavBlinkText>
              </span>
              <span className="hidden xl:inline">
                <NavBlinkText>{isAr ? 'المناطق الحرة' : 'Free Zones'}</NavBlinkText>
              </span>
            </button>

            <button onClick={() => handleSectionClick('cost-calculator')} className={navLinkClass}>
              <span className="xl:hidden">
                <NavBlinkText>{isAr ? 'الحاسبة' : 'Calculator'}</NavBlinkText>
              </span>
              <span className="hidden xl:inline">
                <NavBlinkText>{isAr ? 'حاسبة التكاليف' : 'Cost Calculator'}</NavBlinkText>
              </span>
            </button>

            <button onClick={() => handleSectionClick('client-stories')} className={navLinkClass}>
              <span className="xl:hidden">
                <NavBlinkText>{isAr ? 'قصص' : 'Stories'}</NavBlinkText>
              </span>
              <span className="hidden xl:inline">
                <NavBlinkText>{isAr ? 'قصص النجاح' : 'Client Stories'}</NavBlinkText>
              </span>
            </button>

            <button onClick={() => handleSectionClick('about')} className={navLinkClass}>
              <NavBlinkText>{isAr ? 'عن الشركة' : 'About'}</NavBlinkText>
            </button>

          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 shrink-0 whitespace-nowrap">
            
            {/* Search ⌘K */}
            <button
              onClick={onOpenSearch}
              aria-label="Search free zones and activities"
              className="p-2 xl:px-3 xl:py-1.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono text-slate-600 rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden 2xl:inline text-[11px]">Search...</span>
              <kbd className="hidden 2xl:inline px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] text-slate-500 font-bold">⌘K</kbd>
            </button>

            {/* Currency */}
            <button
              onClick={onCycleCurrency}
              aria-label={'Change currency, currently ' + currency}
              className="px-2.5 py-1.5 border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-slate-800 hover:border-slate-400 transition-all rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {currency}
            </button>

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
              className="px-2.5 xl:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] xl:text-xs uppercase tracking-wide xl:tracking-wider rounded-lg transition-all shadow-sm inline-flex items-center gap-1 cursor-pointer"
            >
              <span className="xl:hidden">{isAr ? 'استشارة' : 'Advisory'}</span>
              <span className="hidden xl:inline">{isAr ? 'احجز استشارة' : 'Schedule Advisory'}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

          </div>

          {/* Mobile Menu & Search */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenConsultation()}
              className="px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg"
            >
              {isAr ? 'استشارة' : 'Inquire'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
              <a
                key={idx}
                href={servicePath(svc.slug)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  handleServiceClick(svc.slug);
                }}
                className="w-full text-start p-2.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between rtl:flex-row-reverse"
              >
                <span>{svc.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-bold text-slate-800">
            <button onClick={() => handleSectionClick('packages')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>Packages</NavBlinkText></button>
            <button onClick={() => handleSectionClick('how-we-work')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>How We Work</NavBlinkText></button>
            <button onClick={() => handleSectionClick('freezones')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>Free Zones Directory</NavBlinkText></button>
            <button onClick={() => handleSectionClick('cost-calculator')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>Cost Calculator</NavBlinkText></button>
            <button onClick={() => handleSectionClick('client-stories')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>Client Stories</NavBlinkText></button>
            <button onClick={() => handleSectionClick('about')} className="w-full text-start py-2 px-2 rounded-lg nav-link-glow"><NavBlinkText>About Us</NavBlinkText></button>
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
