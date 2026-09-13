import assert from 'node:assert/strict'
import test from 'node:test'
import { resume } from '../app/about/resume-data.ts'
import {
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
  assert.deepEqual(resume.profile.introduction, [
    '만드는 제품에 애정과 책임감을 갖고 일합니다. 비즈니스와 유저를 이해하고, 기획과 기술적인 논의에 참여하며 더 나은 제품을 함께 만들어가고 싶습니다.',
    '팀이 효율적으로 일할 수 있는 환경을 만드는 걸 좋아합니다. DX 개선의 가치를 믿고, 반복 업무 자동화와 공통 컴포넌트 및 개발 도구 구축 등 플랫폼 개선에 노력합니다.',
    '함께 일하는 동료에게 신뢰를 줄 수 있도록 노력합니다. 기술과 경험을 공유하며 서로에게 배우고 함께 성장하는 걸 좋아합니다.',
  ])
})

test('keeps company-specific title and supporting copy styles', () => {
  const experienceContent = resume.experiences
    .flatMap((experience) => [experience, experience.pdf])
  const achievementTitles = resume.experiences
    .filter(({ company }) => company === '비바리퍼블리카(Toss)')
    .flatMap((experience) => [experience, experience.pdf])
    .flatMap((content) => [
      ...(content.highlightsTitle ? [content.highlightsTitle] : []),
      ...[
        ...content.highlights,
        ...(content.projects ?? []).flatMap((project) => project.highlights),
      ].flatMap((highlight) => (highlight.title ? [highlight.title] : [])),
    ])
  const supportingCopy = [
    ...experienceContent.flatMap((content) => [
      ...content.highlights.flatMap((highlight) => [
        highlight.description,
        ...(highlight.details ?? []),
      ]),
      ...(content.projects ?? []).flatMap((project) => [
        project.title,
        ...(project.description ? [project.description] : []),
        ...project.highlights.flatMap((highlight) => [
          ...(highlight.title ? [highlight.title] : []),
          highlight.description,
          ...(highlight.details ?? []),
        ]),
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
    for (const content of [experience, experience.pdf]) {
      assert.ok(content.technologies.length > 0)
      assert.ok(content.highlights.length > 0 || (content.projects?.length ?? 0) > 0)
      for (const project of content.projects ?? []) {
        assert.ok(project.title)
        assert.ok(project.highlights.length > 0 || project.description)
      }
    }
  }
})

test('preserves restored company details and approved responsibilities in web and PDF', () => {
  const todayHouse = resume.experiences.find(({ company }) => company === '버킷플레이스(오늘의집)')
  const bemyfriends = resume.experiences.find(({ company }) => company === '비마이프렌즈(bemyfriends)')
  assert.ok(todayHouse)
  assert.ok(bemyfriends)

  // Visible source text from af6a2ab:app/about/page.tsx; markup and whitespace normalized.
  const expectedTodayHouse = {
    technologies: [
      'React',
      'TypeScript',
      'Next.js(page)',
      'emotion',
      'zustand',
      'Tanstack Query',
    ],
    highlightsTitle: '오늘의집 커뮤니티 SEO 개선',
    highlights: [
      {
        description: '첫 배포 직후 SEO 유입량 20% 상승, 커뮤니티 페이지 색인량 증가로 검색 노출 확대',
      },
      {
        description: '유저의 구매 결정 과정에서 문제를 해결해주고 커뮤니티 AU를 증가시키는 KR 달성을 위한 핵심 과제로 선정',
      },
      {
        description: 'robots.txt 크롤링 봇 추가와 시맨틱 마크업 적용으로 온페이지 SEO 개선, 구조화된 토론 포럼 리치 스니펫 구현을 통해 AI 검색에서 인용량 증가 달성',
      },
      {
        description: '동적 사이트맵 생성 자동화 시스템 구축:',
        links: [{ label: 'Sitemap Automation', display: 'Sitemap Automation', href: 'https://hyojin.dev/blog/sitemap-automation' }],
        details: [
          '수만 개 커뮤니티 페이지 사이트맵을 빌드 시간 증가 없이 실시간 관리하는 문제를 해결하기 위해, next-sitemap 기반 정적 생성 방식을 서버 사이드 동적 생성 시스템으로 추상화하여 재설계',
          '서버에서 동적 사이트맵 생성 후 S3 업로드 → S3 파일 조회를 통한 index sitemap 생성 및 업로드 → Next.js rewrite로 S3 경로 서빙하는 전체 파이프라인을 스크립트로 구현하고 GitHub Actions cron job으로 자동화',
          '한정된 크롤링 예산을 고려하여 삭제된 콘텐츠는 제외하고 최신/인기 콘텐츠 우선순위 알고리즘을 적용, 파일명 덮어쓰기 방식으로 효율적인 관리 구조 구현',
        ],
      },
    ],
  }
  const expectedBemyfriends = {
    summary: 'SaaS 기반 글로벌 팬덤 비즈니스 플랫폼 b.stage를 개발하고 유지보수했습니다.',
    responsibilities: [
      { area: 'User', description: '모바일 웹뷰와 PC·모바일 반응형 웹으로 제공되는 유저 서비스 개발' },
      { area: 'Admin', description: 'b.stage의 콘텐츠와 서비스를 관리하는 어드민 웹 개발' },
      { area: 'Console', description: '사내 운영자·개발자를 위한 어드민 툴 개발' },
      { area: 'Modules', description: '디자인 시스템 컴포넌트와 공통 라이브러리 등 모노레포 패키지 관리' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Zustand',
      'TanStack Query',
      'Module CSS',
    ],
    highlights: [
      {
        title: '기술 개선',
        description: 'yarn에서 pnpm으로 마이그레이션을 통해 패키지 관리 효율성 개선',
        details: [
          'TanStack Query v5 마이그레이션 주도 및 사내 세미나 진행, useInfiniteIntersectionObserver 커스텀 훅 개발로 무한스크롤 로직 표준화',
          '사내 디자인 시스템 bspoke-admin, bspoke-user 패키지 구현. FE-PD 간 커뮤니케이션 주도하여 Button 컴포넌트 완성, 타입 가드를 이용한 유연한 타입 대응',
          'reset.css 패키지화로 스타일 기준 통일, styled-components/Tailwind CSS를 Module CSS로 점진적 마이그레이션 주도',
          '코드리뷰봇 기능 개선, Jira Automation 구축, 다국어 관리 시스템 CDN 서빙 방식 전환을 통해 번들 사이즈 최적화 및 배포 프로세스 간소화',
        ],
      },
      {
        title: '주요 프로젝트',
        description: '스케줄 알림 기능 고도화 - 서버 리소스 부담 문제를 해결하기 위해 클라이언트 기반 인앱 스케줄 다운로드 방식을 제안하고 구현하여 효율적인 알림 시스템 구축',
        details: [
          '샵 카테고리 시스템 확장 - 1 depth를 3 depth로 확장하기 위한 트리 구조 데이터 관리와 드래그앤드롭 기반 SortableTree 컴포넌트 설계',
          '멀티라운지 - 라운지별 팔로우 시스템과 알림 설정 기능 제공. getHomeLayout 활용으로 불필요한 렌더링 최소화, TanStack Query v5 도입 및 invalidateQueries 활용한 효율적인 캐시 관리',
          '스테이지 커스텀 - 관리자가 브랜드를 차별화할 수 있는 홈 에디터 구축. BE와 초기 스키마 설계부터 참여하여 SSR/CSR 분리 구조 설계, 섹션 컴포넌트 패키지화로 어드민 미리보기 시스템 구현',
          '서베이/투표 - 팬덤 플랫폼 특화 서베이/투표 시스템 구축. presignedUrl 기반 보안 뷰어 페이지 개발, react-hook-form 활용한 문항 타입별 validation 구현',
          '디지털 리워드 - 리워드 타입별 모듈화된 컴포넌트 설계, 상품 구매 이력과 리워드 지급 조건 연동을 통한 자동화된 미션 시스템 구축',
        ],
      },
    ],
  }

  for (const [experience, expected] of [
    [todayHouse, expectedTodayHouse],
    [bemyfriends, expectedBemyfriends],
  ] as const) {
    const { company: _company, companyUrl: _url, logo: _logo, role: _role, team: _team, period: _period, pdf, ...web } = experience
    assert.deepEqual(web, expected)
    assert.deepEqual(pdf, expected)
  }
  assert.deepEqual(
    bemyfriends.highlights.map(({ description, details = [] }) => [description, ...details].length),
    [5, 6],
  )
  assert.deepEqual(
    [todayHouse, bemyfriends].map(({ period, role, team, companyUrl }) => ({ period, role, team, companyUrl })),
    [
      {
        period: '2025.07.28 ~ 2025.09.19',
        role: 'Software Engineer, Frontend',
        team: 'Content · Community Team',
        companyUrl: 'https://www.bucketplace.com/',
      },
      {
        period: '2022.09.05 ~ 2025.07.18',
        role: 'Front-end Developer',
        team: 'Client Team',
        companyUrl: 'https://bemyfriends.com/',
      },
    ],
  )
})

test('preserves the separate Toss PDF summary', () => {
  const toss = resume.experiences.find(({ company }) => company === '비바리퍼블리카(Toss)')
  assert.ok(toss)
  assert.deepEqual(toss.highlights.map((highlight) => highlight.title), [
    '반복되는 UI를 디자인 시스템 컴포넌트로 표준화했습니다.',
    'Resource Center와 Chrome Extension을 개발해 검색·필터링 UX를 개선했습니다.',
  ])
  assert.match(JSON.stringify(toss.highlights), /Resource Center와 Chrome Extension 개발/)
  assert.equal(toss.pdf.highlights.length, 2)
  assert.ok(toss.pdf.highlights.every((highlight) => !highlight.title))
})

test('keeps approved Olive Young projects and internal activities identical in web and PDF', () => {
  const oliveYoung = resume.experiences.find((experience) => experience.company === 'CJ올리브영')

  assert.ok(oliveYoung)
  assert.equal(resume.updatedAt, '2026.09')
  assert.equal(oliveYoung.period, '2025.09.22 ~ 현재')
  assert.equal(oliveYoung.role, 'Software Sr. Engineer')
  assert.equal(oliveYoung.team, '테크플랫폼센터 > 엔터프라이즈플랫폼유닛 > 파트너/Ads플랫폼개발팀')
  const { company: _company, companyUrl: _url, logo: _logo, role: _role, team: _team, period: _period, pdf, ...web } = oliveYoung
  assert.deepEqual(pdf, web)

  const projects = oliveYoung.projects
  assert.ok(projects)
  assert.deepEqual(projects.map(({ title }) => title), [
    '미국 매장 운영 플랫폼 ‘글로벌원’',
    '매장 직원용 모바일 업무 앱(PDA)',
    '사내 백오피스 ‘올리브원’의 프론트엔드 현대화',
    '사내 AI 개발 도구 공유',
    'Tech Organizer로 사내 기술 교류를 위한 테크 세션·타운홀 기획·운영',
  ])
  assert.deepEqual(projects.map(({ highlights }) => highlights.length), [3, 2, 2, 1, 0])
  const [globalOne, pda, modernization, aiSharing] = projects.map((project) =>
    [project.description, ...project.highlights.flatMap((highlight) => [
      highlight.title, highlight.description, ...(highlight.details ?? []),
    ])].join(' '),
  )
  assert.equal(projects[4].description, '2026년 CJ올리브영 Tech Organizer로 팀 내 테크 세션을 유닛 단위로 확장하고, 첫 유닛 타운홀 기획·운영. 미국 매장 오픈의 기술 여정을 소개하는 영상과 패널 토크를 기획해 엔지니어의 경험을 조직에 공유')
  assert.ok(!resume.otherExperience.some(({ name }) => name.includes('CJ올리브영')))
  assert.match(pda, /기술 선택과 초기 아키텍처 설계 전담/)
  assert.match(pda, /Claude Design에서 공통 디자인시스템/)
  assert.match(pda, /기존 동작과 업무 규칙을 테스트로 명시/)
  assert.match(pda, /코드의 의존 방향은 린트로 검사/)
  assert.match(globalOne, /DevOps와 EKS → ECS Fargate 전환을 추진/)
  assert.match(globalOne, /프론트엔드의 배포·검증 기준을 정하고 변경 결과 확인/)
  assert.match(globalOne, /DevOps와 전환 내용을 조율/)
  assert.match(modernization, /Nexacro와 React 컴포넌트의 1:1 매핑 표/)
  assert.match(modernization, /Migrator.*QA.*Report/)
  assert.match(modernization, /PoC/)
  assert.match(modernization, /기존 서비스를 유지하면서 단계적으로 React로 전환하는 방향을 동료들과 논의/)
  assert.match(modernization, /검증 결과와 한계/)
  assert.match(aiSharing, /PR·코드리뷰.*스킬을 제작.*사내 마켓플레이스에 플러그인으로 등록/)
  for (const projectText of [pda, globalOne, modernization]) {
    assert.doesNotMatch(projectText, /마켓플레이스/)
  }
})

test('excludes superseded screen totals and unverified migration metrics', () => {
  const oliveYoung = resume.experiences.find((experience) => experience.company === 'CJ올리브영')
  assert.ok(oliveYoung)
  const text = JSON.stringify(oliveYoung)
  assert.doesNotMatch(text, /1,?700|1,?300|202개|97%|49\/57/)
  assert.doesNotMatch(text, /운영 전환 완료|운영 사용 완료|자동 동기화|장애 감소율/)
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

test('keeps the public resume download path and filenames stable', () => {
  assert.equal(resumeDownloadPath, '/about/resume.pdf')
  assert.equal(resumePdfFileName, '김효진_Frontend_Resume.pdf')
  assert.equal(resumePdfFallbackFileName, 'Hyojin_Kim_Frontend_Resume.pdf')
})


test('attaches writing links to the relevant career examples', () => {
  const oliveYoung = resume.experiences.find(({ company }) => company === 'CJ올리브영')!
  const migration = oliveYoung.projects![2].highlights.find(({ title }) => title?.includes('Nexacro'))!
  const todayHouse = resume.experiences.find(({ company }) => company.includes('오늘의집'))!
  const sitemap = todayHouse.highlights.find(({ description }) => description.includes('동적 사이트맵 생성'))!
  assert.equal(migration.links?.[0].href, 'https://hyojin.dev/blog/ai-agent-legacy-migration')
  assert.equal(sitemap.links?.[0].href, 'https://hyojin.dev/blog/sitemap-automation')
})
