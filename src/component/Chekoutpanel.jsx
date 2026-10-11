import { useCartStore } from "../store/cartStore";

export default function CheckoutPanel() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="checkout-panel">
      <h3>Checkout Order</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} ETB{" "}
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h4>Total: {total} ETB</h4>
      <button onClick={clear}>Clear Cart</button>
    </div>
  );
}
