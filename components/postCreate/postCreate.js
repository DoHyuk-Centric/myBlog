import { supabase } from "../../src/supabase.js";

function postCreate() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const createPostTable = document.getElementById("createPostTable");
  const temp_createPost = document.getElementById("temp_createPost");

  createPostTable.addEventListener("click", async () => {
    const Success = await postTableUpdate(title.value, content.value, 0);

    if (Success) {
      window.location.href = "/pages/devlog.html";
    } else {
      alert("게시글 저장에 실패했습니다.");
    }
  });
  temp_createPost.addEventListener("click", async() => {
    const temp = await postTableUpdate(title.value, content.value, 1);

    if(temp){
      window.location.href = "/pages/devlog.html";
    }
    else{
      alert("오류");
    }
  })
}

export async function postTableUpdate(title, content, state) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if(sessionError || !session){
    console.error("로그인 상태 아님", sessionError);
    return false;
  }

  const { error } = await supabase.from("Posts").insert([
    {
      title: title,
      content: content,
      user_id : session.user.id,
      status : state,
    },
  ]);

  if (error) {
    console.log("게시글 저장 실패", error);
    return false;
  }
  return true;
}

postCreate();

