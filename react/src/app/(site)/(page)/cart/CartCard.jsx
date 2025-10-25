"use client";

import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/utils";

export default function CartCard({ cart, updateQuantity, deleteItemCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0
  );

  return (
    <div className="md:hidden space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col border rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <img
              src={
                item.images_url?.[0] ?? "/images/product/product-default.png"
              }
              className="h-24 w-24 object-cover"
              alt={item.product}
            />
            <div className="flex-1">
              <p className="font-medium">{item.product}</p>
              <p className="text-cyan-600 font-bold">{formatVND(item.price)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantityCart - 1))
                }
              >
                -
              </Button>
              <span>{item.quantityCart}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  updateQuantity(
                    item.id,
                    Math.min(item.quantityCart + 1, item.quantity)
                  )
                }
              >
                +
              </Button>
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteItemCart(item.id)}
            >
              Xóa
            </Button>
          </div>
          <p className="text-right font-bold mt-2">
            Thành tiền: {formatVND(item.price * item.quantityCart)}
          </p>
        </div>
      ))}
      <div className="text-right text-cyan-600 font-bold text-2xl">
        Tổng cộng: {formatVND(total)}
      </div>
    </div>
  );
}
