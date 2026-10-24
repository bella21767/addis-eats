import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useFavoritesStore } from "../store/favoritesStore";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import ErrorBoundary from "./ErrorBoundary";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const categories = ["All", "Main", "Vegan", "Grill", "Favorites"];
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const favoriteIds = useFavoritesStore((state) => state.ids);

  const { data: dishes, loading, error } = useFetch("/dishes.json");

  function handleCategorySelect(newCategory) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  }

  if (loading) {
    return <p className="status">Loading the menu...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  let shownDishes = dishes || [];

  if (currentCategory === "Favorites") {
    shownDishes = shownDishes.filter((dish) => favoriteIds.includes(dish.id));
  } else if (currentCategory !== "All") {
    shownDishes = shownDishes.filter((dish) => dish.category === currentCategory);
  }

  const q = query.trim().toLowerCase();
  if (q) {
    shownDishes = shownDishes.filter((dish) =>
      dish.name.toLowerCase().includes(q)
    );
  }

  if (sort === "low") {
    shownDishes = [...shownDishes].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    shownDishes = [...shownDishes].sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    shownDishes = [...shownDishes].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="menu">
      <h2>Our Menu</h2>

      <CategoryBar
        categories={categories}
        selected={currentCategory}
        onSelect={handleCategorySelect}
      />

      <div className="menu-toolbar">
        <input
          type="search"
          placeholder="🔍 Search dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <ErrorBoundary
        fallback={
          <div className="status error">
            <h4>Unable to display menu list</h4>
            <p>One or more dishes could not be rendered right now.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Menu
            </button>
          </div>
        }
      >
        <DishList dishes={shownDishes} />
      </ErrorBoundary>
    </div>
  );
}