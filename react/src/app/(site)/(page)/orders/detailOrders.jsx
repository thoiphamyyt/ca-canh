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
import { formatDate, formatVND } from "@/lib/utils";
import { listStatusOrder } from "@/lib/contants";
import Link from "next/link";

export default function OrderDetailDialog({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-blue-600 hover:underline p-0 h-auto"
        >
          Xem chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-green-700">
            Chi tiết đơn hàng #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Ngày đặt</p>
            <p className="font-semibold">
              {formatDate(order.created_at, "H:m dd/MM/yyyy")}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Tổng tiền</p>
            <p className="font-semibold text-green-600">
              {formatVND(order.total_amount)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Trạng thái</p>
            <p
              className={`font-semibold ${
                order.status === "completed"
                  ? "text-green-600"
                  : order.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {listStatusOrder.find((x) => x.value == order.status)?.label ??
                "Không xác định"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-lg">Sản phẩm</h3>
          <div className="divide-y rounded-lg border">
            {order.items?.map((item) => (
              <Link href={`detail-product/${item.product.id}`} key={item.id}>
                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <img
                    src={
                      item.product?.images_url?.[0] ??
                      "/images/product/product-default.png"
                    }
                    alt={item.product?.product}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.product}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.product?.describe || item.product?.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      SL: <span className="font-semibold">{item.quantity}</span>{" "}
                      ×{" "}
                      <span className="text-green-600 font-semibold">
                        {formatVND(item.price)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right font-bold text-green-700">
                    {formatVND(item.price * item.quantity)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
