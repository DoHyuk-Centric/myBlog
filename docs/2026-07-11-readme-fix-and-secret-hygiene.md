# README 예제 수정 및 .env 시크릿 처리

- 작업일: 2026-07-11
- 관련 PR: #43
- 발견 경로: 포트폴리오 점검 중 AI 코드 리뷰(Claude Code)로 지적받고, 직접 재현·검증 후 수정

## 요약

두 가지를 고쳤다. 하나는 **문서가 실제 코드와 어긋난 것**, 하나는 **인증키가 공개 저장소에 노출된 것**이다.

---

## 문제 1 — README의 패키지 사용 예제가 동작하지 않는다

### 증상
README의 `markdown-block-preview` 사용 예제가 존재하지 않는 API를 쓰고 있었다.

```js
import { BlockPreview } from 'markdown-block-preview';
const preview = new BlockPreview({ editor, output });
```

### 원인
패키지가 실제로 내보내는 것은 `setupMarkdownPreview`이고 `BlockPreview`는 없다.
흥미롭게도 이 저장소의 **실제 호출부**(`components/postCreate/marked/markedControler.js`)는
올바른 API를 쓰고 있었다. 즉 코드는 맞고 README만 틀린, 문서 드리프트였다.

### 수정
실제 호출부와 동일하게 맞췄다.

```js
import { setupMarkdownPreview } from 'markdown-block-preview';
setupMarkdownPreview({
  textarea: document.getElementById('content'),
  preview: document.getElementById('preview-content'),
});
```

패키지 쪽에도 이런 어긋남을 CI에서 막는 테스트를 추가했다 → markdown-block-preview#2.

### 함께 정정 — SPA가 아니라 MPA
소개 문구가 "Vanilla JS로 SPA 구현"이었으나, 이 프로젝트는 `vite.config.js`에 14개의
HTML 진입점을 둔 **MPA**이고 페이지 이동은 `location.href`로 한다. 라우터도 중앙 상태
관리도 없다. 실제 구조에 맞게 문구를 고쳤다.

---

## 문제 2 — 공개 저장소에 인증키가 커밋돼 있다

### 증상
`.env` 와 `supabase/functions/.env` 두 파일이 git에 추적되고 있었고,
공공데이터포털 인증키 `HOLIDAY_KEY`(서버 사이드 키)가 그대로 노출됐다.

### 원인
`.gitignore`에 `.env`가 없었다. 초기 서버 구성 커밋(`b41c5f0`)부터 추적됐다.

### 수정
| 조치 | 내용 |
|---|---|
| 추적 해제 | `git rm --cached .env supabase/functions/.env` (워킹트리 파일은 유지 → 로컬 빌드 정상) |
| `.gitignore` | `.env`, `.env.*` 무시, `.env.example`만 예외 |
| `.env.example` | 필요한 키 목록과 설정 방법(`supabase secrets set`) 문서화 |

### 재발 방지
- `scripts/check-no-tracked-env.sh` — `.env`가 다시 추적되면 exit 1
- `.github/workflows/secrets.yml` — 위 검사 + gitleaks 스캔

가드 스크립트는 네 가지 경우로 검증했다.
```
1) 현재 상태            → 통과
2) .env 를 다시 add     → 실패 (exit 1)
3) 되돌린 후            → 통과
4) .env.example 만 추적 → 통과
```

---

## ⚠️ 코드로 해결 불가 — 반드시 수동으로

1. **`HOLIDAY_KEY` 로테이션.** 이 작업은 앞으로의 커밋만 막는다.
   이미 공개된 키와 과거 히스토리의 키는 그대로이므로, 크롤링됐다고 가정하고
   공공데이터포털 콘솔에서 폐기·재발급해야 한다. 이것이 유일한 실질적 해결책이다.
2. **Supabase RLS 확인.** anon key가 공개돼 있으므로 테이블에 RLS가 실제로 걸려
   있는지 확인한다. 없으면 anon key만으로 글 수정·삭제가 가능하다.

> 참고: 커밋 히스토리 재작성(filter-repo + force push) 대신 키 로테이션으로 대응하기로 했다.
> 히스토리를 지워도 GitHub이 원본 객체를 당분간 보관하고, 이미 공개된 키는 로테이션이
> 근본 해결이기 때문이다.

## 남은 일 (이번 작업 범위 밖)

- `components/login/firebase.js`는 어디서도 import되지 않는 데드코드이고,
  내부 `saveUserToFirebase`는 `set`/`ref`/`db`를 import하지 않아 호출 시 ReferenceError가 난다.
  Supabase Auth로 이전한 흔적으로 보이며, `firebase` 의존성 제거와 함께 정리 필요.
- `marked` 렌더링에 `innerHTML`을 사용하는 지점의 sanitize(예: DOMPurify) 검토.
