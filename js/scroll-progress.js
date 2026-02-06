export function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress");
  const mountainPath = document.getElementById("mountain-path");

  let pathLength = 0;
  if (mountainPath) {
    pathLength = mountainPath.getTotalLength();
    mountainPath.style.strokeDasharray = pathLength;
    mountainPath.style.strokeDashoffset = pathLength;
  }

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height ? winScroll / height : 0;

    if (progressBar) progressBar.style.width = (scrolled * 100) + "%";
    if (mountainPath) mountainPath.style.strokeDashoffset = pathLength - (pathLength * scrolled);
  });
}
