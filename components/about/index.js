import { initAsideNav } from './aside_nav.js';
import { mountHeader } from './sections/section-header.js';
import { mountProfile } from './sections/section-profile.js';
import { mountProject } from './sections/section-project.js';
import { mountMockup } from './sections/section-mockup.js';

document.addEventListener("DOMContentLoaded", () => {
    initAsideNav();
    mountHeader();
    mountProfile();
    mountProject();
    mountMockup();
});