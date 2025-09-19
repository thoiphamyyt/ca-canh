import LayoutProduct from "./layout";
import React from "react";
import { title, description } from "@/lib/contants";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata = {
  title: `${title} | Danh mục sản phẩm`,
  description: description,
};
export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Danh mục sản phẩm" />
      <LayoutProduct />
    </div>
  );
}
