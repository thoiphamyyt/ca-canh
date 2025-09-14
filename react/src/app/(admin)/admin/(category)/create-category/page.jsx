import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Form from "./form";
import React from "react";
import { title } from "@/lib/contants";

export const metadata = {
  title: `${title} | Thêm mới danh mục sản phẩm`,
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Thêm mới danh mục sản phẩm" />
      <Form />
    </div>
  );
}
