import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Ticket, CheckCircle, Sparkles, QrCode } from 'lucide-react';
import { Exhibition } from '../types';

interface TicketModalProps {
  exhibition: Exhibition | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  exhibition,
  isOpen,
  onClose,
}) => {
  const [ticketTier, setTicketTier] = useState<'standard' | 'vip' | 'curator'>('standard');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [attendeeName, setAttendeeName] = useState<string>('');
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsBooked(false);
      setAttendeeName('');
      setAttendeeEmail('');
      setTicketCount(1);
    }
  }, [isOpen]);

  if (!exhibition) return null;

  const tierPrices = {
    standard: 18,
    vip: 45,
    curator: 85,
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail) return;
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-[#F8F7F3] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 z-10 border border-[#D9D9D5] text-[#050505]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              id="ticket-modal-close-btn"
              aria-label="Close ticket booking"
              className="absolute top-5 right-5 p-2 rounded-full border border-[#050505]/20 text-[#050505] hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBooked ? (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505] text-[#FFB52E] text-xs font-mono mb-2">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>EXHIBITION PASS · {exhibition.number}</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#050505] tracking-tight leading-tight">
                    {exhibition.title}
                  </h3>
                  <div className="mt-2 flex flex-col gap-1 text-xs text-[#050505]/70 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#050505]" />
                      <span>{exhibition.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#050505]" />
                      <span>{exhibition.venue}, {exhibition.location}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleBooking} className="space-y-5">
                  {/* Tier Selection */}
                  <div>
                    <label className="text-xs font-mono text-[#050505]/60 block mb-2">
                      SELECT ADMISSION TIER
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTicketTier('standard')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          ticketTier === 'standard'
                            ? 'border-[#050505] bg-[#050505] text-white'
                            : 'border-[#D9D9D5] bg-white text-[#050505] hover:border-[#050505]'
                        }`}
                      >
                        <span className="block text-xs font-bold">Standard</span>
                        <span className="block text-sm font-mono mt-1 text-[#FFB52E]">€18</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTicketTier('vip')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          ticketTier === 'vip'
                            ? 'border-[#050505] bg-[#050505] text-white'
                            : 'border-[#D9D9D5] bg-white text-[#050505] hover:border-[#050505]'
                        }`}
                      >
                        <span className="block text-xs font-bold">VIP Preview</span>
                        <span className="block text-sm font-mono mt-1 text-[#FFB52E]">€45</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTicketTier('curator')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          ticketTier === 'curator'
                            ? 'border-[#050505] bg-[#050505] text-white'
                            : 'border-[#D9D9D5] bg-white text-[#050505] hover:border-[#050505]'
                        }`}
                      >
                        <span className="block text-xs font-bold">Curator Tour</span>
                        <span className="block text-sm font-mono mt-1 text-[#FFB52E]">€85</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9D9D5]">
                    <span className="text-xs font-mono text-[#050505]/70">NUMBER OF PASSES</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        className="w-7 h-7 rounded-full border border-[#D9D9D5] flex items-center justify-center font-mono hover:bg-[#050505] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-sm w-4 text-center">
                        {ticketCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                        className="w-7 h-7 rounded-full border border-[#D9D9D5] flex items-center justify-center font-mono hover:bg-[#050505] hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-mono text-[#050505]/60 block mb-1">
                        ATTENDEE NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sofia Laurent"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D9D5] text-sm text-[#050505] focus:outline-hidden focus:border-[#050505] font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-[#050505]/60 block mb-1">
                        CONFIRMATION EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sofia@gallery.com"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D9D5] text-sm text-[#050505] focus:outline-hidden focus:border-[#050505] font-sans"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#FFB52E] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#050505] hover:text-[#F8F7F3] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      Confirm Reservation · Total €{tierPrices[ticketTier] * ticketCount}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Digital Pass View */
              <div className="text-center py-4 space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#FFB52E] text-[#050505] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#050505]/60 uppercase tracking-widest">
                    PASS CONFIRMED
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#050505] mt-1">
                    See you in {exhibition.location.split(',')[0]}
                  </h3>
                  <p className="text-xs text-[#050505]/70 mt-1">
                    An official digital pass has been issued to <span className="font-semibold">{attendeeEmail}</span>.
                  </p>
                </div>

                {/* Digital Ticket Card Preview */}
                <div className="p-5 rounded-2xl bg-[#050505] text-[#F8F7F3] border border-white/10 text-left relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-[#FFB52E]">ADMISSION PASS</span>
                      <h4 className="font-display font-bold text-lg text-white mt-0.5">
                        {exhibition.title}
                      </h4>
                      <p className="text-xs text-white/70 font-mono mt-1">
                        {exhibition.venue}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white text-[#050505]">
                      <QrCode className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/15 flex justify-between text-[11px] font-mono">
                    <div>
                      <span className="text-white/40 block">HOLDER</span>
                      <span className="text-white font-semibold">{attendeeName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">DATE</span>
                      <span className="text-white">{exhibition.date}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">PASSES</span>
                      <span className="text-[#FFB52E]">{ticketCount}x {ticketTier.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-[#050505] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#FFB52E] hover:text-[#050505] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
