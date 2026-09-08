import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Building, 
  Mail, 
  User, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

interface ScheduleAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleAuditModal: React.FC<ScheduleAuditModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    targetFramework: 'NIST CSF 2.0',
    primaryCloud: 'AWS',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-[#080d19] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Schedule Threat & GRC Audit
                </h3>
                <p className="text-xs text-slate-400">
                  Complimentary 30-minute posture analysis with a Senior Solutions Architect.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Full Name:
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Corporate Work Email:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="alex@enterprise.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Company Name:
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Primary Framework:
                  </label>
                  <select
                    value={formData.targetFramework}
                    onChange={(e) => setFormData({ ...formData, targetFramework: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                  >
                    <option value="NIST CSF 2.0">NIST CSF 2.0</option>
                    <option value="ISO/IEC 27001:2022">ISO/IEC 27001:2022</option>
                    <option value="SOC 2 Type II">SOC 2 Type II</option>
                    <option value="HIPAA Security Rule">HIPAA Security Rule</option>
                    <option value="GDPR (EU 2016/679)">GDPR Article 32/33</option>
                    <option value="PCI-DSS v4.0">PCI-DSS v4.0</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Primary Cloud Infrastructure:
                </label>
                <select
                  value={formData.primaryCloud}
                  onChange={(e) => setFormData({ ...formData, primaryCloud: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                >
                  <option value="AWS">Amazon Web Services (AWS)</option>
                  <option value="GCP">Google Cloud Platform (GCP)</option>
                  <option value="Azure">Microsoft Azure</option>
                  <option value="Multi-Cloud">Multi-Cloud Hybrid</option>
                  <option value="On-Prem">Bare Metal / Private Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Current Challenges or Key Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Preparing for ISO 27001 audit next quarter; reducing false positive SIEM alerts."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-audit-request-btn"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3 text-xs sm:text-sm font-bold text-slate-950 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <span>Confirm Audit Booking & Generate Posture Preview</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <Lock className="h-3 w-3" /> Protected by NDA & CyberSurety Privacy Charter.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white font-sans">
              Audit Scheduled Successfully!
            </h3>
            <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto">
              Thank you, <strong className="text-cyan-400">{formData.fullName}</strong>. A calendar invitation and preliminary readiness assessment for <strong className="text-white">{formData.company}</strong> has been dispatched to <strong className="text-white">{formData.workEmail}</strong>.
            </p>

            {/* Instant Snapshot Card */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-[#05080f] p-4 text-left font-mono text-xs text-slate-300 space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Framework Focus:</span>
                <span className="text-cyan-400 font-bold">{formData.targetFramework}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Target Environment:</span>
                <span className="text-white">{formData.primaryCloud}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Assigned Architect:</span>
                <span className="text-indigo-300">Principal GRC SecOps Lead</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Readiness Guarantee:</span>
                <span className="text-emerald-400 font-bold">100% Audit Pass Warranty</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleReset}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-6 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
