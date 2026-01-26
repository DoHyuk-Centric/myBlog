import { marked } from "marked";

marked.setOptions({
  breaks: true,   // 엔터 = <br> 처리
});

const textarea = document.getElementById("content");
const preview = document.getElementById("preview-content");

textarea.addEventListener("input", () => {
  const markdown = textarea.value;
  preview.innerHTML = marked.parse(textarea.value);
});
