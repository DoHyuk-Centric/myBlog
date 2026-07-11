# 블록 단위 마크다운 증분 렌더링 — 실제 수요 조사

- 작업일: 2026-07-11
- 관련 문서: [2026-07-11-markdown-preview-perf-review.md](2026-07-11-markdown-preview-perf-review.md)
- 계기: 위 문서에서 "이 블로그 규모(수백 줄)엔 불필요, 7,000줄급 초장문에서만 의미 있다"는
  결론을 냈는데, 그렇다면 **실제로 그 정도 규모를 다루는 분야/사용자가 있는지** 별도로 조사

## 요약

있다. 크게 두 갈래로 확인된다.

1. **기존 장문 편집기들이 이미 겪고 있는, 문서화된 문제** — VS Code, Obsidian, Atom, Markdown
   Monster 모두 "긴 마크다운 문서에서 타이핑/프리뷰가 느려진다"는 이슈를 다수 갖고 있고,
   구체적인 줄 수 임계치까지 보고돼 있다.
2. **2026년 현재 가장 활발한 실수요처는 따로 있다 — AI 스트리밍 마크다운 렌더링(챗봇 UI)**.
   LLM이 토큰 단위로 답변을 스트리밍할 때 매 토큰마다 전체를 재파싱하는 문제를 푸는 것이
   본질적으로 이 패키지의 "블록 단위, 안정된 부분은 재파싱 안 함" 알고리즘과 동일하다.
   이 문제를 전용으로 푸는 오픈소스 라이브러리(Incremark, Streamdown 등)가 실제로 존재하고
   활발히 쓰이고 있다.

즉 "긴 글 에디터"라는 원래 상정했던 시장보다, "AI 채팅 UI의 실시간 마크다운 렌더링"이라는
시장이 지금은 더 크고 뜨겁다.

---

## 1. 기존 장문 마크다운 편집기의 실측/보고된 성능 문제

| 도구 | 보고된 문제 | 출처 |
|---|---|---|
| VS Code (내장) | 마크다운 파일이 10,000줄을 넘으면 성능이 급격히 나빠짐. 초기 프리뷰 렌더에 1~2초, 심하면 거의 1분 | [Issue #301936](https://github.com/microsoft/vscode/issues/301936), [Issue #245841](https://github.com/microsoft/vscode/issues/245841) |
| VS Code + vscode-markdown 확장 | 813줄짜리 파일에서 프리뷰를 켜놓으면 타이핑한 글자가 화면에 안 보일 정도로 느려짐 | [Issue #323](https://github.com/yzhang-gh/vscode-markdown/issues/323) |
| Atom `markdown-preview` | 코드 블록이 많은 파일에서 프리뷰가 느려짐(전체 재렌더 방식의 전형적 증상) | [Issue #197](https://github.com/atom/markdown-preview/issues/197) |
| Markdown Monster | 문서가 2,000줄을 넘으면 프리뷰 갱신이 눈에 띄게 느려지고, 3,000줄을 넘으면 스크롤마다 렉. 대응책으로 "타이핑 멈추고 2초 후에만 리프레시"라는 강제 디바운스를 걸어둠. 10만 단어 이상에서는 아예 자동 동기화를 꺼야 한다고 권장 | [Editing Huge Documents](https://markdownmonster.west-wind.com/docs/FAQ/Editing-Huge-Documents.html) |
| Obsidian (Live Preview) | 링크/콘텐츠가 많은 노트, 큰 테이블에서 타이핑 시 렉. 키 입력 이벤트 핸들러가 거의 100ms씩 걸리는 사례 보고 | [Poor performance in live preview mode](https://forum.obsidian.md/t/poor-performance-in-live-preview-mode/50136), [Large markdown table causes slowness](https://forum.obsidian.md/t/large-markdown-table-causes-slowness/78593), [UI performance issues with large files](https://forum.obsidian.md/t/ui-performance-issues-with-large-files/13782) |

흥미로운 점: **Markdown Monster 개발자들은 아예 "거대한 단일 마크다운 문서를 만들지 말고
여러 문서로 쪼개라"고 공식 권고**한다. 즉 업계에서도 "이 정도 규모면 애초에 문서를 나누는 게
맞다"는 인식이 있다는 뜻이고, 이건 앞선 검토 문서의 "개인 블로그 포스트가 7,000줄까지 갈 일은
없다"는 판단과 같은 결이다.

이 사례들의 공통된 임계치 감각: **대략 800~3,000줄부터 체감이 시작되고, 10,000줄 이상에서
심각해진다.** 앞선 실측(600~700블록, 3,000~3,500줄에서 60fps 예산 초과)과 상당히 근접한다.

---

## 2. React 생태계에서도 동일한 문제 — "React면 해결된다"는 아님

가장 널리 쓰이는 React 마크다운 렌더러 `react-markdown`(remarkjs)에도 대형 문서 성능 이슈가
다수 열려 있다.

- [Discussion #1027](https://github.com/orgs/remarkjs/discussions/1027) — 매우 긴 텍스트에서
  가상화(virtualization) 없이는 성능이 안 나온다는 논의
- [Issue #459](https://github.com/remarkjs/react-markdown/issues/459),
  [Issue #289](https://github.com/remarkjs/react-markdown/issues/289) — 성능 개선 요청
- [Issue #703](https://github.com/remarkjs/react-markdown/issues/703) — **"React key가 리렌더
  최적화에 명시적으로 활용되지 않는다"** — 이전 검토 문서에서 "memo만으론 부족하고 key/블록 분리
  전략이 따로 필요하다"고 분석한 것과 정확히 같은 지적
- [Issue #621](https://github.com/remarkjs/react-markdown/issues/621) — 작은 문서에서도 렌더에
  수 ms가 누적된다는 보고

즉 "React를 쓰면 자동으로 빨라진다"는 통념은 실제 생태계에서도 반박되고 있고, 제안되는 해법도
이전 검토에서 도출한 것과 동일하다: **가상화, `React.memo`, 콘텐츠를 청크로 쪼개기, 필요하면
Web Worker로 파싱을 메인 스레드 밖으로 빼기.**

---

## 3. 지금 가장 뜨거운 실수요처 — AI 스트리밍 마크다운 렌더링

LLM 챗봇이 답변을 토큰 단위로 스트리밍할 때, 매 토큰마다 지금까지 받은 전체 텍스트를
처음부터 다시 마크다운 파싱하는 게 업계 표준 구현이었고, 이게 바로 O(n²) 문제였다.

- [From O(n²) to O(n): Building a Streaming Markdown Renderer for the AI Era](https://dev.to/kingshuaishuai/from-on2-to-on-building-a-streaming-markdown-renderer-for-the-ai-era-3k0f) —
  "답변이 2,000단어에 도달했을 때, 토큰 하나마다 2,000단어를 통째로 재파싱하고 수백 개의 DOM
  노드를 diff하고 있는 것"이라고 문제를 정의
- **[Incremark](https://www.incremark.com/)** — "한번 완결된(stable) 블록은 절대 다시 파싱하지
  않는다"는 불변식으로 O(n²)을 O(n)으로 낮춤. AI 스트리밍 기준 2~10배, 문서가 길수록 더 크게
  (최대 46배) 개선
- **[Streamdown](https://streamdown.ai/)** — AI 스트리밍 마크다운 전용 렌더러, Vercel AI SDK
  생태계에서 실제로 쓰이는 프로덕션 라이브러리
- **[Vercel AI SDK 공식 쿡북 — "Markdown Chatbot with Memoization"](https://ai-sdk.dev/cookbook/next/markdown-chatbot-with-memoization)** —
  Next.js/React 공식 예제로 "메모이제이션으로 마크다운 챗봇 성능 개선"을 다룸. 접근 방식이
  본질적으로 **"블록(문단) 단위로 쪼개고, 완결된 블록은 `memo`로 스킵"** — 이번에 이 세션에서
  설계한 `splitMarkdownBlocks` + `React.memo` 패턴과 개념적으로 동일

**이 사실이 의미하는 것**: `markdown-block-preview`가 원래 겨냥했던 "긴 글 편집기" 시장은
실재하지만 상대적으로 니치하다(장문 집필 툴, 위키 등). 반면 **"안정된 블록은 재파싱 안 하고
변경분만 처리한다"는 동일한 알고리즘이, 지금은 AI 챗봇 UI라는 훨씬 크고 빠르게 성장하는
시장에서 사실상 표준 해법으로 자리잡고 있다.** 이 패키지의 핵심 아이디어(`splitMarkdownBlocks`
+ 안정/불안정 구분)는 방향 자체는 맞았고, 적용 대상을 "글쓰기 에디터"에서 "AI 응답 스트리밍"
쪽으로 넓히면 훨씬 수요가 큰 문제를 풀 수 있다.

---

## 4. 이번 블로그 프로젝트에 대한 결론 (변경 없음)

[perf-review 문서](2026-07-11-markdown-preview-perf-review.md)의 결론은 그대로 유효하다 —
개인 devlog 포스트(수십~수백 줄) 규모에서는 naive 구현(+디바운스)으로 충분하고, 이 알고리즘을
이식할 필요가 없다. 다만 이번 조사로 다음이 추가로 확인됐다:

- 이 결론은 업계 관행(Markdown Monster의 "문서를 쪼개라" 권고)과도 일치한다.
- `markdown-block-preview`가 풀려던 문제 자체는 실재하는 문제이며, 폐기할 이유가 없다.
- 패키지의 다음 방향성을 고민한다면, "긴 글 편집기"보다 **"AI 스트리밍 마크다운 렌더링"** 쪽이
  훨씬 활발한 실수요가 있는 영역으로 보인다 (참고용, 이번 블로그 마이그레이션 범위 밖).

---

## 참고 자료

- [Editing Huge Documents — Markdown Monster](https://markdownmonster.west-wind.com/docs/FAQ/Editing-Huge-Documents.html)
- [microsoft/vscode #301936 — Edit markdown file so slow](https://github.com/microsoft/vscode/issues/301936)
- [microsoft/vscode #245841 — Markdown preview is slow](https://github.com/microsoft/vscode/issues/245841)
- [yzhang-gh/vscode-markdown #323 — Slow to edit large markdown file](https://github.com/yzhang-gh/vscode-markdown/issues/323)
- [atom/markdown-preview #197](https://github.com/atom/markdown-preview/issues/197)
- [Obsidian Forum — Poor performance in live preview mode](https://forum.obsidian.md/t/poor-performance-in-live-preview-mode/50136)
- [Obsidian Forum — Large markdown table causes slowness](https://forum.obsidian.md/t/large-markdown-table-causes-slowness/78593)
- [remarkjs/react-markdown Discussion #1027 — virtualization](https://github.com/orgs/remarkjs/discussions/1027)
- [remarkjs/react-markdown #703 — React keys unoptimized for re-rendering](https://github.com/remarkjs/react-markdown/issues/703)
- [From O(n²) to O(n): Building a Streaming Markdown Renderer for the AI Era](https://dev.to/kingshuaishuai/from-on2-to-on-building-a-streaming-markdown-renderer-for-the-ai-era-3k0f)
- [Incremark](https://www.incremark.com/)
- [Streamdown](https://streamdown.ai/)
- [Vercel AI SDK Cookbook — Markdown Chatbot with Memoization](https://ai-sdk.dev/cookbook/next/markdown-chatbot-with-memoization)
