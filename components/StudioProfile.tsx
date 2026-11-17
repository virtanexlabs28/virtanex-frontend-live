'use client';

import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Database,
  GitMerge,
  Workflow,
  Cloud,
  Layers,
  Palette,
  CheckCircle2,
  Radio,
  Building2,
  Globe2,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface StudioProfileProps {
  onStartProject?: () => void;
}

export function StudioProfile({ onStartProject }: StudioProfileProps) {
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  const [activeTechCategory, setActiveTechCategory] = useState<string>('all');
  const [activeProcessPhase, setActiveProcessPhase] = useState<number>(0);

  const services = [
    {
      id: 'custom-software',
      icon: Code2,
      number: '01',
      title: 'Custom Software Development',
      summary:
        'We design and develop custom software applications that address specific operational and business requirements.',
      capabilities: [
        'Custom web application development',
        'Enterprise software development',
        'SaaS platform development',
        'Business management systems',
        'Customer and employee portals',
        'Backend application development',
        'REST API development',
        'Microservices architecture',
        'Application modernization',
        'Ongoing software maintenance',
      ],
    },
    {
      id: 'ai-ml',
      icon: Cpu,
      number: '02',
      title: 'Artificial Intelligence & Machine Learning',
      summary:
        'We help businesses integrate artificial intelligence into their products, services, and internal operations.',
      capabilities: [
        'AI-powered application development',
        'AI assistants and conversational systems',
        'Large Language Model (LLM) integration',
        'Retrieval-Augmented Generation (RAG)',
        'Intelligent workflow development',
        'Document processing and information extraction',
        'Machine learning integration',
        'Predictive analytics',
        'Anomaly detection',
        'AI-powered business automation',
      ],
    },
    {
      id: 'data-engineering',
      icon: Database,
      number: '03',
      title: 'Data Engineering & Analytics',
      summary:
        'We develop data solutions that help organizations collect, process, organize, and understand information.',
      capabilities: [
        'Data pipeline development',
        'Data ingestion and transformation',
        'ETL and ELT workflows',
        'Database architecture',
        'Data integration',
        'Data processing automation',
        'Business intelligence dashboards',
        'Data visualization',
        'Reporting systems',
        'Data quality validation',
      ],
    },
    {
      id: 'system-integration',
      icon: GitMerge,
      number: '04',
      title: 'Enterprise System Integration',
      summary:
        'We connect business applications, platforms, databases, and external services to create unified technology environments.',
      capabilities: [
        'Third-party API integrations',
        'ERP integrations',
        'CRM integrations',
        'Payment gateway integrations',
        'Enterprise application integration',
        'Database synchronization',
        'Webhook development',
        'Legacy system integration',
        'Cross-platform data exchange',
        'Integration testing',
      ],
    },
    {
      id: 'process-automation',
      icon: Workflow,
      number: '05',
      title: 'Business Process Automation',
      summary:
        'We help organizations reduce repetitive manual work through intelligent automation and connected workflows.',
      capabilities: [
        'Business workflow automation',
        'Approval and notification systems',
        'Automated reporting',
        'Document processing workflows',
        'Email automation',
        'CRM automation',
        'Data synchronization',
        'AI-powered workflows',
        'API-based automation',
        'Process optimization',
      ],
    },
    {
      id: 'cloud-devops',
      icon: Cloud,
      number: '06',
      title: 'Cloud & DevOps Engineering',
      summary:
        'We build and manage reliable infrastructure that supports modern applications and business operations.',
      capabilities: [
        'Cloud infrastructure setup',
        'Docker and containerization',
        'Docker Compose deployments',
        'CI/CD pipeline development',
        'Linux server management',
        'Application deployment',
        'Database deployment and management',
        'Infrastructure monitoring',
        'Logging and observability',
        'Backup and recovery planning',
        'Application performance optimization',
      ],
    },
    {
      id: 'digital-product',
      icon: Layers,
      number: '07',
      title: 'Digital Product & SaaS Engineering',
      summary:
        'We help businesses and entrepreneurs turn product concepts into functional, scalable digital platforms.',
      capabilities: [
        'SaaS product development',
        'Minimum Viable Product (MVP) development',
        'Product architecture and planning',
        'Subscription-based platforms',
        'Multi-tenant applications',
        'User and access management',
        'Subscription and billing integrations',
        'Product feature development',
        'Product maintenance',
        'Technical product support',
      ],
    },
    {
      id: 'ui-ux',
      icon: Palette,
      number: '08',
      title: 'UI/UX & Digital Product Design',
      summary:
        'We design intuitive digital experiences that balance usability, functionality, and visual quality.',
      capabilities: [
        'User interface design',
        'User experience design',
        'Web application design',
        'Dashboard and admin panel design',
        'Responsive interface design',
        'Design systems',
        'Interactive prototypes',
        'User journey planning',
        'Product interface improvements',
      ],
    },
    {
      id: 'qa-testing',
      icon: CheckCircle2,
      number: '09',
      title: 'Software Testing & Quality Assurance',
      summary:
        'We help ensure software products operate reliably through structured testing and quality assurance.',
      capabilities: [
        'Manual software testing',
        'Automated testing',
        'API testing',
        'Integration testing',
        'End-to-end testing',
        'Performance testing',
        'Regression testing',
        'Functional testing',
        'Quality assurance processes',
        'Test documentation',
      ],
    },
    {
      id: 'iot-industrial',
      icon: Radio,
      number: '10',
      title: 'IoT & Industrial Software Solutions',
      summary:
        'We develop software solutions that connect devices, process operational data, and provide visibility into connected systems.',
      capabilities: [
        'IoT application development',
        'Sensor and device integrations',
        'Real-time monitoring dashboards',
        'Telemetry data processing',
        'Industrial data visualization',
        'Equipment monitoring applications',
        'Predictive maintenance prototypes',
        'Anomaly detection systems',
        'IoT platform integrations',
        'Data collection and alerting systems',
      ],
    },
  ];

  const techStack = [
    { category: 'frontend', name: 'Next.js', type: 'Frontend Framework' },
    { category: 'frontend', name: 'React', type: 'UI Library' },
    { category: 'frontend', name: 'TypeScript', type: 'Type Safety' },
    { category: 'frontend', name: 'Tailwind CSS', type: 'Styling Architecture' },
    { category: 'backend', name: 'Node.js', type: 'Server Runtime' },
    { category: 'backend', name: 'NestJS', type: 'Enterprise Backend' },
    { category: 'backend', name: 'Express.js', type: 'REST Routing' },
    { category: 'backend', name: 'Python', type: 'Services & Scripting' },
    { category: 'database', name: 'PostgreSQL', type: 'Relational Database' },
    { category: 'database', name: 'MySQL', type: 'Relational Store' },
    { category: 'database', name: 'MongoDB', type: 'Document Database' },
    { category: 'database', name: 'Redis', type: 'In-Memory Cache' },
    { category: 'ai-data', name: 'LLM APIs & RAG', type: 'Cognitive Pipelines' },
    { category: 'ai-data', name: 'Machine Learning', type: 'Predictive Models' },
    { category: 'ai-data', name: 'Data Processing', type: 'ETL Pipelines' },
    { category: 'cloud', name: 'Docker & Compose', type: 'Containerization' },
    { category: 'cloud', name: 'CI/CD Pipelines', type: 'Automated Delivery' },
    { category: 'cloud', name: 'Linux / VPS', type: 'Server Infrastructure' },
    { category: 'automation', name: 'n8n Workflows', type: 'Orchestration' },
    { category: 'automation', name: 'Webhooks & APIs', type: 'System Glue' },
    { category: 'design', name: 'Figma', type: 'Design System' },
  ];

  const filteredTech =
    activeTechCategory === 'all'
      ? techStack
      : techStack.filter((t) => t.category === activeTechCategory);

  const industries = [
    { name: 'Financial Services', desc: 'Financial applications, payment integrations, real-time analytics & regulatory reporting.' },
    { name: 'Manufacturing & Industrial', desc: 'Industrial monitoring applications, IoT sensor integrations, telemetry & predictive maintenance.' },
    { name: 'Energy & Utilities', desc: 'Monitoring platforms, operational reporting, automated infrastructure applications.' },
    { name: 'Healthcare', desc: 'Healthcare management applications, administrative workflow automation, clinical data solutions.' },
    { name: 'Retail & E-commerce', desc: 'E-commerce platforms, inventory and order management, automated payment systems.' },
    { name: 'Technology & Software', desc: 'SaaS development, enterprise platforms, product engineering, AI integrations, cloud architecture.' },
    { name: 'Professional Services', desc: 'Business management platforms, CRM solutions, client portals & automated workflows.' },
  ];

  const engagementModels = [
    {
      title: 'Project-Based Development',
      badge: 'Fixed Scope',
      desc: 'Clearly defined projects with agreed deliverables, milestones, timelines, and technical requirements.',
      bestFor: 'Custom applications, SaaS products, business platforms, API integrations, and automation projects.',
    },
    {
      title: 'Dedicated Development Teams',
      badge: 'Capacity Expansion',
      desc: 'Remote engineering resources that collaborate seamlessly with a client’s existing technical team.',
      bestFor: 'Supporting ongoing development, building new features, frontend/backend engineering, long-term technical projects.',
    },
    {
      title: 'Long-Term Technology Partnership',
      badge: 'Continuous Evolution',
      desc: 'Ongoing relationships to support software development, maintenance, integrations, and technical architecture.',
      bestFor: 'Technology companies, software product businesses, growing startups requiring continuous engineering support.',
    },
    {
      title: 'Technical Consulting',
      badge: 'Strategic Guidance',
      desc: 'Advisory and architecture support to help leadership make sound, future-proof technology decisions.',
      bestFor: 'Software architecture planning, technology assessments, application modernization, infrastructure strategy.',
    },
  ];

  const processPhases = [
    {
      phase: 'Phase 01',
      title: 'Discovery & Requirements',
      detail:
        'We analyze your business objectives, operational challenges, project expectations, and technical landscape to establish a solid foundation.',
    },
    {
      phase: 'Phase 02',
      title: 'Planning & Architecture',
      detail:
        'We define the project scope, technical architecture, development milestones, technology stack, and delivery strategy.',
    },
    {
      phase: 'Phase 03',
      title: 'Design & Prototyping',
      detail:
        'We craft user interfaces, design systems, technical specifications, and interactive prototypes for early validation.',
    },
    {
      phase: 'Phase 04',
      title: 'Engineering & Development',
      detail:
        'Our distributed engineering team builds the solution using modern frameworks, clean code practices, and modular patterns.',
    },
    {
      phase: 'Phase 05',
      title: 'Testing & Quality Assurance',
      detail:
        'Rigorous automated and manual testing validating functionality, performance, security, and edge-case reliability.',
    },
    {
      phase: 'Phase 06',
      title: 'Deployment & Delivery',
      detail:
        'We configure production infrastructure, containerized deployments, monitoring pipelines, and complete agreed handovers.',
    },
    {
      phase: 'Phase 07',
      title: 'Maintenance & Improvement',
      detail:
        'We provide ongoing improvements, technical support, security patches, and scaling optimizations.',
    },
  ];

  const coreValues = [
    { title: 'Innovation', desc: 'We continuously explore modern technologies and better approaches to solving complex problems.' },
    { title: 'Engineering Excellence', desc: 'We prioritize clean architecture, maintainable code, reliability, security, and quality.' },
    { title: 'Collaboration', desc: 'We believe successful technology solutions come from communication, teamwork, and shared objectives.' },
    { title: 'Transparency', desc: 'We value honest communication, realistic commitments, and clear project expectations.' },
    { title: 'Accountability', desc: 'We take responsibility for our work, technical decisions, and delivery commitments.' },
    { title: 'Continuous Learning', desc: 'We encourage experimentation, knowledge sharing, and relentless technical improvement.' },
    { title: 'Customer Focus', desc: 'We aim to understand each client’s business objectives and deliver solutions that create practical value.' },
  ];

  return (
    <div id="studio" className="scroll-mt-20 bg-[#0C0A09] text-[#E8E0D0] py-24 px-5 sm:px-10 md:px-14">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Studio Kicker & Corporate Overview */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
            <div className="lg:max-w-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B87333] mb-4">
                <span>Virtanex Labs</span>
                <span aria-hidden="true">·</span>
                <span>Corporate Profile</span>
                <span aria-hidden="true">·</span>
                <span>Finland</span>
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#E8E0D0] leading-tight">
                Engineering Intelligent Digital Solutions.
              </h2>
            </div>
            <div className="lg:max-w-lg space-y-6 text-[#E8E0D0]/70 text-sm sm:text-base leading-relaxed">
              <p>
                Virtanex Labs is a Finland-based remote technology company focused on building intelligent
                software, AI-powered solutions, and scalable digital products.
              </p>
              <p>
                We help businesses, startups, and established organizations transform complex ideas into
                practical digital solutions through modern software engineering, artificial intelligence,
                data technologies, automation, and cloud infrastructure.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#E8E0D0]/50 font-mono">
                <div>BASE: FINLAND (UTC+2)</div>
                <div>MODEL: REMOTE-FIRST</div>
                <div>YEAR: 2026</div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-[#E8E0D0]/10">
            <div className="p-8 rounded-2xl bg-[#E8E0D0]/[0.02] border border-[#E8E0D0]/10 hover:border-[#B87333]/40 transition-colors">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Our Mission
              </span>
              <h3 className="font-fraunces text-2xl text-[#E8E0D0] mt-3 mb-4 font-normal">
                Practical Intelligence, Accessible Value
              </h3>
              <p className="text-sm text-[#E8E0D0]/70 leading-relaxed">
                To empower businesses through intelligent technology, innovative software engineering,
                and reliable digital solutions. We transform friction into seamless digital experiences.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#E8E0D0]/[0.02] border border-[#E8E0D0]/10 hover:border-[#B87333]/40 transition-colors">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Our Vision
              </span>
              <h3 className="font-fraunces text-2xl text-[#E8E0D0] mt-3 mb-4 font-normal">
                Engineering Excellence & Lasting Impact
              </h3>
              <p className="text-sm text-[#E8E0D0]/70 leading-relaxed">
                To become a trusted international technology partner recognized for engineering excellence,
                intelligent solutions, and meaningful digital innovation that endures.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Foundational Principles
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] hover:bg-[#E8E0D0]/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[#B87333] tabular-nums">0{idx + 1}</span>
                  <h3 className="font-fraunces text-lg text-[#E8E0D0] font-normal">{val.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#E8E0D0]/65 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services & Capabilities Explorer */}
        <section id="services" className="scroll-mt-20 border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Service Catalog
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
                Ten Disciplines of Technical Excellence
              </h2>
            </div>
            <p className="text-sm text-[#E8E0D0]/60 max-w-md">
              From standalone SaaS systems to multi-tiered AI and industrial telemetry pipelines,
              explore our capabilities below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Service Selection List */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {services.map((srv, idx) => {
                const IconComponent = srv.icon;
                const isActive = activeServiceTab === idx;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveServiceTab(idx)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] ${
                      isActive
                        ? 'bg-[#E8E0D0]/10 border-[#B87333] text-[#E8E0D0]'
                        : 'border-[#E8E0D0]/10 bg-transparent text-[#E8E0D0]/70 hover:bg-[#E8E0D0]/5 hover:text-[#E8E0D0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#B87333]' : 'text-[#E8E0D0]/40 group-hover:text-[#B87333]'
                        }`}
                      />
                      <span className="text-sm font-medium">{srv.title}</span>
                    </div>
                    <span className="font-mono text-xs text-[#E8E0D0]/30 tabular-nums">
                      {srv.number}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Detail Panel */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-[#E8E0D0]/[0.03] border border-[#E8E0D0]/15 relative">
              <div className="flex items-center justify-between border-b border-[#E8E0D0]/10 pb-6 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B87333]">
                    Capability {services[activeServiceTab].number}
                  </span>
                  <h3 className="font-fraunces text-2xl sm:text-3xl text-[#E8E0D0] font-normal mt-1">
                    {services[activeServiceTab].title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#B87333]/15 border border-[#B87333]/30 flex items-center justify-center text-[#B87333]">
                  {React.createElement(services[activeServiceTab].icon, { className: 'w-6 h-6' })}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#E8E0D0]/80 leading-relaxed mb-8">
                {services[activeServiceTab].summary}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#E8E0D0]/40 mb-4">
                  Core Inclusions & Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[activeServiceTab].capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E8E0D0]/75"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B87333] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E8E0D0]/10 flex items-center justify-between">
                <span className="text-xs text-[#E8E0D0]/40">
                  Ready to deploy this capability?
                </span>
                <button
                  onClick={onStartProject}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B87333] font-semibold hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Technical Expertise */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Modern Tooling
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
                Technology & Technical Stack
              </h2>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-[#E8E0D0]/5 border border-[#E8E0D0]/10 rounded-xl">
              {[
                { id: 'all', label: 'All' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'database', label: 'Databases' },
                { id: 'ai-data', label: 'AI & Data' },
                { id: 'cloud', label: 'Cloud' },
                { id: 'automation', label: 'Automation' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTechCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] ${
                    activeTechCategory === tab.id
                      ? 'bg-[#E8E0D0] text-[#0C0A09]'
                      : 'text-[#E8E0D0]/60 hover:text-[#E8E0D0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredTech.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] hover:border-[#B87333]/40 transition-colors"
              >
                <p className="text-sm font-medium text-[#E8E0D0]">{item.name}</p>
                <p className="text-xs text-[#E8E0D0]/40 mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Sector Specialization
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
              Industries We Serve
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-fraunces text-xl text-[#E8E0D0] font-normal mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8E0D0]/65 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Flexible Collaboration
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
              Our Engagement Models
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engagementModels.map((model, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] flex flex-col justify-between hover:border-[#B87333]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#B87333] font-medium">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-[#E8E0D0]/50 font-mono">{model.badge}</span>
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#E8E0D0] font-normal mb-3">
                    {model.title}
                  </h3>
                  <p className="text-sm text-[#E8E0D0]/75 leading-relaxed mb-6">{model.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#E8E0D0]/10 text-xs text-[#E8E0D0]/50">
                  <span className="text-[#E8E0D0]/70 font-medium">Suitable for: </span>
                  {model.bestFor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7-Phase Development Process */}
        <section id="process" className="scroll-mt-20 border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Methodology
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
                Our 7-Phase Engineering Lifecycle
              </h2>
            </div>
            <p className="text-sm text-[#E8E0D0]/60 max-w-md">
              A structured, transparent development process ensuring predictable delivery and
              uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-6">
            {processPhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProcessPhase(idx)}
                className={`p-4 rounded-xl border text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333] ${
                  activeProcessPhase === idx
                    ? 'border-[#B87333] bg-[#E8E0D0]/10 text-[#E8E0D0]'
                    : 'border-[#E8E0D0]/10 bg-transparent text-[#E8E0D0]/60 hover:bg-[#E8E0D0]/5 hover:text-[#E8E0D0]'
                }`}
              >
                <div className="font-mono text-xs text-[#B87333] mb-1">{phase.phase}</div>
                <div className="text-xs font-semibold leading-snug line-clamp-2">{phase.title}</div>
              </button>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-[#E8E0D0]/[0.03] border border-[#E8E0D0]/15">
            <span className="text-xs font-mono text-[#B87333] uppercase">
              {processPhases[activeProcessPhase].phase} In Focus
            </span>
            <h3 className="font-fraunces text-2xl sm:text-3xl text-[#E8E0D0] font-normal mt-2 mb-4">
              {processPhases[activeProcessPhase].title}
            </h3>
            <p className="text-base text-[#E8E0D0]/80 leading-relaxed max-w-3xl">
              {processPhases[activeProcessPhase].detail}
            </p>
          </div>
        </section>

        {/* Security & Remote Model */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#B87333]" />
                <h3 className="font-fraunces text-2xl text-[#E8E0D0] font-normal">
                  Security & Quality Commitment
                </h3>
              </div>
              <p className="text-sm text-[#E8E0D0]/70 leading-relaxed mb-6">
                Security, reliability, and data protection are fundamental to our architecture. We enforce
                secure credential management, encrypted API communications, controlled access, and
                continuous testing.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#E8E0D0]/60">
                <div>· Role-Based Auth & Access</div>
                <div>· Encrypted API Traffic</div>
                <div>· Regular Validation Tests</div>
                <div>· Backup & Disaster Recovery</div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Globe2 className="w-5 h-5 text-[#B87333]" />
                <h3 className="font-fraunces text-2xl text-[#E8E0D0] font-normal">
                  Remote Working Model
                </h3>
              </div>
              <p className="text-sm text-[#E8E0D0]/70 leading-relaxed mb-6">
                Operating with a remote-first distributed model based in Finland, we collaborate with
                clients and talent across timezones with structured project management and transparent
                GitHub workflows.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#E8E0D0]/60">
                <div>· 40h Standard Week</div>
                <div>· 5 Working Days (8h/day)</div>
                <div>· Digital Task Coordination</div>
                <div>· Transparent Git Workflows</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Organizational Structure */}
        <section id="team" className="scroll-mt-20 border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Organization Structure
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
                Team & Leadership
              </h2>
            </div>
            <p className="text-sm text-[#E8E0D0]/60 max-w-md">
              A collaborative structure combining business strategy, technical leadership, senior
              engineering, design systems, and operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business & Management */}
            <div className="p-7 rounded-2xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-[#B87333]" />
                <h3 className="font-fraunces text-xl text-[#E8E0D0] font-normal">
                  Business & Management
                </h3>
              </div>
              <p className="text-xs text-[#E8E0D0]/60 mb-6 leading-relaxed">
                Strategic alignment, client relationships, realistic commitments, and international operations.
              </p>
              <div className="space-y-2.5 text-xs text-[#E8E0D0]/80">
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Founder / Chief Executive Officer</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Business Development Manager</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Sales and Strategic Partnerships</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Finance and Administration</span>
                </div>
              </div>
            </div>

            {/* Technology & Engineering */}
            <div className="p-7 rounded-2xl border border-[#B87333]/30 bg-[#E8E0D0]/[0.03] relative">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-[#B87333]" />
                <h3 className="font-fraunces text-xl text-[#E8E0D0] font-normal">
                  Technology & Engineering
                </h3>
              </div>
              <p className="text-xs text-[#E8E0D0]/60 mb-6 leading-relaxed">
                Clean architecture, distributed systems, machine learning models, and automated QA.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E8E0D0]/80">
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Chief Technology Officer</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Full-Stack Developers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Frontend Developers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Backend Developers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">AI / ML Engineers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Data Engineers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">DevOps Engineers</span>
                </div>
                <div className="p-2 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Software QA Engineers</span>
                </div>
              </div>
            </div>

            {/* Design & Marketing */}
            <div className="p-7 rounded-2xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-[#B87333]" />
                <h3 className="font-fraunces text-xl text-[#E8E0D0] font-normal">
                  Design & Marketing
                </h3>
              </div>
              <p className="text-xs text-[#E8E0D0]/60 mb-6 leading-relaxed">
                Usability, design tokens, interactive prototypes, and product communication.
              </p>
              <div className="space-y-2.5 text-xs text-[#E8E0D0]/80">
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">UI/UX Designers</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Digital Product Designers</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Marketing Specialists</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#E8E0D0]/5 border border-[#E8E0D0]/10">
                  <span className="font-medium text-[#E8E0D0]">Social Media & Content Leads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
                Collaboration
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
                Partnership Opportunities
              </h2>
            </div>
            <p className="text-sm text-[#E8E0D0]/60 max-w-md">
              Virtanex Labs welcomes collaboration with technology providers, consultancies, agencies,
              and scaling product companies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Software & IT Consultancies',
                desc: 'Subcontracting and dedicated development teams to expand delivery capacity with predictable European standards.',
              },
              {
                title: 'Digital Transformation Agencies',
                desc: 'Deep technical implementation for complex web applications, modern microservices, and legacy modernizations.',
              },
              {
                title: 'AI & SaaS Companies',
                desc: 'High-throughput RAG pipelines, autonomous agent integration, and scalable multitenant architectures.',
              },
              {
                title: 'Startups & Entrepreneurs',
                desc: 'End-to-end technical co-development, MVP architectures, and long-term technical partnerships.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] flex flex-col justify-between hover:border-[#B87333]/40 transition-colors"
              >
                <div>
                  <h3 className="font-fraunces text-lg text-[#E8E0D0] font-normal mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8E0D0]/65 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Work With Virtanex Labs */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Competitive Advantage
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
              Why Work With Virtanex Labs?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Flexible Engineering Capacity',
                desc: 'Adaptable development support according to specific project requirements, timelines, and scaling phases.',
              },
              {
                title: 'Modern Technology',
                desc: 'We engineer with contemporary frameworks, cloud-native infrastructure, and proven tooling that avoids technical debt.',
              },
              {
                title: 'AI-Driven Approach',
                desc: 'We explore practical opportunities to integrate artificial intelligence into real software and operational workflows.',
              },
              {
                title: 'Scalable Solutions',
                desc: 'We focus on maintainable architectures that can evolve seamlessly alongside growing business volume.',
              },
              {
                title: 'Collaborative Delivery',
                desc: 'We work alongside client leadership through direct, transparent communication and structured git management.',
              },
              {
                title: 'Long-Term Perspective',
                desc: 'We aim to establish enduring relationships rather than focusing solely on transactional handoffs.',
              },
            ].map((why, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] hover:bg-[#E8E0D0]/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B87333]" />
                  <h3 className="font-fraunces text-lg text-[#E8E0D0] font-normal">{why.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#E8E0D0]/65 leading-relaxed">{why.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment & Ethos */}
        <section className="border-t border-[#E8E0D0]/10 pt-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#E8E0D0]/[0.04] to-[#0C0A09] border border-[#E8E0D0]/15 relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B87333] font-medium">
                Our Solemn Commitment
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl text-[#E8E0D0] font-normal leading-snug">
                &ldquo;Every business has unique challenges and objectives. We approach each project with curiosity, responsibility, and technical discipline.&rdquo;
              </h2>
              <p className="text-sm sm:text-base text-[#E8E0D0]/70 leading-relaxed">
                We build solutions that are not only functional but also reliable, maintainable, and aligned with real business needs. Meaningful innovation comes from combining the right people, the right technology, and a clear understanding of the problem.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E8E0D0]/10">
                <div className="font-fraunces text-lg text-[#E8E0D0]">
                  Virtanex Labs · <span className="italic text-[#B87333]">Building Technology. Enabling Possibilities.</span>
                </div>
                <button
                  onClick={onStartProject}
                  className="inline-flex items-center gap-2 bg-[#E8E0D0] text-[#0C0A09] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#B87333] hover:text-[#E8E0D0] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B87333]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* R&D and Emerging Tech (Journal) */}
        <section id="journal" className="scroll-mt-20 border-t border-[#E8E0D0]/10 pt-16">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B87333] font-medium">
              Research & Innovation
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#E8E0D0] font-normal mt-2">
              Emerging Systems Journal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                date: 'March 2026',
                title: 'Autonomous LLM Agents in Scandinavian Logistics',
                desc: 'How multi-agent consensus protocols minimize hallucinations in automated customs and freight documentation.',
              },
              {
                date: 'February 2026',
                title: 'Designing Tabular Systems for High-Throughput Portfolios',
                desc: 'Why typography, optical weight compensation, and tabular numerals transform institutional financial consoles.',
              },
              {
                date: 'January 2026',
                title: 'Sensor Telemetry at the Edge with Zero-Loss WebSockets',
                desc: 'Building resilient sub-50ms diagnostic telemetry pipelines in clinical trial environments.',
              },
            ].map((entry, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E8E0D0]/10 bg-[#E8E0D0]/[0.02] flex flex-col justify-between hover:border-[#B87333]/40 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-[#B87333]">{entry.date}</span>
                  <h3 className="font-fraunces text-xl text-[#E8E0D0] font-normal mt-2 mb-3">
                    {entry.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8E0D0]/65 leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
