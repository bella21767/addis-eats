import { NavLink, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="layout"
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
        color: theme === "light" ? "#000000" : "#ffffff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Addis Eats</h1>
          <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
        <nav
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: "inherit",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: "inherit",
            })}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: "inherit",
            })}
          >
            <CartBadge />
          </NavLink>
          <NavLink
            to="/checkout"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: "inherit",
            })}
          >
            Checkout
          </NavLink>
        </nav>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
