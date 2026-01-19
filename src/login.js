// Firebase Authentication 관련 모듈 불러오기
import { auth } from "./firebase";
import {
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GithubAuthProvider();

document.getElementById("githubLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("GitHub 로그인 성공", result.user);
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인 유지", user.email);
  } else {
    console.log("로그아웃 상태");
  }
});

document.getElementById("googleLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google 로그인 성공", result.user);
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
});