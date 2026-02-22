animations();

export function animations() {
  cardDrag();
}

function cardDrag() {
  let cards = Array.from(document.querySelectorAll(".introduce-card"));
  if (cards.length < 3) return;
  const dragTarget = cards[0].closest(".card-drag-layer");

  // 마우스 변수
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  const stage = document.getElementById("introduceCardSection");
  stage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener("mousemove", (e) => {
    if(!isDragging) return;

    currentX = e.clientX;
    currentY = e.clientY;

    const dx = currentX - startX;
    const dy = currentY - startY;
  });
  stage.addEventListener("mouseup", () => {
    if(!isDragging) return;

    isDragging = false;

    const dx = currentX - startX;

    const threshold = 100;
    if(dx > threshold){
      rotatePrev(cards);
      applyLayout(cards);
    }
    else if(dx < -threshold){
      rotateNext(cards);
      applyLayout(cards);
    }
  })
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
