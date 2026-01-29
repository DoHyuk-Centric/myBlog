import {imgInput} from "./imginput.js";

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

    // 현재 줄 시작 인덱스
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;

    // 현재 줄 끝 인덱스
    const lineEnd = text.indexOf("\n", start);
    const realLineEnd = lineEnd === -1 ? text.length : lineEnd;

    // 현재 줄 텍스트
    const lineText = text.slice(lineStart, realLineEnd);

    // 줄 맨 앞의 #, ##, ###, #### (+ 공백) 제거
    const cleanedLine = lineText.replace(/^#{1,4}\s*/, "");

    // 전체 텍스트 재구성 (무조건 # 삽입)
    content.value =
      text.slice(0, lineStart) + "# " + cleanedLine + text.slice(realLineEnd);

    // 커서 위치 보정
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

    // 현재 커서 위치가 속한 줄의 시작 위치 찾기
    const lineStart = text.lastIndexOf("\n", start - 1) + 1; // 없으면 -1 + 1 = 0

    // 줄의 맨 앞에 '> ' 삽입
    content.value = text.slice(0, lineStart) + "> " + text.slice(lineStart);

    // 커서를 삽입한 '> ' 뒤로 이동
    const cursorPos = start + 2; // '> ' 길이 2
    content.selectionStart = content.selectionEnd = cursorPos;

    content.focus();
  });

  // img 버튼 눌렀을경우 동작 구역
  imgInputBtn.addEventListener("click", async(e) => {
    e.stopPropagation();

    
    
    imgWrapper.classList.remove("hidden");
    
    try{
      const start = content.selectionStart;
      const end = content.selectionEnd;
      const text = content.value;

      const imgUrl = await imgInput();
      imgWrapper.classList.add("hidden");
      const innerText = `![이미지 이름](${imgUrl})`;
  
      
      content.value = text.slice(0, start) + "\n" + innerText + text.slice(end);
      
      const cursorPos = end + innerText.length + 1;
      content.selectionStart = content.selectionEnd = cursorPos;
      
      content.focus();
    }catch(err){
      console.log(err);
    }
    
  });
  imgAdd.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.addEventListener("click", () => {
    imgWrapper.classList.add("hidden");
  })

  // 코드 버튼 눌렀을때 동작 구역
  codeInputBtn.addEventListener("click", () => {
    const start = content.selectionStart;
    const end = content.selectionEnd;
    const text = content.value;

    if (start === end) {
      // 현재 커서 위치가 속한 줄의 시작 위치 찾기
      const lineStart = text.lastIndexOf("\n", start - 1) + 1; // 없으면 -1 + 1 = 0

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
}
inputPostEditor();
