import { supabase } from "../../src/supabase.js";

loginState();

function loginState() {
  supabase.auth.onAuthStateChange((event, session) => {
    if(session?.user){
      localStorage.setItem("isLogin", "true");
    }
    else{
      localStorage.setItem("isLogin", "false");
    }
  });
}

/*
Supabase에서의 event와 session

event
"SIGNED_IN"
"SIGNED_OUT"
"TOKEN_REFRESHED"
"USER_UPDATED"
"INITIAL_SESSION"


session
access_token: string,   // JWT (RLS가 보는 것)
refresh_token: string,  // 만료 시 재발급용
expires_at: number,     // 만료 시각 (unix)
token_type: "bearer",
user: {
  id: string,           // auth.uid()
  email: string,
  user_metadata: {...},
  app_metadata: {...},
}
*/