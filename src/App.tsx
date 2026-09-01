import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { TrustBar } from './components/trust/TrustBar';
import { Footer } from './components/layout/Footer';
import { HeroCompanyConfigurator } from './components/hero/HeroCompanyConfigurator';
import { OtherServicesSection } from './components/services/OtherServicesSection';
import { QuickConsultationModal } from './components/consultation/QuickConsultationModal';
import { CommandSearchModal } from './components/search/CommandSearchModal';
import { MobileBottomDock } from './components/layout/MobileBottomDock';
import { NotFoundSection } from './components/layout/NotFoundSection';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { ServiceSlug } from './data/servicesData';
import { Language } from './data/translations';
import { CURRENCIES, Currency, isCurrency } from './data/pricing';
import { usePersistentState } from './utils/usePersistentState';
import { useRoute, useDocumentMeta } from './utils/router';
import { WHATSAPP_URL, openExternal, openAdvisoryEmail } from './utils/submitLead';

// Everything below the fold is split out of the initial bundle: the landing view
// only needs the hero, the trust ribbon and the services grid to be interactive.
const ClientStoriesSection = lazy(() =>
  import('./components/stories/ClientStoriesSection').then((m) => ({
    default: m.ClientStoriesSection,
  })),
);
const PackagesSection = lazy(() =>
  import('./components/packages/PackagesSection').then((m) => ({ default: m.PackagesSection })),
);
const FormationRoadmapSection = lazy(() =>
  import('./components/roadmap/FormationRoadmapSection').then((m) => ({
    default: m.FormationRoadmapSection,
  })),
);
const FreeZonesDirectory = lazy(() =>
  import('./components/freezones/FreeZonesDirectory').then((m) => ({
    default: m.FreeZonesDirectory,
  })),
);
const UaeCostVisualizerSection = lazy(() =>
  import('./components/calculator/UaeCostVisualizerSection').then((m) => ({
    default: m.UaeCostVisualizerSection,
  })),
);
const JurisdictionComparison = lazy(() =>
  import('./components/comparison/JurisdictionComparison').then((m) => ({
    default: m.JurisdictionComparison,
  })),
);
const WhyUaeSection = lazy(() =>
  import('./components/why-uae/WhyUaeSection').then((m) => ({ default: m.WhyUaeSection })),
);
const AboutSection = lazy(() =>
  import('./components/about/AboutSection').then((m) => ({ default: m.AboutSection })),
);
const FaqSection = lazy(() =>
  import('./components/faq/FaqSection').then((m) => ({ default: m.FaqSection })),
);
const ServiceDetailPage = lazy(() =>
  import('./components/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
);

const isLanguage = (v: string): v is Language => v === 'en' || v === 'ar';

/** Reserves vertical space while a split section loads, so nothing jumps. */
const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);

  const [route, navigate] = useRoute();
  const activeServiceSlug = route.slug;
  const [lang, setLang] = usePersistentState<Language>('amdxb:lang', 'en', isLanguage);
  const [currency, setCurrency] = usePersistentState<Currency>('amdxb:currency', 'AED', isCurrency);

  useDocumentMeta(activeServiceSlug, lang, route.notFound);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Keep the document's language and reading direction in step with the toggle.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const handleOpenConsultation = useCallback((pkgName?: string) => {
    setSelectedPackage(pkgName);
    setIsConsultationOpen(true);
  }, []);

  const handleNavigateService = useCallback(
    (slug: ServiceSlug) => {
      navigate(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate],
  );

  const handleNavigateHome = useCallback(() => {
    navigate(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      const scrollToSection = () =>
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

      if (activeServiceSlug) {
        navigate(null);
        // The home sections are lazy; poll briefly for the target rather than
        // guessing a fixed delay that breaks on a slow connection.
        let attempts = 0;
        const tick = () => {
          if (document.getElementById(sectionId) || attempts++ > 60) scrollToSection();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      } else {
        scrollToSection();
      }
    },
    [activeServiceSlug, navigate],
  );

  const handleCommandSearchAction = useCallback(
    (actionType: string, value?: string) => {
      switch (actionType) {
        case 'scroll-calculator':
          handleNavigateSection('cost-calculator');
          break;
        case 'consult-visa':
          handleOpenConsultation('Golden Visa Services');
          break;
        case 'consult-srti':
          handleOpenConsultation('SRTI Park Setup');
          break;
        case 'whatsapp':
          openExternal(WHATSAPP_URL);
          break;
        case 'email':
          openAdvisoryEmail({
            name: 'Prospective client',
            phone: 'To be provided',
            service: 'Command search advisory enquiry',
          });
          break;
        case 'freezone':
          handleOpenConsultation('Free Zone Inquiry: ' + value);
          break;
        case 'activity':
          handleOpenConsultation('Activity Setup: ' + value);
          break;
      }
    },
    [handleNavigateSection, handleOpenConsultation],
  );

  const cycleCurrency = useCallback(() => {
    setCurrency(CURRENCIES[(CURRENCIES.indexOf(currency) + 1) % CURRENCIES.length]);
  }, [currency, setCurrency]);

  const toggleLanguage = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en');
  }, [lang, setLang]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white font-sans relative pb-16 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onOpenSearch={() => setIsCommandSearchOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onCycleCurrency={cycleCurrency}
        onNavigateService={handleNavigateService}
        onNavigateSection={handleNavigateSection}
        onNavigateHome={handleNavigateHome}
      />

      {route.notFound ? (
        <main id="main-content" className="flex-grow relative z-10">
          <NotFoundSection
            lang={lang}
            onNavigateHome={handleNavigateHome}
            onNavigateService={handleNavigateService}
          />
        </main>
      ) : activeServiceSlug ? (
        <main id="main-content" className="flex-grow relative z-10">
          <Suspense fallback={<SectionFallback />}>
            <ServiceDetailPage
              slug={activeServiceSlug}
              onBack={handleNavigateHome}
              onSelectService={handleNavigateService}
              onOpenConsultation={handleOpenConsultation}
              lang={lang}
            />
          </Suspense>
        </main>
      ) : (
        <main id="main-content" className="flex-grow relative z-10">
          <HeroCompanyConfigurator
            onOpenConsultation={handleOpenConsultation}
            lang={lang}
            currency={currency}
          />

          <ScrollReveal direction="up" delay={0.1}>
            <OtherServicesSection
              onOpenConsultation={handleOpenConsultation}
              onNavigateService={handleNavigateService}
              lang={lang}
            />
          </ScrollReveal>

          <Suspense fallback={<SectionFallback />}>
            <ScrollReveal direction="up" delay={0.1}>
              <ClientStoriesSection onOpenConsultation={handleOpenConsultation} lang={lang} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <PackagesSection
                onSelectPackage={handleOpenConsultation}
                lang={lang}
                currency={currency}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <FormationRoadmapSection onOpenConsultation={handleOpenConsultation} lang={lang} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <FreeZonesDirectory
                onOpenConsultation={handleOpenConsultation}
                lang={lang}
                currency={currency}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <UaeCostVisualizerSection
                onOpenConsultation={handleOpenConsultation}
                lang={lang}
                currency={currency}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <JurisdictionComparison onOpenConsultation={handleOpenConsultation} lang={lang} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <WhyUaeSection lang={lang} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <AboutSection onOpenConsultation={() => handleOpenConsultation()} lang={lang} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <TrustBar />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <FaqSection lang={lang} />
            </ScrollReveal>
          </Suspense>
        </main>
      )}

      <Footer
        onNavigateService={handleNavigateService}
        lang={lang}
      />

      <QuickConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultPackage={selectedPackage}
        lang={lang}
      />

      <CommandSearchModal
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
        onSelectAction={handleCommandSearchAction}
        lang={lang}
      />

      <MobileBottomDock onOpenConsultation={handleOpenConsultation} lang={lang} />
    </div>
  );
}

export default App;
