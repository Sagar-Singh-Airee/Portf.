import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Layers, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { HERO_ASSETS } from '../data/portfolioData';
import { ConsensusSimulator } from './ConsensusSimulator';

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
  // Radial fan petals geometry for the background behind developer
  const petalCount = 14;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = -75 + (i * 150) / (petalCount - 1);
    return { angle, key: i };
  });

  return (
    <section
      id="about"
      aria-label="About Sagar Singh"
      className="relative bg-[#050505] text-[#F8F7F3] pt-16 pb-28 sm:pb-36 overflow-hidden"
    >
      {/* 1. Oversized Marquee Typography: "systems . systems . systems ." */}
      <div className="relative w-full overflow-hidden border-b border-white/10 select-none pb-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-black text-[clamp(3.5rem,8.5vw,9rem)] tracking-[-0.05em] text-white/90 mr-8 inline-block leading-none"
            >
              systems <span className="text-[#FFB52E]">.</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 lg:pt-24 relative">
        {/* Editorial Viewfinder Overlay Corner Marks (⌖) */}
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

        {/* Precision Center Crosshair Ticks (+) on side margins */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-white/20 font-mono text-2xl select-none hidden lg:block">
          +
        </div>
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-white/20 font-mono text-2xl select-none hidden lg:block">
          +
        </div>

        {/* Central Graphic Composition: Engineer + Radial Petals */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Symmetrical Radial Fan / Petals Background behind engineer */}
          <div className="relative w-full max-w-[540px] flex items-center justify-center">
            {/* SVG Petal Radial Array with Slow Spin */}
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
                  {/* Subtle inner concentric guide rings with animated dashoffset */}
                  <circle
                    cx="0"
                    cy="0"
                    r="170"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    className="animate-spin-very-slow origin-center"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="100"
                    fill="none"
                    stroke="rgba(255,181,46,0.35)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>

            {/* Monochrome Engineer Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="relative z-10 w-[280px] sm:w-[360px] md:w-[420px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] group"
              onMouseEnter={() => onHoverCard?.('ENGINEER')}
              onMouseLeave={onLeaveCard}
            >
              <img
                src={HERO_ASSETS.aboutMonochrome}
                alt="Sagar Singh in dramatic high-contrast studio monochrome portrait"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent" />
              
              {/* Telemetry frame indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB52E] animate-ping" />
                  LATENCY: &lt; 1.8MS
                </span>
                <span className="text-[#FFB52E] font-bold">SYS_ONLINE</span>
              </div>
            </motion.div>
          </div>

          {/* Editorial Text Statement & Bio below image */}
          <div className="mt-14 max-w-4xl w-full text-center sm:text-left">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB52E] animate-ping" />
                  SYSTEMS ARCHITECT & ENGINEER
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  "I engineer resilient distributed systems, low-latency microservices, and elegant developer tools."
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
                  Operating between Bangalore and San Francisco, my engineering practice centers on
                  distributed consensus, zero-allocation memory pipelines, and fault-tolerant cloud infrastructure.
                  I believe clean code is written with mechanical sympathy: respecting CPU cache hierarchies,
                  network boundaries, and human developer ergonomics alike.
                </p>
              </div>

              {/* Right Specs / Coordinates Column (5 cols) */}
              <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xs">
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">LOCATION</span>
                    <span className="text-white">Bangalore & SF</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">FOCUS</span>
                    <span className="text-white">Distributed & Cloud</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/10">
                    <span className="text-white/40">STACK</span>
                    <span className="text-white">Rust, Go, TS, K8s, eBPF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">STATUS</span>
                    <span className="text-[#FFB52E] flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFB52E] animate-pulse" />
                      Open for Advisory
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={onOpenInquiry}
                    id="about-cta-commission"
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#FFB52E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request Architecture Advisory</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Core Engineering Disciplines Breakdown */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <Cpu className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Distributed Consensus
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Pipelined Raft implementations, low-latency queues, and lock-free ring buffers handling millions of ops/sec.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <Layers className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Reactive Full-Stack
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Local-first CRDT synchronization, WebSockets, WASM, and sub-10ms UI interaction state loops.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <ShieldCheck className="w-5 h-5 text-[#FFB52E] mb-3" />
                <h3 className="text-sm font-bold tracking-tight text-white mb-1.5">
                  Cloud Mesh & eBPF
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Removing sidecar proxies with Linux kernel packet routing, automated mTLS, and zero-downtime rollouts.
                </p>
              </div>
            </div>

            {/* Interactive Architecture Simulator Widget */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#FFB52E]" />
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#FFB52E] font-bold">
                  CONSENSUS IN ACTION // LIVE EXPERIMENTAL LAB
                </h3>
              </div>
              <ConsensusSimulator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
