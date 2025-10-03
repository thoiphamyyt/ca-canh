"use client";

import { useEffect, useState } from "react";
import { formatDate, formatVND } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { fetchOrder } from "@/lib/callApi";
import { listStatusOrder } from "@/lib/contants";
import DetaiOrders from "./detailOrders";
export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const data = await fetchOrder();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-500">
        Lịch sử mua hàng
      </h1>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4 animate-pulse">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-32 w-full" />
            </Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">
          Bạn chưa có đơn hàng nào.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Đơn hàng: #{order.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-900"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {listStatusOrder.find((x) => x.value == order.status)
                    ? listStatusOrder.find((x) => x.value == order.status).label
                    : ""}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Ngày đặt:{" "}
                <span className="italic">
                  {formatDate(order.created_at, "H:m dd/MM/yyyy")}
                </span>
              </p>
              <p className="text-lg font-semibold mb-4">
                Tổng tiền: {formatVND(order.total_amount)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border rounded-lg p-3"
                  >
                    <Image
                      src={
                        item.product && item.product.images_url
                          ? item.product.images_url[0]
                          : "/images/product/product-default.png"
                      }
                      alt={item.product.product}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product.product}</p>
                      <p className="text-sm text-gray-500">
                        SL: {item.quantity}
                      </p>
                      <p className="text-green-600 font-bold">
                        {formatVND(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <DetaiOrders order={order} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
