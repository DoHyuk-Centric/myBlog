const stepNumber = (number, theme) => {
  const colors = {
    slate:   "bg-slate-900 dark:bg-slate-950",
    indigo:  "bg-indigo-600",
    emerald: "bg-emerald-600",
  };
  return `
    <span class="inline-flex h-4 w-4 md:h-8 md:w-8 text-[8px] md:text-sm
                 items-center justify-center rounded-full
                 ${colors[theme]} font-semibold text-white">
      ${number}
    </span>`;
};

const detailCard = ({ title, code, desc }) => `
  <div class="rounded-lg bg-white p-3 ring-1 ring-indigo-200
               dark:bg-slate-800 dark:ring-indigo-700">
    <p class="text-[10px] md:text-xs font-semibold
              text-slate-700 dark:text-slate-200">${title}</p>
    <p class="mt-1 font-mono text-[8px] md:text-xs
              text-slate-800 dark:text-slate-200">${code}</p>
    <p class="mt-1 text-[8px] md:text-xs
              text-slate-600 dark:text-slate-300">${desc}</p>
  </div>`;

export const stepCard = ({ number, theme, bg, title, desc, badge, code, details, codeRingClass }) => `
  <div class="rounded-xl border p-4 ${bg}">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        ${stepNumber(number, theme)}
        <div>
          <p class="text-[10px] md:text-[16px] font-medium
                    text-slate-900 dark:text-white">${title}</p>
          <p class="text-[8px] md:text-sm
                    text-slate-600 dark:text-slate-300">${desc}</p>
        </div>
      </div>
      <span class="inline-flex items-center rounded-full border px-2 md:px-3 py-1
                   text-[8px] md:text-xs font-medium ${badge.class}">
        ${badge.label}
      </span>
    </div>
    ${code && !details ? `
    <div class="mt-3 hidden sm:block text-[8px] rounded-lg
                dark:bg-slate-800 dark:text-slate-200
                bg-white p-3 font-mono md:text-xs text-slate-800
                ring-1 ${codeRingClass}">
      ${code}
    </div>` : ""}
    ${details ? `
      <div class="mt-3 gap-2 md:grid-cols-2 hidden sm:grid">
        ${details.map(detailCard).join("")}
      </div>` : ""}
  </div>`;

export const divider = () => `
  <div class="flex items-center justify-center">
    <div class="relative mt-2 flex w-full max-w-md items-center justify-center">
      <div class="h-px flex-1 bg-slate-200 dark:bg-slate-600"></div>
      <span class="mx-3 inline-flex items-center rounded-full bg-slate-900
                   px-2 md:px-3 py-1 text-[8px] md:text-xs font-medium
                   text-white dark:bg-slate-950">응답 중계</span>
      <div class="h-px flex-1 bg-slate-200 dark:bg-slate-600"></div>
    </div>
  </div>`;

export const responseCard = ({ title, desc, badges }) => `
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4
               dark:border-slate-600 dark:bg-slate-800">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="inline-flex h-4 w-4 md:h-8 md:w-8 items-center justify-center
                     rounded-full bg-slate-900 text-[8px] md:text-sm
                     font-semibold text-white dark:bg-slate-950">↩</span>
        <div>
          <p class="text-[10px] md:text-[16px] font-medium
                    text-slate-900 dark:text-white">${title}</p>
          <p class="text-[8px] md:text-sm
                    text-slate-600 dark:text-slate-300">${desc}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        ${badges.map(label => `
          <span class="inline-flex items-center rounded-full border border-slate-200
                       bg-white px-2 md:px-3 py-1 text-[8px] md:text-xs
                       font-medium text-slate-700 dark:border-slate-500
                       dark:bg-slate-800 dark:text-slate-200">${label}</span>
        `).join("")}
      </div>
    </div>
  </div>`;

export const keyPoints = (points) => `
  <div class="mt-6 rounded-xl border border-slate-200 bg-white p-4
               dark:border-slate-600 dark:bg-slate-800">
    <p class="text-[8px] md:text-sm font-medium
              text-slate-900 dark:text-white">핵심 포인트</p>
    <ul class="mt-2 space-y-1 text-[6px] md:text-sm
               text-slate-600 dark:text-slate-300">
      ${points.map(({ text, highlight, rest }) => `
        <li class="flex gap-2">
          <span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400"></span>
          ${text}
          ${highlight ? `
            <span class="font-medium text-slate-800 dark:text-slate-100">${highlight}</span>
            ${rest}` : ""}
        </li>`).join("")}
    </ul>
  </div>`;