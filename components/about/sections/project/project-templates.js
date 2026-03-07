const linkIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0 0-7.07 5 5 0 0 0-7.07 0L10.5 5.4"/>
    <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.4a5 5 0 0 0 0 7.07 5 5 0 0 0 7.07 0l.9-.9"/>
  </svg>`;

const sectionBlock = ({ heading, items }) => `
  <div class="p-5 border dark:border-slate-600 rounded-2xl">
    <h3 class="text-xl mb-5 text-center">${heading}</h3>
    <ul class="list-disc pl-3">
      ${items.map(item => `<li class="text-lg">${item}</li>`).join("")}
    </ul>
  </div>`;

const troubleItem = ({ label, desc, href }) => `
  <li class="text-lg space-y-1">
    <a href="${href}" target="_blank" rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-3 py-1 rounded-lg
             bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100
             dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-white
             hover:scale-105 transition-all duration-200">
      ${linkIcon} ${label}
    </a>
    <p class="text-gray-500 text-sm">${desc}</p>
  </li>`;

const featureCard = ({ title, badge, badgeColor, items }) => `
  <div class="bg-white dark:bg-gray-700 border dark:border-slate-600
              rounded-2xl p-4 shadow-sm hover:shadow-md transition">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xl font-semibold">${title}</h3>
      <span class="text-xs px-2 py-0.5 rounded-full
                   bg-${badgeColor}-50 text-${badgeColor}-700
                   border border-${badgeColor}-100">
        ${badge}
      </span>
    </div>
    <ul class="list-disc pl-4 space-y-2 text-sm text-gray-700 dark:text-white">
      ${items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  </div>`;

export const mobileTab = ({ target, label, number, class: cls }) => `
  <button data-target="${target}" class="${cls}">
    <p class="mb-1 text-[12px] sm:text-[16px] dark:text-[#eecd94]">${number}</p>
    ${label}
  </button>`;

export const mobileTabContent = (card) => {
    const isFirst = card.id === "tab-overview";
    return `
    <div id="${card.id}"
      class="${isFirst ? "flex" : "hidden"} w-full p-5 justify-center
             bg-white dark:bg-slate-800 rounded-r-2xl
             dark:border-slate-600 border-[#e2e0d8]
             border-r-2 border-t-2 border-b-2">
      <div class="flex flex-col justify-center">
        <span class="border rounded-2xl mb-1 py-0.5 px-1 w-max
                     text-[6px] text-${card.badge.color}-500
                     bg-${card.badge.color}-50 dark:bg-slate-800">
          ${card.badge.label}
        </span>
        <h2>${card.title}</h2>
        <p class="text-[8px] dark:text-amber-100 text-gray-400">${card.meta}</p>
        <div class="mt-2 border rounded-md border-[#e2e0d8] flex flex-col
                    divide-y divide-[#e2e0d8] dark:border-slate-600
                    dark:divide-slate-600 dark:bg-slate-800 gap-1 bg-[#f4f3ef]">
          ${renderMobileCardBody(card)}
        </div>
      </div>
    </div>`;
};

function renderMobileCardBody(card) {
    if (card.sections) return card.sections.map(s => `
    <div class="p-2 text-[8px]">
      <h3 class="text-[10px] text-[#c9a84c] dark:text-amber-400">${s.heading}</h3>
      <ul class="text-slate-600 dark:text-amber-50">
        ${s.items.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>`).join("");

    if (card.stacks) return `
    ${Object.entries(card.stacks).map(([env, items]) => `
        <div class="p-2 text-[8px]">
        <h3 class="text-[10px] text-[#c9a84c] dark:text-amber-400">${env}</h3>
        <ul class="text-slate-600 dark:text-amber-50">
            ${items.map(i => `<li>${i}</li>`).join("")}
        </ul>
        </div>`).join("")}
    <div class="p-2 text-[8px]">
        <h3 class="text-[10px] text-[#c9a84c] dark:text-amber-400">트러블슈팅</h3>
        <ul class="text-slate-600 dark:text-amber-50">
        ${card.mobileTroubles.map(i => `<li>${i}</li>`).join("")}
        </ul>
    </div>`;

    // ↓ 카드 3 모바일 전용 구조
    if (card.mobileFeatures) {
        const topRow = `
      <div class="text-[8px] flex gap-1 divide-x divide-[#e2e0d8]">
        ${card.mobileFeatures.topRow.map(col => `
          <div class="p-2 flex-1">
            <h3 class="text-[10px] text-[#c9a84c] dark:text-amber-400">${col.heading}</h3>
            <ul class="text-slate-600 dark:text-amber-50">
              ${col.items.map(i => `<li>${i}</li>`).join("")}
            </ul>
          </div>`).join("")}
      </div>`;

        const rows = card.mobileFeatures.rows.map(row => `
      <div class="p-2 text-[8px]">
        <h3 class="text-[10px] text-[#c9a84c] dark:text-amber-400">${row.heading}</h3>
        <ul class="text-slate-600 dark:text-amber-50">
          ${row.items.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>`).join("");

        return topRow + rows;
    }
}

function renderDesktopCardHeader(card) {
    if (card.id === "tab-feature") return `
    <div class="flex flex-col items-center gap-2">
      <h2 class="text-3xl text-center">${card.title}</h2>
      <p class="text-base text-gray-500">${card.subject}</p>
    </div>`;

    if (card.id === "tab-overview") return `
    <h2 class="text-3xl text-center mb-2">${card.title}</h2>
    <p class="text-xl">${card.subject}</p>
    <p class="text-xl">${card.period}</p>`;

    return `
    <h2 class="text-3xl text-center mb-2">${card.title}</h2>
    <p class="text-xl">${card.subject}</p>`;
}

function renderDesktopCardBody(card) {
    if (card.sections) return card.sections.map(sectionBlock).join("");

    if (card.stacks) return `
    <div class="p-5 border dark:border-slate-600 rounded-2xl flex">
      ${Object.entries(card.stacks).map(([env, items]) => `
        <div class="w-1/2">
          <h3 class="text-xl mb-5">${env}</h3>
          <ul class="list-disc pl-3">
            ${items.map(i => `<li class="text-lg">${i}</li>`).join("")}
          </ul>
        </div>`).join("")}
    </div>
    <div class="p-5 border dark:border-slate-600 rounded-2xl">
      <h3 class="text-xl mb-5 text-center">트러블슈팅</h3>
      <ul class="list-disc pl-3 flex flex-col gap-5">
        ${card.troubles.map(troubleItem).join("")}
      </ul>
    </div>`;

    if (card.features) return `
      ${card.features.map(featureCard).join("")}

      <div class="bg-white/95 dark:bg-gray-700 border dark:border-slate-600
                  border-gray-200 rounded-3xl p-6 shadow-lg shadow-black/5
                  backdrop-blur-sm hover:shadow-xl hover:shadow-black/5
                  transition md:col-span-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
            랜더링 최적화
          </h3>
          <span class="text-xs px-2 py-1 rounded-full bg-purple-50
                       text-purple-700 border border-purple-100 font-medium">
            Performance
          </span>
        </div>
        <div class="flex">
          <div class="rounded-l-2xl border flex flex-col justify-center
                      border-gray-200 dark:border-slate-600
                      bg-linear-to-b from-gray-50 dark:to-gray-700
                      dark:from-gray-600 to-white p-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              이벤트 기반 구조 개선
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-100 leading-relaxed">
              scroll 이벤트 중심 구조에서 Observer와 상태 기반 설계로 전환하며 UI 감지 및 변경 흐름을 단순화했습니다.
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="text-xs px-2 py-1 rounded-full border bg-white
                           dark:border-slate-600 text-gray-700">IntersectionObserver</span>
              <span class="text-xs px-2 py-1 rounded-full border bg-white
                           dark:border-slate-600 text-gray-700">상태 기반 토글</span>
              <span class="text-xs px-2 py-1 rounded-full border bg-white
                           dark:border-slate-600 text-gray-700">이벤트 통합</span>
            </div>
          </div>
          <div class="rounded-r-2xl border border-gray-200 dark:border-slate-600
                      bg-white dark:bg-gray-600 p-4">
            <ul class="space-y-2 text-sm text-gray-700 dark:text-white">
              <li class="flex gap-2">
                <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0"></span>
                <span>
                  <b class="font-semibold text-gray-900 dark:text-white">scroll 이벤트 제거</b>
                  → IntersectionObserver로 섹션 감지 구조 변경
                </span>
              </li>
              <li class="flex gap-2">
                <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0"></span>
                <span>
                  메뉴 UI를
                  <b class="font-semibold text-gray-900 dark:text-white">상태 기반(open/close)</b>
                  로 통합하여 중복 실행 방지
                </span>
              </li>
              <li class="flex gap-2">
                <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0"></span>
                <span>
                  비동기 완료 후 라우팅 처리로
                  <b class="font-semibold text-gray-900 dark:text-white">실행 흐름 제어</b>
                  개선
                </span>
              </li>
            </ul>
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-slate-600">
              <p class="text-xs text-gray-500 dark:text-white">
                포인트: 기능 구현 이후 실행 흐름과 이벤트 구조를 재설계하며 UI 동작의 일관성과 안정성을 확보했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>`;
}

export const desktopCard = (card, index) => {
    const positions = [
        "z-10 scale-100 blur-none left-1/2",
        "z-9 scale-95 blur-xs left-3/5",
        "z-9 scale-95 blur-xs left-2/5",
    ];

    const shadow = card.id === "tab-feature" ? "shadow-lg" : "";

    const baseClass = `introduce-card absolute top-1/2 -translate-x-1/2 -translate-y-1/2
                     border rounded-2xl flex flex-col gap-4 w-200 p-5
                     bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white
                     transition-all duration-500 ease-out ${shadow} ${positions[index]}`;

    const sectionClass = card.id === "tab-feature"
        ? "w-full grid grid-cols-1 md:grid-cols-3 gap-3 border dark:border-slate-600 rounded-2xl p-3 bg-gray-50 dark:bg-slate-700"
        : "relative flex flex-col gap-5 border dark:border-slate-600 rounded-2xl p-5";

    return `
    <div class="card-drag-layer absolute inset-0 w-full">
      <div class="${baseClass}">
        ${renderDesktopCardHeader(card)}
        <section class="${sectionClass}">
          ${renderDesktopCardBody(card)}
        </section>
      </div>
    </div>`;
};