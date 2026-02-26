function mobile() {
  const dock = document.querySelector("#mobileDock");
  const footer = document.querySelector("#mobileFooter");

  const home = document.getElementById("moblieHome");
  const contents = document.getElementById("moblieApp");

  const appScreens = contents.querySelectorAll("[data-app]");
  const chromeScreen = contents.querySelector('[data-app="chrome"]');

  const kakaoExit = document.getElementById("kakaoExit");
  const gmailExit = document.getElementById("gmailExit");

  let isOpenApp = false;

  const appActions = {
    kakao: function (appName) {
      setOpen(true);
      changeMobileDisplay(appName);
    },
    gmail: function (appName) {
      setOpen(true);
      changeMobileDisplay(appName);
    },
    chrome: function (appName) {
      setOpen(true);
      changeMobileDisplay(appName);
      if (!chromeScreen.querySelector("iframe")) {
        chromeScreen.innerHTML = `
            <iframe
                class="w-full h-full border-0"
                src="https://hyeeoooook.tistory.com/"
            ></iframe>
            `;
      }
    },
    excel: function (appName) {
      setOpen(true);
      changeMobileDisplay(appName);
    },
  };

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
    const app = btn.dataset.app;

    appActions[app]?.(app);
  });

  footer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    const action = btn.dataset.app;
    if (action === "mobileHamberger") {
      setOpen(false);
    } else if (action === "mobileHome") {
      setOpen(false);
    } else if (action === "mobileBack") {
      setOpen(false);
    }
  });

  kakaoExit.addEventListener("click", (e) => {
    setOpen(false);
  });
  gmailExit.addEventListener("click", (e) => {
    setOpen(false);
  });
}

mobile();
