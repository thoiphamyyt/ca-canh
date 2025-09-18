"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/utils";
import Link from "next/link";
import { link_public_api } from "@/lib/contants";

export default function CartSidebar() {
  const { cart, isOpen, setIsOpen, updateCart } = useCart();

  const decrease = (item) => {
    const quantityCart = item.quantityCart;
    updateCart(item.id, quantityCart > 1 ? quantityCart - 1 : 1);
  };

  const increase = (item) => {
    const quantityCart = item.quantityCart;
    if (quantityCart === parseInt(item.quantity)) {
      return;
    }
    updateCart(item.id, quantityCart + 1);
  };
  const handleChangeQuantity = (item, value) => {
    if (/^\d*$/.test(value)) {
      updateCart(item.id, value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleBlurQuantity = (item) => {
    const quantityCart = item.quantityCart;
    if (!quantityCart || quantityCart < 1) {
      updateCart(id, 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* lớp nền mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-80 h-full shadow-lg p-4 overflow-y-auto z-50 bg-gray-100 dark:bg-gray-900"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-green-900 dark:text-green-500">
                Giỏ hàng
              </h3>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p>Chưa có sản phẩm</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.images_url && item.images_url.length
                            ? item.images_url[0]
                            : "/images/product/product-default.png"
                        }
                        className="w-[60px] h-[60px] object-cover"
                      ></img>
                      <div>
                        <p className="font-medium">{item.product}</p>
                        <p className="text-sm text-red-500">
                          {formatVND(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center py-4 justify-end gap-9">
                      <p className="flex items-center border rounded-lg overflow-hidden">
                        <Button
                          variant="ghost"
                          onClick={() => decrease(item)}
                          className="px-3"
                        >
                          -
                        </Button>
                        <input
                          type="text"
                          value={item.quantityCart}
                          onChange={(e) =>
                            handleChangeQuantity(item, e.target.value)
                          }
                          onBlur={(e) => handleBlurQuantity(item)}
                          className="w-12 text-center border-x"
                        />
                        <Button
                          variant="ghost"
                          className="px-3"
                          onClick={() => increase(item)}
                        >
                          +
                        </Button>
                      </p>
                      <p className="text-lg">
                        {formatVND(item.price * item.quantityCart)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link href="/cart">
              <Button className="w-full mt-6 bg-green-600 dark:hover:bg-green-800 dark:hover:bg-white">
                Thanh toán →
              </Button>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
