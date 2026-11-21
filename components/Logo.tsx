import { useId, type SVGProps } from 'react';
import { BRAND_NAME, LOGO_VIEWBOX, MARK_VIEWBOX, logoMarkup, markMarkup } from '@/lib/logo';

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'> {
  /** `full` is emblem + wordmark, `mark` is the emblem alone. */
  variant?: 'full' | 'mark';
}

/**
 * The Virtanex Labs logo. The wordmark follows `currentColor`, so it works on any
 * background; size it with a height class such as `h-10 w-auto`.
 */
export function Logo({ variant = 'full', className, ...props }: LogoProps) {
  // useId output contains colons; strip them so the ids are safe inside url(#...).
  const idPrefix = `vx${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const full = variant === 'full';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={full ? LOGO_VIEWBOX : MARK_VIEWBOX}
      role="img"
      aria-label={`${BRAND_NAME} logo`}
      className={className}
      {...props}
      // The markup is a constant defined in lib/logo.ts, never user input.
      dangerouslySetInnerHTML={{ __html: `<title>${BRAND_NAME}</title>${full ? logoMarkup(idPrefix) : markMarkup(idPrefix)}` }}
    />
  );
}

export default Logo;
