"use client";

import Image from "next/image";
import { link_public_api } from "@/lib/contants";
import { formatVND } from "@/lib/utils";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>, // tự đánh số
  },
  {
    accessorKey: "product",
    header: "Sản phẩm",
  },
  {
    accessorKey: "quantity",
    header: "Số lượng",
  },
  {
    accessorKey: "price",
    header: "Đơn giá",
    cell: ({ row }) => formatVND(row.original.price),
  },
  {
    accessorKey: "category_name",
    header: "Loại sản phẩm",
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-13 h-13 overflow-hidden">
          <Image
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover"
            src={
              row.original.image && row.original.image
                ? `${link_public_api}/${row.original.image[0]}`
                : "/images/product/product-default.png"
            }
            alt={row.original.product}
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="flex justify-start gap-2">
        <Link href={`/admin/update-product/${row.original.id}`}>
          <button className="px-3 py-1 border rounded-md text-sm">Sửa</button>
        </Link>
        <button
          // onClick={() => askDelete(row.original.id)}
          className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
        >
          Xóa
        </button>
      </div>
    ),
  },
];
