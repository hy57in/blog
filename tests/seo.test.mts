import assert from 'node:assert/strict'
import test from 'node:test'
import { pageMetadata, serializeJsonLd } from '../app/seo.ts'

void test('gives each public page its own absolute canonical and share URL', () => {
  for (const path of ['/', '/about', '/blog', '/blog/example']) {
    const metadata = pageMetadata(path, '제목 & 소개', '페이지 설명')
    const expected = new URL(path, 'https://hyojin.dev').toString()
    assert.equal(metadata.alternates?.canonical, expected)
    assert.equal(metadata.openGraph?.url, expected)
    assert.equal(metadata.description, '페이지 설명')
    assert.deepEqual(metadata.twitter?.images, [
      `https://hyojin.dev/og?title=${encodeURIComponent('제목 & 소개')}`,
    ])
  }
})

void test('structured data cannot close its script element', () => {
  const data = { headline: '</script><script>alert(1)</script>', name: '김효진' }
  const serialized = serializeJsonLd(data)
  assert.equal(serialized.includes('<'), false)
  assert.deepEqual(JSON.parse(serialized), data)
})
