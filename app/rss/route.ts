import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { buildRssFeed } from './utils'

export function GET() {
  const rssFeed = buildRssFeed(getBlogPosts(), baseUrl)

  return new Response(rssFeed, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
