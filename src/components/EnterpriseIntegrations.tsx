import React from 'react';
import { 
  Cloud, 
  ShieldCheck, 
  Key, 
  Activity, 
  Cpu, 
  GitBranch, 
  Layers, 
  BellRing,
  CheckCircle2,
  Lock,
  Boxes
} from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/mockData';

export const EnterpriseIntegrations: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="h-5 w-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
      case 'Key':
        return <Key className="h-5 w-5 text-amber-400" />;
      case 'Activity':
        return <Activity className="h-5 w-5 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-purple-400" />;
      case 'GitBranch':
        return <GitBranch className="h-5 w-5 text-rose-400" />;
      case 'Layers':
        return <Layers className="h-5 w-5 text-indigo-400" />;
      case 'BellRing':
        return <BellRing className="h-5 w-5 text-sky-400" />;
      default:
        return <Boxes className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <section className="border-t border-slate-800 bg-[#070b13] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3.5 py-1 text-xs font-mono text-slate-400">
            <span>ZERO-AGENT & eBPF NATIVE ECOSYSTEM</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl font-sans">
            Seamless Multi-Cloud & Security Stack Connectors
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Connect in under 5 minutes with read-only IAM roles, eBPF telemetry hooks, and webhooks. No heavy agents or kernel instability.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {INTEGRATIONS_LIST.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#090e18] p-5 text-center transition-all hover:border-slate-700 hover:bg-slate-900/70 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 group-hover:shadow-lg group-hover:shadow-cyan-500/10 transition-all">
                {getIcon(item.icon)}
              </div>
              <h4 className="mt-3 text-xs font-bold text-white font-sans">{item.name}</h4>
              <span className="mt-1 text-[10px] font-mono text-slate-500">{item.category}</span>
              <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                <CheckCircle2 className="h-2.5 w-2.5" /> Ready
              </span>
            </div>
          ))}
        </div>

        {/* Security certification reassurance banner */}
        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-300">
              Zero-privilege architecture: CyberSurety operates via least-privilege telemetry connectors with zero access to your production customer secrets or decrypted PII payloads.
            </span>
          </div>
          <span className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-slate-300 shrink-0">
            SOC 2 Type II Certified Pipeline
          </span>
        </div>
      </div>
    </section>
  );
};
