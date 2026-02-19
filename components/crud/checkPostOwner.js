import { supabase } from "../../src/supabase.js";

export async function checkPostOwner(postId) {
  if (!postId) {
    return false;
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return false;
  }

  const { data: postData, error: postError } = await supabase
    .from("Posts")
    .select("user_id")
    .eq("id", postId);
  if (postError || !postData || postData.length === 0) {
    return false;
  }

  const currentUserId = authData.user.id;
  const postOwnerId = postData[0].user_id;

  return currentUserId === postOwnerId;
}
