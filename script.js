// ===============================
// Sri Varasiddhi Vinayaka Utsava
// Website JavaScript
// ===============================

// Mobile navigation
const menuButton = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.textContent = "☰";
    });
  });
}


// ===============================
// Ganesh Chaturthi Countdown
// ===============================

const festivalDate = new Date("September 14, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = festivalDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) return;

  if (difference <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / (1000 * 60)) % 60);
  const s = Math.floor((difference / 1000) % 60);

  days.textContent = String(d).padStart(2, "0");
  hours.textContent = String(h).padStart(2, "0");
  minutes.textContent = String(m).padStart(2, "0");
  seconds.textContent = String(s).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===============================
// Background Devotional Music
// ===============================

const music = document.getElementById("ganeshaMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {
  musicButton.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicButton.innerHTML = "🔊 <span>Music On</span>";
      } else {
        music.pause();
        musicButton.innerHTML = "🔇 <span>Music Off</span>";
      }
    } catch (error) {
      console.log("Music could not be played:", error);
      alert("Please add ganesha-pancharatnam-instrumental.mp3 inside the assets folder.");
    }
  });

  music.addEventListener("ended", () => {
    musicButton.innerHTML = "🔇 <span>Play Music</span>";
  });
}


// ===============================
// Copy UPI ID
// ===============================

function copyUPI() {
  const upiElement = document.getElementById("upiText");

  if (!upiElement) return;

  const upi = upiElement.textContent.trim();

  navigator.clipboard.writeText(upi)
    .then(() => {
      alert("UPI ID copied: " + upi);
    })
    .catch(() => {
      alert("Unable to copy UPI ID. Please copy it manually.");
    });
}
