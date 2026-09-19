import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import styles from './page.module.css'
import { baseUrl, pageMetadata, serializeJsonLd, siteName } from './seo'

export const metadata = pageMetadata(
  '/',
  '김효진 | 프론트엔드 개발 블로그',
  '프론트엔드 개발자 김효진의 블로그. 개발하며 마주한 문제와 해결 과정, 실무 경험과 배움을 기록합니다.',
)

export default function Page() {
  return (
    <section className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        alternateName: '김효진 개발 블로그',
        url: baseUrl,
        inLanguage: 'ko-KR',
      }) }} />
      <header className={styles.intro}>
        <h1 className={styles.title}>
          환영합니다! <span className={styles.emoji} aria-hidden="true">🤍 😎 👩🏻‍💻</span>
        </h1>
        <div className={styles.description}>
          <p>이곳은 프론트엔드 개발을 하며 마주한 문제들과 그 해결 과정, 그리고 배움을 기록하는 공간입니다. 가끔 개인적인 일상을 기록하는 일기장이 될 수도 있구요!</p>
          <p>실무에서 겪은 경험과 기술적 인사이트를 공유하며, 함께 성장하는 개발자가 되고자 합니다. 편하게 둘러보시고, 궁금한 점이나 의견이 있다면 언제든지 연락 주세요!</p>
        </div>
        <nav className={styles.shortcuts} aria-label="프로필 바로가기">
          <Link href="/about">소개·이력서 <span aria-hidden="true">→</span></Link>
          <Link href="https://github.com/hy57in" target="_blank" rel="noopener noreferrer" aria-label="GitHub (새 탭)">GitHub <span aria-hidden="true">↗</span></Link>
          <Link href="mailto:gywls00100@gmail.com">이메일 <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>
      <section className={styles.writing} aria-labelledby="recent-posts-title">
        <div className={styles.writingHeader}>
          <h2 id="recent-posts-title" className={styles.sectionTitle}>Recent Posts</h2>
          <Link className="text-link" href="/blog">전체 글 보기 <span aria-hidden="true">→</span></Link>
        </div>
        <BlogPosts />
      </section>
    </section>
  )
}
