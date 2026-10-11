export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            fontWeight: selected === cat ? "bold" : "normal",
            backgroundColor: selected === cat ? "#333" : "#f0f0f0",
            color: selected === cat ? "#fff" : "#000",
            padding: "8px 16px",
            marginRight: "8px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
