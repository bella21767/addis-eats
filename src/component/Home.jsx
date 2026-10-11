import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Welcome to Addis Eats</h2>
      <p>Authentic Ethiopian dishes freshly delivered to your door.</p>
      <Link to="/menu">Explore Our Menu</Link>
    </div>
  );
}