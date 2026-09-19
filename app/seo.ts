import type { Metadata } from 'next'

export const baseUrl = 'https://hyojin.dev'
export const siteName = "Hyojin's Blog"

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, baseUrl).toString()
  const image = `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': `${baseUrl}/rss` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: 'ko_KR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
