import assert from 'node:assert/strict'
import test from 'node:test'
import { getTextContent, slugifyHeading } from '../app/components/mdx-utils.ts'

test('extracts text from nested MDX heading children', () => {
  const heading = ['배포 ', ['파이프라인', ' & '], 2026]

  assert.equal(getTextContent(heading), '배포 파이프라인 & 2026')
  assert.equal(slugifyHeading(heading), '배포-파이프라인-and-2026')
})
