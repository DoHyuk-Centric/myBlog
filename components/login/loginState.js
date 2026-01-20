import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

loginState();

function loginState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("isLogin", "true");
    } else {
      localStorage.setItem("isLogin", "false");
    }
  });
}
