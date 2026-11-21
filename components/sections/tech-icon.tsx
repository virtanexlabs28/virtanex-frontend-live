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
import type React from 'react';
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

/** Brand colours that would vanish on the current background fall back to the text colour. */
function brandColors(hex: string) {
  const n = parseInt(hex, 16);
  const luminance = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  const brand = `#${hex}`;
  return {
    light: luminance > 0.7 ? '#1c1612' : brand,
    dark: luminance < 0.3 ? '#e8e0d0' : brand,
  };
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
      const { light, dark } = brandColors(brand.hex);
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} fill-[var(--icon-light)] dark:fill-[var(--icon-dark)]`}
          style={{ '--icon-light': light, '--icon-dark': dark } as React.CSSProperties}
          aria-hidden="true"
        >
          <path d={brand.path} />
        </svg>
      );
    }
  }

  const Icon = LUCIDE[name] ?? Sparkles;
  return <Icon className={`${className} text-accent`} strokeWidth={1.5} aria-hidden="true" />;
}
