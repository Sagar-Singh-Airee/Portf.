import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Cpu, Activity, GitBranch } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
  onHoverCard?: (label: string) => void;
  onLeaveCard?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onHoverCard,
  onLeaveCard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'DISTRIBUTED', 'FULL-STACK', 'INFRASTRUCTURE', 'OPEN SOURCE'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toUpperCase() === selectedCategory);

  return (
    <section
      id="portfolio"
      aria-label="Engineered Systems & Portfolio"
      className="relative bg-[#F8F7F3] pt-24 pb-28 lg:pt-32 lg:pb-40 overflow-hidden"
    >
      {/* Background Section Ambient Track */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#D9D9D5] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB52E] animate-ping" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#050505]/60">
                SYSTEMS ARCHITECTURE & CODEBASE 2024 — 2026
              </span>
            </div>
            <span className="text-sm text-[#050505]/70 font-light">
              Selected distributed consensus engines, real-time architectures, and developer frameworks.
            </span>
          </div>

          {/* Interactive Category Filter Pills with Liquid Sliding Animation (layoutId) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE8E2] rounded-full border border-[#D9D9D5]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer ${
                    isSelected ? 'text-[#F8F7F3]' : 'text-[#050505]/70 hover:text-[#050505]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="absolute inset-0 bg-[#050505] rounded-full -z-10 shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Giant Oversized Typography "systems" Intersecting the Collage */}
        <div className="relative mb-6 select-none pointer-events-none">
          <h2 className="font-display font-black text-[clamp(3.5rem,13vw,10.5rem)] tracking-[-0.07em] leading-[0.8] text-[#050505] text-center sm:text-left">
            systems
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isYellowCard = Boolean(project.accentBg);
              const primaryMetric = project.metrics?.[0];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => onHoverCard?.('INSPECT')}
                  onMouseLeave={onLeaveCard}
                  className="group relative cursor-pointer"
                >
                  {/* Project Card Container with Rounded Squircle & Hover Elevation */}
                  <div
                    className={`relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden transition-all duration-500 shadow-[0_12px_35px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] group-hover:-translate-y-1.5 ${
                      isYellowCard ? 'bg-[#FFB52E]' : 'bg-[#E5E5E1]'
                    }`}
                  >
                    {/* Image container with grayscale or warm accent */}
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
                          isYellowCard
                            ? 'object-cover brightness-100'
                            : 'grayscale group-hover:grayscale-0 transition-all'
                        }`}
                        loading="lazy"
                      />

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                    </div>

                    {/* Corner Index Tag: "01", "02", etc. */}
                    <div className="absolute top-5 left-5 z-20">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight shadow-sm ${
                          isYellowCard
                            ? 'bg-[#050505] text-[#FFB52E]'
                            : 'bg-white/95 text-[#050505] backdrop-blur-xs'
                        }`}
                      >
                        {project.number}
                      </span>
                    </div>

                    {/* Top-Right Arrow Action */}
                    <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Live Metric Chip on Hover */}
                    {primaryMetric && (
                      <div className="absolute top-16 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/85 border border-white/20 backdrop-blur-md text-[10px] font-mono text-white shadow-md">
                          <Activity className="w-3 h-3 text-[#FFB52E] animate-pulse" />
                          <span className="text-[#FFB52E] font-bold">{primaryMetric.label}:</span>
                          <span>{primaryMetric.val}</span>
                        </div>
                      </div>
                    )}

                    {/* Tech stack badge in corner */}
                    {project.tools && project.tools.length > 0 && (
                      <div className="absolute top-25 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform -translate-y-1 group-hover:translate-y-0">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/70 text-white/90 backdrop-blur-xs border border-white/10">
                          {project.tools.slice(0, 2).join(' + ')}
                        </span>
                      </div>
                    )}

                    {/* Bottom Metadata & Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono text-white/70">
                        <span className="uppercase text-[#FFB52E] font-bold">{project.category}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight group-hover:text-[#FFB52E] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1 mt-1 font-light">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Systems / Colophon banner */}
        <div className="mt-16 pt-8 border-t border-[#D9D9D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#050505]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>TOTAL ARCHITECTURES: 07 / 07 BENCHMARKED</span>
          </div>
          <span className="text-[#050505]/80">
            ENGINEERED IN RUST, GO, TYPESCRIPT, KUBERNETES & LINUX KERNEL eBPF
          </span>
        </div>
      </div>
    </section>
  );
};
