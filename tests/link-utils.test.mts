import assert from 'node:assert/strict'
import test from 'node:test'
import { getLinkKind, isContentPageRoute } from '../app/components/link-utils.ts'

void test('classifies MDX links by navigation behavior', () => {
  assert.equal(getLinkKind('/about'), 'internal')
  assert.equal(getLinkKind('#section'), 'anchor')
  assert.equal(getLinkKind('https://example.com'), 'external')
  assert.equal(getLinkKind('//example.com'), 'external')
})

void test('only routes MDX page URLs through typed client navigation', () => {
  for (const href of ['/', '/about', '/blog?sort=recent', '/blog/example#section']) {
    assert.equal(isContentPageRoute(href), true, href)
  }
  for (const href of ['/aboot', '/about/resume.pdf', '/images/photo.png', '//example.com', '/blog/a/b', '#section', 'mailto:me@example.com']) {
    assert.equal(isContentPageRoute(href), false, href)
  }
})
