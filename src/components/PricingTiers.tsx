import React, { useState } from 'react';
import { Check, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface PricingTiersProps {
  onOpenAuditModal: () => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onOpenAuditModal }) => {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  return (
    <section id="pricing" className="border-t border-slate-800 bg-[#080c14] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            <span>TRANSPARENT ENTERPRISE PACKAGES</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
            Predictable SaaS Pricing for Scalable Security
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            No surprise log-ingestion fees or per-seat penalties. Scale telemetry and compliance seamlessly as your cloud infrastructure expands.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                !annualBilling ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                annualBilling ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-400/20 text-emerald-400 px-2 py-0.2 text-[10px] font-mono">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all ${
                  plan.popular
                    ? 'border-cyan-500/80 bg-[#091122] shadow-2xl shadow-cyan-500/10 lg:-translate-y-2'
                    : 'border-slate-800 bg-[#070b13]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-1 text-xs font-bold text-slate-950 shadow-md">
                    MOST POPULAR FOR ENTERPRISE
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-sans">{plan.name}</h3>
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                      {plan.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-mono">${price}</span>
                    <span className="text-xs text-slate-400 font-mono">/month</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    {annualBilling ? 'Billed annually ($' + (price * 12).toLocaleString() + '/yr)' : 'Billed monthly'}
                  </span>

                  <div className="mt-8 border-t border-slate-800/80 pt-6">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-4">
                      What's Included:
                    </span>
                    <ul className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                          <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80">
                  <button
                    onClick={onOpenAuditModal}
                    id={`pricing-btn-${plan.id}`}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                        : 'border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{plan.id === 'enterprise' ? 'Contact Enterprise Team' : 'Start 14-Day Free POC'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auditor Guarantee Callout */}
        <div className="mt-12 rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-6 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-bold font-sans">
            <Shield className="h-4 w-4" />
            <span>Auditor Pass Guarantee</span>
          </div>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Every CyberSurety customer receives our 100% Auditor Readiness Guarantee. If an accredited auditor finds a material deficiency in our continuous evidence collection, our principal GRC team assists directly until fully resolved at zero cost.
          </p>
        </div>
      </div>
    </section>
  );
};
