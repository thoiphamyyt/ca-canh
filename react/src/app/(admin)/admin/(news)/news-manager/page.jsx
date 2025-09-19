import LayoutProduct from "./layout";
import React from "react";
import { title, description } from "@/lib/contants";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata = {
  title: `${title} | Danh sách sản phẩm`,
  description: description,
};
export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bản tin" />
      <LayoutProduct />
    </div>
  );
}
