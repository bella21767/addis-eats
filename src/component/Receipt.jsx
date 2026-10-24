import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const STEPS = [
  { label: "Order received", icon: "📝" },
  { label: "Preparing", icon: "🍳" },
  { label: "On the way", icon: "🛵" },
  { label: "Delivered", icon: "🏠" },
];

// Seconds after ordering when each step starts (demo timing, change as you like)
const STEP_START = [0, 6, 16, 28];

const MESSAGES = [
  "We got your order and sent it to the kitchen.",
  "Your food is being cooked fresh.",
  "Your rider is on the way to you.",
  "Delivered. Enjoy your meal!",
];

export default function Receipt() {
  const { state } = useLocation();
  const order = state?.order;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!order) return;
    const timers = STEP_START.map((sec, i) =>
      setTimeout(() => setStep(i), sec * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [order]);

  const finished = step === STEPS.length - 1;

  return (
    <div className="receipt">
      <div className="receipt-icon">✅</div>
      <h2>Order Received!</h2>
      <p>Your payment through TeleBirr was received successfully.</p>

      {order && (
        <>
          <div className="tracker" aria-live="polite">
            <div className="tracker-bar">
              <div
                className="tracker-fill"
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
            <ol className="tracker-steps">
              {STEPS.map((s, i) => (
                <li
                  key={s.label}
                  className={
                    i < step || finished ? "done" : i === step ? "current" : ""
                  }
                >
                  <span className="dot">{i < step || finished ? "✓" : s.icon}</span>
                  <span>{s.label}</span>
                </li>
              ))}
            </ol>
            <p className="tracker-msg">{MESSAGES[step]}</p>
          </div>

          <div className="receipt-box">
            <p><strong>Order number:</strong> {order.id}</p>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Deliver to:</strong> {order.address}, {order.area}</p>
            <hr />
            {order.items.map((item) => (
              <div className="sum-line" key={item.id}>
                <span>{item.qty} × {item.name}</span>
                <span>{item.price * item.qty} ETB</span>
              </div>
            ))}
            <div className="sum-line"><span>Delivery</span><span>{order.delivery} ETB</span></div>
            <div className="sum-line total"><span>Total paid</span><span>{order.total} ETB</span></div>
          </div>
        </>
      )}

      <p>
        Estimated preparation & delivery time: <strong>30-45 minutes</strong>.
      </p>

      <div className="receipt-actions no-print">
        <Link to="/menu" className="btn">Order More Food</Link>
        {order && (
          <button className="secondary" onClick={() => window.print()}>
            Print Receipt
          </button>
        )}
      </div>
    </div>
  );
}