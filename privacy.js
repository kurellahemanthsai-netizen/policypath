
/* =========================================================
   POLICYPATH — PRIVACY POLICY JS
   Lucide Icons | Smooth Navigation | Active TOC | Footer
========================================================= */

"use strict";

/* =========================================================
   REFRESH LUCIDE ICONS
========================================================= */

function refreshPrivacyIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/* =========================================================
   TABLE OF CONTENTS
========================================================= */

function initializePrivacyNavigation() {
  const links = document.querySelectorAll(".toc-nav a");

  if (!links.length) {
    return;
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = 25;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"
      });

      links.forEach((item) => {
        item.classList.remove("is-active");
      });

      link.classList.add("is-active");

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", targetId);
      }
    });
  });

  /* Highlight the first item by default */
  links[0].classList.add("is-active");
}

/* =========================================================
   ACTIVE SECTION OBSERVER
========================================================= */

function initializePrivacySectionObserver() {
  const links = document.querySelectorAll(".toc-nav a");
  const sections = document.querySelectorAll(".policy-section");

  if (
    !links.length ||
    !sections.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const linkById = new Map();

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      linkById.set(href.substring(1), link);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        );

      if (!visibleSections.length) {
        return;
      }

      const currentSection = visibleSections[0].target;
      const activeLink = linkById.get(currentSection.id);

      if (!activeLink) {
        return;
      }

      links.forEach((link) => {
        link.classList.toggle("is-active", link === activeLink);
      });
    },
    {
      root: null,
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/* =========================================================
   COPYRIGHT YEAR
========================================================= */

function initializePrivacyCopyright() {
  const yearElement = document.getElementById(
    "privacyCopyrightYear"
  );

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  refreshPrivacyIcons();
  initializePrivacyNavigation();
  initializePrivacySectionObserver();
  initializePrivacyCopyright();
});
