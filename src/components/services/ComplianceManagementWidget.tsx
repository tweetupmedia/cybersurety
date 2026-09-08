import React, { useState } from 'react';
import { FileCheck, ShieldCheck, Download, CheckCircle2, Lock, ArrowRight, RefreshCw, Key, Database, Globe } from 'lucide-react';

interface EvidenceItem {
  id: string;
  frameworkControl: string;
  frameworkName: string;
  resource: string;
  sourceIntegration: string;
  sha256Hash: string;
  timestamp: string;
  status: 'COMPLIANT' | 'VERIFIED';
  detail: string;
}

const SAMPLE_EVIDENCE: EvidenceItem[] = [
  {
    id: 'ev-01',
    frameworkControl: 'NIST CSF PR.DS-1 / ISO 27001 A.10.1',
    frameworkName: 'Cryptographic Encryption at Rest',
    resource: 'arn:aws:kms:us-east-1:prod-database-cmk',
    sourceIntegration: 'AWS KMS API Connector',
    sha256Hash: '9a4f21bc78e0d3...8e21a',
    timestamp: '10:35:04 UTC (Hourly Poll)',
    status: 'COMPLIANT',
    detail: 'Automatic 90-day key rotation enabled; zero unencrypted tables detected in Aurora PostgreSQL clusters.'
  },
  {
    id: 'ev-02',
    frameworkControl: 'SOC 2 CC6.1 / HIPAA §164.312(a)(2)(iv)',
    frameworkName: 'Hardware Token MFA Enforcement',
    resource: 'Okta Enterprise Directory (All 340 Users)',
    sourceIntegration: 'Okta System Log API',
    sha256Hash: '43d81b99a0e41f...10b99',
    timestamp: '10:34:45 UTC (Real-time)',
    status: 'VERIFIED',
    detail: '100% of admin and engineering accounts enrolled with FIDO2 WebAuthn / YubiKey physical authenticators.'
  },
  {
    id: 'ev-03',
    frameworkControl: 'ISO 27001 A.12.1.2 / SOC 2 CC6.8',
    frameworkName: 'Production Peer-Review & Branch Protection',
    resource: 'GitHub Org: cybersurety/core-backend (main)',
    sourceIntegration: 'GitHub App Webhook',
    sha256Hash: 'c719e04812a8ff...98c32',
    timestamp: '10:34:10 UTC (Event-driven)',
    status: 'COMPLIANT',
    detail: 'Enforces minimum 2 senior approvals, signed GPG commits, and zero direct push access to protected branches.'
  },
  {
    id: 'ev-04',
    frameworkControl: 'GDPR Art. 32 / PCI-DSS Req 3.4',
    frameworkName: 'Data Security Posture & Masking',
    resource: 'Cloud Storage: s3://prod-customer-pii-vault',
    sourceIntegration: 'AWS S3 CSPM Hook',
    sha256Hash: '190e4f88ba210c...77a10',
    timestamp: '10:33:50 UTC (Hourly Poll)',
    status: 'COMPLIANT',
    detail: 'Public access block active; server-side encryption AES-256; object versioning and MFA delete strictly enforced.'
  }
];

export const ComplianceManagementWidget: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<'ALL' | 'ISO 27001' | 'NIST CSF 2.0' | 'SOC 2' | 'HIPAA' | 'GDPR'>('ALL');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const frameworks = [
    { name: 'ISO/IEC 27001:2022', score: 98, passing: '93/93 Controls', badge: 'Certified' },
    { name: 'NIST CSF 2.0', score: 100, passing: '106/106 Controls', badge: 'Auditor Verified' },
    { name: 'SOC 2 Type II', score: 97, passing: '62/64 Tests', badge: 'Audit Ready' },
    { name: 'HIPAA Security Rule', score: 100, passing: '42/42 Safeguards', badge: 'Compliant' },
    { name: 'GDPR (Art. 25/32/33)', score: 96, passing: '31/32 Requirements', badge: 'Protected' },
  ];

  const handleExportBundle = () => {
    setIsExporting(true);
    setExportNotice(null);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice('Cryptographic Evidence Bundle compiled successfully: SHA256-AUDIT-20260908-VERIFIED.zip containing 4,280 signed evidence records.');
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-emerald-400" />
            Continuous Compliance & Automated Evidence Harvester
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Zero-human evidence gathering across 85+ cloud connectors with cryptographic attestation.
          </p>
        </div>

        <button
          onClick={handleExportBundle}
          disabled={isExporting}
          className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
        >
          <Download className={`h-3.5 w-3.5 ${isExporting ? 'animate-bounce text-emerald-400' : ''}`} />
          <span>{isExporting ? 'Packaging Auditor Bundle...' : 'Export Auditor Bundle (.ZIP)'}</span>
        </button>
      </div>

      {exportNotice && (
        <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold font-mono text-emerald-200">Evidence Vault Ready: </span>
            <span>{exportNotice}</span>
          </div>
        </div>
      )}

      {/* Framework Readiness Meters */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {frameworks.map((fw, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-[#05080f] p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-200 font-sans truncate">{fw.name}</span>
              <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-800/40">
                {fw.badge}
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-xl font-bold font-mono text-emerald-400">{fw.score}%</span>
              <span className="text-[10px] text-slate-500 font-mono">{fw.passing}</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1.5 rounded-full"
                style={{ width: `${fw.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Evidence Room Table */}
      <div className="mt-6 border-t border-slate-800/80 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Lock className="h-4 w-4 text-cyan-400" />
            Cryptographically Hashed Continuous Evidence Stream
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">
            SHA-256 Hashed • Tamper-Proof WORM Storage
          </span>
        </div>

        <div className="space-y-3">
          {SAMPLE_EVIDENCE.map(item => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-950/70 border border-emerald-800/50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                    {item.status}
                  </span>
                  <span className="font-semibold text-xs text-white">{item.frameworkName}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span className="text-cyan-400">{item.sourceIntegration}</span>
                  <span>&bull;</span>
                  <span className="text-slate-500">{item.timestamp}</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {item.detail}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                <span>Mapped: <strong className="text-slate-300">{item.frameworkControl}</strong></span>
                <span className="text-slate-400 truncate max-w-xs">Hash: {item.sha256Hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
