import { supabase } from "../../src/supabase.js";
import { checkPostOwner } from "../crud/checkPostOwner.js";

postCorrectionButtonEvent();
async function postCorrectionButtonEvent() {
  const correctionBtn_mobile = document.getElementById(
    "postBtnCorrection_mobile",
  );
  const correctionBtn_desk = document.getElementById("postBtnCorrection_desk");
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const handlecorrection = async () => {
    const isOwner = await checkPostOwner(postId);
    if(isOwner){
      window.location.href = `/pages/postCorrection.html?id=${postId}`;
    }
  };

  correctionBtn_desk.addEventListener("click", handlecorrection);
  correctionBtn_mobile.addEventListener("click", handlecorrection);
}
