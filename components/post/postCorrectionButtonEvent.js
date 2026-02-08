postCorrectionButtonEvent();
function postCorrectionButtonEvent() {
  const correctionBtn = document.getElementById("postBtnCorrection");

  correctionBtn.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    console.log(postId);

    window.location.href = `/pages/postCorrection.html?id=${postId}`;
  });
}
