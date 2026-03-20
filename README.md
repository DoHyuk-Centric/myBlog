![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite_7.3.0](https://img.shields.io/badge/Vite_7.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)


![Progress](https://img.shields.io/badge/index-80%25-ffffff)
![Progress](https://img.shields.io/badge/devLog-100%25-brightgreen)
![Progress](https://img.shields.io/badge/about-100%25-brightgreen)
![Progress](https://img.shields.io/badge/server-100%25-black)
![Progress](https://img.shields.io/badge/기능구현-90%25-1e90ff)
![Progress](https://img.shields.io/badge/API-100%25-ffcc00)

![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&duration=2000&pause=800&color=3ECF8E&center=true&vCenter=true&width=600&lines=Personal+Blog+Project;Vanilla+Frontend+Blog;No+Framework+No+Server)

**🔗 [dohyuk.dev](https://dohyuk.dev)**

## 프로젝트 소개 & 동기
React, Vue 같은 프레임워크 없이 Vanilla JS만으로 SPA를 구현한 개인 기술 블로그입니다.

## 📦 직접 만든 npm 패키지
### [`npm 바로가기`](https://www.npmjs.com/package/markdown-block-preview) [`Github 바로가기`](https://github.com/DoHyuk-Centric/markdown-block-preview)
블로그 글쓰기 기능을 구현하다가, 마크다운을 **블록(문단) 단위로 실시간 미리보기**하는 라이브러리가 없어서 직접 만들었습니다.

```bash
npm install markdown-block-preview
```
 
```js
import { BlockPreview } from 'markdown-block-preview';
 
const preview = new BlockPreview({
  editor: document.querySelector('#editor'),
  output: document.querySelector('#preview'),
});
```
 
전체 문서를 한 번에 렌더링하는 방식 대신, 커서가 위치한 블록만 선택적으로 렌더링해 불필요한 재렌더링을 줄인 것이 핵심입니다.
자세한 내용은 사이트의 성능 지표를 확인해주세요.
