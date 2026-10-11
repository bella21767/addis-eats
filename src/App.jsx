import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Menu from "./component/Menu";
import DishDetail from "./component/DishDetail";
import Login from "./component/Login";
import RequireAuth from "./component/RequireAuth";
import NotFound from "./component/NotFound";
import Skeleton from "./component/Skeleton";
import ErrorBoundary from "./component/ErrorBoundary";

const Checkout = lazy(() => import("./component/Checkout"));
const Receipt = lazy(() => import("./component/Receipt"));

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="menu"
                element={
                  <ErrorBoundary
                    fallback={
                      <div style={{ padding: "20px", color: "red" }}>
                        <h3>The menu is currently unavailable.</h3>
                        <p>
                          The cart and other pages are still functioning
                          normally.
                        </p>
                      </div>
                    }
                  >
                    <Menu />
                  </ErrorBoundary>
                }
              />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route
                path="cart"
                element={
                  <ErrorBoundary
                    fallback={
                      <div style={{ padding: "20px", color: "red" }}>
                        <h3>The cart encountered an error.</h3>
                        <p>
                          Your menu and browsing experience remain unaffected.
                        </p>
                      </div>
                    }
                  >
                    <Suspense fallback={<Skeleton />}>
                      <Checkout />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <ErrorBoundary
                      fallback={
                        <div style={{ padding: "20px", color: "red" }}>
                          <h3>Failed to load checkout form.</h3>
                          <button onClick={() => window.location.reload()}>
                            Reload Page
                          </button>
                        </div>
                      }
                    >
                      <Suspense fallback={<Skeleton />}>
                        <Checkout />
                      </Suspense>
                    </ErrorBoundary>
                  </RequireAuth>
                }
              />
              <Route
                path="receipt"
                element={
                  <Suspense fallback={<Skeleton />}>
                    <Receipt />
                  </Suspense>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
