const btn = document.getElementById("mainButton");
const main = document.querySelector("main");

const canvas = document.createElement("canvas");
canvas.style.cssText = `
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
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

let isWarping = false;
let warpProgress = 0;

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    if (isWarping) {
      const dx = star.x - cx;
      const dy = star.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = star.speed * (1 + warpProgress * 60);

      star.x += (dx / dist) * speed;
      star.y += (dy / dist) * speed;

      if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
        star.x = cx + (Math.random() - 0.5) * 40;
        star.y = cy + (Math.random() - 0.5) * 40;
      }

      const tailLen = warpProgress * 18;
      const nx = dx / dist;
      const ny = dy / dist;
      const gradient = ctx.createLinearGradient(
        star.x - nx * tailLen, star.y - ny * tailLen,
        star.x, star.y
      );
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(1, `rgba(255,255,255,${star.opacity})`);
      ctx.beginPath();
      ctx.moveTo(star.x - nx * tailLen, star.y - ny * tailLen);
      ctx.lineTo(star.x, star.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.size;
      ctx.stroke();
    } else {
      star.x += (Math.random() - 0.5) * star.speed;
      star.y += (Math.random() - 0.5) * star.speed;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
      ctx.fill();
    }
  });

  if (isWarping && warpProgress < 1) warpProgress += 0.012;
  requestAnimationFrame(drawStars);
}

drawStars();

btn.addEventListener("click", () => {
  isWarping = true;

  const scale = Math.max(window.innerWidth, window.innerHeight) / btn.offsetWidth * 8;
  btn.style.transition = "transform 2.5s cubic-bezier(0.4, 0, 1, 1)";
  btn.style.transform = `translate(-50%, -50%) scale(${scale})`;

  btn.addEventListener("transitionend", () => {
    setTimeout(() => {
      btn.style.transition = "opacity 1s";
      btn.style.opacity = "0";

      setTimeout(() => {
        btn.style.display = "none";
        canvas.style.transition = "opacity 0.5s";
        canvas.style.opacity = "0";

        const overlay = document.createElement("div");
        overlay.style.cssText = `
          position: fixed; inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 9999;
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          overlay.style.opacity = "1";
          setTimeout(() => window.location.href = "/pages/home.html", 500);
        });
      }, 100);
    }, 500);
  }, { once: true });
});