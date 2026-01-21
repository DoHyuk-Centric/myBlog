function menuHandler() {
  const menuBtn = document.getElementById("menuBtn");
  const menuExitBtn = document.getElementById("menuExitBtn");
  const menuBar = document.getElementById("menuBar");

  let lastFocusElement = null;

  // 메뉴가 열려있는지 판단
  function isMenuOpen() {
    return menuBar.classList.contains("-translate-x-full");
  }

  // 메뉴가 열릴때, 메뉴 내부의 첫 번째 포커스 가능 요소로 포커스 이동
  function moveFocusIntoMenu() {
    const firstFocusable = menuBar.querySelector(
      'button, a, input, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
  }

  // 메뉴가 닫힐 때, 이전에 포커스가 있던 요소로 포커스 복원
  function restoreFocus() {
    lastFocusElement?.focus();
  }

  // 메뉴 여는 동작
  function openMenu() {
    lastFocusElement = document.activeElement;
    menuBar.classList.remove("-translate-x-full");
    menuBar.removeAttribute("inert");
    menuBar.removeAttribute("aria-hidden");

    menuBtn.setAttribute("aria-expanded", "true");

    moveFocusIntoMenu();
  }

  // 메뉴 닫는 동작
  function closeMenu() {
    menuBar.classList.add("-translate-x-full");
    menuBar.setAttribute("inert", "");
    menuBar.setAttribute("aria-hidden", "true");

    menuBtn.setAttribute("aria-expanded", "false");

    restoreFocus();
  }

  isMenuOpen();

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMenuOpen()) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menuExitBtn.addEventListener("click", () => {
    closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (
      !menuBar.classList.contains("-translate-x-full") &&
      !menuBar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && !isMenuOpen()){
        closeMenu();
    }
  })
}

menuHandler();
