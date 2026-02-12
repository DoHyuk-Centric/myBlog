import { supabase } from "../../src/supabase.js";
import { profileInputData } from "./profileInputData.js";

profileInputControler();

async function profileInputControler() {
    await profileInput();

}

async function profileInput() {
  const userID = document.getElementById("user-id");
  const userEmail = await profileUserId();
  if (userID) userID.textContent = userEmail || "로그인 필요";

  const profileInput = {
    nickName: document.getElementById("profileNickName"),
    birth: document.getElementById("profileBirth"),
    email: document.getElementById("profileEmail"),
    tellNum: document.getElementById("profileTellNum"),
  };
  const introduce = document.getElementById("profileIntroduce");
  const introduceBtn = document.getElementById("profileIntroduce_btn");
  const correctionBtn = document.getElementById("profileCorrection");

  introduceEvent(introduce, introduceBtn);
  profileInputEvent(profileInput, correctionBtn, introduce);
}

async function profileUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email;
}

function introduceEvent(introduce, introduceBtn) {
  introduceBtn.addEventListener("click", () => {
    if (introduce.disabled) introduce.disabled = false;
    else introduce.disabled = true;
  });
}

function profileInputEvent(profileInput, correctionBtn, introduce) {
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
        profileInputData(profileInput, introduce);
        correctionIs = false;
        correctionBtn.textContent = "정보 수정";
      }
    });
  }
}
