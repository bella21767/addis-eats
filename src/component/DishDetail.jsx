import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

export default function DishDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading dish details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const dish = dishes?.find((item) => String(item.id) === String(id));

  if (!dish) {
    return (
      <div>
        <p>This dish was not found.</p>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail">
      <h2>{dish.name}</h2>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      <p>{dish.spicy ? "Spicy dish" : "Mild dish"}</p>
      <button onClick={() => addItem(dish)}>Add to Cart</button>
      <br />
      <br />
      <Link to="/menu">Back to Menu</Link>
    </div>
  );
}
