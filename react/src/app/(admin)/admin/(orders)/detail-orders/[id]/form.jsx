"use client";

import { changeStatusOrders, detailOrderManager } from "@/lib/callApi";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import ComponentCard from "@/components/common/ComponentCard";
import LisProductOrder from "./listProductOrder";
import DetailOrder from "./detailOrder";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import config from "@/config";
export default function AdminOrderDetail({ idOrder }) {
  const { toast } = useToast();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [exporting, setExporting] = useState(false); // trạng thái xuất PDF

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

  const handleExportPDF = async () => {
    if (!order) return;

    try {
      setExporting(true);
      const response = await fetch(
        `${config.NEXT_PUBLIC_API}/api/ca-canh/orders/${idOrder}/export-pdf`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Xuất PDF thất bại");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `hoa-don-${idOrder}.pdf`;
      link.click();

      toast({
        title: "Thành công",
        description: "Hóa đơn đã được tải xuống!",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xuất hóa đơn. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <ComponentCard title="Chi tiết đơn hàng">
      {loading ? (
        <Progress value={progress} className="w-full h-1" />
      ) : (
        <div className="space-y-6 p-6">
          <DetailOrder order={order} />
          <LisProductOrder order={order} />

          <div className="flex items-center gap-3 flex-wrap">
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
              onClick={handleExportPDF}
              disabled={exporting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              {exporting ? "Đang xuất..." : "Xuất hóa đơn PDF"}
            </Button>

            <Button
              onClick={handleChangeStatus}
              disabled={updating}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white dark:from-blue-600 dark:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800"
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
