devLoginCheck();

function devLoginCheck() {
  const DevLogActionSignedIn = document.getElementById("DevLogActionSignedIn");
  const DevLogActionSignedOut = document.getElementById("DevLogActionSignedOut");

  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) {
    console.log("로그아웃 상태");
    DevLogActionSignedOut.classList.remove("hidden");
    DevLogActionSignedIn.classList.add("hidden");
  } else {
    DevLogActionSignedIn.classList.remove("hidden");
    DevLogActionSignedOut.classList.add("hidden");
  }
}