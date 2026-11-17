'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/WorkSection';
import { StudioProfile } from '@/components/StudioProfile';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

export default function App() {
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
    <div
      className="min-h-screen bg-[#0C0A09] text-[#E8E0D0] tracking-[-0.015em] selection:bg-[#B87333]/30 selection:text-[#E8E0D0]"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <Navbar onOpenBooking={handleOpenBooking} onNavigate={handleNavigate} />
      <Hero onStartProject={handleOpenBooking} />
      <WorkSection />
      <StudioProfile onStartProject={handleOpenBooking} />
      <ContactSection onStartProject={handleOpenBooking} />
      <Footer onStartProject={handleOpenBooking} onNavigate={handleNavigate} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
