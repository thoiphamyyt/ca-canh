import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
export const columns = (onOpenDialog) => [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>, // tự đánh số
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant =
        status === "published"
          ? "success"
          : status === "draft"
          ? "secondary"
          : "destructive";
      return (
        <div className="flex justify-center">
          <Badge variant={variant}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <div className="text-center">
        {formatDate(row.getValue("created_at"), "dd/MM/yyyy HH:mm")}
      </div>
    ),
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
              row.original.images_url && row.original.images_url.length > 0
                ? row.original.images_url[0]
                : "/images/product/product-default.png"
            }
            alt={row.original.title}
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
        <Link href={`/admin/update-news/${row.original.id}`}>
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
