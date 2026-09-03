
const passwordGate = document.getElementById("passwordGate");
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordError = document.getElementById("passwordError");

function unlockSite() {
  if (passwordInput.value === "2462006") {
    passwordGate.classList.add("hidden");
    document.body.style.overflow = "";
    createHearts(5);

    // تشغيل الصوت فور دخول الباسورد الصح
    audio.play().then(() => {
      playBtn.textContent = "Ⅱ";
    }).catch(() => {});
  } else {
    passwordError.classList.add("show");
    passwordInput.value = "";
    passwordInput.focus();
    setTimeout(() => passwordError.classList.remove("show"), 1800);
  }
}

passwordBtn.addEventListener("click", unlockSite);
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockSite();
});

document.body.style.overflow = "hidden";

const intro = document.getElementById("intro");
const letterSection = document.getElementById("letterSection");
const memories = document.getElementById("memories");
const openBtn = document.getElementById("openBtn");
const letterButton = document.getElementById("letterButton");
const memoriesBtn = document.getElementById("memoriesBtn");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const hearts = document.getElementById("hearts");

function openLetter() {
  intro.classList.add("hidden");
  letterSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  createHearts(8);
}

openBtn.addEventListener("click", openLetter);
letterButton.addEventListener("click", openLetter);

memoriesBtn.addEventListener("click", () => {
  letterSection.classList.add("hidden");
  memories.classList.remove("hidden");
  memories.scrollIntoView({ behavior: "smooth" });

  // أول ضغطة من المستخدم تسمح للمتصفح بتشغيل الصوت
  audio.play().then(() => {
    playBtn.textContent = "Ⅱ";
  }).catch(() => {});
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Ⅱ";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBar.style.width = `${percent}%`;
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  progressBar.style.width = "0%";
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// قلوب بسيطة في الخلفية
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .25 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heart.style.animationDuration = `${5 + Math.random() * 6}s`;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

function createHearts(count = 3) {
  for (let i = 0; i < count; i++) setTimeout(createHeart, i * 220);
}

setInterval(createHeart, 1200);
