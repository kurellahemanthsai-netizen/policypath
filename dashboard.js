/* =========================================================
   POLICYPATH — CLIENT DASHBOARD
   Navigation, Theme, RTL and Dashboard Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();
});

function initializeDashboard() {
  initializeIcons();
  initializeNavigation();
  initializeSidebar();
  initializeTheme();
  initializeRTL();
  initializeProfileDropdown();
  initializeQuoteComparison();
  initializeSearch();
  initializeNotifications();
  initializeForms();
  initializeLogout();
  initializeOutsideClick();

  updateSettingsControls();
}

/* =========================================================
   LUCIDE ICONS
========================================================= */

function initializeIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function refreshIcons() {
  initializeIcons();
}

/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(message) {
  let region = document.getElementById("toastRegion");

  if (!region) {
    region = document.createElement("div");
    region.id = "toastRegion";
    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
  }

  const toast = document.createElement("div");
  toast.className = "dashboard-toast";
  toast.textContent = message;

  Object.assign(toast.style, {
    padding: "12px 16px",
    marginTop: "8px",
    borderRadius: "10px",
    background: "var(--primary)",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,.15)",
    fontSize: "12px",
    maxWidth: "min(340px, calc(100vw - 32px))",
  });

  region.style.position = "fixed";
  region.style.zIndex = "2000";
  region.style.bottom = "20px";
  region.style.insetInlineEnd = "20px";
  region.style.maxWidth = "calc(100vw - 40px)";

  region.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

/* =========================================================
   PANEL NAVIGATION
========================================================= */

function initializeNavigation() {
  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    item.addEventListener("click", () => {
      const panel = item.dataset.panel;

      if (panel) {
        switchPanel(panel);
        closeMobileSidebar();
      }
    });
  });

  document.querySelectorAll("[data-open-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.dataset.openPanel;

      if (panel) {
        switchPanel(panel);
        closeMobileSidebar();
      }
    });
  });

  const profileLink = document.getElementById("profileLink");
  const dashboardLink = document.getElementById("dashboardLink");

  if (profileLink) {
    profileLink.addEventListener("click", () => {
      switchPanel("profile");
      closeProfileDropdown();
    });
  }

  if (dashboardLink) {
    dashboardLink.addEventListener("click", () => {
      switchPanel("dashboard");
      closeProfileDropdown();
    });
  }

  const validPanels = [
    "dashboard",
    "quotes",
    "policies",
    "applications",
    "claims",
    "profile",
    "settings",
  ];

  const savedPanel = localStorage.getItem("policyPathActivePanel");

  switchPanel(
    validPanels.includes(savedPanel) ? savedPanel : "dashboard",
    false,
  );
}

function switchPanel(panelName, shouldScroll = true) {
  const selectedPanel = document.getElementById(`panel-${panelName}`);

  if (!selectedPanel) {
    return;
  }

  document.querySelectorAll(".dashboard-panel").forEach((panel) => {
    panel.classList.remove("active");
  });

  selectedPanel.classList.add("active");

  document.querySelectorAll(".nav-item[data-panel]").forEach((item) => {
    const isActive = item.dataset.panel === panelName;

    item.classList.toggle("active", isActive);

    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  const activeItem = document.querySelector(
    `.nav-item[data-panel="${panelName}"]`,
  );

  const pageTitle = document.getElementById("pageTitle");

  if (pageTitle) {
    pageTitle.textContent = activeItem?.dataset.title || "Dashboard";
  }

  localStorage.setItem("policyPathActivePanel", panelName);

  closeProfileDropdown();

  if (shouldScroll) {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  refreshIcons();
}

/* =========================================================
   SIDEBAR — DESKTOP AND MOBILE
========================================================= */

function initializeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const collapseButton = document.getElementById("sidebarCollapseBtn");
  const mobileButton = document.getElementById("mobileMenuBtn");
  const closeButton = document.getElementById("sidebarClose");
  const overlay = document.getElementById("sidebarOverlay");

  if (!sidebar) {
    return;
  }

  const isMobileLayout = () => window.innerWidth <= 1024;

  const savedCollapsed =
    localStorage.getItem("policyPathSidebarCollapsed") === "true";

  if (!isMobileLayout() && savedCollapsed) {
    document.body.classList.add("sidebar-collapsed");
  }

  if (collapseButton) {
    collapseButton.addEventListener("click", () => {
      if (isMobileLayout()) {
        return;
      }

      document.body.classList.toggle("sidebar-collapsed");

      localStorage.setItem(
        "policyPathSidebarCollapsed",
        document.body.classList.contains("sidebar-collapsed"),
      );
    });
  }

  if (mobileButton) {
    mobileButton.addEventListener("click", () => {
      if (!isMobileLayout()) {
        return;
      }

      if (sidebar.classList.contains("mobile-open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMobileSidebar);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }

  window.addEventListener("resize", () => {
    if (!isMobileLayout()) {
      closeMobileSidebar();

      if (
        localStorage.getItem("policyPathSidebarCollapsed") === "true"
      ) {
        document.body.classList.add("sidebar-collapsed");
      }
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  });
}

function openMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const button = document.getElementById("mobileMenuBtn");

  sidebar?.classList.add("mobile-open");
  overlay?.classList.add("active");
  document.body.classList.add("sidebar-open");

  button?.setAttribute("aria-expanded", "true");
  button?.setAttribute("aria-label", "Close menu");
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const button = document.getElementById("mobileMenuBtn");

  sidebar?.classList.remove("mobile-open");
  overlay?.classList.remove("active");
  document.body.classList.remove("sidebar-open");

  button?.setAttribute("aria-expanded", "false");
  button?.setAttribute("aria-label", "Open menu");
}

/* =========================================================
   DARK MODE — SHARED POLICYPATH PREFERENCE
========================================================= */

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const settingsToggle = document.getElementById("settingsThemeToggle");

  const savedTheme = localStorage.getItem("policypath-dark-mode");
  const legacyTheme = localStorage.getItem("safe-step-dark-mode");

  const isDark = savedTheme !== null
    ? savedTheme === "true"
    : legacyTheme !== null
      ? legacyTheme === "true"
      : document.body.classList.contains("dark-mode");

  applyTheme(isDark);

  if (themeToggle) {
    themeToggle.addEventListener("click", (event) => {
      event.preventDefault();
      applyTheme(!document.body.classList.contains("dark-mode"));
    });
  }

  if (settingsToggle) {
    settingsToggle.addEventListener("change", () => {
      applyTheme(settingsToggle.checked);
    });
  }
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  localStorage.setItem("policypath-dark-mode", String(isDark));
  localStorage.setItem("safe-step-dark-mode", String(isDark));

  const themeToggle = document.getElementById("themeToggle");
  const settingsToggle = document.getElementById("settingsThemeToggle");
  const navbarThemeToggle = document.getElementById("darkToggle");

  if (settingsToggle) {
    settingsToggle.checked = isDark;
  }

  if (themeToggle) {
    themeToggle.innerHTML = isDark
      ? '<i data-lucide="sun" aria-hidden="true"></i>'
      : '<i data-lucide="moon" aria-hidden="true"></i>';

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute("title", isDark ? "Light mode" : "Dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  if (navbarThemeToggle) {
    navbarThemeToggle.setAttribute("aria-pressed", String(isDark));
  }

  refreshIcons();
}

/* =========================================================
   RTL — SHARED POLICYPATH PREFERENCE
   global.js owns the main #rtlToggle click handler.
========================================================= */

function initializeRTL() {
  const settingsToggle = document.getElementById("settingsRtlToggle");

  const savedRTL = localStorage.getItem("policypath-rtl-mode");
  const legacyRTL = localStorage.getItem("safe-step-rtl-mode");

  const isRTL = savedRTL !== null
    ? savedRTL === "true"
    : legacyRTL !== null
      ? legacyRTL === "true"
      : document.documentElement.dir === "rtl";

  applyRTL(isRTL);

  // Do not attach another click listener to #rtlToggle here.
  if (settingsToggle) {
    settingsToggle.addEventListener("change", () => {
      applyRTL(settingsToggle.checked);
    });
  }
}

function applyRTL(isRTL) {
  const direction = isRTL ? "rtl" : "ltr";

  document.documentElement.setAttribute("dir", direction);
  document.body.setAttribute("dir", direction);
  document.body.classList.toggle("rtl", isRTL);

  localStorage.setItem("policypath-rtl-mode", String(isRTL));
  localStorage.setItem("safe-step-rtl-mode", String(isRTL));

  const settingsToggle = document.getElementById("settingsRtlToggle");
  const rtlButton = document.getElementById("rtlToggle");

  if (settingsToggle) {
    settingsToggle.checked = isRTL;
  }

  if (rtlButton) {
    rtlButton.setAttribute("aria-pressed", String(isRTL));

    rtlButton.setAttribute(
      "aria-label",
      isRTL
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout"
    );

    rtlButton.setAttribute(
      "title",
      isRTL
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout"
    );
  }
}

function updateSettingsControls() {
  const themeToggle = document.getElementById("settingsThemeToggle");
  const rtlToggle = document.getElementById("settingsRtlToggle");

  if (themeToggle) {
    themeToggle.checked = document.body.classList.contains("dark-mode");
  }

  if (rtlToggle) {
    rtlToggle.checked = document.documentElement.dir === "rtl";
  }
}

/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function initializeProfileDropdown() {
  const trigger = document.getElementById("profileToggle");
  const dropdown = document.querySelector(".profile-dropdown");

  if (!trigger || !dropdown) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("open");

    trigger.setAttribute("aria-expanded", String(isOpen));
  });
}

function closeProfileDropdown() {
  const dropdown = document.querySelector(".profile-dropdown");
  const trigger = document.getElementById("profileToggle");

  dropdown?.classList.remove("open");
  trigger?.setAttribute("aria-expanded", "false");
}

/* =========================================================
   QUOTE FILTERING AND SORTING
========================================================= */

function initializeQuoteComparison() {
  const typeFilter = document.getElementById("quoteTypeFilter");
  const sortSelect = document.getElementById("quoteSort");
  const quoteCards = document.getElementById("quoteCards");
  const compareButton = document.getElementById("compareSelectedBtn");
  const compareCount = document.getElementById("compareCount");
  const compareResults = document.getElementById("compareResults");
  const closeCompare = document.getElementById("closeCompare");

  if (!quoteCards) {
    return;
  }

  const getCards = () => [...quoteCards.querySelectorAll(".quote-card")];

  function updateCompareCount() {
    const selected = document.querySelectorAll(".quote-select:checked").length;

    if (compareCount) {
      compareCount.textContent = selected;
    }

    if (compareButton) {
      compareButton.setAttribute(
        "aria-label",
        `Compare ${selected} selected quotes`
      );
    }
  }

  function filterAndSortQuotes() {
    const selectedType = typeFilter?.value || "all";
    const sortMode = sortSelect?.value || "recommended";
    const cards = getCards();

    cards.forEach((card) => {
      const matchesType =
        selectedType === "all" || card.dataset.type === selectedType;

      card.hidden = !matchesType;
    });

    const sortedCards = [...cards].sort((a, b) => {
      const priceA = Number(a.dataset.price || 0);
      const priceB = Number(b.dataset.price || 0);
      const coverA = Number(a.dataset.cover || 0);
      const coverB = Number(b.dataset.cover || 0);

      if (sortMode === "price-low") {
        return priceA - priceB;
      }

      if (sortMode === "cover-high") {
        return coverB - coverA;
      }

      return 0;
    });

    sortedCards.forEach((card) => quoteCards.appendChild(card));
  }

  typeFilter?.addEventListener("change", filterAndSortQuotes);
  sortSelect?.addEventListener("change", filterAndSortQuotes);

  quoteCards.addEventListener("change", (event) => {
    if (event.target.matches(".quote-select")) {
      updateCompareCount();
    }
  });

  compareButton?.addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".quote-select:checked")];

    if (selected.length < 2) {
      showToast("Select at least two quotes to compare.");
      return;
    }

    if (compareResults) {
      compareResults.hidden = false;
      compareResults.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  closeCompare?.addEventListener("click", () => {
    if (compareResults) {
      compareResults.hidden = true;
    }
  });

  document.querySelectorAll(".save-quote").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".quote-card");
      const name = card?.querySelector("h3")?.textContent || "Quote";

      button.innerHTML = '<i data-lucide="bookmark-check"></i> Saved';
      button.classList.add("quote-saved");

      showToast(`${name} saved in this preview.`);

      refreshIcons();
    });
  });

  const filterBestValue = document.getElementById("quoteFilterBtn");

  filterBestValue?.addEventListener("click", () => {
    if (typeFilter) {
      typeFilter.value = "all";
    }

    if (sortSelect) {
      sortSelect.value = "price-low";
    }

    filterAndSortQuotes();
    showToast("Quotes sorted by annual premium.");
  });

  updateCompareCount();
  filterAndSortQuotes();
}

/* =========================================================
   DASHBOARD SEARCH
========================================================= */

function initializeSearch() {
  const searchInput = document.getElementById("dashboardSearch");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const activePanel = document.querySelector(".dashboard-panel.active");

    if (!activePanel) {
      return;
    }

    activePanel
      .querySelectorAll(
        ".dashboard-card, .stat-card, .quote-row, .task-item, .policy-mini, .activity-item"
      )
      .forEach((item) => {
        const matches = item.textContent.toLowerCase().includes(query);
        item.hidden = query !== "" && !matches;
      });
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
    }
  });
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function initializeNotifications() {
  const notificationButton = document.getElementById("notificationBtn");

  notificationButton?.addEventListener("click", () => {
    showToast(
      "You are viewing sample notifications. Live alerts are not connected."
    );
  });
}

/* =========================================================
   FORMS AND SAMPLE ACTIONS
========================================================= */

function initializeForms() {
  const profileForm = document.getElementById("profileForm");

  profileForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!profileForm.reportValidity()) {
      return;
    }

    showToast("Demo only: profile changes have not been sent to a server.");
  });

  document.querySelectorAll("[data-notice]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(button.dataset.notice);
    });
  });
}

/* =========================================================
   SIGN OUT
========================================================= */

/* =========================================================
   LOGOUT — REDIRECT TO LOGIN PAGE
========================================================= */

function initializeLogout() {
  const logoutButtons = [
    document.getElementById("logoutBtn"),
    document.getElementById("profileLogout"),
  ].filter(Boolean);

  logoutButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      closeProfileDropdown();
      closeMobileSidebar();

      window.location.href = "login.html";
    });
  });
}

/* =========================================================
   CLOSE MENUS WHEN CLICKING OUTSIDE
========================================================= */

function initializeOutsideClick() {
  document.addEventListener("click", (event) => {
    const dropdown = document.querySelector(".profile-dropdown");

    if (dropdown && !dropdown.contains(event.target)) {
      closeProfileDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProfileDropdown();
      closeMobileSidebar();
    }
  });
}