import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onHoverLink?: () => void;
  onLeaveLink?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onHoverLink, onLeaveLink }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Architecture', href: '#about' },
    { label: 'Systems', href: '#portfolio' },
    { label: 'Keynotes', href: '#exhibitions' },
    { label: 'Advisory', href: '#contact' },
  ];

  return (
    <footer
      id="footer"
      className="bg-[#F8F7F3] border-t border-[#D9D9D5] py-12 px-6 sm:px-8 lg:px-12 text-[#050505]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Monogram Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#050505]"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#050505]"></span>
            <span className="w-1.5 h-3.5 rounded-xs bg-[#FFB52E]"></span>
          </div>
          <span className="font-mono text-xs text-[#050505]/70">
            SAGAR SINGH · SYSTEMS ARCHITECT
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono tracking-tight text-[#050505]/80 hover:text-[#050505] hover:underline underline-offset-4 transition-colors"
              onMouseEnter={onHoverLink}
              onMouseLeave={onLeaveLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Back to top + Copyright */}
        <div className="flex items-center gap-6">
          <span className="text-[11px] font-mono text-[#050505]/50">
            © 2026 ALL RIGHTS RESERVED
          </span>
          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            aria-label="Scroll to top of page"
            className="w-9 h-9 rounded-full border border-[#050505]/30 flex items-center justify-center text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer"
            onMouseEnter={onHoverLink}
            onMouseLeave={onLeaveLink}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
