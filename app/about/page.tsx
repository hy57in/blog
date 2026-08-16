import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { resume, type ResumeItem, type ResumeSkillGroup } from './resume-data'
import { isResumeDownloadEnabled, resumeDownloadPath, resumePdfFileName } from './resume-download'

const showResumeDownload = isResumeDownloadEnabled(process.env.NODE_ENV)

export const metadata: Metadata = {
  title: 'About',
  description: resume.profile.headline,
  openGraph: {
    title: `${resume.profile.name} | ${resume.profile.role}`,
    description: resume.profile.headline,
  },
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2
      id={id}
      className="mb-5 border-b border-border pb-2 text-lg font-semibold tracking-tight text-text dark:border-border-dark dark:text-text-dark md:mb-6 md:text-xl"
    >
      {children}
    </h2>
  )
}

function Tags({ values, label = '기술 스택' }: { values: readonly string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex list-none flex-wrap gap-1.5 p-0">
      {values.map((value) => (
        <li
          key={value}
          className="rounded border border-border bg-neutral-100 px-2 py-0.5 text-[11px] text-text-secondary dark:border-border-dark dark:bg-neutral-800 dark:text-text-secondary-dark"
        >
          {value}
        </li>
      ))}
    </ul>
  )
}

function SkillGroups({ groups }: { groups: readonly ResumeSkillGroup[] }) {
  return (
    <dl className="grid gap-2.5">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-1.5 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-4">
          <dt className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark">{group.label}</dt>
          <dd>
            <Tags values={group.values} label={group.label} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

function CompactItems({ items }: { items: readonly ResumeItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <article key={`${item.name}-${item.period}`} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-6">
          <div>
            <h3 className="font-semibold text-text dark:text-text-dark">{item.name}</h3>
            {item.description && <p className="mt-1 text-sm text-text dark:text-text-dark">{item.description}</p>}
            {item.detail && (
              <p className="mt-0.5 text-sm text-text-secondary dark:text-text-secondary-dark">{item.detail}</p>
            )}
          </div>
          <p className="text-sm tabular-nums text-text-secondary dark:text-text-secondary-dark sm:text-right">
            {item.period}
          </p>
        </article>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <article className="resume-page pb-4">
      <header className="resume-profile relative mb-10 pb-4 md:mb-12">
        {showResumeDownload && (
          <a
            href={resumeDownloadPath}
            download={resumePdfFileName}
            aria-label="PDF 이력서 다운로드"
            title="PDF 이력서 다운로드"
            className="absolute right-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 dark:border-border-dark dark:text-text-secondary-dark dark:hover:border-primary-dark dark:hover:text-primary-dark dark:focus-visible:border-primary-dark dark:focus-visible:text-primary-dark dark:focus-visible:ring-primary-dark/30"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

        <div className="flex items-start gap-5 pr-10 md:gap-7">
          <Image
            src="/images/about/profile-image.png"
            alt="김효진"
            width={400}
            height={400}
            priority
            className="h-24 w-24 shrink-0 rounded-full border border-border object-cover dark:border-border-dark md:h-28 md:w-28"
          />
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-medium text-primary dark:text-primary-dark">{resume.profile.role}</p>
            <h1
              aria-label={`${resume.profile.name} ${resume.profile.englishName}`}
              className="text-2xl font-semibold tracking-tight text-text dark:text-text-dark md:text-3xl"
            >
              {resume.profile.name}
              <span className="ml-2 text-base font-normal text-text-secondary dark:text-text-secondary-dark md:text-lg">
                {resume.profile.englishName}
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text dark:text-text-dark md:text-[15px]">
              {resume.profile.headline}
            </p>
          </div>
        </div>

        <nav aria-label="연락처" className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {resume.profile.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary dark:text-text-secondary-dark dark:decoration-border-dark dark:hover:text-primary-dark dark:focus-visible:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-auto text-xs text-text-secondary dark:text-text-secondary-dark">
            Updated {resume.updatedAt}
          </span>
        </nav>
      </header>

      <section className="resume-section mb-12 md:mb-14" aria-labelledby="summary-title">
        <SectionTitle id="summary-title">Summary</SectionTitle>
        <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-text marker:text-primary dark:text-text-dark dark:marker:text-primary-dark md:text-[15px]">
          {resume.profile.introduction.map((paragraph) => (
            <li key={paragraph} className="pl-0.5">
              {paragraph}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <SkillGroups groups={resume.coreSkillGroups} />
        </div>
      </section>

      <section className="resume-section mb-12 md:mb-14" aria-labelledby="experience-title">
        <SectionTitle id="experience-title">Work Experience</SectionTitle>
        <div className="space-y-12 md:space-y-14">
          {resume.experiences.map((experience) => (
            <article key={experience.company} className="resume-experience">
              <header className="grid gap-3 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                <div className="flex items-start gap-3">
                  <Image
                    src={experience.logo}
                    alt=""
                    width={32}
                    height={32}
                    className="mt-0.5 h-8 w-8 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-text dark:text-text-dark md:text-lg">
                      <Link
                        href={experience.companyUrl}
                        className="transition-colors hover:text-primary focus-visible:text-primary dark:hover:text-primary-dark dark:focus-visible:text-primary-dark"
                      >
                        {experience.company}
                      </Link>
                    </h3>
                    <p className="mt-0.5 text-sm text-text-secondary dark:text-text-secondary-dark">
                      {experience.role} · {experience.team}
                    </p>
                  </div>
                </div>
                <p className="pl-11 text-sm tabular-nums text-text-secondary dark:text-text-secondary-dark sm:pl-0 sm:text-right">
                  {experience.period}
                </p>
              </header>

              {experience.summary && (
                <p className="mt-4 text-sm leading-relaxed text-text dark:text-text-dark md:text-[15px]">
                  {experience.summary}
                </p>
              )}
              <div className="mt-4">
                <Tags values={experience.technologies} />
              </div>

              {experience.highlightsTitle && (
                <h4 className="mt-5 text-base font-semibold leading-snug tracking-tight text-text dark:text-text-dark">
                  {experience.highlightsTitle}
                </h4>
              )}

              <ul
                className={`${experience.highlightsTitle ? 'mt-2.5' : 'mt-5'} space-y-5 pl-5 ${
                  experience.highlights.some((highlight) => highlight.title)
                    ? 'border-l border-border dark:border-border-dark'
                    : 'list-disc marker:text-primary/70 dark:marker:text-primary-dark/70'
                }`}
              >
                {experience.highlights.map((highlight) => (
                  <li key={highlight.title ?? highlight.description}>
                    {highlight.title && (
                      <h4 className="text-base font-semibold leading-snug tracking-tight text-text dark:text-text-dark">
                        {highlight.title}
                      </h4>
                    )}
                    <p
                      className={`${highlight.title ? 'mt-1.5' : ''} text-sm leading-relaxed text-text dark:text-text-dark`}
                    >
                      {highlight.description}
                    </p>
                    {highlight.details && (
                      <ul className="mt-2.5 list-disc space-y-2.5 pl-5 marker:text-primary/70 dark:marker:text-primary-dark/70">
                        {highlight.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-sm leading-relaxed text-text dark:text-text-dark"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section mb-12 md:mb-14" aria-labelledby="other-title">
        <SectionTitle id="other-title">Other Experience</SectionTitle>
        <div>
          <CompactItems items={resume.otherExperience} />
        </div>
      </section>

      <section className="resume-section mb-10" aria-labelledby="education-title">
        <SectionTitle id="education-title">Education</SectionTitle>
        <div>
          <CompactItems items={resume.education} />
        </div>
      </section>
    </article>
  )
}
