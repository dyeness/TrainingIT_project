import { initCalculator, resetCalculator } from "./calculator.js";

export function initTourModal() {
  const modal = document.getElementById("tour-modal");
  const closeModal = document.querySelector(".close-modal");
  const detailButtons = document.querySelectorAll(".tour-card .btn-outline");

  const closeTourModal = () => {
    modal?.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  // Инициализируем калькулятор 1 раз
  initCalculator();

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      resetCalculator();

      const card = btn.closest(".tour-card");
      const title = card?.querySelector("h3")?.innerText || "Тур";
      const desc = card?.querySelector("p")?.innerText || "";

      const titleEl = document.getElementById("modal-title");
      const descEl = document.getElementById("modal-desc");

      if (titleEl) titleEl.innerText = title;
      if (descEl) {
        descEl.innerText =
          desc + " Відкрийте для себе красу Карпат з нашою ексклюзивною програмою.";
      }

      modal?.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeModal?.addEventListener("click", closeTourModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeTourModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTourModal();
  });
}
