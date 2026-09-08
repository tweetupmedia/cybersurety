import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Briefcase, 
  Shield, 
  ArrowRight, 
  Clock, 
  Tag, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { RESOURCE_CATEGORIES, INITIAL_RESOURCES } from '../data/resourcesData';
import { ResourceCategory, ResourceItem } from '../types';

interface ResourcesSectionProps {
  onNavigateToResourcesPage: () => void;
  onSelectResource: (resourceId: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  onNavigateToResourcesPage,
  onSelectResource,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');

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

  const filteredResources = selectedCategory === 'all'
    ? INITIAL_RESOURCES.slice(0, 4)
    : INITIAL_RESOURCES.filter(r => r.category === selectedCategory).slice(0, 4);

  return (
    <section id="resources-section" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-[#060a12] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-900/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>RESEARCH, INTELLIGENCE & THREAT MITIGATION</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              CyberSurety <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Resources Hub</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Battle-tested threat intelligence, empirical risk research, adversary simulations, and enterprise case studies focused on proactive containment.
            </p>
          </div>

          <button
            onClick={onNavigateToResourcesPage}
            id="view-all-resources-cta"
            className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/60 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400 w-fit"
          >
            <span>Explore All Resources & Research</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Categories Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {RESOURCE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedCategory === cat.id
                  ? 'border-cyan-500 bg-cyan-950/30 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-800 bg-[#080c14]/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
                  {getCategoryIcon(cat.id)}
                </span>
                <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                  {cat.count} Pieces
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-400 mr-2">Filter Category:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            All Categories ({INITIAL_RESOURCES.length})
          </button>
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-xl hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all"
            >
              <div>
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-300">
                    {getCategoryIcon(res.category)}
                    <span>{res.categoryLabel}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {res.readTimeOrDuration}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 
                  onClick={() => onSelectResource(res.id)}
                  className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                >
                  {res.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {res.subtitle}
                </p>

                {/* Threat & Mitigation Focus Mini-Boxes */}
                <div className="mt-4 space-y-2 text-[11px]">
                  <div className="rounded-lg bg-rose-950/20 border border-rose-900/30 p-2 text-rose-300 flex items-start gap-1.5">
                    <Target className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-mono">
                      <strong>Threat Intel:</strong> {res.threatFocus.replace('Threat Intelligence: ', '')}
                    </span>
                  </div>
                  <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-2 text-emerald-300 flex items-start gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-mono">
                      <strong>Mitigation:</strong> {res.mitigationFocus.replace('Mitigation Strategy: ', '')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  By {res.author.name}
                </span>

                <button
                  onClick={() => onSelectResource(res.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Read Research Subpage</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-gradient-to-r from-[#080c14] via-slate-900 to-[#080c14] p-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h4 className="text-base font-bold text-white mb-2">
              Looking for tailored adversary playbooks or compliance matrices?
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Browse our comprehensive multi-framework library or schedule a customized threat exposure analysis with our research architects.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onNavigateToResourcesPage}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md hover:bg-cyan-400 transition-all"
              >
                Access Full Resources Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
