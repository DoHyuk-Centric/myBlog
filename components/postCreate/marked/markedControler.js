import { marked } from "marked";

marked.setOptions({
  breaks: true,
});

function debounce(callback, delay = 200) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}

const textarea = document.getElementById("content");
const preview = document.getElementById("preview-content");

const renderPreview = debounce(() => {
  preview.innerHTML = marked.parse(textarea.value);
}, 300);

textarea.addEventListener("input", renderPreview);

preview.innerHTML = marked.parse(textarea.value);