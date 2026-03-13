devLoginCheck();

function devLoginCheck() {
  const DevLogActionSignedIn = document.getElementById("DevLogActionSignedIn");
  const DevLogActionSignedOut = document.getElementById("DevLogActionSignedOut");
  const mobileWriteButton = document.getElementById("mobileWriteButton");
  const userProfileState = {
    img: document.getElementById("profileImg"),
    nickName: document.getElementById("profileNickName"),
    introduce: document.getElementById("profileIntroduce"),
  };

  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) {
    Object.values(userProfileState).forEach((profile) => {
      profile.classList.add("hidden");
    })
    DevLogActionSignedOut.classList.remove("hidden");
    DevLogActionSignedIn.classList.add("hidden");
    mobileWriteButton.classList.add("hidden");
  } else {
    Object.values(userProfileState).forEach((profile) => {
      profile.classList.remove("hidden");
    })
    DevLogActionSignedIn.classList.remove("hidden");
    mobileWriteButton.classList.remove("hidden");
    DevLogActionSignedOut.classList.add("hidden");
  }
}