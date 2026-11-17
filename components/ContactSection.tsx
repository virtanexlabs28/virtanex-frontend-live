'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Globe, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onStartProject?: () => void;
}

export function ContactSection({ onStartProject }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'custom-software',
    timeline: "Summer '26",
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 px-5 sm:px-10 md:px-14 bg-[#0C0A09] border-t border-[#E8E0D0]/10"
      aria-label="Contact and Inquiries"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries and studio info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B87333] mb-3">
                <span>Inquiries & Booking</span>
                <span aria-hidden="true">·</span>
                <span>Summer &apos;26</span>
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-[#E8E0D0] font-normal tracking-tight">
                Let&apos;s build work that lasts.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#E8E0D0]/70 leading-relaxed">
              We welcome new client partnerships, dedicated engineering collaborations, and
              exploratory technical consultations.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E8E0D0]/10 text-sm">
              <div className="flex items-center gap-3 text-[#E8E0D0]/80">
                <Mail className="w-4 h-4 text-[#B87333]" />
                <a
                  href="mailto:contact@virtanexlabs.com"
                  className="hover:text-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                >
                  contact@virtanexlabs.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#E8E0D0]/80">
                <MapPin className="w-4 h-4 text-[#B87333]" />
                <span>Finland (Remote / International Collaboration)</span>
              </div>

              <div className="flex items-center gap-3 text-[#E8E0D0]/80">
                <Globe className="w-4 h-4 text-[#B87333]" />
                <a
                  href="https://virtanexlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                >
                  https://virtanexlabs.com
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#E8E0D0]/[0.02] border border-[#E8E0D0]/10">
              <span className="text-xs uppercase tracking-wider text-[#B87333] font-medium">
                Current Studio Availability
              </span>
              <p className="text-sm text-[#E8E0D0]/80 mt-2">
                Now accepting select engineering and identity commissions for{' '}
                <strong className="text-[#E8E0D0]">Summer &apos;26</strong>. Inquire early to reserve studio capacity.
              </p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-[#E8E0D0]/[0.02] border border-[#E8E0D0]/15 rounded-2xl p-6 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#B87333]/20 border border-[#B87333] flex items-center justify-center mx-auto text-[#B87333]">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-fraunces text-2xl sm:text-3xl text-[#E8E0D0] font-normal">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#E8E0D0]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, {formState.name}. Our technical directors will review your project brief
                  and reply within 24 hours to schedule our discovery discussion.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        service: 'custom-software',
                        timeline: "Summer '26",
                        message: '',
                      });
                    }}
                    className="text-xs text-[#B87333] uppercase tracking-wider underline hover:text-[#E8E0D0] transition-colors"
                  >
                    Submit another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-fraunces text-xl sm:text-2xl text-[#E8E0D0] font-normal mb-1">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-[#E8E0D0]/50">
                    Tell us about your organization and technical requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-4 py-3 text-sm text-[#E8E0D0] placeholder:text-[#E8E0D0]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="elena@company.com"
                      className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-4 py-3 text-sm text-[#E8E0D0] placeholder:text-[#E8E0D0]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                      Primary Service Required
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-4 py-3 text-sm text-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                    >
                      <option value="custom-software">Custom Software & Web Apps</option>
                      <option value="ai-ml">AI, ML & Autonomous Workflows</option>
                      <option value="data-engineering">Data Pipelines & Analytics</option>
                      <option value="system-integration">System Integration & APIs</option>
                      <option value="cloud-devops">Cloud & DevOps Engineering</option>
                      <option value="digital-product">SaaS & Product Architecture</option>
                      <option value="ui-ux">UI/UX & Design Systems</option>
                      <option value="iot-industrial">IoT & Industrial Telemetry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                      Target Timeline
                    </label>
                    <select
                      value={formState.timeline}
                      onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                      className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-4 py-3 text-sm text-[#E8E0D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                    >
                      <option value="Summer '26">Summer &apos;26 (Preferred)</option>
                      <option value="Q3/Q4 '26">Autumn / Winter &apos;26</option>
                      <option value="Immediate">Immediate / Within 30 days</option>
                      <option value="Exploratory">Exploratory / Feasibility Study</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E8E0D0]/60 mb-2">
                    Project Narrative / Overview
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about the challenges you are addressing and the solution you envision..."
                    className="w-full bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-xl px-4 py-3 text-sm text-[#E8E0D0] placeholder:text-[#E8E0D0]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#E8E0D0]/40">
                    Strict NDA honored. Response within 24h.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E8E0D0] text-[#0C0A09] rounded-full px-7 py-3 text-sm font-semibold hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
