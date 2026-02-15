// js/validation.js - Form validation utilities

export class PhoneValidator {
  constructor() {
    // Ukrainian phone number pattern: +380 (XX) XXX XX XX
    this.phonePattern = /^\+380\s\(\d{2}\)\s\d{3}\s\d{2}\s\d{2}$/;
    this.phoneOnlyDigits = /^380\d{9}$/; // 380 + 9 digits
  }

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {object} - { isValid: boolean, message: string }
   */
  validate(phone) {
    if (!phone || phone.trim() === '') {
      return {
        isValid: false,
        message: 'Будь ласка, введіть номер телефону'
      };
    }

    const cleanPhone = phone.trim();

    // Check if matches formatted pattern
    if (this.phonePattern.test(cleanPhone)) {
      return {
        isValid: true,
        message: 'Номер телефону коректен'
      };
    }

    // Check if matches digits-only pattern
    if (this.phoneOnlyDigits.test(cleanPhone.replace(/\D/g, ''))) {
      return {
        isValid: true,
        message: 'Номер телефону коректен'
      };
    }

    // Check minimum length
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone.startsWith('+380') && !cleanPhone.startsWith('380')) {
      return {
        isValid: false,
        message: 'Номер повинен починатися з +380'
      };
    }

    if (digitsOnly.length < 11) {
      return {
        isValid: false,
        message: 'Номер занадто короткий. Має містити 10 цифр після коду країни'
      };
    }

    if (digitsOnly.length > 13) {
      return {
        isValid: false,
        message: 'Номер занадто довгий'
      };
    }

    return {
      isValid: false,
      message: 'Формат номера невірний. Використовуйте: +380 (XX) XXX XX XX'
    };
  }

  /**
   * Format phone number as user types
   * @param {string} value - Input value
   * @returns {string} - Formatted phone number
   */
  format(value) {
    // Remove all non-digits
    let digits = value.replace(/\D/g, '');

    // If input starts with 0 (like 0971234567), replace with 38
    if (digits.startsWith('0')) {
      digits = '38' + digits.substring(1);
    }

    // If input has less than 380 prefix, add it
    if (!digits.startsWith('380')) {
      // If starts with just 8 (like 8097123456), replace with 380
      if (digits.startsWith('8')) {
        digits = '3' + digits;
      }
      // If starts with 38 (but not 380), add 0
      else if (digits.startsWith('38') && !digits.startsWith('380')) {
        digits = '380' + digits.substring(2);
      }
      // Otherwise add 380 prefix
      else if (!digits.startsWith('38')) {
        digits = '380' + digits;
      }
    }

    // Limit to exactly 12 digits (380 + 9 more digits for Ukrainian phone)
    if (digits.length > 12) {
      digits = digits.substring(0, 12);
    }

    // Format: +380 (XX) XXX XX XX
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '+' + digits;
    if (digits.length === 4) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3);
    if (digits.length === 5) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ')';
    if (digits.length === 6) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5);
    if (digits.length === 7) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 7);
    if (digits.length === 8) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 8);
    if (digits.length === 9) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 8) + ' ' + digits.substring(8);
    if (digits.length === 10) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 8) + ' ' + digits.substring(8, 10);
    if (digits.length === 11) return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 8) + ' ' + digits.substring(8, 10) + ' ' + digits.substring(10);

    return '+' + digits.substring(0, 3) + ' (' + digits.substring(3, 5) + ') ' + digits.substring(5, 8) + ' ' + digits.substring(8, 10) + ' ' + digits.substring(10, 12);
  }

  /**
   * Get digits only from phone number
   * @param {string} phone - Phone number
   * @returns {string} - Digits only
   */
  getDigitsOnly(phone) {
    return phone.replace(/\D/g, '');
  }
}

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export function validateName(name) {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      message: 'Будь ласка, введіть ім\'я'
    };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      message: 'Ім\'я повинно містити щонайменше 2 символи'
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      message: 'Ім\'я занадто довге'
    };
  }

  // Check if contains only letters, spaces, hyphens
  if (!/^[a-яіїєґ\s\-']+$/i.test(name)) {
    return {
      isValid: false,
      message: 'Ім\'я містить недозволені символи'
    };
  }

  return {
    isValid: true,
    message: 'Ім\'я коректне'
  };
}

/**
 * Validate entire form
 * @param {string} name - Name field value
 * @param {string} phone - Phone field value
 * @returns {object} - { isValid: boolean, errors: object }
 */
export function validateForm(name, phone) {
  const phoneValidator = new PhoneValidator();
  const errors = {};

  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  const phoneValidation = phoneValidator.validate(phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
