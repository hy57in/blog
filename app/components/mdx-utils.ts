import { isValidElement, type ReactNode } from 'react'

export function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number' || typeof node === 'bigint') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return getTextContent(node.props.children)
  return ''
}

export function slugifyHeading(node: ReactNode) {
  return getTextContent(node)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\u3131-\u3163\uac00-\ud7a3\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}
