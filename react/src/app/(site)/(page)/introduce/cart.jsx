"use client";
import { useCart } from "@/context/cartContext";
export default function Cart() {
  const { cart } = useCart();
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng ({cart.length})</h2>
      {cart.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">
          Chưa có sản phẩm nào trong giỏ hàng.
        </p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2"
            >
              <span>{item.product}</span>
              <span className="font-semibold">{item.priceCart}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
