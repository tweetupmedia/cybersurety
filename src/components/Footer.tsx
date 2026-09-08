import React from 'react';
import { Shield, Lock, FileCheck, CheckCircle2, Award, HeartHandshake, ExternalLink, Activity, Target, Zap } from 'lucide-react';
import { PillarKey, ServiceKey } from '../types';

interface FooterProps {
  onSelectPillar: (key: PillarKey) => void;
  onScrollTo: (id: string) => void;
  onOpenAuditModal: () => void;
  onNavigateToServices?: (subpage?: ServiceKey | 'overview') => void;
  onNavigateToContact?: () => void;
  onNavigateToResources?: (resourceId?: string) => void;
  onOpenLiveChat?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectPillar, 
  onScrollTo, 
  onOpenAuditModal,
  onNavigateToServices,
  onNavigateToContact,
  onNavigateToResources,
  onOpenLiveChat
}) => {
  return (
    <footer className="border-t border-slate-800 bg-[#05080f] text-slate-400">
      {/* Certifications Bar */}
      <div className="border-b border-slate-800/80 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-wider">
              Accredited Enterprise Compliance:
            </span>
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> ISO/IEC 27001:2022
              </span>
              <span className="flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> NIST CSF 2.0 Core
              </span>
              <span className="flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" /> SOC 2 Type II
              </span>
              <span className="flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> HIPAA Security Rule
              </span>
              <span className="flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 border border-slate-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-rose-400" /> GDPR Art. 32/33
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-5 xl:gap-6">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080c14]">
                  <Shield className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Cyber<span className="text-cyan-400">Surety</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The premier autonomous cybersecurity, compliance, and risk management SaaS platform. Continuous multi-cloud telemetry monitoring, sub-second zero-day mitigation, and unified GRC orchestration.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational &bull; 99.99% Telemetry Uptime</span>
            </div>
          </div>

          {/* Col: Cyber Services */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Cyber Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToServices && onNavigateToServices('overview')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  All Services Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToServices && onNavigateToServices('threat-monitoring')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Threat Monitoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToServices && onNavigateToServices('risk-assessment')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Risk Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToServices && onNavigateToServices('compliance-management')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Compliance Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToServices && onNavigateToServices('incident-response')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Incident Response
                </button>
              </li>
            </ul>
          </div>

          {/* Col: The 6 Pillars */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              The 6 Pillars (NIST CSF)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('govern');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  1. Govern (Compliance)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('identify');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  2. Identify (What to Protect)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('protect');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  3. Protect (Security Controls)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('detect');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  4. Detect (Monitor Threats)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('respond');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  5. Respond (Quick Incident Action)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('recover');
                    onScrollTo('six-pillars');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  6. Recover (Restore & Strengthen)
                </button>
              </li>
            </ul>
          </div>

          {/* Col: Resources & Intelligence */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Resources & Intel
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateToResources && onNavigateToResources()} 
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors text-left"
                >
                  Resources Portal & Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToResources && onNavigateToResources('ebpf-kernel-telemetry')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Technical Blog Posts (eBPF)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToResources && onNavigateToResources('epss-vs-cvss-report')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  EPSS & Exploit Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToResources && onNavigateToResources('webinar-adversary-emulation')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Adversary Webinars & Demos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToResources && onNavigateToResources('case-study-aegis-fintech')} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Customer Case Studies (FinTech)
                </button>
              </li>
            </ul>
          </div>

          {/* Col: Contact & Incident Command */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Contact & SOC
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateToContact && onNavigateToContact()} 
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Contact CyberSurety</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLiveChat && onOpenLiveChat()} 
                  className="hover:text-cyan-400 transition-colors text-left text-emerald-400 font-mono"
                >
                  &bull; Launch Live Chat (8am-6pm)
                </button>
              </li>
              <li>
                <span className="text-rose-400 font-mono block">
                  24/7 Hotline: +1 (800) 555-CYBER
                </span>
              </li>
              <li>
                <span className="text-slate-400 block">
                  Austin Command: 100 Congress Ave
                </span>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-cyan-400 transition-colors text-left">
                  Schedule Threat Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Col: Trust & Standards */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">Security Trust Center</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">Subprocessors & Cryptography</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">Privacy Charter (GDPR)</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">Responsible Disclosure & Bug Bounty</span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">Service Level Agreement (SLA 99.99%)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[11px] font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} CyberSurety Inc. All rights reserved. Enterprise Cybersecurity, Compliance & Risk SaaS.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 cursor-pointer">SOC 2 Report</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
