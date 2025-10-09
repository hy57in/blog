import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <ul aria-label="Blog Posts" role="list">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1"
            href={`/blog/${post.slug}`}
          >
            <li className="w-full flex justify-between flex-col md:flex-row space-x-0 md:space-x-2 py-4 blog-post-link border-b" style={{ borderBottomColor: '#14141333', borderBottomWidth: '1px' }}>
              <div className="tracking-tight transition-colors blog-post-title font-medium">
                {post.metadata.title}
              </div>
              <div className="tabular-nums text-text-secondary dark:text-text-secondary-dark">
                {formatDate(post.metadata.publishedAt, false)}
              </div>
            </li>
          </Link>
        ))}
    </ul>
  )
}
