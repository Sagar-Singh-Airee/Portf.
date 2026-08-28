import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  GitBranch,
  Terminal,
  ExternalLink,
  Activity,
  Layers,
  Cpu,
  Code2,
  Copy,
  Check,
  Zap,
  Sliders,
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BENCHMARK' | 'SOURCE'>('OVERVIEW');
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulatedQps, setSimulatedQps] = useState(150000);
  const [simulatedLatency, setSimulatedLatency] = useState(1.65);

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

  // Update latency as load slider moves
  const handleLoadChange = (newQps: number) => {
    setSimulatedQps(newQps);
    // Non-linear realistic latency curve: base 1.2ms + slight queuing exponential
    const base = 1.2;
    const loadFactor = (newQps / 500000) ** 2.2;
    const computed = Number((base + loadFactor * 3.8).toFixed(2));
    setSimulatedLatency(computed);
  };

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  // Realistic sample code snippet for the active project
  const getCodeSnippet = (id: string) => {
    switch (id) {
      case 'aether-stream':
        return `// Aether Raft Consensus Engine (Rust / io_uring)
pub struct RaftPipelinedEngine<R: RingBuffer> {
    term: AtomicU64,
    voted_for: Option<NodeId>,
    log_stream: Arc<AppendEntriesLog>,
    ring: R,
}

impl<R: RingBuffer> RaftPipelinedEngine<R> {
    #[inline(always)]
    pub async fn replicate_batch(&self, entries: &[LogEntry]) -> Result<CommitIndex> {
        // Zero-allocation commit pipeline via Linux io_uring
        let future_ack = self.ring.submit_sqe_batch(entries)?;
        let quorum = self.await_majority_acks(future_ack).await?;
        self.log_stream.advance_commit(quorum);
        Ok(quorum)
    }
}`;
      case 'vertex-canvas':
        return `// Vertex CRDT Collaborative State (WASM + TypeScript)
export class VertexCollaborativeEngine {
  private doc: Y.Doc;
  private peerMesh: WebRTCDataChannelPool;

  constructor(clusterId: string) {
    this.doc = new Y.Doc({ gc: false });
    this.peerMesh = new WebRTCDataChannelPool({
      heartbeatMs: 25,
      meshTopology: 'mesh-full',
    });
  }

  public applyVectorOptimistic(delta: Uint8Array): void {
    Y.applyUpdateV2(this.doc, delta, 'local-client');
    this.peerMesh.broadcastDeltaFast(delta);
  }
}`;
      default:
        return `// Autonomous Microservice Kernel Routing (Go / eBPF)
package mesh

import "github.com/cilium/ebpf"

func AttachSocketFilter(prog *ebpf.Program, sockFd int) error {
    // Intercept TCP socket packets directly in Linux kernel
    if err := unix.SetsockoptInt(sockFd, unix.SOL_SOCKET, unix.SO_ATTACH_BPF, prog.FD()); err != nil {
        return fmt.Errorf("failed to attach eBPF filter: %w", err)
    }
    return nil
}`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet(project.id));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl bg-[#F8F7F3] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col text-[#050505] border border-[#D9D9D5]"
          >
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-30 bg-[#F8F7F3]/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-[#D9D9D5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#FFB52E] px-2.5 py-1 rounded-full bg-[#050505]">
                  SYSTEM {project.number}
                </span>
                <span className="text-xs font-mono text-[#050505]/60 uppercase hidden sm:inline">
                  {project.category} · {project.year}
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1 bg-[#EAE8E2] p-1 rounded-full border border-[#D9D9D5]">
                {(['OVERVIEW', 'BENCHMARK', 'SOURCE'] as const).map((tab) => {
                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors cursor-pointer ${
                        isSelected ? 'text-[#F8F7F3]' : 'text-[#050505]/70 hover:text-[#050505]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="modalTab"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          className="absolute inset-0 bg-[#050505] rounded-full -z-10 shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D9D9D5] text-xs font-mono text-[#050505] hover:border-[#050505] transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-[#050505]" />
                    <span>Repo</span>
                    <ExternalLink className="w-3 h-3 text-[#050505]/50" />
                  </a>
                )}
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

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
              {/* Header Title */}
              <div>
                <h2 className="font-display font-black text-[clamp(1.85rem,5.5vw,3.75rem)] tracking-tight text-[#050505] leading-[0.95]">
                  {project.title}
                </h2>
                <p className="mt-2 text-base sm:text-xl text-[#050505]/70 font-serif-italic">
                  {project.subtitle}
                </p>
              </div>

              {/* Tab 1: OVERVIEW */}
              {activeTab === 'OVERVIEW' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Hero Visual Image Banner */}
                  <div
                    className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden relative ${
                      project.accentBg ? 'bg-[#FFB52E] p-4 sm:p-8' : 'bg-[#050505]'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full max-h-[420px] object-cover rounded-xl sm:rounded-2xl"
                    />

                    {/* Benchmark Chips */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {project.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="bg-[#050505]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-white flex items-center gap-2"
                          >
                            <Activity className="w-3.5 h-3.5 text-[#FFB52E] animate-pulse" />
                            <span className="font-mono text-[11px] text-[#FFB52E] font-bold">
                              {m.label}:
                            </span>
                            <span className="font-mono text-[11px] text-white/90">{m.val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-[#D9D9D5]">
                    <div>
                      <span className="text-[11px] font-mono text-[#050505]/50 block">ORGANIZATION / ORIGIN</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                        {project.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#050505]/50 block">DEPLOYMENT REGION</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                        {project.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#050505]/50 block">YEAR SHIPPED</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                        {project.year}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#050505]/50 block">CORE ARCHITECTURE</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#050505] mt-1 block">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Architectural Narrative & Technical Concept Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-white rounded-2xl border border-[#D9D9D5]">
                      <h3 className="text-xs uppercase font-mono tracking-widest text-[#050505]/60 mb-2 font-bold">
                        01 // SYSTEM DESIGN & PROBLEM STATEMENT
                      </h3>
                      <p className="text-sm text-[#050505]/85 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-[#D9D9D5]">
                      <h3 className="text-xs uppercase font-mono tracking-widest text-[#050505]/60 mb-2 font-bold">
                        02 // ARCHITECTURAL INNOVATION
                      </h3>
                      <p className="text-sm text-[#050505]/85 leading-relaxed">
                        {project.concept}
                      </p>
                    </div>
                  </div>

                  {/* Outcome & Tech Stack */}
                  <div className="p-6 bg-[#050505] text-[#F8F7F3] rounded-2xl sm:rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7">
                      <span className="text-[11px] font-mono text-[#FFB52E] uppercase block mb-1 font-bold">
                        BENCHMARKS & PRODUCTION IMPACT
                      </span>
                      <p className="text-sm sm:text-base text-white/90 font-light">
                        {project.outcome}
                      </p>
                    </div>
                    <div className="md:col-span-5 md:border-l md:border-white/15 md:pl-6">
                      <span className="text-[11px] font-mono text-white/50 uppercase block mb-2 font-bold">
                        TECH STACK & RUNTIMES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-mono text-white/90 border border-white/10"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: BENCHMARK & LOAD SIMULATOR */}
              {activeTab === 'BENCHMARK' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-[#050505] text-white rounded-3xl border border-white/15 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#FFB52E] uppercase font-bold">
                          <Activity className="w-4 h-4 animate-pulse" />
                          <span>SYNTHETIC LOAD BENCHMARK SIMULATOR</span>
                        </div>
                        <p className="text-xs text-white/60 font-mono mt-0.5">
                          Ramp up concurrent synthetic queries to observe simulated tail latency.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                        HEALTHY QUORUM
                      </span>
                    </div>

                    {/* Interactive QPS Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">CONCURRENT INGESTION RATE</span>
                        <span className="text-[#FFB52E] font-bold text-sm">
                          {simulatedQps.toLocaleString()} QPS
                        </span>
                      </div>
                      <input
                        type="range"
                        min="25000"
                        max="500000"
                        step="25000"
                        value={simulatedQps}
                        onChange={(e) => handleLoadChange(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFB52E]"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-white/40">
                        <span>25,000 QPS</span>
                        <span>250,000 QPS</span>
                        <span>500,000 QPS (MAX)</span>
                      </div>
                    </div>

                    {/* Real-Time Measured Gauges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono text-white/50 block">P99 LATENCY</span>
                        <span className="text-2xl font-mono font-bold text-white block mt-1">
                          {simulatedLatency} ms
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">SLA GUARANTEE &lt; 5ms</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono text-white/50 block">CPU ALLOCATION</span>
                        <span className="text-2xl font-mono font-bold text-[#FFB52E] block mt-1">
                          {Math.round(18 + (simulatedQps / 500000) * 44)}%
                        </span>
                        <span className="text-[10px] font-mono text-white/40">16 CORES ACTIVE</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono text-white/50 block">PACKET DROP RATE</span>
                        <span className="text-2xl font-mono font-bold text-emerald-400 block mt-1">
                          0.00%
                        </span>
                        <span className="text-[10px] font-mono text-white/40">ZERO-DROP BUFFER</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono text-white/50 block">IO_URING RING WAIT</span>
                        <span className="text-2xl font-mono font-bold text-white block mt-1">
                          0.12 μs
                        </span>
                        <span className="text-[10px] font-mono text-white/40">SUB-MICROSECOND</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: SOURCE IMPLEMENTATION */}
              {activeTab === 'SOURCE' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-[#050505] text-white rounded-3xl border border-white/15">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                        <Code2 className="w-4 h-4 text-[#FFB52E]" />
                        <span>SRC / CORE / PIPELINE_ENGINE</span>
                      </div>
                      <button
                        onClick={copyCode}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FFB52E] hover:text-[#050505] text-xs font-mono transition-colors cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="font-mono text-xs sm:text-sm text-[#FFB52E]/90 bg-black/60 p-4 rounded-xl overflow-x-auto leading-relaxed border border-white/5">
                      <code>{getCodeSnippet(project.id)}</code>
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* Footer Project Navigation & Inquiry CTA */}
              <div className="pt-6 border-t border-[#D9D9D5] flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  Request Technical Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
