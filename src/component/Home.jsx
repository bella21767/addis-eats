import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import DishList from "./DishList";

export default function Home() {
  const { data: dishes } = useFetch("/dishes.json");
  const popular = (dishes || []).slice(0, 3);

  return (
    <div>
      <section className="hero">
        <p className="hero-tag">Authentic Ethiopian Kitchen</p>
        <h2>Real Ethiopian flavor, delivered to your door</h2>
        <p className="hero-text">
          Doro Wat, Shiro, Tibs and more, freshly cooked and delivered across Addis Ababa.
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn">Explore Our Menu</Link>
          <Link to="/cart" className="btn outline">View Cart</Link>
        </div>

        <div className="hero-stats">
          <div><strong>30-45 min</strong><span>Estimated delivery</span></div>
          <div><strong>TeleBirr</strong><span>Easy payment</span></div>
          <div><strong>Vegan</strong><span>Fasting food options</span></div>
        </div>
      </section>

      {popular.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Popular Dishes</h2>
            <Link to="/menu">See full menu →</Link>
          </div>
          <DishList dishes={popular} />
        </section>
      )}

      <section className="section">
        <h2 className="center">How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <h4>Choose your dishes</h4>
            <p>Browse the menu, search and filter by category.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h4>Checkout</h4>
            <p>Enter your delivery address and pay with TeleBirr.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h4>Enjoy your meal</h4>
            <p>Hot food arrives at your door.</p>
          </div>
        </div>
      </section>
    </div>
  );
}