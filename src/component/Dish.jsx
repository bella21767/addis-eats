import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { useToast } from "../hooks/useToast";
import Modal from "./Modal";

const ICONS = { Main: "🍲", Vegan: "🥗", Grill: "🔥" };

export default function Dish({ dish }) {
  const addItem = useCartStore((state) => state.addItem);
  const isFav = useFavoritesStore((state) => state.ids.includes(dish.id));
  const toggleFav = useFavoritesStore((state) => state.toggle);
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  if (dish.name === "Error Dish") {
    throw new Error("Deliberate failure: Failed to render this dish.");
  }

  function handleAdd() {
    addItem(dish);
    showToast(`${dish.name} added to cart 🛒`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="dish">
      <div className="dish-img">
        {dish.image ? (
          <img src={dish.image} alt={dish.name} />
        ) : (
          <span>{ICONS[dish.category] || "🍽️"}</span>
        )}

        <button
          className={isFav ? "heart on" : "heart"}
          onClick={() => {
            toggleFav(dish.id);
            showToast(isFav ? "Removed from favorites" : "Saved to favorites ♥");
          }}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "♥" : "♡"}
        </button>

        {Boolean(dish.spicy) && <span className="badge">🌶️ Spicy</span>}
      </div>

      <div className="dish-body">
        <h3>
          <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
        </h3>
        <p className="dish-category">{dish.category}</p>
        <p className="price">{dish.price} ETB</p>

        <div className="dish-actions">
          <button onClick={handleAdd} className={added ? "added" : ""}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
          <button className="secondary" onClick={() => setIsModalOpen(true)}>
            Quick View
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={dish.name}
      >
        <p><strong>Category:</strong> {dish.category}</p>
        <p><strong>Price:</strong> {dish.price} ETB</p>
        <p><strong>Spice Level:</strong> {dish.spicy ? "Spicy 🌶️" : "Mild"}</p>
        {dish.description && <p>{dish.description}</p>}
        <div className="modal-actions">
          <button
            onClick={() => {
              handleAdd();
              setIsModalOpen(false);
            }}
          >
            Add to Cart
          </button>
          <button className="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}