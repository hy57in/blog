# 블로그 이미지 관리

이 폴더는 블로그 포스트에 사용되는 이미지들을 관리합니다.

## 폴더 구조

```
public/images/
├── sitemap-automation/          # 사이트맵 자동화 포스트 이미지
├── vim/                         # Vim 포스트 이미지
├── static-typing/               # 정적 타이핑 포스트 이미지
├── spaces-vs-tabs/              # 스페이스 vs 탭 포스트 이미지
├── modern-web-development/      # 모던 웹 개발 포스트 이미지
└── shared/                      # 공통으로 사용되는 이미지
```

## 이미지 사용 방법

### MDX 파일에서 이미지 사용

```jsx
import Image from 'next/image'

// 포스트별 이미지
<Image 
  src="/images/sitemap-automation/architecture-diagram.png" 
  alt="아키텍처 다이어그램"
  width={800}
  height={400}
/>

// 공통 이미지
<Image 
  src="/images/shared/logo.png" 
  alt="로고"
  width={200}
  height={100}
/>
```

### 일반 HTML img 태그 사용

```html
<img 
  src="/images/sitemap-automation/screenshot.png" 
  alt="스크린샷"
  width="800"
  height="400"
/>
```

## 이미지 최적화 권장사항

1. **파일 형식**: WebP > PNG > JPG 순으로 권장
2. **파일 크기**: 각 이미지는 500KB 이하로 유지
3. **해상도**: 
   - 일반 이미지: 800px 이하
   - 썸네일: 400px 이하
   - 다이어그램: 1200px 이하

## 네이밍 규칙

- 파일명은 소문자와 하이픈(-) 사용
- 예시: `architecture-diagram.png`, `screenshot-1.png`
- 버전 관리가 필요한 경우: `diagram-v1.png`, `diagram-v2.png`
