import { supabase } from "../../src/supabase.js";
import { getUid } from "../post/firebaseUid.js";

function postCreate() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const UpdatePostTable = document.getElementById("updatePostTable");

  UpdatePostTable.addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    if (!postId) {
      alert("수정할 글을 찾을 수 없습니다.");
      return;
    }

    const Success = await creatPostTable(postId, title.value, content.value);
    console.log("Update success?", Success);

    if (Success) {
      //   window.location.href = `/pages/post.html?id=${postId}`;
    } else {
      alert("게시글 저장에 실패했습니다.");
    }
  });
}

export async function creatPostTable(postId, title, content) {
  const uid = getUid();
  if (!uid) {
    alert("사용자 정보가 아직 로드되지 않았습니다.");
    return false;
  }
  
  const { data, error } = await supabase
    .from("Posts")
    .update({ title, content })
    .eq("id", postId)
    .eq("author_uid", uid);

  if (error) {
    console.log("게시글 저장 실패", error);
    return false;
  }

  return true;
}

postCreate();
