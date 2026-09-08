import React, { useState, useEffect } from 'react';
import { Zap, Play, ShieldAlert, CheckCircle2, Clock, Terminal, AlertCircle, FileText, Lock } from 'lucide-react';

interface IRScenario {
  id: string;
  name: string;
  vector: string;
  severity: 'CRITICAL' | 'HIGH';
  blastRadius: string;
  mitreCode: string;
  playbookSteps: { step: number; action: string; duration: string; target: string }[];
}

const SCENARIOS: IRScenario[] = [
  {
    id: 'ransomware',
    name: 'Active Ransomware Subnet Spread',
    vector: 'High-Entropy Disk Renaming + Shadow Copy Deletion',
    severity: 'CRITICAL',
    blastRadius: 'Subnet 10.0.4.0/24 (3 App Nodes)',
    mitreCode: 'T1486 / T1021.002',
    playbookSteps: [
      { step: 1, action: 'Autonomous eBPF SIGKILL on high-entropy disk write threads', duration: '48ms', target: 'Kernel Syscalls' },
      { step: 2, action: 'Isolate VPC Security Groups; drop all SMB/RPC ingress & egress', duration: '142ms', target: 'AWS VPC Eni' },
      { step: 3, action: 'Trigger cold snapshot to immutable air-gapped WORM S3 vault', duration: '310ms', target: 'EBS Storage' },
      { step: 4, action: 'Initialize legal breach timeline & regulatory notification clock', duration: '490ms', target: 'GRC Orchestrator' }
    ]
  },
  {
    id: 'iam-leak',
    name: 'Exposed Cloud IAM Admin Key',
    vector: 'Anomalous API calls from non-corporate IP across 3 regions',
    severity: 'CRITICAL',
    blastRadius: 'Global AWS Organization Admin Role',
    mitreCode: 'T1078.004',
    playbookSteps: [
      { step: 1, action: 'Attach zero-privilege quarantine IAM inline policy', duration: '84ms', target: 'IAM Service' },
      { step: 2, action: 'Revoke active STS sessions and delete compromised access keys', duration: '190ms', target: 'AWS STS / KMS' },
      { step: 3, action: 'Force logout on Okta IdP and enforce hardware WebAuthn re-auth', duration: '340ms', target: 'Okta Directory' },
      { step: 4, action: 'Initiate CloudTrail forensic diff and affected resource audit', duration: '520ms', target: 'Forensic Engine' }
    ]
  },
  {
    id: 'data-exfil',
    name: 'Covert DNS Tunneling Exfiltration',
    vector: 'Base64-encoded DNS queries directed to rogue nameserver',
    severity: 'HIGH',
    blastRadius: 'Payment Gateway Worker (PCI CDE)',
    mitreCode: 'T1048.003',
    playbookSteps: [
      { step: 1, action: 'Reroute DNS resolution to sinkhole black-hole resolver', duration: '32ms', target: 'Route 53 Resolver' },
      { step: 2, action: 'Freeze container pod network namespace via Kubernetes CNI', duration: '115ms', target: 'Kubelet Worker' },
      { step: 3, action: 'Capture ephemeral container memory image for PCI forensic audit', duration: '280ms', target: 'Forensic Dump' },
      { step: 4, action: 'Report incident to QSA (Qualified Security Assessor) dashboard', duration: '440ms', target: 'PCI-DSS Registry' }
    ]
  }
];

export const IncidentResponseWidget: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ransomware');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [totalExecutionTime, setTotalExecutionTime] = useState<number | null>(null);

  const activeScenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleRunPlaybook = () => {
    setIsRunning(true);
    setCompletedSteps([]);
    setTotalExecutionTime(null);

    const steps = activeScenario.playbookSteps;
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.step]);
        if (index === steps.length - 1) {
          setIsRunning(false);
          const finalDuration = parseInt(step.duration, 10) || 480;
          setTotalExecutionTime(finalDuration);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Zap className="h-5 w-5 text-rose-400" />
            Autonomous SOAR Incident Runner & Regulatory War Room
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate sub-second adversary neutralization across cloud, identity, and network planes.
          </p>
        </div>

        <button
          onClick={handleRunPlaybook}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-rose-500/20 hover:from-rose-400 hover:to-amber-500 transition-all disabled:opacity-50"
        >
          <Play className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Executing SOAR Playbook...' : 'Run Automated Containment'}</span>
        </button>
      </div>

      {/* Scenario Selector */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCENARIOS.map(sc => (
          <div
            key={sc.id}
            onClick={() => {
              if (!isRunning) {
                setSelectedScenarioId(sc.id);
                setCompletedSteps([]);
                setTotalExecutionTime(null);
              }
            }}
            className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
              selectedScenarioId === sc.id
                ? 'border-rose-500 bg-rose-950/20 shadow-md shadow-rose-500/10'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white">{sc.name}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                  sc.severity === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800/50'
                    : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                }`}
              >
                {sc.severity}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-1">{sc.vector}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>{sc.mitreCode}</span>
              <span className="text-slate-300 truncate max-w-[110px]">{sc.blastRadius}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Execution Timeline & Results */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Playbook Steps */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#05080f] p-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Autonomous Mitigation Sequence
            </span>
            {totalExecutionTime && (
              <span className="rounded bg-emerald-950 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400 border border-emerald-800/60 animate-fadeIn">
                Neutralized in {totalExecutionTime}ms
              </span>
            )}
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {activeScenario.playbookSteps.map(step => {
              const isDone = completedSteps.includes(step.step);
              return (
                <div
                  key={step.step}
                  className={`flex items-center justify-between rounded-lg p-2.5 border transition-all ${
                    isDone
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800/60 bg-slate-950/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold ${
                        isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-xs text-slate-200">{step.action}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-[11px]">
                    <span className="text-slate-500">[{step.target}]</span>
                    <span className={isDone ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {step.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory Disclosure Clocks */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-800 bg-[#05080f] p-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-400" />
                Regulatory Compliance Clocks
              </span>
              <span className="text-[10px] font-mono text-slate-500">Automated SLAs</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 font-sans">GDPR Article 33</span>
                  <span className="font-mono text-[11px] text-amber-400 font-bold">71h 59m 12s</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Mandatory notification to European Data Protection Authority (DPA).
                </span>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 font-sans">SEC Item 1.05 Form 8-K</span>
                  <span className="font-mono text-[11px] text-cyan-400 font-bold">4 Business Days</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Public company material cybersecurity incident disclosure timeline.
                </span>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 font-sans">HIPAA Breach Rule</span>
                  <span className="font-mono text-[11px] text-indigo-400 font-bold">60 Calendar Days</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  HHS OCR and affected individuals notification requirements.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Chain of Custody Vault Active
            </span>
            <span>SHA-256 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
