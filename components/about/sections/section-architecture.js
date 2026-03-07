import { SECTION_ARCHITECTURE_DATA } from '../data/section-architecture-Data.js';
import { stepCard, divider, responseCard, keyPoints } from './architecture/architecture-templates.js';

function buildArchitecture({ title, steps, response, keyPoints: points }) {
    return `
    <header class="mb-4 pt-4">
      <h2 class="text-sm md:text-xl text-center font-semibold
                 text-slate-900 dark:text-white">${title}</h2>
    </header>

    <div class="rounded-2xl border border-slate-200 bg-white
                dark:border-slate-700 dark:bg-slate-800
                dark:shadow-none p-2 md:p-4 shadow-sm">
      <div class="space-y-2">
        ${steps.map(stepCard).join("")}
        ${divider()}
        ${responseCard(response)}
      </div>
      ${keyPoints(points)}
    </div>`;
}

export function mountArchitecture() {
    const section = document.getElementById("section-architecture");
    section.innerHTML = buildArchitecture(SECTION_ARCHITECTURE_DATA);
}