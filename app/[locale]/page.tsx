import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/Hero';
import { TechMarquee } from '@/components/sections/tech-marquee';
import { AboutSection } from '@/components/sections/about-section';
import {
  FaqPreview,
  IndustriesPreview,
  ProcessPreview,
  ServicesOverview,
  WhyPreview,
  WorkPreview,
} from '@/components/sections/home-sections';
import { CtaBand } from '@/components/sections/cta-band';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor(locale as Locale) };
}

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <AboutSection />
      <ServicesOverview />
      <ProcessPreview />
      <WorkPreview />
      <IndustriesPreview />
      <WhyPreview />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
