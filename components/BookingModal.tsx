'use client';

import React, { useState } from 'react';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { services, site } from '@/lib/content';
import { buildMailto } from '@/lib/mailto';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = [...services.slice(0, 6).map((s) => s.short), ...site.booking.extraTopics];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [slot, setSlot] = useState(site.booking.slots[0]);
  const [form, setForm] = useState({ name: '', email: '', notes: '' });
  const [sent, setSent] = useState(false);

  const close = () => {
    setSent(false);
    onClose();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    window.location.href = buildMailto(site.contact.email, `Discovery call request from ${form.name}`, {
      Name: form.name,
      Email: form.email,
      Topic: topic,
      'Preferred window': slot,
      Notes: form.notes,
    });
    setSent(true);
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
              <p className="text-xs uppercase tracking-widest text-accent">Almost done</p>
              <DialogTitle className="font-fraunces text-2xl font-normal sm:text-3xl">Your request is ready to send</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm text-sm leading-relaxed">
                We opened your email app with your details and preferred window ({slot}). Press send and we will
                confirm a time by email {site.contact.responseTime}.
              </DialogDescription>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              Nothing opened? Email{' '}
              <a className="text-accent underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
            <Button onClick={close} className="rounded-full px-6 hover:bg-accent hover:text-accent-foreground">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <DialogHeader className="text-left">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                <Calendar className="size-3.5" aria-hidden="true" />
                {site.name} · Finland
              </p>
              <DialogTitle className="font-fraunces text-2xl font-normal sm:text-3xl">{site.booking.title}</DialogTitle>
              <DialogDescription className="text-sm">{site.booking.subtitle}</DialogDescription>
            </DialogHeader>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-wider text-foreground/60">Topic of interest</legend>
              <div className="grid grid-cols-2 gap-2">
                {TOPICS.map((t) => (
                  <ChoiceButton key={t} selected={topic === t} onClick={() => setTopic(t)}>
                    {t}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-wider text-foreground/60">Preferred meeting window</legend>
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
                <Label htmlFor="b-name" className="text-xs uppercase tracking-wider text-foreground/60">Your name</Label>
                <Input id="b-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-email" className="text-xs uppercase tracking-wider text-foreground/60">Work email</Label>
                <Input id="b-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-notes" className="text-xs uppercase tracking-wider text-foreground/60">Project notes (optional)</Label>
              <Input id="b-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Brief objective or questions" className="rounded-xl" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full hover:bg-accent hover:text-accent-foreground">
              Request this call
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">{site.booking.agenda}</p>
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
