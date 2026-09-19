import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog posts.',
}

export default function BlogPage() {
  return (
    <section>
      <header className="page-intro">
        <p className="eyebrow">Writing</p>
        <h1 className="page-title">개발 기록</h1>
        <p className="page-description">문제를 풀며 배운 기술과 실무 경험을 나눕니다.</p>
      </header>
      <BlogPosts />
    </section>
  )
}
