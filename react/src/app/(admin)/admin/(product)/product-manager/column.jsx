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
  },
  {
    accessorKey: "name",
    header: "Họ tên",
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
    header: "Số diện thoại",
  },
  {
    accessorKey: "avatar",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-3">
        <div className="w-13 h-13 overflow-hidden">
          <Image
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover"
            src={
              row.original.avatar
                ? `${link_public_api}/${row.original.avatar}`
                : "/images/user-default.jpg"
            }
            alt={row.original.name}
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
