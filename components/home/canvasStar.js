const main = document.getElementById("canvasStar");

const canvas = document.createElement("canvas");
canvas.style.cssText = `
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: -1;
`;
main.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 0.5,
  speed: Math.random() * 0.3 + 0.1,
  opacity: Math.random() * 0.7 + 0.3,
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.x += (Math.random() - 0.5) * star.speed;
    star.y += (Math.random() - 0.5) * star.speed;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();