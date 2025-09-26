// context/CartContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // mở/đóng sidebar giỏ hàng
  useEffect(() => {
    const fetchCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (err) {
        console.error("Lỗi khi đọc cart từ localStorage:", err);
      } finally {
        setTimeout(() => setLoadingCart(false), 1000);
      }
    };

    fetchCart();
  }, []);

  // 🔹 Lưu cart vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantityCart = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantityCart: item.quantityCart + quantityCart }
            : { ...item, quantityCart: quantityCart }
        );
      }

      return [...prev, { ...product, quantityCart }];
    });

    setIsOpen(true); // mở giỏ hàng sau khi thêm
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
    localStorage.removeItem("cart");
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
