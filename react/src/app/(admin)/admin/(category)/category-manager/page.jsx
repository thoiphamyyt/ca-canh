import LayoutProduct from "./layout";
import React from "react";
import { title } from "@/lib/contants";

export const metadata = {
  title: `${title} | Danh sách sản phẩm`,
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function BasicTables() {
  return (
    <div>
      <LayoutProduct />
    </div>
  );
}
