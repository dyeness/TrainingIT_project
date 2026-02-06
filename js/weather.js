export function initWeather() {
  const weatherTrigger = document.getElementById("weather-trigger");
  const weatherModal = document.getElementById("weather-modal");
  const closeWeather = document.querySelector(".close-weather");

  const API_KEY = "d72601e4f878a70b9b6b106e17ff9c50";

  async function fetchWeather(city, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!resp.ok) throw new Error("No API Key");

      const data = await resp.json();
      const temp = Math.round(data.main.temp);

      el.innerText = (temp > 0 ? "+" : "") + temp + "°";
      if (elementId === "weather-temp-mini") {
        const mini = document.getElementById("weather-temp-mini");
        if (mini) mini.innerText = temp + "°";
      }
    } catch {
      const demoTemps = {
        "temp-yaremche": 8,
        "temp-bukovel": 4,
        "temp-dragobrat": -2,
        "weather-temp-mini": 8
      };
      const val = demoTemps[elementId];
      if (typeof val === "number") el.innerText = (val > 0 ? "+" : "") + val + "°";
    }
  }

  // мини при загрузке
  fetchWeather("Yaremche", "weather-temp-mini");

  weatherTrigger?.addEventListener("click", () => {
    weatherModal?.classList.add("active");
    document.body.style.overflow = "hidden";

    fetchWeather("Yaremche", "temp-yaremche");
    fetchWeather("Polyanitsa", "temp-bukovel");
    fetchWeather("Yasinia", "temp-dragobrat");
  });

  closeWeather?.addEventListener("click", () => {
    weatherModal?.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if (e.target === weatherModal) {
      weatherModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      weatherModal?.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}
