'use client';

import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useContent, useLocale } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { Reveal } from '@/components/Reveal';
import { formatPostDate, readingMinutes } from '@/lib/blog';
import { fmt } from '@/lib/format';
import { Section, SectionHeader } from './section';

/** Card for one article. Opens its own page at /blog/<id>. */
export function BlogCard({ id }: { id: string }) {
  const { blog, ui } = useContent();
  const locale = useLocale();
  const post = blog.posts.find((p) => p.id === id);
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-black/30">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
          <div
            className="size-full bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('${post.image}')` }}
            role="img"
            aria-label={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">{post.category}</p>
          <h3 className="font-fraunces text-2xl font-normal leading-snug text-foreground transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-foreground/65">{post.excerpt}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <span>
              {formatPostDate(post.date, locale)} · {fmt(ui.blog.minRead, { minutes: readingMinutes(post) })}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-accent">
              {ui.blog.readMore}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/** All articles, newest first (the blog page). */
export function BlogList() {
  const { blog } = useContent();
  const posts = [...blog.posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section id="articles" divider={false}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.id} id={p.id} />
        ))}
      </div>
    </Section>
  );
}

/** Latest articles on the home page. */
export function BlogPreview() {
  const { blog, home } = useContent();
  const c = home.blog;
  const posts = [...blog.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <Section id="blog-preview">
      <Reveal>
        <SectionHeader kicker={c.kicker} title={c.title} description={c.description} />
      </Reveal>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <BlogCard id={p.id} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          {c.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
