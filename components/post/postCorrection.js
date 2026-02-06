postCorrection();

function postCorrection() {
  const moreBtn = document.getElementById("postMoreBtn");
  const Event = document.getElementById("postMoreBtnEvent");

  let isOpen = false;
  const MOBILE_MAX_WIDTH = 640;

  function open() {
    Event.classList.remove("hidden", "pointer-events-none");

    requestAnimationFrame(() => {
      Event.classList.remove("opacity-0");
      Event.classList.add("opacity-100");
    });

    isOpen = true;
  }

  function close() {
    if (!isOpen) return;

    Event.classList.remove("opacity-100");
    Event.classList.add("opacity-0", "pointer-events-none");

    Event.addEventListener(
      "transitionend",
      () => {
        Event.classList.add("hidden");
      },
      { once: true }
    );

    isOpen = false;
  }

  // more 버튼 클릭
  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? close() : open();
  });

  // 내부 클릭 방지
  Event.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 바깥 클릭 시 닫기
  document.addEventListener("click", () => {
    close();
  });

  // ✅ 640px 초과 시 강제 닫기
  function handleResize() {
    if (window.innerWidth > MOBILE_MAX_WIDTH) {
      close();
    }
  }

  // resize 감지
  window.addEventListener("resize", handleResize);

  // 최초 로드 시도 체크 (중요)
  handleResize();
}
