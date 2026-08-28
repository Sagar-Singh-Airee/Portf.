import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Terminal, ArrowUpRight, Cpu, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { HERO_STATS, HERO_ASSETS } from '../data/portfolioData';
import { SystemMeshCanvas } from './SystemMeshCanvas';

interface HeroProps {
  onHoverCard?: (label: string) => void;
  onLeaveCard?: () => void;
  onOpenReel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onHoverCard,
  onLeaveCard,
  onOpenReel,
}) => {
  const socials = [
    { label: 'gh', name: 'GitHub', href: 'https://github.com' },
    { label: 'in', name: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'x', name: 'X / Twitter', href: 'https://x.com' },
    { label: 'cv', name: 'Resume', href: '#contact' },
  ];

  // 3D Perspective Tilt Physics for Featured Card
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.1, 0.35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeaveCard?.();
  };

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Interactive System Mesh Topology Background */}
      <SystemMeshCanvas density="normal" className="opacity-80" />

      {/* Ambient background light glow */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#FFB52E]/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Oversized Editorial Typography & Intro (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Creator Moniker / Eyebrow with Live Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9D9D5] text-xs font-mono text-[#050505] shadow-xs backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFB52E] animate-ping" />
                <span className="font-semibold">SAGAR SINGH</span>
                <span className="text-[#050505]/40">·</span>
                <span className="text-[#050505]/70">SYSTEMS ARCHITECT</span>
              </div>

              {/* Dynamic Telemetry Status */}
              <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#050505]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFB52E]" />
                <span>FAULT-TOLERANT CLUSTER READY</span>
              </div>
            </motion.div>

            {/* Giant Stacked Editorial Headline: "code poetry" */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative -ml-0.5 sm:-ml-1 select-none"
            >
              <h1 className="font-display font-black text-[clamp(3.5rem,10.2vw,8.75rem)] leading-[0.82] tracking-[-0.065em] text-[#050505]">
                code <br />
                <span className="relative inline-block">
                  poetry
                  <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-1.5 sm:h-2 bg-[#FFB52E] rounded-full transform scale-x-95 origin-left" />
                </span>
              </h1>
            </motion.div>

            {/* Sub-intro text with typographic contrast */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 text-base sm:text-lg text-[#050505]/80 font-normal leading-relaxed max-w-lg"
            >
              Designing resilient distributed consensus engines, low-latency stream processors,
              and developer tools where algorithmic precision meets{' '}
              <span className="font-serif-italic font-normal text-lg sm:text-xl text-[#050505] underline decoration-[#FFB52E] decoration-2 underline-offset-4">
                mechanical sympathy
              </span>
              .
            </motion.p>

            {/* Live Interactive Telemetry Sparkline Banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 p-3.5 rounded-2xl bg-white/70 border border-[#D9D9D5] backdrop-blur-xs max-w-lg shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#050505] text-[#FFB52E] flex items-center justify-center shadow-xs">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#050505]">CLUSTER TELEMETRY</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      OPTIMAL
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#050505]/60 block">
                    1.48M QPS · 0% DROPPED · P99: 1.74ms
                  </span>
                </div>
              </div>

              {/* Animated SVG Mini Sparkline Wave */}
              <div className="hidden sm:block w-28 h-8">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <path
                    d="M 0 15 Q 15 5, 30 18 T 60 12 T 90 20 L 100 14"
                    fill="none"
                    stroke="#FFB52E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <circle cx="100" cy="14" r="3" fill="#050505" />
                </svg>
              </div>
            </motion.div>

            {/* Minimalist Social Badges: ( gh ) ( in ) ( x ) ( cv ) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('#') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  id={`hero-social-${social.label}`}
                  className="px-3.5 py-1.5 rounded-full border border-[#050505]/25 text-xs font-mono text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] hover:border-[#050505] transition-all duration-200"
                  onMouseEnter={() => onHoverCard?.(`OPEN ${social.name.toUpperCase()}`)}
                  onMouseLeave={onLeaveCard}
                >
                  ( {social.label} )
                </a>
              ))}
            </motion.div>

            {/* Hero Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 pt-8 border-t border-[#D9D9D5]/80 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col group">
                  <span className="font-display font-black text-3xl sm:text-4xl lg:text-[2.6rem] text-[#050505] tracking-tight leading-none group-hover:text-[#FFB52E] transition-colors duration-300">
                    {stat.value}
                  </span>
                  <p className="mt-2 text-xs sm:text-xs font-medium text-[#050505]/65 leading-snug line-clamp-2">
                    {stat.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Image Composition with 3D Perspective Tilt & Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[420px] lg:max-w-[450px]"
              style={{ perspective: 1000 }}
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#FFB52E]/30 to-transparent rounded-[3.5rem] filter blur-xl -z-10 opacity-70" />

              {/* Main Featured Rounded Container with 3D Motion Physics */}
              <motion.div
                ref={cardRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                id="hero-feature-card"
                className="relative bg-[#FFB52E] rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-[3.25rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(255,181,46,0.4)] transition-shadow duration-300"
                onMouseEnter={() => onHoverCard?.('CONSOLE')}
              >
                {/* Handwritten Cursive Script Watermark Overlay ("Sagar Singh") */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
                  <span className="font-script text-white/95 text-4xl sm:text-5xl font-medium tracking-wide drop-shadow-sm">
                    Sagar Singh
                  </span>
                </div>

                {/* Specular Glare Overlay that shifts with cursor */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-20"
                  style={{ opacity: glareOpacity }}
                />

                {/* Developer Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={HERO_ASSETS.heroCreator}
                    alt="Software Engineer Sagar Singh in modern studio setting"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle warm amber gradient overlay at base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
                  {/* Elegant Handwritten Autograph Overlay */}
                  <div className="absolute bottom-3 left-4 select-none pointer-events-none z-10">
                    <span className="font-script text-white text-3xl sm:text-4xl font-medium tracking-wide drop-shadow-md">
                      Sagar Singh
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 1: Top-Right Terminal Console Trigger with Rotating Orbit */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-30">
                {/* Rotating SVG Coordinate Ring */}
                <div className="absolute -inset-2 pointer-events-none animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#FFB52E"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                  </svg>
                </div>

                <motion.button
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#050505] text-white flex items-center justify-center shadow-2xl cursor-pointer group relative z-10 border-2 border-white/20"
                  title="Open Interactive Architecture Terminal & Benchmark Engine"
                  onClick={onOpenReel}
                  id="hero-terminal-button"
                  aria-label="Open Interactive Terminal Console"
                  onMouseEnter={() => onHoverCard?.('TERMINAL')}
                  onMouseLeave={onLeaveCard}
                >
                  <Terminal className="w-5 h-5 text-[#FFB52E] group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>

              {/* Floating Elements 2, 3, 4: Left-middle stacked floating circles */}
              <div className="absolute -left-5 sm:-left-7 bottom-16 sm:bottom-20 z-30 flex flex-col gap-2.5">
                {/* Circle 1: Miniature CPU badge with float animation */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFB52E] border-2 border-[#F8F7F3] shadow-lg flex items-center justify-center cursor-pointer animate-float"
                  title="Distributed Systems & Low-Latency Engines"
                >
                  <Cpu className="w-5 h-5 text-[#050505]" />
                </motion.div>

                {/* Circle 2: Avatar portrait thumbnail */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#F8F7F3] shadow-lg bg-[#050505]"
                  title="Sagar Singh — Software Engineer"
                >
                  <img
                    src={HERO_ASSETS.heroCreator}
                    alt="Sagar Singh avatar thumbnail"
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>

                {/* Circle 3: Black circle with diagonal arrow ↗ linking to projects */}
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.95 }}
                  id="hero-arrow-cta"
                  aria-label="Explore Selected Engineering Projects"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#050505] text-white border-2 border-[#F8F7F3] shadow-xl flex items-center justify-center hover:bg-[#FFB52E] hover:text-[#050505] transition-colors cursor-pointer group"
                  onMouseEnter={() => onHoverCard?.('SYSTEMS')}
                  onMouseLeave={onLeaveCard}
                >
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>

              {/* Decorative mini pill tag: "DISTRIBUTED & CLOUD NATIVE" */}
              <div className="absolute -bottom-4 right-8 z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D9D9D5] text-[10px] font-mono text-[#050505] shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB52E]" />
                  <span className="font-bold">DISTRIBUTED & SYSTEMS</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
