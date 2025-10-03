import Image from "next/image";
import { listStatusOrder } from "@/lib/contants";
import { formatDate, formatVND } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export const columns = (onOpenDialog) => [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>, // tự đánh số
  },
  {
    accessorKey: "id",
    header: "Mã đơn hàng",
    cell: ({ row }) => <div className="text-center">#{row.original.id}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Thời gian tạo",
    cell: ({ row }) => (
      <div className="text-center">
        {formatDate(row.original.created_at, "H:m dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const borderColor =
        status == "pending"
          ? "border-green-500 text-green-700"
          : status === "draft"
          ? "border-gray-400 text-gray-600"
          : "border-red-500 text-red-700";

      return (
        <div className="flex justify-center">
          <Badge className={`border ${borderColor} bg-transparent`}>
            {listStatusOrder.find((x) => x.value == row.original.status)
              ? listStatusOrder.find((x) => x.value == row.original.status)
                  .label
              : ""}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: "Tổng tiền",
    cell: ({ row }) => (
      <div className="text-center">{formatVND(row.original.total_amount)}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Phương thức thanh toán",
    cell: ({ row }) => (
      <div className="text-center">{row.original.payment_method}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 text-center">
        <Link href={`/admin/update-orders/${row.original.id}`}>
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
