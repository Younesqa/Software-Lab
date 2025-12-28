import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const getId = (p) => p?.id ?? p?.product_id ?? p?._id;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const pid = getId(product);
    if (pid == null) return;

    setCartItems((prev) => {
      const exists = prev.find((item) => getId(item) === pid);

      if (exists) {
        return prev.map((item) =>
          getId(item) === pid ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (product) => {
    const pid = typeof product === "object" ? getId(product) : product;
    setCartItems((prev) => prev.filter((item) => getId(item) !== pid));
  };

  const clearCart = () => setCartItems([]);

  // NEW: update quantity
  const updateQty = (product, qty) => {
    const pid = typeof product === "object" ? getId(product) : product;
    const safeQty = Math.max(1, Number(qty) || 1);

    setCartItems((prev) =>
      prev.map((item) =>
        getId(item) === pid ? { ...item, qty: safeQty } : item
      )
    );
  };

  const incQty = (product) => {
    const pid = typeof product === "object" ? getId(product) : product;
    setCartItems((prev) =>
      prev.map((item) =>
        getId(item) === pid ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decQty = (product) => {
    const pid = typeof product === "object" ? getId(product) : product;
    setCartItems((prev) =>
      prev.map((item) =>
        getId(item) === pid
          ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQty, incQty, decQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
