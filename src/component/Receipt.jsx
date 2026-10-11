import { Link } from "react-router-dom";

export default function Receipt() {
  return (
    <div style={{ maxWidth: "450px", margin: "0 auto", padding: "20px" }}>
      <h2>Order Receipt</h2>
      <p>Your payment through TeleBirr was received successfully.</p>
      <p>
        Estimated preparation & delivery time: <strong>30-45 minutes</strong>.
      </p>
      <Link to="/menu">Order More Food</Link>
    </div>
  );
}
