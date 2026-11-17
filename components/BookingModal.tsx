'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tue 14:00 (Helsinki / EEST)');
  const [selectedService, setSelectedService] = useState<string>('Custom Software / Platform');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    'Tue 14:00 (Helsinki / EEST)',
    'Wed 11:30 (Helsinki / EEST)',
    'Wed 16:00 (Helsinki / EEST)',
    'Thu 13:00 (Helsinki / EEST)',
    'Thu 17:30 (Helsinki / EEST)',
    'Fri 15:00 (Helsinki / EEST)',
  ];

  const services = [
    'Custom Software / Platform',
    'AI / LLM Integration & RAG',
    'Data Engineering & Analytics',
    'Brand Identity & Design System',
    'Cloud & DevOps Engineering',
    'Technical Advisory & Architecture',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setConfirmed(true);
  };

  const handleResetAndClose = () => {
    setConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Discovery Call"
    >
      <div className="bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in text-[#E8E0D0]">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#E8E0D0]/10 border border-[#E8E0D0]/15 flex items-center justify-center text-[#E8E0D0] hover:bg-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#B87333]/20 border border-[#B87333] flex items-center justify-center mx-auto text-[#B87333]">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B87333]">
                Session Reserved
              </span>
              <h3 className="font-fraunces text-2xl sm:text-3xl font-medium mt-1">
                Discovery Call Confirmed
              </h3>
            </div>
            <p className="text-sm text-[#E8E0D0]/70 leading-relaxed max-w-sm mx-auto">
              We have dispatched calendar invites and meeting links to{' '}
              <strong className="text-[#E8E0D0]">{formData.email}</strong> for {selectedSlot}.
            </p>
            <div className="p-4 rounded-xl bg-[#E8E0D0]/5 border border-[#E8E0D0]/10 text-xs text-left max-w-md mx-auto space-y-1">
              <div className="text-[#E8E0D0]/50 font-mono">AGENDA:</div>
              <div className="text-[#E8E0D0] font-medium">30-min Technical Discovery & Scope Alignment</div>
              <div className="text-[#E8E0D0]/60">Virtanex Labs Technical Direction · Helsinki Base</div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="bg-[#E8E0D0] text-[#0C0A09] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B87333]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Virtanex Labs · Finland Base</span>
              </div>
              <h3 className="font-fraunces text-2xl sm:text-3xl font-medium mt-1">
                Book a Technical Discovery Call
              </h3>
              <p className="text-xs text-[#E8E0D0]/55 mt-1">
                30-minute direct consultation with our technical and design leads.
              </p>
            </div>

            {/* Service Focus */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                Discipline of Interest
              </label>
              <div className="grid grid-cols-2 gap-2">
                {services.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] ${
                      selectedService === srv
                        ? 'border-[#B87333] bg-[#B87333]/15 text-[#E8E0D0] font-medium'
                        : 'border-[#E8E0D0]/10 text-[#E8E0D0]/65 hover:bg-[#E8E0D0]/5'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                Select Preferred Meeting Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl border text-xs text-left flex items-center justify-between transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] ${
                      selectedSlot === slot
                        ? 'border-[#B87333] bg-[#B87333]/15 text-[#E8E0D0] font-medium'
                        : 'border-[#E8E0D0]/10 text-[#E8E0D0]/65 hover:bg-[#E8E0D0]/5'
                    }`}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <Check className="w-3.5 h-3.5 text-[#B87333]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-1">
                Company / Project Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Brief objective, technology questions, or launch goals"
                className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#E8E0D0] text-[#0C0A09] py-3 rounded-full text-sm font-semibold hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
              >
                <span>Confirm Call Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
