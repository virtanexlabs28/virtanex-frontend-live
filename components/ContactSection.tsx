'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Globe, Loader2, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContent, useLocale } from '@/components/ContentProvider';
import { fmt } from '@/lib/format';
import { InquiryError, submitInquiry } from '@/lib/send-inquiry';

export function ContactSection() {
  const { site, services, ui } = useContent();
  const t = ui.contact;
  const locale = useLocale();
  const EMPTY = {
    name: '',
    email: '',
    company: '',
    service: services[0].id,
    timeline: site.inquiry.timelines[0],
    message: '',
    website: '', // honeypot, must stay empty
  };
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const set = (key: keyof typeof EMPTY) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || sending) return;
    setSending(true);
    setError('');
    try {
      await submitInquiry({ type: 'contact', locale, ...form });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof InquiryError
          ? fmt(ui.errors[err.code], { email: site.contact.email })
          : fmt(ui.errors.generic, { email: site.contact.email }),
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border px-5 py-20 sm:px-10 sm:py-28 md:px-14"
      aria-label={t.aria}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
              <span>{t.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>{site.availability.season}</span>
            </p>
            <h2 className="font-fraunces text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
              {t.title}
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
            {t.intro}
          </p>

          <ul className="space-y-4 border-t border-border pt-6 text-sm text-foreground/80">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-accent">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              <span>{site.contact.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="size-4 text-accent" aria-hidden="true" />
              <a
                href={site.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {site.contact.website}
              </a>
            </li>
          </ul>

          <Card className="gap-2 rounded-2xl border-border bg-card p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-accent">{t.availabilityLabel}</span>
            <p className="text-sm font-medium text-foreground">{site.availability.headline}</p>
            <p className="text-sm text-foreground/65">{site.availability.detail}</p>
          </Card>
        </div>

        <Card className="gap-0 rounded-2xl border-border bg-card p-6 sm:p-10 lg:col-span-7">
          {submitted ? (
            <div className="animate-fade-in space-y-4 py-10 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-accent bg-accent/20 text-accent">
                <Check className="size-7" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-2xl font-normal sm:text-3xl">{t.successTitle}</h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-foreground/70">
                {fmt(t.successBody, { name: form.name, email: form.email, responseTime: site.contact.responseTime })}
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSubmitted(false);
                  setError('');
                  setForm(EMPTY);
                }}
                className="text-xs uppercase tracking-wider text-accent"
              >
                {t.another}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div>
                <h3 className="mb-1 font-fraunces text-xl font-normal sm:text-2xl">{site.inquiry.title}</h3>
                <p className="text-sm text-muted-foreground">{site.inquiry.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="c-name" label={t.name}>
                  <Input id="c-name" required value={form.name} onChange={(e) => set('name')(e.target.value)} placeholder={t.namePlaceholder} className="h-11 rounded-xl bg-background" />
                </Field>
                <Field id="c-email" label={t.email}>
                  <Input id="c-email" type="email" required value={form.email} onChange={(e) => set('email')(e.target.value)} placeholder={t.emailPlaceholder} className="h-11 rounded-xl bg-background" />
                </Field>
              </div>

              <Field id="c-company" label={t.company}>
                <Input id="c-company" value={form.company} onChange={(e) => set('company')(e.target.value)} placeholder={t.companyPlaceholder} className="h-11 rounded-xl bg-background" />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="c-service" label={t.service}>
                  <Select value={form.service} onValueChange={set('service')}>
                    <SelectTrigger id="c-service" className="h-11 w-full rounded-xl bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.short}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field id="c-timeline" label={t.timeline}>
                  <Select value={form.timeline} onValueChange={set('timeline')}>
                    <SelectTrigger id="c-timeline" className="h-11 w-full rounded-xl bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {site.inquiry.timelines.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field id="c-message" label={t.message}>
                <Textarea
                  id="c-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set('message')(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="resize-none rounded-xl bg-background"
                />
              </Field>

              {/* Honeypot: hidden from people, tempting to bots */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="c-website">{ui.footer.website}</label>
                <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website')(e.target.value)} />
              </div>

              {error && (
                <p role="alert" className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                  {error}
                </p>
              )}

              <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                <p className="text-xs text-foreground/50">{site.inquiry.note}</p>
                <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full px-7 hover:bg-accent hover:text-accent-foreground sm:w-auto">
                  {sending ? t.sending : t.submit}
                  {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-foreground/60">
        {label}
      </Label>
      {children}
    </div>
  );
}
