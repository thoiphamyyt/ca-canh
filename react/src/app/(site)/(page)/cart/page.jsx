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

export default function CartPage() {
  const { cart, updateCart, deleteItemCart } = useCart();
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
      // Nếu chưa login thì đưa về trang login
      router.push("/login");
    } else {
      // Nếu đã login thì cho sang trang checkout
      router.push("/checkout-cart");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-500">
        🛒 Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <p>Giỏ hàng chưa có sản phẩm.</p>
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
                    ></img>
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
