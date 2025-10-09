import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog Posts',
  description: 'Read my blog posts.',
}

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog Posts</h1>
      <BlogPosts />
    </section>
  )
}
