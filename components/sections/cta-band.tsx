'use client';

import { ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/BookingProvider';
import { useContent } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { Reveal } from '@/components/Reveal';
import { Section } from './section';

/** Closing call to action for the landing page. */
export function CtaBand() {
  const { openBooking } = useBooking();
  const { home, site } = useContent();
  const c = home.cta;

  return (
    <Section id="start">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl border border-accent/30 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(184,115,51,0.28),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-20 bg-card" aria-hidden="true" />

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-accent">{c.kicker}</p>
          <h2 className="mx-auto max-w-3xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">{c.description}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={openBooking}
              size="lg"
              className="h-12 w-full rounded-full px-8 text-base font-semibold hover:bg-accent hover:text-accent-foreground sm:w-auto"
            >
              {c.primary}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full border-foreground/25 bg-transparent px-8 text-base hover:border-accent hover:bg-transparent hover:text-accent sm:w-auto"
            >
              <Link href="/contact">
                <Mail className="size-4" aria-hidden="true" />
                {c.secondary}
              </Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-foreground/65 sm:flex-row sm:gap-8">
            {c.assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-foreground/40">
            {site.contact.email} · {site.contact.locationShort}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
