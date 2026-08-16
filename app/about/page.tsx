import Image from 'next/image'
import Link from 'next/link'


export const metadata = {
    title: 'About',
    description: 'Front-end Engineer focused on building intuitive and performant web experiences.',
  }

export default function AboutPage() {
  return (
    <section className="max-w-4xl">
      {/* Profile Header */}
      <div className="flex shrink gap-5 md:gap-6 items-center mb-8 md:mb-12">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0">
        <Image
          src="/images/about/profile-image.png"
          alt="김효진"
          width={400}
          height={400}
          className="object-cover rounded-full border-[1px] border-border dark:border-border-dark w-24 h-24 md:w-32 md:h-32"
        />
        </div>

      <div className="flex flex-col w-full">
        <h1 className='leading-[1.2] text-2xl md:text-3xl font-semibold mb-1.5 md:mb-2'>
        <span className='text-primary dark:text-primary-dark font-semibold'>김효진 (Hyojin Kim)</span><br />
        Front-end Engineer
        </h1>
        <div className='flex gap-1 flex-wrap items-center text-xs md:text-sm'>
          <Link href="mailto:cent7425@gmail.com" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors px-1">
            Email
          </Link>
          <span className="text-text-secondary dark:text-text-secondary-dark">•</span>
          <Link href="https://github.com/hy57in" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors px-1">
            Github
          </Link>
          <span className="text-text-secondary dark:text-text-secondary-dark">•</span>
          <Link href="https://www.linkedin.com/in/hy57in/" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors px-1">
            LinkedIn
          </Link>
        </div>
      </div>
      </div>

      {/* About Section */}
      <div className="mb-10 md:mb-16">
        <h2 className="font-semibold text-xl md:text-2xl mb-4 md:mb-6 tracking-tight text-text dark:text-text-dark">About</h2>
        <p className="text-text dark:text-text-dark leading-relaxed text-sm md:text-[15px]">
        안녕하세요! 프론트엔드 개발자 김효진입니다.<br />
        어릴 적부터 기술을 통해 더 나은 삶을 만드는 것이 꿈이었고, 서비스 개발과 운영에 매력을 느껴 개발자가 되었습니다. 사용자와 가장 가깝게 맞닿아 있는 프론트엔드 영역에서 실질적인 가치를 만들어내는 것에 큰 보람을 느낍니다.
        문제를 정확하게 파악하고 기술적으로 해결하는 것을 중요하게 생각하며, 팀의 생산성을 높이기 위한 개발 문화 개선에도 관심이 많습니다.
        </p>
      </div>

     {/* Work Experience Section */}
     <div className="mb-10 md:mb-16">
        <h2 className="font-semibold text-xl md:text-2xl mb-6 md:mb-8 tracking-tight text-text dark:text-text-dark">Work Experience</h2>
        <div className="space-y-8 md:space-y-14">
          {/* CJ 올리브영 */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <Image
                  src="/images/about/oliveyoung.png"
                  alt="CJ 올리브영"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-7 md:h-7 object-cover rounded-md"
                />
                <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark">
                  <Link href="https://www.oliveyoung.co.kr/" className="hover:text-primary dark:hover:text-primary-dark transition-colors">
                    CJ 올리브영
                  </Link>
                </h3>
              </div>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark">Front-end Engineer | 2025.09 - Present</p>
            </div>
          </div>

          {/* 버킷플레이스 */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <Image
                  src="/images/about/ohouse.png"
                  alt="오늘의집"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-7 md:h-7 object-cover rounded-md"
                />
                <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark">
                  <Link href="https://www.bucketplace.com/" className="hover:text-primary dark:hover:text-primary-dark transition-colors">
                    버킷플레이스(오늘의집)
                  </Link>
                </h3>
              </div>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark mb-3 md:mb-4">Software Engineer, Frontend | 2025.07 - 2025.09</p>
            </div>

            {/* 기술 스택 */}
            <div className="mb-4 md:mb-5">
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">React</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Next.js(page)</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">emotion</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">zustand</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Tanstack Query</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-text dark:text-text-dark">오늘의집 커뮤니티 SEO 개선</h4>
                <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark ml-2">
                  <li><span className="font-medium">첫 배포 직후 SEO 유입량 20% 상승</span>, 커뮤니티 페이지 색인량 증가로 검색 노출 확대</li>
                  <li>유저의 구매 결정 과정에서 문제를 해결해주고 커뮤니티 AU를 증가시키는 KR 달성을 위한 핵심 과제로 선정</li>
                  <li><code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">robots.txt</code> 크롤링 봇 추가와 시맨틱 마크업 적용으로 온페이지 SEO 개선, 구조화된 토론 포럼 리치 스니펫 구현을 통해 AI 검색에서 인용량 증가 달성</li>
                  <li className="font-semibold">동적 사이트맵 생성 자동화 시스템 구축:
                    <ul className="list-disc list-inside ml-4 md:ml-6 mt-1.5 md:mt-2 space-y-1.5 md:space-y-2 font-normal">
                      <li>수만 개 커뮤니티 페이지 사이트맵을 <span className="font-medium">빌드 시간 증가 없이 실시간 관리</span>하는 문제를 해결하기 위해, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">next-sitemap</code> 기반 정적 생성 방식을 서버 사이드 동적 생성 시스템으로 추상화하여 재설계</li>
                      <li>서버에서 동적 사이트맵 생성 후 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">S3</code> 업로드 → <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">S3</code> 파일 조회를 통한 index sitemap 생성 및 업로드 → <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Next.js rewrite</code>로 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">S3</code> 경로 서빙하는 전체 파이프라인을 스크립트로 구현하고 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">GitHub Actions cron job</code>으로 자동화</li>
                      <li>한정된 크롤링 예산을 고려하여 삭제된 콘텐츠는 제외하고 최신/인기 콘텐츠 우선순위 알고리즘을 적용, 파일명 덮어쓰기 방식으로 효율적인 관리 구조 구현</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 비마이프렌즈 */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <Image
                  src="/images/about/bmf.png"
                  alt="비마이프렌즈"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-7 md:h-7 object-cover rounded-md"
                />
                <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark">
                  <Link href="https://bemyfriends.com/" className="hover:text-primary dark:hover:text-primary-dark transition-colors">
                    비마이프렌즈(bemyfriends)
                  </Link>
                </h3>
              </div>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark mb-3 md:mb-4">Front-end Developer | 2022.09 - 2025.07</p>
            </div>

            {/* 기술 스택 */}
            <div className="mb-4 md:mb-5">
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">React</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Next.js</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Zustand</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">TanStack Query</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Module CSS</span>
              </div>
            </div>

            <div className="space-y-4 md:space-y-5">
              {/* 주요 업무 */}
              <div>
                <p className="text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark mb-2 md:mb-3">
                  SaaS 기반 글로벌 팬덤 비즈니스 플랫폼 <span className="font-semibold">b.stage</span> 개발 및 유지보수 (User/Admin/Console/Modules)
                </p>
              </div>

              {/* 기술 개선 */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-text dark:text-text-dark">기술 개선</h4>
                <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark ml-2">
                  <li><code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">yarn</code>에서 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">pnpm</code>으로 마이그레이션을 통해 패키지 관리 효율성 개선</li>
                  <li><code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">TanStack Query v5</code> 마이그레이션 주도 및 사내 세미나 진행, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">useInfiniteIntersectionObserver</code> 커스텀 훅 개발로 무한스크롤 로직 표준화</li>
                  <li>사내 디자인 시스템 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">bspoke-admin</code>, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">bspoke-user</code> 패키지 구현. FE-PD 간 커뮤니케이션 주도하여 Button 컴포넌트 완성, 타입 가드를 이용한 유연한 타입 대응</li>
                  <li><code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">reset.css</code> 패키지화로 스타일 기준 통일, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">styled-components</code>/<code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Tailwind CSS</code>를 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Module CSS</code>로 점진적 마이그레이션 주도</li>
                  <li>코드리뷰봇 기능 개선, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Jira Automation</code> 구축, 다국어 관리 시스템 CDN 서빙 방식 전환을 통해 번들 사이즈 최적화 및 배포 프로세스 간소화</li>
                </ul>
              </div>

              {/* 주요 프로젝트 */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-text dark:text-text-dark">주요 프로젝트</h4>
                <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark ml-2">
                  <li><span className="font-semibold">스케줄 알림 기능 고도화</span> - 서버 리소스 부담 문제를 해결하기 위해 클라이언트 기반 인앱 스케줄 다운로드 방식을 제안하고 구현하여 효율적인 알림 시스템 구축</li>
                  <li><span className="font-semibold">샵 카테고리 시스템 확장</span> - 1 depth를 3 depth로 확장하기 위한 트리 구조 데이터 관리와 드래그앤드롭 기반 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">SortableTree</code> 컴포넌트 설계</li>
                  <li><span className="font-semibold">멀티라운지</span> - 라운지별 팔로우 시스템과 알림 설정 기능 제공. <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">getHomeLayout</code> 활용으로 불필요한 렌더링 최소화, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">TanStack Query v5</code> 도입 및 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">invalidateQueries</code> 활용한 효율적인 캐시 관리</li>
                  <li><span className="font-semibold">스테이지 커스텀</span> - 관리자가 브랜드를 차별화할 수 있는 홈 에디터 구축. BE와 초기 스키마 설계부터 참여하여 SSR/CSR 분리 구조 설계, 섹션 컴포넌트 패키지화로 어드민 미리보기 시스템 구현</li>
                  <li><span className="font-semibold">서베이/투표</span> - 팬덤 플랫폼 특화 서베이/투표 시스템 구축. <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">presignedUrl</code> 기반 보안 뷰어 페이지 개발, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">react-hook-form</code> 활용한 문항 타입별 validation 구현</li>
                  <li><span className="font-semibold">디지털 리워드</span> - 리워드 타입별 모듈화된 컴포넌트 설계, 상품 구매 이력과 리워드 지급 조건 연동을 통한 자동화된 미션 시스템 구축</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 비바리퍼블리카(토스) */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                <Image
                  src="/images/about/toss.png"
                  alt="토스"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-7 md:h-7 object-cover rounded-md"
                />
                <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark">
                  <Link href="https://toss.im/" className="hover:text-primary dark:hover:text-primary-dark transition-colors">
                    비바리퍼블리카(toss)
                  </Link>
                </h3>
              </div>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark mb-3 md:mb-4">Frontend UX Engineer (Assistant) | 2021.11 - 2022.08</p>
            </div>

            {/* 기술 스택 */}
            <div className="mb-4 md:mb-5">
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">React</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Next.js</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Gatsby</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">React-Query</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Recoil</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-text-secondary dark:text-text-secondary-dark">Emotion</span>
              </div>
            </div>

            <div className="space-y-4 md:space-y-5">
              {/* 주요 업무 */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-text dark:text-text-dark">브랜드 가치 전달을 위한 웹사이트 개발</h4>
                <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark ml-2">
                  <li>홈페이지 개발 <span className="font-medium">end-to-end 총괄</span> (기획/디자인 협업, 스펙 정리, 일정 산정)</li>
                  <li><code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Section</code>, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Navigation</code>, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Hero</code>, <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Card</code> 등 재사용 가능한 디자인시스템 컴포넌트 구축 및 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">Storybook</code> 템플릿 제작을 통해 개발 생산성 향상</li>
                  <li>프로젝트 개발 환경 구축, 프론트엔드 프로젝트 설계, 컨벤션 문서 작성</li>
                  <li>반응형 디자인 구현을 위한 미디어쿼리 및 <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">LineBreak</code> 템플릿 제작</li>
                  <li>노션 칸반보드를 활용한 효율적인 QA 프로세스 구축</li>
                </ul>
              </div>

              {/* 주요 프로젝트 */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-text dark:text-text-dark">주요 프로젝트</h4>
                <ul className="list-disc list-inside space-y-2 md:space-y-2.5 text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark ml-2">
                  <li><span className="font-medium">토스 NEXT 개발자 채용</span>, <span className="font-medium">slash22 컨퍼런스</span>, 디자이너 챌린지, 토스파운드, 토스페이스 등 다수 홈페이지 개발</li>
                  <li>리소스센터 성능 개선 - 드래그앤드롭 파일 업로드, 태그 관리 페이지, 필터링 기능 구현</li>
                  <li>크롬 익스텐션 미니 리소스센터 개발 - <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">debounce</code> 적용한 검색 기능 구현</li>
                  <li>토스 디자인 시스템(<code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs">TDS</code>) 컴포넌트 유지보수 및 사용성 개선</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Experience Section */}
      <div className="mb-10 md:mb-16">
        <h2 className="font-semibold text-xl md:text-2xl mb-6 md:mb-8 tracking-tight text-text dark:text-text-dark">Other Experience</h2>
        <div className="space-y-8 md:space-y-10">
          {/* SIPE */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-2 md:mb-3">
              <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark mb-1.5 md:mb-2">SIPE(사이프)</h3>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark">2024.03 - 2025.02</p>
            </div>
            <p className="text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark">
              IT 개발자 커뮤니티 <span className="font-medium">2기 회원</span>, <span className="font-medium">3기 운영진</span>으로 정규 행사 기획 및 운영 참여. 공식 홈페이지 개발 및 유지보수 담당
            </p>
          </div>

          {/* Depromeet */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-border dark:border-border-dark">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <div className="mb-2 md:mb-3">
              <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark mb-1.5 md:mb-2">Depromeet(디프만)</h3>
              <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark">2021.09 - 2022.07</p>
            </div>
            <p className="text-sm md:text-[15px] leading-relaxed text-text dark:text-text-dark">
              디자이너와 개발자가 협업하는 IT 연합동아리. <span className="font-medium">10기 회원</span>으로 사이드 프로젝트 참여, <span className="font-medium">11기 운영진</span>으로 행사 기획 및 운영
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-10 md:mb-16">
        <h2 className="font-semibold text-xl md:text-2xl mb-6 md:mb-8 tracking-tight text-text dark:text-text-dark">Education</h2>
        <div className="space-y-6 md:space-y-8">
          <div className="border-l-2 border-border dark:border-border-dark pl-4 md:pl-8 relative">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark mb-1.5 md:mb-2">중앙대학교</h3>
            <p className="text-sm md:text-[15px] text-text-secondary dark:text-text-secondary-dark">소프트웨어대학 소프트웨어학부</p>
            <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark">2018.03 - 2024.02 (졸업)</p>
          </div>
          <div className="border-l-2 border-border dark:border-border-dark pl-4 md:pl-8 relative">
            <div className="absolute left-[-5px] md:left-[-9px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary dark:bg-primary-dark"></div>
            <h3 className="font-bold text-base md:text-lg text-text dark:text-text-dark mb-1.5 md:mb-2">세종과학고등학교</h3>
            <p className="text-sm md:text-[15px] italic text-text-secondary dark:text-text-secondary-dark">2013.03 - 2016.02 (졸업)</p>
          </div>
        </div>
      </div>

    </section>
  )
}
