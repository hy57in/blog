export type LinkKind = 'internal' | 'anchor' | 'external'

export function getLinkKind(href: string): LinkKind {
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('#')) return 'anchor'
  return 'external'
}
