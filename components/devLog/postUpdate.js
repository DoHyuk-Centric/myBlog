import { supabase } from "../../src/supabase.js";
import { updatePostList } from "./updatePostList.js";

const POSTS_PER_PAGE = 10;

async function postUpdate(page = 0) {
  const from = page * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from("Posts")
    .select("*", { count: "exact" })
    .eq("status", 0)
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("에러:", error);
    return;
  }

  const container = document.getElementById("posts-container");
  if (!container) return;

  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>게시글이 없습니다.</p>";
    return;
  }

  data.forEach(post => {
    const postli = document.createElement("li");
    const showDate = post.created_at.split("T")[0];

    const article = document.createElement("article");
    article.className = "post-card cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border rounded-lg p-2 mb-2 sm:p-4 sm:mb-4 bg-white dark:bg-gray-800 shadow-md";

    const a = document.createElement("a");
    a.className = "flex-col";
    a.href = `/pages/post.html?id=${post.id}`;

    const outerDiv = document.createElement("div");
    outerDiv.className = "flex justify-end flex-col sm:justify-center";

    const topDiv = document.createElement("div");
    topDiv.className = "flex justify-between sm:justify-start";

    const h3 = document.createElement("h3");
    h3.className = "text-sm sm:text-xl lg:text-3xl font-bold mb-0.5 sm:mb-2 line-clamp-1";
    h3.textContent = post.title;

    const time = document.createElement("time");
    time.className = "text-[10px] lg:text-sm text-gray-500 sm:ml-auto text-nowrap";
    time.setAttribute("datetime", showDate);
    time.textContent = showDate;

    const bottomDiv = document.createElement("div");
    bottomDiv.className = "flex";

    const p = document.createElement("p");
    p.className = "mr-0.5 mb-0.5 sm:mr-1 lg:mr-5 lg:mb-2 text-xs sm:text-sm lg:text-base line-clamp-2";
    p.textContent = post.content;

    topDiv.appendChild(h3);
    topDiv.appendChild(time);
    bottomDiv.appendChild(p);
    outerDiv.appendChild(topDiv);
    outerDiv.appendChild(bottomDiv);
    a.appendChild(outerDiv);
    article.appendChild(a);
    postli.appendChild(article);
    container.appendChild(postli);
  });

  updatePostList(count, POSTS_PER_PAGE, page, (selectedPage) => {
    postUpdate(selectedPage);
  });
}

document.addEventListener("DOMContentLoaded", () => postUpdate(0));