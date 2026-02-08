import { supabase } from "../../src/supabase.js";

logOutHandler();

function logOutHandler() {
  document.getElementById("logout").addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 실패", error.message);
      return;
    }

    location.reload();
  });
}
