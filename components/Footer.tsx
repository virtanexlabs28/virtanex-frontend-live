'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, Mail, Globe, MapPin, Shield, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onStartProject?: () => void;
  onNavigate?: (id: string) => void;
}

export function Footer({ onStartProject, onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="bg-[#0C0A09] text-[#E8E0D0] border-t border-[#E8E0D0]/10 pt-20 pb-12 px-5 sm:px-10 md:px-14 selection:bg-[#B87333]/30"
      aria-label="Virtanex Labs Footer"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Callout Strip */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#E8E0D0]/[0.02] border border-[#E8E0D0]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B87333] mb-2 font-medium">
              <span>Virtanex Labs</span>
              <span aria-hidden="true">·</span>
              <span>Finland Base</span>
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl text-[#E8E0D0] font-normal tracking-tight">
              Engineering Intelligent Digital Solutions.
            </h2>
            <p className="text-sm text-[#E8E0D0]/65 mt-2 max-w-xl">
              Transforming complex business challenges into practical, maintainable digital products.
              Now accepting select commissions for Summer &apos;26.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onStartProject}
              className="inline-flex items-center bg-[#E8E0D0] text-[#0C0A09] px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] shadow-md shadow-black/30"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
            </button>
            <a
              href="mailto:contact@virtanexlabs.com"
              className="inline-flex items-center border border-[#E8E0D0]/20 text-[#E8E0D0] px-6 py-3 rounded-full text-xs font-semibold hover:border-[#B87333] hover:text-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
            >
              <Mail className="w-3.5 h-3.5 mr-2" />
              <span>contact@virtanexlabs.com</span>
            </a>
          </div>
        </div>

        {/* 4-Column Navigation & Corporate Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-4">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={scrollToTop}
              className="flex items-center text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] rounded-lg group"
              aria-label="Back to top"
            >
              <svg className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#E8E0D0" strokeWidth="1" strokeOpacity="0.85" />
                <circle cx="12" cy="12" r="4.5" fill="#B87333" />
              </svg>
              <span className="ml-2 font-fraunces text-[#E8E0D0] text-xl font-medium tracking-tight">
                Virtanex Labs
              </span>
            </button>

            <p className="text-sm text-[#E8E0D0]/70 leading-relaxed">
              A Finland-based remote technology company focused on building intelligent software,
              AI-powered solutions, and scalable digital products.
            </p>

            <div className="space-y-2 text-xs text-[#E8E0D0]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B87333]" />
                <span>Base: Finland (UTC+2)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#B87333]" />
                <span>Model: Remote / International Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#B87333]" />
                <span>Industry: Information Technology & Software Development</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#E8E0D0]/40 font-mono">
              CORPORATE PROFILE YEAR: 2026
            </div>
          </div>

          {/* Column 2: 10 Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Core Services
            </h3>
            <ul className="space-y-2 text-xs text-[#E8E0D0]/70">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Custom Software Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Data Engineering & Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Enterprise System Integration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Business Process Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Cloud & DevOps Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Digital Product & SaaS Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  UI/UX & Digital Product Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Software Testing & QA
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  IoT & Industrial Software Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Profile & Approach (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Studio & Approach
            </h3>
            <ul className="space-y-2 text-xs text-[#E8E0D0]/70">
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  About Us & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Mission & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Seven Core Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('process')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  7-Phase Engineering Lifecycle
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Security & Quality Commitment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Remote Working Model (40h/wk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('team')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Team & Organization Structure
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('journal')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Emerging Systems Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('work')}
                  className="hover:text-[#B87333] transition-colors text-left"
                >
                  Selected Client Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Inquiries (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Direct Contact
            </h3>
            <div className="space-y-3 text-xs text-[#E8E0D0]/75">
              <div>
                <span className="text-[#E8E0D0]/40 block mb-1">General Inquiries</span>
                <a
                  href="mailto:contact@virtanexlabs.com"
                  className="hover:text-[#B87333] transition-colors font-medium break-all"
                >
                  contact@virtanexlabs.com
                </a>
              </div>

              <div>
                <span className="text-[#E8E0D0]/40 block mb-1">Official Website</span>
                <a
                  href="https://virtanexlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B87333] transition-colors font-medium"
                >
                  virtanexlabs.com
                </a>
              </div>

              <div>
                <span className="text-[#E8E0D0]/40 block mb-1">Location</span>
                <span className="text-[#E8E0D0]">Finland / International</span>
              </div>

              <div className="p-3 rounded-xl bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                <span className="text-[11px] text-[#B87333] block font-semibold mb-0.5">
                  BOOKING SUMMER &apos;26
                </span>
                <span className="text-[11px] text-[#E8E0D0]/60">
                  Select openings for technical advisory and full-cycle engineering.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8E0D0]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E8E0D0]/50 font-sans">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span className="font-fraunces text-sm text-[#E8E0D0] font-normal">Virtanex Labs</span>
            <span aria-hidden="true">·</span>
            <span>Building Technology. Enabling Possibilities.</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 Virtanex Labs. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Finland Base</span>
            <span aria-hidden="true">·</span>
            <span>Remote-First</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#E8E0D0]/70 hover:text-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
