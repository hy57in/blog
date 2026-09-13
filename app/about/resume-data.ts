export type ResumeLink = {
  label: string
  display: string
  href: string
}

export type ResumeHighlight = {
  links?: readonly ResumeLink[]
  title?: string
  description: string
  details?: readonly string[]
}

export type ResumeProject = {
  title: string
  description?: string
  highlights: readonly ResumeHighlight[]
}

export type ResumeExperienceContent = {
  projects?: readonly ResumeProject[]
  responsibilities?: readonly { area: string; description: string }[]
  summary?: string
  highlightsTitle?: string
  technologies: readonly string[]
  highlights: readonly ResumeHighlight[]
}

export type ResumeExperience = ResumeExperienceContent & {
  company: string
  companyUrl: string
  logo: string
  role: string
  team: string
  period: string
  pdf: ResumeExperienceContent
}

export type ResumeItem = {
  name: string
  period: string
  description?: string
  detail?: string
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
  }
  experiences: readonly ResumeExperience[]
  otherExperience: readonly ResumeItem[]
  education: readonly ResumeItem[]
}

// Detailed copy restored from af6a2ab; shared by web and PDF.
const todayHouseContent: ResumeExperienceContent = {
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

const bemyfriendsContent: ResumeExperienceContent = {
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

const oliveYoungContent: ResumeExperienceContent = {
  "technologies": [
    "React",
    "TypeScript",
    "TanStack Query",
    "Zustand",
    "React Hook Form",
    "Zod",
    "MUI",
    "Storybook",
    "Orval",
    "Datadog"
  ],
  "highlights": [],
  "projects": [
    {
      "title": "미국 매장 운영 플랫폼 ‘글로벌원’",
      "description": "글로벌매장관리스쿼드에서 매장 마스터·재고·폐기·테스터 등 주요 운영 기능 개발 담당. 북미 첫 매장 오픈을 위한 MVP 개발·QA에 약 5개월간 집중하고, 오픈 이후 현재까지 운영·안정화 담당",
      "highlights": [
        {
          "title": "미국 매장 오픈 일정에 맞춰 핵심 운영 화면의 다국어 전환을 진행",
          "description": "오픈 약 한 달 전 추가된 다국어 요구에 대응하기 위해 Claude Code 기반 전환 Skill을 제작. 문구 탐색부터 번역 키·리소스 등록, 컴포넌트 전환과 타입 검증까지 처리하도록 구성",
          "details": [
            "매장관리에서 검증한 방식을 다른 스쿼드에 전파해 오픈 전 핵심 운영 화면의 다국어 지원에 기여",
            "번역 변경 PR 라벨을 자동으로 부착하고, 개발·QA·PO가 번역 키와 누락 여부를 확인할 수 있는 검수 도구를 제공"
          ]
        },
        {
          "title": "글로벌원 모노레포에서 공통 컴포넌트와 유틸을 패키지로 분리",
          "description": "@globalone/ui 등 공통 패키지를 구성하고, 여러 기능에서 사용하는 컴포넌트와 유틸을 분리해 재사용할 수 있도록 구성",
          "details": [
            "이미지 미리보기 컴포넌트와 Error Boundary, 에러 알림·chunk 오류 복구 처리를 공통화"
          ]
        },
        {
          "title": "DevOps와 EKS → ECS Fargate 전환을 추진하며, 프론트엔드의 배포·검증 기준을 정하고 변경 결과 확인",
          "description": "Dockerfile·ECR/ECS·ALB health check와 배포 검증 범위를 정리하고, DevOps와 전환 내용을 조율",
          "details": [
            "정적 파일 서버의 Fastify → nginx 컨테이너 전환을 포함해 변경 결과를 검증"
          ]
        }
      ]
    },
    {
      "title": "매장 직원용 모바일 업무 앱(PDA)",
      "description": "기술 선택과 초기 아키텍처 설계 전담. 다양한 매장 업무 기능을 개발하며 공통 컴포넌트와 개발 도구를 구축하고, AI가 정해진 개발 기준을 따를 수 있는 환경을 구성",
      "highlights": [
        {
          "title": "기획자마다 달랐던 프로토타입의 UI 기준을 통일",
          "description": "전담 디자이너가 없어 기획자마다 서로 다른 UI로 프로토타입을 만들던 상황",
          "details": [
            "Claude Design에서 공통 디자인시스템을 활용하도록 해, 기획자와 개발자가 같은 UI 기준으로 요구사항을 논의하고 커뮤니케이션 비용 절감",
            "디자인 토큰과 Base UI 기반 공통 컴포넌트, Storybook을 구축해 실제 기능 개발에서도 같은 디자인시스템을 활용"
          ]
        },
        {
          "title": "AI가 개발 규칙을 따르고 구현 결과를 검증할 수 있도록 환경을 구축",
          "description": "스캔·인증·저장 등 기존 동작과 업무 규칙을 테스트로 명시하고, 컨벤션과 공통 구현 패턴을 개발 컨텍스트로 제공",
          "details": [
            "코드의 의존 방향은 린트로 검사해, 신규 기능도 정해진 구조 안에서 개발하도록 구성",
            "아키텍처·공통 컴포넌트·스캔·API 연동 패턴을 PRD와 함께 참조하도록 정리하고, 타입·테스트·웹과 Android 간 계약 검사를 CI에 연결"
          ]
        }
      ]
    },
    {
      "title": "사내 백오피스 ‘올리브원’의 프론트엔드 현대화",
      "description": "백오피스마다 다른 기술 스택과 빌드·배포 방식으로 기술부채가 누적되던 상황. 많은 레거시를 유지보수하면서 새로운 백오피스도 개발해야 하는 조건. 각 앱의 독립성을 유지하면서 공통 패키지를 제공하고, 신규 개발부터 운영까지 같은 기반을 활용할 수 있는 프론트엔드 플랫폼을 설계",
      "highlights": [
        {
          "title": "백오피스를 React 기반의 공통 플랫폼으로 전환하기 위한 구조와 도입 방향을 제안",
          "description": "기존 Vue 앱을 포함한 백오피스 5개의 모노레포 편입을 검증. 각 앱의 독립 빌드·배포 가능성과 전환에 필요한 변경을 확인하고, 기존 서비스를 유지하면서 단계적으로 React로 전환하는 방향을 동료들과 논의",
          "details": [
            "편입 과정에서 락파일 재해석에 따른 버전 변경, 미선언 의존성, Vitest 버전 간 테스트 설정 충돌을 해결",
            "검증 결과와 한계, 필요한 수정 범위를 공유하고 도입 논의의 근거로 활용. 팀의 Turborepo 선택 이후 import 경계 검사를 구현하고 후속 작업을 인계"
          ]
        },
        {
          "title": "프론트엔드 현대화를 위해 Nexacro 화면을 React로 전환하는 Multi-Agent 파이프라인을 설계",
          "links": [{ "label": "Multi-Agent Migration", "display": "Multi-Agent Migration", "href": "https://hyojin.dev/blog/ai-agent-legacy-migration" }],
          "description": "초기 전환에서 화면의 외형만 구현되고 기존 동작을 충분히 반영하지 못하는 문제 확인. Nexacro의 컴포넌트·이벤트·데이터 요청을 분석하고, 검증 기준을 포함한 명세를 작성하도록 구성",
          "details": [
            "Nexacro와 React 컴포넌트의 1:1 매핑 표를 작성해 변환 기준 수립. 매핑 표와 명세를 참조하는 Migrator, 구현 결과를 검증하는 QA, 검증 결과를 정리하는 Report 등 역할별 에이전트로 파이프라인을 구성",
            "타입·정적 검증에 실패한 코드를 수정하고, 반복되는 실패 패턴을 다음 실행의 규칙으로 기록. PoC 과정에서 확인한 문제를 바탕으로 전환 방식을 보완"
          ]
        }
      ]
    },
    {
      "title": "사내 AI 개발 도구 공유",
      "highlights": [
        {
          "title": "반복되는 개발 업무를 AI 스킬로 만들고 사내에 공유",
          "description": "PR·코드리뷰 등 여러 개발 업무의 스킬을 제작하고, 사내 마켓플레이스에 플러그인으로 등록"
        }
      ]
    },
    {
      "title": "Tech Organizer로 사내 기술 교류를 위한 테크 세션·타운홀 기획·운영",
      "description": "2026년 CJ올리브영 Tech Organizer로 팀 내 테크 세션을 유닛 단위로 확장하고, 첫 유닛 타운홀 기획·운영. 미국 매장 오픈의 기술 여정을 소개하는 영상과 패널 토크를 기획해 엔지니어의 경험을 조직에 공유",
      "highlights": []
    }
  ]
}

export const resume: Resume = {
  updatedAt: '2026.09',
  profile: {
    name: '김효진',
    englishName: 'Hyojin Kim',
    role: 'Front-end Engineer',
    headline:
      '글로벌 콘텐츠 SaaS와 B2B 운영 플랫폼을 경험하며, 복잡한 요구사항을 제품 구조와 프런트엔드 아키텍처로 풀고 반복되는 문제를 팀의 시스템으로 바꿔온 Frontend Engineer',
    introduction: [
      '만드는 제품에 애정과 책임감을 갖고 일합니다. 비즈니스와 유저를 이해하고, 기획과 기술적인 논의에 참여하며 더 나은 제품을 함께 만들어가고 싶습니다.',
      '팀이 효율적으로 일할 수 있는 환경을 만드는 걸 좋아합니다. DX 개선의 가치를 믿고, 반복 업무 자동화와 공통 컴포넌트 및 개발 도구 구축 등 플랫폼 개선에 노력합니다.',
      '함께 일하는 동료에게 신뢰를 줄 수 있도록 노력합니다. 기술과 경험을 공유하며 서로에게 배우고 함께 성장하는 걸 좋아합니다.',
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

  },
  experiences: [
    {
      company: 'CJ올리브영',
      companyUrl: 'https://www.oliveyoung.co.kr/',
      logo: '/images/about/oliveyoung-symbol.png',
      role: 'Software Sr. Engineer',
      team: '테크플랫폼센터 > 엔터프라이즈플랫폼유닛 > 파트너/Ads플랫폼개발팀',
      period: '2025.09.22 ~ 현재',
      ...oliveYoungContent,
      pdf: oliveYoungContent,
    },
    {
      company: '버킷플레이스(오늘의집)',
      companyUrl: 'https://www.bucketplace.com/',
      logo: '/images/about/ohouse.png',
      role: 'Software Engineer, Frontend',
      team: 'Content · Community Team',
      period: '2025.07.28 ~ 2025.09.19',
      ...todayHouseContent,
      pdf: todayHouseContent,
    },
    {
      company: '비마이프렌즈(bemyfriends)',
      companyUrl: 'https://bemyfriends.com/',
      logo: '/images/about/bmf.png',
      role: 'Front-end Developer',
      team: 'Client Team',
      period: '2022.09.05 ~ 2025.07.18',
      ...bemyfriendsContent,
      pdf: bemyfriendsContent,
    },
    {
      company: '비바리퍼블리카(Toss)',
      companyUrl: 'https://toss.im/',
      logo: '/images/about/toss.png',
      role: 'Frontend UX Engineer (Assistant)',
      team: 'Design Platform Team',
      period: '2021.11.24 ~ 2022.08.23',
      technologies: ['React', 'TypeScript', 'Next.js', 'React Query', 'Recoil', 'Emotion'],
      highlights: [
        {
          title: '반복되는 UI를 디자인 시스템 컴포넌트로 표준화했습니다.',
          description: 'Toss 브랜드 홈페이지·NEXT 개발자 채용 홈페이지·SLASH22 등 브랜드·채용·컨퍼런스 웹사이트 개발',
          details: [
            'Section·Navigation·Hero 등 반복 UI를 디자인 시스템 컴포넌트와 Storybook 템플릿으로 구성해 FE-PD 협업의 반복 작업 표준화',
          ],
        },
        {
          title: 'Resource Center와 Chrome Extension을 개발해 검색·필터링 UX를 개선했습니다.',
          description: '개발자·디자이너용 Resource Center와 Chrome Extension 개발',
          details: ['검색·필터링 UX·성능 개선과 개발 스펙·일정 산정·QA 프로세스 개선 참여'],
        },
      ],
      pdf: {
        technologies: ['React', 'TypeScript', 'Next.js'],
        highlights: [
          {
            description:
              'Toss 브랜드·채용·컨퍼런스 웹사이트를 개발하고 반복 UI를 디자인 시스템 컴포넌트와 Storybook 템플릿으로 구성해 FE-PD 협업 표준화',
          },
          {
            description:
              '개발자·디자이너용 Resource Center와 Chrome Extension을 개발해 검색·필터링 UX·성능 개선',
          },
        ],
      },
    },
  ],
  otherExperience: [
    {
      name: 'SIPE 3기 운영진',
      period: '2024.08 ~ 2025.02',
      description:
        '공식 홈페이지의 Next.js App Router 마이그레이션과 스타일 시스템 개선, 개발자 커뮤니티 행사 기획·운영',
    },
    {
      name: '디프만 11기 Web Front-End 운영진',
      period: '2022.02 ~ 2022.07',
      description:
        '디프만 홈페이지 개발과 프로젝트 팀장/PM 활동, 인프런 협업 멘토링 행사 기획·운영',
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
