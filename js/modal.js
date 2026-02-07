// js/modal.js

export function initTourModal() {
  const modal = document.getElementById('tour-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');

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
