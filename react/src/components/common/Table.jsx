"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProduct } from "@/lib/fetchProduct";
import { formatVND } from "@/lib/utils";

const header = [
  { label: "STT" },
  { label: "Tên sản phẩm" },
  { label: "Số lượng" },
  { label: "Đơn giá" },
  { label: "Đơn giá cũ" },
  { label: "Hình ảnh" },
  { label: "Thao tác" },
];

export default function BasicTableOne() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await fetchProduct({});
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, []);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {header.map((item, index) => (
                  <TableCell
                    key={index}
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {!loading ? (
                product.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.product}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex -space-x-2">
                        {formatVND(item.price)}
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {item.old_price ? formatVND(item.old_price) : ""}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={
                              item.image
                                ? item.image
                                : "/images/product/product-default.png"
                            }
                            alt={item.product}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex justify-end gap-2">
                        <button
                          // onClick={() => openEdit(p)}
                          className="px-3 py-1 border rounded-md text-sm"
                        >
                          Sửa
                        </button>
                        <button
                          // onClick={() => askDelete(p.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={header.length} className="text-center">
                    Đang tải dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
