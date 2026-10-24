import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";
import Logo from "./Logo";
import { ToastProvider } from "../context/ToastContext";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="layout">
        <header className="site-header">
          <div className="header-inner">
            <Link to="/" className="logo">
              <Logo size={42} />
              <span className="logo-text">
                <b>Addis <em>Eats</em></b>
                <small>Ethiopian Kitchen</small>
              </span>
            </Link>

            <nav className={open ? "nav open" : "nav"} onClick={() => setOpen(false)}>
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/menu">Menu</NavLink>
              <NavLink to="/cart" className="cart-link">
                <CartBadge />
              </NavLink>
              <NavLink to="/checkout">Checkout</NavLink>
            </nav>

            <div className="header-actions">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <button
                className="menu-toggle"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </header>

        <main className="container">
          <Outlet />
        </main>

        <footer className="site-footer">
          <div className="footer-inner">
            <Link to="/" className="logo small">
              <Logo size={30} />
              <span className="logo-text">
                <b>Addis <em>Eats</em></b>
              </span>
            </Link>
            <p>© {new Date().getFullYear()} Addis Eats · Traditional Ethiopian food, delivered in Addis Ababa.</p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}