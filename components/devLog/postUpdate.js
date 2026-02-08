import { supabase } from "../../src/supabase.js";

async function postUpdate() {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .order("id", { ascending: false });

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
    postli.className = "";

    const showDate = post.created_at.split("T")[0];

    const imgUrlHtml = post.imageURL
    ? `<img class="object-cover rounded-2xl border border-gray-300 dark:border-gray-700 ml-auto" width="150" height="150" src="${post.imageURL}" alt="" />` : "";

    postli.innerHTML = `
      <article class="post-card cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-md">
        <a class="flex-col" href="/pages/post.html?id=${post.id}">
          <div class="flex justify-end flex-col sm:justify-center">
            <div class="flex justify-between sm:justify-start">
              <h3 class="text-3xl font-bold mb-2">${post.title}</h3>
              <time class="text-sm text-gray-500 sm:ml-auto" datetime="${showDate}">${showDate}</time>
            </div>
            <div class="flex">
              <p class="mr-5 mb-2 line-clamp-2">${post.content}</p>
              ${imgUrlHtml}
            </div>
          </div>
        </a>
      </article>
    `;

    container.appendChild(postli);
  });
}

document.addEventListener("DOMContentLoaded", postUpdate);
