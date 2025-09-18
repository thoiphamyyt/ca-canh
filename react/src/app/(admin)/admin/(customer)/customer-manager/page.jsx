import LayoutCustomer from "./layout";
import React from "react";
import { title, description } from "@/lib/contants";

export const metadata = {
  title: `${title} | Danh sách khách hàng`,
  description: description,
};
export default function BasicTables() {
  return (
    <div>
      <LayoutCustomer />
    </div>
  );
}
