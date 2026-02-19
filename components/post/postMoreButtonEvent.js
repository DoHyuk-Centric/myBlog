import { checkPostOwner } from "../crud/checkPostOwner.js";

postMoreButtonEvent();

function postMoreButtonEvent() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const moreBtn = document.getElementById("postMoreBtn");
  const moreBtnEvent = document.getElementById("postMoreBtnEvent");
  const postBtnCorrection_desk = document.getElementById(
    "postBtnCorrection_desk",
  );
  const postBtnDelete_desk = document.getElementById("postBtnDelete_desk");

  async function hiddenButton(postId) {
    const isOwner = await checkPostOwner(postId);
    if (!isOwner) {
      if (window.innerWidth > MOBILE_MAX_WIDTH) {
        moreBtn.style.display = "none";
      }
      postBtnCorrection_desk.style.display = "none";
      postBtnDelete_desk.style.display = "none";
    }
  }

  let isOpen = false;
  const MOBILE_MAX_WIDTH = 640;

  function open() {
    moreBtnEvent.classList.remove("hidden", "pointer-events-none");

    requestAnimationFrame(() => {
      moreBtnEvent.classList.remove("opacity-0");
      moreBtnEvent.classList.add("opacity-100");
    });

    isOpen = true;
  }

  function close() {
    if (!isOpen) return;

    moreBtnEvent.classList.remove("opacity-100");
    moreBtnEvent.classList.add("opacity-0", "pointer-events-none");

    moreBtnEvent.addEventListener(
      "transitionend",
      () => {
        moreBtnEvent.classList.add("hidden");
      },
      { once: true },
    );

    isOpen = false;
  }

  // more 버튼 클릭
  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? close() : open();
  });

  moreBtnEvent.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    close();
  });

  function handleResize() {
    if (window.innerWidth > MOBILE_MAX_WIDTH) {
      close();
    }
  }

  window.addEventListener("resize", handleResize);

  handleResize();
  hiddenButton(postId);
}
