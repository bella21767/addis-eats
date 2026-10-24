import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../hooks/useToast";

const ICONS = { Main: "🍲", Vegan: "🥗", Grill: "🔥" };

export default function DishDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p className="status">Loading dish details...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  const dish = dishes?.find((item) => String(item.id) === String(id));

  if (!dish) {
    return (
      <div className="empty">
        <span>🍽️</span>
        <p>This dish was not found.</p>
        <Link to="/menu" className="btn">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail">
      <div className="detail-img">
        {dish.image ? (
          <img src={dish.image} alt={dish.name} />
        ) : (
          <span>{ICONS[dish.category] || "🍽️"}</span>
        )}
      </div>

      <div className="detail-info">
        <Link to="/menu">← Back to Menu</Link>
        <h2>{dish.name}</h2>
        <p className="dish-category">
          {dish.category} · {dish.spicy ? "🌶️ Spicy" : "Mild"}
        </p>
        {dish.description && <p>{dish.description}</p>}
        <p className="price big">{dish.price} ETB</p>
        <button
          onClick={() => {
            addItem(dish);
            showToast(`${dish.name} added to cart 🛒`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}