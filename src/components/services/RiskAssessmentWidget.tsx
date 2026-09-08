import React, { useState } from 'react';
import { Target, TrendingDown, DollarSign, ShieldAlert, CheckCircle2, ChevronRight, BarChart3, AlertCircle } from 'lucide-react';

export const RiskAssessmentWidget: React.FC = () => {
  const [assetValueM, setAssetValueM] = useState<number>(25); // $25M asset exposure
  const [threatEventsPerYear, setThreatEventsPerYear] = useState<number>(4); // 4 attacks/year
  const [exploitabilityPct, setExploitabilityPct] = useState<number>(35); // 35% vulnerability

  // FAIR Mathematical Calculations
  // Inherent Loss Expectancy = Asset Value * Vulnerability * Events
  const baselineALE = (assetValueM * (exploitabilityPct / 100) * threatEventsPerYear * 0.18);
  // With CyberSurety Continuous Controls, exploitability drops by 92% and containment limits blast radius to <3%
  const protectedALE = baselineALE * 0.08;
  const annualSavings = baselineALE - protectedALE;

  const [selectedVulnerability, setSelectedVulnerability] = useState<string>('cve-1');

  const vulnerabilities = [
    {
      id: 'cve-1',
      cve: 'CVE-2024-38063',
      name: 'Windows TCP/IP Remote Code Execution',
      epss: 0.94,
      cvss: 9.8,
      inKev: true,
      asset: 'Production VPC Bastion (10.0.1.15)',
      status: 'Auto-Patched via GitOps PR #842',
      riskReduction: '$1.42M'
    },
    {
      id: 'cve-2',
      cve: 'CVE-2024-21626',
      name: 'runc Container Breakout via Working Dir',
      epss: 0.88,
      cvss: 8.6,
      inKev: true,
      asset: 'Kubernetes Worker Cluster (us-east)',
      status: 'eBPF Isolation Active',
      riskReduction: '$980k'
    },
    {
      id: 'cve-3',
      cve: 'CVE-2024-4577',
      name: 'PHP-CGI Argument Injection RCE',
      epss: 0.76,
      cvss: 9.8,
      inKev: true,
      asset: 'Legacy Partner Portal (staging)',
      status: 'WAF Rule Blocked',
      riskReduction: '$640k'
    },
    {
      id: 'cve-4',
      cve: 'CVE-2023-44487',
      name: 'HTTP/2 Rapid Reset Attack (DDoS)',
      epss: 0.65,
      cvss: 7.5,
      inKev: false,
      asset: 'Public API Load Balancers',
      status: 'Rate-Limit Policy Enforced',
      riskReduction: '$320k'
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-400" />
            FAIR™ Quantitative Risk Engine & Exposure Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate probabilistic financial loss models and inspect real-time exploit prediction (EPSS) rankings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-950/60 border border-indigo-800/40 px-3 py-1 font-mono text-xs text-indigo-300">
            Methodology: FAIR™ ISO 27005
          </span>
        </div>
      </div>

      {/* Simulator Inputs & Loss Outcomes */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Slider Inputs */}
        <div className="lg:col-span-6 space-y-4 rounded-xl border border-slate-800 bg-[#05080f] p-5">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            Model Parameters (Organization Profile)
          </h4>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Total Digital Asset Criticality:</span>
              <span className="text-indigo-300 font-bold">${assetValueM}M</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={assetValueM}
              onChange={e => setAssetValueM(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>$5M (Mid-Market)</span>
              <span>$100M (Global Enterprise)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Threat Event Frequency (Adversary Probes/yr):</span>
              <span className="text-indigo-300 font-bold">{threatEventsPerYear} Targeted Events</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={threatEventsPerYear}
              onChange={e => setThreatEventsPerYear(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Vulnerability Exploitability Baseline:</span>
              <span className="text-indigo-300 font-bold">{exploitabilityPct}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={exploitabilityPct}
              onChange={e => setExploitabilityPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Hardened (10%)</span>
              <span>High Exposure (80%)</span>
            </div>
          </div>
        </div>

        {/* Right Financial Loss Outcomes */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/20 via-slate-900/40 to-slate-950 p-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Annualized Loss Expectancy (ALE)
              </span>
              <span className="rounded bg-indigo-900/60 px-2 py-0.5 text-[10px] font-mono text-indigo-300 border border-indigo-700/50">
                10,000 Monte Carlo Trials
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-900/80 p-3.5 border border-rose-900/30">
                <span className="text-[11px] font-mono text-rose-400 block">Unmitigated Exposure</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 block">
                  ${baselineALE.toFixed(2)}M<span className="text-xs text-slate-400 font-normal">/yr</span>
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Without continuous posture control</span>
              </div>

              <div className="rounded-lg bg-emerald-950/40 p-3.5 border border-emerald-800/40">
                <span className="text-[11px] font-mono text-emerald-400 block">With CyberSurety</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 mt-1 block">
                  ${protectedALE.toFixed(2)}M<span className="text-xs text-slate-400 font-normal">/yr</span>
                </span>
                <span className="text-[10px] text-emerald-400/80 mt-1 block">Residual risk capped</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-900/90 p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Net Annual Risk Reduction Value</span>
                <span className="text-[10px] text-slate-400">Protects balance sheet from catastrophic breach impact</span>
              </div>
            </div>
            <span className="text-lg font-bold font-mono text-emerald-400">
              +${annualSavings.toFixed(2)}M
            </span>
          </div>
        </div>
      </div>

      {/* EPSS Prioritized Vulnerabilities Section */}
      <div className="mt-6 border-t border-slate-800/80 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            Continuous Attack Surface: Prioritized Vulnerabilities (EPSS & KEV)
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">
            Focus on the 2% of CVEs that pose 95% of danger
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vulnerabilities.map(v => (
            <div
              key={v.id}
              onClick={() => setSelectedVulnerability(v.id)}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                selectedVulnerability === v.id
                  ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-500/10'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-300">{v.cve}</span>
                <div className="flex items-center gap-1.5">
                  {v.inKev && (
                    <span className="rounded bg-rose-950/80 border border-rose-800/60 px-1.5 py-0.5 text-[9px] font-mono text-rose-300 font-semibold">
                      CISA KEV
                    </span>
                  )}
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                    CVSS {v.cvss}
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-200 mt-1">{v.name}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Asset: {v.asset}</span>
                <span className="text-rose-400 font-semibold">EPSS: {(v.epss * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> {v.status}
                </span>
                <span className="text-slate-400">Saved: <strong className="text-white">{v.riskReduction}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
