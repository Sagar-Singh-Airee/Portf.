import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal, Sparkles, Video, FileText } from 'lucide-react';
import { Exhibition } from '../types';
import { EXHIBITIONS } from '../data/portfolioData';

interface ExhibitionsSectionProps {
  onSelectExhibition: (ex: Exhibition) => void;
  onHoverCard?: (label: string) => void;
  onLeaveCard?: () => void;
}

export const ExhibitionsSection: React.FC<ExhibitionsSectionProps> = ({
  onSelectExhibition,
  onHoverCard,
  onLeaveCard,
}) => {
  return (
    <section
      id="exhibitions"
      aria-label="Conferences, Talks, and Keynote Schedule"
      className="relative bg-[#F8F7F3] pt-16 pb-28 sm:pb-36 border-t border-[#D9D9D5] overflow-hidden"
    >
      {/* 1. Oversized Marquee Typography: "keynotes . keynotes ." */}
      <div className="relative w-full overflow-hidden select-none pb-8">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-black text-[clamp(3.5rem,8.5vw,9.5rem)] tracking-[-0.06em] text-[#050505] mr-8 inline-block leading-none"
            >
              keynotes <span className="text-[#FFB52E]">.</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        {/* Editorial Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#050505] pb-4 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#050505]/60">
            [ CONFERENCES, KEYNOTES & TECHNICAL PAPERS ]
          </span>
          <span className="text-xs font-mono text-[#050505]/70 mt-1 sm:mt-0">
            RECORDINGS, SYSTEM SLIDES & ATTENDEE REGISTRATION
          </span>
        </div>

        {/* Talk Rows */}
        <div className="divide-y divide-[#D9D9D5]">
          {EXHIBITIONS.map((talk, idx) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group py-8 sm:py-10 transition-colors duration-300 hover:bg-black/[0.02] px-2 sm:px-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              onMouseEnter={() => onHoverCard?.('TALK')}
              onMouseLeave={onLeaveCard}
            >
              {/* Left Column: Number + Title */}
              <div className="flex items-baseline gap-6 sm:gap-10 md:w-5/12">
                <span className="font-mono text-sm sm:text-base font-semibold text-[#050505]/50 w-6">
                  {talk.number}
                </span>
                <div className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#050505] tracking-tight leading-tight italic">
                    {talk.title}
                  </h3>
                  <span className="text-xs font-mono text-[#050505]/60 block mt-1">
                    Track: {talk.curator}
                  </span>
                </div>
              </div>

              {/* Middle Column: Venue, City, Date */}
              <div className="md:w-4/12 pl-12 sm:pl-16 md:pl-0 flex flex-col justify-center">
                <span className="text-sm font-semibold text-[#050505] tracking-tight">
                  {talk.venue}
                </span>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[#050505]/65">
                  <span>{talk.location}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#050505]">{talk.date}</span>
                </div>
              </div>

              {/* Right Column: Action Button */}
              <div className="md:w-3/12 flex items-center md:justify-end pl-12 sm:pl-16 md:pl-0">
                <button
                  onClick={() => onSelectExhibition(talk)}
                  id={`exhibition-ticket-btn-${talk.number}`}
                  aria-label={`View talk details for ${talk.title}`}
                  className="px-6 py-2.5 rounded-full border border-[#050505] text-xs font-medium text-[#050505] group-hover:bg-[#050505] group-hover:text-[#F8F7F3] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-2xs group-hover:shadow-md"
                >
                  <span>Session Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#D9D9D5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB52E] animate-ping" />
            <span className="text-xs font-mono text-[#050505]">
              SLIDES, REPRODUCIBLE DOCKER/K8S MANIFESTS & BENCHMARK REPOS OPENLY AVAILABLE
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#050505] hover:text-[#FFB52E] flex items-center gap-1 transition-colors"
          >
            Invite Sagar as Keynote Speaker →
          </a>
        </div>
      </div>
    </section>
  );
};

