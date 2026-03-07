export function initMobileButtonEvent(){
    const container = document.querySelector("#project-mobile-tabs");
    const buttons = Array.from(container.querySelectorAll("button"));

    const contents = buttons.map((btn) => document.getElementById(btn.dataset.target)).filter(Boolean);

    const ACTIVE_CLASS = ["bg-[#e2e0d8]","dark:bg-slate-900"];

    function setActive(targetEl, activeBtn){
        contents.forEach((el) => {el.classList.add("hidden");});
        contents.forEach((el) => {el.classList.remove("flex");});

        buttons.forEach((btn) => {btn.classList.remove(ACTIVE_CLASS[0], ACTIVE_CLASS[1]);});

        if(targetEl){
            targetEl.classList.remove("hidden");
            targetEl.classList.add("flex");
        }
        if(activeBtn){
            activeBtn.classList.add(ACTIVE_CLASS[0], ACTIVE_CLASS[1]);
        }
    }

    container.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        const targetEL = document.getElementById(btn.dataset.target);

        setActive(targetEL, btn);
    });

    setActive(contents[0], buttons[0]);
}