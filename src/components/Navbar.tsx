import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_creator_camera_1787888211482.jpg';

interface NavbarProps {
  onOpenInquiry: () => void;
  onHoverLink?: () => void;
  onLeaveLink?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onHoverLink,
  onLeaveLink,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientSoundActive, setAmbientSoundActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient sound synthesizer (subtle warm analog film hum)
  const toggleAmbientSound = () => {
    if (!ambientSoundActive) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setAudioCtx(ctx);
        setGainNode(gain);
        setAmbientSoundActive(true);
      } catch {
        setAmbientSoundActive(false);
      }
    } else {
      if (gainNode && audioCtx) {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          audioCtx.close();
          setAudioCtx(null);
          setGainNode(null);
          setAmbientSoundActive(false);
        }, 500);
      } else {
        setAmbientSoundActive(false);
      }
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Exhibitions', href: '#exhibitions' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F7F3]/90 backdrop-blur-md border-b border-[#D9D9D5]/60 py-3.5 shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Minimal Monogram Logo (matching reference ●●❙) */}
          <a
            href="#home"
            id="nav-logo"
            aria-label="Arturo Quintany Portfolio Home"
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={onHoverLink}
            onMouseLeave={onLeaveLink}
          >
            <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
              <span className="w-4 h-4 rounded-full bg-[#050505] transition-colors group-hover:bg-[#FFB52E]"></span>
              <span className="w-4 h-4 rounded-full bg-[#050505] transition-colors group-hover:bg-[#FFB52E]"></span>
              <span className="w-1.5 h-4 rounded-xs bg-[#050505]"></span>
            </div>
            <span className="sr-only">Arturo Quintany — Visual Storyteller</span>
          </a>

          {/* Center: Desktop Navigation with subtle slashes */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  className="px-3 py-1.5 text-[13px] font-medium tracking-tight text-[#050505]/85 hover:text-[#050505] transition-all relative group"
                  onMouseEnter={onHoverLink}
                  onMouseLeave={onLeaveLink}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-[#050505] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
                {index < navLinks.length - 1 && (
                  <span className="text-[#D9D9D5] text-[11px] select-none">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Date / Exhibition Badge & Actions */}
          <div className="flex items-center gap-4">
            {/* Audio Atmosphere button */}
            <button
              onClick={toggleAmbientSound}
              id="nav-audio-toggle"
              aria-label="Toggle ambient analog soundscape"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#D9D9D5] text-[11px] text-[#050505]/70 hover:text-[#050505] hover:border-[#050505] transition-colors"
              title="Ambient Analog Soundscape"
            >
              {ambientSoundActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FFB52E] animate-pulse" />
                  <span className="font-mono text-[10px]">SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#050505]/50" />
                  <span className="font-mono text-[10px]">SOUND: OFF</span>
                </>
              )}
            </button>

            {/* Reference exact right-badge: ✦ Sala Canal, 22 Nov 26 + circular avatar thumbnail */}
            <a
              href="#exhibitions"
              id="nav-status-badge"
              className="hidden sm:flex items-center gap-2 pl-3 pr-1.5 py-1 rounded-full bg-white/70 border border-[#D9D9D5]/80 hover:border-[#050505] transition-all group"
              onMouseEnter={onHoverLink}
              onMouseLeave={onLeaveLink}
            >
              <div className="flex items-center gap-1 text-[11px] font-medium tracking-tight text-[#050505]">
                <Sparkles className="w-3 h-3 text-[#FFB52E]" />
                <span className="text-[#050505]/70">Sala Canal,</span>
                <span className="font-semibold">22 Nov 26</span>
              </div>
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FFB52E]/60">
                <img
                  src={heroImg}
                  alt="Creator avatar"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-trigger"
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-full border border-[#D9D9D5] text-[#050505] hover:border-[#050505] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#050505] text-[#F8F7F3] flex flex-col justify-between p-8 sm:p-12 md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFB52E]"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFB52E]"></span>
                <span className="w-1.5 h-3.5 rounded-xs bg-[#F8F7F3]"></span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                id="mobile-menu-close"
                aria-label="Close navigation"
                className="p-2 rounded-full border border-white/20 text-white hover:border-[#FFB52E] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4 my-auto">
              {navLinks.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline justify-between border-b border-white/10 pb-3"
                >
                  <span className="text-xs font-mono text-[#FFB52E]">0{idx + 1}</span>
                  <span className="text-3xl font-display font-bold tracking-tight text-white group-hover:text-[#FFB52E] transition-colors">
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#FFB52E] transition-colors" />
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3.5 bg-[#FFB52E] text-[#050505] font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2"
              >
                Start A Project <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="flex justify-between items-center text-[11px] text-white/50 font-mono">
                <span>MADRID & MILAN</span>
                <span>AVAILABLE 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
