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
    accessorKey: "userName",
    header: "Tài khoản",
    cell: ({ row }) => (
      <div className="text-center">{row.original.userName}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Họ và tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => (
      <div className="text-center">{row.original.phone || ""}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 text-center">
        <Link href={`/admin/update-customer/${row.original.id}`}>
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
