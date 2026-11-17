'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MagneticWord } from './MagneticWord';

interface HeroProps {
  onStartProject?: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  const BG_IMAGE =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80';

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0C0A09]"
      style={{ height: '100dvh' }}
      aria-label="Halcyon° Hero"
    >
      {/* 1. Background Image (z-10) with breathing animation */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat anim-breathe z-10 will-change-transform"
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        role="img"
        aria-label="Misty valley with pine trees at dusk, the sky glowing amber"
      />

      {/* 2. Atmospheric Overlay (z-20): 35% flat wash + directional gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[#0C0A09]/35 z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09]/30 via-transparent to-[#0C0A09]/85" />
      </div>

      {/* 3. Grain Texture (z-25): Inline SVG noise filter */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.35] z-25"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="hero-grain-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain-noise)" />
        </svg>
      </div>

      {/* 4. Wordmark (z-40): h1 with MagneticWord */}
      <div className="absolute top-[20%] left-0 right-0 flex justify-center pointer-events-none z-40 px-4">
        <h1
          className="font-fraunces font-medium text-[#E8E0D0] text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] xl:text-[12vw] tracking-[-0.045em] leading-[0.9] text-center"
          aria-label="Virtanex Labs"
          style={{ letterSpacing: '-0.045em', lineHeight: 0.9 }}
        >
          <MagneticWord text="Virtanex" />
        </h1>
      </div>

      {/* 5. Sub-headline (z-40) */}
      <div className="absolute top-[calc(20%+14vw)] sm:top-[calc(20%+12vw)] left-0 right-0 flex justify-center px-5 pointer-events-none z-40">
        <p
          className="font-fraunces italic font-normal text-[#E8E0D0]/70 text-base sm:text-xl md:text-2xl text-center max-w-2xl anim-fade-up"
          style={{ animationDelay: '1.1s' }}
        >
          Engineering Intelligent Digital Solutions.
        </p>
      </div>

      {/* 6. Bottom-left descriptor (z-40) */}
      <div
        className="hidden sm:block absolute bottom-12 left-10 md:left-14 max-w-[280px] z-40 anim-fade-up"
        style={{ animationDelay: '1.35s' }}
      >
        <p className="text-sm text-[#E8E0D0]/60 leading-relaxed">
          We build intelligent software, AI-powered solutions, and scalable digital products for
          ambitious companies. Reliable technology, engineered thoughtfully, shipped boldly.
        </p>
      </div>

      {/* 7. Bottom-right CTA block (z-40) */}
      <div
        className="absolute bottom-10 sm:bottom-12 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 z-40 anim-fade-up"
        style={{ animationDelay: '1.5s' }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[#E8E0D0]/40">
          BOOKING SUMMER &apos;26
        </p>

        <button
          onClick={onStartProject}
          className="group inline-flex items-center bg-[#E8E0D0] text-[#0C0A09] rounded-full pl-5 pr-1 py-1 text-sm font-medium hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333] shadow-lg shadow-black/40"
        >
          <span>Start a project</span>
          <span
            className="w-9 h-9 rounded-full bg-[#B87333] flex items-center justify-center ml-3 transition-transform duration-300 group-hover:rotate-45 text-[#E8E0D0]"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </section>
  );
}
