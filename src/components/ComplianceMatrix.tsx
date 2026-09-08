import React, { useState } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  ChevronRight, 
  Layers, 
  ExternalLink,
  Award,
  AlertCircle,
  X,
  Calendar
} from 'lucide-react';
import { COMPLIANCE_FRAMEWORKS } from '../data/mockData';
import { ComplianceFramework } from '../types';

interface ComplianceMatrixProps {
  onOpenAuditModal: () => void;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ onOpenAuditModal }) => {
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework>(COMPLIANCE_FRAMEWORKS[1]); // NIST CSF 2.0
  const [modalFramework, setModalFramework] = useState<ComplianceFramework | null>(null);
  const [previewAuditReport, setPreviewAuditReport] = useState<boolean>(false);

  const getStatusBadge = (status: ComplianceFramework['status']) => {
    switch (status) {
      case 'Compliant':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
      case 'Audit Ready':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60';
      default:
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
    }
  };

  return (
    <section id="compliance-matrix" className="border-t border-slate-800 bg-[#070b13] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-mono text-indigo-300">
              <Award className="h-3.5 w-3.5" />
              <span>CONTINUOUS MULTI-FRAMEWORK GRC MATRIX</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl font-sans">
              Continuous Multi-Framework Compliance
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Crosswalk evidence once, satisfy ISO 27001, NIST CSF 2.0, SOC 2, HIPAA, and GDPR simultaneously. Continuous automated tests replace static annual audit panic.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewAuditReport(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Preview Evidence Report</span>
            </button>
            <button
              onClick={onOpenAuditModal}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:from-cyan-400 hover:to-blue-500 font-sans"
            >
              <span>Audit Readiness Guarantee</span>
            </button>
          </div>
        </div>

        {/* Framework Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLIANCE_FRAMEWORKS.map((fw) => {
            const isSelected = selectedFramework.id === fw.id;
            const percent = Math.round((fw.passingControls / fw.totalControls) * 100);

            return (
              <div
                key={fw.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedFramework(fw);
                  setModalFramework(fw);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedFramework(fw);
                    setModalFramework(fw);
                  }
                }}
                className={`group cursor-pointer rounded-2xl border p-5 transition-all text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  isSelected
                    ? 'border-cyan-500/80 bg-slate-900/90 shadow-xl shadow-cyan-500/10'
                    : 'border-slate-800 bg-[#090e18] hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-slate-400">{fw.category}</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold border ${getStatusBadge(fw.status)}`}>
                    {fw.status}
                  </span>
                </div>

                <h4 className="mt-2 text-lg font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                  {fw.name}
                </h4>
                <p className="mt-1 text-xs text-slate-400 line-clamp-1">{fw.fullName}</p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Passing Controls:</span>
                    <span className="text-white font-bold">
                      {fw.passingControls} / {fw.totalControls} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] font-mono text-slate-500">
                  <span>Next Audit: <strong className="text-slate-300">{fw.nextAuditDate}</strong></span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive on Selected Framework */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#090f1d] p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-white font-sans">
                  {selectedFramework.name}
                </span>
                <span className={`rounded px-2.5 py-0.5 text-xs font-mono font-bold border ${getStatusBadge(selectedFramework.status)}`}>
                  {selectedFramework.status}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">{selectedFramework.fullName}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2">
                <span className="text-slate-500 block">Readiness Meter</span>
                <span className="text-base font-bold text-emerald-400">
                  {Math.round((selectedFramework.passingControls / selectedFramework.totalControls) * 100)}% Passing
                </span>
              </div>
              <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2">
                <span className="text-slate-500 block">Continuous Tests</span>
                <span className="text-base font-bold text-cyan-400">Daily Automated</span>
              </div>
            </div>
          </div>

          {/* Key Requirement Controls Checklist */}
          <div className="mt-6">
            <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Governed Framework Scope & Control Categories:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedFramework.keyRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed font-medium">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Crosswalk Advantage Callout */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-indigo-400 shrink-0" />
              <div>
                <h6 className="text-xs font-bold text-white font-sans">
                  Universal Evidence Crosswalk Architecture
                </h6>
                <p className="text-xs text-slate-300">
                  Evidence collected for {selectedFramework.name} is automatically verified and accredited towards SOC 2, ISO 27001, and HIPAA simultaneously.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenAuditModal}
              className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors shrink-0"
            >
              Export Auditor Vault
            </button>
          </div>
        </div>

        {/* Evidence Report Simulator Modal */}
        {previewAuditReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#080d19] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white font-sans">
                    CyberSurety Cryptographic Audit Certificate Preview
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewAuditReport(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs text-slate-300 bg-[#05080f] p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Document Type:</span>
                  <span className="text-white font-bold">Continuous SOC 2 & ISO 27001 Attestation</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Subject Tenant:</span>
                  <span className="text-cyan-400">Enterprise Cloud Production Environment</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Cryptographic Hash:</span>
                  <span className="text-slate-400 text-[10px]">sha256:8f4c2e...b971a0e4 (RFC 3161 Certified)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Autonomous Mitigation Compliance:</span>
                  <span className="text-emerald-400">100% of detected CVEs contained &lt; 300ms</span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                  "This attestation confirms continuous compliance monitoring and automated containment under AICPA Trust Services Criteria and ISO/IEC 27001:2022 standards as certified by CyberSurety."
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewAuditReport(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPreviewAuditReport(false);
                    onOpenAuditModal();
                  }}
                  className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors"
                >
                  Download Full Auditor Package
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Framework Detail Pop-up Modal */}
        {modalFramework && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setModalFramework(null)}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-[#080d1a] p-6 sm:p-8 shadow-2xl shadow-cyan-950/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/50">
                      {modalFramework.category}
                    </span>
                    <span className={`rounded px-2.5 py-0.5 text-xs font-mono font-bold border ${getStatusBadge(modalFramework.status)}`}>
                      {modalFramework.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    {modalFramework.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    {modalFramework.fullName}
                  </p>
                </div>

                <button
                  onClick={() => setModalFramework(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Metrics Overview */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Controls Passing</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {modalFramework.passingControls} / {modalFramework.totalControls}
                  </span>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-1.5 rounded-full"
                      style={{
                        width: `${Math.round((modalFramework.passingControls / modalFramework.totalControls) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    {Math.round((modalFramework.passingControls / modalFramework.totalControls) * 100)}% Compliance Score
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    Next Audit Date
                  </span>
                  <span className="text-base font-bold text-white font-mono">
                    {modalFramework.nextAuditDate}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                    Accredited independent registrar
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Telemetry Verification
                  </span>
                  <span className="text-base font-bold text-cyan-300 font-mono">
                    Continuous
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                    Sub-second automated tests
                  </span>
                </div>
              </div>

              {/* Governed Requirements and Controls */}
              <div className="mt-6">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  Governed Scope & Enforced Controls ({modalFramework.keyRequirements.length}):
                </h4>
                <div className="space-y-2.5">
                  {modalFramework.keyRequirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed font-medium">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Universal Evidence Crosswalk note */}
              <div className="mt-6 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4 flex items-start gap-3">
                <Layers className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-white block">
                    Universal Evidence Crosswalk Architecture
                  </span>
                  <p>
                    Evidence collected for {modalFramework.name} is automatically verified and mapped across SOC 2, ISO 27001, and NIST CSF standards in CyberSurety to eliminate redundant auditing cycles.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  onClick={() => setModalFramework(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setModalFramework(null);
                    setPreviewAuditReport(true);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Preview Evidence Vault</span>
                </button>
                <button
                  onClick={() => {
                    setModalFramework(null);
                    onOpenAuditModal();
                  }}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
                >
                  Schedule Readiness Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
