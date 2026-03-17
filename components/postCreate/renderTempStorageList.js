import { supabase } from "../../src/supabase.js";

loadTempPost();

async function loadTempPost() {
  const list = document.getElementById("tempPostList");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("유저 정보 없음");
    return;
  }

  const { data, error } = await supabase
    .from("Posts")
    .select("id, title, content, created_at")
    .eq("user_id", user.id)
    .eq("status", 1)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("임시글 조회 실패", error);
    return;
  }

  list.innerHTML = "";

  data.forEach((post) => {
    const li = document.createElement("li");
    li.className =
      "relative w-[min(92vw,700px)] list-none rounded-2xl border border-gray-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900";

    const link = document.createElement("a");
    link.href = `../pages/postCorrection.html?id=${post.id}`;
    link.className = "block p-5 lg:p-6 no-underline text-inherit";

    const title = document.createElement("h3");
    title.className =
      "text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-3";
    title.textContent = post.title || "제목 없음";

    const content = document.createElement("p");
    content.className =
      "text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4";
    content.textContent = post.content
      ? post.content.slice(0, 120) + "..."
      : "내용 없음";

    const date = document.createElement("span");
    date.className =
      "text-xs lg:text-sm text-gray-400 dark:text-gray-500";
    date.textContent = new Date(post.created_at).toLocaleString();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className =
      "absolute bottom-4 right-4 text-xs px-3 py-1 rounded-lg text-black dark:text-white transition";

    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const confirmDelete = confirm("정말 삭제하시겠습니까?");
      if (!confirmDelete) return;

      const { error } = await supabase
        .from("Posts")
        .update({ status: 2 })
        .eq("id", post.id);

      if (error) {
        alert("삭제 실패");
        console.error(error);
        return;
      }

      li.remove();
    });

    link.appendChild(title);
    link.appendChild(content);
    link.appendChild(date);

    li.appendChild(link);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}