import { NextResponse } from 'next/server';
import { MailConfigError, sendInquiry } from '@/lib/mail';
import { getContent } from '@/lib/content';
import { isLocale } from '@/lib/i18n';
import { helsinkiTimestamp } from '@/lib/time';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Best-effort throttle: 5 requests per IP per 10 minutes (per server instance). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_HITS;
}

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/** The client turns `code` into a message in the visitor's own language. */
function fail(code: 'invalid' | 'rate' | 'send', status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (throttled(ip)) return fail('rate', 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid', 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  if (!name || !EMAIL_RE.test(email)) return fail('invalid', 400);

  // Emails to the team are always written in English, whichever language the visitor used.
  const { services } = await getContent('en');
  const rawLocale = clean(body.locale, 5);
  const language = isLocale(rawLocale) ? rawLocale : 'en';

  let subject: string;
  let fields: Record<string, string>;

  if (body.type === 'booking') {
    subject = `Discovery call request from ${name}`;
    fields = {
      Name: name,
      Email: email,
      Topic: clean(body.topic, 120),
      'Preferred window': clean(body.slot, 120),
      Notes: clean(body.notes, 2000),
      'Site language': language,
      'Received (Finland time)': helsinkiTimestamp(),
    };
  } else if (body.type === 'contact') {
    const serviceId = clean(body.service, 80);
    subject = `Project inquiry from ${name}`;
    fields = {
      Name: name,
      Email: email,
      Company: clean(body.company, 160),
      'Service required': services.find((s) => s.id === serviceId)?.title ?? serviceId,
      Timeline: clean(body.timeline, 120),
      'Project overview': clean(body.message, 5000),
      'Site language': language,
      'Received (Finland time)': helsinkiTimestamp(),
    };
  } else {
    return fail('invalid', 400);
  }

  try {
    await sendInquiry({ subject, fields, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log the cause on the server only; never echo SMTP details to the visitor.
    console.error('[inquiry] mail delivery failed:', error instanceof MailConfigError ? error.message : error);
    return fail('send', 500);
  }
}
