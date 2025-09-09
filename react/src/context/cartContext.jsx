// context/CartContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // mở/đóng sidebar giỏ hàng
  // 🔹 Lấy dữ liệu từ localStorage khi load trang
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, deleteItemCart, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
