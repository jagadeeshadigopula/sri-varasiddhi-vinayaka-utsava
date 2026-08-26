/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".nav nav");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav nav a").forEach(link => {

  link.addEventListener("click", () => {

    if (navigation) {
      navigation.classList.remove("open");
    }

  });

});


/* =========================================================
   GANESH CHATURTHI COUNTDOWN
   ========================================================= */

const festivalDate = new Date("September 14, 2026 00:00:00").getTime();

function updateCountdown() {

  const now = new Date().getTime();

  const difference = festivalDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   COPY UPI ID
   ========================================================= */

function copyUPI() {

  const upiElement = document.getElementById("upiText");

  if (!upiElement) {
    return;
  }

  const upiID = upiElement.textContent.trim();

  navigator.clipboard.writeText(upiID)
    .then(() => {

      alert("UPI ID copied!");

    })
    .catch(() => {

      alert("Unable to copy UPI ID.");

    });

}


/* =========================================================
   DEVOTIONAL MUSIC
   ========================================================= */

const music = document.getElementById("ganeshaMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {

  musicButton.addEventListener("click", async () => {

    try {

      if (music.paused) {

        await music.play();

        musicButton.innerHTML = "🔊 <span>Pause Music</span>";

      } else {

        music.pause();

        musicButton.innerHTML = "🔇 <span>Play Music</span>";

      }

    } catch (error) {

      alert("Please make sure the MP3 file exists inside the assets folder.");

    }

  });

}
