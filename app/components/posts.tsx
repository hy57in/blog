import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ limit }: { limit?: number }) {
  const allBlogs = getBlogPosts().slice(0, limit)

  return (
    <ul aria-label="기술 글" className="post-list">
      {allBlogs.map((post) => (
        <li
          key={post.slug}
        >
          <Link
            className="blog-post-link post-row"
            href={`/blog/${post.slug}`}
          >
            <span className="blog-post-title post-title">
              {post.metadata.title}
            </span>
            <time
              className="post-date"
              dateTime={post.metadata.publishedAt}
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
            <span className="post-summary">{post.metadata.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
