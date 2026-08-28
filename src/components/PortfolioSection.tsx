import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Filter } from 'lucide-react';
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

  const categories = ['ALL', 'ARCHITECTURE', 'CINEMA', 'EXPERIMENTAL', 'DIRECTION'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toUpperCase() === selectedCategory);

  return (
    <section
      id="portfolio"
      aria-label="Portfolio Selected Works"
      className="relative bg-[#F8F7F3] pt-24 pb-28 lg:pt-32 lg:pb-40 overflow-hidden"
    >
      {/* Background Section Ambient Track */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#D9D9D5] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB52E]" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#050505]/60">
                CURATED ARCHIVE 2024 — 2026
              </span>
            </div>
            <span className="text-sm text-[#050505]/70 font-light">
              Selected cinematography, spatial essays, and editorial commissions.
            </span>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#050505] text-[#F8F7F3]'
                    : 'bg-white/80 text-[#050505]/70 border border-[#D9D9D5] hover:border-[#050505] hover:text-[#050505]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Giant Oversized Typography "portfolio" Intersecting the Collage */}
        <div className="relative mb-6 select-none pointer-events-none">
          <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[10.5rem] tracking-[-0.07em] leading-[0.8] text-[#050505] text-center sm:text-left">
            portfolio
          </h2>
        </div>

        {/* Asymmetric Editorial Grid (Reference 6-Card Collage Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            const isYellowCard = Boolean(project.accentBg);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => onHoverCard?.('VIEW')}
                onMouseLeave={onLeaveCard}
                className="group relative cursor-pointer"
              >
                {/* Project Card Container with Rounded Squircle (matching reference rounded corners) */}
                <div
                  className={`relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden transition-all duration-500 shadow-[0_12px_35px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] ${
                    isYellowCard ? 'bg-[#FFB52E]' : 'bg-[#E5E5E1]'
                  }`}
                >
                  {/* Image container with subtle grayscale or warm accent */}
                  <div className="w-full h-full overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isYellowCard
                          ? 'object-cover brightness-100'
                          : 'grayscale group-hover:grayscale-0 transition-all'
                      }`}
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/75 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  </div>

                  {/* Corner Index Tag: "01", "02", etc. */}
                  <div className="absolute top-5 left-5 z-20">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight shadow-xs ${
                        isYellowCard
                          ? 'bg-[#050505] text-[#FFB52E]'
                          : 'bg-white/90 text-[#050505] backdrop-blur-xs'
                      }`}
                    >
                      {project.number}
                    </span>
                  </div>

                  {/* Top-Right Arrow Action */}
                  <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-9 h-9 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Metadata & Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-white/70">
                      <span className="uppercase">{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight group-hover:text-[#FFB52E] transition-colors">
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
        </div>

        {/* View All Projects / Colophon banner */}
        <div className="mt-16 pt-8 border-t border-[#D9D9D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#050505]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>TOTAL WORKS IN COLLECTION: 07 / 07 ARCHIVED</span>
          </div>
          <span className="text-[#050505]/80">
            ALL WORKS CAPTURED ON KODAK FILM EMULSIONS & MEDIUM FORMAT SENSORS
          </span>
        </div>
      </div>
    </section>
  );
};
