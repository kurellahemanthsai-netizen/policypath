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
        /* Continue with the default theme. */
      }
    })();
    
/* =========================================================
   POLICYPath — LOGIN JAVASCRIPT
   Password Visibility | Form Feedback | Social Login Hooks
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("loginPassword");
  const passwordToggle = document.getElementById("passwordToggle");
  const feedback = document.getElementById("loginFeedback");

  const googleLogin = document.getElementById("googleLogin");
  const appleLogin = document.getElementById("appleLogin");

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  function showFeedback(message) {
    if (!feedback) return;

    feedback.textContent = message;
    feedback.hidden = false;
  }

  /* SHOW / HIDE PASSWORD */

  if (passwordInput && passwordToggle) {
    passwordToggle.addEventListener("click", function () {
      const showPassword = passwordInput.type === "password";

      passwordInput.type = showPassword ? "text" : "password";

      passwordToggle.innerHTML = showPassword
        ? '<i data-lucide="eye-off" aria-hidden="true"></i>'
        : '<i data-lucide="eye" aria-hidden="true"></i>';

      passwordToggle.setAttribute(
        "aria-label",
        showPassword ? "Hide password" : "Show password"
      );

      passwordToggle.setAttribute(
        "aria-pressed",
        String(showPassword)
      );

      refreshIcons();
    });
  }

  /* BASIC FORM VALIDATION */

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }

      showFeedback(
        "The login design is ready. Connect your authentication backend " +
        "to verify credentials and sign users in."
      );
    });
  }

  /* GOOGLE AUTHENTICATION PLACEHOLDER */

  if (googleLogin) {
    googleLogin.addEventListener("click", function () {
      showFeedback(
        "Google sign-in is not connected yet. Configure Google OAuth " +
        "before enabling this option."
      );
    });
  }

  /* APPLE AUTHENTICATION PLACEHOLDER */

  if (appleLogin) {
    appleLogin.addEventListener("click", function () {
      showFeedback(
        "Apple sign-in is not connected yet. Configure Apple authentication " +
        "before enabling this option."
      );
    });
  }

  refreshIcons();
});
