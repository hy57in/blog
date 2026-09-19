import { BlogPosts } from 'app/components/posts'
import { pageMetadata } from 'app/seo'

export const metadata = pageMetadata('/blog', '개발 기록', '프론트엔드 개발에서 마주한 문제와 해결 과정, 실무에서 배운 내용을 기록합니다.')

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
