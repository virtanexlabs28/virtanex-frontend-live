'use client';

import React, { useState } from 'react';
import { ArrowRight, Calendar, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HelsinkiTime } from '@/components/HelsinkiTime';
import { PrivacyNote } from '@/components/PrivacyNote';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContent, useLocale } from '@/components/ContentProvider';
import { fmt } from '@/lib/format';
import { InquiryError, submitInquiry } from '@/lib/send-inquiry';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { site, services, ui } = useContent();
  const t = ui.booking;
  const locale = useLocale();
  const TOPICS = [...services.slice(0, 6).map((s) => s.short), ...site.booking.extraTopics];
  const [topic, setTopic] = useState(TOPICS[0]);
  const [slot, setSlot] = useState(site.booking.slots[0]);
  const [form, setForm] = useState({ name: '', email: '', notes: '', website: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const close = () => {
    setSent(false);
    setError('');
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || sending) return;
    setSending(true);
    setError('');
    try {
      await submitInquiry({ type: 'booking', locale, topic, slot, ...form });
      setSent(true);
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-2xl border-border bg-background p-6 sm:max-w-xl sm:p-8">
        {sent ? (
          <div className="animate-fade-in space-y-5 py-6 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-accent bg-accent/20 text-accent">
              <Check className="size-8" aria-hidden="true" />
            </div>
            <DialogHeader className="items-center text-center">
              <p className="text-xs uppercase tracking-widest text-accent">{t.doneKicker}</p>
              <DialogTitle className="font-fraunces text-2xl font-normal sm:text-3xl">{t.doneTitle}</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm text-sm leading-relaxed">
                {fmt(t.doneBody, { slot, responseTime: site.contact.responseTime })}
              </DialogDescription>
            </DialogHeader>
            <Button onClick={close} className="rounded-full px-6 hover:bg-accent hover:text-accent-foreground">
              {t.done}
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="relative space-y-6">
            <DialogHeader className="text-left">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                <Calendar className="size-3.5" aria-hidden="true" />
                {fmt(t.kicker, { name: site.name })}
              </p>
              <DialogTitle className="font-fraunces text-2xl font-normal sm:text-3xl">{site.booking.title}</DialogTitle>
              <DialogDescription className="text-sm">{site.booking.subtitle}</DialogDescription>
            </DialogHeader>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-wider text-foreground/60">{t.topic}</legend>
              <div className="grid grid-cols-2 gap-2">
                {TOPICS.map((t) => (
                  <ChoiceButton key={t} selected={topic === t} onClick={() => setTopic(t)}>
                    {t}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-wider text-foreground/60">{t.window}</legend>
              <HelsinkiTime className="mb-2 block text-xs text-muted-foreground" />
              <div className="grid grid-cols-2 gap-2">
                {site.booking.slots.map((s) => (
                  <ChoiceButton key={s} selected={slot === s} onClick={() => setSlot(s)}>
                    {s}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="b-name" className="text-xs uppercase tracking-wider text-foreground/60">{t.name}</Label>
                <Input id="b-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePlaceholder} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-email" className="text-xs uppercase tracking-wider text-foreground/60">{t.email}</Label>
                <Input id="b-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPlaceholder} className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-notes" className="text-xs uppercase tracking-wider text-foreground/60">{t.notes}</Label>
              <Input id="b-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={t.notesPlaceholder} className="rounded-xl" />
            </div>

            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="b-website">{ui.footer.website}</label>
              <input id="b-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full hover:bg-accent hover:text-accent-foreground">
              {sending ? t.sending : t.submit}
              {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground">{site.booking.agenda}</p>
            <PrivacyNote className="text-center" />
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex items-center justify-between gap-2 rounded-xl border p-2.5 text-left text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected
          ? 'border-accent bg-accent/15 font-medium text-foreground'
          : 'border-border text-foreground/65 hover:bg-foreground/5',
      )}
    >
      <span>{children}</span>
      {selected && <Check className="size-3.5 shrink-0 text-accent" aria-hidden="true" />}
    </button>
  );
}
