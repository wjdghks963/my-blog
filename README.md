# Junglog

개인 기술 블로그. 에디토리얼 매거진 스타일의 디자인으로 글을 정리하고 공유합니다.

🔗 **https://www.junglog.xyz**

## 주요 기능

### 블로그

- **글 목록** (`/blogs`) — 무한 스크롤, **카테고리·태그·검색어 필터링** (서로 조합 가능)
- **글 상세** — ISR(60초)로 정적 생성, 마크다운 렌더링(GFM, 코드 하이라이트, Mermaid 다이어그램), 목차(TOC), 읽기 진행 바
- **같은 카테고리 이전/다음 글 네비게이션** — 글 하단에서 이어서 읽기
- **댓글** — 소셜 로그인(GitHub·Google·Kakao) 후 작성
- **조회수** — 클라이언트 비콘 방식으로 ISR 캐시와 분리 집계

### 운영

- **관리자 전용 글 작성/수정/삭제** — 소유자 계정만 접근, 마크다운 에디터, 이미지는 Cloudflare R2에 저장
- **SEO** — sitemap/robots 자동 생성, JSON-LD(BlogPosting·Breadcrumb), Open Graph
- **다크 모드** — `next-themes` 기반 클래스 토글, CSS 변수 테마
- **3D Space** (`/3d-space`) — three.js 인터랙티브 페이지

## 기술 스택

| 영역 | 스택 |
| --- | --- |
| 프레임워크 | Next.js 15 (App Router) · React 19 · TypeScript |
| 스타일 | TailwindCSS + CSS 변수 테마 (라이트/다크) |
| 서버 상태 | TanStack Query v5 (무한 스크롤, 캐싱) |
| DB / ORM | Supabase (PostgreSQL) · Prisma |
| 인증 | NextAuth (GitHub · Google · Kakao) |
| 마크다운 | react-markdown · remark-gfm · rehype-highlight · mermaid |
| 미디어 | Cloudflare R2 (이미지 저장) |
| 배포 | Vercel (ISR + 온디맨드 재검증) |

## 프로젝트 구조

```
app/                  # 라우트 & API (App Router)
  api/                # blogs, categories, comment, auth, stats ...
  blogs/              # 목록 · 글 상세
  3d-space/ about-me/ profile/ update-note/
src/
  domains/            # 도메인별 UI (home, post, comment, ...)
  shared/             # 공용 컴포넌트 · 훅 · 유틸
  core/               # 설정 (queryClient 등)
libs/server/          # 서버 헬퍼 (prismaClient, checkOwner, ...)
prisma/schema.prisma  # Post · Category · Tag · Comment · User
```

## 실행 방법

```bash
npm install
npx prisma db push   # 스키마 반영 (최초 1회)
npm run dev          # http://localhost:3000
```

`.env`에 필요한 값:

```bash
DATABASE_URL=        # Supabase PostgreSQL 연결 (pooled)
DIRECT_URL=          # Supabase PostgreSQL 직접 연결 (마이그레이션용)
SECRET=              # NextAuth secret
MY_EMAIL=            # 관리자(소유자) 이메일 — 글 작성 권한
NEXT_PUBLIC_APIDOMAIN=   # 배포 도메인 (예: https://www.junglog.xyz)

# 소셜 로그인 (사용할 프로바이더만)
GITHUB_ID= GITHUB_SECRET=
GOOGLE_ID= GOOGLE_SECRET=
KAKAO_ID=  KAKAO_SECRET=
```
