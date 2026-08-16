import assert from 'node:assert/strict'
import test from 'node:test'
import { buildRssFeed, escapeXml } from '../app/rss/utils.ts'

test('escapes XML-sensitive text', () => {
  assert.equal(
    escapeXml(`React & Next <Guide> "2026" 'edition'`),
    'React &amp; Next &lt;Guide&gt; &quot;2026&quot; &apos;edition&apos;'
  )
})

test('builds valid RSS items without changing post order', () => {
  const posts = [
    {
      slug: 'newest',
      content: '',
      metadata: {
        title: 'A & B',
        publishedAt: '2026-01-02',
        summary: '<요약>',
      },
    },
    {
      slug: 'older',
      content: '',
      metadata: {
        title: '이전 글',
        publishedAt: '2026-01-01',
        summary: '설명',
      },
    },
  ]

  const feed = buildRssFeed(posts, 'https://example.com')

  assert.match(feed, /<title>A &amp; B<\/title>/)
  assert.match(feed, /<description>&lt;요약&gt;<\/description>/)
  assert.match(feed, /<guid isPermaLink="true">https:\/\/example.com\/blog\/newest<\/guid>/)
  assert.ok(feed.indexOf('/blog/newest') < feed.indexOf('/blog/older'))
  assert.deepEqual(posts.map((post) => post.slug), ['newest', 'older'])
})
