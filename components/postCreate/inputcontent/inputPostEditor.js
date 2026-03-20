import { imgInput } from "./imginput.js";

export const imageMap = new Map();

function inputPostEditor() {
  const content = document.getElementById("content");

  const h1InputBtn = document.getElementById("h1InputBtn");
  const h2InputBtn = document.getElementById("h2InputBtn");
  const h3InputBtn = document.getElementById("h3InputBtn");
  const h4InputBtn = document.getElementById("h4InputBtn");
  const boldInputBtn = document.getElementById("boldInputBtn");
  const emInputBtn = document.getElementById("emInputBtn");
  const stInputBtn = document.getElementById("stInputBtn");
  const quoInputBtn = document.getElementById("quoInputBtn");
  const linkInputBtn = document.getElementById("linkInputBtn");
  const imgInputBtn = document.getElementById("imgInputBtn");
  const codeInputBtn = document.getElementById("codeInputBtn");

  const imgWrapper = document.getElementById("imgWrapper");
  const imgAdd = document.getElementById("imgAdd");

  h1InputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    const lineEnd = text.indexOf("\n", start);
    const realLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const lineText = text.slice(lineStart, realLineEnd);

    const cleanedLine = lineText.replace(/^#{1,4}\s*/, "");

    content.value =
      text.slice(0, lineStart) + "# " + cleanedLine + text.slice(realLineEnd);

    const diff = lineText.length - cleanedLine.length;
    content.selectionStart = start - diff + 2;
    content.selectionEnd = end - diff + 2;
    content.focus();
  });

  h2InputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    const lineEnd = text.indexOf("\n", start);
    const realLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const lineText = text.slice(lineStart, realLineEnd);

    const cleanedLine = lineText.replace(/^#{1,4}\s*/, "");

    content.value =
      text.slice(0, lineStart) + "## " + cleanedLine + text.slice(realLineEnd);

    const diff = lineText.length - cleanedLine.length;
    content.selectionStart = start - diff + 3;
    content.selectionEnd = end - diff + 3;
    content.focus();
  });
  h3InputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    const lineEnd = text.indexOf("\n", start);
    const realLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const lineText = text.slice(lineStart, realLineEnd);

    const cleanedLine = lineText.replace(/^#{1,4}\s*/, "");

    content.value =
      text.slice(0, lineStart) + "### " + cleanedLine + text.slice(realLineEnd);

    const diff = lineText.length - cleanedLine.length;
    content.selectionStart = start + 5;
    content.selectionEnd = end + 5;
    content.focus();
  });
  h4InputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    const lineEnd = text.indexOf("\n", start);
    const realLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const lineText = text.slice(lineStart, realLineEnd);

    const cleanedLine = lineText.replace(/^#{1,4}\s*/, "");

    content.value =
      text.slice(0, lineStart) +
      "#### " +
      cleanedLine +
      text.slice(realLineEnd);

    const diff = lineText.length - cleanedLine.length;
    content.selectionStart = start + 6;
    content.selectionEnd = end + 6;
    content.focus();
  });

  boldInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      content.value = text.slice(0, start) + "****" + text.slice(end);
      content.selectionStart = content.selectionEnd = start + 2;
    } else {
      content.value =
        text.slice(0, start) +
        "**" +
        text.slice(start, end) +
        "**" +
        text.slice(end);
      content.selectionStart = start + 2;
      content.selectionEnd = end + 2;
    }
    content.focus();
  });

  emInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      content.value = text.slice(0, start) + "**" + text.slice(end);
      content.selectionStart = content.selectionEnd = start + 1;
    } else {
      content.value =
        text.slice(0, start) +
        "*" +
        text.slice(start, end) +
        "*" +
        text.slice(end);
      content.selectionStart = start + 1;
      content.selectionEnd = end + 1;
    }
    content.focus();
  });

  stInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      content.value = text.slice(0, start) + "~~~~" + text.slice(end);
      content.selectionStart = content.selectionEnd = start + 2;
    } else {
      content.value =
        text.slice(0, start) +
        "~~" +
        text.slice(start, end) +
        "~~" +
        text.slice(end);
      content.selectionStart = start + 2;
      content.selectionEnd = end + 2;
    }
    content.focus();
  });

  quoInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    content.value = text.slice(0, lineStart) + "> " + text.slice(lineStart);

    const cursorPos = start + 2;
    content.selectionStart = content.selectionEnd = cursorPos;

    content.focus();
  });

  imgInputBtn.addEventListener("click", async (e) => {
    e.stopPropagation();



    imgWrapper.classList.remove("hidden");

    try {
      const start = content.selectionStart;
      const end = content.selectionEnd;
      const text = content.value;

      const { file, previewUrl } = await imgInput();
      imageMap.set(previewUrl, file);
      imgWrapper.classList.add("hidden");
      const innerText = `![이미지 이름](${previewUrl})`;


      content.value = text.slice(0, start) + "\n" + innerText + text.slice(end);

      const cursorPos = end + innerText.length + 1;
      content.selectionStart = content.selectionEnd = cursorPos;

      content.focus();
    } catch (err) {
      console.log(err);
      imgWrapper.classList.add("hidden");
    }

  });
  imgAdd.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.addEventListener("click", () => {
    imgWrapper.classList.add("hidden");
  })

  codeInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;

      content.value =
        text.slice(0, lineStart) +
        "\n" +
        "```" +
        "\n" +
        text.slice(lineStart) +
        "\n" +
        "```";

      const cursorPos = start + 5;
      content.selectionStart = content.selectionEnd = cursorPos;
    } else {
      content.value =
        text.slice(0, start) +
        "\n" +
        "```" +
        "\n" +
        text.slice(start, end) +
        "\n" +
        "```" +
        text.slice(end);
      content.selectionStart = start + 5;
      content.selectionEnd = end + 5;
    }

    content.focus();
  });

  linkInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      const linkTemplate = "[링크 텍스트](url)";
      content.value = text.slice(0, start) + linkTemplate + text.slice(end);
      content.selectionStart = start + 1;
      content.selectionEnd = start + 7;
    } else {
      const selectedText = text.slice(start, end);
      const linkTemplate = `[${selectedText}](url)`;
      content.value = text.slice(0, start) + linkTemplate + text.slice(end);
      content.selectionStart = start + selectedText.length + 3;
      content.selectionEnd = start + selectedText.length + 6;
    }

    content.focus();
  });
}
inputPostEditor();
