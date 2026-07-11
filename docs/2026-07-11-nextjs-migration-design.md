# v2.0.0 — Next.js 전환 설계 문서 (myblog)

## Context (왜 이 작업을 하는가)

현재 `myblog`(릴리즈 v1.4.0)는 **프레임워크 없는 Vanilla JS MPA**다.

- 14개의 정적 HTML 페이지(`pages/*.html`) + `components/*` Vanilla JS 모듈, **Vite** 멀티페이지 번들
- **Supabase(BaaS)** 를 클라이언트에서 직접 호출: Postgres(`Posts`, `userInfo`), Auth(GitHub/Google OAuth), Storage(이미지), Edge Function(공휴일 프록시)
- **Vercel** 정적 배포(`dohyuk.dev`)

이 구조의 한계:
1. **SEO 취약** — 게시글이 CSR로 렌더링돼 크롤러가 본문/제목을 못 읽음. `description`·Open Graph·`canonical`·JSON-LD·sitemap 전무. 게시글별 동적 메타태그 없음.
2. **서버 렌더링 불가** — 정적 호스팅이라 SSR/ISR을 쓸 수 없음.
3. **자체 API 계층 부재** — DB 접근 로직이 클라이언트에 노출되고, BaaS(Supabase)에 종속.

### 목표 아키텍처 (확정)

| 영역 | 전환 후 |
|------|---------|
| 프론트엔드 | **Next.js 16 App Router + TypeScript + Tailwind v4** (SSR/RSC로 SEO 확보) |
| 백엔드 | **NestJS** 별도 API 서버 (TypeScript) |
| DB | **자체 PostgreSQL + Prisma** (Supabase Postgres에서 데이터 이관) |
| 인증 | **자체 OAuth(GitHub/Google) + JWT** (Supabase Auth 완전 탈피) |
| 파일 저장 | **자체 오브젝트 스토리지**(S3 호환 MinIO) — Supabase Storage 대체 |
| 배포 | **자체 Node 서버 / VPS** (Docker Compose + Nginx 리버스 프록시 + TLS) |
| 방식 | **전면 재작성(Big Bang)** — Supabase/Firebase 완전 제거 |

**설계 원칙**: 클라이언트는 절대 DB에 직접 접근하지 않는다. `Next(웹/BFF) → NestJS(API) → Postgres`. 인증은 NestJS가 JWT를 발급하고 Next는 httpOnly 쿠키로 세션 유지.

---

## 1. 저장소 구조 (pnpm 모노레포)

프론트/백엔드가 **공유 타입(DTO)** 을 쓰므로 pnpm workspace 모노레포로 구성한다.

```
myblog/                        # 기존 레포를 재구성 (v2 브랜치)
├─ apps/
│  ├─ web/                     # Next.js (App Router, TS)
│  └─ api/                     # NestJS (TS)
├─ packages/
│  └─ shared/                  # 공유 타입/상수 (Post 상태 enum 등)
├─ infra/
│  ├─ docker-compose.yml       # web, api, postgres, minio, nginx
│  ├─ nginx/                   # 리버스 프록시 + TLS 설정
│  └─ Dockerfile.web / Dockerfile.api
├─ pnpm-workspace.yaml
└─ turbo.json                  # (선택) Turborepo 태스크 오케스트레이션
```

> 기존 Vanilla 코드는 `legacy/` 브랜치 또는 태그로 보존하고, `main`은 v2로 교체한다.

---

## 2. 백엔드: NestJS API 서버 (`apps/api`)

### 2.1 데이터 모델 (Prisma)

기존 Supabase 테이블을 자체 Postgres로 이관하고 Prisma 스키마로 모델링. `packages/shared`에 상태 enum을 둔다.

```prisma
model User {
  id        String   @id @default(uuid())
  provider  String   // "github" | "google"
  providerId String
  email     String?  @unique
  profile   Profile?
  posts     Post[]
  createdAt DateTime @default(now())
  @@unique([provider, providerId])
}

model Profile {          // 기존 userInfo 테이블
  userId    String  @id
  user      User    @relation(fields: [userId], references: [id])
  nickName  String?
  birth     String?
  email     String?
  tel       String?
  introduce String?
  imageUrl  String?
}

model Post {
  id           Int      @id @default(autoincrement())
  title        String
  content      String   // 마크다운 원문
  status       Int      @default(0)   // 0=발행, 1=임시저장, 2=삭제(soft delete)
  author       User     @relation(fields: [userId], references: [id])
  userId       String
  createdAt    DateTime @default(now())
  modifiedDate DateTime @updatedAt
}
```

> **status 규칙(0/1/2)은 기존 값을 그대로 유지**해 데이터 이관 시 변환을 최소화한다. soft delete(status=2) 정책 유지.

### 2.2 모듈 구성

| 모듈 | 책임 | 주요 엔드포인트 |
|------|------|-----------------|
| `AuthModule` | GitHub/Google OAuth(Passport) → JWT(access/refresh) 발급, 검증 가드 | `GET /auth/:provider`, `GET /auth/:provider/callback`, `POST /auth/refresh`, `POST /auth/logout` |
| `PostsModule` | 게시글 CRUD, 목록+페이지네이션, 소유권 검증, soft delete | `GET /posts` (list, `?page` `?status`), `GET /posts/:id`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id` |
| `ProfileModule` | 프로필 조회/upsert | `GET /users/:id/profile`, `PUT /users/me/profile` |
| `UploadModule` | 이미지 업로드 → MinIO, public URL 반환 | `POST /uploads/post-image`, `POST /uploads/profile-image` |
| `HolidaysModule` | 공휴일 프록시 (기존 Edge Function 포팅) | `GET /holidays?year=` |

- **인증 가드**: `@UseGuards(JwtAuthGuard)` + 소유권 검사는 기존 `components/crud/checkPostOwner.js` 로직을 `PostsService`에 서버측으로 이관.
- **페이지네이션**: 기존 `devLog/postUpdate.js`의 `count exact` + `range` 방식을 Prisma `skip/take` + `count`로 재현(10개 단위).
- **공휴일 포팅**: [supabase/functions/get-holidays/index.ts](../supabase/functions/get-holidays/index.ts)의 `Deno.env.get("HOLIDAY_KEY")` + 공공데이터포털 호출 로직을 그대로 `HolidaysService`로 옮김. CORS는 Nest 전역 설정으로 처리. 응답 캐싱(연 단위) 권장.

### 2.3 인증 흐름 (Supabase Auth 대체)

1. 프론트에서 `GET /api/auth/github` → NestJS가 GitHub OAuth로 리다이렉트
2. 콜백에서 Nest가 프로필 조회 → `User` upsert → **access JWT(짧게) + refresh JWT(길게)** 발급
3. Nest가 refresh 토큰을 **httpOnly Secure 쿠키**로 심고 프론트로 리다이렉트
4. 이후 Next 서버 컴포넌트/미들웨어가 쿠키의 토큰으로 API 호출 시 `Authorization: Bearer` 부착
5. `POST /auth/refresh`로 access 재발급, `POST /auth/logout`으로 쿠키 무효화

> **OAuth 앱 재등록 필요**: GitHub/Google 개발자 콘솔에서 callback URL을 `https://api.dohyuk.dev/auth/*/callback`로 새로 등록.

### 2.4 파일 저장소 (Supabase Storage 대체)

- **MinIO**(S3 호환) 컨테이너를 self-host. `Post`/`profile` 버킷 대응 버킷 생성.
- 기존 업로드 최적화 패턴(작성 중 `blob:` 프리뷰 → 발행 시점에만 실제 업로드 후 URL 치환)은 **프론트 로직 유지**, 업로드 대상만 Nest `UploadModule` → MinIO로 변경.
- `cacheControl: 1년` 헤더 유지. 프로필 이미지는 `{userId}/profile.jpg` upsert 유지.

---

## 3. 프론트엔드: Next.js App Router (`apps/web`)

### 3.1 라우트 매핑 (14 HTML → App Router)

| 기존 HTML | 새 라우트 | 렌더링 | 비고 |
|-----------|-----------|--------|------|
| `index.html` | `/` | Static | 랜딩 캔버스 워프 애니메이션 (client component) |
| `home.html` | `/home` (또는 `/`로 통합) | SSG/ISR | 홈 |
| `about.html` | `/about` | SSG | 정적 데이터(`components/about/data`) 이식 |
| `devLog.html` | `/devlog` | **SSR/ISR** | 목록+공휴일, 서버에서 API 호출 |
| `post.html?id=` | `/posts/[id]` | **SSR + `generateMetadata`** | **SEO 핵심**. 서버에서 본문 렌더 |
| `postCreate.html` | `/posts/new` | Client (auth) | 마크다운 에디터 |
| `postCorrection.html` | `/posts/[id]/edit` | Client (auth) | 수정 |
| `tempPost.html` | `/drafts` | Client (auth) | 임시저장(status=1) 목록 |
| `profile.html` | `/profile` | Client (auth) | 프로필 |
| `login.html` | `/login` | Client | OAuth 버튼 |
| `forgot-password.html` | `/forgot-password` | Static | — |
| `policy.html` / `terms.html` | `/policy` / `/terms` | Static | — |
| `404.html` | `not-found.tsx` | — | Next 기본 404 |
| `header.html` | `components/Header` | — | 공통 레이아웃(`app/layout.tsx`)으로 흡수 |

### 3.2 렌더링 & 데이터 패칭 전략

- **서버 컴포넌트(RSC)** 가 기본. 게시글 상세/목록은 서버에서 NestJS API를 `fetch`(캐시/revalidate 태그 활용)하여 **완성된 HTML을 응답** → 크롤러가 본문을 즉시 읽음.
- 인터랙션이 필요한 부분(에디터, 다크모드 토글, 캔버스 애니메이션, 드래그)만 `"use client"`.
- **게시글 상세**: `generateStaticParams` + `revalidate`(ISR)로 인기 글은 정적화, 신규 글은 on-demand revalidate.
- 보호 라우트(`/posts/new`, `/profile`, `/drafts`)는 `middleware.ts`에서 쿠키 토큰 검사 후 미인증 시 `/login` 리다이렉트.

### 3.3 SEO 구현 (핵심 목표)

- **`generateMetadata`**: `/posts/[id]`에서 게시글 title/description(본문 발췌)/Open Graph/Twitter Card/`canonical` 동적 생성.
- **동적 OG 이미지**: `opengraph-image.tsx`(next/og)로 게시글 제목 기반 썸네일 자동 생성.
- **`app/sitemap.ts`**: 발행글(status=0) 목록을 API에서 받아 sitemap 자동 생성.
- **`app/robots.ts`**: 크롤링 정책 + sitemap 위치.
- **JSON-LD**: 게시글에 `BlogPosting` 구조화 데이터 삽입.
- **URL 이전 리다이렉트**: 기존 `/pages/post.html?id=N` → `/posts/N` 301 리다이렉트(`next.config` redirects)로 기존 링크/색인 보존.

### 3.4 기능 이식 (Vanilla → React)

| 기능 | 기존 위치 | 이식 방식 |
|------|-----------|-----------|
| 마크다운 렌더 + 자동 TOC | `components/post/postLoad.js` (`marked`) | 서버에서 `marked`로 HTML 변환 + 헤딩 파싱해 TOC 생성(RSC). sanitize 추가 권장 |
| 블록 마크다운 에디터 | `components/postCreate/*` (`markdown-block-preview`) | ⚠️ **리스크**: 자체 npm 패키지가 Vanilla DOM 기반. React 래퍼로 감싸거나 React용으로 재구현 필요 (§6 참고) |
| 다크모드 | `components/darkmode/*` (Tailwind `class`) | `next-themes` 또는 클라이언트 컨텍스트로 `class` 전략 유지 |
| 캔버스 별/워프 애니메이션 | `src/index.js` | client component + `useRef`/`useEffect` |
| about 인터랙션(카드 드래그 등) | `components/about/*` | client component로 이식 |
| 폰트(A2Z, xp) | `public/font` + `@font-face` | `next/font/local`로 최적화 로드 |
| Tailwind v4 | `tailwind.config.js`, `src/style.css` | Next에 Tailwind v4 재설정, typography·line-clamp 플러그인 유지 |

---

## 4. 인프라 & 배포 (자체 Node/VPS)

`infra/docker-compose.yml`로 단일 VPS에 전체 스택 구동:

```
[ Nginx :443 ]  ── TLS(Let's Encrypt), 리버스 프록시
   ├─ dohyuk.dev            → web (Next :3000)
   └─ api.dohyuk.dev        → api (NestJS :4000)
[ web ]     next start (standalone 빌드)
[ api ]     NestJS
[ postgres ] 자체 DB (볼륨 영속화)
[ minio ]   오브젝트 스토리지 (이미지)
```

- **Next**: `output: "standalone"`으로 슬림 Docker 이미지.
- **DNS**: `dohyuk.dev` A레코드를 Vercel → VPS IP로 전환. `api` 서브도메인 추가.
- **환경변수**: `apps/api/.env`(DB URL, JWT secret, OAuth client id/secret, `HOLIDAY_KEY`, MinIO 키), `apps/web/.env`(API base URL, 공개 사이트 URL). 기존 `.gitignore` 시크릿 위생 규칙([scripts/check-no-tracked-env.sh](../scripts/check-no-tracked-env.sh)) 유지.
- **CI/CD**: 기존 [.github/workflows/secrets.yml](../.github/workflows/secrets.yml)(gitleaks/env 검사) 유지 + 빌드/타입체크 + VPS 배포(SSH `docker compose pull && up -d` 또는 GHCR 이미지 푸시) 워크플로 추가.

---

## 5. 데이터 이관 (Supabase → 자체 Postgres)

1. Supabase Postgres에서 `Posts`, `userInfo`, auth 사용자 매핑 `pg_dump`/CSV export.
2. **User 매핑**: Supabase auth user id → 새 `User`(provider/providerId 기준) 매핑 테이블 작성. OAuth 재로그인 시 기존 글과 연결되도록 provider+email 매칭 전략 확정.
3. `Post.status`(0/1/2) 그대로 적재. `content` 내 **Supabase Storage 이미지 URL을 MinIO URL로 치환**하는 마이그레이션 스크립트 실행.
4. Storage 버킷의 이미지 파일을 MinIO로 복사.
5. 이관 검증(건수/무결성) 후 컷오버.

---

## 6. 주요 리스크 & 결정 필요 사항

1. **`markdown-block-preview`(자체 패키지)의 React 호환성** — 가장 큰 불확실성. Vanilla DOM 기반이면 (a) React 래퍼로 감싸기 (b) React용 재구현 (c) 대체 에디터(예: 기존 `marked` + textarea 기반) 중 택. → **초기에 스파이크로 검증 권장.**
2. **OAuth 재구축 범위** — Passport-github/google 전략 직접 구현 + refresh 토큰 회전 정책 설계 필요(기존엔 Supabase가 대행).
3. **이미지/스토리지 이관** — MinIO 운영 + 기존 이미지 URL 치환. 대안으로 클라우드 S3/R2도 가능.
4. **URL 변경에 따른 SEO** — 현재 CSR라 색인이 적어 영향은 작지만, 기존 링크용 301 리다이렉트는 넣어둔다.
5. **Firebase 제거** — 죽은 코드(`components/login/firebase.js`)이므로 이관 대상 아님, 삭제.

---

## 7. 실행 단계 (마일스톤)

- **M0 — 모노레포 스캐폴드**: pnpm workspace, `apps/web`(Next+TS+Tailwind), `apps/api`(NestJS), `packages/shared`, Docker/Postgres 로컬 기동.
- **M1 — 백엔드 코어**: Prisma 스키마 + 로컬 DB 마이그레이션, PostsModule(CRUD/목록/soft delete/소유권), ProfileModule, HolidaysModule 포팅.
- **M2 — 인증**: AuthModule(GitHub/Google OAuth + JWT + 가드), 프론트 로그인/미들웨어 연동.
- **M3 — 프론트 골격**: `layout.tsx`(공통 헤더/다크모드/폰트), 정적 페이지(about/policy/terms/랜딩), Tailwind 이식.
- **M4 — 게시글 + SEO**: `/posts/[id]` SSR + `generateMetadata` + JSON-LD + OG 이미지, `/devlog` 목록, sitemap/robots, 301 리다이렉트.
- **M5 — 에디터 & 업로드**: 마크다운 에디터 이식(리스크 §6-1), UploadModule + MinIO, 이미지 지연 업로드 패턴.
- **M6 — 데이터 이관**: Supabase → 자체 Postgres/MinIO, 이미지 URL 치환, 검증.
- **M7 — 인프라 & 컷오버**: docker-compose + Nginx + TLS, DNS 전환, Vercel 배포 폐기, 릴리즈 **v2.0.0** 태깅.

---

## 8. 검증 방법 (end-to-end)

- **백엔드**: `apps/api` — Prisma 마이그레이션 후 각 엔드포인트를 통합 테스트(Jest + supertest)로 검증. 소유권 가드(타인 글 수정/삭제 차단), soft delete(status=2 후 목록 제외), 페이지네이션 경계 확인.
- **인증**: 실제 GitHub/Google 로그인 → JWT 발급 → 보호 라우트 접근 → refresh → logout 왕복 수동 검증.
- **SEO(핵심 목표)**: 게시글 페이지를 `curl`로 받아 **본문/제목/`og:`/JSON-LD가 초기 HTML에 포함**되는지 확인(CSR과 대비되는 핵심 성공 기준). `/sitemap.xml`·`/robots.txt` 응답, Lighthouse SEO 점수, 리치 결과 테스트.
- **기능 패리티**: 글 작성(임시저장→발행)·수정·삭제, 이미지 업로드/치환, 마크다운+TOC 렌더, 다크모드, 공휴일 표시를 기존 사이트와 1:1 비교.
- **인프라**: docker-compose 로컬 기동 후 Nginx 경유 `dohyuk.dev`/`api.dohyuk.dev` 라우팅, TLS, 재시작 시 DB/이미지 영속성 확인.
