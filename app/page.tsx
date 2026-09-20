import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import Image from 'next/image'
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
        <div className={styles.introHeading}>
          <div>
            <h1 className={styles.title}>
              환영합니다! <span className={styles.emoji} aria-hidden="true">🤍 😎 👩🏻‍💻</span>
            </h1>
            <p className={styles.byline}>Hyojin Kim <span aria-hidden="true">·</span> Front-end Engineer</p>
          </div>
          <Image src="/images/about/profile-image.png" alt="김효진" width={80} height={80} sizes="(max-width: 600px) 56px, 80px" priority className={styles.portrait} />
        </div>
        <div className={styles.description}>
          <p>이곳은 프론트엔드 개발을 하며 마주한 문제들과 그 해결 과정, 그리고 배움을 기록하는 공간입니다. 가끔 개인적인 일상을 기록하는 일기장이 될 수도 있구요!</p>
          <p>실무에서 겪은 경험과 기술적 인사이트를 공유하며, 함께 성장하는 개발자가 되고자 합니다. 편하게 둘러보시고, 궁금한 점이나 의견이 있다면 언제든지 연락 주세요!</p>
        </div>
        <nav className={styles.shortcuts} aria-label="프로필 바로가기">
          <Link href="/about">
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>
            소개·이력서 <span aria-hidden="true">→</span>
          </Link>
          <Link href="https://github.com/hy57in" target="_blank" rel="noopener noreferrer" aria-label="GitHub (새 탭)">
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10m12-10v2a6 6 0 0 1-6 6H6" /></svg>
            GitHub <span aria-hidden="true">↗</span>
          </Link>
          <Link href="mailto:gywls00100@gmail.com">
            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
            이메일 <span aria-hidden="true">↗</span>
          </Link>
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
