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
    accessorKey: "name",
    header: "Loại sản phẩm",
    cell: ({ row }) => (
      <div className="w-[200px] text-center">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "products_count",
    header: "Số lượng sản phẩm",
    cell: ({ row }) => (
      <div className="w-[200px] text-center">{row.original.products_count}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 text-center">
        <Link href={`/admin/update-category/${row.original.id}`}>
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
