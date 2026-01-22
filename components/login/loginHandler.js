// Firebase Authentication 관련 모듈 불러오기
import { auth } from "./firebase";
import {
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

loginHandler();

function loginHandler() {
  const provider = new GithubAuthProvider();

  document.getElementById("githubLogin").addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("GitHub 로그인 성공", result.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  });

  document.getElementById("googleLogin").addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google 로그인 성공", result.user);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  });
}
