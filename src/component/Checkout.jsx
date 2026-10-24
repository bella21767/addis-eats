import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { validate } from "../utils/validate";
import { calcTotals } from "../utils/pricing";
import Field from "./Field";

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const { subtotal, delivery, total } = calcTotals(items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    address: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const show = (field) => Boolean(touched[field] && errors[field]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    if (hasErrors) {
      setTouched({ name: true, phone: true, area: true, address: true });
      const firstErrorField = Object.keys(errors)[0];
      fieldRefs[firstErrorField]?.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const order = {
        id: "AE-" + Date.now().toString().slice(-6),
        customer: form.name,
        area: form.area,
        address: form.address,
        items,
        subtotal,
        delivery,
        total,
      };

      clear();
      navigate("/receipt", { state: { order }, replace: true });
    } catch {
      setSubmitError(
        "Network error. Please try again without losing your information."
      );
      fieldRefs.name.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="empty">
        <span>🛒</span>
        <h2>Checkout</h2>
        <p>Your cart is empty. Please add dishes from the menu first.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Complete Your Checkout</h2>

      {submitError && (
        <p role="alert" className="status error">
          {submitError}
        </p>
      )}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} noValidate className="checkout-form">
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

          <button type="submit" disabled={submitting} className="block">
            {submitting ? "Placing Order..." : `Pay and Order (${total} ETB)`}
          </button>
        </form>

        <aside className="summary">
          <h3>Your Order</h3>
          {items.map((item) => (
            <div className="sum-line" key={item.id}>
              <span>{item.qty} × {item.name}</span>
              <span>{item.price * item.qty} ETB</span>
            </div>
          ))}
          <hr />
          <div className="sum-line"><span>Subtotal</span><span>{subtotal} ETB</span></div>
          <div className="sum-line"><span>Delivery</span><span>{delivery} ETB</span></div>
          <div className="sum-line total"><span>Total</span><span>{total} ETB</span></div>
        </aside>
      </div>
    </div>
  );
}