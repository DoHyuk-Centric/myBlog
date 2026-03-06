function initHeader(folderContents) {
  const fullClasses = ["w-full", "h-251"];
  const windowClasses = [
    "left-1/2", "top-1/2", "transition-transform",
    "-translate-x-1/2", "-translate-y-1/2", "w-200", "h-100"
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
    winXpMin: () => { },
    winXpFolderDisplay: () => toggleFolderSize(),
    winXpExit: () => folderContents.classList.add("hidden"),
  };
  
  const headerComponents = document.querySelector("#winXpFolderButtonComponent");
  headerComponents.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    headerActions[btn.dataset.app]?.();
  });

}

function initAside() {
  const asideKeyToViewKey = {
    winXpDesktop: "desktop",
    winXpMyfolder: "folder",
    winXpMyComputer: "computer",
    winXpMyNetwork: "network",
    winXpTrash: "trash",
  };

  const displays = {
    desktop: document.getElementById("winDisplayDesktop"),
    folder: document.getElementById("winDisplayFolder"),
    computer: document.getElementById("winDisplayComputer"),
    network: document.getElementById("winDisplayNetwork"),
    trash: document.getElementById("winDisplayTrash"),
  };

  const asideComponents = document.querySelector("#winXpFolerAside");

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
  return {navigateByAsideKey};
}

function initAppIcons(folderContents, navigateByAsideKey){
  const appKeyToAsideKey = {
    winXpFolder: "winXpMyfolder",
    winXpMyCom: "winXpMyComputer",
    winXpNetwork: "winXpMyNetwork",
    winXpTrash: "winXpTrash",
  };

  const externalLinks = {
    winXpGithub: "https://github.com/DoHyuk-Centric/myBlog",
    winXpKakao: "https://open.kakao.com/o/sPeTPrii",
    winXpChrome: "https://hyeeoooook.tistory.com/",
  }

  function handleDoubleClick(e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    const appKey = btn.dataset.app;

    if(externalLinks[appKey]){
      window.open(externalLinks[appKey], "_blank", "noopener,noreferrer");
      return;
    }
    
    folderContents.classList.remove("hidden");
    const asideKey = appKeyToAsideKey[appKey];
    if (asideKey) navigateByAsideKey(asideKey);
  }

  const windowDesktopRoot = document.getElementById("winXPContents");
  folderContents.addEventListener("dblclick", handleDoubleClick);
  windowDesktopRoot.addEventListener("dblclick", handleDoubleClick);

}

export function initDesktop() {
  const folderContents = document.getElementById("winXpFolderContents");

  initHeader(folderContents);
  const { navigateByAsideKey } = initAside();
  initAppIcons(folderContents, navigateByAsideKey);

  navigateByAsideKey("winXpDesktop");
}