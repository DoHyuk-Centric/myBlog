import { setupMarkdownPreview } from "markdown-block-preview";

const textarea = document.getElementById("content");
const preview = document.getElementById("preview-content");

setupMarkdownPreview({
  textarea,
  preview,
});