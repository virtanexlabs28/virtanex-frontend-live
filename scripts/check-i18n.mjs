// Validates data/<locale>/*.json against the English source in data/en.
// Run with: bun run i18n:check
// Fails (exit 1) when a translation changes the structure or touches values that must stay identical.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', 'data');
const FILES = ['site', 'services', 'technologies', 'process', 'company', 'faq', 'work', 'insights', 'home', 'privacy', 'ui'];

// Keys that must be byte-identical in every language (ids, icon names, links, images, numbering).
const FIXED_KEYS = new Set(['id', 'icon', 'href', 'image', 'number']);
// Extra fixed values, by file and dotted path (array indexes written as *).
const FIXED_PATHS = {
  site: ['name', 'founded', 'contact.email', 'contact.website', 'contact.websiteLabel'],
  technologies: ['items.*.name', 'items.*.category'],
  work: ['items.*.service'],
};

const placeholders = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');
const load = (locale, name) => JSON.parse(readFileSync(join(root, locale, `${name}.json`), 'utf8'));

const locales = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'en')
  .map((d) => d.name);

let errors = 0;
const fail = (locale, name, path, msg) => {
  errors++;
  console.error(`  ${locale}/${name}.json  ${path || '(root)'}: ${msg}`);
};

function compare(en, tr, ctx, path) {
  const where = path.join('.');
  const generic = path.map((p) => (typeof p === 'number' ? '*' : p)).join('.');
  const key = path[path.length - 1];

  if (typeof en !== typeof tr || Array.isArray(en) !== Array.isArray(tr)) {
    return fail(ctx.locale, ctx.name, where, `type changed (${typeof en} -> ${typeof tr})`);
  }
  if (Array.isArray(en)) {
    if (en.length !== tr.length) return fail(ctx.locale, ctx.name, where, `array length ${en.length} -> ${tr.length}`);
    en.forEach((v, i) => compare(v, tr[i], ctx, [...path, i]));
  } else if (en && typeof en === 'object') {
    const a = Object.keys(en).join('|');
    const b = Object.keys(tr).join('|');
    if (a !== b) return fail(ctx.locale, ctx.name, where, `keys differ:\n      en: ${a}\n      ${ctx.locale}: ${b}`);
    for (const k of Object.keys(en)) compare(en[k], tr[k], ctx, [...path, k]);
  } else if (typeof en === 'string') {
    if (placeholders(en) !== placeholders(tr)) {
      fail(ctx.locale, ctx.name, where, `placeholders changed: "${placeholders(en)}" -> "${placeholders(tr)}"`);
    }
    const fixed =
      ctx.name !== 'ui'
        ? FIXED_KEYS.has(key) || (FIXED_PATHS[ctx.name] ?? []).includes(generic)
        : path.join('.').startsWith('footer.links') && key === 'href';
    if (fixed && en !== tr) fail(ctx.locale, ctx.name, where, `must stay "${en}" but is "${tr}"`);
    if (en.trim() && !tr.trim()) fail(ctx.locale, ctx.name, where, 'translation is empty');
  }
}

for (const locale of locales) {
  console.log(`Checking ${locale}`);
  for (const name of FILES) {
    if (!existsSync(join(root, locale, `${name}.json`))) {
      fail(locale, name, '', 'file is missing');
      continue;
    }
    let tr;
    try {
      tr = load(locale, name);
    } catch (e) {
      fail(locale, name, '', `invalid JSON: ${e.message}`);
      continue;
    }
    compare(load('en', name), tr, { locale, name }, []);
    if (name === 'site') {
      for (const item of tr.nav) {
        if (item.label.length > 14) fail(locale, name, `nav.${item.href}`, `label "${item.label}" is too long for the header`);
      }
    }
  }
}

if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
console.log(`\nAll ${locales.length} translations match the English structure.`);
