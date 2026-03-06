const ACTIVE_WIDTH = "w-[30px]";
const INACTIVE_WIDTH = "w-[15px]";

export function initAsideNav(){
  const mainContainer = document.querySelector(".maincontainer");
  const section = document.querySelectorAll(`[data-section="about"]`);
  const asideBtn = document.querySelectorAll(".about_aside_btn");

  let isFirstLoad = true;

  const observerOptions = {
    root: mainContainer,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    if (isFirstLoad) {
      actionAsideNav(1, asideBtn);
      isFirstLoad = false;
      return;
    }

    entries.forEach((entry) => {
      if(entry.isIntersecting){
        const sectionNum = Array.from(section).indexOf(entry.target) + 1;
        actionAsideNav(sectionNum, asideBtn);
      }
    });
  }, observerOptions);

  section.forEach((sec) => {
    observer.observe(sec);
  });
  
  function actionAsideNav(sectionNum, btns) {
    btns.forEach((btn, i) => {
      const isActive = i === sectionNum - 1;
      btn.classList.toggle(ACTIVE_WIDTH, isActive);
      btn.classList.toggle(INACTIVE_WIDTH, !isActive);
    });
  }
}