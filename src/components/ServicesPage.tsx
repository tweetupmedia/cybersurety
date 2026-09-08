import React, { useState } from 'react';
import { 
  Shield, Activity, Target, FileCheck, Zap, ArrowLeft, ChevronRight, CheckCircle2, 
  Lock, Clock, Cpu, Award, Download, AlertTriangle, ExternalLink, Sparkles, Filter
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceKey, ServiceDetail } from '../types';
import { ThreatMonitoringWidget } from './services/ThreatMonitoringWidget';
import { RiskAssessmentWidget } from './services/RiskAssessmentWidget';
import { ComplianceManagementWidget } from './services/ComplianceManagementWidget';
import { IncidentResponseWidget } from './services/IncidentResponseWidget';

interface ServicesPageProps {
  activeSubpage: ServiceKey | 'overview';
  onSelectSubpage: (subpage: ServiceKey | 'overview') => void;
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  activeSubpage,
  onSelectSubpage,
  onNavigateHome,
  onOpenAuditModal,
}) => {
  const [filterFocus, setFilterFocus] = useState<'ALL' | 'THREAT' | 'COMPLIANCE'>('ALL');

  const selectedService: ServiceDetail | undefined = 
    activeSubpage !== 'overview' 
      ? SERVICES_DATA.find(s => s.id === activeSubpage) 
      : undefined;

  const getServiceIcon = (id: ServiceKey, className: string = 'h-5 w-5') => {
    switch (id) {
      case 'threat-monitoring':
        return <Activity className={`${className} text-cyan-400`} />;
      case 'risk-assessment':
        return <Target className={`${className} text-indigo-400`} />;
      case 'compliance-management':
        return <FileCheck className={`${className} text-emerald-400`} />;
      case 'incident-response':
        return <Zap className={`${className} text-rose-400`} />;
    }
  };

  const renderServiceWidget = (id: ServiceKey) => {
    switch (id) {
      case 'threat-monitoring':
        return <ThreatMonitoringWidget />;
      case 'risk-assessment':
        return <RiskAssessmentWidget />;
      case 'compliance-management':
        return <ComplianceManagementWidget />;
      case 'incident-response':
        return <IncidentResponseWidget />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 py-8">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="border-b border-slate-800 bg-[#080c14]/90 sticky top-14 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={onNavigateHome}
                className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Platform Home</span>
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => onSelectSubpage('overview')}
                className={`transition-colors ${
                  activeSubpage === 'overview' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Services
              </button>
              {selectedService && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">
                    {selectedService.title.split('&')[0]}
                  </span>
                </>
              )}
            </div>

            {/* Subpage Tabs Navigation */}
            <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
              <button
                onClick={() => onSelectSubpage('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeSubpage === 'overview'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                All Services Overview
              </button>
              {SERVICES_DATA.map(s => (
                <button
                  key={s.id}
                  onClick={() => onSelectSubpage(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeSubpage === s.id
                      ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/40 shadow-md'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  {getServiceIcon(s.id, 'h-3.5 w-3.5')}
                  <span>{s.title.split('&')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* =========================================================================
            VIEW 1: SERVICES OVERVIEW HUB (When activeSubpage === 'overview')
           ========================================================================= */}
        {activeSubpage === 'overview' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Overview Hero */}
            <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0a1020] to-[#080c14] p-8 sm:p-12 overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 border border-cyan-800/40">
                    CYBER SERVICES SUITE
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    NIST CSF 2.0 & ISO 27001 Ready
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                  Enterprise Security Services: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                    Defend, Quantify, Comply & Respond
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  CyberSurety delivers end-to-end operational defense and governance. From real-time telemetry surveillance and mathematical risk modeling to continuous multi-framework audit readiness and autonomous sub-second SOAR playbooks, our services shield critical cloud assets while guaranteeing uninterrupted compliance.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onOpenAuditModal}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    <span>Schedule Threat & Compliance Audit</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    Back to Platform Radar
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Toggle (All, Threat Focus, Compliance Focus) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white font-sans">
                  Core Specialized Services Subpages
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a service below to access its dedicated subpage and interactive simulation tools.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" /> Filter by:
                </span>
                <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setFilterFocus('ALL')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      filterFocus === 'ALL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All (4)
                  </button>
                  <button
                    onClick={() => setFilterFocus('THREAT')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      filterFocus === 'THREAT' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Threat Mitigation
                  </button>
                  <button
                    onClick={() => setFilterFocus('COMPLIANCE')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      filterFocus === 'COMPLIANCE' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Compliance Assurance
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Detailed Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES_DATA.map(service => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-slate-800 bg-[#080c14] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl bg-slate-900 p-3 border border-slate-800">
                        {getServiceIcon(service.id, 'h-6 w-6')}
                      </div>
                      <span className="rounded-full bg-slate-900 px-3 py-1 font-mono text-[10px] text-cyan-400 border border-slate-800">
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/90 mt-1">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Threat Mitigation Highlights */}
                    {(filterFocus === 'ALL' || filterFocus === 'THREAT') && (
                      <div className="rounded-xl bg-cyan-950/20 border border-cyan-900/30 p-3.5 space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5" /> Threat Mitigation Impact:
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {service.threatMitigation.coreObjective}
                        </p>
                        <div className="text-[10px] font-mono text-cyan-400 pt-1">
                          Key Vector: {service.threatMitigation.preventedAttackVectors[0]?.vector}
                        </div>
                      </div>
                    )}

                    {/* Compliance Assurance Highlights */}
                    {(filterFocus === 'ALL' || filterFocus === 'COMPLIANCE') && (
                      <div className="rounded-xl bg-emerald-950/20 border border-emerald-900/30 p-3.5 space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5" /> Compliance Assurance Impact:
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {service.complianceAssurance.coreObjective}
                        </p>
                        <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400 pt-1">
                          {service.complianceAssurance.keyControls.slice(0, 3).map((c, i) => (
                            <span key={i} className="rounded bg-slate-900 px-1.5 py-0.5 border border-slate-800">
                              {c.framework}: {c.controlCode}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      SLA: <strong className="text-slate-300">{service.sla.split('•')[0]}</strong>
                    </span>
                    <button
                      onClick={() => onSelectSubpage(service.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                    >
                      <span>Open Subpage</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: DEDICATED SERVICE SUBPAGE (When activeSubpage is one of the 4)
           ========================================================================= */}
        {selectedService && (
          <div className="space-y-14 animate-fadeIn">
            {/* Subpage Hero Section */}
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#080d18] to-[#05080f] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 border border-cyan-800/40">
                      {selectedService.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Guaranteed SLA: {selectedService.sla}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
                    {selectedService.title}
                  </h1>
                  <p className="text-sm sm:text-base text-cyan-400/90 font-mono">
                    {selectedService.tagline}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedService.fullDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenAuditModal}
                      className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-1.5"
                    >
                      <span>Deploy {selectedService.title.split('&')[0]}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSubpage('overview')}
                      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                    >
                      Back to All Services
                    </button>
                  </div>
                </div>

                {/* Quick Service Metrics Badge Box */}
                <div className="rounded-2xl border border-slate-800 bg-[#05080f] p-6 space-y-4 lg:w-80 shrink-0">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-2">
                    Service Performance Profile
                  </span>
                  {selectedService.keyFeatures.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 truncate max-w-[150px]">{feat.metricLabel}:</span>
                      <span className="text-cyan-400 font-bold">{feat.metricValue}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Continuous Auditor Attested
                  </div>
                </div>
              </div>
            </div>

            {/* DUAL CORE SECTION: Threat Mitigation vs. Compliance Assurance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SUBSECTION 1: How this service mitigates threats */}
              <div className="rounded-3xl border border-cyan-900/40 bg-gradient-to-b from-cyan-950/20 via-[#080d1a] to-[#05080f] p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-950 p-2.5 border border-cyan-800/60">
                    <Shield className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Defensive Security Blueprint
                    </span>
                    <h2 className="text-xl font-bold text-white font-sans">
                      How {selectedService.title.split('&')[0]} Mitigates Threats
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedService.threatMitigation.howItMitigatesThreats}
                </p>

                <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-800 text-xs font-mono text-emerald-300">
                  <span className="font-semibold text-slate-200 block mb-1">MTTD / MTTR Operational Impact:</span>
                  <span>{selectedService.threatMitigation.mttdMttrImpact}</span>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Neutralized Adversary Tactics & Attack Vectors
                  </h3>
                  <div className="space-y-3">
                    {selectedService.threatMitigation.preventedAttackVectors.map((vec, idx) => (
                      <div key={idx} className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/90 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-sans">{vec.vector}</span>
                          <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-800/40">
                            MITRE {vec.mitreId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {vec.mitigationMechanism}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUBSECTION 2: How this service ensures compliance */}
              <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-emerald-950/20 via-[#080d1a] to-[#05080f] p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-950 p-2.5 border border-emerald-800/60">
                    <Lock className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      Regulatory Governance Crosswalk
                    </span>
                    <h2 className="text-xl font-bold text-white font-sans">
                      How {selectedService.title.split('&')[0]} Ensures Compliance
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedService.complianceAssurance.howItEnsuresCompliance}
                </p>

                <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-800 text-xs font-mono text-emerald-300">
                  <span className="font-semibold text-slate-200 block mb-1">Auditor Readiness Benefit:</span>
                  <span>{selectedService.complianceAssurance.auditReadinessBenefit}</span>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Satisfied Regulatory Controls & Evidence Collection
                  </h3>
                  <div className="space-y-3">
                    {selectedService.complianceAssurance.keyControls.map((ctrl, idx) => (
                      <div key={idx} className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/90 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-sans">{ctrl.title}</span>
                          <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-800/40">
                            {ctrl.framework} &bull; {ctrl.controlCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {ctrl.howServiceSatisfies}
                        </p>
                        <div className="text-[10px] font-mono text-slate-500 pt-1">
                          Evidence Frequency: <span className="text-slate-300">{ctrl.automatedEvidenceFrequency}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE LIVE TOOL / WORKSPACE FOR THIS SERVICE */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Interactive Live Service Workspace
                </span>
                <h2 className="text-2xl font-bold text-white font-sans">
                  {selectedService.title.split('&')[0]} Simulator & Live Inspector
                </h2>
              </div>
              {renderServiceWidget(selectedService.id)}
            </div>

            {/* KEY FEATURES DETAILED BREAKDOWN */}
            <div className="rounded-3xl border border-slate-800 bg-[#080c14] p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white font-sans mb-6">
                Technical Architecture & Core Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedService.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-[#05080f] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white font-sans">{feat.title}</h3>
                      <span className="rounded-lg bg-cyan-950/80 px-2.5 py-1 text-xs font-mono font-bold text-cyan-400 border border-cyan-800/40">
                        {feat.metricValue}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                    <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                      <span className="text-cyan-400 font-semibold">Technical Specification: </span>
                      <span>{feat.technicalSpec}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KEY BENEFITS & CLIENT ROI */}
            <div className="rounded-3xl border border-slate-800 bg-[#080c14] p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white font-sans mb-6">
                Quantifiable Client Benefits & Return on Investment (ROI)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedService.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#0a1020] to-[#05080f] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border border-slate-800">
                        {benefit.category}
                      </span>
                      <span className="text-lg font-bold font-mono text-emerald-400">
                        {benefit.impactMetric}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-sans">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERABLES & AUDIT ENGAGEMENT MODEL */}
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#080d1a] to-[#060a12] p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 border border-cyan-800/40">
                  SERVICE DELIVERABLES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  What You Receive with {selectedService.title.split('&')[0]}
                </h2>
                <ul className="space-y-2 text-xs text-slate-300 font-mono">
                  {selectedService.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-[#05080f] p-6 space-y-4 lg:w-80 shrink-0">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Ready to Deploy?
                </span>
                <p className="text-xs text-slate-300">
                  Activate this service module in your cloud environment in under 15 minutes with zero disruption.
                </p>
                <button
                  onClick={onOpenAuditModal}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  <span>Schedule Service Activation</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
