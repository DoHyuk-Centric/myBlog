import { supabase } from "../../../src/supabase.js";

export function imgInput() {
  return new Promise((resolve, reject) => {
    const imageInput = document.getElementById("imageInput");
    if (!imageInput) return reject("input 없음");

    imageInput.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return reject("파일 선택 안함");

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return reject("이미지 아님");
      }

      const ext = file.name.split(".").pop();
      const filePath = `posts/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("Post")
        .upload(filePath, file, { cacheControl: "31536000", upsert: false });

      if (error) {
        return error;
      }
      
      const {data} = supabase.storage.from("Post").getPublicUrl(filePath);

      resolve(data.publicUrl);
    };
  });
}
