import { useState } from "react";

export default function OrderForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const isValidTelebirr = /^(09\d{8}|\+2519\d{8})$/.test(form.phone.trim());

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name}! Total: ${total} ETB`);
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Delivery Details</h3>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>TeleBirr Number:</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344 or +25199898765"
          required
        />
        {form.phone && !isValidTelebirr && (
          <p style={{ color: "red" }}>
            Must start with 09 or +2519 followed by 8 digits
          </p>
        )}
      </div>

      <div>
        <label>Area:</label>
        <input
          type="text"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={!isValidTelebirr || total === 0}>
        Place Order ({total} ETB)
      </button>
    </form>
  );
}
