import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listStatusContacts } from "@/lib/contants";
export const columns = (onOpenDialog) => [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>, // tự đánh số
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
    accessorKey: "message",
    header: "Nội dung liên hệ",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant =
        status === "new"
          ? "success"
          : status === "read"
          ? "secondary"
          : "destructive";
      return (
        <div className="flex justify-center">
          <Badge variant={variant}>
            {listStatusContacts.find((x) => x.value == status)
              ? listStatusContacts.find((x) => x.value == status).label
              : ""}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 text-center">
        <Link href={`/admin/detail-contacts/${row.original.id}`}>
          <Button size="sm">Chi tiết</Button>
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
