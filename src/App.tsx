import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { TrustBar } from './components/trust/TrustBar';
import { Footer } from './components/layout/Footer';
import { HeroCompanyConfigurator } from './components/hero/HeroCompanyConfigurator';
import { FormationRoadmapSection } from './components/roadmap/FormationRoadmapSection';
import { JurisdictionComparison } from './components/comparison/JurisdictionComparison';
import { UaeCostVisualizerSection } from './components/calculator/UaeCostVisualizerSection';
import { PackagesSection } from './components/packages/PackagesSection';
import { FreeZonesDirectory } from './components/freezones/FreeZonesDirectory';
import { OtherServicesSection } from './components/services/OtherServicesSection';
import { WhyUaeSection } from './components/why-uae/WhyUaeSection';
import { FaqSection } from './components/faq/FaqSection';
import { AboutSection } from './components/about/AboutSection';
import { QuickConsultationModal } from './components/consultation/QuickConsultationModal';
import { AuthModal, UserSession } from './components/auth/AuthModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AmbientBackgroundCanvas } from './components/layout/AmbientBackgroundCanvas';
import { ServiceDetailPage } from './components/services/ServiceDetailPage';
import { ServiceSlug } from './data/servicesData';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { Language, TRANSLATIONS } from './data/translations';
import { Sparkles, MessageCircle } from 'lucide-react';
import { CommandPalette } from './components/ui/CommandPalette';
import { SystemStatusBar } from './components/layout/SystemStatusBar';

export function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  
  // Dedicated Service Page routing state
  const [activeServiceSlug, setActiveServiceSlug] = useState<ServiceSlug | null>(null);

  // Theme & Language & Currency State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<string>('AED');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Authentication session
  const [user, setUser] = useState<UserSession | null>(null);

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

  const handleLoginSuccess = (session: UserSession) => {
    setUser(session);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className={'min-h-screen ' + (isDarkMode ? 'dark bg-[#090d16] text-slate-100' : 'light bg-[#f8fafc] text-slate-900') + ' flex flex-col antialiased selection:bg-amber-500/30 selection:text-white font-sans transition-colors duration-300 relative'}>
      
      {/* Dynamic, Reactive Ambient Canvas: Warm Luxury Atmospheric Lights */}
      <AmbientBackgroundCanvas />

      {/* Enterprise System Live Status & Quick Search Header Bar */}
      <SystemStatusBar
        lang={lang}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Navigation Header */}
      <Navbar
        onOpenConsultation={(svc) => handleOpenConsultation(svc)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
          {/* 1. High-Impact 1-Screen Hero & Venture — The Estimator */}
          <HeroCompanyConfigurator
            onOpenConsultation={(details) => handleOpenConsultation(details)}
            lang={lang}
            currency={currency}
          />

          {/* 2. Official Government Authorities & Tier-1 Banking Partner Bar */}
          <ScrollReveal direction="up" delay={0.1}>
            <TrustBar lang={lang} />
          </ScrollReveal>

          {/* 3. Turnkey Formation Roadmap & SLA Timeline */}
          <ScrollReveal direction="up" delay={0.1}>
            <FormationRoadmapSection
              onOpenConsultation={(step) => handleOpenConsultation(step)}
              lang={lang}
            />
          </ScrollReveal>

          {/* 4. Interactive 3-Way Jurisdiction Comparison Matrix */}
          <ScrollReveal direction="up" delay={0.1}>
            <JurisdictionComparison
              onOpenConsultation={(jurisdiction) => handleOpenConsultation(jurisdiction)}
              lang={lang}
            />
          </ScrollReveal>

          {/* 5. Interactive UAE Setup Cost & Tax Simulator */}
          <ScrollReveal direction="up" delay={0.1}>
            <UaeCostVisualizerSection
              onOpenConsultation={(quote) => handleOpenConsultation(quote)}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 6. Complete Formation Packages (Free Zone, Mainland, Offshore, Dual License) */}
          <ScrollReveal direction="up" delay={0.1}>
            <PackagesSection
              onSelectPackage={(pkgTitle) => handleOpenConsultation(pkgTitle)}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 7. 40+ Free Zones Explorer & Discovery Hub */}
          <ScrollReveal direction="up" delay={0.1}>
            <FreeZonesDirectory
              onOpenConsultation={() => handleOpenConsultation('Free Zone Company')}
              lang={lang}
              currency={currency}
            />
          </ScrollReveal>

          {/* 8. Complete Corporate Lifecycle Services (from amdxb.com) */}
          <ScrollReveal direction="up" delay={0.1}>
            <OtherServicesSection
              onOpenConsultation={(svc) => handleOpenConsultation(svc)}
              onNavigateService={handleNavigateService}
              lang={lang}
            />
          </ScrollReveal>

          {/* 9. Why UAE? Global Economic Power */}
          <ScrollReveal direction="up" delay={0.1}>
            <WhyUaeSection
              onOpenConsultation={() => handleOpenConsultation()}
              lang={lang}
            />
          </ScrollReveal>

          {/* 10. About AnalyzeMarkets FZE (SRTI Sharjah HQ) */}
          <ScrollReveal direction="up" delay={0.1}>
            <AboutSection
              onOpenConsultation={() => handleOpenConsultation()}
              lang={lang}
            />
          </ScrollReveal>

          {/* 11. Interactive Frequently Asked Questions */}
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

      {/* Settings & Theme & Currency Modal */}
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

      {/* Executive Sales & Client Requests Admin CRM Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />

      {/* Global Enterprise Command Palette (Ctrl+K / ⌘+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateService={handleNavigateService}
        onNavigateSection={handleNavigateSection}
        onOpenConsultation={(pkg) => handleOpenConsultation(pkg)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSetCurrency={setCurrency}
      />

      {/* Floating Action Buttons: WhatsApp & Quick Consultation */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5">
        <a
          href="https://wa.me/971563396961"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-xl active:translate-y-0.5 transition-all cursor-pointer hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">{t.whatsappUs}</span>
        </a>

        <button
          onClick={() => handleOpenConsultation()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-xs tracking-wide shadow-xl shadow-sky-500/30 hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer border border-white/10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.quickConsultationFloat}</span>
        </button>
      </div>
    </div>
  );
}

export default App;
