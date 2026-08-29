import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { TrustBar } from './components/trust/TrustBar';
import { Footer } from './components/layout/Footer';
import { HeroCompanyConfigurator } from './components/hero/HeroCompanyConfigurator';
import { OtherServicesSection } from './components/services/OtherServicesSection';
import { ClientStoriesSection } from './components/stories/ClientStoriesSection';
import { JurisdictionWizard } from './components/wizard/JurisdictionWizard';
import { FormationRoadmapSection } from './components/roadmap/FormationRoadmapSection';
import { PackagesSection } from './components/packages/PackagesSection';
import { FreeZonesDirectory } from './components/freezones/FreeZonesDirectory';
import { UaeCostVisualizerSection } from './components/calculator/UaeCostVisualizerSection';
import { JurisdictionComparison } from './components/comparison/JurisdictionComparison';
import { WhyUaeSection } from './components/why-uae/WhyUaeSection';
import { FaqSection } from './components/faq/FaqSection';
import { AboutSection } from './components/about/AboutSection';
import { QuickConsultationModal } from './components/consultation/QuickConsultationModal';
import { AuthModal, UserSession } from './components/auth/AuthModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServiceDetailPage } from './components/services/ServiceDetailPage';
import { CommandSearchModal } from './components/search/CommandSearchModal';
import { MobileBottomDock } from './components/layout/MobileBottomDock';
import { ServiceSlug } from './data/servicesData';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { Language, TRANSLATIONS } from './data/translations';

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  
  // Dedicated Service Page routing state
  const [activeServiceSlug, setActiveServiceSlug] = useState<ServiceSlug | null>(null);

  // Theme & Language & Currency State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<string>('AED');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);

  // Authentication session
  const [user, setUser] = useState<UserSession | null>(null);

  // Global keydown for ⌘K
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

  // Sync dark/light class and RTL/LTR direction with root document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    }
  }, [isDarkMode, lang]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleOpenConsultation = (pkgName?: string) => {
    setSelectedPackage(pkgName);
    setIsConsultationOpen(true);
  };

  const handleNavigateService = (slug: ServiceSlug) => {
    setActiveServiceSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveServiceSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeServiceSlug) {
      setActiveServiceSlug(null);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCommandSearchAction = (actionType: string, value?: string) => {
    if (actionType === 'scroll-calculator') {
      handleNavigateSection('cost-calculator');
    } else if (actionType === 'consult-visa') {
      handleOpenConsultation('Golden Visa 10-Year');
    } else if (actionType === 'consult-srti') {
      handleOpenConsultation('SRTI Park Setup');
    } else if (actionType === 'whatsapp') {
      window.open('https://wa.me/971563396961', '_blank');
    } else if (actionType === 'freezone') {
      handleOpenConsultation(`Free Zone Inquiry: ${value}`);
    } else if (actionType === 'activity') {
      handleOpenConsultation(`Activity Setup: ${value}`);
    }
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUser(session);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white font-sans transition-colors duration-200 relative pb-16 md:pb-0">
      
      {/* Navigation Header */}
      <Navbar
        onOpenConsultation={(svc) => handleOpenConsultation(svc)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSearch={() => setIsCommandSearchOpen(true)}
        user={user}
        onLogout={handleLogout}
        lang={lang}
        onToggleLang={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        currency={currency}
        onSetCurrency={setCurrency}
        onNavigateService={handleNavigateService}
        onNavigateSection={handleNavigateSection}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Content: Render Dedicated Service Page OR Full Platform Home */}
      {activeServiceSlug ? (
        <main className="flex-grow relative z-10">
          <ServiceDetailPage
            slug={activeServiceSlug}
            onBack={handleNavigateHome}
            onSelectService={handleNavigateService}
            onOpenConsultation={(svc) => handleOpenConsultation(svc)}
            lang={lang}
          />
        </main>
      ) : (
        <main className="flex-grow relative z-10">
          {/* 1. High-Impact Hero & Venture — The Estimator */}
          <HeroCompanyConfigurator
            onOpenConsultation={(details) => handleOpenConsultation(details)}
            lang={lang}
            currency={currency}
          />

          {/* 2. Official Government Authorities & Tier-1 Banking Partner Ribbon */}
          <TrustBar lang={lang} />

          {/* 3. 01 / What We Do: 7 Official Services */}
          <ScrollReveal direction="up" delay={0.1}>
            <OtherServicesSection
              onOpenConsultation={(svc) => handleOpenConsultation(svc)}
              onNavigateService={handleNavigateService}
              lang={lang}
            />
          </ScrollReveal>

          {/* 4. 02 / Client Stories & Measurable Outcomes */}
          <ScrollReveal direction="up" delay={0.1}>
            <ClientStoriesSection
              onOpenConsultation={(topic) => handleOpenConsultation(topic)}
              lang={lang}
            />
          </ScrollReveal>

          {/* 5. 03 / 30-Second Jurisdiction Diagnostic Wizard */}
          <ScrollReveal direction="up" delay={0.1}>
            <JurisdictionWizard
              onOpenConsultation={(details) => handleOpenConsultation(details)}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 6. 04 / Turnkey Packages (Free Zone, Mainland, Offshore, Dual) */}
          <ScrollReveal direction="up" delay={0.1}>
            <PackagesSection
              onSelectPackage={(pkgTitle) => handleOpenConsultation(pkgTitle)}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 7. 05 / How We Work: 4-Stage ISO-Accredited Roadmap */}
          <ScrollReveal direction="up" delay={0.1}>
            <FormationRoadmapSection
              onOpenConsultation={(step) => handleOpenConsultation(step)}
              lang={lang}
            />
          </ScrollReveal>

          {/* 8. 06 / 40+ Free Zones Explorer & Discovery Hub */}
          <ScrollReveal direction="up" delay={0.1}>
            <FreeZonesDirectory
              onOpenConsultation={() => handleOpenConsultation('Free Zone Company')}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 9. 07 / Tariff Simulator & Interactive Cost Visualizer */}
          <ScrollReveal direction="up" delay={0.1}>
            <UaeCostVisualizerSection
              onOpenConsultation={(quote) => handleOpenConsultation(quote)}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 10. 08 / 3-Way Jurisdiction Comparison Matrix */}
          <ScrollReveal direction="up" delay={0.1}>
            <JurisdictionComparison
              onOpenConsultation={(jurisdiction) => handleOpenConsultation(jurisdiction)}
              lang={lang}
            />
          </ScrollReveal>

          {/* 11. Why UAE? Global Economic Power */}
          <ScrollReveal direction="up" delay={0.1}>
            <WhyUaeSection
              onOpenConsultation={() => handleOpenConsultation()}
              lang={lang}
            />
          </ScrollReveal>

          {/* 12. About AnalyzeMarkets FZE (SRTI Sharjah HQ) */}
          <ScrollReveal direction="up" delay={0.1}>
            <AboutSection
              onOpenConsultation={() => handleOpenConsultation()}
              lang={lang}
            />
          </ScrollReveal>

          {/* 13. Frequently Asked Questions */}
          <ScrollReveal direction="up" delay={0.1}>
            <FaqSection
              onOpenConsultation={() => handleOpenConsultation()}
              lang={lang}
            />
          </ScrollReveal>
        </main>
      )}

      {/* Global Footer with AM DXB live links */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onNavigateService={handleNavigateService}
        lang={lang}
      />

      {/* Quick Consultation Modal */}
      <QuickConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultPackage={selectedPackage}
      />

      {/* Authentication Login / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        lang={lang}
        onSetLanguage={setLang}
        currency={currency}
        onSetCurrency={setCurrency}
      />

      {/* Executive Admin CRM Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />

      {/* Global ⌘K Command Search Modal */}
      <CommandSearchModal
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
        onSelectAction={handleCommandSearchAction}
        lang={lang}
      />

      {/* Persistent Mobile Bottom Action Dock (<768px) */}
      <MobileBottomDock
        onOpenConsultation={(details) => handleOpenConsultation(details)}
        lang={lang}
      />
    </div>
  );
}

export default App;
