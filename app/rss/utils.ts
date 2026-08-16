import type { BlogPost } from '../blog/utils'

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
}

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character] ?? character)
}

export function buildRssFeed(posts: BlogPost[], baseUrl: string) {
  const itemsXml = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`

      return `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${escapeXml(postUrl)}</link>
          <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
          <description>${escapeXml(post.metadata.summary)}</description>
          <pubDate>${new Date(`${post.metadata.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
        </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Hyojin&apos;s Blog</title>
        <link>${escapeXml(baseUrl)}</link>
        <description>안녕하세요, 프론트엔드 개발자 김효진의 블로그입니다.</description>
        ${itemsXml}
    </channel>
  </rss>`
}
