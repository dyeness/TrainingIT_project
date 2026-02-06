export function initCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (!cursorDot || !cursorOutline) return;

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      { left: `${posX}px`, top: `${posY}px` },
      { duration: 400, fill: "forwards" }
    );
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .tour-card, .weather-compact, .count-btn, .option-item, .close-modal, .close-weather"
  );

  const checkboxItems = document.querySelectorAll(".option-item");

checkboxItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    cursorOutline.classList.add("cursor-checkbox");
  });

  item.addEventListener("mouseleave", () => {
    cursorOutline.classList.remove("cursor-checkbox");
  });
});

const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
  input.addEventListener("mouseenter", () => {
    cursorDot.classList.add("cursor-hidden-dot");
    cursorOutline.classList.add("cursor-hidden");
  });

  input.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("cursor-hidden-dot");
    cursorOutline.classList.remove("cursor-hidden");
  });
});



  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.backgroundColor = "rgba(255, 102, 0, 0.1)";
      cursorDot.style.backgroundColor = "#ffffff";
    });

    el.addEventListener("mouseleave", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.backgroundColor = "transparent";
      cursorDot.style.backgroundColor = "var(--burnt-orange)";
    });
  });
}
