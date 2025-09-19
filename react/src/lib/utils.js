import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function formatDate(date, format = "dd/MM/yyyy") {
  // Nếu là string hoặc số thì convert sang Date
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    throw new Error("Ngày không hợp lệ");
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
