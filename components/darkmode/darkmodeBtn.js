document.addEventListener("DOMContentLoaded", () => {
  const darkmodeBtn = document.getElementById("darkmode_btn");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    darkmodeBtn.setAttribute("aria-pressed", "true");
  }
  else{
    darkmodeBtn.setAttribute("aria-pressed", "false");
  }

  darkmodeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
