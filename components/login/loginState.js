import { supabase } from "../../src/supabase.js";

export async function initAuth() {
  const { data , error } = await supabase.auth.getSession();

  if(error){
    console.error("Auth 초기화 실패:", error.message);
  }

  return data.session;
}