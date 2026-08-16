export type ResumeLink = {
  label: string
  display: string
  href: string
}

export type ResumeHighlight = {
  title?: string
  description: string
  details?: readonly string[]
}

export type ResumeExperience = {
  company: string
  companyUrl: string
  logo: string
  role: string
  team: string
  period: string
  summary?: string
  highlightsTitle?: string
  technologies: readonly string[]
  highlights: readonly ResumeHighlight[]
}

export type ResumeItem = {
  name: string
  period: string
  description?: string
  detail?: string
}

export type ResumeSkillGroup = {
  label: string
  values: readonly string[]
}

export type Resume = {
  updatedAt: string
  profile: {
    name: string
    englishName: string
    role: string
    headline: string
    introduction: readonly string[]
    links: readonly ResumeLink[]
    featuredLinks: readonly ResumeLink[]
  }
  coreSkillGroups: readonly ResumeSkillGroup[]
  experiences: readonly ResumeExperience[]
  otherExperience: readonly ResumeItem[]
  education: readonly ResumeItem[]
}

export const resume: Resume = {
  updatedAt: '2026.08',
  profile: {
    name: '김효진',
    englishName: 'Hyojin Kim',
    role: 'Front-end Engineer',
    headline:
      '글로벌 콘텐츠 SaaS와 B2B 운영 플랫폼을 경험하며, 복잡한 요구사항을 제품 구조와 프런트엔드 아키텍처로 풀고 반복되는 문제를 팀의 시스템으로 바꿔온 Frontend Engineer',
    introduction: [
      'Toss·비마이프렌즈·오늘의집을 거쳐 CJ올리브영에서 브랜드·콘텐츠·커뮤니티·B2B 운영 제품을 개발해왔습니다.',
      '글로벌 팬덤 플랫폼 b.stage를 약 3년간 개발했고, 현재 CJ올리브영에서는 미국 첫 오프라인 매장 어드민의 초기 구축부터 오픈 이후 운영 안정화와 기능 개선까지 담당하고 있습니다.',
      '기능 구현을 넘어 공통 UI·테스트·에러 처리·인프라·개발 표준으로 품질의 하한선을 높이고, AI를 반복 업무와 품질 편차를 줄이는 개발 시스템으로 활용합니다.',
    ],
    links: [
      { label: 'Email', display: 'gywls00100@gmail.com', href: 'mailto:gywls00100@gmail.com' },
      { label: 'GitHub', display: 'github.com/hy57in', href: 'https://github.com/hy57in' },
      { label: 'Blog', display: 'hyojin.dev', href: 'https://hyojin.dev' },
      {
        label: 'LinkedIn',
        display: 'linkedin.com/in/hy57in',
        href: 'https://www.linkedin.com/in/hy57in/',
      },
    ],
    featuredLinks: [
      {
        label: 'Multi-Agent Migration',
        display: 'Multi-Agent Migration',
        href: 'https://hyojin.dev/blog/ai-agent-legacy-migration',
      },
      {
        label: 'Sitemap Automation',
        display: 'Sitemap Automation',
        href: 'https://hyojin.dev/blog/sitemap-automation',
      },
    ],
  },
  coreSkillGroups: [
    {
      label: 'Product Engineering',
      values: ['React', 'TypeScript', 'Next.js', 'TanStack Query'],
    },
    {
      label: 'Engineering Practices',
      values: ['Frontend Architecture', 'Global/i18n', 'Testing', 'AI/AX'],
    },
  ],
  experiences: [
    {
      company: 'CJ올리브영',
      companyUrl: 'https://www.oliveyoung.co.kr/',
      logo: '/images/about/oliveyoung.png',
      role: 'Software Sr. Engineer',
      team: '파트너/Ads플랫폼개발팀',
      period: '2025.09.22 ~ 현재',
      technologies: [
        'React',
        'TypeScript',
        'TanStack Query',
        'Zustand',
        'React Hook Form',
        'Zod',
        'MUI',
        'Storybook',
        'Orval',
        'Datadog',
      ],
      highlights: [
        {
          title: '미국 첫 오프라인 매장 어드민을 구축하고 운영 안정화를 이어가고 있습니다.',
          description:
            '약 5개월간 글로벌 매장 운영 어드민을 초기 구축하고, 폐기관리·매장 마스터·재고조회·테스터 관리의 설계·개발·QA를 End-to-End로 담당했습니다. 오픈 이후에도 현장 피드백을 반영하며 운영 안정화와 기능 개선을 지속하고 있습니다.',
          details: [
            '폐기관리의 승인요청·승인·반려·철회, 권한별 Action, 첨부파일, 일괄 처리 등 상태 기반 업무를 제품에 정착시키고 수량 정책·가독성·이미지 검수 동선에 대한 현장 피드백을 반영했습니다.',
            '매장 도메인에 공통 훅·검증 패턴을 적용하고, 오픈 약 1개월 전 추가된 다국어 요구는 Claude Code i18n Skill로 하드코딩 탐색부터 타입 검증까지 자동화해 일정 내 영어 지원을 완료했습니다.',
          ],
        },
        {
          title: '가상화 테이블로 대규모 데이터 렌더링을 최적화했습니다.',
          description:
            'QA 테스트 케이스를 코드 테스트로 연결하고 공용 renderApp·PR CI·커버리지 리포팅을 구축해 테스트가 실제 품질 게이트로 동작하도록 만들었습니다.',
          details: [
            '운영자 VOC를 구조적 성능 과제로 재정의해 TanStack Table + TanStack Virtual 기반 VirtualTable을 구현했습니다. 10만 행 데모, 103개 단위 테스트, Storybook 문서화를 완료했으며 프로덕션 적용을 준비 중입니다.',
            'ImagePreviewModal을 44개 단위 테스트와 함께 공통 자산으로 분리하고, Route/App/Query ErrorBoundary·글로벌 에러 처리·chunk load error 자동 복구를 공통화했습니다.',
          ],
        },
        {
          title: '프론트엔드 인프라를 이관하고 장애 모니터링 기반을 구축했습니다.',
          description:
            'FE 인프라의 EKS → ECS Fargate 전환을 추진하고 정적 파일 서버를 Fastify에서 nginx 컨테이너로 단순화했습니다. Dockerfile·ECR/ECS·ALB health check·배포 검증 범위를 정리해 인프라팀과 이관했습니다.',
          details: [
            'Datadog RUM/Logs와 환경 식별 체계를 정비해 오류·세션·배포 환경을 추적하고, main/release 직접 push 제한·husky/lint-staged·배포 알림으로 운영 사고 방지 장치를 보완했습니다.',
          ],
        },
        {
          title: '개발 표준과 AI 자동화를 팀의 공통 시스템으로 확장했습니다.',
          description:
            'ESLint·아키텍처·TanStack Query·React Hook Form·Orval 등 7개 FE 코드 컨벤션을 체계화하고 Claude Code Review Skill과 연결해 구성원이 동일한 품질 기준을 참조하도록 만들었습니다.',
          details: [
            'SK 협력사의 공통 컴포넌트·디자인 QA·다국어·권한·배포 작업을 조율하고 코드리뷰와 문서화, 테크세션 아카이브로 외부 산출물과 기술 결정이 팀 기준에 맞게 축적되도록 했습니다.',
            'Claude Code Skill·AI 코드리뷰·업무 자동화 사례를 공유하고 AI 스터디를 운영했습니다. 1,700개+ Nexacro 레거시 화면의 React 전환을 위한 Multi-Agent Migration PoC로 대규모 전환 자동화 가능성을 검증했습니다.',
          ],
        },
      ],
    },
    {
      company: '버킷플레이스(오늘의집)',
      companyUrl: 'https://www.bucketplace.com/',
      logo: '/images/about/ohouse.png',
      role: 'Software Engineer, Frontend',
      team: 'Content · Community Team',
      period: '2025.07.28 ~ 2025.09.19',
      technologies: ['TypeScript', 'Next.js', 'Zustand', 'TanStack Query', 'Emotion'],
      highlightsTitle:
        'Technical SEO로 검색 유입을 20% 높이고 대규모 페이지 색인 구조를 개선했습니다.',
      highlights: [
        {
          description:
            '커뮤니티 검색 유입 확대를 위한 Technical SEO 과제를 수행해 첫 배포 직후 SEO 유입량을 20% 높였습니다.',
        },
        {
          description:
            '수만 개 커뮤니티 페이지를 빌드 시간 증가 없이 관리하기 위해 정적 생성 대신 서버 사이드 동적 sitemap 생성 → S3 업로드 → index sitemap 생성 → Next.js rewrite 서빙 구조를 설계하고 GitHub Actions cron으로 자동화했습니다.',
        },
        {
          description:
            'robots.txt, semantic markup, 구조화 데이터와 크롤링 우선순위를 정비해 검색엔진이 콘텐츠 구조를 안정적으로 탐색할 수 있도록 개선했습니다.',
        },
      ],
    },
    {
      company: '비마이프렌즈(bemyfriends)',
      companyUrl: 'https://bemyfriends.com/',
      logo: '/images/about/bmf.png',
      role: 'Front-end Developer',
      team: 'Client Team',
      period: '2022.09.05 ~ 2025.07.18',
      summary:
        '약 3년간 글로벌 팬덤 비즈니스 플랫폼 b.stage의 User·Admin·Console과 공통 패키지를 개발하며 팬의 콘텐츠 소비 경험과 창작자·운영자를 위한 B2B 도구를 함께 개선했습니다.',
      technologies: ['TypeScript', 'Next.js', 'Zustand', 'TanStack Query', 'SCSS'],
      highlightsTitle: '관리 도구·상품 구조·공통 개발 기반을 확장했습니다.',
      highlights: [
        {
          description:
            '홈 에디터에서 BE와 초기 스키마 설계부터 참여하고 SSR/CSR 분리 및 미리보기 구조를 설계해 관리자가 콘텐츠와 화면 구성을 직접 편집할 수 있는 시스템을 구축했습니다.',
        },
        {
          description:
            '3-depth 상품 카테고리 확장에서 트리 데이터 모델과 drag & drop을 고려한 SortableTree를 설계하고 정적 Shop Home을 동적 커스터마이징 시스템으로 확장했습니다.',
        },
        {
          description:
            'TanStack Query v5 마이그레이션을 주도하고 사내 세미나를 진행하며 데이터 패칭 기준과 반복 로직을 표준화했습니다.',
        },
        {
          description:
            'User/Admin 디자인 시스템 패키지 개발에서 FE-PD 간 컴포넌트 API를 조율하고, 다국어 JSON을 CDN 서빙 구조로 전환해 글로벌 서비스의 번들·운영 구조를 개선했습니다.',
        },
      ],
    },
    {
      company: '비바리퍼블리카(Toss)',
      companyUrl: 'https://toss.im/',
      logo: '/images/about/toss.png',
      role: 'Frontend UX Engineer (Assistant)',
      team: 'Design Platform Team',
      period: '2021.11.24 ~ 2022.08.23',
      technologies: ['React', 'TypeScript', 'Next.js', 'React Query', 'Recoil', 'Emotion'],
      highlightsTitle: '브랜드 홈페이지를 개발하고 디자인 시스템을 구축했습니다.',
      highlights: [
        {
          description:
            'Toss 브랜드 홈페이지, NEXT 개발자 채용 홈페이지, SLASH22 등 브랜드·채용·컨퍼런스 웹사이트를 개발했습니다.',
        },
        {
          description:
            'Section·Navigation·Hero 등 반복 UI를 디자인 시스템 컴포넌트와 Storybook 템플릿으로 만들어 FE-PD 협업의 반복 작업을 표준화했습니다.',
        },
        {
          description:
            '개발자·디자이너용 Resource Center와 Chrome Extension을 개발하고 검색·필터링 UX와 성능을 개선했으며, 개발 스펙·일정 산정과 QA 프로세스 개선에 참여했습니다.',
        },
      ],
    },
  ],
  otherExperience: [
    {
      name: 'CJ올리브영 Tech Organizer',
      period: '2026',
      description:
        '사내 테크 이벤트를 기획·운영하며 엔지니어의 목소리를 연결하는 Tech Advocate로 활동합니다. 팀 테크 세션을 유닛 단위로 확장하고 첫 유닛 타운홀, 미국 매장 오픈 기술 여정 영상·패널 토크를 기획해 기술 교류와 Sync & Alignment를 촉진했습니다.',
    },
    {
      name: 'SIPE 3기 운영진',
      period: '2024.08 ~ 2025.02',
      description:
        '공식 홈페이지를 Next.js App Router로 마이그레이션하고 스타일 시스템을 개선했으며, 개발자 커뮤니티 행사를 기획·운영했습니다.',
    },
    {
      name: '디프만 11기 Web Front-End 운영진',
      period: '2022.02 ~ 2022.07',
      description:
        '디프만 홈페이지를 개발하고 프로젝트 팀장/PM으로 활동했으며, 인프런 협업 멘토링 행사를 기획·운영했습니다.',
    },
  ],
  education: [
    {
      name: '중앙대학교 소프트웨어학부 소프트웨어학과',
      period: '2018.03 ~ 2024.02',
    },
    {
      name: '세종과학고등학교',
      period: '2013.03 ~ 2016.02',
    },
  ],
}
