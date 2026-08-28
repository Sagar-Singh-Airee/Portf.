import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Calendar, MapPin, Tag, Award, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onOpenInquiry: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
  onOpenInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl bg-[#F8F7F3] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col text-[#050505] border border-[#D9D9D5]"
          >
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-30 bg-[#F8F7F3]/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-[#D9D9D5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FFB52E] px-2.5 py-1 rounded-full bg-[#050505]">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-[#050505]/60 uppercase">
                  {project.category} · {project.year}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  id="project-modal-close-btn"
                  aria-label="Close project modal"
                  className="p-2 rounded-full border border-[#050505]/20 text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 sm:px-10 lg:px-12 py-8 space-y-10">
              {/* Title & Subtitle */}
              <div>
                <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#050505] leading-none">
                  {project.title}
                </h2>
                <p className="mt-3 text-base sm:text-xl text-[#050505]/70 font-serif-italic">
                  {project.subtitle}
                </p>
              </div>

              {/* Main Visual Image Banner */}
              <div
                className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden ${
                  project.accentBg ? 'bg-[#FFB52E] p-4 sm:p-8' : 'bg-[#050505]'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-h-[550px] object-cover rounded-xl sm:rounded-2xl"
                />
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-[#D9D9D5]">
                <div>
                  <span className="text-[11px] font-mono text-[#050505]/50 block">CLIENT / COMMISSION</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                    {project.client}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#050505]/50 block">LOCATION</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                    {project.location}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#050505]/50 block">YEAR</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                    {project.year}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#050505]/50 block">CATEGORY</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Narrative & Concept Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#050505]/60 mb-2">
                    01 // SYNOPSIS & NARRATIVE
                  </h3>
                  <p className="text-sm sm:text-base text-[#050505]/85 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#050505]/60 mb-2">
                    02 // ART DIRECTION CONCEPT
                  </h3>
                  <p className="text-sm sm:text-base text-[#050505]/85 leading-relaxed">
                    {project.concept}
                  </p>
                </div>
              </div>

              {/* Outcome & Equipment */}
              <div className="p-6 bg-[#050505] text-[#F8F7F3] rounded-2xl sm:rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7">
                  <span className="text-[11px] font-mono text-[#FFB52E] uppercase block mb-1">
                    RECOGNITION & OUTCOME
                  </span>
                  <p className="text-sm sm:text-base text-white/90 font-light">
                    {project.outcome}
                  </p>
                </div>
                <div className="md:col-span-5 md:border-l md:border-white/15 md:pl-6">
                  <span className="text-[11px] font-mono text-white/50 uppercase block mb-2">
                    TECHNICAL GEAR & MEDIUM
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-mono text-white/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Gallery Stills */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#050505]/60">
                    EXHIBITION GALLERY STILLS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.slice(1).map((imgUrl, i) => (
                      <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#050505]">
                        <img
                          src={imgUrl}
                          alt={`${project.title} gallery still ${i + 1}`}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Project Navigation & Inquiry CTA */}
              <div className="pt-8 border-t border-[#D9D9D5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProject(prevProject)}
                    className="px-4 py-2 rounded-full border border-[#050505]/20 text-xs font-mono hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous ({prevProject.number})
                  </button>
                  <button
                    onClick={() => onSelectProject(nextProject)}
                    className="px-4 py-2 rounded-full border border-[#050505]/20 text-xs font-mono hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Next ({nextProject.number}) <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#FFB52E] text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  Commission Similar Work <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
