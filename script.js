```javascript
/* =========================================================
   SRI VARASIDDHI VINAYAKA UTSAVA COMMITTEE
   MAIN JAVASCRIPT
   Mobile + Tablet + Desktop Compatible
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".nav nav");

if (menuButton && navigation) {

  // Initial accessibility state
  menuButton.setAttribute("aria-expanded", "false");


  // Open / Close menu
  menuButton.addEventListener("click", (event) => {

    event.stopPropagation();

    navigation.classList.toggle("open");

    const isOpen =
      navigation.classList.contains("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  // Close menu when navigation link is clicked
  navigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  // Close menu when clicking outside
  document.addEventListener("click", (event) => {

    const clickedMenuButton =
      menuButton.contains(event.target);

    const clickedNavigation =
      navigation.contains(event.target);

    if (
      !clickedMenuButton &&
      !clickedNavigation
    ) {

      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  // Close menu with Escape key
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}


/* =========================================================
   GANESH CHATURTHI COUNTDOWN
========================================================= */

/*
   Festival Date:
   14 September 2026

   The browser automatically uses the visitor's
   local timezone.
*/

const festivalDate =
  new Date("2026-09-14T00:00:00").getTime();


function updateCountdown() {

  const now = Date.now();

  const difference =
    festivalDate - now;


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  // Stop safely if countdown doesn't exist
  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  // Festival date reached
  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }


  const totalSeconds =
    Math.floor(difference / 1000);


  const days =
    Math.floor(totalSeconds / 86400);


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  daysElement.textContent =
    String(days).padStart(2, "0");


  hoursElement.textContent =
    String(hours).padStart(2, "0");


  minutesElement.textContent =
    String(minutes).padStart(2, "0");


  secondsElement.textContent =
    String(seconds).padStart(2, "0");

}


// Run immediately
updateCountdown();


// Update every second
const countdownTimer =
  setInterval(updateCountdown, 1000);


/* =========================================================
   COPY UPI ID
========================================================= */

function copyUPI() {

  const upiElement =
    document.getElementById("upiText");


  if (!upiElement) {
    return;
  }


  const upiID =
    upiElement.textContent.trim();


  // Prevent copying placeholder
  if (
    !upiID ||
    upiID === "YOUR-UPI-ID@bank"
  ) {

    alert(
      "Please add the official committee UPI ID first."
    );

    return;
  }


  /*
     Modern mobile browsers
     Chrome / Safari / Edge / Firefox
  */

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    navigator.clipboard
      .writeText(upiID)
      .then(() => {

        showCopySuccess();

      })
      .catch(() => {

        fallbackCopyUPI(upiID);

      });

  } else {

    /*
       Fallback for browsers where
       Clipboard API is unavailable.
    */

    fallbackCopyUPI(upiID);

  }

}


/* =========================================================
   UPI COPY FALLBACK
========================================================= */

function fallbackCopyUPI(text) {

  const textArea =
    document.createElement("textarea");


  textArea.value = text;


  textArea.style.position =
    "fixed";

  textArea.style.left =
    "-9999px";

  textArea.style.top =
    "0";

  textArea.style.opacity =
    "0";


  document.body.appendChild(
    textArea
  );


  textArea.focus();
  textArea.select();


  try {

    const successful =
      document.execCommand("copy");


    if (successful) {

      showCopySuccess();

    } else {

      alert(
        "Unable to copy UPI ID. Please copy it manually."
      );

    }

  } catch (error) {

    console.error(
      "UPI copy error:",
      error
    );

    alert(
      "Unable to copy UPI ID. Please copy it manually."
    );

  }


  document.body.removeChild(
    textArea
  );

}


/* =========================================================
   COPY SUCCESS FEEDBACK
========================================================= */

function showCopySuccess() {

  const copyButton =
    document.querySelector(
      ".donate-card button"
    );


  if (!copyButton) {

    alert("UPI ID copied!");

    return;
  }


  const originalText =
    copyButton.textContent;


  copyButton.textContent =
    "✓ UPI ID Copied";


  copyButton.classList.add(
    "copied"
  );


  setTimeout(() => {

    copyButton.textContent =
      originalText;


    copyButton.classList.remove(
      "copied"
    );

  }, 2000);

}


/* =========================================================
   DEVOTIONAL MUSIC
========================================================= */

const music =
  document.getElementById(
    "ganeshaMusic"
  );


const musicButton =
  document.getElementById(
    "musicButton"
  );


if (music && musicButton) {

  musicButton.addEventListener(
    "click",
    async () => {

      try {

        // Play music
        if (music.paused) {

          await music.play();


          musicButton.innerHTML =
            "🔊 <span>Pause Music</span>";


          musicButton.setAttribute(
            "aria-label",
            "Pause devotional music"
          );


        }

        // Pause music
        else {

          music.pause();


          musicButton.innerHTML =
            "🔇 <span>Play Music</span>";


          musicButton.setAttribute(
            "aria-label",
            "Play devotional music"
          );

        }

      } catch (error) {

        console.error(
          "Music playback error:",
          error
        );


        alert(
          "Unable to play the devotional music. Please check that the MP3 file exists inside the assets folder."
        );

      }

    }
  );


  // If audio is paused externally
  music.addEventListener(
    "pause",
    () => {

      if (!music.ended) {

        musicButton.innerHTML =
          "🔇 <span>Play Music</span>";

        musicButton.setAttribute(
          "aria-label",
          "Play devotional music"
        );

      }

    }
  );


  // If audio starts playing
  music.addEventListener(
    "play",
    () => {

      musicButton.innerHTML =
        "🔊 <span>Pause Music</span>";

      musicButton.setAttribute(
        "aria-label",
        "Pause devotional music"
      );

    }
  );


  // Reset button when audio ends
  music.addEventListener(
    "ended",
    () => {

      musicButton.innerHTML =
        "🔇 <span>Play Music</span>";

      musicButton.setAttribute(
        "aria-label",
        "Play devotional music"
      );

    }
  );

}


/* =========================================================
   PREVENT ACCIDENTAL HORIZONTAL SCROLL
   ========================================================= */

/*
   This does not replace the CSS.
   It only helps prevent the page from
   horizontally scrolling on small screens.
*/

window.addEventListener(
  "resize",
  () => {

    if (
      navigation &&
      window.innerWidth > 900
    ) {

      navigation.classList.remove(
        "open"
      );


      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }

  }
);


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "Sri Varasiddhi Vinayaka Utsava Committee website loaded successfully."
    );

  }
);
```
