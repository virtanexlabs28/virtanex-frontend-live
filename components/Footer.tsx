'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight, Clock, Globe, Mail, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBooking } from '@/components/BookingProvider';
import { useContent } from '@/components/ContentProvider';
import { HelsinkiTime } from '@/components/HelsinkiTime';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/components/LocaleLink';
import { Logo } from '@/components/Logo';
import { fmt } from '@/lib/format';

const linkClass =
  'text-left text-foreground/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent';

export function Footer() {
  const { site, services, ui } = useContent();
  const f = ui.footer;
  const { openBooking: onStartProject } = useBooking();
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="border-t border-border bg-background px-5 pb-12 pt-20 sm:px-10 md:px-14"
      aria-label={fmt(f.aria, { name: site.name })}
    >
      <div className="mx-auto max-w-7xl space-y-16">
        {/* CTA strip */}
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-border bg-foreground/[0.02] p-8 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {fmt(f.kicker, { name: site.name })}
            </p>
            <h2 className="font-fraunces text-2xl font-normal tracking-tight sm:text-3xl lg:text-4xl">{site.tagline}</h2>
            <p className="mt-2 max-w-xl text-sm text-foreground/65">
              {f.pitch}{' '}
              {site.availability.headline}.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button onClick={onStartProject} size="lg" className="rounded-full px-6 hover:bg-accent hover:text-accent-foreground">
              {ui.common.startProject}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-foreground/20 bg-transparent px-6 hover:border-accent hover:bg-transparent hover:text-accent">
              <a href={`mailto:${site.contact.email}`}>
                <Mail className="size-4" aria-hidden="true" />
                {site.contact.email}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-4">
            <button onClick={toTop} className="group flex items-center rounded-lg text-left" aria-label={f.backToTop}>
              <Logo className="h-12 w-auto text-foreground transition-transform duration-300 group-hover:scale-[1.03]" />
            </button>
            <p className="text-sm leading-relaxed text-foreground/70">{site.description}</p>
            <LanguageSwitcher variant="full" />
            <ul className="space-y-2 text-xs text-foreground/60">
              <li className="flex items-center gap-2"><MapPin className="size-3.5 text-accent" aria-hidden="true" />{fmt(f.base, { timezone: site.contact.timezone })}</li>
              <li className="flex items-center gap-2"><Globe className="size-3.5 text-accent" aria-hidden="true" />{f.remote}</li>
              <li className="flex items-center gap-2"><Clock className="size-3.5 text-accent" aria-hidden="true" /><HelsinkiTime /></li>
              <li className="flex items-center gap-2"><Shield className="size-3.5 text-accent" aria-hidden="true" />{f.field}</li>
            </ul>
          </div>

          <nav className="space-y-4 lg:col-span-4" aria-label={f.servicesHeading}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{f.servicesHeading}</h3>
            <ul className="grid gap-2 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href="/services" className={linkClass}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-4 lg:col-span-2" aria-label={f.companyHeading}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{f.companyHeading}</h3>
            <ul className="grid gap-2 text-sm">
              {f.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{f.contactHeading}</h3>
            <div className="space-y-3 text-sm text-foreground/75">
              <div>
                <span className="mb-1 block text-xs text-foreground/40">{f.generalInquiries}</span>
                <a href={`mailto:${site.contact.email}`} className="break-all font-medium transition-colors hover:text-accent">{site.contact.email}</a>
              </div>
              <div>
                <span className="mb-1 block text-xs text-foreground/40">{f.website}</span>
                <a href={site.contact.website} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-accent">{site.contact.websiteLabel}</a>
              </div>
              <div>
                <span className="mb-1 block text-xs text-foreground/40">{f.location}</span>
                <span>{site.contact.locationShort}</span>
              </div>
              <div className="rounded-xl border border-border bg-foreground/5 p-3">
                <span className="mb-0.5 block text-[11px] font-semibold text-accent">{site.availability.badge}</span>
                <span className="text-[11px] text-foreground/60">{f.openings}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-foreground/50 md:flex-row">
          <p className="text-center md:text-left">
            <span className="font-fraunces text-sm text-foreground">{site.name}</span> · {site.motto} · © {site.founded}{' '}
            {site.name}. {f.rights}{' '}
            <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-accent">
              {f.privacy}
            </Link>
          </p>
          <Button variant="ghost" size="sm" onClick={toTop} className="text-foreground/70 hover:bg-transparent hover:text-accent" aria-label={f.scrollToTop}>
            {f.backToTop}
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
