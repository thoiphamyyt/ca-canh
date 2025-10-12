import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Star } from "lucide-react";
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
