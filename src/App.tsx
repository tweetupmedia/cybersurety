import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreatRadarSandbox } from './components/ThreatRadarSandbox';
import { SixPillarsNavigator } from './components/SixPillarsNavigator';
import { ServicesSection } from './components/ServicesSection';
import { ServicesPage } from './components/ServicesPage';
import { ResourcesSection } from './components/ResourcesSection';
import { ResourcesPage } from './components/ResourcesPage';
import { ContactPage } from './components/ContactPage';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AIThreatAnalyst } from './components/AIThreatAnalyst';
import { ComplianceMatrix } from './components/ComplianceMatrix';
import { RiskCalculator } from './components/RiskCalculator';
import { EnterpriseIntegrations } from './components/EnterpriseIntegrations';
import { PricingTiers } from './components/PricingTiers';
import { Footer } from './components/Footer';
import { ScheduleAuditModal } from './components/ScheduleAuditModal';
import { PillarKey, ServiceKey } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'contact' | 'resources'>('home');
  const [activeServiceSubpage, setActiveServiceSubpage] = useState<ServiceKey | 'overview'>('overview');
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>('govern');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState<boolean>(false);

  // Sync with window URL hash for direct linking & back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#services/')) {
        const sub = hash.replace('#services/', '') as ServiceKey;
        if (['threat-monitoring', 'risk-assessment', 'compliance-management', 'incident-response'].includes(sub)) {
          setCurrentView('services');
          setActiveServiceSubpage(sub);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#services-portal' || hash === '#services-page') {
        setCurrentView('services');
        setActiveServiceSubpage('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#contact-us') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#resources/')) {
        const resId = hash.replace('#resources/', '');
        setCurrentView('resources');
        setActiveResourceId(resId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#resources' || hash === '#resources-page') {
        setCurrentView('resources');
        setActiveResourceId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#resources-section') {
        if (currentView !== 'home') {
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('resources-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById('resources-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (hash === '#services') {
        if (currentView === 'services') {
          setActiveServiceSubpage('overview');
        } else {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (hash === '#live-chat') {
        setIsLiveChatOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const handleSelectPillar = (key: PillarKey) => {
    setSelectedPillar(key);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('six-pillars');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveResourceId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToServices = (subpage: ServiceKey | 'overview' = 'overview') => {
    setCurrentView('services');
    setActiveServiceSubpage(subpage);
    window.location.hash = subpage === 'overview' ? '#services-portal' : `#services/${subpage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    window.location.hash = '#contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToResources = (resourceId?: string | null) => {
    setCurrentView('resources');
    setActiveResourceId(resourceId || null);
    window.location.hash = resourceId ? `#resources/${resourceId}` : '#resources';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceSubpage = (serviceKey: ServiceKey) => {
    setCurrentView('services');
    setActiveServiceSubpage(serviceKey);
    window.location.hash = `#services/${serviceKey}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  const handleCloseAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      {/* Navigation Header */}
      <Navbar
        onOpenAuditModal={handleOpenAuditModal}
        onScrollTo={handleScrollTo}
        onNavigateHome={handleNavigateHome}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToResources={handleNavigateToResources}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
        currentView={currentView}
        activeServiceSubpage={activeServiceSubpage}
      />

      {/* Main Content View Switcher */}
      {currentView === 'home' && (
        <main>
          {/* Hero Section with Interactive 6-Pillar Radial Navigator */}
          <Hero
            selectedPillar={selectedPillar}
            onSelectPillar={handleSelectPillar}
            onOpenAuditModal={handleOpenAuditModal}
            onScrollTo={handleScrollTo}
          />

          {/* Live SOC Threat Radar & Sub-Second Autonomous Mitigation Engine */}
          <ThreatRadarSandbox />

          {/* Comprehensive Cyber Services Section (Threat Monitoring, Risk Assessment, Compliance Management, Incident Response) */}
          <ServicesSection
            onSelectServiceSubpage={handleSelectServiceSubpage}
            onNavigateToServicesPage={() => handleNavigateToServices('overview')}
            onOpenAuditModal={handleOpenAuditModal}
          />

          {/* Resources & Threat Intelligence Section on Homepage */}
          <ResourcesSection
            onNavigateToResourcesPage={() => handleNavigateToResources(null)}
            onSelectResource={(resId) => handleNavigateToResources(resId)}
          />

          {/* 6 Pillars Deep Dive (Govern, Identify, Protect, Detect, Respond, Recover) */}
          <SixPillarsNavigator
            selectedPillar={selectedPillar}
            onSelectPillar={handleSelectPillar}
            onOpenAuditModal={handleOpenAuditModal}
          />

          {/* AI SecOps & GRC Analyst Co-Pilot (Powered by Gemini) */}
          <AIThreatAnalyst />

          {/* Continuous Multi-Framework Compliance Matrix (ISO 27001, NIST, SOC 2, HIPAA, GDPR) */}
          <ComplianceMatrix onOpenAuditModal={handleOpenAuditModal} />

          {/* Enterprise Risk & Compliance ROI Model Calculator */}
          <RiskCalculator onOpenAuditModal={handleOpenAuditModal} />

          {/* Cloud & Enterprise Tool Integrations */}
          <EnterpriseIntegrations />

          {/* Predictable Enterprise Pricing */}
          <PricingTiers onOpenAuditModal={handleOpenAuditModal} />
        </main>
      )}

      {currentView === 'services' && (
        /* Dedicated Full-Page Cyber Services Portal with Subsections & Subpages */
        <main>
          <ServicesPage
            activeSubpage={activeServiceSubpage}
            onSelectSubpage={(subpage) => {
              setActiveServiceSubpage(subpage);
              window.location.hash = subpage === 'overview' ? '#services-portal' : `#services/${subpage}`;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={handleNavigateHome}
            onOpenAuditModal={handleOpenAuditModal}
          />
        </main>
      )}

      {currentView === 'contact' && (
        /* Dedicated Full-Page Contact Us Portal with Form & Live Chat Integration */
        <main>
          <ContactPage
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
            onNavigateHome={handleNavigateHome}
            onOpenAuditModal={handleOpenAuditModal}
          />
        </main>
      )}

      {currentView === 'resources' && (
        /* Dedicated Full-Page Resources & Research Library or Subpage */
        <main>
          <ResourcesPage
            activeResourceId={activeResourceId}
            onNavigateHome={handleNavigateHome}
            onSelectResource={(resId) => handleNavigateToResources(resId)}
            onBackToResources={() => handleNavigateToResources(null)}
            onOpenAuditModal={handleOpenAuditModal}
            onNavigateToContact={handleNavigateToContact}
          />
        </main>
      )}

      {/* Enterprise Footer with Certification Badges & Direct Services Links */}
      <Footer
        onSelectPillar={handleSelectPillar}
        onScrollTo={handleScrollTo}
        onOpenAuditModal={handleOpenAuditModal}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToResources={handleNavigateToResources}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
      />

      {/* Live Chat Widget with Business Hours Logic & Immediate SOC Assistance */}
      <LiveChatWidget
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        onOpen={() => setIsLiveChatOpen(true)}
        onOpenAuditModal={handleOpenAuditModal}
        onNavigateToServices={handleNavigateToServices}
      />

      {/* Interactive Audit Booking & Posture Preview Modal */}
      <ScheduleAuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
      />
    </div>
  );
}
