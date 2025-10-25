"use client";

import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import CartTable from "./CartTable";
import CartCard from "./CartCard";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, updateCart, deleteItemCart, loadingCart } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const updateQuantity = (id, quantity) => updateCart(id, quantity);

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/checkout-cart");
    }
  };

  if (loadingCart) {
    return (
      <div className="container mx-auto py-10">
        <div className="space-y-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <Skeleton className="h-[120px] w-[120px] rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <ShoppingCart className="w-20 h-20 text-gray-400 mb-4" />
        <h2 className="text-lg font-semibold text-gray-700">Giỏ hàng trống</h2>
        <p className="text-gray-500 mt-2">
          Hãy thêm sản phẩm để bắt đầu mua sắm nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-2">
      <h1 className="text-2xl font-bold mb-6 text-sky-900 dark:text-sky-400">
        🛒 Giỏ hàng của bạn
      </h1>

      <CartTable
        cart={cart}
        updateQuantity={updateQuantity}
        deleteItemCart={deleteItemCart}
      />
      <CartCard
        cart={cart}
        updateQuantity={updateQuantity}
        deleteItemCart={deleteItemCart}
      />

      <div className="flex flex-col md:flex-row justify-end mt-6 space-y-2 md:space-y-0 md:space-x-2">
        <Button
          size="lg"
          className="bg-gradient-to-r from-sky-600 to-cyan-500 px-8 py-4 text-lg rounded-lg shadow-md"
          onClick={handleCheckout}
        >
          Thanh toán
        </Button>
        <Link href="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-400 to-yellow-300 px-8 py-4 text-lg rounded-lg shadow-md w-full"
          >
            Mua tiếp
          </Button>
        </Link>
      </div>
    </div>
  );
}
