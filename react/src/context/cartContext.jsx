"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@/context/userContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const storageKey = user ? `cart_${user.id}` : "cart_guest";

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(storageKey);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Lỗi khi đọc cart từ localStorage:", err);
    } finally {
      setTimeout(() => setLoadingCart(false), 300);
    }
  }, [user]);

  useEffect(() => {
    if (!loadingCart) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey, loadingCart]);

  const addToCart = (product, quantityCart = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantityCart: item.quantityCart + quantityCart }
            : item
        );
      }
      return [...prev, { ...product, quantityCart }];
    });
    setIsOpen(true);
  };

  const updateCart = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityCart: quantity } : item
      )
    );
  };

  const deleteItemCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeCart = () => {
    localStorage.removeItem(storageKey);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        deleteItemCart,
        isOpen,
        setIsOpen,
        loadingCart,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
