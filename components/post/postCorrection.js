import { supabase } from "../../src/supabase.js";
import { blockAccess } from "../../src/404.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

function renderTitle(post_title, post_content) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.textContent = post_title;
  content.textContent = post_content;
  
}

async function postLoad() {
  if (!postId) {
    blockAccess();
    return;
  }

  const { data, error } = await supabase
    .from("Posts")
    .select("title, content")
    .eq("id", postId)
    .single();

  if (error || !data) {
    blockAccess();
    return;
  }

  renderTitle(data.title, data.content);
}

postLoad();
