
/* =========================================================
   POLICYPath — 404 PAGE JAVASCRIPT
   Go Back Button | Lucide Icons
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const backButton = document.getElementById("errorBackButton");

  /* Initialize icons */
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* Go back to the previous page when possible */
  if (backButton) {
    backButton.addEventListener("click", function () {
      if (window.history.length > 1 && document.referrer) {
        window.history.back();
      } else {
        window.location.href = "index.html";
      }
    });
  }
});
