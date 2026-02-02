import { supabase } from "../../src/supabase.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

function renderTitle(title,content,showDate,author_name) {
  const post_title = document.getElementById("post-title");
  const date = document.getElementById("post-date");
  const post_content = document.getElementById("post-content");
  const post_author = document.getElementById("post-author");

  post_title.textContent = title;
  date.textContent = showDate;
  post_content.textContent = content;
  post_author.textContent = author_name;
}

async function postLoad() {
  if (!postId) return;

  const { data, error } = await supabase
    .from("Posts")
    .select("title, content, created_at, author_name")
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  const showDate = data.created_at.split("T")[0];

  renderTitle(data.title, data.content, showDate, data.author_name);
}

postLoad();
