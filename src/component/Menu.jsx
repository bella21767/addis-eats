import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import ErrorBoundary from "./ErrorBoundary";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const categories = ["All", "Main", "Vegan", "Grill"];

  const { data: dishes, loading, error } = useFetch("/dishes.json");

  function handleCategorySelect(newCategory) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  }

  if (loading) {
    return <p>Loading the menu...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const shownDishes =
    currentCategory === "All"
      ? dishes
      : dishes?.filter((dish) => dish.category === currentCategory);

  return (
    <div className="menu">
      <CategoryBar
        categories={categories}
        selected={currentCategory}
        onSelect={handleCategorySelect}
      />
      <ErrorBoundary
        fallback={
          <div
            style={{
              padding: "16px",
              background: "#fff1f0",
              border: "1px solid #ffa39e",
              borderRadius: "4px",
            }}
          >
            <h4>Unable to display menu list</h4>
            <p>One or more dishes could not be rendered right now.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Menu
            </button>
          </div>
        }
      >
        <DishList dishes={shownDishes || []} />
      </ErrorBoundary>
    </div>
  );
}
