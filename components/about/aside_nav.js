navControler();
function navControler(){
  const mainContainer = document.querySelector(".maincontainer");
  const section = document.querySelectorAll(".maincontainer section");
  const asideBtn = document.querySelectorAll(".about_aside_btn");

  const sections = document.querySelectorAll(".maincontainer section");

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
        const sectionNum = Array.from(sections).indexOf(entry.target) + 1;
        actionAsideNav(sectionNum, asideBtn);
      }
    });
  }, observerOptions);

  section.forEach((sec) => {
    observer.observe(sec);
  });
}

  function actionAsideNav(sectionNum, asideBtn) {
    asideBtn.forEach((btn, i) => {
      if (i === sectionNum - 1) {
        btn.classList.remove("w-[15px]");
        btn.classList.add("w-[30px]");
      } else {
        btn.classList.remove("w-[30px]");
        btn.classList.add("w-[15px]");
      }
    });
  }