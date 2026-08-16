import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  formatDate,
  getBlogPostsFromDirectory,
  parseFrontmatter,
  sortPosts,
  type BlogPost,
} from '../app/blog/utils.ts'

test('parses required MDX frontmatter', () => {
  const post = parseFrontmatter(`---\ntitle: '테스트 글'\npublishedAt: '2026-01-11'\nsummary: '요약'\n---\n본문`)
  assert.equal(post.metadata.title, '테스트 글')
  assert.equal(post.content, '본문')
})

test('rejects incomplete and invalid frontmatter', () => {
  assert.throws(() => parseFrontmatter('본문만 있습니다'), /frontmatter/)
  assert.throws(() => parseFrontmatter(`---\ntitle: 글\npublishedAt: bad\nsummary: 요약\n---\n본문`), /Invalid publishedAt/)
  assert.throws(() => parseFrontmatter(`---\ntitle: 글\npublishedAt: 2026-02-30\nsummary: 요약\n---\n본문`), /Invalid publishedAt/)
  assert.throws(() => parseFrontmatter(`---\ntitle: 글\ntitle: 중복\npublishedAt: 2026-01-01\nsummary: 요약\n---\n본문`), /Duplicate frontmatter field/)
  assert.throws(() => parseFrontmatter(`---\ntitle: 글\npublishedAt: 2026-01-01\nsummary: 요약\nauthor: 효진\n---\n본문`), /Unsupported frontmatter field/)
})

test('keeps colons and optional image values in frontmatter', () => {
  const post = parseFrontmatter(`---\ntitle: '제목: 부제'\npublishedAt: '2026-01-11'\nsummary: '요약: 상세'\nimage: '/images/post.png'\n---\n본문`)
  assert.equal(post.metadata.title, '제목: 부제')
  assert.equal(post.metadata.summary, '요약: 상세')
  assert.equal(post.metadata.image, '/images/post.png')
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

test('returns an empty list for an empty posts directory', (context) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-posts-'))
  context.after(() => fs.rmSync(directory, { recursive: true }))

  assert.deepEqual(getBlogPostsFromDirectory(directory), [])
})
