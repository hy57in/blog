import assert from 'node:assert/strict'
import test from 'node:test'
import { formatDate, parseFrontmatter, sortPosts, type BlogPost } from '../app/blog/utils.ts'

test('parses required MDX frontmatter', () => {
  const post = parseFrontmatter(`---\ntitle: '테스트 글'\npublishedAt: '2026-01-11'\nsummary: '요약'\n---\n본문`)
  assert.equal(post.metadata.title, '테스트 글')
  assert.equal(post.content, '본문')
})

test('rejects incomplete and invalid frontmatter', () => {
  assert.throws(() => parseFrontmatter('본문만 있습니다'), /frontmatter/)
  assert.throws(() => parseFrontmatter(`---\ntitle: 글\npublishedAt: bad\nsummary: 요약\n---\n본문`), /Invalid publishedAt/)
})

test('sorts recent posts first without changing the source list', () => {
  const posts = [
    { slug: 'older', content: '', metadata: { title: 'A', publishedAt: '2025-01-01', summary: '' } },
    { slug: 'newer', content: '', metadata: { title: 'B', publishedAt: '2026-01-01', summary: '' } },
  ] satisfies BlogPost[]
  assert.deepEqual(sortPosts(posts).map((post) => post.slug), ['newer', 'older'])
  assert.deepEqual(posts.map((post) => post.slug), ['older', 'newer'])
})

test('formats post dates in Korean', () => {
  assert.equal(formatDate('2026-01-11'), '2026년 1월 11일')
})
