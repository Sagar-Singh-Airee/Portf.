import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Terminal, Cpu, Activity, Zap } from 'lucide-react';
import { HERO_ASSETS } from '../data/portfolioData';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(38);
  const [throughput, setThroughput] = useState(1482900);
  const [telemetryLogs, setTelemetryLogs] = useState([
    '[CLUSTER] 64/64 nodes synchronized via eBPF sockops',
    '[LATENCY] P50: 0.82ms | P90: 1.15ms | P99: 1.68ms',
    '[RAFT] Epoch heartbeat: 0 stale leaders detected',
    '[IO_URING] CQE backlog: 0 entries (zero lock contention)',
  ]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
      // Subtle fluctuations in simulated throughput
      setThroughput(1480000 + Math.floor((Math.random() - 0.5) * 45000));
    }, 100);

    const logInterval = setInterval(() => {
      const msgs = [
        `[INGESTION] Batch committed: ${(Math.random() * 50 + 10).toFixed(1)}k events`,
        `[GC PAUSE] Zero pause detected in 14.8 hours continuous run`,
        `[KERNEL] eBPF socket bypass saved 2.8M TCP syscalls`,
        `[CACHE] L3 hit ratio: 94.2% across NUMA nodes`,
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setTelemetryLogs((prev) => [randomMsg, ...prev.slice(0, 3)]);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-4xl bg-[#050505] rounded-3xl overflow-hidden border border-white/15 shadow-2xl z-10 text-white flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FFB52E]" />
              <span className="text-xs font-mono tracking-widest text-[#FFB52E] font-bold">
                SAGAR SINGH · ARCHITECTURE DEMO & BENCHMARK STREAM
              </span>
            </div>
            <button
              onClick={onClose}
              id="showreel-close-btn"
              aria-label="Close architecture demo"
              className="p-1.5 rounded-full border border-white/20 hover:border-white text-white hover:text-[#FFB52E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Emulation Canvas */}
          <div className="relative aspect-[16/9] w-full bg-[#111] overflow-hidden flex items-center justify-center">
            <img
              src={HERO_ASSETS.datacenter}
              alt="Sagar Singh Architecture Demo & Systems Telemetry"
              className={`w-full h-full object-cover brightness-85 contrast-115 transition-all duration-700 ${
                isPlaying ? 'scale-105 filter' : 'scale-100 filter grayscale'
              }`}
            />

            {/* Ambient Radial Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />

            {/* Dynamic Grid Scanner Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* On-screen Terminal & Benchmark Telemetry */}
            <div className="absolute top-5 left-6 text-xs font-mono text-white/90 space-y-1.5 pointer-events-none drop-shadow-lg">
              <div className="text-[#FFB52E] flex items-center gap-2 font-bold bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs w-fit">
                <span className="w-2 h-2 rounded-full bg-[#FFB52E] animate-ping" />
                <span>ACTIVE STREAM: {throughput.toLocaleString()} QPS</span>
              </div>
              <div className="text-white/70 text-[11px] font-mono pl-1">
                NODE CLUSTER: 64 INSTANCES · KERNEL eBPF PROXILESS
              </div>
            </div>

            {/* Simulated Center Audio / Waveform Visualizer */}
            <div className="absolute bottom-6 right-6 flex items-end gap-1 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#FFB52E] rounded-full transition-all duration-150"
                  style={{
                    height: isPlaying ? `${10 + Math.sin(progress + i) * 20 + Math.random() * 15}px` : '4px',
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Center Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-20 w-16 h-16 rounded-full bg-[#FFB52E] text-[#050505] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>

          {/* Player Controls Bar */}
          <div className="p-5 bg-[#050505] flex flex-col gap-4 border-t border-white/10">
            {/* Scrubber track */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
              <div
                className="bg-[#FFB52E] h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? 'PAUSE' : 'RESUME'}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFB52E]" />}
                  <span>{isMuted ? 'UNMUTE AUDIO' : 'AUDIO ACTIVE'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white/40">RUNTIME:</span>
                <span className="text-[#FFB52E] font-bold">RUST 1.84 + LINUX 6.8 KERNEL</span>
              </div>
            </div>

            {/* Real-time telemetry log feed */}
            <div className="bg-black/60 p-3 rounded-xl border border-white/10 font-mono text-[11px] space-y-1">
              <div className="text-[10px] text-white/40 flex items-center gap-1.5 pb-1 border-b border-white/5">
                <Terminal className="w-3 h-3 text-[#FFB52E]" />
                <span>LIVE KERNEL PROFILER & TELEMETRY</span>
              </div>
              {telemetryLogs.map((log, i) => (
                <div key={i} className="text-white/70 truncate flex items-center gap-2">
                  <span className="text-[#FFB52E]">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
