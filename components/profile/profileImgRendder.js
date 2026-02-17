import { supabase } from "../../src/supabase";

profileImgRendder();

async function profileImgRendder() {
  const profileImg = document.getElementById("profile-img");
  const profileImage = document.getElementById("profile-image");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { publicUrl },
  } = supabase.storage.from("profile").getPublicUrl(`${user.id}/profile.jpg`);
  profileImage.src = publicUrl;

  profileImg.addEventListener("change", async () => {
    const file = profileImg.files[0];
    if (!file) {
      console.error("파일이 없습니다.");
      return;
    }
    const { data, error } = await supabase.storage
      .from("profile")
      .upload(`${user.id}/profile.jpg`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("이미지파일 업로드 실패", error);
    }
  });
}
