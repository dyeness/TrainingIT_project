export function initPromoTimer() {
  const hoursEl = document.getElementById("timer-hours");
  const minutesEl = document.getElementById("timer-minutes");
  const secondsEl = document.getElementById("timer-seconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // 🔥 ЦЕЛЕВОЕ ВРЕМЯ (пример: через 6 часов)
  const targetTime = Date.now() + 6 * 60 * 60 * 1000;

  function updateTimer() {
    const now = Date.now();
    let diff = Math.max(0, targetTime - now);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;

    const seconds = Math.floor(diff / 1000);

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
