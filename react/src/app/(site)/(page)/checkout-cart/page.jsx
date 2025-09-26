"use client";
import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { formatVND } from "@/lib/utils";
import CheckoutUserInfo from "./CheckoutUserInfo";
import { Skeleton } from "@/components/ui/skeleton";
import config from "@/config";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

export default function Checkout() {
  const { toast } = useToast();
  const { cart, loadingCart, removeCart } = useCart();
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { user, loading } = useUser();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    try {
      setLoadingProcess(true);

      const res = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/save-store`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            items: cart,
            total,
            payment_method: paymentMethod,
          }),
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Thành công",
          description: `Đặt hàng thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.`,
          variant: "success",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: "Đặt hàng thất bại, vui lòng thử lại sau.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đặt hàng thất bại, vui lòng thử lại sau.",
      });
    } finally {
      removeCart();
      setLoadingProcess(false);
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form thông tin khách hàng */}
      <div className="md:col-span-2">
        {<CheckoutUserInfo user={user} loading={loading} />}
      </div>
      {/* Đơn hàng */}
      <div className="dark:bg-slate-800 bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-700">
          Đơn hàng của bạn
        </h2>

        {loadingCart ? (
          <div className="space-y-4">
            {/* Skeleton header */}
            <div className="flex justify-between">
              <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-slate-600" />
              <Skeleton className="h-6 w-24 rounded bg-gray-200 dark:bg-slate-600" />
              <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-slate-600" />
              <Skeleton className="h-6 w-20 rounded bg-gray-200 dark:bg-slate-600" />
            </div>
            {/* Skeleton rows */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-slate-600" />
                <Skeleton className="h-6 w-24 rounded bg-gray-200 dark:bg-slate-600" />
                <Skeleton className="h-6 w-12 rounded bg-gray-200 dark:bg-slate-600" />
                <Skeleton className="h-6 w-20 rounded bg-gray-200 dark:bg-slate-600" />
              </div>
            ))}
            {/* Skeleton total */}
            <div className="flex justify-end py-3">
              <Skeleton className="h-6 w-32 rounded bg-gray-200 dark:bg-slate-600" />
            </div>
            {/* Skeleton button */}
            <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-slate-600" />
          </div>
        ) : cart && cart.length ? (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-center py-2">STT</th>
                  <th className="text-left py-2">Sản phẩm</th>
                  <th className="text-center py-2">SL</th>
                  <th className="text-right py-2">Giá</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-700">
                      <td className="py-2 text-center">{index + 1}</td>
                      <td className="py-2">{item.product}</td>
                      <td className="text-center py-2">{item.quantityCart}</td>
                      <td className="text-right py-2">
                        {formatVND(item.price * item.quantityCart)}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="3" className="text-right font-semibold py-3">
                    Tổng cộng
                  </td>
                  <td className="text-right font-bold text-lg text-amber-400 py-3">
                    {formatVND(total)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">
                Hình thức thanh toán
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600"
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600"
                  />
                  <span>Chuyển khoản ngân hàng</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600"
                  />
                  <span>Thanh toán qua MoMo</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loadingProcess}
              className={`mt-4 w-full transition text-white py-3 rounded-xl font-semibold shadow-md ${
                loadingProcess
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loadingProcess ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <ShoppingCart className="w-20 h-20 text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mt-2">
              Hãy thêm sản phẩm để bắt đầu mua sắm nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
