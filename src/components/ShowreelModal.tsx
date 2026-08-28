import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import heroImg from '../assets/images/hero_creator_camera_1787888211482.jpg';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-lg"
        />

        {/* Modal Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-4xl bg-[#050505] rounded-3xl overflow-hidden border border-white/15 shadow-2xl z-10 text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#FFB52E]" />
              <span className="text-xs font-mono tracking-widest text-[#FFB52E]">
                ARTURO QUINTANY · CINEMATIC SHOWREEL 2026
              </span>
            </div>
            <button
              onClick={onClose}
              id="showreel-close-btn"
              aria-label="Close showreel player"
              className="p-1.5 rounded-full border border-white/20 hover:border-white text-white hover:text-[#FFB52E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Emulation Canvas */}
          <div className="relative aspect-[16/9] w-full bg-[#111] overflow-hidden flex items-center justify-center">
            <img
              src={heroImg}
              alt="Arturo Quintany Showreel Montage"
              className={`w-full h-full object-cover brightness-75 contrast-125 transition-all duration-700 ${
                isPlaying ? 'scale-105 filter saturate-120' : 'scale-100 filter grayscale'
              }`}
            />

            {/* Analog Film Grain / Scanline Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

            {/* On-screen Timecode & Film Metadata */}
            <div className="absolute top-5 left-6 text-xs font-mono text-white/80 space-y-0.5 pointer-events-none drop-shadow-md">
              <div className="text-[#FFB52E] flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FFB52E] animate-ping" />
                <span>PLAYING 16MM KODAK VISION3 500T</span>
              </div>
              <div className="text-white/60">FPS: 24.000 · TC: 00:01:48:12</div>
            </div>

            {/* Center Play/Pause Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-20 w-16 h-16 rounded-full bg-[#FFB52E] text-[#050505] flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>

          {/* Player Controls Bar */}
          <div className="p-5 bg-[#050505] flex flex-col gap-3">
            {/* Scrubber track */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
              <div
                className="bg-[#FFB52E] h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-white/60">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
                </button>
              </div>

              <div>
                <span>01:48 / 04:32</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
