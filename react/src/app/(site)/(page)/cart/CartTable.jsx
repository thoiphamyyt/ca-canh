"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/utils";

export default function CartTable({ cart, updateQuantity, deleteItemCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantityCart,
    0
  );

  return (
    <div className="hidden md:block overflow-x-auto">
      <Table className="min-w-[800px]">
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
                    item.images_url?.[0] ??
                    "/images/product/product-default.png"
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
                        Math.max(1, item.quantityCart - 1)
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
                      updateQuantity(
                        item.id,
                        Math.min(item.quantityCart + 1, item.quantity)
                      )
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
            <TableCell className="text-right text-cyan-600 font-bold text-3xl">
              {formatVND(total)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
