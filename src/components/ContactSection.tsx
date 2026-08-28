import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check, Mail, MapPin, Clock, Globe } from 'lucide-react';

interface ContactSectionProps {
  onOpenInquiry: () => void;
  onHoverCard?: (label: string) => void;
  onLeaveCard?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenInquiry,
  onHoverCard,
  onLeaveCard,
}) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const email = 'studio@arturoquintany.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Madrid/Milan CET
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(now);
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Commissions"
      className="relative bg-[#050505] text-[#F8F7F3] pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Top Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-6 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB52E] animate-ping" />
            <span className="text-xs font-mono text-[#FFB52E] tracking-widest uppercase">
              STUDIO INQUIRIES & COMMISSIONS
            </span>
          </div>
          <span className="text-xs font-mono text-white/50 hidden sm:inline-block">
            MADRID / MILAN / WORLDWIDE
          </span>
        </div>

        {/* Oversized Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.055em] leading-[0.85] text-white select-none">
              LET’S MAKE <br />
              <span className="text-[#FFB52E]">SOMETHING</span> <br />
              MEMORABLE.
            </h2>

            <p className="mt-8 text-base sm:text-xl text-white/70 max-w-xl font-light leading-relaxed">
              Accepting selected commercial films, documentary commissions, and gallery
              collaborations for late 2026.
            </p>
          </div>

          {/* Large Editorial CTA Button */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <button
              onClick={onOpenInquiry}
              id="contact-start-project-btn"
              onMouseEnter={() => onHoverCard?.('LET’S TALK')}
              onMouseLeave={onLeaveCard}
              className="w-full sm:w-auto px-8 py-5 rounded-full bg-[#FFB52E] text-[#050505] font-display font-black text-sm sm:text-base uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-[0_10px_35px_rgba(255,181,46,0.3)] hover:scale-105"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <span className="mt-3 text-[11px] font-mono text-white/40">
              Avg. response time: within 24 hours
            </span>
          </div>
        </div>

        {/* Contact Info Matrix */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Email Item with copy interaction */}
          <div>
            <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">
              DIRECT DISPATCH
            </span>
            <button
              onClick={copyEmail}
              className="group text-sm sm:text-base font-mono text-white hover:text-[#FFB52E] flex items-center gap-2 transition-colors cursor-pointer"
              title="Click to copy email address"
            >
              <span>{email}</span>
              {copied ? (
                <Check className="w-4 h-4 text-[#FFB52E]" />
              ) : (
                <Copy className="w-4 h-4 text-white/40 group-hover:text-[#FFB52E] transition-colors" />
              )}
            </button>
            <span className="text-[10px] font-mono text-white/40 mt-1 block">
              {copied ? 'Copied to clipboard!' : 'Click to copy direct address'}
            </span>
          </div>

          {/* Location & Studios */}
          <div>
            <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">
              PHYSICAL STUDIOS
            </span>
            <p className="text-sm sm:text-base text-white font-medium">
              Calle de Santa Engracia, 42
            </p>
            <p className="text-xs text-white/60 font-mono mt-0.5">
              28010 Madrid, Spain
            </p>
          </div>

          {/* Studio Clock CET */}
          <div>
            <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">
              LOCAL TIME (CET)
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFB52E]" />
              <span className="text-sm sm:text-base font-mono text-white font-bold tracking-widest">
                {currentTime || '12:00:00'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/40 mt-0.5 block">
              Madrid / Milan Time Zone
            </span>
          </div>

          {/* Social Channels */}
          <div>
            <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">
              SOCIAL ARCHIVES
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFB52E] transition-colors"
              >
                [INSTAGRAM]
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFB52E] transition-colors"
              >
                [YOUTUBE]
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFB52E] transition-colors"
              >
                [BEHANCE]
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFB52E] transition-colors"
              >
                [VIMEO]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
