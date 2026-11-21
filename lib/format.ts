/** Fills `{placeholders}` in a translated string, e.g. fmt('Hi {name}', { name: 'Ada' }). */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}
