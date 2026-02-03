import { marked } from "marked";

postMarkDown();

function postMarkDown() {
  const content = document.getElementById("post-content");

  const markdown = content.textContent; // 또는 innerText
  content.innerHTML = marked.parse(markdown);
}