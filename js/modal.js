// js/modal.js

import { initCalculator, resetCalculator } from "./calculator.js";

export function initTourModal() {
  const modal = document.getElementById('tour-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
  const continueBtn = document.getElementById("continue-booking");


  let currentTourKey = null;





  const toursData = {
    card1: {
      titleKey: 'tours.card1.title',
      descKey: 'tours.card1.fullDesc'
    },
    card2: {
      titleKey: 'tours.card2.title',
      descKey: 'tours.card2.fullDesc'
    }
  };

  document.querySelectorAll('.tour-card .btn').forEach((btn, index) => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      currentTourKey = index === 0 ? 'card1' : 'card2';
      openModal(currentTourKey);
    });
  });

  function openModal(tourKey) {
    const tour = toursData[tourKey];
    if (!tour) return;

    modalTitle.textContent = i18n.t(tour.titleKey);
    modalDesc.textContent = i18n.t(tour.descKey);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    resetCalculator();
    initCalculator();

    // ===== активируем выбор формата при открытии модалки
const planButtons = modal.querySelectorAll(".select-plan");

planButtons.forEach(btn => {
  btn.onclick = () => {

    const card = btn.closest(".price-card");
    const planName = card.querySelector("h4").innerText;

    // сохраняем выбранный формат
    window.bookingState = window.bookingState || {};
    window.bookingState.plan = planName;

    // убираем выделение со всех
    modal.querySelectorAll(".price-card").forEach(c =>
      c.classList.remove("selected-plan")
    );

    // выделяем текущий
    card.classList.add("selected-plan");
  };
});

// ===== кнопка завершения шага
continueBtn.onclick = () => {

  const people =
    parseInt(document.getElementById("people-count")?.textContent || "1", 10);

  const addons = Array.from(
    modal.querySelectorAll(".addon-check:checked")
  ).map(el => el.parentElement.innerText.trim());

  window.bookingState = window.bookingState || {};
  window.bookingState.tourTitle = modalTitle.textContent;
  window.bookingState.people = people;
  window.bookingState.addons = addons;

  closeModal();

  // прокрутка к форме
  document.getElementById("contact")
    ?.scrollIntoView({ behavior: "smooth" });

  fillSummary();
};


  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('languageChanged', () => {
    if (!currentTourKey) return;
    const tour = toursData[currentTourKey];
    modalTitle.textContent = i18n.t(tour.titleKey);
    modalDesc.textContent = i18n.t(tour.descKey);
  });
}

function fillSummary() {
  const box = document.getElementById("selected-tour-summary");
  if (!box || !window.bookingState) return;

  const s = window.bookingState;

  box.style.display = "block";

  box.innerHTML = `
    <strong>Ви цікавитесь подорожжю:</strong><br>
    ${s.tourTitle || "—"}<br><br>

    <strong>Формат:</strong> ${s.plan || "—"}<br>
    <strong>Кількість осіб:</strong> ${s.people || "—"}<br>
    <strong>Додатково:</strong> ${s.addons?.length ? s.addons.join(", ") : "—"}
  `;
}
