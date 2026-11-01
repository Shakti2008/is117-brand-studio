"use strict";

(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = document.querySelectorAll("[data-reveal]");
  let observer;
  const settle = (target) => {
    if (!target) return;
    observer?.unobserve(target);
    target.classList.remove("reveal-waiting", "reveal-arrived");
    target.classList.add("reveal-settled");
  };
  const stop = () => {
    observer?.disconnect();
    targets.forEach(settle);
  };
  if (!preference.matches && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-waiting");
          entry.target.classList.add("reveal-arrived");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((target) => {
      // All content stays visible; only transforms are enhanced on entry.
      target.querySelectorAll("[data-reveal-item]").forEach((item, index) => {
        // Never translate an interactive element or any ancestor holding one.
        if (
          item.matches("a, button, input, select, textarea, [tabindex]") ||
          item.querySelector("a, button, input, select, textarea, [tabindex]")
        ) {
          item.removeAttribute("data-reveal-item");
          item.setAttribute("data-reveal-control", "");
          return;
        }
        item.style.setProperty(
          "--reveal-delay",
          target.classList.contains("bag-section")
            ? `${item.matches("h2") ? 0 : 90}ms`
            : `${Math.min(index, 4) * 100}ms`,
        );
      });
      target.classList.add("reveal-waiting");
      observer.observe(target);
    });
    document.addEventListener("focusin", (event) => {
      settle(event.target.closest("[data-reveal]"));
    });
    window.addEventListener("hashchange", () => {
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      settle(document.getElementById(id)?.closest("[data-reveal]"));
    });
  }
  preference.addEventListener("change", stop);

  const controls = document.querySelector("#intention-controls");
  if (!controls) return;
  const message = document.querySelector("#intention-message");
  const clear = document.querySelector("#clear-intention");
  const buttons = controls.querySelectorAll("[data-intention]");
  const messages = {
    focus:
      "Focus: one step is enough to begin. If it suits your day, try the white tee with a simple, familiar outfit and leave room for what matters to you.",
    explore:
      "Explore: leave room for a new direction. If it suits your day, try the white tee with a color or layer you enjoy. Keep what feels like you.",
  };
  controls.hidden = false;
  document.querySelector("#intention-fallback").hidden = true;
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      message.textContent = messages[button.dataset.intention];
      clear.hidden = false;
    }),
  );
  clear.addEventListener("click", () => {
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    message.textContent = "Choose a word, if it feels useful.";
    clear.hidden = true;
    buttons[0].focus();
  });
})();
