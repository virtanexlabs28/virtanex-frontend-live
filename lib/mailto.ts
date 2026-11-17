/**
 * Builds a mailto: URL with a prefilled subject and body.
 * The site has no backend yet, so inquiries are delivered through the visitor's
 * own email client to the address in /data/site.json.
 */
export function buildMailto(to: string, subject: string, fields: Record<string, string>): string {
  const body = Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
