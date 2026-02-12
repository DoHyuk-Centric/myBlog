import { supabase } from "../../src/supabase.js";

export async function profileInputData(profileInput, introduce) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("userInfo")
    .upsert(
      {
        id: user.id,
        nickName: profileInput.nickName.value,
        birth: profileInput.birth.value,
        email: profileInput.email.value,
        tel: profileInput.tellNum.value,
        introduce: introduce.value,
      },
      { onConflict: "id" },
    )
    .select();

  if (error) {
    console.log("에러 코드: ", error);
  }
}