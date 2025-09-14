import Image from "next/image";
import { link_public_api } from "@/lib/contants";
import { formatVND } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const columns = (onOpenDialog) => [
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
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Đơn giá",
    cell: ({ row }) => (
      <div className="text-center">{formatVND(row.original.price)}</div>
    ),
  },
  {
    accessorKey: "category_name",
    header: "Loại sản phẩm",
    cell: ({ row }) => (
      <div className="text-center">{row.original.category_name}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-3">
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
      <div className="flex justify-center gap-2 text-center">
        <Link href={`/admin/update-product/${row.original.id}`}>
          <Button size="sm">Sửa</Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onOpenDialog(row.original)}
        >
          Xóa
        </Button>
      </div>
    ),
  },
];
