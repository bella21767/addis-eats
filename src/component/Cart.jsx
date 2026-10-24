import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { calcTotals } from "../utils/pricing";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const { subtotal, delivery, total } = calcTotals(items);

  if (items.length === 0) {
    return (
      <div className="empty">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some delicious dishes from the menu.</p>
        <Link to="/menu" className="btn">Browse the Menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>{item.price} ETB each</p>
              </div>

              <div className="qty">
                <button className="secondary" onClick={() => decrease(item.id)} aria-label="Decrease quantity">−</button>
                <span>{item.qty}</span>
                <button className="secondary" onClick={() => addItem(item)} aria-label="Increase quantity">+</button>
              </div>

              <strong className="line-total">{item.price * item.qty} ETB</strong>

              <button className="icon-btn" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`}>
                🗑️
              </button>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="sum-line"><span>Subtotal</span><span>{subtotal} ETB</span></div>
          <div className="sum-line"><span>Delivery</span><span>{delivery} ETB</span></div>
          <div className="sum-line total"><span>Total</span><span>{total} ETB</span></div>
          <Link to="/checkout" className="btn block">Proceed to Checkout</Link>
          <button className="secondary block" onClick={clear}>Clear Cart</button>
        </aside>
      </div>
    </div>
  );
}