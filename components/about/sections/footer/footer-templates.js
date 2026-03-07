// ─── 브랜드 ──────────────────────────────────────────────

const brand = ({ name, icon }) => `
  <div class="flex flex-col md:flex-row justify-between items-start gap-8
               px-10 pt-10 pb-6 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center gap-3">
      <img width="28" height="28" src="${icon}" alt="code" />
      <h1 class="text-xl font-semibold tracking-tight">${name}</h1>
    </div>
  </div>`;

// ─── 소셜 링크 ────────────────────────────────────────────

const connectLink = ({ href, src, alt, class: cls }) => `
  <a href="${href}" target="_blank" rel="noreferrer noopener" class="${cls}">
    <img class="w-7 h-7" src="${src}" alt="${alt}" />
  </a>`;

const connect = (links) => `
  <div class="flex flex-col gap-3">
    <span class="text-xs uppercase tracking-widest
                 text-gray-400 dark:text-gray-500">Connect</span>
    <div class="flex gap-4">
      ${links.map(connectLink).join("")}
    </div>
  </div>`;

// ─── 연락처 ──────────────────────────────────────────────

const contact = (email) => `
  <div class="flex flex-col gap-3">
    <span class="text-xs uppercase tracking-widest
                 text-gray-400 dark:text-gray-500">Contact</span>
    <a href="mailto:${email}"
      class="text-sm text-gray-600 dark:text-gray-300
             hover:text-purple-500 dark:hover:text-purple-400
             transition-colors duration-200
             underline underline-offset-4 decoration-dotted">
      ${email}
    </a>
  </div>`;

// ─── 기술 스택 ────────────────────────────────────────────

const techBadge = ({ label, class: cls }) => `
  <span class="text-xs px-3 py-1 rounded-full ${cls}">${label}</span>`;

const techStack = (stacks) => `
  <div class="flex flex-col gap-3">
    <span class="text-xs uppercase tracking-widest
                 text-gray-400 dark:text-gray-500">Tech Stack</span>
    <div class="flex flex-wrap gap-2 max-w-xs">
      ${stacks.map(techBadge).join("")}
    </div>
  </div>`;

// ─── 철학 ────────────────────────────────────────────────

const quote = ({ ko, en, author }) => `
  <blockquote class="flex flex-col gap-2 border p-4 rounded-2xl w-100">
    <p class="text-lg font-semibold text-gray-800 dark:text-gray-100 leading-snug">
      ${ko}
    </p>
    <p>${en}</p>
    <span class="text-xs text-purple-400 dark:text-purple-500 tracking-wide">
      ${author}
    </span>
  </blockquote>`;

const philosophy = (quotes) => `
  <div class="hidden md:flex flex-col w-full h-full gap-5
               items-center justify-center">
    <div class="flex flex-col gap-5">
      <span class="text-xs uppercase tracking-widest
                   text-gray-400 dark:text-gray-500">Philosophy</span>
      <div class="flex gap-5">
        ${quotes.map(quote).join("")}
      </div>
    </div>
  </div>`;

// ─── 카피라이트 ───────────────────────────────────────────

const copyright = ({ copyright: copy, credit }) => `
  <div class="mt-auto px-10 py-5 border-t border-gray-200 dark:border-gray-700
               flex justify-between items-center text-xs
               text-gray-400 dark:text-gray-600">
    <span>${copy}</span>
    <span class="hidden md:block">${credit}</span>
  </div>`;

// ─── 전체 조립 ────────────────────────────────────────────

export const buildFooter = (data) => `
  <footer class="footer flex flex-col pt-15 md:pt-20 h-full
                 dark:bg-gray-900 dark:text-gray-200 bg-white text-gray-800">
    ${brand(data.brand)}
    <div class="flex flex-col md:flex-row md:justify-evenly md:mt-20
                 justify-between gap-8 px-10 py-8">
      ${connect(data.connect)}
      ${contact(data.contact)}
      ${techStack(data.techStack)}
    </div>
    ${philosophy(data.philosophy)}
    ${copyright(data)}
  </footer>`;