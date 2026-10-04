(() => {
  // A custom 404 response can live at a nested URL while using a site-wide base.
  const skipLink = document.querySelector(".skip-link");
  if (skipLink && document.querySelector("base")) skipLink.href = new URL("#main", location.href).href;
  const button = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-mobile-nav]");
  const closeMenu = () => {
    navigation?.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
    if (button) button.querySelector("span").textContent = "Menu";
  };

  button?.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
    button.querySelector("span").textContent = open ? "Close" : "Menu";
  });
  navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation?.classList.contains("is-open")) {
      closeMenu();
      button.focus();
    }
  });
  window.matchMedia("(min-width: 876px)").addEventListener("change", event => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const serviceTabs = [...document.querySelectorAll("[data-service-tab]")];
  const activateService = activeTab => {
    serviceTabs.forEach(tab => {
      const active = tab === activeTab;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    });
  };
  serviceTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateService(tab));
    tab.addEventListener("keydown", event => {
      let nextIndex;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % serviceTabs.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = serviceTabs.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        activateService(serviceTabs[nextIndex]);
        serviceTabs[nextIndex].focus();
      }
    });
  });

  const inquiryForm = document.querySelector(".project-form");
  if (inquiryForm) {
    const textFields = ["name", "message"].map(name => inquiryForm.elements.namedItem(name));
    textFields.forEach(field => field.addEventListener("input", () => field.setCustomValidity("")));
    const submit = inquiryForm.querySelector("button[type=submit]");
    const submitLabel = submit.textContent;
    inquiryForm.addEventListener("submit", event => {
      textFields.forEach(field => field.setCustomValidity(field.value.trim() ? "" : "Please enter this detail, not just spaces."));
      if (!inquiryForm.checkValidity()) {
        event.preventDefault();
        inquiryForm.reportValidity();
        return;
      }
      // Keep the native POST and CAPTCHA. Never show a fake delivery confirmation.
      submit.disabled = true;
      submit.textContent = "Continue to verification…";
    });
    window.addEventListener("pageshow", () => {
      submit.disabled = false;
      submit.textContent = submitLabel;
    });
  }

  // One-shot, progressive motion. Content stays visible if JS or an observer fails.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    const selector = [
      "[data-reveal]", ".section-heading", ".selected-project", ".stack-core",
      ".directory-row", ".service-art", ".detail-content > section", ".about-working-note",
      ".timeline li", ".case-list-row", ".showcase-project", ".case-image",
      ".narrative-grid", ".blog-card", ".article-banner", ".closing-grid"
    ].join(",");
    const items = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-enter");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    motionPreference.addEventListener("change", event => {
      if (event.matches) observer.disconnect();
    });
  }
})();
