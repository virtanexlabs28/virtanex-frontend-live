'use client';

import { CheckCircle2 } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';
import { fmt } from '@/lib/format';

/** Full privacy policy page. The text lives in data/<language>/privacy.json. */
export function PrivacyContent() {
  const { privacy, site } = useContent();
  const vars = { company: site.name, email: site.contact.email, website: site.contact.website };

  return (
    <>
      {/* data-plain: no photo banner, so the navbar keeps the normal theme colours */}
      <header data-plain className="border-b border-border px-5 pb-12 pt-36 sm:px-10 sm:pb-16 md:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-accent">{privacy.kicker}</p>
          <h1 className="max-w-4xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {privacy.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{privacy.updated}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg">{fmt(privacy.intro, vars)}</p>
        </div>
      </header>

      <div className="px-5 py-16 sm:px-10 sm:py-20 md:px-14">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <nav aria-label={privacy.tocLabel} className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">{privacy.tocLabel}</p>
              <ol className="space-y-1.5 text-sm">
                {privacy.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-foreground/65 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="space-y-12 lg:col-span-9">
            {privacy.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="mb-4 font-fraunces text-2xl font-normal tracking-tight sm:text-3xl">{s.title}</h2>
                <div className="space-y-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{fmt(p, vars)}</p>
                  ))}
                  {s.items.length > 0 && (
                    <ul className="space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                          <span>{fmt(item, vars)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
