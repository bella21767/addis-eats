export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={selected === cat ? "chip active" : "chip"}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}