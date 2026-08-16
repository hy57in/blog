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
  assert.match(introduction, /현재 CJ올리브영에서는 미국 첫 오프라인 매장 어드민의 초기 구축부터/)
  assert.match(introduction, /반복 업무와 품질 편차를 줄이는 개발 시스템/)
})

test('keeps resume narrative copy in a consistent formal style', () => {
  const narrativeCopy = [
    ...resume.profile.introduction,
    ...resume.experiences.flatMap((experience) => [
      ...(experience.summary ? [experience.summary] : []),
      ...(experience.highlightsTitle ? [experience.highlightsTitle] : []),
      ...experience.highlights.flatMap((highlight) => [
        ...(highlight.title ? [highlight.title] : []),
        highlight.description,
        ...(highlight.details ?? []),
      ]),
    ]),
    ...resume.otherExperience.flatMap((item) => (item.description ? [item.description] : [])),
  ]

  for (const copy of narrativeCopy) {
    const sentences = copy.split(/(?<=\.)\s+/)

    for (const sentence of sentences) {
      assert.match(sentence, /(?:습니다|합니다|입니다)\.$/, `inconsistent sentence ending: ${sentence}`)
    }
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
  }
})

test('keeps the reviewed content and section titles for earlier companies', () => {
  const todayHouse = resume.experiences.find((experience) => experience.company.includes('오늘의집'))
  const bemyfriends = resume.experiences.find((experience) => experience.company.includes('비마이프렌즈'))
  const toss = resume.experiences.find((experience) => experience.company.includes('Toss'))

  assert.ok(todayHouse)
  assert.ok(bemyfriends)
  assert.ok(toss)
  assert.deepEqual(
    todayHouse.highlights.map((highlight) => highlight.description),
    [
      '커뮤니티 검색 유입 확대를 위한 Technical SEO 과제를 수행해 첫 배포 직후 SEO 유입량을 20% 높였습니다.',
      '수만 개 커뮤니티 페이지를 빌드 시간 증가 없이 관리하기 위해 정적 생성 대신 서버 사이드 동적 sitemap 생성 → S3 업로드 → index sitemap 생성 → Next.js rewrite 서빙 구조를 설계하고 GitHub Actions cron으로 자동화했습니다.',
      'robots.txt, semantic markup, 구조화 데이터와 크롤링 우선순위를 정비해 검색엔진이 콘텐츠 구조를 안정적으로 탐색할 수 있도록 개선했습니다.',
    ],
  )
  assert.deepEqual(
    bemyfriends.highlights.map((highlight) => highlight.description),
    [
      '홈 에디터에서 BE와 초기 스키마 설계부터 참여하고 SSR/CSR 분리 및 미리보기 구조를 설계해 관리자가 콘텐츠와 화면 구성을 직접 편집할 수 있는 시스템을 구축했습니다.',
      '3-depth 상품 카테고리 확장에서 트리 데이터 모델과 drag & drop을 고려한 SortableTree를 설계하고 정적 Shop Home을 동적 커스터마이징 시스템으로 확장했습니다.',
      'TanStack Query v5 마이그레이션을 주도하고 사내 세미나를 진행하며 데이터 패칭 기준과 반복 로직을 표준화했습니다.',
      'User/Admin 디자인 시스템 패키지 개발에서 FE-PD 간 컴포넌트 API를 조율하고, 다국어 JSON을 CDN 서빙 구조로 전환해 글로벌 서비스의 번들·운영 구조를 개선했습니다.',
    ],
  )
  assert.equal(
    bemyfriends.summary,
    '약 3년간 글로벌 팬덤 비즈니스 플랫폼 b.stage의 User·Admin·Console과 공통 패키지를 개발하며 팬의 콘텐츠 소비 경험과 창작자·운영자를 위한 B2B 도구를 함께 개선했습니다.',
  )
  assert.deepEqual(
    toss.highlights.map((highlight) => highlight.description),
    [
      'Toss 브랜드 홈페이지, NEXT 개발자 채용 홈페이지, SLASH22 등 브랜드·채용·컨퍼런스 웹사이트를 개발했습니다.',
      'Section·Navigation·Hero 등 반복 UI를 디자인 시스템 컴포넌트와 Storybook 템플릿으로 만들어 FE-PD 협업의 반복 작업을 표준화했습니다.',
      '개발자·디자이너용 Resource Center와 Chrome Extension을 개발하고 검색·필터링 UX와 성능을 개선했으며, 개발 스펙·일정 산정과 QA 프로세스 개선에 참여했습니다.',
    ],
  )
  assert.deepEqual(
    [todayHouse.highlightsTitle, bemyfriends.highlightsTitle, toss.highlightsTitle],
    [
      'Technical SEO로 검색 유입을 20% 높이고 대규모 페이지 색인 구조를 개선했습니다.',
      '관리 도구·상품 구조·공통 개발 기반을 확장했습니다.',
      '브랜드 홈페이지를 개발하고 디자인 시스템을 구축했습니다.',
    ],
  )
  assert.ok([...todayHouse.highlights, ...bemyfriends.highlights, ...toss.highlights].every((item) => !item.title))
})

test('keeps the Notion resume source facts in the shared data', () => {
  const oliveYoung = resume.experiences.find((experience) => experience.company === 'CJ올리브영')

  assert.ok(oliveYoung)
  assert.equal(oliveYoung.period, '2025.09.22 ~ 현재')
  assert.equal(oliveYoung.role, 'Software Sr. Engineer')
  assert.equal(oliveYoung.team, '파트너/Ads플랫폼개발팀')
  assert.equal(oliveYoung.summary, undefined)
  const oliveYoungText = oliveYoung.highlights
    .flatMap((highlight) => [highlight.description, ...(highlight.details ?? [])])
    .join(' ')
  assert.match(oliveYoungText, /약 5개월간 글로벌 매장 운영 어드민을 초기 구축/)
  assert.match(oliveYoungText, /운영 안정화와 기능 개선을 지속/)
  assert.match(oliveYoungText, /103개 단위 테스트, Storybook 문서화를 완료/)
  assert.match(oliveYoungText, /프로덕션 적용을 준비 중/)
  assert.match(oliveYoungText, /ImagePreviewModal을 44개 단위 테스트/)
  assert.match(oliveYoungText, /7개 FE 코드 컨벤션/)
  assert.match(oliveYoungText, /EKS → ECS Fargate/)
  assert.match(oliveYoungText, /1,700개\+ Nexacro 레거시 화면/)
  assert.match(oliveYoungText, /Multi-Agent Migration PoC/)
  assert.deepEqual(
    oliveYoung.highlights.slice(0, 4).map((highlight) => highlight.title),
    [
      '미국 첫 오프라인 매장 어드민을 구축하고 운영 안정화를 이어가고 있습니다.',
      '가상화 테이블로 대규모 데이터 렌더링을 최적화했습니다.',
      '프론트엔드 인프라를 이관하고 장애 모니터링 기반을 구축했습니다.',
      '개발 표준과 AI 자동화를 팀의 공통 시스템으로 확장했습니다.',
    ],
  )

  assert.equal(oliveYoung.highlights.length, 4)
  assert.ok(oliveYoung.highlights.every((highlight) => highlight.title && highlight.description))
  assert.ok(oliveYoung.highlights.every((highlight) => (highlight.details?.length ?? 0) <= 2))
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
          '사내 테크 이벤트를 기획·운영하며 엔지니어의 목소리를 연결하는 Tech Advocate로 활동합니다. 팀 테크 세션을 유닛 단위로 확장하고 첫 유닛 타운홀, 미국 매장 오픈 기술 여정 영상·패널 토크를 기획해 기술 교류와 Sync & Alignment를 촉진했습니다.',
      },
      {
        name: 'SIPE 3기 운영진',
        description:
          '공식 홈페이지를 Next.js App Router로 마이그레이션하고 스타일 시스템을 개선했으며, 개발자 커뮤니티 행사를 기획·운영했습니다.',
      },
      {
        name: '디프만 11기 Web Front-End 운영진',
        description:
          '디프만 홈페이지를 개발하고 프로젝트 팀장/PM으로 활동했으며, 인프런 협업 멘토링 행사를 기획·운영했습니다.',
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
