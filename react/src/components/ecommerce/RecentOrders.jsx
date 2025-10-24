"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { fetchOrderManager } from "@/lib/callApi";
import { useEffect, useState } from "react";
import { formatDate, formatVND } from "@/lib/utils";
import { getStatusOrder } from "@/lib/utils";

export default function RecentOrders() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    async function loadOrder() {
      setLoading(true);
      try {
        const data = await fetchOrderManager({});
        setOrder(data.data ?? []);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, []);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Danh sách đơn hàng
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 font-medium text-gray-500 text-start dark:text-gray-400">
                Mã đơn hàng
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start dark:text-gray-400">
                Thời gian tạo
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-center dark:text-gray-400">
                Trạng thái
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start dark:text-gray-400">
                Tổng tiền
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start dark:text-gray-400">
                Phương thức thanh toán
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {!order ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            ) : (
              order.map((item) => (
                <TableRow key={item.id} className="">
                  <TableCell className="py-3">
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      #{item.id}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatDate(item.created_at, "H:m dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {getStatusOrder(item.status)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatVND(item.total_amount)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.payment_method}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
