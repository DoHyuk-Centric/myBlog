previewWrap();

function previewWrap() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const previewTitle = document.getElementById("preview-title");

  titleInput.addEventListener("input", () => {
    titleInput.style.height = "auto";
    titleInput.style.height = titleInput.scrollHeight + "px";
    previewTitle.textContent = titleInput.value;
  });

  contentInput.addEventListener("input", () => {
    contentInput.style.height = "auto";
    contentInput.style.height = contentInput.scrollHeight + "px";
  });
}