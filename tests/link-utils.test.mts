import assert from 'node:assert/strict'
import test from 'node:test'
import { getLinkKind } from '../app/components/link-utils.ts'

test('classifies MDX links by navigation behavior', () => {
  assert.equal(getLinkKind('/about'), 'internal')
  assert.equal(getLinkKind('#section'), 'anchor')
  assert.equal(getLinkKind('https://example.com'), 'external')
})
