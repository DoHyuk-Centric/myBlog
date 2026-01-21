function a11yMenuHandler() {
  const menuBtn = document.getElementById("menuBtn");
  const menuExitBtn = document.getElementById("menuExitBtn");
  const menuBar = document.getElementById("menuBar");

  let lastFocusElement = null;

  function isMenuOpen() {
    return !menuBar.classList.contains("-translate-x-full");
  }

  function moveFocusIntoMenu() {
    const firstFocusable = menuBar.querySelector(
      'button, a, input, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
  }

  function restoreFocus() {
    lastFocusElement?.focus();
  }

  menuBtn.addEventListener("click", () => {
    if (isMenuOpen()) {
      lastFocusElement = document.activeElement;
      menuBtn.setAttribute("aria-expanded", "true");
      menuBar.removeAttribute("inert");
      menuBar.removeAttribute("aria-hidden");
      moveFocusIntoMenu();
    } else {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBar.setAttribute("inert");
      menuBar.setAttribute("aria-hidden", "true");
      restoreFocus();
    }
  });

  menuExitBtn.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBar.setAttribute("inert");
    menuBar.setAttribute("aria-hidden", "true");
    restoreFocus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen()) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBar.setAttribute("inert");
      menuBar.setAttribute("aria-hidden", "true");
      restoreFocus();
    }
  });
}