const ACTIVE_WIDTH = "w-[30px]";
const INACTIVE_WIDTH = "w-[15px]";

const ASIDE_DATA = [
  { label: "헤더" },
  { label: "프로필" },
  { label: "프로젝트" },
  { label: "목업컨텐츠" },
  { label: "아키텍처" },
  { label: "푸터" },
];

export function initAsideNav() {
  const aside         = document.getElementById("aside_nav");
  const mainContainer = document.querySelector(".maincontainer");
  const sections      = document.querySelectorAll("[data-section='about']");

  aside.innerHTML = ASIDE_DATA.map(({ label }) => `
    <div class="about_aside_btn rounded-full duration-300 bg-blue-400 w-7.5 h-1.5"
      role="button" tabindex="0" aria-label="${label}" aria-current="false">
    </div>`).join("");

  const asideBtns = Array.from(aside.querySelectorAll(".about_aside_btn"));

  let isFirstLoad = true;

  const observer = new IntersectionObserver((entries) => {
    if (isFirstLoad) {
      actionAsideNav(1, asideBtns);
      isFirstLoad = false;
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionNum = Array.from(sections).indexOf(entry.target) + 1;
        actionAsideNav(sectionNum, asideBtns);
      }
    });
  }, { root: mainContainer, threshold: 0.5 });

  sections.forEach((sec) => observer.observe(sec));

  function actionAsideNav(sectionNum, btns) {
    btns.forEach((btn, i) => {
      const isActive = i === sectionNum - 1;
      btn.classList.toggle(ACTIVE_WIDTH, isActive);
      btn.classList.toggle(INACTIVE_WIDTH, !isActive);
      btn.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }
}