import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  Briefcase, 
  Shield, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  ChevronRight, 
  Play, 
  Target, 
  Zap, 
  Terminal, 
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ResourceItem } from '../types';
import { INITIAL_RESOURCES } from '../data/resourcesData';

interface ResourceSubpageProps {
  resource: ResourceItem;
  onBackToResources: () => void;
  onSelectResource: (resourceId: string) => void;
  onOpenAuditModal: () => void;
  onNavigateToContact: () => void;
}

export const ResourceSubpage: React.FC<ResourceSubpageProps> = ({
  resource,
  onBackToResources,
  onSelectResource,
  onOpenAuditModal,
  onNavigateToContact,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isPlayingWebinar, setIsPlayingWebinar] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blog':
        return <BookOpen className="h-4 w-4 text-cyan-400" />;
      case 'report':
        return <FileText className="h-4 w-4 text-indigo-400" />;
      case 'webinar':
        return <Video className="h-4 w-4 text-emerald-400" />;
      case 'case-study':
        return <Briefcase className="h-4 w-4 text-amber-400" />;
      default:
        return <Shield className="h-4 w-4 text-cyan-400" />;
    }
  };

  const handleCopySnippet = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => {
      setCopiedSnippetIndex(null);
    }, 2500);
  };

  const handleSimulatedDownload = (assetName: string) => {
    setDownloadSuccess(assetName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Find related resources (excluding current one)
  const relatedResources = INITIAL_RESOURCES
    .filter((r) => r.id !== resource.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={onBackToResources}
              className="group flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:-translate-x-1" />
              <span>Back to Resources Library</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-slate-500 hidden sm:inline">Research & Intelligence</span>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-cyan-400 font-semibold hidden md:inline truncate max-w-[200px]">
              {resource.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              title="Copy link to this research paper"
            >
              {shareSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Share Subpage</span>
                </>
              )}
            </button>

            {resource.downloadableAssets && resource.downloadableAssets.length > 0 && (
              <button
                onClick={() => handleSimulatedDownload(resource.downloadableAssets![0])}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-800/60 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-mono text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-cyan-400" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Download notification banner */}
        {downloadSuccess && (
          <div className="mb-6 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                Simulated verified download initiated: <strong>{downloadSuccess}</strong> (SHA-256 validated).
              </span>
            </div>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider">Ready for Offline Review</span>
          </div>
        )}

        {/* Header Content */}
        <article className="space-y-10">
          <header className="space-y-4">
            {/* Meta tags line */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-mono font-semibold text-cyan-300">
                {getCategoryIcon(resource.category)}
                <span>{resource.categoryLabel}</span>
              </span>

              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>{resource.readTimeOrDuration}</span>
              </span>

              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>{resource.publishedDate}</span>
              </span>

              {resource.featured && (
                <span className="rounded bg-amber-950/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-amber-300 border border-amber-800/50">
                  FEATURED RESEARCH
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
              {resource.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {resource.subtitle}
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-slate-950 shadow-md shadow-cyan-500/20">
                  {resource.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-sans">{resource.author.name}</div>
                  <div className="text-xs font-mono text-cyan-400">{resource.author.role}</div>
                </div>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Threat Intelligence Vector vs Prescribed Mitigation Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-5 shadow-lg shadow-rose-950/10">
              <div className="flex items-center gap-2 text-rose-400 mb-2">
                <Target className="h-4 w-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Target Threat Intelligence Vector
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {resource.threatFocus}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-5 shadow-lg shadow-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Prescribed Mitigation Strategy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {resource.mitigationFocus}
              </p>
            </div>
          </div>

          {/* Executive Abstract */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Executive Abstract & Empirical Research Scope</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {resource.abstract}
            </p>
          </div>

          {/* Case Study Metrics (if applicable) */}
          {resource.caseStudyMetrics && resource.caseStudyMetrics.length > 0 && (
            <div className="rounded-2xl border border-amber-900/40 bg-amber-950/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Validated Customer Results & Quantitative ROI Benchmarks
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {resource.caseStudyMetrics.map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-[#080c14] p-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">{item.metric}</span>
                    <strong className="text-lg font-mono font-bold text-cyan-300 block mt-1">{item.beforeAfter}</strong>
                    <span className="text-xs text-slate-400 block mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Webinar Simulation Player (if applicable) */}
          {resource.webinarMetadata && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    On-Demand Technical Briefing & Architecture Session
                  </h3>
                </div>
                <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-xs font-mono text-emerald-300 border border-emerald-800/60">
                  {resource.webinarMetadata.status}
                </span>
              </div>

              {isPlayingWebinar ? (
                <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-8 text-center animate-fadeIn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-blue-950/20 pointer-events-none" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mb-3 animate-pulse">
                    <Video className="h-7 w-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Streaming Video Session</h4>
                  <p className="text-xs text-slate-400 font-mono max-w-md mb-5">
                    Host: {resource.webinarMetadata.speaker} • Autonomous Defense Mechanics & SOC Walkthrough
                  </p>
                  <button
                    onClick={() => setIsPlayingWebinar(false)}
                    className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Pause Playback
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsPlayingWebinar(true)}
                  className="group relative aspect-video w-full cursor-pointer rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-8 text-center hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-2xl shadow-cyan-500/40 group-hover:scale-110 transition-transform mb-4">
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-semibold text-white">Click to Watch Full On-Demand Briefing</span>
                  <span className="text-xs font-mono text-slate-400 mt-1">Duration: {resource.webinarMetadata.duration}</span>
                </div>
              )}

              {/* Agenda */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Session Agenda Timeline:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs text-slate-300">
                  {resource.webinarMetadata.agenda.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                      <ChevronRight className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Full Detailed Technical Content Sections */}
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base sm:text-lg font-mono font-bold uppercase tracking-wider text-white">
                Comprehensive Technical Content Outline & Safeguards
              </h2>
            </div>

            {resource.contentOutline.map((sec, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-800/90 bg-[#080c14] p-6 sm:p-7 space-y-4 shadow-xl"
              >
                <h3 className="text-base sm:text-lg font-bold text-cyan-300 font-sans">
                  {sec.sectionTitle}
                </h3>

                <ul className="space-y-2.5">
                  {sec.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Formatted Code / Playbook Reference Snippet */}
                {sec.codeOrSnippet && (
                  <div className="mt-4 rounded-xl bg-[#03060a] border border-slate-800 overflow-hidden font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between bg-slate-900/90 px-4 py-2 border-b border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Kernel Hook & Playbook Implementation</span>
                      </div>
                      <button
                        onClick={() => handleCopySnippet(sec.codeOrSnippet!, idx)}
                        className="flex items-center gap-1.5 rounded bg-slate-800 hover:bg-slate-700 px-2 py-1 text-[10px] text-slate-300 transition-colors"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-cyan-300/90 overflow-x-auto whitespace-pre leading-relaxed text-[11px] sm:text-xs">
                      {sec.codeOrSnippet}
                    </pre>
                  </div>
                )}

                {/* Prescribed Mitigation Checklist */}
                {sec.mitigationChecklist && (
                  <div className="mt-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 p-4 space-y-2.5">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      Enforced Mitigation Implementation Checklist:
                    </span>
                    <div className="space-y-2">
                      {sec.mitigationChecklist.map((item, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="rounded-2xl border border-cyan-800/40 bg-gradient-to-br from-cyan-950/30 to-blue-950/20 p-6 sm:p-8">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-300 mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Key Takeaways & Enterprise Security Architecture Insights</span>
            </h3>
            <div className="space-y-3">
              {resource.keyTakeaways.map((takeaway, tIdx) => (
                <div key={tIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <div className="h-5 w-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 text-[11px] font-mono font-bold">
                    {tIdx + 1}
                  </div>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Assets */}
          {resource.downloadableAssets && resource.downloadableAssets.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Download className="h-4 w-4 text-cyan-400" />
                <span>Downloadable Research Artifacts & Whitepapers:</span>
              </h3>
              <div className="space-y-3">
                {resource.downloadableAssets.map((asset, aIdx) => (
                  <div
                    key={aIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-mono">{asset}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Cryptographically signed technical specification for security architects.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSimulatedDownload(asset)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read Next / Related Resources on Dedicated Subpages */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-sans">
                Explore More Intelligence Subpages
              </h3>
              <button
                onClick={onBackToResources}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                View all in library <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedResources.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectResource(rel.id)}
                  className="group cursor-pointer flex flex-col justify-between rounded-xl border border-slate-800 bg-[#080c14] p-5 hover:border-cyan-500/50 hover:bg-slate-900/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 text-[11px] font-mono text-slate-400">
                      <span className="text-cyan-400 font-semibold">{rel.categoryLabel}</span>
                      <span>{rel.readTimeOrDuration}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {rel.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span>Read Subpage</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-12 rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-950/30 via-[#080c14] to-blue-950/30 p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Need Tailored Defense Controls or Custom GRC Integration?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Connect directly with our research architects to benchmark your enterprise telemetry against MITRE ATT&CK or prepare for upcoming accreditation audits.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenAuditModal}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
                >
                  <span>Schedule Posture Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onNavigateToContact}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Contact CyberSurety Labs
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
