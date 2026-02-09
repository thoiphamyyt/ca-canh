"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { formatVND } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

export default function CartDialog({ dataProduct, trigger }) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(dataProduct, quantity);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button className="p-3 rounded-full bg-gradient-to-r from-lime-400 to-green-500 hover:opacity-90 shadow-lg transition">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-sky-700 dark:text-sky-400">
            🛒 Giỏ hàng của bạn
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-3" />

        <div className="flex gap-4 items-start bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <img
            src={
              dataProduct.images_url && dataProduct.images_url.length
                ? dataProduct.images_url[0]
                : "/images/product/product-default.png"
            }
            alt={dataProduct.product}
            className="w-28 h-28 rounded-lg object-cover border"
          />
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
              {dataProduct.product}
            </h3>
            <p className="text-gray-500 text-sm">Mã SP: {dataProduct.id}</p>
            <p className="text-red-600 font-bold text-lg">
              {formatVND(dataProduct.price)}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </Button>
              <span className="px-4 py-1 rounded-lg bg-white dark:bg-gray-700 shadow text-sm font-medium">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Tổng cộng:
          </span>
          <span className="text-2xl font-bold text-red-600">
            {formatVND(dataProduct.price * quantity)}
          </span>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Link href={`/detail-product/${dataProduct.slug}`}>
            <Button
              variant="outline"
              className="rounded-xl dark:bg-sky-700 dark:hover:bg-sky-900"
            >
              Xem chi tiết →
            </Button>
          </Link>
          <Button
            onClick={() => handleAddToCart()}
            className="rounded-xl bg-gradient-to-r from-green-600 to-lime-500 text-white hover:opacity-90"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
