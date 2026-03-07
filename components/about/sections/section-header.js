import { SECTION_HEADER_DATA } from "../data/section-header-Data.js";

const backgroundLayer = () => `<div class="background-Animation"></div>`;

const overlayLayer = () => `<div class="absolute w-full h-full bg-black/50"></div>`;

const textLayer = ({ tagline, role, email }) =>
    `<div class="absolute w-full h-full flex lg:left-[60vw] flex-col justify-center text-white z-10">
        <h2 id="aboutHeaderText" class="pl-5 sm:pl-10 text-xl sm:text-3xl md:text-5xl">
            ${tagline}
        </h2>
        <p id="aboutPText" class="pl-5 sm:pl-10 mb-2 text-sm sm:text-xl md:text-2xl">
            ${role}
        </p>
        <p class="pl-5 sm:pl-10 text-xs sm:text-xl">
            ${email}
        </p>
    </div>`;

function buildHeader(data){
    return `
        <header class="relative w-100vw h-screen overflow-hidden">
            ${backgroundLayer()}
            ${overlayLayer()}
            ${textLayer(data)}
        </header>`;
}

export function mountHeader(){
    const section = document.getElementById("section-header");
    section.innerHTML = buildHeader(SECTION_HEADER_DATA);
}