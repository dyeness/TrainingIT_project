export function initRequestsModal() {
  const openBtn = document.getElementById("open-requests");
  const modal = document.getElementById("requests-modal");
  const closeBtn = modal?.querySelector(".close-modal");
  const container = document.getElementById("requests-container");
  const clearBtn = document.getElementById("clear-requests");
  document.addEventListener("languageChanged", () => {
  renderRequests();
});


  if (!openBtn || !modal || !container) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    renderRequests();
  });

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function renderRequests() {
    const data = JSON.parse(localStorage.getItem("gw_requests") || "[]");
    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<p style='opacity:.6'>Заявок поки немає</p>";
      return;
    }

    data.reverse().forEach(r => {
      const card = document.createElement("div");
      card.className = "price-card";

      card.innerHTML = `
  <div class="price-value" style="font-size:18px;">
    ${new Date(r.createdAt).toLocaleString()}
  </div>

  <p><strong>${i18n.t("crm.name")}:</strong> ${r.name}</p>
  <p><strong>${i18n.t("crm.phone")}:</strong> ${r.phone}</p>
  <p><strong>${i18n.t("crm.tour")}:</strong> ${r.booking?.tourTitle || "—"}</p>
  <p><strong>${i18n.t("crm.plan")}:</strong> ${r.booking?.plan || "—"}</p>
  <p><strong>${i18n.t("crm.people")}:</strong> ${r.booking?.people || "—"}</p>
  <p><strong>${i18n.t("crm.addons")}:</strong> ${(r.booking?.addons || []).join(", ") || "—"}</p>

  <button class="btn btn-outline" data-id="${r.id}">
    ${i18n.t("crm.delete")}
  </button>
`;


      card.querySelector("button").addEventListener("click", () => {
        removeRequest(r.id);
      });

      container.appendChild(card);
    });
  }

  function removeRequest(id) {
    let data = JSON.parse(localStorage.getItem("gw_requests") || "[]");
    data = data.filter(r => r.id !== id);
    localStorage.setItem("gw_requests", JSON.stringify(data));
    renderRequests();
  }

  clearBtn?.addEventListener("click", () => {
    const confirmModal = document.getElementById("confirm-modal");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");

clearBtn?.addEventListener("click", () => {
  confirmModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

confirmNo?.addEventListener("click", closeConfirm);
confirmModal?.addEventListener("click", (e) => {
  if (e.target === confirmModal) closeConfirm();
});

confirmYes?.addEventListener("click", () => {
  localStorage.removeItem("gw_requests");
  renderRequests();
  closeConfirm();
});

function closeConfirm() {
  confirmModal.classList.remove("active");
  document.body.style.overflow = "";
}

  });
}
