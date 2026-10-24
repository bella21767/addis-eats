import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  const from = location.state?.from?.pathname || "/";

  function handleLogin(e) {
    e.preventDefault();
    setUser({ name: name.trim() || "Guest" });
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">🔐</div>
      <h2>Welcome Back</h2>
      <p>Please log in to proceed with your order.</p>

      <form onSubmit={handleLogin}>
        <label htmlFor="login-name">Your name</label>
        <input
          id="login-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Abebe Kebede"
          autoFocus
        />
        <button type="submit" className="block">Log In</button>
      </form>
    </div>
  );
}