export function initCardDragAnimation() {
  cardDrag();
}

function cardDrag() {
  let cards = Array.from(document.querySelectorAll(".introduce-card"));
  if (cards.length < 3) return;

  // 마우스 변수
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const stage = document.getElementById("project-card-section");
  stage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentX = e.clientX;

    cards[0].style.transition = "none";
  });
  stage.addEventListener("mousemove", (e) => {
    if(!isDragging) return;

    currentX = e.clientX;
    const dx = currentX - startX;

    cards[0].style.transform = `translateX(calc(${dx}px))`
  });

  function handleDragEnd(){
    if(!isDragging) return;

    isDragging = false;

    const dx = currentX - startX;

    cards[0].style.transition = "";
    cards[0].style.transform = "";

    const threshold = 100;

    if(dx > threshold){
      rotatePrev(cards);
      applyLayout(cards);
    }
    else if(dx < -threshold){
      rotateNext(cards);
      applyLayout(cards);
    }
  }
  stage.addEventListener("mouseup", handleDragEnd);
  stage.addEventListener("mouseleave", handleDragEnd);
}

function rotateNext(cards) {
  let first = cards.shift();
  cards.push(first);
}
function rotatePrev(cards) {
  let last = cards.pop();
  cards.unshift(last);
}

function applyLayout(cards) {
  const reset = [
    "z-9",
    "z-10",
    "scale-95",
    "scale-100",
    "left-1/2",
    "left-2/5",
    "left-3/5",
    "blur-xs",
    "blur-none",
  ];

  cards.forEach((card) => card.classList.remove(...reset));

  cards[0].classList.add("z-10", "scale-100", "left-1/2", "blur-none");
  cards[1].classList.add("z-9", "scale-95", "left-3/5", "blur-xs");
  cards[2].classList.add("z-9", "scale-95", "left-2/5", "blur-xs");
}
