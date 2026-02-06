export function initReviewsSlider() {
  const slider = document.querySelector(".reviews-scroll");
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velocity = 0;
  let rafID;

  const slowDown = () => {
    if (Math.abs(velocity) > 0.1) {
      slider.scrollLeft += velocity;
      velocity *= 0.95;
      rafID = requestAnimationFrame(slowDown);
    } else {
      slider.style.scrollSnapType = "x mandatory";
    }
  };

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("is-dragging");
    slider.style.scrollSnapType = "none";

    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    cancelAnimationFrame(rafID);
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;

    const oldScroll = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - walk;

    velocity = slider.scrollLeft - oldScroll;
  });

  const stopDragging = () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove("is-dragging");

    if (Math.abs(velocity) > 1) {
      rafID = requestAnimationFrame(slowDown);
    } else {
      slider.style.scrollSnapType = "x mandatory";
    }
  };

  slider.addEventListener("mouseup", stopDragging);
  slider.addEventListener("mouseleave", stopDragging);

  slider.addEventListener("click", (e) => {
    if (Math.abs(velocity) > 3) e.preventDefault();
  });
}
