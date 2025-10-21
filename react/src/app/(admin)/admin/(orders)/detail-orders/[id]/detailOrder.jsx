import { Badge } from "@/components/ui/badge";
import { formatDate, formatVND, renderStatusBadge } from "@/lib/utils";

export default function DetailOrder({ order }) {
  return (
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
  );
}
