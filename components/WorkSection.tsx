'use client';

import React, { useState } from 'react';
import { ArrowUpRight, X, ExternalLink, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  deliverables: string[];
  metrics: string[];
  overview: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-kinetic',
    title: 'Aura Kinetic',
    category: 'Spatial Audio & Brand Identity',
    year: '2026',
    client: 'Aura Sound Labs (Stockholm)',
    description:
      'A holistic brand architecture and web audio platform for acoustic spatializers, blending physical precision with digital poise.',
    tags: ['Brand Identity', 'Next.js', 'WebAudio API', 'Creative Direction'],
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Comprehensive Design System & Type Hierarchy',
      'High-performance WebGL & WebAudio Real-Time Visualizer',
      'Custom Headless E-Commerce & Licensing Engine',
    ],
    metrics: ['+240% Direct Inbound Inquiries', '99.8% Lighthouse Performance Score', 'Awwwards Site of the Day'],
    overview:
      'Aura required a visual language that felt as rigorous as their acoustic hardware. We designed an austere, tactile editorial identity paired with a silky WebAudio experience that translates complex sound physics into intuitive visual motion.',
  },
  {
    id: 'kvantum-ai',
    title: 'Kvantum Intelligence',
    category: 'Enterprise AI & Workflow Platform',
    year: '2026',
    client: 'Kvantum Systems (Helsinki)',
    description:
      'Autonomous retrieval-augmented generation and document cognition engine for Scandinavian logistics and supply networks.',
    tags: ['AI Integration', 'LLM Agents', 'Distributed Architecture', 'Python / NestJS'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Multi-Agent LLM Orchestration Pipeline',
      'Real-Time Document Processing & Anomaly Detection',
      'Enterprise Role-Based Access & Audit Logging',
    ],
    metrics: ['8.4x Accelerated Document Ingestion', 'Zero Data Leakage Security Compliance', '14,000+ Daily Automated Dispatches'],
    overview:
      'Transforming high-volume multimodal logistics documents into structured, queryable knowledge graphs. Built with a focus on auditability, zero hallucinations, and sub-100ms vector search latency.',
  },
  {
    id: 'nordic-ledger',
    title: 'Nordic Ledger',
    category: 'Fintech & High-Throughput Analytics',
    year: '2025',
    client: 'Nordic Capital Partners',
    description:
      'Real-time liquidity and automated asset reporting system handling cross-border European settlements with tabular rigor.',
    tags: ['Data Engineering', 'PostgreSQL / Timescale', 'TypeScript', 'Fintech'],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Continuous ELT Pipeline with Microsecond Latency',
      'Multi-Currency Compliance & Regulatory Exporting',
      'Executive Financial Intelligence Console',
    ],
    metrics: ['€420M+ Monitored Asset Volume', 'Zero Reconciliation Discrepancies', 'Real-Time Cross-Border Telemetry'],
    overview:
      'Designed to replace archaic terminal interfaces with a serene, legible high-density data canvas. Tabular figures, dark mode optical balance, and instant keyboard shortcuts empower institutional portfolio managers.',
  },
  {
    id: 'valo-medical',
    title: 'Valo Biometrics',
    category: 'Connected Health & Industrial IoT',
    year: '2025',
    client: 'Valo Diagnostics Oy',
    description:
      'Clinical trial sensor telemetry and telemetry dashboard with automated anomaly detection for connected diagnostic sensors.',
    tags: ['IoT Systems', 'Real-time WebSocket', 'Data Quality', 'React / Tailwind'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Edge Gateway Sensor Protocol Integration',
      'Physiological Telemetry Visualizer with Trend Forecasting',
      'ISO 13485 & HIPAA Compliant Data Pipeline',
    ],
    metrics: ['Sub-50ms Sensor Telemetry Latency', '99.99% Pipeline Uptime', '350+ Clinical Units Deployed'],
    overview:
      'A life-critical telemetry platform uniting medical-grade wireless biometrics with an empathetic clinician interface. Clean typography and calm visual cues prevent alarm fatigue in fast-paced clinical environments.',
  },
];

export function WorkSection() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="scroll-mt-20 py-28 px-5 sm:px-10 md:px-14 bg-[#0C0A09] border-t border-[#E8E0D0]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B87333] mb-3">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>2025–2026</span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-[#E8E0D0] font-normal tracking-tight">
              Considered work, shipped boldly.
            </h2>
          </div>
          <p className="text-sm text-[#E8E0D0]/60 max-w-md leading-relaxed">
            Every engagement is bespoke. We unite aesthetic discipline with resilient engineering,
            delivering software and systems that command attention and stand the test of scale.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => setActiveStudy(study)}
              className="group cursor-pointer flex flex-col bg-[#0C0A09] border border-[#E8E0D0]/10 rounded-2xl overflow-hidden hover:border-[#B87333]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStudy(study);
                }
              }}
              aria-label={`View case study: ${study.title}`}
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${study.image}')` }}
                  role="img"
                  aria-label={study.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-[#0C0A09]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0C0A09]/70 backdrop-blur-md border border-[#E8E0D0]/20 flex items-center justify-center text-[#E8E0D0] group-hover:bg-[#B87333] group-hover:border-[#B87333] group-hover:text-[#E8E0D0] transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#E8E0D0]/80">
                  <span>{study.client}</span>
                  <span className="font-mono tabular-nums text-[#E8E0D0]/50">{study.year}</span>
                </div>
              </div>

              {/* Content info */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#B87333] mb-2 font-medium">
                    {study.category}
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#E8E0D0] font-normal mb-3 group-hover:text-[#B87333] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-[#E8E0D0]/65 leading-relaxed mb-6">
                    {study.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E0D0]/10 text-xs text-[#E8E0D0]/60">
                  {study.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center">
                      {tag}
                      {i < study.tags.length - 1 && (
                        <span className="mx-1.5 text-[#E8E0D0]/30" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Lightbox Modal */}
      {activeStudy && (
        <div
          className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={activeStudy.title}
        >
          <div className="bg-[#0C0A09] border border-[#E8E0D0]/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0C0A09]/95 backdrop-blur-md border-b border-[#E8E0D0]/10 p-6 flex items-center justify-between z-10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B87333]">
                  {activeStudy.category}
                </span>
                <h3 className="font-fraunces text-2xl sm:text-3xl text-[#E8E0D0] font-medium mt-1">
                  {activeStudy.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveStudy(null)}
                className="w-10 h-10 rounded-full bg-[#E8E0D0]/10 border border-[#E8E0D0]/20 flex items-center justify-center text-[#E8E0D0] hover:bg-[#B87333] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Image banner */}
              <div
                className="aspect-video w-full rounded-xl bg-cover bg-center overflow-hidden border border-[#E8E0D0]/10"
                style={{ backgroundImage: `url('${activeStudy.image}')` }}
                role="img"
                aria-label={activeStudy.title}
              />

              {/* Overview */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#E8E0D0]/40 mb-2">
                  Project Narrative
                </h4>
                <p className="text-base text-[#E8E0D0]/85 leading-relaxed font-normal">
                  {activeStudy.overview}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#E8E0D0]/40 mb-3">
                  Scope & Architectural Deliverables
                </h4>
                <div className="space-y-2">
                  {activeStudy.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[#E8E0D0]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#E8E0D0]/40 mb-3">
                  Measurable Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeStudy.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#E8E0D0]/5 border border-[#E8E0D0]/10"
                    >
                      <p className="text-sm font-medium text-[#E8E0D0]">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client note */}
              <div className="pt-6 border-t border-[#E8E0D0]/10 flex flex-wrap items-center justify-between text-xs text-[#E8E0D0]/50 gap-4">
                <span>Client: {activeStudy.client}</span>
                <span className="font-mono tabular-nums">Delivered {activeStudy.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
