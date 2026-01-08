document.addEventListener("DOMContentLoaded", () => {
  const sun_Dark = document.getElementById("sun_dark");
  const sun_Light = document.getElementById("sun_light");
  const moon_Dark = document.getElementById("moon_dark");
  const moon_Light = document.getElementById("moon_light");
  const darkmodeBtn = document.getElementById("darkmode_btn");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");

    // dark 모드 아이콘 위치 적용
    sun_Dark.style.transform = "translate(0, 0)";
    sun_Dark.style.width = "32px";
    sun_Dark.style.height = "32px";

    sun_Light.style.transform = "translate(-40px, -16px)";
    sun_Light.style.width = "32px";
    sun_Light.style.height = "32px";

    moon_Dark.style.transform = "translate(0, 0)";
    moon_Dark.style.width = "16px";
    moon_Dark.style.height = "16px";

    moon_Light.style.transform = "translate(33px, 8px)";
    moon_Light.style.width = "16px";
    moon_Light.style.height = "16px";

    moon_Dark.style.opacity = "1";
    sun_Dark.style.opacity = "1";
    sun_Light.style.opacity = "0";
    moon_Light.style.opacity = "0";
  } else {
    document.documentElement.classList.remove("dark");

    sun_Dark.style.transform = "translate(33px, 8px)";
    sun_Dark.style.width = "16px";
    sun_Dark.style.height = "16px";

    sun_Light.style.transform = "translate(0, 0)";
    sun_Light.style.width = "16px";
    sun_Light.style.height = "16px";

    moon_Dark.style.transform = "translate(-40px, -16px)";
    moon_Dark.style.width = "32px";
    moon_Dark.style.height = "32px";

    moon_Light.style.transform = "translate(0, 0)";
    moon_Light.style.width = "32px";
    moon_Light.style.height = "32px";

    sun_Dark.style.opacity = "0";
    moon_Dark.style.opacity = "0";
    sun_Light.style.opacity = "1";
    moon_Light.style.opacity = "1";
  }

  darkmodeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.add("dark");

      sun_Dark.style.transform = "translate(0, 0)";
      sun_Dark.style.width = "32px";
      sun_Dark.style.height = "32px";

      sun_Light.style.transform = "translate(-40px, -16px)";
      sun_Light.style.width = "32px";
      sun_Light.style.height = "32px";

      moon_Light.style.transform = "translate(33px, 8px)";
      moon_Light.style.width = "16px";
      moon_Light.style.height = "16px";

      moon_Dark.style.transform = "translate(0, 0)";
      moon_Dark.style.width = "16px";
      moon_Dark.style.height = "16px";

      sun_Dark.style.opacity = "1";
      moon_Dark.style.opacity = "1";
      sun_Light.style.opacity = "0";
      moon_Light.style.opacity = "0";
    } else {
      document.documentElement.classList.remove("dark");

      sun_Dark.style.transform = "translate(33px, 8px)";
      sun_Dark.style.width = "16px";
      sun_Dark.style.height = "16px";

      sun_Light.style.transform = "translate(0, 0)";
      sun_Light.style.width = "16px";
      sun_Light.style.height = "16px";

      moon_Dark.style.transform = "translate(-40px, -16px)";
      moon_Dark.style.width = "32px";
      moon_Dark.style.height = "32px";

      moon_Light.style.transform = "translate(0, 0)";
      moon_Light.style.width = "32px";
      moon_Light.style.height = "32px";

      sun_Dark.style.opacity = "0";
      moon_Dark.style.opacity = "0";
      sun_Light.style.opacity = "1";
      moon_Light.style.opacity = "1";
    }
  });
});
