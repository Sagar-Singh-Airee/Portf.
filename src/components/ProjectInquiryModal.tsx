import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [projectType, setProjectType] = useState<string>('Distributed Architecture');
  const [budget, setBudget] = useState<string>('$25k — $50k');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050505]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#F8F7F3] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-10 z-10 border border-[#D9D9D5] text-[#050505] my-auto"
        >
          <button
            onClick={onClose}
            id="inquiry-modal-close-btn"
            aria-label="Close technical consultation modal"
            className="absolute top-5 right-5 p-2 rounded-full border border-[#050505]/20 text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono text-[#FFB52E] bg-[#050505] px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                  <Terminal className="w-3 h-3 text-[#FFB52E]" />
                  <span>TECHNICAL ADVISORY & STAFF CONSULTATION</span>
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-[#050505] tracking-tight leading-tight">
                  Initiate Advisory.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#050505]/70">
                  Discuss high-throughput systems, zero-latency architectures, or keynote presentations with Sagar Singh.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Project Scope Type */}
                <div>
                  <label className="text-[11px] font-mono text-[#050505]/60 block mb-1.5">
                    TECHNICAL DISCIPLINE
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Distributed Architecture', 'High-Throughput Backend', 'Real-Time Web & CRDT', 'Performance Audit'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`p-2 text-xs font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          projectType === type
                            ? 'bg-[#050505] text-[#FFB52E] border-[#050505]'
                            : 'bg-white text-[#050505] border-[#D9D9D5] hover:border-[#050505]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Bracket */}
                <div>
                  <label className="text-[11px] font-mono text-[#050505]/60 block mb-1.5">
                    ENGAGEMENT ESTIMATE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['$10k — $25k', '$25k — $50k', '$50k+ / Retainer'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`p-2 text-xs font-mono rounded-lg border text-center transition-all cursor-pointer ${
                          budget === b
                            ? 'bg-[#050505] text-[#FFB52E] border-[#050505]'
                            : 'bg-white text-[#050505] border-[#D9D9D5] hover:border-[#050505]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#050505]/60 block mb-1">
                      NAME / COMPANY
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcella Rossi (CloudScale)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D9D5] text-sm text-[#050505] focus:outline-hidden focus:border-[#050505]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#050505]/60 block mb-1">
                      WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcella@company.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D9D5] text-sm text-[#050505] focus:outline-hidden focus:border-[#050505]"
                    />
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="text-[11px] font-mono text-[#050505]/60 block mb-1">
                    SYSTEM OBJECTIVES & TIMELINE
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the current throughput bottlenecks, concurrency demands, or technical milestones..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D9D5] text-sm text-[#050505] focus:outline-hidden focus:border-[#050505]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#FFB52E] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Technical Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FFB52E] text-[#050505] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#050505]">
                Consultation Scheduled
              </h3>
              <p className="text-sm text-[#050505]/70 max-w-sm mx-auto">
                Thank you, <span className="font-semibold">{name}</span>. Sagar reviews technical queries within 24 hours. A calendar link and architecture briefing document will be sent to <span className="font-semibold">{email}</span>.
              </p>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#050505] text-[#F8F7F3] text-xs font-mono uppercase tracking-wider hover:bg-[#FFB52E] hover:text-[#050505] transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

