import { initTheme } from "./theme.js";
import { initHoverBg } from "./hover-bg.js";
import { initTourModal } from "./modal.js";
import { initWeather } from "./weather.js";
import { initCursor } from "./cursor.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initReviewsSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHoverBg();
  initTourModal();     // внутри подключит калькулятор
  initWeather();
  initCursor();
  initScrollProgress();
  initReviewsSlider();
});
