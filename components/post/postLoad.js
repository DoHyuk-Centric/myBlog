import { supabase } from "../../src/supabase.js";
import { blockAccess } from "../../src/404.js";
import { marked } from "marked";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

function renderTitle(title, showDate, authorName) {
  const post_title = document.getElementById("post-title");
  const date = document.getElementById("post-date");
  const post_author = document.getElementById("post-author");

  post_title.textContent = title;
  date.textContent = showDate;
  post_author.textContent = authorName;
}

async function postLoad() {
  if (!postId) {
    blockAccess();
    return;
  }

  const { data, error } = await supabase
    .from("Posts")
    .select("title, content, created_at, profiles(display_name)")
    .eq("id", postId)
    .single();
    
  if (error) {
    console.error("게시글 로드 에러:", error);
    blockAccess();
    return;
  }

  const showDate = data.created_at.split("T")[0];

  postAsideInner(data.content);
  renderTitle(data.title, showDate, data.profiles?.display_name || "익명");
}

postLoad();

function postAsideInner(content) {
  const postAsideRight = document.getElementById("postAsideRight");
  const postContent = document.getElementById("post-content");

  // markdown → HTML
  const html = marked.parse(content);
  postContent.innerHTML = html; // 먼저 본문 렌더링

  // DOMParser로 파싱
  const headings = postContent.querySelectorAll("h1, h2, h3, h4, h5, h6"); // 이미 DOM에 있음

  postAsideRight.innerHTML = "";

  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent;

    const a = document.createElement("a");
    a.textContent = text;
    a.classList.add(
      "line-clamp-1",
      "cursor-pointer",
      "duration-300",
      "hover:dark:text-gray-400",
    );

    a.addEventListener("click", (e) => {
      e.preventDefault();
      const headerOffset = 120;
      const elementPosition = heading.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });

    postAsideRight.appendChild(a);
  });
}
