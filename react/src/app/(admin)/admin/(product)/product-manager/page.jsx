import LayoutProduct from "./layout";
import React from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Danh sách sản phẩm`,
  description: description,
};
export default function BasicTables() {
  return (
    <div>
      <LayoutProduct />
    </div>
  );
}
