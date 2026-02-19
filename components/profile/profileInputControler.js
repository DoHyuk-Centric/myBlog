import { supabase } from "../../src/supabase.js";
import { profileInputData } from "./profileInputData.js";

profileInputControler();

async function profileInputControler() {
  await profileInput();
}

async function profileInput() {
  const userID = document.getElementById("user-id");
  const userEmail = await profileUserId();

  if (userID) userID.textContent = userEmail;

  const profileInput = {
    nickName: document.getElementById("profileNickName"),
    birth: document.getElementById("profileBirth"),
    email: document.getElementById("profileEmail"),
    tellNum: document.getElementById("profileTellNum"),
    introduce: document.getElementById("profileIntroduce"),
  };

  const correctionBtn = document.getElementById("profileCorrection");

  profileInputEvent(profileInput, correctionBtn);
}

async function profileUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if(!user){
    window.location.href = "/pages/404.html";
    return null;
  }
  return user?.email;
}

function profileInputEvent(profileInput, correctionBtn) {
  userProfileInfoRender(profileInput);
  let correctionIs = false;

  if (correctionBtn) {
    correctionBtn.addEventListener("click", () => {
      if (!correctionIs) {
        Object.values(profileInput).forEach((input) => {
          if (input) input.disabled = false;
        });
        correctionIs = true;
        correctionBtn.textContent = "완료";
      } else {
        Object.values(profileInput).forEach((input) => {
          if (input) input.disabled = true;
        });
        profileInputData(profileInput);
        correctionIs = false;
        correctionBtn.textContent = "정보 수정";
      }
    });
  }
}

async function userProfileInfoRender(profileInput) {
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("userInfo")
    .select("nickName, birth, email, tel, introduce")
    .eq("id", userData.user.id)
    .single();

  profileInput.nickName.value = data.nickName;
  profileInput.birth.value = data.birth;
  profileInput.email.value = data.email;
  profileInput.tellNum.value = data.tel;
  profileInput.introduce.value = data.introduce;
}
