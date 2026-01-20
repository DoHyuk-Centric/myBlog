import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

DevloginState();

// index.html에 있는 페이지와 연동함
function DevloginState() {
  const DevLogActionSignedIn = document.getElementById("DevLogActionSignedIn");
  const DevLogActionSignedOut = document.getElementById("DevLogActionSignedOut");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      DevLogActionSignedOut.style.display = "none";
      DevLogActionSignedIn.style.display = "block";
    } else {
      console.log("로그아웃 상태");
      DevLogActionSignedOut.style.display = "block";
      DevLogActionSignedIn.style.display = "none";
    }
  });
}
