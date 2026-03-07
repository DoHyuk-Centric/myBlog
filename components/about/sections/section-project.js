import { initCardDragAnimation } from './project/cardDrag';
import { initMobileButtonEvent } from './mockup/mobileButtonEvent.js';
import { SECTION_PROJECT_DATA } from '../data/section-project-Data.js';
import { mobileTab, mobileTabContent, desktopCard } from './project/project-templates.js';

function buildMobile({ tabs, cards }) {
    return `
    <div class="relative dark:text-white w-full h-full flex justify-center
                items-center lg:hidden text-[10px]">

      <section id="project-mobile-tabs"
        class="flex flex-col dark:bg-slate-800 bg-[#f4f3ef]
               dark:border-slate-600 border-[#e2e0d8] w-[20%] h-[60%]
               justify-center items-center border-2 rounded-l-2xl">
        ${tabs.map(mobileTab).join("")}
      </section>

      <section class="w-[60%] h-[60%] flex">
        ${cards.map(mobileTabContent).join("")}
      </section>

    </div>`;
}

function buildDesktop({ cards }) {
    return `
    <div id="project-card-section"
      class="relative w-full h-[70%] hidden lg:flex select-none">
      ${cards.map((card, i) => desktopCard(card, i)).join("")}
    </div>`;
}

export function mountProject() {
    const section = document.getElementById("section-project");
    section.innerHTML = `
    ${buildMobile(SECTION_PROJECT_DATA)}
    ${buildDesktop(SECTION_PROJECT_DATA)}`;
    initCardDragAnimation();
    initMobileButtonEvent();
}