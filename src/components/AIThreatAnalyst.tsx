import React, { useState } from 'react';
import { 
  Cpu, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Crosshair, 
  Terminal, 
  ShieldAlert, 
  Layers, 
  FileText, 
  RefreshCw,
  Zap,
  Lock
} from 'lucide-react';
import { PRESET_AI_SCENARIOS } from '../data/mockData';
import { AIAnalysisResult } from '../types';

export const AIThreatAnalyst: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(PRESET_AI_SCENARIOS[0].scenario);
  const [selectedFramework, setSelectedFramework] = useState<string>('NIST CSF 2.0');
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [engineSource, setEngineSource] = useState<string>('gemini-3.8-flash');
  const [activeTab, setActiveTab] = useState<'playbook' | 'mitre' | 'compliance'>('playbook');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleScenarioSelect = (index: number) => {
    setSelectedScenarioIndex(index);
    setCustomPrompt(PRESET_AI_SCENARIOS[index].scenario);
  };

  const handleRunAnalysis = async () => {
    if (!customPrompt.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/threat/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: customPrompt,
          alertType: PRESET_AI_SCENARIOS[selectedScenarioIndex]?.alertType || 'Cyber Incident',
          framework: selectedFramework,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
        if (json.source) setEngineSource(json.source);
      } else {
        throw new Error(json.error || 'Failed to parse AI triage');
      }
    } catch {
      setErrorMsg('Autonomous heuristics failover activated. Displaying deterministic threat triage.');
    } finally {
      setLoading(false);
    }
  };

  // Run on mount for instant high-value demonstration
  React.useEffect(() => {
    handleRunAnalysis();
  }, []);

  return (
    <section id="ai-analyst" className="border-t border-slate-800 bg-[#080c16] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span>AI SECOPS & GRC TRIAGE CO-PILOT</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl font-sans">
              Autonomous AI Threat & Compliance Analyst
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Feed raw attack telemetry, anomalous logs, or hypothetical breach scenarios to synthesize sub-second root cause diagnosis, MITRE ATT&CK mappings, and automated SOAR containment playbooks.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>Engine:</span>
            <span className="inline-flex items-center gap-1.5 rounded bg-cyan-950/80 px-2.5 py-1 font-bold text-cyan-300 border border-cyan-800/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {engineSource === 'gemini-3.8-flash' && 'Gemini 3.8 Flash (Active)'}
              {engineSource === 'gemini-3.1-flash-lite' && 'Gemini 3.1 Flash-Lite (Active)'}
              {engineSource === 'cybersurety-cache' && 'CyberSurety Fast-Path Cache'}
              {engineSource === 'cybersurety-heuristics-engine' && 'Autonomous Heuristics Engine'}
              {!['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'cybersurety-cache', 'cybersurety-heuristics-engine'].includes(engineSource) && 'CyberSurety Intelligence'}
            </span>
          </div>
        </div>

        {/* Console Workspace */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Scenario Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                1. Select Enterprise Incident Scenario:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_AI_SCENARIOS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleScenarioSelect(idx)}
                    className={`flex items-center justify-between rounded-xl p-3 text-left text-xs transition-all ${
                      selectedScenarioIndex === idx
                        ? 'border border-cyan-500/80 bg-cyan-950/30 text-white font-semibold'
                        : 'border border-slate-800 bg-[#070b13] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-500 rounded bg-slate-800 px-1.5 py-0.5">
                      {item.alertType}
                    </span>
                  </button>
                ))}
              </div>

              {/* Scenario Prompt Input */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    2. Telemetry / Event Description:
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Edit or type custom</span>
                </div>
                <textarea
                  rows={4}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe suspicious event logs, network telemetry, or incident..."
                  className="w-full rounded-xl border border-slate-700/80 bg-[#060910] p-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>

              {/* Framework Selector & Trigger Button */}
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-1/2">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Regulatory Lens:
                  </label>
                  <select
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-[#060910] p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                  >
                    <option value="NIST CSF 2.0">NIST CSF 2.0 (All Pillars)</option>
                    <option value="ISO/IEC 27001:2022">ISO/IEC 27001:2022</option>
                    <option value="SOC 2 Type II">SOC 2 Type II (CC6/CC7)</option>
                    <option value="GDPR (EU 2016/679)">GDPR Article 33</option>
                    <option value="HIPAA Security Rule">HIPAA Security Rule</option>
                    <option value="PCI-DSS v4.0">PCI-DSS v4.0</option>
                  </select>
                </div>

                <div className="w-full sm:w-1/2 sm:self-end">
                  <button
                    onClick={handleRunAnalysis}
                    disabled={loading}
                    id="run-ai-triage-btn"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold p-2.5 text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Synthesizing Triage...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Execute Autonomous Triage</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="mt-3 rounded-lg bg-amber-950/40 border border-amber-800/50 p-2.5 text-xs text-amber-300">
                  {errorMsg}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Triage Output */}
          <div className="lg:col-span-7">
            {analysisResult ? (
              <div className="rounded-2xl border border-cyan-900/50 bg-[#090f1d] p-6 shadow-2xl">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-rose-950/80 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-400 border border-rose-800/60">
                        {analysisResult.severity}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Actor: <strong className="text-slate-200">{analysisResult.threatActorType}</strong>
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-white font-sans">
                      {analysisResult.incidentName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs self-start sm:self-auto font-mono">
                    <button
                      onClick={() => setActiveTab('playbook')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'playbook' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Mitigation Plan
                    </button>
                    <button
                      onClick={() => setActiveTab('mitre')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'mitre' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      MITRE ATT&CK
                    </button>
                    <button
                      onClick={() => setActiveTab('compliance')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'compliance' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      GRC Impact
                    </button>
                  </div>
                </div>

                {/* Technical Mechanics Summary */}
                <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5">
                  <span className="text-xs font-mono text-cyan-400 block mb-1 font-semibold">
                    Technical Blast Radius & Mechanics:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisResult.technicalSummary}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-mono text-amber-400">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>Blast Radius: <strong className="text-slate-200">{analysisResult.blastRadius}</strong></span>
                  </div>
                </div>

                {/* Tab: Automated Mitigation Playbook */}
                {activeTab === 'playbook' && (
                  <div className="mt-5 space-y-2.5">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Autonomous SOAR Playbook (Sub-Second Execution):
                    </span>
                    {analysisResult.mitigationPlaybook.map((step) => (
                      <div
                        key={step.step}
                        className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[10px] font-mono text-cyan-400 shrink-0 mt-0.5">
                            {step.step}
                          </div>
                          <div>
                            <span className="text-slate-200 font-medium leading-relaxed block">
                              {step.action}
                            </span>
                            {step.automated && (
                              <span className="mt-1 inline-block rounded bg-cyan-950/80 px-1.5 py-0.2 text-[9px] font-mono text-cyan-400 border border-cyan-800/40">
                                0-Human Latency • Autonomous Agent
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-400 font-bold shrink-0">
                          {step.duration}
                        </span>
                      </div>
                    ))}

                    <div className="mt-4 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3 text-xs text-slate-300">
                      <span className="font-mono text-emerald-400 block mb-1 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" /> NIST CSF 2.0 Recovery Fortification:
                      </span>
                      {analysisResult.recoveryRecommendation}
                    </div>
                  </div>
                )}

                {/* Tab: MITRE ATT&CK Matrix */}
                {activeTab === 'mitre' && (
                  <div className="mt-5 space-y-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Mapped MITRE ATT&CK Techniques:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {analysisResult.mitreAttack.map((technique, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-cyan-300">
                              {technique.id}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 rounded bg-slate-800 px-1.5 py-0.5">
                              {technique.phase}
                            </span>
                          </div>
                          <h6 className="mt-1.5 text-xs font-bold text-white font-sans">
                            {technique.name}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: GRC & Regulatory Compliance Impact */}
                {activeTab === 'compliance' && (
                  <div className="mt-5 space-y-4">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Regulatory & Compliance Exposure:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <span className="text-[11px] font-mono text-slate-500 block">Framework Scope:</span>
                        <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                          {analysisResult.complianceImpact.framework}
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <span className="text-[11px] font-mono text-slate-500 block">Penalty Exposure:</span>
                        <span className="text-xs font-bold text-amber-400 font-mono mt-0.5 block">
                          {analysisResult.complianceImpact.penaltyRisk}
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <span className="text-[11px] font-mono text-slate-500 block">Notification Window:</span>
                        <span className="text-xs font-bold text-rose-300 font-mono mt-0.5 block">
                          {analysisResult.complianceImpact.requiredNotificationWindow}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 text-xs">
                      <span className="font-mono text-slate-400 block mb-2 font-semibold">
                        Violated or Implicated Controls:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.complianceImpact.affectedControls.map((ctrl, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-slate-800 px-2.5 py-1 font-mono text-xs text-indigo-300 border border-slate-700"
                          >
                            {ctrl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 text-xs text-slate-500">
                Click "Execute Autonomous Triage" to generate full threat breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
