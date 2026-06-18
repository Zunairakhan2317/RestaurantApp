(function () {
  const componentUrl = "components/loader.html";

  function placeBackToTop(button) {
    const footer = document.getElementById("footer");
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(button, footer);
      return true;
    }
    return false;
  }

  function watchFooterPlacement(button) {
    if (placeBackToTop(button)) return;
    const observer = new MutationObserver(() => {
      if (placeBackToTop(button)) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function insertLoader(html) {
    if (document.getElementById("page-loader")) return;
    const container = document.createElement("div");
    container.innerHTML = html;
    const loader = container.querySelector("#page-loader");
    const backToTop = container.querySelector("#back-to-top");

    if (loader) {
      if (document.body.firstChild) {
        document.body.insertBefore(loader, document.body.firstChild);
      } else {
        document.body.appendChild(loader);
      }
      startHideTimer();
    }

    if (backToTop) {
      if (!placeBackToTop(backToTop)) {
        document.body.appendChild(backToTop);
        watchFooterPlacement(backToTop);
      }
    }
  }

  let loaderTimerId = null;

  function startHideTimer() {
    if (loaderTimerId) return;
    loaderTimerId = window.setTimeout(hideLoader, 1400);
  }

  function createFallbackLoader() {
    if (document.getElementById("page-loader")) return;
    const loader = document.createElement("div");
    loader.id = "page-loader";
    loader.className = "page-loader";
    loader.setAttribute("aria-hidden", "false");
    loader.setAttribute("aria-label", "Loading website");
    loader.innerHTML = `
      <div class="loader-inner">
        <div class="spinner" aria-hidden="true"></div>
        <div class="loader-text">Loading...</div>
      </div>
    `;
    if (document.body.firstChild) {
      document.body.insertBefore(loader, document.body.firstChild);
    } else {
      document.body.appendChild(loader);
    }
    startHideTimer();

    const backToTop = document.getElementById("back-to-top");
    if (!backToTop) {
      const fallbackButton = document.createElement("button");
      fallbackButton.id = "back-to-top";
      fallbackButton.type = "button";
      fallbackButton.title = "Back to top";
      fallbackButton.setAttribute("aria-label", "Back to top");
      fallbackButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z" fill="currentColor" />
        </svg>
      `;
      document.body.appendChild(fallbackButton);
      watchFooterPlacement(fallbackButton);
    }
  }

  function hideLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader || loader.classList.contains("loaded")) return;
    loader.classList.add("loaded");
    loader.addEventListener("transitionend", () => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    });
  }

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return false;
    if (btn.dataset.initialized) return true;
    btn.dataset.initialized = "true";

    const showAt = 250;
    const toggleVisibility = () => {
      if (window.scrollY > showAt) btn.classList.add("visible");
      else btn.classList.remove("visible");
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return true;
  }

  function watchBackToTop() {
    if (initBackToTop()) return;
    const observer = new MutationObserver(() => {
      if (initBackToTop()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function initScrollReveal() {
    const elements = Array.from(
      document.querySelectorAll(
        "main section, .dish-card, .team-card, .testimonial, .menu-card, .info-card, .contact-section, .about-intro, .story-section",
      ),
    );
    if (!elements.length) return;

    elements.forEach((el) => {
      el.classList.add("scroll-reveal");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((el) => revealObserver.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    watchBackToTop();
    initScrollReveal();
  });

  fetch(componentUrl)
    .then((response) => response.text())
    .then(insertLoader)
    .catch(() => createFallbackLoader());
})();
