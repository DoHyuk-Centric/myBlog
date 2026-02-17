import { supabase } from "../../src/supabase.js";
fetchProfile();
async function fetchProfile() {
  const profileImg = document.getElementById("profileImg");
  const profileNickName = document.getElementById("profileNickName");
  const profileIntroduce = document.getElementById("profileIntroduce");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("userInfo")
    .select("nickName, introduce")
    .eq("id", user.id)
    .single();
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("profile")
    .getPublicUrl(`${user.id}/profile.jpg`);

  profileImg.src = publicUrl;

  profileNickName.textContent = data.nickName;
  profileIntroduce.textContent = data.introduce;
}
