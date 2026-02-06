let peopleCount = 1;

export function resetCalculator() {
  peopleCount = 1;

  const peopleCountEl = document.getElementById("people-count");
  const addons = document.querySelectorAll(".addon-check");

  if (peopleCountEl) peopleCountEl.innerText = "1";
  addons.forEach((ad) => (ad.checked = false));

  updatePrices();
}

export function initCalculator() {
  const peopleCountEl = document.getElementById("people-count");
  const plusBtn = document.querySelector(".count-btn.plus");
  const minusBtn = document.querySelector(".count-btn.minus");
  const addons = document.querySelectorAll(".addon-check");

  // Важно: updatePrices вызовется уже после объявлений внутри updatePrices
  updatePrices();

  plusBtn?.addEventListener("click", () => {
    if (peopleCount < 10) {
      peopleCount++;
      if (peopleCountEl) peopleCountEl.innerText = String(peopleCount);
      updatePrices();
    }
  });

  minusBtn?.addEventListener("click", () => {
    if (peopleCount > 1) {
      peopleCount--;
      if (peopleCountEl) peopleCountEl.innerText = String(peopleCount);
      updatePrices();
    }
  });

  addons.forEach((ad) => ad.addEventListener("change", updatePrices));
}

function updatePrices() {
  const addons = document.querySelectorAll(".addon-check");
  const priceCards = document.querySelectorAll(".price-card");

  let addonTotal = 0;
  addons.forEach((ad) => {
    if (ad.checked) addonTotal += parseInt(ad.dataset.price || "0", 10);
  });

  priceCards.forEach((card) => {
    const base = parseInt(card.dataset.base || "0", 10);
    const finalPrice = (base * peopleCount) + (addonTotal * peopleCount);

    const priceDisplay = card.querySelector(".price-value span");
    if (priceDisplay) {
      priceDisplay.innerText = finalPrice.toLocaleString("ru-RU");
      priceDisplay.style.transform = "scale(1.1)";
      setTimeout(() => (priceDisplay.style.transform = "scale(1)"), 100);
    }
  });
}
