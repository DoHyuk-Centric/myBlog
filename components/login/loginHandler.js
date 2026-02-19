// Supabase Authentication 관련 모듈 불러오기
import { supabase } from "../../src/supabase.js";

loginHandler();

function loginHandler() {
  document.getElementById("githubLogin").addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("Github 로그인 실패", error.message);
    }
  });

  document.getElementById("googleLogin").addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("Google 로그인 실패", error.message);
    }
  });
}
