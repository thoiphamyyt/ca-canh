"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { formatVND } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const { cart, updateCart, deleteItemCart, loadingCart } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const updateQuantity = (id, quantity) => {
    updateCart(id, quantity);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0
  );
  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/checkout-cart");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-500">
        🛒 Giỏ hàng của bạn
      </h1>

      {loadingCart ? (
        <div className="space-y-6">
          {/* Skeleton bảng */}
          <div className="space-y-4">
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

          {/* Skeleton tổng cộng */}
          <div className="flex justify-end">
            <Skeleton className="h-8 w-40" />
          </div>

          {/* Skeleton nút */}
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <ShoppingCart className="w-20 h-20 text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">
            Giỏ hàng trống
          </h2>
          <p className="text-gray-500 mt-2">
            Hãy thêm sản phẩm để bắt đầu mua sắm nhé!
          </p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">STT</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-right">Thành tiền</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={item.id} className="text-lg">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium h-[200px] flex items-center space-x-5">
                    <img
                      src={
                        item.images_url
                          ? item.images_url[0]
                          : "/images/product/product-default.png"
                      }
                      className="h-[170px] w-[170px] object-cover"
                      alt={item.product}
                    />
                    <p>{item.product}</p>
                  </TableCell>
                  <TableCell>{formatVND(item.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantityCart > 1
                              ? item.quantityCart - 1
                              : item.quantityCart
                          )
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantityCart}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantityCart + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatVND(item.price * item.quantityCart)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItemCart(item.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-bold text-xl">
                  Tổng cộng:
                </TableCell>
                <TableCell className="text-right text-green-600 font-bold text-3xl">
                  {formatVND(total)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6 space-x-2">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg shadow-md"
              onClick={handleCheckout}
            >
              Thanh toán
            </Button>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 text-lg rounded-lg shadow-md"
              >
                Mua tiếp
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
