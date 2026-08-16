import assert from 'node:assert/strict'
import test from 'node:test'
import { resume } from '../app/about/resume-data.ts'
import {
  isResumeDownloadEnabled,
  resumeDownloadPath,
  resumePdfFallbackFileName,
  resumePdfFileName,
} from '../app/about/resume-download.ts'

test('keeps resume profile and contact links complete', () => {
  assert.ok(resume.profile.name)
  assert.equal(
    resume.profile.headline,
    '글로벌 콘텐츠 SaaS와 B2B 운영 플랫폼을 경험하며, 복잡한 요구사항을 제품 구조와 프런트엔드 아키텍처로 풀고 반복되는 문제를 팀의 시스템으로 바꿔온 Frontend Engineer',
  )
  assert.ok(resume.profile.links.some((link) => link.href.startsWith('mailto:')))
  assert.ok(resume.profile.links.some((link) => link.href === 'mailto:gywls00100@gmail.com'))
  assert.ok(resume.profile.links.some((link) => link.label === 'GitHub'))
  assert.ok(resume.profile.links.some((link) => link.href === 'https://hyojin.dev'))
  assert.ok(resume.profile.links.every((link) => link.display))
  assert.equal(resume.profile.featuredLinks.length, 2)
  assert.ok(resume.profile.featuredLinks.every((link) => link.href.startsWith('https://hyojin.dev/blog/')))
  assert.deepEqual(resume.coreSkillGroups, [
    {
      label: 'Product Engineering',
      values: ['React', 'TypeScript', 'Next.js', 'TanStack Query'],
    },
    {
      label: 'Engineering Practices',
      values: ['Frontend Architecture', 'Global/i18n', 'Testing', 'AI/AX'],
    },
  ])

  const introduction = resume.profile.introduction.join(' ')
  assert.match(introduction, /Toss·비마이프렌즈·오늘의집/)
  assert.match(introduction, /글로벌 팬덤 플랫폼 b\.stage를 약 3년간 개발/)
  assert.match(introduction, /현재 CJ올리브영 미국 첫 오프라인 매장 어드민의 초기 구축부터/)
  assert.match(introduction, /반복 업무와 품질 편차를 줄이는 개발 시스템/)
})

test('keeps achievement titles formal and supporting copy concise', () => {
  const experienceContent = resume.experiences.flatMap((experience) => [experience, experience.pdf])
  const achievementTitles = experienceContent.flatMap((content) => [
    ...(content.highlightsTitle ? [content.highlightsTitle] : []),
    ...content.highlights.flatMap((highlight) => (highlight.title ? [highlight.title] : [])),
  ])
  const supportingCopy = [
    ...resume.profile.introduction,
    ...experienceContent.flatMap((content) => [
      ...(content.summary ? [content.summary] : []),
      ...content.highlights.flatMap((highlight) => [
        highlight.description,
        ...(highlight.details ?? []),
      ]),
    ]),
    ...resume.otherExperience.flatMap((item) => (item.description ? [item.description] : [])),
  ]

  for (const title of achievementTitles) {
    assert.match(title, /(?:습니다|합니다|입니다)\.$/, `incomplete achievement title: ${title}`)
  }
  for (const copy of supportingCopy) {
    assert.doesNotMatch(copy, /(?:습니다|합니다|입니다)\.$/, `verbose supporting copy: ${copy}`)
    assert.doesNotMatch(copy, /\.$/, `supporting copy should not end with a period: ${copy}`)
  }
})

test('keeps every experience ready for both web and PDF rendering', () => {
  assert.ok(resume.experiences.length >= 4)

  for (const experience of resume.experiences) {
    assert.ok(experience.company)
    assert.match(experience.companyUrl, /^https:\/\//)
    assert.ok(experience.logo.startsWith('/images/about/'))
    assert.ok(experience.period)
    assert.ok(experience.team)
    assert.ok(experience.technologies.length > 0)
    assert.ok(experience.highlights.length > 0)
    assert.ok(experience.pdf.technologies.length > 0)
    assert.ok(experience.pdf.highlights.length > 0)
  }
})

test('keeps the reviewed web detail for earlier companies', () => {
  const todayHouse = resume.experiences.find((experience) => experience.company.includes('오늘의집'))
  const bemyfriends = resume.experiences.find((experience) => experience.company.includes('비마이프렌즈'))
  const toss = resume.experiences.find((experience) => experience.company.includes('Toss'))

  assert.ok(todayHouse)
  assert.ok(bemyfriends)
  assert.ok(toss)
  assert.equal(
    todayHouse.highlightsTitle,
    'Technical SEO로 검색 유입을 개선하고 대규모 페이지 색인 구조를 정비했습니다.',
  )
  assert.deepEqual(bemyfriends.highlights.map((highlight) => highlight.title), [
    '관리자가 콘텐츠와 화면 구성을 직접 편집할 수 있는 시스템을 구축했습니다.',
    '트리 데이터 모델을 설계해 상품 카테고리 확장에 대응했습니다.',
    'TanStack Query v5 마이그레이션을 주도해 데이터 패칭 기준을 표준화했습니다.',
    '글로벌 서비스의 번들·운영 구조를 개선했습니다.',
  ])
  assert.deepEqual(toss.highlights.map((highlight) => highlight.title), [
    '반복되는 UI를 디자인 시스템 컴포넌트로 표준화했습니다.',
    'Resource Center와 Chrome Extension을 개발해 검색·필터링 UX를 개선했습니다.',
  ])

  const earlierCompanyText = [todayHouse, bemyfriends, toss]
    .flatMap((experience) =>
      experience.highlights.flatMap((highlight) => [highlight.description, ...(highlight.details ?? [])]),
    )
    .join(' ')
  assert.match(earlierCompanyText, /첫 배포 직후 SEO 유입량 20% 증가/)
  assert.match(earlierCompanyText, /다국어 JSON을 CDN 서빙 구조로 전환/)
  assert.match(earlierCompanyText, /Resource Center와 Chrome Extension 개발/)
})

test('keeps a separate reviewed two-page PDF summary inside the shared source', () => {
  const [oliveYoung, todayHouse, bemyfriends, toss] = resume.experiences

  assert.deepEqual(oliveYoung.pdf.technologies, [
    'React',
    'TypeScript',
    'TanStack Query',
    'Zustand',
    'React Hook Form',
    'MUI',
    'Datadog',
  ])
  assert.deepEqual(
    oliveYoung.pdf.highlights.map((highlight) => highlight.title),
    [
      '상태 기반 매장 운영 프로세스를 구축하고 현장 피드백을 반영했습니다.',
      '가상화 테이블과 테스트 인프라로 대규모 데이터 화면의 품질 기반을 구축했습니다.',
      '프론트엔드 인프라를 이관하고 장애 모니터링 기반을 구축했습니다.',
      '프론트엔드 개발 표준을 체계화하고 AI 자동화를 팀의 작업 방식으로 연결했습니다.',
    ],
  )
  assert.equal(
    todayHouse.pdf.highlightsTitle,
    'Technical SEO로 검색 유입을 개선하고 대규모 페이지 색인 구조를 정비했습니다.',
  )
  assert.equal(bemyfriends.pdf.highlights.length, 3)
  assert.ok(bemyfriends.pdf.highlights.every((highlight) => !highlight.title))
  assert.equal(toss.pdf.highlights.length, 2)
  assert.ok(toss.pdf.highlights.every((highlight) => !highlight.title))
})

test('keeps the reviewed Olive Young facts in the shared data', () => {
  const oliveYoung = resume.experiences.find((experience) => experience.company === 'CJ올리브영')

  assert.ok(oliveYoung)
  assert.equal(oliveYoung.period, '2025.09.22 ~ 현재')
  assert.equal(oliveYoung.role, 'Software Sr. Engineer')
  assert.equal(oliveYoung.team, '파트너/Ads플랫폼개발팀')
  assert.match(oliveYoung.summary ?? '', /미국 첫 오프라인 매장 어드민을 초기 구축/)
  const oliveYoungText = oliveYoung.highlights
    .flatMap((highlight) => [highlight.description, ...(highlight.details ?? [])])
    .join(' ')
  assert.match(oliveYoungText, /승인요청·승인·반려·철회/)
  assert.match(oliveYoungText, /10만 행 데모·103개 단위 테스트/)
  assert.match(oliveYoungText, /프로덕션 적용 준비/)
  assert.match(oliveYoungText, /ImagePreviewModal을 44개 단위 테스트/)
  assert.match(oliveYoungText, /7개 FE 컨벤션/)
  assert.match(oliveYoungText, /EKS → ECS Fargate/)
  assert.match(oliveYoungText, /1,700개\+ Nexacro 레거시 화면/)
  assert.match(oliveYoungText, /Multi-Agent Migration PoC/)
  assert.deepEqual(
    oliveYoung.highlights.map((highlight) => highlight.title),
    [
      '상태 기반 매장 운영 프로세스를 구축하고 현장 피드백을 반영했습니다.',
      '가상화 테이블로 대규모 데이터 렌더링 기반을 구축했습니다.',
      'QA 시나리오를 PR 품질 게이트로 연결했습니다.',
      '프론트엔드 인프라를 이관하고 장애 모니터링 기반을 구축했습니다.',
      '프론트엔드 개발 표준을 체계화하고 AI 자동화를 팀의 작업 방식으로 연결했습니다.',
    ],
  )

  assert.equal(oliveYoung.highlights.length, 5)
  assert.ok(oliveYoung.highlights.every((highlight) => highlight.title && highlight.description))
})

test('keeps the reviewed education entries', () => {
  assert.deepEqual(resume.education.map((education) => education.name), [
    '중앙대학교 소프트웨어학부 소프트웨어학과',
    '세종과학고등학교',
  ])
})

test('keeps the reviewed community descriptions in the shared resume data', () => {
  assert.deepEqual(
    resume.otherExperience.map(({ name, description }) => ({ name, description })),
    [
      {
        name: 'CJ올리브영 Tech Organizer',
        description:
          '사내 테크 이벤트를 기획·운영하며 엔지니어의 목소리를 연결하는 Tech Advocate로 활동, 팀 테크 세션의 유닛 단위 확장과 첫 유닛 타운홀·미국 매장 오픈 기술 여정 영상·패널 토크를 기획해 기술 교류와 Sync & Alignment 촉진',
      },
      {
        name: 'SIPE 3기 운영진',
        description:
          '공식 홈페이지의 Next.js App Router 마이그레이션과 스타일 시스템 개선, 개발자 커뮤니티 행사 기획·운영',
      },
      {
        name: '디프만 11기 Web Front-End 운영진',
        description:
          '디프만 홈페이지 개발과 프로젝트 팀장/PM 활동, 인프런 협업 멘토링 행사 기획·운영',
      },
    ],
  )
})

test('keeps resume downloads local to the development environment', () => {
  assert.equal(resumeDownloadPath, '/about/resume.pdf')
  assert.equal(resumePdfFileName, '김효진_NAVER_WEBTOON_Frontend_Resume.pdf')
  assert.equal(resumePdfFallbackFileName, 'Hyojin_Kim_NAVER_WEBTOON_Frontend_Resume.pdf')
  assert.equal(isResumeDownloadEnabled('development'), true)
  assert.equal(isResumeDownloadEnabled('production'), false)
  assert.equal(isResumeDownloadEnabled(undefined), false)
})
