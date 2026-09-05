/** Nomdan URL slug — kirill harflari ham saqlanadi (dizayn prototipidagidek) */
export function toSlug(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff ]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Mock bosqichda id generatsiyasi */
export function makeId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
