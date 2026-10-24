import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="code">404</div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist, or it was moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn">Back to Home</Link>
        <Link to="/menu" className="btn outline">Browse the Menu</Link>
      </div>
    </div>
  );
}