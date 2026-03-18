import { supabase } from "../../src/supabase.js";
import { handlerTempStorage } from "./loadTempStorage.js";
import { replacePreviewImagesToUploadedUrls } from "./inputcontent/replacePreviewImagesToUploadedUrls.js";

function postCreate() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const createPostTable = document.getElementById("createPostTable");
  const tempCreatePost = document.getElementById("temp_createPost");

  createPostTable.addEventListener("click", async () => {
    const success = await savePost(title.value, content.value, 0);

    if (success) {
      window.location.href = "/pages/devlog.html";
    } else {
      alert("게시글 저장에 실패했습니다.");
    }
  });

  tempCreatePost.addEventListener("click", async () => {
    const success = await savePost(title.value, content.value, 1);

    if (success) {
      showToast("임시저장 되었습니다!");
      handlerTempStorage();
    } else {
      alert("오류");
    }
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 2000);
}

async function savePost(title, rawContent, state) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("로그인 상태 아님", sessionError);
    return false;
  }

  if (title.trim() === "" || rawContent.trim() === "") {
    showToast("내용이 없습니다!");
    return false;
  }

  let finalContent = rawContent;

  try {
    // 발행 저장일 때만 실제 업로드 + URL 치환
    if (state === 0) {
      finalContent = await replacePreviewImagesToUploadedUrls(rawContent);
    }
  } catch (error) {
    console.error("이미지 업로드/치환 실패", error);
    showToast("이미지 처리 중 오류가 발생했습니다.");
    return false;
  }

  const params = new URLSearchParams(location.search);
  const postId = params.get("id");

  if (postId) {
    const { error: updateError } = await supabase
      .from("Posts")
      .update({
        title,
        content: finalContent,
        status: state,
      })
      .eq("id", postId)
      .eq("user_id", session.user.id);

    if (updateError) {
      console.error("게시글 수정 실패", updateError);
      return false;
    }

    return true;
  }

  const { data, error: insertError } = await supabase
    .from("Posts")
    .insert([
      {
        title,
        content: finalContent,
        user_id: session.user.id,
        status: state,
      },
    ])
    .select("id")
    .single();

  if (insertError) {
    console.error("게시글 생성 실패", insertError);
    return false;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("id", data.id);
  history.replaceState({}, "", url);

  return true;
}

postCreate();