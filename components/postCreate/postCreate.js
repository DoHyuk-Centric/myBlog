import { supabase } from "../../src/supabase.js";
import { currentUser } from "../login/firebase.js";

function postCreate() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const createPostTable = document.getElementById("createPostTable");
  const temp_createPost = document.getElementById("temp_createPost");

  createPostTable.addEventListener("click", async () => {
    const Success = await creatPostTable(title.value, content.value);

    if (Success) {
        window.location.href = "/pages/devlog.html";
    }
    else{
        alert("게시글 저장에 실패했습니다.");
    }
  });
}

export async function creatPostTable(title, content) {
  const { data, error } = await supabase.from("Posts").insert([
    {
      title: title,
      content: content,
      author_uid: currentUser.uid,
      author_name: currentUser.displayName,
    },
  ]);

  if (error) {
    console.log("게시글 저장 실패", err);
    return false;
  }
  return true;
}

postCreate();
