'use client';

import { useContent } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';

/** One-line notice under the forms: how the data is used, with a link to the privacy policy. */
export function PrivacyNote({ className }: { className?: string }) {
  const { ui } = useContent();
  const [before, after = ''] = ui.legal.formNote.split('{link}');

  return (
    <p className={className}>
      {before}
      <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-accent">
        {ui.legal.privacyLink}
      </Link>
      {after}
    </p>
  );
}
