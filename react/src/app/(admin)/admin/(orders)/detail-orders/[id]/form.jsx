"use client";

import { changeStatusOrders, detailOrderManager } from "@/lib/callApi";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import ComponentCard from "@/components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatVND } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AdminOrderDetail({ idOrder }) {
  const { toast } = useToast();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadDataDetail() {
      try {
        setProgress(30);
        const data = await detailOrderManager(idOrder);
        setOrder(data ?? null);
        setStatus(data?.status ?? "pending");
        setProgress(70);
      } catch {
        console.error("no data");
      } finally {
        setProgress(100);
        setLoading(false);
      }
    }
    loadDataDetail();
  }, [idOrder]);

  const handleChangeStatus = async () => {
    try {
      setUpdating(true);
      const data = await changeStatusOrders(idOrder, status);
      if (data.success) {
        toast({
          title: "Thành công",
          description: `Cập nhật trạng thái thành công!`,
          variant: "success",
        });
        setOrder(data.order);
      } else {
        toast({
          title: "Thất bại",
          description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          variant: "warning",
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
            ⏳ Chờ xử lý
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
            🔄 Đang xử lý
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
            ✅ Hoàn thành
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700">
            ❌ Hủy
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <ComponentCard title="Chi tiết đơn hàng">
      {loading ? (
        <Progress value={progress} className="w-full h-1" />
      ) : (
        <div className="space-y-6 p-6">
          <div className="space-y-3 p-4 rounded-xl border bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Thông tin đơn hàng #{order.id}
            </h1>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <b>Khách hàng:</b> {order.user.name} (
                {order.user.email || order.user.phone})
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Địa chỉ:</b> {order.user.address}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Tổng tiền:</b>{" "}
                <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {formatVND(order.total_amount)}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Thời gian đặt hàng:</b>{" "}
                <span className="capitalize">
                  {formatDate(order.created_at, "H:m dd/MM/yyyy")}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Phương thức thanh toán:</b>{" "}
                <span className="capitalize">{order.payment_method}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Mô tả:</b> <span>{order.description}</span>
              </p>
              <div className="text-gray-700 dark:text-gray-300">
                <b>Trạng thái hiện tại:</b> {renderStatusBadge(order.status)}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Danh sách sản phẩm
            </h2>
            <Table>
              <TableCaption className="text-gray-500 dark:text-gray-400">
                Các sản phẩm trong đơn hàng
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-slate-800">
                  <TableHead className="w-[80px] text-gray-700 dark:text-gray-200">
                    ID
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200">
                    Sản phẩm
                  </TableHead>
                  <TableHead className="text-center text-gray-700 dark:text-gray-200">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-200">
                    Giá
                  </TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-200">
                    Thành tiền
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <TableCell>{item.product.id}</TableCell>
                    <TableCell>{item.product.product}</TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatVND(item.price)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-700 dark:text-gray-200">
                      {formatVND(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Chuyển trạng thái */}
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700 dark:text-gray-200">
              Chuyển trạng thái:
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[200px] dark:bg-slate-800 dark:text-gray-200">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Hủy</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleChangeStatus}
              disabled={updating}
              className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800"
            >
              {updating ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            <Link href="/admin/orders-manager">
              <Button className="bg-gradient-to-r from-gray-500 to-zinc-600 hover:from-gray-600 hover:to-zinc-700 text-white px-3 rounded-md">
                Quay về
              </Button>
            </Link>
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
