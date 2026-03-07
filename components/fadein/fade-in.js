// fade-in.js
const overlay = document.getElementById("fadeOverlay");
if (overlay) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1000);
    });
  });
}