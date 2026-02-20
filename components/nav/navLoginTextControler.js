// 네비게이션 로그인, 로그아웃 버튼 텍스트 컨트롤러
import { supabase } from "../../src/supabase.js";

navLoginTextControler();

async function navLoginTextControler() {
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const userBtn = document.getElementById("user");

  const {data} = await supabase.auth.getSession();
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (isLogin) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    userBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userBtn.style.display = "none";
  }
}