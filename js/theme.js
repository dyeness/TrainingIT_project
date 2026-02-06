export function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "light") {
    body.setAttribute("data-theme", "light");
  }

  themeToggle?.addEventListener("click", () => {
    if (body.hasAttribute("data-theme")) {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}
