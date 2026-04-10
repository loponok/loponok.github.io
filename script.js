/* ===== 電梯感滑動 ===== */
const navButtons = document.querySelectorAll(".menu button");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ===== 打字 / 刪字動畫 ===== */
const typingText = document.getElementById("typing-text");
const message = "網頁仍在建設中...";

let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingText) return;

  if (!isDeleting) {
    typingText.textContent = message.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === message.length) {
      setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, 1000);
      return;
    }

    setTimeout(typeLoop, 180);
  } else {
    typingText.textContent = message.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      setTimeout(typeLoop, 350);
      return;
    }

    setTimeout(typeLoop, 80);
  }
}

typeLoop();

/* ===== 星空背景 ===== */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 110;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.12 + 0.03,
      alpha: Math.random() * 0.45 + 0.15,
      twinkle: Math.random() * 0.02 + 0.002
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.y += star.speed;
    star.alpha += star.twinkle;

    if (star.alpha >= 0.65 || star.alpha <= 0.12) {
      star.twinkle *= -1;
    }

    if (star.y > canvas.height) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210, 225, 255, ${star.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
drawStars();