import type { Route } from 'next'

export type LinkKind = 'internal' | 'anchor' | 'external'

export function getLinkKind(href: string): LinkKind {
  if (href.startsWith('/') && !href.startsWith('//')) return 'internal'
  if (href.startsWith('#')) return 'anchor'
  return 'external'
}

// MDX hrefs are runtime content; only known page patterns use client navigation.
// Other relative URLs (e.g. downloads) retain native anchor behavior.
const staticPages = ['/', '/about', '/blog'] as const satisfies readonly Route[]

export function isContentPageRoute(href: string): href is Route {
  const path = href.split(/[?#]/, 1)[0]
  return staticPages.some((page) => page === path) || /^\/blog\/[^/\\\s]+$/.test(path)
}
