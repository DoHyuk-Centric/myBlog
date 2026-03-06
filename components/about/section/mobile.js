export function initMobile() {
  const dock = document.querySelector("#mobileDock");
  const footer = document.querySelector("#mobileFooter");

  const home = document.getElementById("mobileHome");
  const contents = document.getElementById("mobileApp");

  const appScreens = contents.querySelectorAll("[data-app]");
  const chromeScreen = contents.querySelector('[data-app="chrome"]');

  let isOpenApp = false;

  function setOpen(next) {
    isOpenApp = next;
    if (!next) {
      resetApps();
    }
    showDisplay();
  }

  function resetApps() {
    const iframe = chromeScreen?.querySelector("iframe");
    if (iframe) iframe.remove();
  }

  function showDisplay() {
    home.classList.toggle("hidden", isOpenApp);
    contents.classList.toggle("hidden", !isOpenApp);
  }

  function changeMobileDisplay(appName) {
    appScreens.forEach((app) => {
      app.classList.add("hidden");
    });
    const target = contents.querySelector(`[data-app="${appName}"]`);
    if (target) {
      target.classList.remove("hidden");
    }
  }

  dock.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if(!btn){return;}
    const app = btn.dataset.app;
    if(!app){return;}

    setOpen(true);
    changeMobileDisplay(app);

    if(app === "chrome" && !chromeScreen.querySelector("iframe")){
      chromeScreen.innerHTML = `<iframe class="w-full h-full border-0" src="https://hyeeoooook.tistory.com/"></iframe>`;
    }
  });

  footer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if(!btn){return;}
    const action = btn.dataset.app;
    const closeActions = new Set(["mobileHamberger", "mobileHome", "mobileBack"]);
    if(closeActions.has(action)) setOpen(false);
  });

  document.querySelectorAll("[data-exit]").forEach((btn) => {
    btn.addEventListener("click", () => setOpen(false));
  })
}