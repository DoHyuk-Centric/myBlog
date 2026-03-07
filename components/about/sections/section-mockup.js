import { SECTION_MOCKUP_DATA } from '../data/section-mockup-Data.js';
import { buildMobile } from './mockup/mobile-templates.js';
import { buildDesktop } from './mockup/desktop-templates.js';
import { initDesktop } from './mockup/desktop.js';
import { initGetTime } from './mockup/getTime.js';
import { initMobile } from './mockup/mobile.js';

export function mountMockup() {
    const section = document.getElementById("section-mockup");

    section.innerHTML = `
    ${buildMobile(SECTION_MOCKUP_DATA)}
    ${buildDesktop(SECTION_MOCKUP_DATA)}`;

    initDesktop();
    initGetTime();
    initMobile();
}