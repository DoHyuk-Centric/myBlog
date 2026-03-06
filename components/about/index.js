import { initAsideNav } from './aside_nav.js';
import { mountHeader } from './sections/section-header.js';
import { mountMockup } from './sections/section-mockup.js';

document.addEventListener("DOMContentLoaded", () => {
    initAsideNav();
    mountHeader();
    mountMockup();
});