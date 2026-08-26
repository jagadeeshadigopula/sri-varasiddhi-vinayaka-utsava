document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuButton = document.querySelector(".menu");
  const navigation = document.querySelector(".nav nav");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      navigation.classList.toggle("open");

      const isOpen = navigation.classList.contains("open");

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navigation.classList.remove("open");

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");

      });

    });
  }


  /* =========================================================
     GANESH CHATURTHI COUNTDOWN
     Target: 14 September 2026
     ========================================================= */

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  console.log("Countdown elements:", {
    days: daysElement,
    hours: hoursElement,
    minutes: minutesElement,
    seconds: secondsElement
  });

  if (
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
  ) {

    // September 14, 2026 at 12:00 AM
    const festivalDate = new Date(
      "2026-09-14T00:00:00"
    ).getTime();


    function updateCountdown() {

      const now = Date.now();

      const difference = festivalDate - now;


      // Festival has started
      if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
      }


      // Calculate days
      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );


      // Calculate hours
      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );


      // Calculate minutes
      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );


      // Calculate seconds
      const seconds = Math.floor(
        (difference / 1000) % 60
      );


      // Display
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
    setInterval(updateCountdown, 1000);

  } else {

    console.error(
      "COUNTDOWN ERROR: days/hours/minutes/seconds elements were not found."
    );

  }


  /* =========================================================
     COPY UPI ID
     ========================================================= */

  window.copyUPI = async function () {

    const upiElement = document.getElementById("upiText");

    if (!upiElement) {
      return;
    }

    const upiID = upiElement.textContent.trim();

    try {

      await navigator.clipboard.writeText(upiID);

      alert("UPI ID copied successfully!");

    } catch (error) {

      const textArea = document.createElement("textarea");

      textArea.value = upiID;

      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";

      document.body.appendChild(textArea);

      textArea.select();

      try {

        document.execCommand("copy");

        alert("UPI ID copied successfully!");

      } catch (copyError) {

        alert(
          "Unable to copy UPI ID. Please copy it manually."
        );

      }

      document.body.removeChild(textArea);

    }

  };


  /* =========================================================
     DEVOTIONAL MUSIC
     ========================================================= */

  const music = document.getElementById("ganeshaMusic");
  const musicButton = document.getElementById("musicButton");


  if (music && musicButton) {

    musicButton.addEventListener("click", async function () {

      try {

        if (music.paused) {

          await music.play();

          musicButton.innerHTML =
            "🔊 <span>Pause Music</span>";

        } else {

          music.pause();

          musicButton.innerHTML =
            "🔇 <span>Play Music</span>";

        }

      } catch (error) {

        alert(
          "Music could not be played. Please check that the MP3 file exists inside the assets folder."
        );

      }

    });


    music.addEventListener("pause", function () {

      musicButton.innerHTML =
        "🔇 <span>Play Music</span>";

    });


    music.addEventListener("play", function () {

      musicButton.innerHTML =
        "🔊 <span>Pause Music</span>";

    });

  }

});
