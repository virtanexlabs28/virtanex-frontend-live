'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export function Navbar({ onOpenBooking, onNavigate }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Apply opacity-100 on mount as specified
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'Studio', id: 'studio' },
    { label: 'Process', id: 'process' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 sm:px-7 py-5 transition-opacity duration-[600ms] delay-200 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Main Navigation"
      >
        {/* Left: Logo & Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333] rounded-lg group"
          aria-label="Virtanex Labs Home"
        >
          {/* Inline SVG Logo (24x24, outer ring 1px stroke text-cream, inner filled circle text-copper) */}
          <svg
            className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#E8E0D0"
              strokeWidth="1"
              strokeOpacity="0.85"
            />
            <circle
              cx="12"
              cy="12"
              r="4.5"
              fill="#B87333"
            />
          </svg>
          <span className="ml-2 font-fraunces text-[#E8E0D0] text-lg font-medium tracking-tight">
            Virtanex Labs
          </span>
        </button>

        {/* Centre Pill (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-[#E8E0D0]/10 backdrop-blur-md border border-[#E8E0D0]/15 rounded-full px-2 py-1.5 items-center gap-1 shadow-lg shadow-black/20">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-[#E8E0D0]/75 hover:bg-[#E8E0D0]/15 hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right (Desktop CTA) */}
        <div className="hidden md:inline-flex items-center">
          <button
            onClick={onOpenBooking}
            className="bg-[#E8E0D0] text-[#0C0A09] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333] shadow-md shadow-black/30"
          >
            Book a call
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden ml-auto w-9 h-9 rounded-full bg-[#E8E0D0]/10 border border-[#E8E0D0]/20 flex items-center justify-center text-[#E8E0D0] hover:bg-[#E8E0D0]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </nav>

      {/* Mobile Drawer (Full-screen overlay) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[120] bg-[#0C0A09]/95 backdrop-blur-xl flex flex-col justify-between p-7 md:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#E8E0D0" strokeWidth="1" strokeOpacity="0.85" />
                <circle cx="12" cy="12" r="4.5" fill="#B87333" />
              </svg>
              <span className="ml-2 font-fraunces text-[#E8E0D0] text-xl font-medium">Virtanex Labs</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-[#E8E0D0]/10 border border-[#E8E0D0]/20 flex items-center justify-center text-[#E8E0D0] hover:bg-[#E8E0D0]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left font-fraunces text-3xl font-medium text-[#E8E0D0] hover:text-[#B87333] transition-colors py-1 flex items-center justify-between border-b border-[#E8E0D0]/10 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs uppercase tracking-widest text-[#E8E0D0]/40 font-sans">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#E8E0D0]/15">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full bg-[#E8E0D0] text-[#0C0A09] text-base font-semibold py-3.5 rounded-full hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333]"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-center text-[#E8E0D0]/40 tracking-wider">
              HELSINKI · REMOTE · EST. 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}
