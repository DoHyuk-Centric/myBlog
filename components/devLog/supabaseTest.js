import { supabase } from "../../src/supabase.js";

async function testFetch() {
  const { data, error } = await supabase
    .from("Posts")
    .select("*");

  if (error) {
    console.error("에러:", error);
  } else {
    console.log("데이터:", data);
  }
}

testFetch();
