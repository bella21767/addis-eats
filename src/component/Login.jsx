import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleLogin() {
    setUser({ name: "Abebe" });
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h2>Login Required</h2>
      <p>Please log in to proceed with your order.</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
