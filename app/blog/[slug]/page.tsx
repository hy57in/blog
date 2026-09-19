import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'


export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const post = getBlogPosts().find((candidate) => candidate.slug === params.slug)
  if (!post) {
    return {}
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image ? new URL(image, baseUrl).toString() : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = getBlogPosts().find((candidate) => candidate.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="article-page">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? new URL(post.metadata.image, baseUrl).toString()
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Hyojin Kim',
            },
          }),
        }}
      />
      <header className="article-header">
      <Link className="text-link article-back" href="/blog">← 전체 글</Link>
      <h1 className="title page-title">
        {post.metadata.title}
      </h1>
      <div className="mt-4 text-sm">
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
          <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
        </p>
      </div>
      <p className="page-description">{post.metadata.summary}</p>
      </header>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <nav aria-label="글 하단 탐색" className="article-end">
        <p>다른 개발 이야기도 읽어보세요.</p>
        <Link className="text-link" href="/blog">전체 글로 돌아가기 <span aria-hidden="true">→</span></Link>
      </nav>
    </section>
  )
}
