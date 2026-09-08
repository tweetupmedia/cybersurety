import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  ChevronRight, 
  Cpu, 
  ArrowRight, 
  Lock, 
  Activity, 
  RefreshCw, 
  FileCheck, 
  Database, 
  AlertTriangle, 
  Zap, 
  CheckCircle2,
  Server
} from 'lucide-react';
import { PILLARS_DATA } from '../data/mockData';
import { PillarKey } from '../types';

interface HeroProps {
  onOpenAuditModal: () => void;
  onSelectPillar: (key: PillarKey) => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal, onSelectPillar, onScrollTo }) => {
  const [activePillarHover, setActivePillarHover] = useState<PillarKey>('detect');

  const pillarsList: { key: PillarKey; title: string; subtitle: string; icon: React.ReactNode; pos: string }[] = [
    {
      key: 'govern',
      title: 'Govern',
      subtitle: 'Compliance Management',
      icon: <FileCheck className="h-5 w-5 text-indigo-400" />,
      pos: 'top-left'
    },
    {
      key: 'identify',
      title: 'Identify',
      subtitle: 'Know What to Protect',
      icon: <Database className="h-5 w-5 text-cyan-400" />,
      pos: 'top-right'
    },
    {
      key: 'protect',
      title: 'Protect',
      subtitle: 'Implement Security Controls',
      icon: <Lock className="h-5 w-5 text-emerald-400" />,
      pos: 'mid-right'
    },
    {
      key: 'detect',
      title: 'Detect',
      subtitle: 'Monitor for Threats',
      icon: <Activity className="h-5 w-5 text-blue-400" />,
      pos: 'bottom-right'
    },
    {
      key: 'respond',
      title: 'Respond',
      subtitle: 'Act Quickly on Incidents',
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      pos: 'bottom-left'
    },
    {
      key: 'recover',
      title: 'Recover',
      subtitle: 'Restore & Strengthen',
      icon: <RefreshCw className="h-5 w-5 text-purple-400" />,
      pos: 'mid-left'
    }
  ];

  const currentHoverData = PILLARS_DATA[activePillarHover];

  return (
    <section id="hero" className="relative overflow-hidden bg-[#080c14] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Gradients & Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full"></div>
      <div className="pointer-events-none absolute top-40 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs text-cyan-300 backdrop-blur-sm shadow-inner shadow-cyan-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">NIST CSF 2.0 & ISO 27001 Autonomous Platform</span>
            <span className="text-cyan-600">•</span>
            <span className="hidden text-slate-400 sm:inline">Sub-Second Incident Containment</span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="mx-auto mt-6 max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans leading-tight">
            Autonomous Threat Mitigation &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Unified Cyber Risk Governance
            </span>
          </h1>
          <p className="mt-5 text-base text-slate-300 sm:text-lg lg:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
            Eliminate security blind spots and compliance drag. CyberSurety continuously monitors multi-cloud telemetry, neutralizes zero-days in under <strong className="text-cyan-400 font-semibold">300ms</strong>, and automates audits across ISO 27001, SOC 2, and NIST CSF 2.0.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onScrollTo('threat-sandbox')}
              id="hero-launch-sandbox-btn"
              className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <Terminal className="h-4 w-4" />
              <span>Launch Live Threat Sandbox</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenAuditModal}
              id="hero-schedule-audit-btn"
              className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              <span>Schedule Threat & GRC Audit</span>
            </button>
            <button
              onClick={() => onScrollTo('ai-analyst')}
              id="hero-ai-analyst-btn"
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-5 py-3.5 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-900/40 hover:text-white"
            >
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Ask AI SecOps Co-Pilot</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry KPI Metrics Bar */}
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md shadow-2xl shadow-black/60">
          <div className="grid grid-cols-2 gap-4 divide-y divide-slate-800 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-slate-800">
            <div className="px-4 py-2 text-center sm:text-left">
              <span className="block font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                84,290<span className="text-cyan-400">+</span>
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-400">
                Monitored Cloud Assets
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> Continuous eBPF Telemetry
              </span>
            </div>

            <div className="px-4 py-2 text-center sm:text-left">
              <span className="block font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                14,291
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-400">
                Autonomous Mitigations
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400">
                <Zap className="h-3 w-3" /> 0 Human Latency
              </span>
            </div>

            <div className="px-4 py-2 text-center sm:text-left">
              <span className="block font-mono text-2xl font-bold tracking-tight text-emerald-400 sm:text-3xl">
                280<span className="text-xs font-normal text-slate-400 ml-1">ms</span>
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-400">
                Mean Time To Contain (MTTC)
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                Industry Avg: 197 Days
              </span>
            </div>

            <div className="px-4 py-2 text-center sm:text-left">
              <span className="block font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                98.4<span className="text-cyan-400">%</span>
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-400">
                Global Compliance Index
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-indigo-400">
                ISO 27001 & NIST CSF 2.0
              </span>
            </div>
          </div>
        </div>

        {/* The 6 Pillars Interactive Radial Architecture Map (Directly from User's Uploaded Diagram) */}
        <div className="mt-16 rounded-3xl border border-slate-800 bg-[#060910] p-6 lg:p-10 shadow-2xl relative">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white tracking-tight sm:text-2xl">
                  The 6 Pillars of Cyber Surety
                </h2>
                <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-800/40">
                  NIST CSF 2.0 Standard
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Click any pillar to inspect real-time autonomous controls, policies, and playbooks.
              </p>
            </div>
            <button
              onClick={() => onScrollTo('six-pillars')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore Comprehensive Pillar Breakdown</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Interactive 6-Pillars Grid / Radial Interactive Interface */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* Left 3 Pillars (Govern, Recover, Respond) */}
            <div className="space-y-4 lg:col-span-4">
              {pillarsList
                .filter((p) => ['govern', 'recover', 'respond'].includes(p.key))
                .map((pillar) => {
                  const isSelected = activePillarHover === pillar.key;
                  return (
                    <div
                      key={pillar.key}
                      onClick={() => {
                        setActivePillarHover(pillar.key);
                        onSelectPillar(pillar.key);
                      }}
                      className={`group cursor-pointer rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? 'border-cyan-500/70 bg-slate-900/90 shadow-lg shadow-cyan-500/10 translate-x-1'
                          : 'border-slate-800/80 bg-[#090e18]/80 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-xl p-2.5 ${isSelected ? 'bg-cyan-950/80 text-cyan-400' : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'}`}>
                            {pillar.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-base font-sans">{pillar.title}</h3>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {PILLARS_DATA[pillar.key].status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{pillar.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Center Interactive Core Hub */}
            <div className="relative flex flex-col items-center justify-center p-6 text-center lg:col-span-4">
              <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 items-center justify-center rounded-full border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 via-[#0a101f] to-slate-950 p-4 shadow-2xl shadow-cyan-500/20">
                {/* Orbiting Pulsing Ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-25"></div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Shield className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                    Unified Engine
                  </span>
                  <span className="text-lg font-extrabold text-white font-sans">
                    CyberSurety
                  </span>
                  <span className="mt-1 text-[11px] text-slate-400 max-w-[130px]">
                    Autonomous SOC & GRC Orchestration
                  </span>
                </div>
              </div>
              <span className="mt-4 text-xs font-mono text-slate-400">
                Active Framework: <strong className="text-slate-200">NIST CSF 2.0 Core</strong>
              </span>
            </div>

            {/* Right 3 Pillars (Identify, Protect, Detect) */}
            <div className="space-y-4 lg:col-span-4">
              {pillarsList
                .filter((p) => ['identify', 'protect', 'detect'].includes(p.key))
                .map((pillar) => {
                  const isSelected = activePillarHover === pillar.key;
                  return (
                    <div
                      key={pillar.key}
                      onClick={() => {
                        setActivePillarHover(pillar.key);
                        onSelectPillar(pillar.key);
                      }}
                      className={`group cursor-pointer rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? 'border-cyan-500/70 bg-slate-900/90 shadow-lg shadow-cyan-500/10 -translate-x-1'
                          : 'border-slate-800/80 bg-[#090e18]/80 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-xl p-2.5 ${isSelected ? 'bg-cyan-950/80 text-cyan-400' : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'}`}>
                            {pillar.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-base font-sans">{pillar.title}</h3>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {PILLARS_DATA[pillar.key].status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{pillar.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Active Pillar Instant Control HUD Preview */}
          <div className="mt-8 rounded-2xl border border-cyan-900/50 bg-[#090e1a] p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-sans flex items-center gap-2">
                    {currentHoverData.title} &mdash; <span className="text-cyan-400">{currentHoverData.subtitle}</span>
                  </h4>
                  <p className="text-xs text-slate-400">{currentHoverData.description}</p>
                </div>
              </div>
              <button
                onClick={() => onScrollTo('six-pillars')}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors self-start sm:self-auto"
              >
                <span>Full Pillar Specs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Core Objectives matching User's Handwritten Notes */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentHoverData.coreObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-lg bg-slate-900/50 p-2.5 border border-slate-800/60">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>

            {/* Metrics and Tech stack */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/60 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-500 font-mono">Governed Technologies:</span>
                {currentHoverData.frameworksOrTech.map((item, i) => (
                  <span key={i} className="rounded bg-slate-800/80 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {currentHoverData.features.slice(0, 2).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-400">{f.metricLabel}:</span>
                    <span className="font-bold text-cyan-400">{f.metricValue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
