import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Terminal, 
  Filter, 
  RefreshCw, 
  Play, 
  Clock, 
  Crosshair, 
  ChevronRight, 
  X, 
  Layers, 
  Download, 
  Server, 
  Lock, 
  ExternalLink,
  Bug,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { INITIAL_THREAT_ALERTS } from '../data/mockData';
import { ThreatAlert, ThreatSeverity, ThreatStatus } from '../types';

export const ThreatRadarSandbox: React.FC = () => {
  const [alerts, setAlerts] = useState<ThreatAlert[]>(INITIAL_THREAT_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<ThreatAlert | null>(INITIAL_THREAT_ALERTS[0]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [mitigatingId, setMitigatingId] = useState<string | null>(null);
  const [autoMitigateMode, setAutoMitigateMode] = useState<boolean>(true);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [mitigationProgress, setMitigationProgress] = useState<number>(0);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter === 'ALL') return true;
    return alert.severity === severityFilter;
  });

  const getSeverityBadge = (sev: ThreatSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-950/80 text-rose-400 border border-rose-800/60';
      case 'HIGH':
        return 'bg-amber-950/80 text-amber-400 border border-amber-800/60';
      case 'MEDIUM':
        return 'bg-yellow-950/80 text-yellow-400 border border-yellow-800/60';
      case 'LOW':
        return 'bg-blue-950/80 text-blue-400 border border-blue-800/60';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const getStatusBadge = (status: ThreatStatus) => {
    switch (status) {
      case 'DETECTED':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-950/80 px-2 py-0.5 text-[11px] font-mono text-rose-400 border border-rose-800/50 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span> DETECTED
          </span>
        );
      case 'ANALYZING':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-950/80 px-2 py-0.5 text-[11px] font-mono text-amber-400 border border-amber-800/50">
            <RefreshCw className="h-2.5 w-2.5 animate-spin" /> ANALYZING
          </span>
        );
      case 'MITIGATING':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-cyan-950/80 px-2 py-0.5 text-[11px] font-mono text-cyan-400 border border-cyan-800/50">
            <Zap className="h-2.5 w-2.5 animate-bounce" /> MITIGATING
          </span>
        );
      case 'NEUTRALIZED':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-950/80 px-2 py-0.5 text-[11px] font-mono text-emerald-400 border border-emerald-800/50">
            <CheckCircle2 className="h-2.5 w-2.5" /> NEUTRALIZED
          </span>
        );
    }
  };

  // Trigger mitigation workflow
  const triggerMitigation = (alertId: string) => {
    setMitigatingId(alertId);
    setMitigationProgress(15);

    // Update status to MITIGATING
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'MITIGATING' } : a))
    );

    const timer1 = setTimeout(() => {
      setMitigationProgress(65);
    }, 400);

    const timer2 = setTimeout(() => {
      setMitigationProgress(100);
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? {
                ...a,
                status: 'NEUTRALIZED',
                containmentTimeMs: Math.floor(Math.random() * 150) + 180,
                playbookSteps: a.playbookSteps.map((s) => ({ ...s, completed: true }))
              }
            : a
        )
      );
      setMitigatingId(null);
      setMitigationProgress(0);
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  // Inject a simulated attack
  const injectSimulatedAttack = (type: 'ransomware' | 'iam' | 'zeroday' | 'dns') => {
    setSimulationRunning(true);
    const id = `SEC-2026-${Math.floor(Math.random() * 800) + 1000}`;
    
    let newAlert: ThreatAlert;

    if (type === 'ransomware') {
      newAlert = {
        id,
        title: 'Ransomware Canary Alert: Canary File Encryption on App Cluster',
        severity: 'CRITICAL',
        category: 'Ransomware',
        pillar: 'respond',
        source: '10.0.8.44 (Staging Node - Ingress Probe)',
        targetAsset: 'k8s-pod-order-processor-7c9b',
        timestamp: 'Just now',
        mitreCode: 'T1486',
        mitreTechnique: 'Data Encrypted for Impact',
        mitrePhase: 'Impact',
        status: 'DETECTED',
        blastRadius: 'Order Processing VPC & Cache Layer',
        details: 'eBPF tripwire detected encryption attempt on decoy file .canary_financial_2026.xlsx. Immediate host process isolation required.',
        playbookSteps: [
          { step: 1, action: 'SIGKILL anomalous high-entropy encryption worker thread', automated: true, duration: '40ms' },
          { step: 2, action: 'Isolate pod network security group from cluster mesh', automated: true, duration: '110ms' },
          { step: 3, action: 'Snapshot volatile RAM for memory forensic analysis', automated: true, duration: '450ms' },
          { step: 4, action: 'Trigger disaster recovery standby verification', automated: true, duration: '1.2s' }
        ]
      };
    } else if (type === 'iam') {
      newAlert = {
        id,
        title: 'Stolen Session Cookie: AWS Console AssumeRole without MFA',
        severity: 'HIGH',
        category: 'Identity / IAM',
        pillar: 'protect',
        source: 'IP: 194.26.29.110 (Unknown VPN Subnet)',
        targetAsset: 'IAM Role: DevOps-Kubernetes-Admin',
        timestamp: 'Just now',
        mitreCode: 'T1539',
        mitreTechnique: 'Steal Web Session Cookie',
        mitrePhase: 'Credential Access',
        status: 'DETECTED',
        blastRadius: 'Global Production Cluster IAM Permissions',
        details: 'Session token issued for San Francisco used 1 minute later from Bucharest without re-authenticating with WebAuthn FIDO2 key.',
        playbookSteps: [
          { step: 1, action: 'Revoke AWS STS temporary credentials immediately', automated: true, duration: '85ms' },
          { step: 2, action: 'Terminate active Okta identity browser sessions', automated: true, duration: '190ms' },
          { step: 3, action: 'Lock user account and trigger admin SMS notification', automated: true, duration: '500ms' }
        ]
      };
    } else if (type === 'dns') {
      newAlert = {
        id,
        title: 'Exfiltration Over DNS: Base64 Customer Card Fragments',
        severity: 'CRITICAL',
        category: 'Data Exfiltration',
        pillar: 'detect',
        source: '10.0.1.19 (Database Proxy VIP)',
        targetAsset: 'dns://egress-stealth-relay.to',
        timestamp: 'Just now',
        mitreCode: 'T1048.003',
        mitreTechnique: 'Exfiltration Over Alternative Protocol',
        mitrePhase: 'Exfiltration',
        status: 'DETECTED',
        blastRadius: 'Customer Billing Gateway & Card Tokenizer',
        details: 'Outbound TXT record requests transmitting 4.2 MB of encrypted cardholder hashes to an external adversary authoritative NS.',
        playbookSteps: [
          { step: 1, action: 'Apply DNS RPZ firewall rule blocking external domain', automated: true, duration: '35ms' },
          { step: 2, action: 'Sever DB proxy egress channel and flush local cache', automated: true, duration: '150ms' },
          { step: 3, action: 'Invoke GDPR Article 33 forensic audit logging', automated: true, duration: '900ms' }
        ]
      };
    } else {
      newAlert = {
        id,
        title: 'Zero-Day GraphQL Query Batching DDoS & Resource Exhaustion',
        severity: 'MEDIUM',
        category: 'Zero-Day Exploit',
        pillar: 'detect',
        source: 'Distributed Botnet (482 Unique ASNs)',
        targetAsset: 'graphql.enterprise-api.com',
        timestamp: 'Just now',
        mitreCode: 'T1499.003',
        mitreTechnique: 'Endpoint Denial of Service',
        mitrePhase: 'Impact',
        status: 'DETECTED',
        blastRadius: 'Public API Load Balancer Tier',
        details: 'Circular nested query explosion attempting to spike CPU consumption on backend database ORM instances.',
        playbookSteps: [
          { step: 1, action: 'Deploy edge WAF query complexity depth ceiling (Max 5)', automated: true, duration: '50ms' },
          { step: 2, action: 'Rate-limit unauthenticated GraphQL batch requests', automated: true, duration: '120ms' },
          { step: 3, action: 'Scale autoscaling group by +40% capacity', automated: true, duration: '2.1s' }
        ]
      };
    }

    setAlerts((prev) => [newAlert, ...prev]);
    setSelectedAlert(newAlert);
    setTimeout(() => {
      setSimulationRunning(false);
      if (autoMitigateMode) {
        triggerMitigation(newAlert.id);
      }
    }, 600);
  };

  return (
    <section id="threat-sandbox" className="border-t border-slate-800 bg-[#070b13] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-rose-950/60 border border-rose-800/40 px-3 py-1 text-xs font-mono text-rose-400">
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              <span>LIVE SOC THREAT MONITOR & AUTOMATED MITIGATION ENGINE</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl font-sans">
              Interactive Autonomous SOC Console
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Experience CyberSurety in action. Real-time telemetry ingestion, autonomous root-cause analysis, and sub-second automated playbook mitigation without human intervention.
            </p>
          </div>

          {/* Test Injection Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Auto-Mitigate:</span>
              <button
                onClick={() => setAutoMitigateMode(!autoMitigateMode)}
                className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold transition-colors ${
                  autoMitigateMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {autoMitigateMode ? 'ENABLED (Sub-300ms)' : 'MANUAL APPROVAL'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => injectSimulatedAttack('ransomware')}
                disabled={simulationRunning}
                id="inject-ransomware-btn"
                className="flex items-center gap-1.5 rounded-lg bg-rose-950/70 border border-rose-800/60 hover:bg-rose-900/80 px-3 py-1.5 text-xs font-semibold text-rose-300 transition-colors"
              >
                <Bug className="h-3.5 w-3.5" />
                <span>Simulate Ransomware</span>
              </button>
              <button
                onClick={() => injectSimulatedAttack('iam')}
                disabled={simulationRunning}
                id="inject-iam-btn"
                className="flex items-center gap-1.5 rounded-lg bg-amber-950/70 border border-amber-800/60 hover:bg-amber-900/80 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Simulate IAM Breach</span>
              </button>
              <button
                onClick={() => injectSimulatedAttack('dns')}
                disabled={simulationRunning}
                id="inject-dns-btn"
                className="flex items-center gap-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 hover:bg-cyan-900/80 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors"
              >
                <Server className="h-3.5 w-3.5" />
                <span>Simulate DNS Exfil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Console Layout: Left List + Right Inspector */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Feed Column */}
          <div className="lg:col-span-6 space-y-3">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-slate-900/70 rounded-xl p-3 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-slate-400">Severity:</span>
                {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold transition-colors ${
                      severityFilter === sev
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-400 hover:text-white bg-slate-800/60'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
              <div className="font-mono text-slate-500 text-[11px]">
                {filteredAlerts.length} Ingested Events
              </div>
            </div>

            {/* Alert Items */}
            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredAlerts.map((alert) => {
                const isSelected = selectedAlert?.id === alert.id;
                const isMitigatingThis = mitigatingId === alert.id;

                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-cyan-500/80 bg-slate-900 shadow-md shadow-cyan-500/10'
                        : 'border-slate-800 bg-[#090e18] hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">{alert.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] text-slate-500 font-mono">{alert.timestamp}</span>
                      </div>
                      <div>{getStatusBadge(alert.status)}</div>
                    </div>

                    <h4 className="mt-2 text-sm font-bold text-white font-sans leading-snug">
                      {alert.title}
                    </h4>

                    <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 font-mono">
                      <span>
                        Asset: <strong className="text-slate-300">{alert.targetAsset}</strong>
                      </span>
                      <span>
                        MITRE: <strong className="text-cyan-400">{alert.mitreCode}</strong>
                      </span>
                    </div>

                    {/* Containment action or status info */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                      <span className="text-[11px] text-slate-500">
                        Category: <strong className="text-slate-300">{alert.category}</strong>
                      </span>

                      {alert.status === 'NEUTRALIZED' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Containment: {alert.containmentTimeMs || 280}ms
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerMitigation(alert.id);
                          }}
                          disabled={isMitigatingThis}
                          id={`mitigate-btn-${alert.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1 text-xs transition-colors shadow-sm"
                        >
                          <Zap className="h-3 w-3" />
                          <span>{isMitigatingThis ? 'Mitigating...' : 'Mitigate Autonomous'}</span>
                        </button>
                      )}
                    </div>

                    {/* Mitigation animation progress bar */}
                    {isMitigatingThis && (
                      <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${mitigationProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Inspector Column */}
          <div className="lg:col-span-6">
            {selectedAlert ? (
              <div className="sticky top-20 rounded-2xl border border-slate-800 bg-[#080d19] p-6 shadow-xl">
                {/* Inspector Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded ${getSeverityBadge(selectedAlert.severity)}`}>
                        {selectedAlert.severity}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{selectedAlert.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{selectedAlert.category}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-white font-sans">
                      {selectedAlert.title}
                    </h3>
                  </div>
                  <div>{getStatusBadge(selectedAlert.status)}</div>
                </div>

                {/* MITRE ATT&CK Matrix Card */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <Crosshair className="h-3.5 w-3.5" /> MITRE ATT&CK Framework
                    </span>
                    <span className="text-slate-500">Tactic Phase: {selectedAlert.mitrePhase}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Technique ID:</span>
                      <span className="font-mono font-bold text-cyan-300">{selectedAlert.mitreCode}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Technique Name:</span>
                      <span className="text-slate-200 font-medium">{selectedAlert.mitreTechnique}</span>
                    </div>
                  </div>
                </div>

                {/* Blast Radius & Technical Mechanics */}
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      Target & Attack Vector:
                    </span>
                    <p className="text-xs text-slate-300 font-mono">
                      Source: <span className="text-rose-400">{selectedAlert.source}</span> &rarr; Target: <span className="text-emerald-400">{selectedAlert.targetAsset}</span>
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {selectedAlert.details}
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5">
                    <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5 mb-1 font-semibold">
                      <AlertTriangle className="h-3.5 w-3.5" /> Estimated Blast Radius:
                    </span>
                    <p className="text-xs text-slate-200">
                      {selectedAlert.blastRadius}
                    </p>
                  </div>
                </div>

                {/* Sub-Second Playbook Execution Steps */}
                <div className="mt-5 border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-cyan-400" />
                      Autonomous SOAR Playbook Steps
                    </h5>
                    <span className="text-[11px] font-mono text-slate-500">
                      Executed in parallel
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedAlert.playbookSteps.map((step) => {
                      const isDone = step.completed || selectedAlert.status === 'NEUTRALIZED';

                      return (
                        <div
                          key={step.step}
                          className={`flex items-start justify-between gap-3 rounded-lg border p-2.5 text-xs ${
                            isDone
                              ? 'border-emerald-900/40 bg-emerald-950/20 text-emerald-200'
                              : 'border-slate-800 bg-slate-900/40 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                                {step.step}
                              </div>
                            )}
                            <div>
                              <span className="leading-snug">{step.action}</span>
                              {step.automated && (
                                <span className="ml-2 rounded bg-cyan-950 px-1 py-0.2 text-[9px] font-mono text-cyan-400 border border-cyan-800/40">
                                  AUTO
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400 shrink-0">
                            {step.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Audit Status: <span className="text-emerald-400">Cryptographically Signed</span>
                  </div>

                  {selectedAlert.status !== 'NEUTRALIZED' ? (
                    <button
                      onClick={() => triggerMitigation(selectedAlert.id)}
                      disabled={mitigatingId === selectedAlert.id}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2 text-xs transition-all shadow-md shadow-cyan-500/20"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>
                        {mitigatingId === selectedAlert.id
                          ? 'Executing Containment...'
                          : 'Execute Autonomous Containment'}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4" /> Containment Verified (0 Residual Threat)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 text-xs text-slate-500">
                Select an alert from the live feed to inspect forensic telemetry.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
