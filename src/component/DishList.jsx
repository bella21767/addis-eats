import Dish from "./Dish";

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return (
      <div className="empty">
        <span>🍽️</span>
        <p>No dishes found. Try another category or search.</p>
      </div>
    );
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </div>
  );
}