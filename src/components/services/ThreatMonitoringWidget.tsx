import React, { useState } from 'react';
import { Activity, Shield, Terminal, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Filter, Search } from 'lucide-react';

interface SensorNode {
  id: string;
  name: string;
  type: 'eBPF Kernel Probe' | 'CloudTrail Ingest' | 'Kubernetes CNI' | 'Okta Identity Hook';
  environment: 'AWS Prod-East' | 'GCP Cluster-1' | 'Azure VNet' | 'Corporate IdP';
  eps: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'FILTERING';
  latency: string;
  lastAnomaly: string;
}

const INITIAL_NODES: SensorNode[] = [
  { id: 'sn-01', name: 'ebpf-us-east-worker-4', type: 'eBPF Kernel Probe', environment: 'AWS Prod-East', eps: 48200, status: 'OPTIMAL', latency: '0.4ms', lastAnomaly: '34m ago (Syscall anomaly suppressed)' },
  { id: 'sn-02', name: 'k8s-cni-ingress-gateway', type: 'Kubernetes CNI', environment: 'GCP Cluster-1', eps: 64100, status: 'OPTIMAL', latency: '0.6ms', lastAnomaly: 'None in 72h' },
  { id: 'sn-03', name: 'cloudtrail-stream-aggregator', type: 'CloudTrail Ingest', environment: 'AWS Prod-East', eps: 91400, status: 'OPTIMAL', latency: '1.2ms', lastAnomaly: '2h ago (Unusual STS token request)' },
  { id: 'sn-04', name: 'okta-idp-auth-sentinel', type: 'Okta Identity Hook', environment: 'Corporate IdP', eps: 12500, status: 'OPTIMAL', latency: '2.1ms', lastAnomaly: '14m ago (Geo-velocity tripwire)' },
  { id: 'sn-05', name: 'azure-vnet-flow-probe', type: 'eBPF Kernel Probe', environment: 'Azure VNet', eps: 38700, status: 'OPTIMAL', latency: '0.5ms', lastAnomaly: 'None in 48h' },
];

interface LogEvent {
  time: string;
  source: string;
  event: string;
  mitreTag: string;
  severity: 'NORMAL' | 'SUSPICIOUS' | 'NEUTRALIZED';
}

const INITIAL_EVENTS: LogEvent[] = [
  { time: '10:34:12.894', source: 'ebpf-us-east-worker-4', event: 'Intercepted unauthorized ptrace() attachment on nginx worker', mitreTag: 'T1055.008', severity: 'NEUTRALIZED' },
  { time: '10:34:10.421', source: 'cloudtrail-stream-aggregator', event: 'sts:AssumeRole with MFA verification confirmed (Service Principal)', mitreTag: 'T1078', severity: 'NORMAL' },
  { time: '10:34:07.112', source: 'k8s-cni-ingress-gateway', event: 'High entropy DNS query detected: 48f9a2.ns1.malicious-cdn.top', mitreTag: 'T1048', severity: 'NEUTRALIZED' },
  { time: '10:34:02.905', source: 'okta-idp-auth-sentinel', event: 'Privileged admin access to AWS Console from verified YubiKey', mitreTag: 'T1078', severity: 'NORMAL' },
  { time: '10:33:58.201', source: 'azure-vnet-flow-probe', event: 'SMB port 445 sweep from untrusted subnet quarantined in 140ms', mitreTag: 'T1021.002', severity: 'NEUTRALIZED' },
];

export const ThreatMonitoringWidget: React.FC = () => {
  const [nodes] = useState<SensorNode[]>(INITIAL_NODES);
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<'ALL' | 'NEUTRALIZED' | 'NORMAL'>('ALL');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  const totalEPS = nodes.reduce((acc, curr) => acc + curr.eps, 0);

  const filteredEvents = INITIAL_EVENTS.filter(evt => {
    if (filterType !== 'ALL' && evt.severity !== filterType) return false;
    if (selectedSource !== 'ALL' && evt.source !== selectedSource) return false;
    return true;
  });

  const handleTriggerProbeTest = () => {
    setIsSimulating(true);
    setSimulatedAlert('Simulating adversarial memory injection on node: ebpf-us-east-worker-4...');
    setTimeout(() => {
      setSimulatedAlert('eBPF tripwire triggered in 18ms. Malicious syscall SIGKILL applied. Zero lateral egress.');
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Live Sensor Fleet & eBPF Telemetry Console
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time kernel telemetry, multi-cloud ingestion status, and sub-second signal correlation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg bg-slate-900 px-3 py-1.5 border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">Total Telemetry: </span>
            <span className="font-bold text-cyan-400">{(totalEPS / 1000).toFixed(1)}k EPS</span>
          </div>
          <button
            onClick={handleTriggerProbeTest}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isSimulating ? 'Testing Kernel Probe...' : 'Simulate Adversary Injection'}</span>
          </button>
        </div>
      </div>

      {simulatedAlert && (
        <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold font-mono text-emerald-200">eBPF Telemetry Intercept Confirmed: </span>
            <span>{simulatedAlert}</span>
          </div>
        </div>
      )}

      {/* Sensor Nodes Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map(node => (
          <div
            key={node.id}
            onClick={() => setSelectedSource(selectedSource === node.name ? 'ALL' : node.name)}
            className={`cursor-pointer rounded-xl border p-3 transition-all ${
              selectedSource === node.name
                ? 'border-cyan-500 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-slate-200">{node.name}</span>
              <span className="rounded bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                {node.status}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{node.type}</span>
              <span className="text-cyan-400 font-semibold">{node.eps.toLocaleString()} EPS</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{node.environment}</span>
              <span>Latency: {node.latency}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream Terminal */}
      <div className="mt-5 rounded-xl border border-slate-800 bg-[#05080f] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-xs font-semibold text-slate-300">
              Live Ingest Stream ({filteredEvents.length} Events Displayed)
            </span>
            {selectedSource !== 'ALL' && (
              <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] text-cyan-300 border border-cyan-800/50">
                Filtered: {selectedSource}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                filterType === 'ALL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('NEUTRALIZED')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                filterType === 'NEUTRALIZED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Neutralized (Threats)
            </button>
            <button
              onClick={() => setFilterType('NORMAL')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                filterType === 'NORMAL' ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Normal Logs
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-2 font-mono text-xs max-h-56 overflow-y-auto">
          {filteredEvents.map((evt, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-slate-500">{evt.time}</span>
                <span className="text-[11px] text-cyan-400 truncate max-w-[140px]">{evt.source}</span>
                <span className="text-slate-200 text-xs">{evt.event}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                  {evt.mitreTag}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    evt.severity === 'NEUTRALIZED'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  {evt.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
