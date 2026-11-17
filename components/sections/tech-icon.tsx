import {
  siDocker,
  siExpress,
  siFigma,
  siGithubactions,
  siLinux,
  siMongodb,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';
import { Brain, Database, SearchCheck, Sparkles, Webhook, type LucideIcon } from 'lucide-react';

/** Only the logos we use are imported, so the client bundle stays small. */
const BRANDS: Record<string, { path: string; hex: string }> = {
  siDocker,
  siExpress,
  siFigma,
  siGithubactions,
  siLinux,
  siMongodb,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
};

const LUCIDE: Record<string, LucideIcon> = { Brain, Database, SearchCheck, Sparkles, Webhook };

/** Brand colours that are too dark to read on the dark theme fall back to cream. */
function readableColor(hex: string): string {
  const n = parseInt(hex, 16);
  const luminance = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luminance < 0.3 ? '#E8E0D0' : `#${hex}`;
}

/**
 * Renders a technology icon from its `icon` key in data/technologies.json:
 * `brand:<simple-icons export>` for logos, `lucide:<name>` for generic concepts.
 */
export function TechIcon({ icon, className = 'size-8' }: { icon: string; className?: string }) {
  const [kind, name] = icon.split(':');

  if (kind === 'brand') {
    const brand = BRANDS[name];
    if (brand) {
      return (
        <svg viewBox="0 0 24 24" className={className} fill={readableColor(brand.hex)} aria-hidden="true">
          <path d={brand.path} />
        </svg>
      );
    }
  }

  const Icon = LUCIDE[name] ?? Sparkles;
  return <Icon className={`${className} text-accent`} strokeWidth={1.5} aria-hidden="true" />;
}
