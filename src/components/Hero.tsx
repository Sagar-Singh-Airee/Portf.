import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowUpRight, Camera, Play, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_creator_camera_1787888211482.jpg';
import { HERO_STATS } from '../data/portfolioData';

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
    { label: 'yt', name: 'YouTube', href: 'https://youtube.com' },
    { label: 'ig', name: 'Instagram', href: 'https://instagram.com' },
    { label: 'fb', name: 'Facebook', href: 'https://facebook.com' },
    { label: 'x', name: 'X / Twitter', href: 'https://x.com' },
  ];

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Oversized Editorial Typography & Intro (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Creator Moniker / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFB52E]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#050505]/60">
                Arturo Quintany — Visual Storyteller & Director
              </span>
            </motion.div>

            {/* Giant Stacked Editorial Headline: "visual poetry" */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative -ml-1 sm:-ml-2 select-none"
            >
              <h1 className="font-display font-black text-7xl sm:text-8xl md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.75rem] leading-[0.82] tracking-[-0.065em] text-[#050505]">
                visual <br />
                poetry
              </h1>
            </motion.div>

            {/* Sub-intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 text-base sm:text-lg text-[#050505]/80 font-normal leading-relaxed max-w-lg"
            >
              Welcome to a visual journey that transcends time and space. Discover
              the artistry of moments captured in motion where cinematography,
              architectural geometry, and storytelling converge.
            </motion.p>

            {/* Minimalist Social Badges: ( yt ) ( ig ) ( fb ) ( x ) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-2.5"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`hero-social-${social.label}`}
                  className="px-3.5 py-1.5 rounded-full border border-[#050505]/25 text-xs font-mono text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] hover:border-[#050505] transition-all duration-200"
                  onMouseEnter={() => onHoverCard?.(`VISIT ${social.name.toUpperCase()}`)}
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
              className="mt-14 pt-8 border-t border-[#D9D9D5]/80 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display font-black text-3xl sm:text-4xl lg:text-[2.6rem] text-[#050505] tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <p className="mt-2 text-xs sm:text-xs font-medium text-[#050505]/65 leading-snug line-clamp-2">
                    {stat.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Image Composition with Orange Container & Floating Circles (5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[420px] lg:max-w-[450px]"
            >
              {/* Main Featured Rounded Container with warm yellow/orange bg (#FFB52E) */}
              <div
                id="hero-feature-card"
                className="relative bg-[#FFB52E] rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-[3.25rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(255,181,46,0.35)] transition-transform duration-500 hover:scale-[1.01]"
                onMouseEnter={() => onHoverCard?.('REEL')}
                onMouseLeave={onLeaveCard}
              >
                {/* Handwritten Cursive Script Watermark Overlay (matching the reference "Quintany") */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
                  <span className="font-script text-white/90 text-4xl sm:text-5xl font-medium tracking-wide drop-shadow-xs">
                    Quintany
                  </span>
                </div>

                {/* Creator Image with vintage camera */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={heroImg}
                    alt="Creative director Arturo Quintany holding a vintage Super-8 cine-camera"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle warm amber gradient overlay at base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFB52E]/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Element 1: Top-Right Globe/Grid Icon Circle */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30">
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050505] text-white flex items-center justify-center shadow-lg cursor-pointer"
                  title="Global Film Archives & Exhibitions"
                  onClick={onOpenReel}
                >
                  <Globe className="w-5 h-5 text-[#F8F7F3]" />
                </motion.div>
              </div>

              {/* Floating Elements 2, 3, 4: Left-middle stacked floating circles (matching reference image) */}
              <div className="absolute -left-5 sm:-left-7 bottom-16 sm:bottom-20 z-30 flex flex-col gap-2.5">
                {/* Circle 1: Miniature camera badge */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFB52E] border-2 border-[#F8F7F3] shadow-lg flex items-center justify-center cursor-pointer"
                  title="Super-8 & 16mm Analog Optics"
                >
                  <Camera className="w-5 h-5 text-[#050505]" />
                </motion.div>

                {/* Circle 2: Avatar portrait thumbnail */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#F8F7F3] shadow-lg bg-[#050505]"
                  title="Arturo Quintany"
                >
                  <img
                    src={heroImg}
                    alt="Creator avatar thumbnail"
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>

                {/* Circle 3: Black circle with diagonal arrow ↗ linking to projects */}
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  id="hero-arrow-cta"
                  aria-label="Explore Selected Portfolio Projects"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#050505] text-white border-2 border-[#F8F7F3] shadow-xl flex items-center justify-center hover:bg-[#FFB52E] hover:text-[#050505] transition-colors cursor-pointer group"
                  onMouseEnter={() => onHoverCard?.('EXPLORE')}
                  onMouseLeave={onLeaveCard}
                >
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>

              {/* Decorative mini pill tag: "35mm / 16mm / Digital" */}
              <div className="absolute -bottom-4 right-8 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#D9D9D5] text-[10px] font-mono text-[#050505] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#FFB52E]" />
                  <span>ANALOG & CINEMATIC</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
