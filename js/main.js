import { initTheme } from "./theme.js";
import { initHoverBg } from "./hover-bg.js";
import { initTourModal } from "./modal.js";
import { initWeather } from "./weather.js";
import { initCursor } from "./cursor.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initReviewsSlider } from "./slider.js";
import { initPromoTimer } from "./timer.js";
import { initRequestsModal } from "./requests.js";



document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHoverBg();
  initTourModal();     // внутри подключит калькулятор
  initWeather();
  initCursor();
  initScrollProgress();
  initReviewsSlider();
  initPromoTimer();
  initRequestsModal();
});
const form = document.querySelector("#contact form");
const successModal = document.getElementById("success-modal");

if (form && successModal) {
  const closeButtons = successModal.querySelectorAll(
    ".close-success, .close-success-btn"
  );

  form.addEventListener("submit", (e) => {
  e.preventDefault();

  // берём данные формы
  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();

  // собираем заявку
  const request = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    booking: window.bookingState || {}
  };

  // берём уже сохранённые заявки
  const existing = JSON.parse(localStorage.getItem("gw_requests") || "[]");

  // добавляем новую
  existing.push(request);

  // сохраняем обратно
  localStorage.setItem("gw_requests", JSON.stringify(existing));

  // показываем success
  successModal.classList.add("active");
  document.body.classList.add("modal-open");

  form.reset();
  window.bookingState = {};

});


  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("active");

      document.body.classList.remove("modal-open");
    }
  });
}
