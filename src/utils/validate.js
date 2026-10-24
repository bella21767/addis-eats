export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  }

  const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;
  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone number is required.";
  } else if (!phoneRegex.test(form.phone.trim())) {
    errors.phone =
      "Must be a valid TeleBirr number (e.g., 0911223344 or +251911223344).";
  }

  if (!form.area.trim()) {
    errors.area = "Delivery area is required.";
  }

  if (!form.address.trim()) {
    errors.address = "Specific street or house address is required.";
  }

  return errors;
}
