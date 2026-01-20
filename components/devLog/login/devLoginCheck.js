devLoginCheck();

function devLoginCheck() {
  const DevLogActionSignedIn = document.getElementById("DevLogActionSignedIn");
  const DevLogActionSignedOut = document.getElementById("DevLogActionSignedOut");

  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) {
    DevLogActionSignedOut.classList.remove("hidden");
    DevLogActionSignedIn.classList.add("hidden");
  } else {
    console.log("로그아웃 상태");
    DevLogActionSignedIn.classList.remove("hidden");
    DevLogActionSignedOut.classList.add("hidden");
  }
}