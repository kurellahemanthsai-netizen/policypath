
/* =========================================================
   POLICYPath — COMING SOON JAVASCRIPT
   Countdown | Email Form Feedback | Copyright Year
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =======================================================
     1. LAUNCH DATE
     Replace this example with your actual launch date.
     Format: YYYY-MM-DDTHH:MM:SS+05:30 for India.
  ======================================================= */

  const LAUNCH_DATE = "2027-01-01T00:00:00+05:30";
  const launchTime = new Date(LAUNCH_DATE).getTime();

  /* =======================================================
     2. ELEMENTS
  ======================================================= */

  const daysElement = document.getElementById("countdownDays");
  const hoursElement = document.getElementById("countdownHours");
  const minutesElement = document.getElementById("countdownMinutes");
  const secondsElement = document.getElementById("countdownSeconds");

  const countdownStatus = document.getElementById("countdownStatus");
  const yearElement = document.getElementById("comingSoonYear");

  const signupForm = document.getElementById("comingSoonForm");
  const emailInput = document.getElementById("comingSoonEmail");
  const feedback = document.getElementById("comingSoonFeedback");

  let countdownInterval = null;

  /* =======================================================
     3. COPYRIGHT YEAR
  ======================================================= */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =======================================================
     4. FORMAT NUMBERS
  ======================================================= */

  function padNumber(value, length) {
    return String(value).padStart(length, "0");
  }

  /* =======================================================
     5. COUNTDOWN
  ======================================================= */

  function updateCountdown() {
    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement ||
      !countdownStatus
    ) {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      return;
    }

    if (Number.isNaN(launchTime)) {
      daysElement.textContent = "000";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      countdownStatus.textContent =
        "Please configure a valid launch date.";

      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      return;
    }

    const now = Date.now();
    const difference = launchTime - now;

    if (difference <= 0) {
      daysElement.textContent = "000";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      countdownStatus.textContent =
        "Our scheduled launch time has arrived!";

      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = padNumber(days, 3);
    hoursElement.textContent = padNumber(hours, 2);
    minutesElement.textContent = padNumber(minutes, 2);
    secondsElement.textContent = padNumber(seconds, 2);

    countdownStatus.textContent =
      "Counting down to a clearer insurance experience.";
  }

  updateCountdown();

  if (launchTime > Date.now()) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  /* =======================================================
     6. EMAIL FORM FEEDBACK
     Connect a backend to collect email addresses.
  ======================================================= */

  function showFeedback(message) {
    if (!feedback) return;

    feedback.textContent = message;
    feedback.hidden = false;
  }

  function clearFeedback() {
    if (!feedback) return;

    feedback.textContent = "";
    feedback.hidden = true;
  }

  if (signupForm && emailInput) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      clearFeedback();

      if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
      }

      showFeedback(
        "Thanks for your interest! Email notifications are not " +
        "connected yet, so your address has not been saved."
      );

      /* Do not store or transmit email addresses in this demo. */
    });

    emailInput.addEventListener("input", clearFeedback);
  }

  /* =======================================================
     7. LUCIDE ICONS
  ======================================================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
