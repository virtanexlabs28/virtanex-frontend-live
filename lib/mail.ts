import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Server-only SMTP helper. All settings come from environment variables that are
 * deliberately NOT prefixed with NEXT_PUBLIC_, so they never reach the browser.
 */

let transporter: Transporter | null = null;

export class MailConfigError extends Error {}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new MailConfigError(`Missing environment variable ${name}`);
  return value;
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port,
    // Port 465 uses implicit TLS; 587 upgrades with STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: {
      user: required('SMTP_USER'),
      // Google shows app passwords in groups separated by spaces; they are not part of the password.
      pass: required('SMTP_PASS').replace(/\s+/g, ''),
    },
  });
  return transporter;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

interface InquiryMail {
  subject: string;
  /** Label/value pairs shown in the email body, in order. Empty values are skipped. */
  fields: Record<string, string>;
  /** The visitor's address, used as Reply-To so replying goes straight to them. */
  replyTo: string;
}

export async function sendInquiry({ subject, fields, replyTo }: InquiryMail) {
  const user = required('SMTP_USER');
  const entries = Object.entries(fields).filter(([, v]) => v.trim().length > 0);

  const text = entries.map(([k, v]) => `${k}: ${v}`).join('\n');
  const rows = entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join('');

  await getTransporter().sendMail({
    // Gmail only sends as the authenticated account, so the From address stays fixed.
    from: process.env.MAIL_FROM?.trim() || `Virtanex Labs website <${user}>`,
    to: process.env.MAIL_TO?.trim() || user,
    replyTo,
    subject,
    text,
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111"><h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2><table cellspacing="0" cellpadding="0">${rows}</table></div>`,
  });
}
