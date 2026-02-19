import { supabase } from "../../src/supabase.js";
import { checkPostOwner } from "../crud/checkPostOwner.js";

deleteControler();

async function deleteControler() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  const postDeleteBtn_mobile = document.getElementById("postBtnDelete_mobile");
  const postDeleteBtn_desk = document.getElementById("postBtnDelete_desk");

  const handleDelete = async () => {
    const isOwner = await checkPostOwner(postId);
    if (!isOwner) return;

    await postDelete(postId);
  };

  postDeleteBtn_mobile.addEventListener("click", handleDelete);
  postDeleteBtn_desk.addEventListener("click", handleDelete);
}

async function postDelete(postId) {
  const { error: deleteError } = await supabase
    .from("Posts")
    .delete()
    .eq("id", postId);

  if (deleteError) {
    console.error("삭제 실패 :", deleteError);
    return;
  }

  window.location.href = "/pages/devlog.html";
}
