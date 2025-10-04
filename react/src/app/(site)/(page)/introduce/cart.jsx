"use client";

import { useCart } from "@/context/cartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { formatVND } from "@/lib/utils";

export default function Cart() {
  const { cart, deleteItemCart, clearCart, loadingCart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantityCart || 0),
    0
  );

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-sky-800 dark:text-white">
        Giỏ hàng của bạn
      </h2>

      {loadingCart ? (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-md border-slate-700">
            <CardHeader className="font-semibold text-lg">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-[50px] w-[50px] rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-10 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-700">
            <CardHeader className="font-semibold text-lg">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Separator />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-10 w-full rounded-md mt-4" />
              <Skeleton className="h-10 w-full rounded-md mt-2" />
            </CardContent>
          </Card>
        </div>
      ) : cart.length === 0 ? (
        <Card className="p-6 text-center dark:bg-slate-800 ">
          <p className="text-slate-600 dark:text-slate-400">
            🛒 Chưa có sản phẩm nào trong giỏ hàng.
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-md dark:bg-slate-800">
            <CardHeader className="font-semibold text-lg">
              Sản phẩm đã chọn ({cart.length})
            </CardHeader>
            <CardContent className="divide-y divide-slate-200 dark:divide-slate-700">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        item.images_url?.[0] ||
                        "/images/product/product-default.png"
                      }
                      alt={item.product}
                      width={64}
                      height={64}
                      className="rounded-lg border dark:border-slate-600 h-[50px]"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {item.product}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.category_name || "Không rõ loại"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-sky-700 dark:text-sky-400">
                      {formatVND(item.price)}
                    </span>
                    <span className="text-sm text-sky-900 dark:text-sky-600">
                      x {item.quantityCart}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteItemCart(item.id)}
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md dark:bg-slate-800">
            <CardHeader className="font-semibold text-lg">
              Tóm tắt đơn hàng
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Tạm tính</span>
                <span>{formatVND(totalPrice)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg text-sky-700 dark:text-sky-400">
                <span>Tổng cộng</span>
                <span>{formatVND(totalPrice)}</span>
              </div>
              <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white mt-4">
                Tiến hành thanh toán
              </Button>
              {clearCart && (
                <Button
                  variant="outline"
                  className="w-full mt-2 text-red-500 border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                  onClick={clearCart}
                >
                  Xóa toàn bộ giỏ hàng
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
