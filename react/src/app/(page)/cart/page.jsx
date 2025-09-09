"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function CartPage() {
  const { cart, updateCart, deleteItemCart } = useCart();
  const updateQuantity = (id, quantity) => {
    updateCart(id, quantity);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-500">
        🛒 Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
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
                      item.image
                        ? item.image
                        : "/image/product/product-default.png"
                    }
                    className="h-[170px] object-cover"
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
              <TableCell colSpan={4} className="text-right font-bold text-lg">
                Tổng cộng:
              </TableCell>
              <TableCell className="text-right text-green-600 font-bold text-xl">
                {formatVND(total)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        // <div className="grid gap-4">
        //   {cart.map((item) => (
        //     <Card key={item.id} className="p-4 flex items-center gap-4">
        //       <img
        //         src={item.image}
        //         alt={item.product}
        //         className="w-24 h-24 rounded-lg object-cover"
        //       />
        //       <CardContent className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-0">
        //         <div>
        //           <h2 className="font-semibold text-lg">{item.product}</h2>
        //           <p className="text-gray-600">{formatVND(item.price)}</p>
        //         </div>

        //         <div className="flex items-center gap-2">
        //           <Button
        //             variant="outline"
        //             onClick={() =>
        //               updateQuantity(item.id, item.quantityCart - 1)
        //             }
        //           >
        //             -
        //           </Button>
        //           <Input
        //             type="number"
        //             value={item.quantity}
        //             className="w-16 text-center"
        //             onChange={(e) =>
        //               updateQuantity(item.id, parseInt(e.target.value) || 1)
        //             }
        //           />
        //           <Button
        //             variant="outline"
        //             onClick={() =>
        //               updateQuantity(item.id, item.quantityCart + 1)
        //             }
        //           >
        //             +
        //           </Button>
        //         </div>

        //         <div className="flex items-center gap-4">
        //           <p className="font-semibold">
        //             {formatVND(item.price * item.quantityCart)}
        //           </p>
        //           <Button
        //             variant="destructive"
        //             onClick={() => removeItem(item.id)}
        //           >
        //             Xóa
        //           </Button>
        //         </div>
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>
      )}
    </div>
  );
}
