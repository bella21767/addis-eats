import { useCartStore } from "../store/cartStore";

export default function CartBadge() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.qty, 0)
  );

  return (
    <span className="cart-badge">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.6 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" />
      </svg>
      Cart
      {count > 0 && <span className="count">{count}</span>}
    </span>
  );
}