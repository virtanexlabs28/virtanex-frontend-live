'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/WorkSection';
import { StudioProfile } from '@/components/StudioProfile';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className="min-h-screen bg-[#0C0A09] text-[#E8E0D0] tracking-[-0.015em] selection:bg-[#B87333]/30 selection:text-[#E8E0D0]"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      {/* Fixed Navigation over Hero */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Cinematic Hero (100dvh) with signature Magnetic Headline */}
      <Hero onStartProject={handleOpenBooking} />

      {/* Selected Works & Case Studies */}
      <WorkSection />

      {/* Complete Virtanex Labs Corporate Profile & Interactive Service Catalog */}
      <StudioProfile onStartProject={handleOpenBooking} />

      {/* Contact, Booking & Inquiries */}
      <ContactSection onStartProject={handleOpenBooking} />

      {/* Corporate Comprehensive Footer */}
      <Footer
        onStartProject={handleOpenBooking}
        onNavigate={handleNavigate}
      />

      {/* Interactive Booking & Discovery Consultation Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
