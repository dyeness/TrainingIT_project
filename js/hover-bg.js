export function initHoverBg() {
  const bgHoverLayer = document.querySelector(".bg-hover");
  const tourCards = document.querySelectorAll(".tour-card");

  tourCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const imgPath = card.getAttribute("data-bg");
      if (imgPath && bgHoverLayer) {
        bgHoverLayer.style.backgroundImage = `url('${imgPath}')`;
        bgHoverLayer.style.opacity = "1";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (bgHoverLayer) bgHoverLayer.style.opacity = "0";
    });
  });
}
