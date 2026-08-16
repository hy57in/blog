import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <ul aria-label="Blog Posts">
      {allBlogs.map((post) => (
        <li
          key={post.slug}
          className="w-full border-b py-4"
          style={{ borderBottomColor: '#14141333', borderBottomWidth: '1px' }}
        >
          <Link
            className="blog-post-link flex w-full flex-col justify-between space-x-0 md:flex-row md:space-x-2"
            href={`/blog/${post.slug}`}
          >
            <span className="blog-post-title font-medium tracking-tight transition-colors">
              {post.metadata.title}
            </span>
            <time
              className="tabular-nums text-text-secondary dark:text-text-secondary-dark"
              dateTime={post.metadata.publishedAt}
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  )
}
