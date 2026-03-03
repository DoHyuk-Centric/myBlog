function desktop() {
  const windowRoot = document.getElementById("winXpFolderContents");
  const headerComponents = document.querySelector("#winXpFolderButtonComponent");
  const asideComponents = document.querySelector("#winXpFolerAside");
  const folderContents = document.getElementById("winXpFolderContents");

  const fullClasses = ["w-full", "h-251"];
  const windowClasses = [
    "left-1/2","top-1/2","transition-transform",
    "-translate-x-1/2","-translate-y-1/2","w-200","h-100"
  ];

  function toggleFolderSize() {
    const isFull = folderContents.classList.contains("w-full");
    if (isFull) {
      folderContents.classList.remove(...fullClasses);
      folderContents.classList.add(...windowClasses);
    } else {
      folderContents.classList.remove(...windowClasses);
      folderContents.classList.add(...fullClasses);
    }
  }

  const headerActions = {
    winXpMin: () => {},
    winXpFolderDisplay: () => toggleFolderSize(),
    winXpExit: () => folderContents.classList.add("hidden"),
  };

  headerComponents.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    headerActions[btn.dataset.app]?.();
  });

  const displays = {
    desktop: document.getElementById("winDisplayDesktop"),
    folder: document.getElementById("winDisplayFolder"),
    computer: document.getElementById("winDisplayComputer"),
    network: document.getElementById("winDisplayNetwork"),
    trash: document.getElementById("winDisplayTrash"),
  };

  function showDisplay(viewKey) {
    Object.values(displays).forEach((display) => display.classList.add("hidden"));
    displays[viewKey]?.classList.remove("hidden");
  }

  function updateAsideSelection(activeButton) {
    const buttons = asideComponents.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.querySelector("p")?.classList.remove("bg-[#EDEADA]");
    });
    activeButton?.querySelector("p")?.classList.add("bg-[#EDEADA]");
  }

  const asideKeyToViewKey = {
    winXpDesktop: "desktop",
    winXpMyfolder: "folder",
    winXpMyComputer: "computer",
    winXpMyNetwork: "network",
    winXpTrash: "trash",
  };

  function navigateByAsideKey(asideKey) {
    const viewKey = asideKeyToViewKey[asideKey];
    if (!viewKey) return;

    showDisplay(viewKey);

    const asideBtn = asideComponents.querySelector(`button[data-app="${asideKey}"]`);
    updateAsideSelection(asideBtn);
  }

  asideComponents.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    navigateByAsideKey(btn.dataset.app);
  });

  const appKeyToAsideKey = {
    winXpFolder: "winXpMyfolder",
    winXpMyCom: "winXpMyComputer",
    winXpNetwork: "winXpMyNetwork",
    winXpTrash: "winXpTrash",
    winXpGithub: "winXpGithub",

  };

  function openWindowIfNeeded(appKey) {
    // 폴더 더블클릭 시 폴더 창 열기 같은 부가 동작을 여기서만 관리
    if (appKey === "winXpFolder") folderContents.classList.remove("hidden");
    else if (appKey === "winXpGithub") window.open("https://github.com/DoHyuk-Centric/myBlog", "_blank", "noopener,noreferrer");
    else if (appKey === "winXpKakao") window.open("https://open.kakao.com/o/sPeTPrii", "_blank", "noopener,noreferrer");
    else if (appKey === "winXpKakao") window.open("https://hyeeoooook.tistory.com/", "_blank", "noopener,noreferrer");
  }

  windowRoot.addEventListener("dblclick", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const appKey = btn.dataset.app;

    openWindowIfNeeded(appKey);

    const asideKey = appKeyToAsideKey[appKey];
    if (!asideKey) return;

    navigateByAsideKey(asideKey);
  });

  navigateByAsideKey("winXpDesktop");
}

desktop();