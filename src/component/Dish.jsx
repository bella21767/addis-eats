import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import Modal from "./Modal";

export default function Dish({ dish }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (dish.name === "Error Dish") {
    throw new Error("Deliberate failure: Failed to render this dish.");
  }

  return (
    <div className="dish">
      <h3>
        <Link to={`/menu/${dish.id}`}>{dish.name}</Link>{" "}
        {Boolean(dish.spicy) && <span>• Spicy</span>}
      </h3>
      <p>{dish.price} ETB</p>
      <button onClick={() => addItem(dish)}>Add to Cart</button>{" "}
      <button onClick={() => setIsModalOpen(true)}>Quick View</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={dish.name}
      >
        <p>
          <strong>Category:</strong> {dish.category}
        </p>
        <p>
          <strong>Price:</strong> {dish.price} ETB
        </p>
        <p>
          <strong>Spice Level:</strong> {dish.spicy ? "Spicy" : "Mild"}
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button
            onClick={() => {
              addItem(dish);
              setIsModalOpen(false);
            }}
          >
            Add to Cart
          </button>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
