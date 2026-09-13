import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { resume, type ResumeHighlight, type ResumeItem } from './resume-data'
import { resumeDownloadPath, resumePdfFileName } from './resume-download'
import styles from './resume.module.css'
import { BackToTop } from './back-to-top'

export const metadata: Metadata = {
  title: 'About',
  description: resume.profile.headline,
  openGraph: {
    title: `${resume.profile.name} | ${resume.profile.role}`,
    description: resume.profile.headline,
  },
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 id={id} className={styles.sectionTitle}>{children}</h2>
}

function Tags({ values }: { values: readonly string[] }) {
  return (
    <ul aria-label="기술 스택" className={styles.skills}>
      {values.map((value) => <li key={value}>{value}</li>)}
    </ul>
  )
}

function Highlights({
  highlights,
  heading: Heading = 'h4',
}: {
  highlights: readonly ResumeHighlight[]
  heading?: 'h4' | 'h5'
}) {
  if (!highlights.length) return null
  const hasHeadings = highlights.some((highlight) => highlight.title)

  return (
    <ul className={`${styles.highlights} ${hasHeadings ? styles.titledHighlights : styles.plainHighlights}`}>
      {highlights.map((highlight) => (
        <li key={highlight.title ?? highlight.description} className={styles.highlight}>
          {highlight.title ? (
            <>
              <Heading className={styles.highlightTitle}>{highlight.title}</Heading>
              <ul className={styles.details}>
                {[highlight.description, ...(highlight.details ?? [])].map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </>
          ) : (
            <>
              <p className={styles.description}>{highlight.description}</p>
              {highlight.details?.length ? (
                <ul className={styles.nestedDetails}>
                  {highlight.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              ) : null}
            </>
          )}
          {highlight.links?.length ? (
            <p className={styles.relatedLinks}>
              {highlight.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}<span className={styles.externalMark} aria-hidden="true">↗</span>
                </Link>
              ))}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function CompactItems({ items }: { items: readonly ResumeItem[] }) {
  return (
    <div className={styles.compactItems}>
      {items.map((item) => (
        <article key={`${item.name}-${item.period}`} className={styles.compactItem}>
          <div>
            <h3 className={styles.compactTitle}>{item.name}</h3>
            {item.description && <p className={styles.description}>{item.description}</p>}
            {item.detail && <p className={styles.secondary}>{item.detail}</p>}
          </div>
          <p className={styles.period}>{item.period}</p>
        </article>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <article className={`resume-page ${styles.page}`}>
      <header className={styles.profile}>
        <Image
          src="/images/about/profile-image.png"
          alt="김효진"
          width={400}
          height={400}
          priority
          className={styles.portrait}
        />
        <div className={styles.identity}>
          <h1 id="resume-top" tabIndex={-1} className={styles.name}>
            {resume.profile.name}<span>{resume.profile.englishName}</span>
          </h1>
          <p className={styles.role}>{resume.profile.role}</p>
          <nav aria-label="연락처" className={styles.contacts}>
            {resume.profile.links.map((link) => (
              <Link key={link.label} href={link.href}>
                <span className={styles.contactLabel}>{link.label}</span>
                <span className={styles.contactValue}>{link.display}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.profileActions}>
            <a href={resumeDownloadPath} download={resumePdfFileName} className={styles.download}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              PDF 다운로드
            </a>
          <p className={styles.updated}>Updated {resume.updatedAt}</p>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="summary-title">
        <SectionTitle id="summary-title">Summary</SectionTitle>
        <ul className={styles.summary}>
          {resume.profile.introduction.map((paragraph) => <li key={paragraph}>{paragraph}</li>)}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="experience-title">
        <SectionTitle id="experience-title">Work Experience</SectionTitle>
        <nav aria-label="회사별 경력 바로가기" className={styles.contents}>
          <ul>
            {resume.experiences.map((experience, index) => (
              <li key={experience.company}>
                <a href={`#experience-${index}-title`}>{experience.company}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {resume.experiences.map((experience, index) => (
            <article key={experience.company} aria-labelledby={`experience-${index}-title`} className={styles.experience}>
              <div className={styles.experienceIntro}>
                <header className={styles.companyHeader}>
                  <div className={styles.companyIdentity}>
                    <Image src={experience.logo} alt="" width={40} height={40} className={styles.companyLogo} />
                    <div>
                      <h3 id={`experience-${index}-title`} tabIndex={-1} className={styles.companyTitle}>
                        <Link href={experience.companyUrl}>{experience.company}</Link>
                      </h3>
                      <p className={styles.secondary}>{experience.role} · {experience.team}</p>
                    </div>
                  </div>
                  <p className={styles.period}>{experience.period}</p>
                </header>
                {experience.summary && <p className={styles.companySummary}>{experience.summary}</p>}
                {experience.responsibilities?.length ? (
                  <dl className={styles.responsibilities}>
                    {experience.responsibilities.map(({ area, description }) => (
                      <div key={area}>
                        <dt>{area}: </dt><dd>{description}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <Tags values={experience.technologies} />
              </div>
              {experience.highlightsTitle && <h4 className={styles.projectTitle}>{experience.highlightsTitle}</h4>}
              <Highlights highlights={experience.highlights} heading={experience.highlightsTitle ? 'h5' : 'h4'} />
              {experience.projects?.map((project) => (
                <div key={project.title || project.description || project.highlights[0]?.description} className={styles.project}>
                  <div className={styles.projectIntro}>
                    {project.title && <h4 className={styles.projectTitle}>{project.title}</h4>}
                    {project.description && <p className={styles.description}>{project.description}</p>}
                  </div>
                  <Highlights highlights={project.highlights} heading={project.title ? 'h5' : 'h4'} />
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="other-title">
        <SectionTitle id="other-title">Other Experience</SectionTitle>
        <CompactItems items={resume.otherExperience} />
      </section>
      <section className={styles.section} aria-labelledby="education-title">
        <SectionTitle id="education-title">Education</SectionTitle>
        <CompactItems items={resume.education} />
      </section>
      <BackToTop />
    </article>
  )
}
