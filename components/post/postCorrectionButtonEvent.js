postCorrectionButtonEvent();
function postCorrectionButtonEvent() {
  const correctionBtn_mobile = document.getElementById("postBtnCorrection_mobile");
  const correctionBtn_desk = document.getElementById("postBtnCorrection_desk");

  correctionBtn_mobile.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    console.log(postId);

    window.location.href = `/pages/postCorrection.html?id=${postId}`;
  });
  correctionBtn_desk.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    console.log(postId);

    window.location.href = `/pages/postCorrection.html?id=${postId}`;
  });
}
