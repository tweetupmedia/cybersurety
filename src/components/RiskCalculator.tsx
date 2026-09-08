import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { RiskCalculatorInputs } from '../types';

interface RiskCalculatorProps {
  onOpenAuditModal: () => void;
}

export const RiskCalculator: React.FC<RiskCalculatorProps> = ({ onOpenAuditModal }) => {
  const [inputs, setInputs] = useState<RiskCalculatorInputs>({
    industry: 'FinTech / Banking',
    companySize: '100 - 500 Employees',
    cloudProviders: ['AWS', 'GCP'],
    frameworks: ['SOC 2 Type II', 'ISO/IEC 27001:2022'],
    hasMFAEverywhere: true,
    hasImmutableBackups: true,
    hasAutomatedSIEM: false,
    hasContinuousAudits: false,
  });

  // Calculate dynamic ROI metrics
  const getMultiplierBySize = () => {
    switch (inputs.companySize) {
      case '1 - 25 Employees':
        return 0.3;
      case '25 - 100 Employees':
        return 0.7;
      case '100 - 500 Employees':
        return 1.4;
      case '500+ Employees':
        return 3.2;
      default:
        return 1.0;
    }
  };

  const getIndustryMultiplier = () => {
    switch (inputs.industry) {
      case 'Healthcare & MedTech':
        return 1.6;
      case 'FinTech / Banking':
        return 1.5;
      case 'Enterprise SaaS':
        return 1.2;
      case 'Defense & Aerospace':
        return 1.8;
      default:
        return 1.0;
    }
  };

  const baseBreachCost = 4450000; // IBM Cost of a Data Breach standard baseline
  const sizeMult = getMultiplierBySize();
  const indMult = getIndustryMultiplier();

  // Controls impact
  let controlsCount = 0;
  if (inputs.hasMFAEverywhere) controlsCount++;
  if (inputs.hasImmutableBackups) controlsCount++;
  if (inputs.hasAutomatedSIEM) controlsCount += 2;
  if (inputs.hasContinuousAudits) controlsCount += 2;

  const riskReductionPct = Math.min(88, 30 + controlsCount * 10);
  const potentialExposure = Math.round((baseBreachCost * sizeMult * indMult) / 1000) * 1000;
  const residualRisk = Math.round(potentialExposure * (1 - riskReductionPct / 100));
  const hoursSavedPerYear = Math.round(520 * sizeMult + inputs.frameworks.length * 140);
  const insuranceSavings = Math.min(42, 12 + controlsCount * 5);

  let postureGrade = 'B+';
  if (riskReductionPct >= 80) postureGrade = 'A+';
  else if (riskReductionPct >= 70) postureGrade = 'A';
  else if (riskReductionPct >= 55) postureGrade = 'B';
  else postureGrade = 'C';

  const toggleCloud = (cloud: string) => {
    setInputs((prev) => ({
      ...prev,
      cloudProviders: prev.cloudProviders.includes(cloud)
        ? prev.cloudProviders.filter((c) => c !== cloud)
        : [...prev.cloudProviders, cloud],
    }));
  };

  const toggleFramework = (fw: string) => {
    setInputs((prev) => ({
      ...prev,
      frameworks: prev.frameworks.includes(fw)
        ? prev.frameworks.filter((f) => f !== fw)
        : [...prev.frameworks, fw],
    }));
  };

  return (
    <section id="risk-calculator" className="border-t border-slate-800 bg-[#060a13] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <Calculator className="h-3.5 w-3.5" />
            <span>ENTERPRISE RISK & COMPLIANCE ROI MODEL</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
            Calculate Your Cyber Risk & Compliance ROI
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Model your financial blast radius, audit preparation hours eliminated, and cyber insurance discounts unlocked by switching to autonomous continuous mitigation.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Config Panel */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-800 bg-[#080d19] p-6 lg:p-8 space-y-6">
            <h3 className="text-base font-bold text-white font-sans border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Organization Profile & Controls</span>
              <span className="text-xs font-mono text-slate-500">Interactive Model</span>
            </h3>

            {/* Industry & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Industry Sector:</label>
                <select
                  value={inputs.industry}
                  onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                >
                  <option value="FinTech / Banking">FinTech & Banking</option>
                  <option value="Healthcare & MedTech">Healthcare & MedTech</option>
                  <option value="Enterprise SaaS">Enterprise B2B SaaS</option>
                  <option value="Defense & Aerospace">Defense & Government</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Company Size:</label>
                <select
                  value={inputs.companySize}
                  onChange={(e) => setInputs({ ...inputs, companySize: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
                >
                  <option value="1 - 25 Employees">1 - 25 Employees</option>
                  <option value="25 - 100 Employees">25 - 100 Employees</option>
                  <option value="100 - 500 Employees">100 - 500 Employees</option>
                  <option value="500+ Employees">500+ Employees</option>
                </select>
              </div>
            </div>

            {/* Cloud Environments */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Cloud Footprint:</label>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'GCP', 'Azure', 'Kubernetes', 'On-Premises'].map((cloud) => (
                  <button
                    key={cloud}
                    onClick={() => toggleCloud(cloud)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      inputs.cloudProviders.includes(cloud)
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cloud}
                  </button>
                ))}
              </div>
            </div>

            {/* Framework Targets */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Target Frameworks:</label>
              <div className="flex flex-wrap gap-2">
                {['SOC 2 Type II', 'ISO/IEC 27001:2022', 'HIPAA', 'GDPR', 'NIST CSF 2.0', 'PCI-DSS'].map((fw) => (
                  <button
                    key={fw}
                    onClick={() => toggleFramework(fw)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      inputs.frameworks.includes(fw)
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {fw}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing Security Control Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Current Controls Posture:
              </span>

              <label className="flex items-center justify-between rounded-xl bg-slate-900/60 p-3 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white font-sans block">Zero Trust MFA & FIDO2 Hardware Keys</span>
                  <span className="text-[11px] text-slate-400">Strict phishing-resistant authentication</span>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasMFAEverywhere}
                  onChange={(e) => setInputs({ ...inputs, hasMFAEverywhere: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl bg-slate-900/60 p-3 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white font-sans block">Air-Gapped Immutable WORM Backups</span>
                  <span className="text-[11px] text-slate-400">Cannot be encrypted by ransomware strains</span>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasImmutableBackups}
                  onChange={(e) => setInputs({ ...inputs, hasImmutableBackups: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl bg-slate-900/60 p-3 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white font-sans block">Autonomous Sub-Second Mitigation Engine</span>
                  <span className="text-[11px] text-slate-400">Instant quarantine without waiting for on-call SOC</span>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasAutomatedSIEM}
                  onChange={(e) => setInputs({ ...inputs, hasAutomatedSIEM: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl bg-slate-900/60 p-3 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white font-sans block">Continuous Cryptographic Audit Harvester</span>
                  <span className="text-[11px] text-slate-400">No manual screenshot collecting or spreadsheet audits</span>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasContinuousAudits}
                  onChange={(e) => setInputs({ ...inputs, hasContinuousAudits: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* Right Results & ROI Projection */}
          <div className="lg:col-span-6 rounded-3xl border border-cyan-900/60 bg-[#090f1e] p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    ESTIMATED RISK POSTURE & IMPACT
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans mt-0.5">
                    CyberSurety Value Assessment
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-slate-500">POSTURE GRADE</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {postureGrade}
                  </span>
                </div>
              </div>

              {/* Metrics Display */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Exposure Reduction */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-cyan-400" />
                    Max Breach Exposure:
                  </span>
                  <div className="mt-2">
                    <span className="text-xs text-slate-500 line-through font-mono">
                      ${(potentialExposure / 1000000).toFixed(2)}M
                    </span>
                    <div className="text-2xl font-bold text-white font-mono">
                      ${(residualRisk / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <span className="mt-1 block font-mono text-xs text-emerald-400 font-semibold">
                    -{riskReductionPct}% Financial Blast Radius
                  </span>
                </div>

                {/* Audit Hours Saved */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-400" />
                    Audit Effort Eliminated:
                  </span>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">
                    {hoursSavedPerYear} <span className="text-xs font-normal text-slate-400">hrs/yr</span>
                  </div>
                  <span className="mt-1 block font-mono text-xs text-cyan-400 font-semibold">
                    ~$140k/yr in Saved Engineering Hours
                  </span>
                </div>

                {/* Insurance Discount */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
                    Cyber Insurance Discount:
                  </span>
                  <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
                    -{insuranceSavings}%
                  </div>
                  <span className="mt-1 block font-mono text-xs text-slate-400">
                    Carrier Verified Controls Attestation
                  </span>
                </div>

                {/* Containment Speed */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                    Mean Containment Time:
                  </span>
                  <div className="mt-2 text-2xl font-bold text-cyan-300 font-mono">
                    &lt; 300<span className="text-xs font-normal text-slate-400 ml-1">ms</span>
                  </div>
                  <span className="mt-1 block font-mono text-xs text-slate-400">
                    Autonomous eBPF Execution
                  </span>
                </div>
              </div>

              {/* Customized Next-Step Recommendations */}
              <div className="mt-6 rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-4 text-xs">
                <span className="font-mono text-cyan-400 block mb-2 font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> High-Priority Posture Recommendations:
                </span>
                <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  {!inputs.hasAutomatedSIEM && (
                    <li className="flex items-start gap-1.5">
                      <span className="text-cyan-400">&bull;</span>
                      Deploy autonomous eBPF kernel tripwires to eliminate manual alert fatigue.
                    </li>
                  )}
                  {!inputs.hasContinuousAudits && (
                    <li className="flex items-start gap-1.5">
                      <span className="text-cyan-400">&bull;</span>
                      Activate automated evidence collection to cut audit preparation by 80%.
                    </li>
                  )}
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400">&bull;</span>
                    Map evidence crosswalk across {inputs.frameworks.join(', ')} without duplicate audits.
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenAuditModal}
                id="calculator-audit-cta"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3.5 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>Request Custom Enterprise Risk Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
