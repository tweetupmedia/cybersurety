import React, { useState } from 'react';
import { Shield, Activity, Target, FileCheck, Zap, ArrowRight, CheckCircle2, ChevronRight, Lock, ExternalLink, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceKey } from '../types';

interface ServicesSectionProps {
  onSelectServiceSubpage: (serviceKey: ServiceKey) => void;
  onNavigateToServicesPage: () => void;
  onOpenAuditModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceSubpage,
  onNavigateToServicesPage,
  onOpenAuditModal
}) => {
  const [activeTab, setActiveTab] = useState<ServiceKey>('threat-monitoring');

  const activeService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const getServiceIcon = (id: ServiceKey) => {
    switch (id) {
      case 'threat-monitoring':
        return <Activity className="h-5 w-5 text-cyan-400" />;
      case 'risk-assessment':
        return <Target className="h-5 w-5 text-indigo-400" />;
      case 'compliance-management':
        return <FileCheck className="h-5 w-5 text-emerald-400" />;
      case 'incident-response':
        return <Zap className="h-5 w-5 text-rose-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 border-t border-slate-800 bg-[#060a12]">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.06),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 border border-cyan-800/40">
                ENTERPRISE CYBERSECURITY SUITE
              </span>
              <span className="text-xs font-mono text-slate-400">
                Continuous Mitigation & Audit Governance
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Comprehensive Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Services</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Engineered to eliminate adversary dwell time and automate regulatory compliance. Explore our 4 core specialized services designed for cloud-native and regulated enterprises.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToServicesPage}
              id="view-all-services-btn"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-slate-800 transition-all shadow-md shadow-cyan-950/50"
            >
              <span>Explore Full Services Portal</span>
              <ArrowRight className="h-4 w-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* 4 Service Selectors */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_DATA.map(service => {
            const isSelected = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex flex-col text-left rounded-2xl p-5 border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-cyan-500 bg-gradient-to-b from-slate-900 to-[#080d1a] shadow-xl shadow-cyan-500/10'
                    : 'border-slate-800/80 bg-[#080c14]/70 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>
                )}
                <div className="flex items-center justify-between w-full">
                  <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans mt-4">
                  {service.title.split('&')[0]}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {service.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                    {isSelected ? 'Active Service View' : 'Click to Inspect'}
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Overview Box */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#080d18] to-[#05080f] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            {/* Left Content */}
            <div className="lg:w-7/12 space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-700">
                  {getServiceIcon(activeService.id)}
                </div>
                <div>
                  <span className="rounded bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 font-mono text-[10px] text-cyan-400 font-semibold">
                    {activeService.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-sans mt-1">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeService.fullDescription}
              </p>

              {/* Threat Mitigation Highlight */}
              <div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    How This Service Mitigates Threats
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {activeService.threatMitigation.howItMitigatesThreats}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {activeService.threatMitigation.preventedAttackVectors.slice(0, 2).map((vec, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">{vec.vector}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{vec.mitreId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Assurance Highlight */}
              <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    How This Service Ensures Compliance
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {activeService.complianceAssurance.howItEnsuresCompliance}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  {activeService.complianceAssurance.keyControls.map((ctrl, i) => (
                    <span key={i} className="rounded bg-slate-900 px-2.5 py-1 border border-slate-800 text-slate-300">
                      <strong className="text-emerald-400">{ctrl.framework}:</strong> {ctrl.controlCode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Key Features & Subpage CTA */}
            <div className="lg:w-5/12 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-[#05080f] p-5">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Key Technical Features & Metrics
                </h4>
                <div className="space-y-3">
                  {activeService.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900/60 p-3 border border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{feat.title}</span>
                        <span className="rounded bg-cyan-950/80 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400 border border-cyan-800/40">
                          {feat.metricValue}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service SLA & Navigation CTAs */}
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-[#0a1020] p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Guaranteed Service SLA:</span>
                  <span className="font-bold text-emerald-400">{activeService.sla.split('•')[0]}</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => onSelectServiceSubpage(activeService.id)}
                    id={`open-subpage-${activeService.id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    <span>Open Detailed {activeService.title.split('&')[0]} Subpage</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={onOpenAuditModal}
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all text-center"
                  >
                    Schedule Service Evaluation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holistic Cyber Services Matrix (Threat Mitigation vs Compliance Matrix) */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-[#080c14] p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Cross-Service Capability Matrix: Threat Mitigation vs. Compliance Assurance
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                How every CyberSurety service uniquely bridges defensive operational security and regulatory mandates.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              4 Subservices Integrated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Service</th>
                  <th className="pb-3 px-4 font-semibold">Primary Threat Mitigation Role</th>
                  <th className="pb-3 px-4 font-semibold">Compliance Assurance Impact</th>
                  <th className="pb-3 pl-4 font-semibold text-right">Subpage Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {SERVICES_DATA.map(s => (
                  <tr key={s.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-white font-sans flex items-center gap-2">
                      {getServiceIcon(s.id)}
                      <span>{s.title.split('&')[0]}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-relaxed font-sans">
                      {s.threatMitigation.coreObjective}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-relaxed font-sans">
                      {s.complianceAssurance.coreObjective}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <button
                        onClick={() => onSelectServiceSubpage(s.id)}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>View Subpage</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
