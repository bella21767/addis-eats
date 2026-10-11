import { useCartStore } from "../store/cartStore";

export default function CartBadge() {
  const count = useCartStore((state) => state.items.length);

  return <span className="cart-badge">Cart: {count} items</span>;
}