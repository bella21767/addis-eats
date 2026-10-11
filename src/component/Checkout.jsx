import { useState, useRef } from "react";
import { useCartStore } from "../store/cartStore";
import { validate } from "../utils/validate";
import Field from "./Field";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    address: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
    address: useRef(null),
  };

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  const show = (field) => Boolean(touched[field] && errors[field]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    if (hasErrors) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        address: true,
      });

      const firstErrorField = Object.keys(errors)[0];
      fieldRefs[firstErrorField]?.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clear();
      setIsSuccess(true);
    } catch {
      setSubmitError(
        "Network error. Please try again without losing your information.",
      );
      const firstField = Object.keys(fieldRefs)[0];
      fieldRefs[firstField]?.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div>
        <h2>Order Received!</h2>
        <p>Thank you for ordering with Addis Eats. Your food is on its way!</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h2>Checkout</h2>
        <p>Your cart is empty. Please add dishes from the menu first.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Complete Your Checkout</h2>

      {submitError && (
        <p role="alert" style={{ color: "red", fontWeight: "bold" }}>
          {submitError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Field
          ref={fieldRefs.name}
          id="name"
          name="name"
          label="Full Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          showError={show("name")}
          placeholder="Abebe Kebede"
        />

        <Field
          ref={fieldRefs.phone}
          id="phone"
          name="phone"
          type="tel"
          label="TeleBirr Phone Number"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          showError={show("phone")}
          placeholder="0911223344 or +251911223344"
        />

        <Field
          ref={fieldRefs.area}
          id="area"
          name="area"
          label="Delivery Area / Sub-City"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.area}
          showError={show("area")}
          placeholder="Bole, CMC, Kazanchis"
        />

        <Field
          ref={fieldRefs.address}
          id="address"
          name="address"
          label="Street / House Number"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
          showError={show("address")}
          placeholder="House 123, near Edna Mall"
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "1rem",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Placing Order..." : `Pay and Order (${total} ETB)`}
        </button>
      </form>
    </div>
  );
}
