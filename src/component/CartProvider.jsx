import { useReducer, useMemo } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { CartContext } from "../context/CartContext";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price, 0);
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
