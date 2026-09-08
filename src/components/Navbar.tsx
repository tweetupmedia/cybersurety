import React, { useState } from 'react';
import { Shield, Activity, Lock, Terminal, CheckCircle2, ChevronRight, Menu, X, Cpu, ChevronDown, Target, FileCheck, Zap, Sparkles } from 'lucide-react';
import { ServiceKey } from '../types';

interface NavbarProps {
  onOpenAuditModal: () => void;
  onScrollTo?: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateToServices: (subpage?: ServiceKey | 'overview') => void;
  onNavigateToContact: () => void;
  onNavigateToResources: () => void;
  onOpenLiveChat: () => void;
  currentView: 'home' | 'services' | 'contact' | 'resources';
  activeServiceSubpage?: ServiceKey | 'overview';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuditModal,
  onScrollTo,
  onNavigateHome,
  onNavigateToServices,
  onNavigateToContact,
  onNavigateToResources,
  onOpenLiveChat,
  currentView,
  activeServiceSubpage = 'overview'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (onScrollTo) {
        onScrollTo(id);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const handleServiceSelect = (subpage: ServiceKey | 'overview') => {
    onNavigateToServices(subpage);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md">
      {/* Top Telemetry Bar */}
      <div className="hidden border-b border-slate-800/50 bg-[#05080f] px-4 py-1 text-xs text-slate-400 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-emerald-400 font-semibold">SOC DEFCON 5: NORMAL</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-400">Continuous Ingest: 254k EPS</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-400">Containment Speed: <strong className="text-emerald-400">280ms</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
              NIST CSF 2.0 Aligned
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
              ISO 27001 Certified
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome} 
          className="flex cursor-pointer items-center gap-3 group"
          id="brand-logo-btn"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/30 transition-all">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080c14]">
              <Shield className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Cyber<span className="text-cyan-400">Surety</span>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => handleServiceSelect('overview')}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-1 ${
                currentView === 'services' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl border border-slate-800 bg-[#080c14]/95 backdrop-blur-xl p-3 shadow-2xl animate-fadeIn z-50">
                <div className="border-b border-slate-800/80 pb-2 mb-2 px-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Comprehensive Cyber Services
                  </span>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleServiceSelect('overview')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 transition-all text-xs font-semibold text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <div>
                        <span>All Services Overview</span>
                        <span className="text-[10px] font-normal text-slate-400 block">Hub, metrics & crosswalk</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleServiceSelect('threat-monitoring')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 transition-all text-xs font-semibold text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Activity className="h-4 w-4 text-cyan-400" />
                      <div>
                        <span>Threat Monitoring</span>
                        <span className="text-[10px] font-normal text-slate-400 block">24/7 SOC & eBPF telemetry</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleServiceSelect('risk-assessment')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 transition-all text-xs font-semibold text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Target className="h-4 w-4 text-indigo-400" />
                      <div>
                        <span>Risk Assessment</span>
                        <span className="text-[10px] font-normal text-slate-400 block">FAIR quantitative exposure</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400" />
                  </button>
                  <button
                    onClick={() => handleServiceSelect('compliance-management')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 transition-all text-xs font-semibold text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <div>
                        <span>Compliance Management</span>
                        <span className="text-[10px] font-normal text-slate-400 block">Continuous GRC & evidence</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </button>
                  <button
                    onClick={() => handleServiceSelect('incident-response')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 transition-all text-xs font-semibold text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="h-4 w-4 text-rose-400" />
                      <div>
                        <span>Incident Response</span>
                        <span className="text-[10px] font-normal text-slate-400 block">Sub-300ms SOAR playbooks</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-rose-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('six-pillars')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            The 6 Pillars
          </button>
          <button
            onClick={() => handleNavClick('threat-sandbox')}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
            </span>
            Live Threat Radar
          </button>

          {/* Resources Page / Hub Link */}
          <button
            onClick={onNavigateToResources}
            id="nav-resources-link"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              currentView === 'resources' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Resources</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-cyan-300 border border-slate-700">
              Library
            </span>
          </button>

          <button
            onClick={() => handleNavClick('compliance-matrix')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Compliance Matrix
          </button>
          <button
            onClick={() => handleNavClick('risk-calculator')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Risk Calculator
          </button>

          {/* Contact Us Page Link */}
          <button
            onClick={onNavigateToContact}
            id="nav-contact-link"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              currentView === 'contact' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Contact</span>
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onOpenAuditModal}
            id="nav-audit-cta"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
          >
            <span>Schedule Audit</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#080c14] px-4 py-4 md:hidden max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2.5">
            {/* Mobile Services Submenu */}
            <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
                Cyber Services Suite
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => handleServiceSelect('overview')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-white hover:bg-slate-800"
                >
                  <span className="font-semibold">Services Overview Hub</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleServiceSelect('threat-monitoring')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-slate-300 hover:bg-slate-800"
                >
                  <span>1. Threat Monitoring (24/7 SOC)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleServiceSelect('risk-assessment')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-slate-300 hover:bg-slate-800"
                >
                  <span>2. Risk Assessment (FAIR Model)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleServiceSelect('compliance-management')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-slate-300 hover:bg-slate-800"
                >
                  <span>3. Compliance Management (GRC)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => handleServiceSelect('incident-response')}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs text-slate-300 hover:bg-slate-800"
                >
                  <span>4. Incident Response (SOAR)</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('services')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span>Services Section</span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToResources();
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <span>Resources & Research Hub</span>
                <span className="rounded bg-cyan-950 px-1.5 py-0.2 text-[9px] font-mono text-cyan-400 border border-cyan-800">
                  4 Categories
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToContact();
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <span>Contact Us & SOC Command</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLiveChat();
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-cyan-300 bg-slate-900/90 border border-slate-800 hover:bg-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Launch Live SOC Chat</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">Online</span>
            </button>

            <button
              onClick={() => handleNavClick('six-pillars')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span>The 6 Pillars (NIST CSF 2.0)</span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('threat-sandbox')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Live Threat Radar
              </span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('ai-analyst')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span>AI Security Analyst</span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('compliance-matrix')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span>Compliance Frameworks</span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              <span>Enterprise Pricing</span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
              >
                Schedule Threat & Compliance Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
