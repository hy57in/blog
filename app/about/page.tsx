export const metadata = {
    title: 'About',
    description: 'Read my about.',
  }

export default function AboutPage() {
  return (
    <div className="prose">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">About</h1>
      <p className="mb-12">안녕하세요, 프론트엔드 개발자 김효진입니다.</p>

      {/* <h2 className="font-semibold text-xl mb-6 tracking-tight">Work Experience</h2>

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">씨제이올리브영</h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2025.09.22 ~ ing</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark mb-2">Front-end Engineer</p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">
            <a href="https://www.bspokecompany.com/" target="_blank" rel="noopener noreferrer" className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark no-underline">
              비마이프렌즈
            </a>
          </h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2022.08.24 ~ 2025.07.25</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark mb-4">Frontend Developer</p>

        <div>
          <h4 className="font-medium mb-3">글로벌 팬덤 플랫폼 b.stage 개발</h4>
          <ul className="list-disc pl-6 space-y-2 text-text dark:text-text-dark">
            <li>User/Admin/Console 등 다중 프로젝트 모노레포 환경에서 웹 서비스 개발 및 유지보수 (React, Next.js, TypeScript)</li>
            <li>패키지 매니저 yarn → pnpm 마이그레이션, TanStack Query v5 마이그레이션 주도 및 사내 세미나 진행</li>
            <li>사내 디자인 시스템 bspoke-admin/user 패키지 구현 및 FE-PD 간 협업 주도
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>타입 가드를 활용한 Button 컴포넌트 프로퍼티별 유연한 타입 대응</li>
                <li>styled-components, TailwindCSS 제거 후 Module CSS 도입 및 점진적 마이그레이션 주도</li>
              </ul>
            </li>
            <li>개발 프로세스 최적화
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>코드리뷰봇 기능 개선 (프롬프트 개선, 수동 호출, 수정사항 리뷰 등)</li>
                <li>Jira Automation으로 자동 티켓 할당 및 QA 프로세스 자동화</li>
                <li>다국어 관리 시스템을 구글 스프레드시트 JSON 방식에서 CDN 서빙 방식으로 전환하여 번들 사이즈 최적화 및 배포 프로세스 간소화</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">
            <a href="https://toss.im/" target="_blank" rel="noopener noreferrer" className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark no-underline">
              비바리퍼블리카(토스)
            </a>
          </h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2021.11.24 ~ 2022.08.23</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark mb-4">Frontend UX Engineer (Assistant)</p>

        <div>
          <h4 className="font-medium mb-3">브랜드 가치 전달을 위한 홈페이지 개발</h4>
          <ul className="list-disc pl-6 space-y-2 text-text dark:text-text-dark">
            <li>토스 홈페이지, 채용 페이지, slash22 컨퍼런스 등 8개 이상의 브랜드 홈페이지 end-to-end 개발 (React, Next.js, TypeScript)</li>
            <li>Section, Navigation, Hero, Card 등 재사용 컴포넌트 및 디자인시스템 구축으로 개발 생산성 향상
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Storybook 템플릿 제작 및 fonts/color 시스템 구축</li>
                <li>반응형 디자인 미디어쿼리 템플릿화로 중복 코드 제거</li>
              </ul>
            </li>
            <li>슬랙 기반 QA 프로세스를 노션 칸반보드로 전환하여 효율성 개선</li>
            <li>react-hook-form 기반 지원서 폼 구현, 포지션별 계열사 선택 로직 및 상세 validation 적용</li>
            <li>리소스센터 성능 개선 및 크롬 익스텐션 미니 리소스센터 개발
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>드래그앤드롭 파일 업로드, 태그 관리 페이지, 필터링 기능 구현</li>
                <li>검색 debounce 적용으로 사용자 경험 개선</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">
            <a href="https://www.bucketplace.com/" target="_blank" rel="noopener noreferrer" className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark no-underline">
              버킷플레이스(오늘의집)
            </a>
          </h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2025.07.28 ~ 2025.09.19</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark mb-4">Software Engineer, Frontend</p>

        <div>
          <h4 className="font-medium mb-3">오늘의집 커뮤니티 SEO 개선</h4>
          <ul className="list-disc pl-6 space-y-2 text-text dark:text-text-dark">
            <li>첫 배포 직후 SEO 유입량 20% 상승, 커뮤니티 페이지 색인량 증가로 검색 노출 확대</li>
            <li>유저의 구매 결정 과정에서 문제를 해결해주고 커뮤니티 AU를 증가시키는 KR을 달성하기 위한 핵심 과제로 선정</li>
            <li>robots.txt 크롤링 봇 추가와 시맨틱 마크업 적용으로 온페이지 SEO 개선, 구조화된 토론 포럼 리치 스니펫 구현으로 AI 검색에서 인용량 증가 달성</li>
            <li>동적 사이트맵 생성 자동화 시스템 구축
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>수만 개 커뮤니티 페이지 사이트맵을 빌드 시간 증가 없이 실시간 관리해야 하는 복잡한 요구사항을 해결하기 위해, next-sitemap 기반 정적 생성 방식을 서버 사이드 동적 생성 시스템으로 추상화하여 재설계</li>
                <li>서버에서 동적 사이트맵 생성 후 S3 업로드 → S3 파일 조회를 통한 index sitemap 생성 및 업로드 → Next.js rewrite로 S3 경로 서빙하는 전체 파이프라인을 스크립트로 구현하고 GitHub Actions cron job으로 자동화</li>
                <li>한정된 크롤링 예산을 고려하여 삭제된 콘텐츠는 제외하고 최신/인기 콘텐츠 우선순위 알고리즘을 적용, 파일명 덮어쓰기 방식으로 효율적인 관리 구조 구현</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="font-semibold text-xl mb-6 tracking-tight mt-16">Education</h2>

      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">
            <a href="https://www.cau.ac.kr/index.do" target="_blank" rel="noopener noreferrer" className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark no-underline">
              중앙대학교
            </a>
          </h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2018.03 ~ 2024.02</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark">소프트웨어대학 소프트웨어학부</p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-semibold text-lg">
            <a href="https://sjsh.sen.hs.kr/" target="_blank" rel="noopener noreferrer" className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark no-underline">
              세종과학고등학교
            </a>
          </h3>
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">2013.03 ~ 2016.02</span>
        </div>
        <p className="text-text-secondary dark:text-text-secondary-dark">자연계</p>
      </div>

      <h2 className="font-semibold text-xl mb-6 tracking-tight mt-16">Contact</h2>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[80px]">Email</span>
          <a href="mailto:gywls00100@gmail.com" className="text-primary dark:text-primary-dark hover:opacity-75 transition-opacity">
            gywls00100@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium min-w-[80px]">LinkedIn</span>
          <a href="https://www.linkedin.com/in/hyojin-kim-562188205/" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-primary-dark hover:opacity-75 transition-opacity break-all">
            linkedin.com/in/hyojin-kim-562188205
          </a>
        </div>
      </div> */}
    </div>
  )
}