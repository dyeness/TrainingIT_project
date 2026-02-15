// js/form-handler.js - Form handling with validation and localStorage storage

import { PhoneValidator, validateForm } from "./validation.js";

export function initFormHandler() {
  const form = document.querySelector("#contact form");
  const successModal = document.getElementById("success-modal");
  const nameInput = form?.querySelector('input[type="text"]');
  const phoneInput = form?.querySelector('input[type="tel"]');

  if (!form || !successModal) return;

  const phoneValidator = new PhoneValidator();
  let errorStates = { name: false, phone: false };

  // Format phone number as user types
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      const formatted = phoneValidator.format(e.target.value);
      e.target.value = formatted;
      clearPhoneError();
    });

    phoneInput.addEventListener("blur", () => {
      validatePhoneField();
    });

    phoneInput.addEventListener("focus", () => {
      clearPhoneError();
    });
  }

  // Clear name error on input
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      clearNameError();
    });

    nameInput.addEventListener("blur", () => {
      validateNameField();
    });
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameValid = validateNameField();
    const phoneValid = validatePhoneField();

    if (!nameValid || !phoneValid) {
      console.warn('Form validation failed');
      return;
    }

    // Get form data
    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim()
    };

    // Save to localStorage
    saveSubmission(formData);

    // Show success modal
    showSuccessModal();

    // Reset form
    form.reset();
    clearAllErrors();
  });

  // Close success modal
  const closeButtons = successModal.querySelectorAll(
    ".close-success, .close-success-btn"
  );

  closeButtons.forEach(btn => {
    btn.addEventListener("click", closeSuccessModal);
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal.classList.contains("active")) {
      closeSuccessModal();
    }
  });

  /**
   * Validate name field
   */
  function validateNameField() {
    if (!nameInput) return true;

    const validation = validateForm(nameInput.value, "");
    const hasError = validation.errors.name;

    if (hasError) {
      showNameError(validation.errors.name);
      errorStates.name = true;
      return false;
    }

    clearNameError();
    errorStates.name = false;
    return true;
  }

  /**
   * Validate phone field
   */
  function validatePhoneField() {
    if (!phoneInput) return true;

    const validation = validateForm("", phoneInput.value);
    const hasError = validation.errors.phone;

    if (hasError) {
      showPhoneError(validation.errors.phone);
      errorStates.phone = true;
      return false;
    }

    clearPhoneError();
    errorStates.phone = false;
    return true;
  }

  /**
   * Show error for name field
   */
  function showNameError(message) {
    if (!nameInput) return;

    // Remove existing error message
    const existingError = nameInput.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();

    // Add error styling
    nameInput.classList.add("input-error");

    // Create and show error message
    const errorEl = document.createElement("div");
    errorEl.className = "error-message";
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: var(--burnt-orange);
      font-size: 12px;
      margin-top: 5px;
      margin-left: 0;
    `;
    nameInput.parentElement.appendChild(errorEl);
  }

  /**
   * Show error for phone field
   */
  function showPhoneError(message) {
    if (!phoneInput) return;

    // Remove existing error message
    const existingError = phoneInput.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();

    // Add error styling
    phoneInput.classList.add("input-error");

    // Create and show error message
    const errorEl = document.createElement("div");
    errorEl.className = "error-message";
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: var(--burnt-orange);
      font-size: 12px;
      margin-top: 5px;
      margin-left: 0;
    `;
    phoneInput.parentElement.appendChild(errorEl);
  }

  /**
   * Clear name field error
   */
  function clearNameError() {
    if (!nameInput) return;
    nameInput.classList.remove("input-error");
    const errorEl = nameInput.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.remove();
    errorStates.name = false;
  }

  /**
   * Clear phone field error
   */
  function clearPhoneError() {
    if (!phoneInput) return;
    phoneInput.classList.remove("input-error");
    const errorEl = phoneInput.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.remove();
    errorStates.phone = false;
  }

  /**
   * Clear all field errors
   */
  function clearAllErrors() {
    clearNameError();
    clearPhoneError();
  }

  /**
   * Show success modal
   */
  function showSuccessModal() {
    successModal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  /**
   * Close success modal
   */
  function closeSuccessModal() {
    successModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  /**
   * Save submission to localStorage
   */
  function saveSubmission(data) {
    try {
      const submissions = getSubmissions();
      const newSubmission = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone
      };
      submissions.push(newSubmission);
      localStorage.setItem('go-west-submissions', JSON.stringify(submissions));
      console.log('✓ Заявка сохранена:', newSubmission);
    } catch (error) {
      console.error('Error saving submission:', error);
    }
  }
}

// Global functions for console access
window.getSubmissions = () => {
  try {
    const data = localStorage.getItem('go-west-submissions');
    const submissions = data ? JSON.parse(data) : [];
    console.table(submissions);
    return submissions;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

window.exportCSV = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem('go-west-submissions') || '[]');
    if (submissions.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }
    
    const headers = ['ID', 'Имя', 'Телефон', 'Дата/Время'];
    const rows = submissions.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.phone}"`,
      `"${s.timestamp}"`
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    downloadFile(csv, 'submissions.csv', 'text/csv;charset=utf-8;');
  } catch (error) {
    console.error('Error:', error);
  }
};

window.exportJSON = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem('go-west-submissions') || '[]');
    if (submissions.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }
    
    const json = JSON.stringify(submissions, null, 2);
    downloadFile(json, 'submissions.json', 'application/json;charset=utf-8;');
  } catch (error) {
    console.error('Error:', error);
  }
};

window.clearSubmissions = () => {
  if (confirm('Вы уверены? Это удалит все заявки.')) {
    localStorage.setItem('go-west-submissions', JSON.stringify([]));
    console.log('✓ Все заявки удалены');
  }
};

// Helper function to download files
function downloadFile(content, fileName, mimeType) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:' + mimeType + ',' + encodeURIComponent(content));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


