import { getBlogPosts } from 'app/blog/utils'
import type { MetadataRoute } from 'next'
import { baseUrl } from './seo'

export { baseUrl } from './seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  return [...routes, ...blogs]
}
