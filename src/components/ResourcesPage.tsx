import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Briefcase, 
  Shield, 
  Filter, 
  ArrowRight, 
  Clock, 
  Tag, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  Download
} from 'lucide-react';
import { RESOURCE_CATEGORIES, INITIAL_RESOURCES } from '../data/resourcesData';
import { ResourceCategory, ResourceItem } from '../types';
import { ResourceSubpage } from './ResourceSubpage';

interface ResourcesPageProps {
  activeResourceId?: string | null;
  onNavigateHome: () => void;
  onSelectResource: (resourceId: string) => void;
  onBackToResources: () => void;
  onOpenAuditModal: () => void;
  onNavigateToContact: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  activeResourceId,
  onNavigateHome,
  onSelectResource,
  onBackToResources,
  onOpenAuditModal,
  onNavigateToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest'>('featured');

  // Check if an active resource subpage should be displayed
  const currentResource = useMemo(() => {
    if (!activeResourceId) return null;
    return INITIAL_RESOURCES.find(
      (r) => r.id === activeResourceId || r.slug === activeResourceId
    ) || null;
  }, [activeResourceId]);

  if (currentResource) {
    return (
      <ResourceSubpage
        resource={currentResource}
        onBackToResources={onBackToResources}
        onSelectResource={onSelectResource}
        onOpenAuditModal={onOpenAuditModal}
        onNavigateToContact={onNavigateToContact}
      />
    );
  }

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

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    INITIAL_RESOURCES.forEach((r) => r.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    return INITIAL_RESOURCES.filter((res) => {
      // Category filter
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !res.tags.includes(selectedTag)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSubtitle = res.subtitle.toLowerCase().includes(q);
        const matchesThreat = res.threatFocus.toLowerCase().includes(q);
        const matchesMitigation = res.mitigationFocus.toLowerCase().includes(q);
        const matchesAuthor = res.author.name.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesThreat || matchesMitigation || matchesAuthor;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={onNavigateHome}
            className="hover:text-cyan-400 transition-colors"
          >
            CyberSurety
          </button>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Resources & Threat Intelligence Library</span>
        </div>

        {/* Header Hero */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>THREAT INTELLIGENCE & MITIGATION ARCHITECTURES</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Cybersecurity <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Resources & Research</span>
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-300 leading-relaxed">
                Explore in-depth technical blogs, empirical industry benchmarks, adversary simulation webinars, and customer case studies. 
                Every piece is architected around actionable threat intelligence and concrete, automated mitigation strategies.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onNavigateToContact}
                className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all"
              >
                Contact Research Authors
              </button>
              <button
                onClick={onOpenAuditModal}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Schedule Technical Audit
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Categories Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {RESOURCE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedTag(null);
              }}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedCategory === cat.id
                  ? 'border-cyan-500 bg-cyan-950/30 shadow-xl shadow-cyan-500/10'
                  : 'border-slate-800 bg-[#080c14]/90 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
                  {getCategoryIcon(cat.id)}
                </span>
                <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700/50">
                  {cat.count} Published
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Search & Filter Controls Toolbar */}
        <div className="rounded-2xl border border-slate-800 bg-[#080c14]/90 p-4 mb-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics by threat vector, technique, or author..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTag(null);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                All ({INITIAL_RESOURCES.length})
              </button>
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedTag(null);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Most Recent</option>
              </select>
            </div>
          </div>

          {/* Tag Filter Strip */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
              <Tag className="h-3 w-3" />
              <span>Filter Topics:</span>
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="rounded bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 text-[10px] font-mono text-rose-300 hover:bg-rose-900/80"
              >
                Clear #{selectedTag} ×
              </button>
            )}
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            Showing <strong className="text-cyan-400">{filteredResources.length}</strong> resources in repository
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedTag) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#080c14] p-12 text-center">
            <Shield className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No matching resources found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search keywords or clearing active category and tag filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#080c14] p-6 shadow-xl hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-300">
                        {getCategoryIcon(res.category)}
                        <span>{res.categoryLabel}</span>
                      </span>
                      {res.featured && (
                        <span className="rounded bg-amber-950/80 px-2 py-0.5 text-[9px] font-mono font-semibold text-amber-300 border border-amber-800/40">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {res.readTimeOrDuration}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 
                    onClick={() => onSelectResource(res.id)}
                    className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                  >
                    {res.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {res.subtitle}
                  </p>

                  {/* Threat & Mitigation Focus Indicators */}
                  <div className="mt-4 space-y-2 text-[11px]">
                    <div className="rounded-lg bg-rose-950/20 border border-rose-900/30 p-2.5 text-rose-300">
                      <div className="flex items-start gap-1.5">
                        <Target className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-rose-400 font-mono block text-[10px] uppercase">Threat Intelligence Focus:</strong>
                          <span className="line-clamp-2">{res.threatFocus.replace('Threat Intelligence: ', '')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-2.5 text-emerald-300">
                      <div className="flex items-start gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-400 font-mono block text-[10px] uppercase">Mitigation Strategy:</strong>
                          <span className="line-clamp-2">{res.mitigationFocus.replace('Mitigation Strategy: ', '')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tag preview */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {res.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-slate-200 font-medium block">{res.author.name}</span>
                    <span className="text-slate-500 text-[10px]">{res.publishedDate}</span>
                  </div>

                  <button
                    onClick={() => onSelectResource(res.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950 hover:border-cyan-500/40 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 transition-all"
                  >
                    <span>Read Research Subpage</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research Partnership CTA Banner */}
        <div className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-950/30 via-[#080c14] to-blue-950/30 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">
              Collaborate on Threat Research or Commission an Empirical Report
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Our Threat Intelligence Labs regularly partner with Fortune 500 CISOs, academic cryptography teams, and federal regulators to publish zero-day exploit disclosures and defensive architectures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onNavigateToContact}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
              >
                <span>Contact CyberSurety Labs</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenAuditModal}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Schedule Infrastructure Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
