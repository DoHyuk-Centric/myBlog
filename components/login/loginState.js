import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

loginState();
login();

// index.html에 있는 페이지와 연동함
function loginState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("isLogin", "true");
    } else {
      localStorage.setItem("isLogin", "false");
    }
  });
}

function login() {
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const userBtn = document.getElementById("user");
  const signupBtn = document.getElementById("signup");

  const isLogin = localStorage.getItem("isLogin") === "true";

  if (isLogin) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userBtn.style.display = "none";
  }
}
