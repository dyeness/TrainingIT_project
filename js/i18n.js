// js/i18n.js

let currentLang = localStorage.getItem("lang") || "ua";
let currentDict = {};

// ===== ЗАГРУЗКА ЯЗЫКА =====
async function loadLang(lang) {
  const res = await fetch(`./lang/${lang}.json`);
  const data = await res.json();

  currentDict = data;

  // обычный текст
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.dataset.i18n.split(".");
    let value = data;
    for (const k of keys) value = value?.[k];
    if (value) el.textContent = value;
  });

  // placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const keys = el.dataset.i18nPlaceholder.split(".");
    let value = data;
    for (const k of keys) value = value?.[k];
    if (value) el.placeholder = value;
  });

  // активная кнопка языка
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("lang", lang);
  currentLang = lang;

  // 🔥 КЛЮЧЕВОЕ СОБЫТИЕ
  document.dispatchEvent(new Event("languageChanged"));
}

// ===== PUBLIC API ДЛЯ JS (modal.js) =====
window.i18n = {
  t(key) {
    const keys = key.split(".");
    let value = currentDict;
    for (const k of keys) value = value?.[k];
    return value ?? key;
  },
  getLang() {
    return currentLang;
  }
};

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  loadLang(currentLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang !== currentLang) {
        loadLang(lang);
      }
    });
  });
});
