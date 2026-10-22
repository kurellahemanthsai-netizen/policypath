 (function () {
      try {
        const dark = localStorage.getItem("policypath-dark-mode");
        const rtl = localStorage.getItem("policypath-rtl-mode");

        if (
          dark === "true" ||
          (dark === null &&
            localStorage.getItem("safe-step-dark-mode") === "true")
        ) {
          document.documentElement.classList.add("dark-mode");
        }

        if (
          rtl === "true" ||
          (rtl === null &&
            localStorage.getItem("safe-step-rtl-mode") === "true")
        ) {
          document.documentElement.setAttribute("dir", "rtl");
        }
      } catch (error) {
        /* Use default settings if browser storage is unavailable. */
      }
    })();
    
/* =========================================================
   POLICYPath — SIGNUP JAVASCRIPT
   Password Visibility | Password Matching | Form Feedback
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("signupPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const feedback = document.getElementById("signupFeedback");

  const googleSignup = document.getElementById("googleSignup");
  const appleSignup = document.getElementById("appleSignup");

  /* =======================================================
     ICON INITIALIZATION
  ======================================================= */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* =======================================================
     FEEDBACK MESSAGE
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

  /* =======================================================
     SHOW / HIDE PASSWORD
  ======================================================= */

  document.querySelectorAll(".signup-password-toggle").forEach(
    function (button) {
      button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-password-target");
        const input = document.getElementById(targetId);

        if (!input) return;

        const shouldShow = input.type === "password";

        input.type = shouldShow ? "text" : "password";

        button.innerHTML = shouldShow
          ? '<i data-lucide="eye-off" aria-hidden="true"></i>'
          : '<i data-lucide="eye" aria-hidden="true"></i>';

        button.setAttribute(
          "aria-label",
          shouldShow ? "Hide password" : "Show password"
        );

        button.setAttribute("aria-pressed", String(shouldShow));

        refreshIcons();
      });
    }
  );

  /* =======================================================
     PASSWORD MATCHING
  ======================================================= */

  function validatePasswordMatch() {
    if (!passwordInput || !confirmPasswordInput) return true;

    const password = passwordInput.value;
    const confirmation = confirmPasswordInput.value;

    if (!confirmation) {
      confirmPasswordInput.setCustomValidity("");
      return true;
    }

    if (password !== confirmation) {
      confirmPasswordInput.setCustomValidity(
        "Passwords do not match."
      );
      return false;
    }

    confirmPasswordInput.setCustomValidity("");
    return true;
  }

  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener("input", function () {
      validatePasswordMatch();
      clearFeedback();
    });

    confirmPasswordInput.addEventListener("input", function () {
      validatePasswordMatch();
      clearFeedback();
    });
  }

  /* =======================================================
     CLEAR FEEDBACK WHEN FIELDS CHANGE
  ======================================================= */

  if (signupForm) {
    signupForm.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", clearFeedback);
      input.addEventListener("change", clearFeedback);
    });
  }

  /* =======================================================
     SIGNUP SUBMISSION
     Connect a real backend before production.
  ======================================================= */

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      validatePasswordMatch();

      if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
      }

      showFeedback(
        "Your form is valid. Account creation is not connected yet. " +
        "Connect your backend to securely create your account."
      );
    });
  }

  /* =======================================================
     GOOGLE SIGNUP PLACEHOLDER
  ======================================================= */

  if (googleSignup) {
    googleSignup.addEventListener("click", function () {
      showFeedback(
        "Google sign-up is not connected yet. Configure Google OAuth " +
        "to enable account registration."
      );
    });
  }

  /* =======================================================
     APPLE SIGNUP PLACEHOLDER
  ======================================================= */

  if (appleSignup) {
    appleSignup.addEventListener("click", function () {
      showFeedback(
        "Apple sign-up is not connected yet. Configure Apple " +
        "authentication to enable account registration."
      );
    });
  }

  refreshIcons();
});
