/* Manual carousel: native scrolling first, optional buttons and keyboard shortcuts. */
(() => {
  const carousel = document.querySelector("[data-reviews-carousel]");
  if (!carousel) return;
  const track = carousel.querySelector("[data-reviews-track]");
  const slides = [...track.querySelectorAll(".review-slide")];
  const previous = carousel.querySelector("[data-review-prev]");
  const next = carousel.querySelector("[data-review-next]");
  const position = carousel.querySelector("[data-review-position]");
  const controls = carousel.querySelector("[data-reviews-controls]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let announceTimer;
  let frame;
  const step = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  const update = () => {
    const width = step();
    const first = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / width)));
    const visible = Math.max(1, Math.round((track.clientWidth + 20) / width));
    const last = Math.min(slides.length, first + visible);
    previous.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    position.textContent = last === first + 1 ? `Review ${first + 1} of ${slides.length}` : `Reviews ${first + 1}–${last} of ${slides.length}`;
  };
  const move = direction => {
    const target = direction === "start" ? 0 : direction === "end" ? track.scrollWidth : track.scrollLeft + direction * step();
    track.scrollTo({ left: Math.max(0, Math.min(target, track.scrollWidth - track.clientWidth)), behavior: reducedMotion.matches ? "auto" : "smooth" });
  };
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  track.addEventListener("keydown", event => {
    if (event.target !== track) return;
    const actions = { ArrowLeft: -1, ArrowRight: 1, Home: "start", End: "end" };
    if (event.key in actions) {
      event.preventDefault();
      move(actions[event.key]);
    }
  });
  track.addEventListener("scroll", () => {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(update, 180);
  }, { passive: true });
  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  });
  controls.hidden = false;
  update();
})();
