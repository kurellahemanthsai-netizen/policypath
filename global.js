/* =========================================================
   POLICYPATH — HEADER & FOOTER JAVASCRIPT
   Dark Mode | RTL | Mobile Menu | Dropdown
   Active Navigation | Copyright | Back to Top
   Shared Settings Across PolicyPath Pages
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const body = document.body;
  const html = document.documentElement;

  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("primaryNavbar");
  const homeDropdown = document.querySelector(".dropdown");
  const topButton = document.querySelector(".top-btn");
  const copyrightYear = document.getElementById("copyrightYear");

  const DARK_KEY = "policypath-dark-mode";
  const RTL_KEY = "policypath-rtl-mode";
  const LEGACY_DARK_KEY = "safe-step-dark-mode";
  const LEGACY_RTL_KEY = "safe-step-rtl-mode";

  /* =======================================================
     LUCIDE ICONS
  ======================================================= */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* =======================================================
     READ SAVED SETTINGS
  ======================================================= */

  function readSetting(primaryKey, legacyKey, defaultValue) {
    const primaryValue = localStorage.getItem(primaryKey);
    if (primaryValue !== null) return primaryValue === "true";

    const legacyValue = localStorage.getItem(legacyKey);
    if (legacyValue !== null) return legacyValue === "true";

    return defaultValue;
  }

  /* =======================================================
     DARK MODE
  ======================================================= */

  function applyDarkMode(isDark) {
    body.classList.toggle("dark-mode", isDark);

    localStorage.setItem(DARK_KEY, String(isDark));
    localStorage.setItem(LEGACY_DARK_KEY, String(isDark));

    if (darkToggle) {
      darkToggle.innerHTML = isDark
        ? '<i data-lucide="sun" aria-hidden="true"></i>'
        : '<i data-lucide="moon" aria-hidden="true"></i>';

      darkToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      darkToggle.setAttribute("aria-pressed", String(isDark));
      darkToggle.title = isDark ? "Light Mode" : "Dark Mode";
    }

    const dashboardToggle = document.getElementById("themeToggle");
    if (dashboardToggle) {
      dashboardToggle.setAttribute("aria-pressed", String(isDark));
    }

    const settingsToggle = document.getElementById("settingsThemeToggle");
    if (settingsToggle) {
      settingsToggle.checked = isDark;
    }

    refreshIcons();
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", function (event) {
      event.preventDefault();
      applyDarkMode(!body.classList.contains("dark-mode"));
    });
  }

  /* =======================================================
     RTL MODE
  ======================================================= */

  function applyRTL(isRTL) {
    const direction = isRTL ? "rtl" : "ltr";

    body.classList.toggle("rtl", isRTL);
    body.setAttribute("dir", direction);
    html.setAttribute("dir", direction);

    localStorage.setItem(RTL_KEY, String(isRTL));
    localStorage.setItem(LEGACY_RTL_KEY, String(isRTL));

    if (rtlToggle) {
      rtlToggle.title = isRTL ? "LTR Mode" : "RTL Mode";

      rtlToggle.setAttribute(
        "aria-label",
        isRTL
          ? "Switch to left-to-right mode"
          : "Switch to right-to-left mode"
      );

      rtlToggle.setAttribute("aria-pressed", String(isRTL));
    }

    const settingsToggle = document.getElementById("settingsRtlToggle");
    if (settingsToggle) {
      settingsToggle.checked = isRTL;
    }

    refreshIcons();
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", function (event) {
      event.preventDefault();
      applyRTL(html.getAttribute("dir") !== "rtl");
    });
  }

  /* =======================================================
     RESTORE SAVED SETTINGS
  ======================================================= */

  applyDarkMode(
    readSetting(
      DARK_KEY,
      LEGACY_DARK_KEY,
      body.classList.contains("dark-mode")
    )
  );

  applyRTL(
    readSetting(
      RTL_KEY,
      LEGACY_RTL_KEY,
      html.getAttribute("dir") === "rtl" ||
        body.classList.contains("rtl")
    )
  );

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function closeMobileMenu() {
    if (navbar) navbar.classList.remove("active");
    if (homeDropdown) homeDropdown.classList.remove("active");

    if (menuToggle) {
      menuToggle.innerHTML =
        '<i data-lucide="menu" aria-hidden="true"></i>';

      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    refreshIcons();
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = navbar.classList.toggle("active");

      menuToggle.innerHTML = isOpen
        ? '<i data-lucide="x" aria-hidden="true"></i>'
        : '<i data-lucide="menu" aria-hidden="true"></i>';

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      refreshIcons();
    });
  } else if (!menuToggle || !navbar) {
    console.warn(
      "PolicyPath: Check #menuToggle and #primaryNavbar in your HTML."
    );
  }

  /* =======================================================
     HOME DROPDOWN
  ======================================================= */

  const homeLink = homeDropdown
    ? homeDropdown.querySelector(":scope > a")
    : null;

  if (homeLink && homeDropdown) {
    homeLink.addEventListener("click", function (event) {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        event.stopPropagation();
        homeDropdown.classList.toggle("active");
      }
    });
  }

  /* =======================================================
     CLOSE MENU AFTER NAVIGATION
  ======================================================= */

  if (navbar) {
    navbar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth > 1024 || link === homeLink) return;
        closeMobileMenu();
      });
    });
  }

  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 1024 &&
      navbar &&
      navbar.classList.contains("active") &&
      !navbar.contains(event.target) &&
      menuToggle &&
      !menuToggle.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  /* =======================================================
     RESET MOBILE MENU ON RESIZE
  ======================================================= */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  function setActiveNavigation() {
    const currentPage = (
      window.location.pathname.split("/").pop() || "home-1.html"
    ).toLowerCase();

    const homePages = ["home-1.html", "home2.html"];

    document
      .querySelectorAll(".nav-links a, .dropdown-menu a")
      .forEach(function (link) {
        const href = link.getAttribute("href") || "";

        if (
          !href ||
          href.startsWith("#") ||
          href.startsWith("javascript:")
        ) {
          return;
        }

        const linkPage = href
          .split("#")[0]
          .split("?")[0]
          .split("/")
          .pop()
          .toLowerCase();

        if (linkPage === currentPage) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });

    if (homePages.includes(currentPage) && homeLink) {
      homeLink.classList.add("active");
    }
  }

  /* =======================================================
     BACK TO TOP
  ======================================================= */

  if (topButton) {
    topButton.addEventListener("click", function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =======================================================
     COPYRIGHT YEAR
  ======================================================= */

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  /* =======================================================
     INITIALIZE
  ======================================================= */

  setActiveNavigation();
  refreshIcons();
});