'use client';

import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/BookingProvider';
import { useContent, useLocale } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { formatPostDate, readingMinutes } from '@/lib/blog';
import { fmt } from '@/lib/format';
import { BlogCard } from './blog-section';
import { Section, SectionHeader } from './section';

/** One article (/blog/<id>). */
export function BlogPost({ id }: { id: string }) {
  const { blog, ui, home } = useContent();
  const locale = useLocale();
  const { openBooking } = useBooking();
  const post = blog.posts.find((p) => p.id === id);
  if (!post) notFound();
  const others = blog.posts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      {/* Full-cover image banner, dark in both themes like the other page banners */}
      <header className="dark relative isolate flex min-h-[56vh] items-end overflow-hidden bg-background px-5 pb-14 pt-36 sm:px-10 sm:pb-20 md:px-14">
        <div
          className="absolute inset-0 -z-20 scale-105 bg-cover bg-top blur-[3px]"
          style={{ backgroundImage: `url('${post.image}')` }}
          role="img"
          aria-label={post.title}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-[#e8b57d] focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {ui.blog.back}
          </Link>
          <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.25em] text-[#e8b57d] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date} className="normal-case tracking-normal text-foreground/80">
              {formatPostDate(post.date, locale)}
            </time>
            <span aria-hidden="true">·</span>
            <span className="normal-case tracking-normal text-foreground/80">
              {fmt(ui.blog.minRead, { minutes: readingMinutes(post) })}
            </span>
          </p>
          <h1 className="max-w-4xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg">
            {post.excerpt}
          </p>
        </div>
      </header>

      <Section id="article" divider={false}>
        <article className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {post.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="mb-4 font-fraunces text-2xl font-normal tracking-tight sm:text-3xl">{s.heading}</h2>
                <div className="space-y-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.items.length > 0 && (
                    <ul className="space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">{fmt(ui.blog.by, { author: post.author })}</p>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-fraunces text-xl">{ui.blog.cta}</p>
            <Button onClick={openBooking} className="rounded-full hover:bg-accent hover:text-accent-foreground">
              {ui.common.startProject}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </article>
      </Section>

      {others.length > 0 && (
        <Section id="more-articles">
          <SectionHeader kicker={home.blog.kicker} title={ui.blog.more} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {others.map((o) => (
              <BlogCard key={o.id} id={o.id} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
