import React, { useState } from 'react';
import { 
  FileCheck, 
  Database, 
  Lock, 
  Activity, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Server, 
  Download, 
  ExternalLink,
  Layers,
  Cpu,
  Eye,
  KeyRound
} from 'lucide-react';
import { PILLARS_DATA, DATA_ASSET_INVENTORY } from '../data/mockData';
import { PillarKey } from '../types';

interface SixPillarsNavigatorProps {
  selectedPillar: PillarKey;
  onSelectPillar: (key: PillarKey) => void;
  onOpenAuditModal: () => void;
}

export const SixPillarsNavigator: React.FC<SixPillarsNavigatorProps> = ({
  selectedPillar,
  onSelectPillar,
  onOpenAuditModal
}) => {
  const currentPillar = PILLARS_DATA[selectedPillar];

  const pillarButtons: { key: PillarKey; label: string; icon: React.ReactNode }[] = [
    { key: 'govern', label: '1. Govern', icon: <FileCheck className="h-4 w-4" /> },
    { key: 'identify', label: '2. Identify', icon: <Database className="h-4 w-4" /> },
    { key: 'protect', label: '3. Protect', icon: <Lock className="h-4 w-4" /> },
    { key: 'detect', label: '4. Detect', icon: <Activity className="h-4 w-4" /> },
    { key: 'respond', label: '5. Respond', icon: <Zap className="h-4 w-4" /> },
    { key: 'recover', label: '6. Recover', icon: <RefreshCw className="h-4 w-4" /> },
  ];

  return (
    <section id="six-pillars" className="border-t border-slate-800 bg-[#060a12] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <span>NIST CSF 2.0 & CYBERSURETY ENTERPRISE MATRIX</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
            Comprehensive Defense Across All 6 Security Pillars
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Directly translating standard cybersecurity mandates into automated, policy-governed microservices. Select any pillar to view real-world telemetry, control checklists, and autonomous modules.
          </p>
        </div>

        {/* Pillar Tabs Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
          {pillarButtons.map((btn) => {
            const isActive = selectedPillar === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => onSelectPillar(btn.key)}
                id={`pillar-tab-${btn.key}`}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Body Content */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#080d19] p-6 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 border-b border-slate-800 pb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="rounded bg-cyan-950 px-2.5 py-1 text-xs font-mono font-bold text-cyan-400 border border-cyan-800/50 uppercase">
                  {currentPillar.key} Pillar
                </span>
                <span className="font-mono text-xs text-slate-400">
                  Status: <strong className="text-emerald-400">{currentPillar.status}</strong>
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-bold text-white font-sans sm:text-3xl">
                {currentPillar.title} &mdash; <span className="text-cyan-400">{currentPillar.subtitle}</span>
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {currentPillar.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={onOpenAuditModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-3 text-xs sm:text-sm transition-colors shadow-md"
              >
                <Shield className="h-4 w-4" />
                <span>Audit Readiness Assessment</span>
              </button>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400 font-mono text-center">
                Governing Standard: <span className="text-slate-200">ISO 27001 / NIST 2.0</span>
              </div>
            </div>
          </div>

          {/* Core Objectives (Exact Match to User Handwritten Diagram) */}
          <div className="mt-8">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              Core Architecture Objectives & Controls
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPillar.coreObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-4">
                  <div className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-[11px] font-mono text-cyan-400 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Highlights with Real Metrics */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentPillar.features.map((feature, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-[#0a101f] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">{feature.metricLabel}</span>
                  <span className="font-mono text-base font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {feature.metricValue}
                  </span>
                </div>
                <h5 className="mt-3 text-base font-bold text-white font-sans">{feature.name}</h5>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Special Interactive Sub-Modules for Specific Pillars */}
          {selectedPillar === 'identify' && (
            <div className="mt-10 rounded-2xl border border-cyan-900/40 bg-[#091122] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" />
                    Data Classification & Asset Surface Inventory (DSPM)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Autonomous tagging: Public, Internal, Confidential, and Sensitive PII/PHI.
                  </p>
                </div>
                <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[11px] text-cyan-400 border border-cyan-800/40">
                  Live Discovered: 6 Core Repositories
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-2">Asset Name</th>
                      <th className="pb-2">Classification Tier</th>
                      <th className="pb-2">Storage Engine</th>
                      <th className="pb-2">Record Count</th>
                      <th className="pb-2">Encryption</th>
                      <th className="pb-2">Compliance Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {DATA_ASSET_INVENTORY.map((asset) => (
                      <tr key={asset.id} className="text-slate-300">
                        <td className="py-2.5 font-bold text-white font-sans">{asset.name}</td>
                        <td className="py-2.5">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              asset.tier === 'Restricted / Sensitive'
                                ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                                : asset.tier === 'Confidential'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                                : asset.tier === 'Internal'
                                ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {asset.tier}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-400">{asset.storeType}</td>
                        <td className="py-2.5 text-cyan-300">{asset.recordsCount}</td>
                        <td className="py-2.5 text-emerald-400 font-semibold">{asset.encryptionStatus}</td>
                        <td className="py-2.5 text-indigo-300">{asset.complianceTag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedPillar === 'govern' && (
            <div className="mt-10 rounded-2xl border border-indigo-900/40 bg-[#0a0f24] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-indigo-400" />
                    Automated Continuous Audit & Policy Governance Engine
                  </h4>
                  <p className="text-xs text-slate-400">
                    Continuous cryptographic verification replaces annual manual auditor questionnaires.
                  </p>
                </div>
                <button
                  onClick={onOpenAuditModal}
                  className="rounded-lg bg-indigo-600/80 hover:bg-indigo-500 px-3 py-1 text-xs font-semibold text-white transition-colors"
                >
                  Generate Auditor Evidence Pack
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <span className="text-slate-500 block">Active Policies Enforced:</span>
                  <span className="text-lg font-bold text-white">48 Enterprise Controls</span>
                  <span className="text-emerald-400 block text-[11px] mt-1">100% Passing Check</span>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <span className="text-slate-500 block">Continuous Audit Drift:</span>
                  <span className="text-lg font-bold text-emerald-400">0.0% Unmanaged</span>
                  <span className="text-slate-400 block text-[11px] mt-1">Re-evaluated Every 60s</span>
                </div>
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <span className="text-slate-500 block">Auditor Evidence Exports:</span>
                  <span className="text-lg font-bold text-cyan-400">RFC-3161 Timestamped</span>
                  <span className="text-slate-400 block text-[11px] mt-1">Court & Auditor Admissible</span>
                </div>
              </div>
            </div>
          )}

          {/* Governed Tech Stack Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-slate-500">Frameworks & Technologies:</span>
              {currentPillar.frameworksOrTech.map((tech, i) => (
                <span key={i} className="rounded bg-slate-800/70 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="font-mono text-cyan-400 text-[11px]">
              Continuous Verification: <span className="text-emerald-400">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
