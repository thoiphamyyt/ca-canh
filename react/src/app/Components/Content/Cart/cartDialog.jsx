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

export default function CartDialog({ dataProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(dataProduct, quantity);
    setOpen(false);
  };
  const { addToCart } = useCart();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-3 rounded-full bg-lime-400 hover:bg-green-500 shadow-md dark:bg-green-600 dark:hover:bg-green-900">
          <ShoppingCart className="w-5 h-5 text-white" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Giỏ hàng của bạn</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />

        {/* Sản phẩm */}
        <div className="flex gap-4 items-center border-b pb-4">
          <img
            src={
              dataProduct.image
                ? dataProduct.image
                : "/image/product/product-default.png"
            }
            alt="Coconut Cake"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-xl text-green-900 dark:text-green-500">
              {dataProduct.product}
            </h3>
            <p className="text-gray-500 text-sm">Mã SP: {dataProduct.id}</p>
            <p className="text-red-600 font-bold mt-1">
              {formatVND(dataProduct.price)}
            </p>

            {/* Chọn số lượng */}
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </Button>
              <span className="px-3">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">Tổng cộng:</span>
          <span className="text-xl font-bold text-red-600">
            {formatVND(dataProduct.price * quantity)}
          </span>
        </div>

        {/* Hành động */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={() => handleAddToCart()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Thêm vào giỏ
          </Button>
          <Link href={`/detail-product/${dataProduct.id}`}>
            <Button
              variant="outline"
              className="dark:bg-sky-700 dark:hover:bg-sky-900"
            >
              Xem chi tiết →
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
