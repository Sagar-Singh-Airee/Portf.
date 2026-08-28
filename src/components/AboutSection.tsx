import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Film, Compass, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import aboutImg from '../assets/images/about_creator_monochrome_1787888232716.jpg';

interface AboutSectionProps {
  onHoverCard?: (label: string) => void;
  onLeaveCard?: () => void;
  onOpenInquiry?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onHoverCard,
  onLeaveCard,
  onOpenInquiry,
}) => {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<'philosophy' | 'gear' | 'exhibits'>('philosophy');

  // Radial fan petals geometry for the background behind creator (matching reference photo)
  const petalCount = 14;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    // Spread in a fan across top half (from approx -60deg to +60deg or 180deg)
    const angle = -75 + (i * 150) / (petalCount - 1);
    return { angle, key: i };
  });

  return (
    <section
      id="about"
      aria-label="About Arturo Quintany"
      className="relative bg-[#050505] text-[#F8F7F3] pt-16 pb-28 sm:pb-36 overflow-hidden"
    >
      {/* 1. Oversized Marquee Typography: "about . about . about ." */}
      <div className="relative w-full overflow-hidden border-b border-white/10 select-none pb-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-[-0.05em] text-white/90 mr-8 inline-block leading-none"
            >
              about <span className="text-[#FFB52E]">.</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 lg:pt-24 relative">
        {/* Editorial Viewfinder Overlay Corner Marks (matching reference ⌖) */}
        <div className="absolute top-6 left-6 text-white/30 font-mono text-xl select-none hidden sm:block">
          <span className="inline-block animate-pulse">⌖</span>
        </div>
        <div className="absolute top-6 right-6 text-white/30 font-mono text-xl select-none hidden sm:block">
          <span className="inline-block animate-pulse">⌖</span>
        </div>
        <div className="absolute bottom-6 left-6 text-white/30 font-mono text-xl select-none hidden sm:block">
          <span>⌖</span>
        </div>
        <div className="absolute bottom-6 right-6 text-white/30 font-mono text-xl select-none hidden sm:block">
          <span>⌖</span>
        </div>

        {/* Viewfinder Center Crosshair Ticks (+) on side margins */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-white/20 font-mono text-2xl select-none hidden lg:block">
          +
        </div>
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-white/20 font-mono text-2xl select-none hidden lg:block">
          +
        </div>

        {/* Central Graphic Composition: Creator + Radial Petals */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Symmetrical Radial Fan / Petals Background behind creator */}
          <div className="relative w-full max-w-[540px] flex items-center justify-center">
            {/* SVG Petal Radial Array */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -top-12 sm:-top-16">
              <svg
                viewBox="-250 -250 500 500"
                className="w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] max-w-none opacity-85 select-none"
              >
                <g>
                  {petals.map(({ angle, key }) => (
                    <rect
                      key={key}
                      x="-14"
                      y="-210"
                      width="28"
                      height="130"
                      rx="14"
                      fill="#FFFFFF"
                      transform={`rotate(${angle})`}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  ))}
                  {/* Subtle inner concentric guide rings */}
                  <circle cx="0" cy="0" r="170" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Monochrome Creator Image (centered, holding camera straight to viewer) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-[280px] sm:w-[360px] md:w-[420px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              onMouseEnter={() => onHoverCard?.('CREATOR')}
              onMouseLeave={onLeaveCard}
            >
              <img
                src={aboutImg}
                alt="Arturo Quintany holding camera straight forward in dramatic monochrome"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
              
              {/* Subtle film frame indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/70">
                <span>ISO 400 · 35MM</span>
                <span className="text-[#FFB52E]">● REC</span>
              </div>
            </motion.div>
          </div>

          {/* Editorial Text Statement & Bio below/around image */}
          <div className="mt-14 max-w-3xl w-full text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              {/* Left Bio Column (7 cols) */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#FFB52E] font-mono mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB52E] animate-ping"></span>
                  DIRECTOR'S PERSPECTIVE
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  "I explore the space between visual storytelling, design and technology."
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
                  Operating between Madrid and Milan, my work investigates how temporal pacing,
                  physical camera mechanics, and spatial geometry shape human memory. Each frame is
                  conceived as an architectural balance between raw light and profound negative space.
                </p>
              </div>

              {/* Right Specs / Coordinates Column (5 cols) */}
              <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">LOCATION</span>
                    <span className="text-white">Madrid & Milan</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">FOCUS</span>
                    <span className="text-white">Cinema & Direction</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">MEDIUM</span>
                    <span className="text-white">16mm Film / 8K Digital</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">STATUS</span>
                    <span className="text-[#FFB52E] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFB52E]"></span>
                      Open for Q3/Q4
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={onOpenInquiry}
                    id="about-cta-commission"
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#FFB52E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Collaboration</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Philosophy / Disciplines Breakdown Tabs */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
                <Film className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Cinematic Rhythm
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Directing documentary sequences and high-fashion narratives with tactile 16mm analog texture.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
                <Compass className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Architectural Rigor
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Capturing monumental spatial forms, daylight gradients, and pure geometric balance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
                <Award className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Curated Exhibitions
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Designing multi-channel spatial gallery projections for international biennales and cultural archives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
