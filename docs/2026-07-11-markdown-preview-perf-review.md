# markdown-block-preview 패키지의 Next.js 전환 적합성 검토

- 작업일: 2026-07-11
- 관련 문서: [2026-07-11-nextjs-migration-design.md](2026-07-11-nextjs-migration-design.md) §6 리스크 항목 1
- 첨부 문서: [2026-07-11-block-rendering-demand-research.md](2026-07-11-block-rendering-demand-research.md) —
  이 문서의 결론(개인 블로그엔 불필요) 이후, "그럼 이 알고리즘을 실제로 필요로 하는 분야/사용자가
  있는가"를 별도로 조사한 자료
- 계기: Next.js 전환 설계 논의 중, 자체 npm 패키지 `markdown-block-preview`(블록 단위 마크다운 프리뷰)를 새 아키텍처에서 어떻게 다룰지 실측을 통해 검토

## 요약

패키지 자체(코드)는 vanilla DOM 조작 기반이라 React/SSR에 그대로 이식 불가능하다는 건 처음부터 명확했다.
쟁점은 "그럼 이 패키지가 구현한 **블록 단위 증분 렌더링 아이디어**까지 버려도 되는가"였고,
실측 결과 아이디어 자체는 유효했지만 **이 블로그 글 규모에서는 naive 구현으로도 성능 여유가 충분해
알고리즘 이식 자체가 불필요**하다는 결론을 냈다. 패키지는 폐기가 아니라 독립 오픈소스로 유지하고,
이번 프로젝트 의존성에서만 제거한다.

---

## 배경 — 패키지가 하는 일

`setupMarkdownPreview({ textarea, preview, breaks })`를 호출하면:

1. `textarea`의 `input` 이벤트마다 `splitMarkdownBlocks()`로 마크다운을 **빈 줄 기준 블록**으로 분리
2. 이전 블록 배열과 비교(`syncBlockStructure`) — 블록 개수가 같으면 바뀐 블록만 `innerHTML` 교체,
   append-only면 마지막 블록만 추가, 그 외 구조 변경이면 전체 재구성
3. 내부적으로 자체 `marked` 인스턴스로 블록 단위 HTML 변환

README 벤치마크(50블록 기준): 1블록 변경 시 전체 렌더 대비 8.2배, 10블록 변경 시 3.8배 빠름.
전체 블록이 다 바뀌면 오히려 0.8배(diffing 오버헤드로 소폭 손해).

`core/splitMarkdownBlocks.js`, `core/isAppendOnly.js`는 **순수 함수**(DOM 미사용)이고,
`core/syncBlockStructure.js`, `render/*.js`는 `preview.appendChild`/`preview.innerHTML=""` 등
**DOM을 직접 조작**한다.

## 왜 React/Next에 그대로 못 쓰나

- SSR 시점엔 `document`가 없어 `getElementById` 자체가 실패 → `useEffect` 안에 넣어야 함
- React의 파이버 리컨실리에이션과 패키지가 직접 건드리는 실제 DOM이 충돌할 여지
- 결국 "패키지를 감싸는 래퍼 코드"가 React로 새로 짜는 것보다 더 복잡해짐

→ 기존 리스크 항목의 선택지 (a) React 래퍼로 감싸기는 기각.

## 실측 1 — 파싱 비용 vs DOM 반영 비용 분리 (jsdom)

50블록 문서, 500회 반복 기준:

| 항목 | 평균 |
|---|---|
| 전체 문서 파싱(marked) | 0.98ms |
| 블록 1개만 파싱 | 0.005ms |
| 전체 innerHTML 반영(50블록) | 13.45ms |
| 블록 1개만 innerHTML 반영 | 0.18ms |
| 실제 패키지 end-to-end(1블록 변경) | 0.10ms |
| React naive 시뮬레이션(매번 전체 파싱+전체 반영) | 10.19ms |

**병목은 마크다운 재파싱이 아니라 DOM 트리 재구성 쪽**이었다. 이는 React를 쓴다고 저절로 해결되지 않는다 —
`dangerouslySetInnerHTML`에 전체 HTML 문자열을 통째로 넣으면 React는 그 문자열 내부를 diff하지 못하고
바뀔 때마다 통째로 갈아 끼우기 때문(naive 시뮬레이션이 거의 Full render와 동일한 이유).

## React에서 알고리즘을 이식하는 방법

`React.memo` 단독으로는 부족하다 — 부모가 통짜 문자열 하나를 `state`로 들고 있으면 그 문자열은
한 글자만 쳐도 매번 달라지므로 `memo`가 비교할 대상 자체가 없다.

```tsx
"use client";
import { useState, memo, useMemo } from "react";
import { marked } from "marked";
import { splitMarkdownBlocks } from "./splitMarkdownBlocks"; // 패키지의 순수함수를 그대로 재사용

const Block = memo(function Block({ markdown }: { markdown: string }) {
  return <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />;
});

export function MarkdownEditor() {
  const [text, setText] = useState("");
  const blocks = useMemo(() => splitMarkdownBlocks(text), [text]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div>
        {blocks.map((block, i) => (
          <Block key={i} markdown={block} />
        ))}
      </div>
    </div>
  );
}
```

`splitMarkdownBlocks`(순수 함수)만 그대로 가져오면 되고, DOM을 직접 조작하던
`syncBlockStructure`/`render/*`는 `key` + `memo` 기반 리컨실리에이션으로 대체된다.
오히려 블록을 중간에 삽입하는 구조 변경 케이스에서는, 원본 패키지가 전체를 갈아엎는 fallback을
타는 반면 React 버전은 삽입 지점 이후 블록만 리렌더되므로 원본보다 나을 수 있다.

## 실측 2 — 실제 Chromium에서 naive vs block, 블록 수별 (Playwright)

블록 수를 늘려가며 naive 방식(매번 전체 재파싱+전체 반영)의 편집당 비용을 측정(300회 반복):

| 블록 수 | naive 평균 | 60fps 예산(16.6ms) |
|---|---|---|
| 100 | 2.4ms | 여유 |
| 300 | 7.2ms | 여유 |
| 500 | 13.3ms | 여유 |
| 600 | 16.0ms | 경계 |
| **700** | **20.7ms** | **초과** |
| 1000 | 30.9ms | 초과 |
| 1200 | 52.4ms | 초과 |

block 방식(블록 1개만 파싱+반영)은 블록 수와 무관하게 편집당 0.03~0.07ms로 일정.

**약 600~700블록(≈ 마크다운 3,000~3,500줄) 지점**부터 naive 방식이 60fps 프레임 예산을 넘기 시작한다.
(데스크톱 Chromium 기준. 저사양 모바일은 2~4배 느릴 수 있음 — 감안해도 개인 블로그 포스트가
이 규모에 도달하는 경우는 사실상 없다.)

## 실측 3 — 극단적 케이스: 실제 패키지 코드로 ~7,000줄(1,400블록) 실측

실제 `markdown-block-preview` 소스(`setupMarkdownPreview`)를 그대로 브라우저에 올려서
(import map으로 로컬 정적 서버 경유) 8,399줄(1,400블록) 문서로 naive와 직접 비교(200회 반복):

| | npm 패키지 | naive |
|---|---|---|
| 초기 렌더 | 100.5ms | 38.1ms |
| 편집 1회당 비용 | **1.11ms** | 55.09ms (p95 72.7ms) |

의외로 **초기 렌더는 npm 패키지 쪽이 더 느렸다**(블록마다 `createElement`로 노드를 하나씩 만들어
붙이는 비용이, 브라우저 내장 파서에 큰 HTML 문자열 하나를 통째로 넘기는 것보다 큼). 다만 이건
에디터를 열 때 한 번만 발생하는 비용이다. 반면 **편집(타이핑) 비용은 패키지가 naive 대비
49.5배 빠르고**, naive는 키 입력마다 55ms(프레임 예산의 3배)로 실제 렉이 체감되는 반면 패키지는
1.1ms로 완전히 매끄럽다. 즉 이 알고리즘이 존재 가치를 발휘하는 지점은 정확히 "수천 줄 이상을
실시간 편집"하는 시나리오다 — 이게 실제로 어떤 분야에 해당하는지는
[별첨 조사](2026-07-11-block-rendering-demand-research.md) 참고.

## 결론 / 의사결정

- **naive 구현(+필요시 가벼운 input debounce)으로 충분**하다고 판단. block+memo 기반 재구현은
  이 프로젝트 글 규모(수십~수백 줄)에서는 오버엔지니어링으로 보고 채택하지 않는다.
- `markdown-block-preview` npm 패키지는 **폐기가 아니라 "이번 프로젝트 요구사항(SSR/React)과
  안 맞아서 안 쓰는 것"** — 독립 오픈소스 패키지로는 그대로 유지, vanilla JS 프로젝트에서는 여전히 유효.
- 이번 마이그레이션에서는 `apps/web`의 `package.json`에서 해당 의존성만 제거한다.
- 이 알고리즘을 실제로 필요로 하는 분야가 있는지는 [별첨 문서](2026-07-11-block-rendering-demand-research.md)에서 따로 조사했다.

## 남은 일 (이번 세션 범위 밖)

- 설계 문서 §6-1 리스크 항목 문구 자체를 "결정됨(naive+debounce 채택, 알고리즘 이식 안 함)"으로
  갱신할지는 별도 확인 필요.
- `marked` 렌더링 결과에 sanitize(XSS 방지, 예: DOMPurify) 처리가 없다는 기존 한계는 이번 검토
  범위 밖이며 여전히 미해결.
