import { initTheme } from "./theme.js";
import { initHoverBg } from "./hover-bg.js";
import { initTourModal } from "./modal.js";
import { initWeather } from "./weather.js";
import { initCursor } from "./cursor.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initReviewsSlider } from "./slider.js";
import { initPromoTimer } from "./timer.js";


document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHoverBg();
  initTourModal();     // внутри подключит калькулятор
  initWeather();
  initCursor();
  initScrollProgress();
  initReviewsSlider();
  initPromoTimer();
});
const form = document.querySelector("#contact form");
const successModal = document.getElementById("success-modal");

if (form && successModal) {
  const closeButtons = successModal.querySelectorAll(
    ".close-success, .close-success-btn"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    successModal.classList.add("active");
    document.body.classList.add("modal-open");

    form.reset();
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  });
}
