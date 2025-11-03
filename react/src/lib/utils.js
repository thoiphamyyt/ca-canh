// "use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Star } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { listStatusOrder } from "./contants";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount) {
  if (!amount && amount !== 0) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
export function formatNumberVi(amount) {
  if (amount === null || amount === undefined) return "";
  return new Intl.NumberFormat("vi-VN").format(amount);
}
export function formatDate(date, format = "dd/MM/yyyy") {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return "";
  }

  const map = {
    dd: String(date.getDate()).padStart(2, "0"),
    d: date.getDate(),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: date.getMonth() + 1,
    yyyy: date.getFullYear(),
    yy: String(date.getFullYear()).slice(-2),
    HH: String(date.getHours()).padStart(2, "0"),
    H: date.getHours(),
    mm: String(date.getMinutes()).padStart(2, "0"),
    m: date.getMinutes(),
    ss: String(date.getSeconds()).padStart(2, "0"),
    s: date.getSeconds(),
  };

  return format.replace(
    /dd|d|MM|M|yyyy|yy|HH|H|mm|m|ss|s/g,
    (matched) => map[matched]
  );
}
export function renderStars(rating = 0) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-300 dark:text-slate-600"
        }`}
      />
    );
  }
  return stars;
}
export function getStatusOrder(status) {
  const borderColor =
    status == "completed"
      ? "border-green-500 text-green-700"
      : status === "draft"
      ? "border-gray-400 text-gray-600"
      : status === "pending"
      ? "border-orange-400 text-orange-600"
      : "border-blue-400 text-blue-600";

  return (
    <div className="flex justify-center">
      <Badge className={`border ${borderColor} bg-transparent`}>
        {listStatusOrder.find((x) => x.value == status)
          ? listStatusOrder.find((x) => x.value == status).label
          : ""}{" "}
      </Badge>
    </div>
  );
}

export function renderStatusBadge(status, customer = false) {
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
          🔄 {customer ? "Đang giao hàng" : "Đang xử lý"}
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
          ✅ {customer ? "Đã giao hàng" : "Hoàn thành"}
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700">
          ❌ {customer ? "Đã hủy" : "Hủy"}
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
